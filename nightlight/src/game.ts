import { blockMap } from "./blockmap";
import * as config from "./config";
import { CANVAS_WIDTH, GameRuntime, CANVAS_HEIGHT } from "./engine/runtime";
import { GameState } from "./engine/state";
import { TBackground, TImage, TSound } from "./engine/types";
import { Vector } from "./engine/vector";
import { Vector2D } from "./engine/vector2d";
import { getLevels, Level } from "./levels/levels";
import { Block, IBlockOptions, StaticSolidBlock } from "./sprites/blocks/block";
import { JumpLight } from "./sprites/jumplight";
import { PauseSprite } from "./sprites/pause/PauseSprite";
import { PlayerSprite } from "./sprites/player/player";
import { BackgroundStarsSprite } from "./sprites/stars";
import { StaticNightlightTextSprite } from "./sprites/text/StaticNightlightTextSprite";
import { ZIndexes } from "./sprites/zindex";
import { clone, getRandomInt } from "./utils";

const SPOTLIGHT_SIZE = 75;
const TOTAL_BACKGROUND_STARS = 100;

export class Nightlight extends GameRuntime {
  public level: number = 0;
  public levelData: string = "";
  public levels: Level[] = [];
  public player!: PlayerSprite;
  public backgroundStars!: BackgroundStarsSprite;
  public background: TBackground = "black";
  public backgroundMusic: TSound[] = [];
  public darkLevel: boolean = false;
  public ordereredBlocks: Array<Block | undefined> = [];
  public blocks: Block[] = [];
  public randomSpawn: boolean = false;
  public playState: GameState = this.defaultState;
  public pauseState: GameState = new GameState();
  public levelCode!: string;

  constructor() {
    super(document.getElementById("container") as HTMLElement);

    (document.getElementById("volume") as HTMLInputElement).oninput = (e) => {
      const volume = Number((e.target as HTMLInputElement).value);
      this.volume = volume / 100;
    };

    (window as any).runtime = this;
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

    this.backgroundMusic = music;
    for (const sound of music) {
      sound.onended = () => this.nextBackgroundMusic();
    }
    if (music.length > 0) {
      this.playSound(music[0]);
    }
  }

  private nextBackgroundMusic() {
    if (this.backgroundMusic.length > 1) {
      this.backgroundMusic.shift();
    }
    this.playSound(this.backgroundMusic[0]);
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
    const positions = [];
    for (let i = 0; i < TOTAL_BACKGROUND_STARS; i++) {
      const x = getRandomInt(0, this.canvas.width);
      const y = getRandomInt(0, this.canvas.height);
      positions.push(new Vector2D(x, y));
    }

    this.backgroundStars = new BackgroundStarsSprite({
      position: new Vector(0, 0, ZIndexes.Stars),
      width: 2,
      height: 2,
      persistent: true,
    }, positions);
  }

  //
  // Overrides
  //

  public start() {
    super.start();

    new PauseSprite({
      texture: this.getImage("pause"),
      position: new Vector(0, 0),
      persistent: true,
    });

    this.levels = getLevels(this);

    this.createPlayer();
    this.createStarBackground();
    this.renderLevel();
  }

  public render() {
    super.render();

    if (this.darkLevel) {
      // https://stackoverflow.com/a/6271865
      const {canvas: coverCanvas, ctx: coverCtx} = this.createCanvas();
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
  }

  //
  // Levels
  //

  private destroyLevel() {
    const sprites = clone(this.sprites);
    for (const sprite of sprites) {
      if (!sprite.persistent) {
        sprite.destroy();
      }
    }
  }

  private createBlock(position: Vector, char: string, index: number) {
    const blockType = blockMap[char];
    let spriteConstructor: typeof Block;
    let texture: TImage;

    if (typeof blockType === "undefined") {
      console.error(`Could not find block metadata for ${char}, skipping`);
      return;
    } else if (typeof blockType === "string") {
      texture = this.getImage(blockType);
      spriteConstructor = StaticSolidBlock;
    } else {
      texture = this.getImage(blockType.texture);
      spriteConstructor = blockType.type;
    }

    if (!texture) {
      console.error(`Could not find block texture for ${blockType}, skipping`);
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
    if (level.background) {
      this.background = level.background;
    }

    // if a level has new background music
    if (level.backgroundMusic) {
      this.setBackgroundMusic(level.backgroundMusic);
    }

    // if a level has any handlers that need to run
    if (level.handlers) {
      for (const handler of level.handlers) {
        handler(this);
      }
    }

    if (typeof level.stars !== "undefined") {
      this.backgroundStars.visible = level.stars;
    }

    // spawn text
    if (level.text) {
      for (const textOption of level.text) {
        new StaticNightlightTextSprite(textOption);
      }
    }

    // dark rooms
    this.darkLevel = !!level.dark;

    // spawn things that you can jump on
    if (level.jumpLights) {
      this.spawnJumpLights(level.jumpLights);
    }

    // random spawn
    this.randomSpawn = typeof level.randomSpawn === "undefined" ? false : level.randomSpawn;

    // render static things that were just created
    this.updateStatic();

    this.levelCode = this.createLevelCode();

    this.player.reset();
  }

  private createLevelCode(nlevel: number = this.level) {
    let level = nlevel.toString();
    if (level.length === 1) {
      level = "0" + level;
    }
    let result = "";
    result += getRandomInt(0, 9);
    result += level[0];
    result += getRandomInt(0, 9);
    result += getRandomInt(0, 9);
    result += level[1];
    result += getRandomInt(0, 9);
    result += getRandomInt(0, 9);
    result += getRandomInt(0, 9);
    return result;
  }

  public readLevelCode(code: string): number | null {
    if (code.length !== 8) {
      return null;
    }
    if (Math.floor(+code) !== +code) {
      return null;
    }
    const level = +(code[1] + code[4]);
    if (level < 0) {
      return null;
    }
    if (!isFinite(level)) {
      return null;
    }
    return level;
  }

  private spawnJumpLights(positions: Vector[]) {
    const texture = this.getImage("jumplight");

    for (const position of positions) {
      new JumpLight({
        texture,
        position,
      });
    }
  }

  public onsetvolume(volume: number) {
    document.getElementById("volume-level")!.textContent = Math.round(volume * 100) + "%";
  }
}
