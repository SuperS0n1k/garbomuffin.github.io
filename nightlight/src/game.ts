import "./stats.js";

import { blockMap } from "./blockmap";
import * as config from "./config";
import { Container } from "./engine/container";
import { GameRuntime } from "./engine/runtime";
import { TBackground, TImage, TSound } from "./engine/types";
import { Vector } from "./engine/vector";
import { JUMP_LIGHTS } from "./levels/jumplights";
import { getLevels, Level } from "./levels/levels";
import { Block, IBlockOptions, StaticSolidBlock } from "./sprites/blocks/block";
import { JumpLight } from "./sprites/jumplight";
import { PlayerSprite } from "./sprites/player/player";
import { BackgroundStarSprite } from "./sprites/star";
import { ZIndexes } from "./sprites/zindex";
import { getRandomInt } from "./utils";

const SPOTLIGHT_SIZE = 75;

const TOTAL_BACKGROUND_STARS = 100;

export class Nightlight extends GameRuntime {
  public level: number = 0;
  public levelData: string;
  public levels: Level[];
  public player: PlayerSprite;
  public background: TBackground = "black";
  public backgroundMusic: TSound[] = [];
  public darkLevel: boolean = false;
  public blocks: Container<Block> = new Container();

  private stats: Stats;

  constructor() {
    super(document.getElementById("container") as HTMLElement);

    (document.getElementById("volume") as HTMLInputElement).oninput = (e) => {
      this.setVolume(Number((e.srcElement as HTMLInputElement).value));
    };
    this.setVolume(50); // 50%

    // stats.js for fps monitoring
    this.stats = new Stats();
    this.stats.showPanel(0);
    document.body.appendChild(this.stats.dom);

    // for debugging allow you to change the level by changing the hash
    // this will be removed in v1
    if (location.hash) {
      this.setLevelToHash();
    }
    window.onhashchange = () => this.setLevelToHash();
  }

  //
  // Utilities and Init
  //

  public setBackgroundMusic(music: TSound[]) {
    for (const sound of this.backgroundMusic) {
      this.stopSound(sound);
      sound.loop = false;
      sound.onended = () => {};
    }

    for (const sound of music) {
      sound.onended = () => this.nextBackgroundMusic();
    }

    this.backgroundMusic = music;
    this.playSound(music[0]);
  }

  private nextBackgroundMusic() {
    if (this.backgroundMusic.length > 1) {
      this.backgroundMusic.shift();
    }
    this.playSound(this.backgroundMusic[0]);
  }

  public setLevelToHash() {
    console.log("set hash", location.hash);
    const hash = location.hash.substr(1);
    if (!isNaN(parseInt(hash, 10))) {
      this.level = parseInt(hash, 10);
      if (this.started) {
        this.renderLevel();
      }
    }
  }

  private createPlayer() {
    this.player = new PlayerSprite({
      texture: this.getImage("player/idle"),
      position: new Vector(0, 0, ZIndexes.Player),
      width: config.BLOCK_WIDTH,
      height: config.BLOCK_HEIGHT,
      persistent: true,
    });
  }

  private createStarBackground() {
    for (let i = 0; i < TOTAL_BACKGROUND_STARS; i++) {
      const x = getRandomInt(0, this.canvas.width);
      const y = getRandomInt(0, this.canvas.height);
      new BackgroundStarSprite({
        position: new Vector(x, y, ZIndexes.Star),
        width: 2,
        height: 2,
        persistent: true,
      });
    }
  }

  private setVolume(volume: number) {
    super.setVolume(volume);
    (document.getElementById("volume-level") as HTMLElement).textContent = volume + "%";
    (document.getElementById("volume") as HTMLInputElement).value = volume.toString();
  }

  //
  // Overrides
  //

  public start() {
    super.start();

    this.levels = getLevels(this);

    this.createPlayer();
    this.createStarBackground();
    this.renderLevel();
  }

  public render() {
    this.stats.begin();

    super.render();

    if (this.darkLevel) {
      // https://stackoverflow.com/a/6271865
      const coverCanvas = this.createCanvas();
      const coverCtx = coverCanvas.getContext("2d") as CanvasRenderingContext2D;
      coverCtx.fillStyle = "black";
      this.resetCanvas(coverCtx, "black");
      coverCtx.globalCompositeOperation = "xor";

      const player = this.player;
      const centerX = player.x + (player.width / 2);
      const centerY = player.y + (player.height / 2);

      coverCtx.arc(centerX, centerY, SPOTLIGHT_SIZE, 0, 2 * Math.PI);
      coverCtx.fill();

      this.ctx.drawImage(coverCanvas, 0, 0);
    }

    this.stats.end();
  }

  //
  // Levels
  //

  private destroyLevel() {
    // a normal for loop won't work because we are modifying the list mid loop
    for (let i = 0; i < this.sprites.length;) {
      const sprite = this.sprites.sprites[i];
      if (sprite.persistent) {
        i++;
      } else {
        sprite.destroy();
      }
    }
  }

  private createBlock(position: Vector, char: string, index: number) {
    const blockType = blockMap[char];
    let spriteConstructor: typeof Block;
    let texture: TImage;

    if (typeof blockType === "undefined") {
      console.warn("skipping block", char);
      return;
    } else if (typeof blockType === "string") {
      texture = this.getImage(blockType);
      spriteConstructor = StaticSolidBlock;
    } else {
      texture = this.getImage(blockType.texture);
      spriteConstructor = blockType.type;
    }

    if (!texture) {
      console.error(`Could not find texture for ${blockType}`);
      return;
    }

    const opts: IBlockOptions = {
      width: texture.width,
      height: texture.height,
      position,
      texture,
      levelIndex: index,
    };

    const block = new spriteConstructor(opts);
    return block;
  }

  public renderLevel(num: number = this.level) {
    this.destroyLevel();

    const level = this.levels[num];
    const levelData = level.levelData;

    this.levelData = levelData;

    let x = 0;
    let y = this.canvas.height - config.BLOCK_HEIGHT;

    for (let i = 0; i < levelData.length; i++) {
      const char = levelData[i];

      if (char !== ".") {
        const position = new Vector(x, y);
        this.createBlock(position, char, i);
      }

      x += config.BLOCK_WIDTH;
      if (x >= this.canvas.width) {
        x = 0;
        y -= config.BLOCK_HEIGHT;
      }
    }

    // Level metadata

    // if a level changes the background
    if (level.newBackground) {
      this.background = level.newBackground;
    }

    // if a level has new background music
    if (level.newBackgroundMusic) {
      this.setBackgroundMusic(level.newBackgroundMusic);
    }

    // if a level has any handlers that need to run
    if (level.handlers) {
      for (const handler of level.handlers) {
        handler(this);
      }
    }

    // dark rooms
    this.darkLevel = !!level.dark;

    // spawn things that you can jump on
    this.spawnJumpLights();

    // render static things that were just created
    this.updateStatic();

    this.player.reset();
  }

  private spawnJumpLights() {
    const jumpLights = JUMP_LIGHTS[this.level];
    if (!jumpLights) {
      return;
    }
    const texture = this.getImage("jumplight");

    for (const position of jumpLights) {
      new JumpLight({
        texture,
        position,
      });
    }
  }
}
