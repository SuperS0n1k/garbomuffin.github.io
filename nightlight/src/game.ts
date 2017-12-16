import { GameRuntime } from "./engine/runtime";
import { getLevels, Level } from "./levels/levels";
import { PlayerSprite } from "./sprites/player/player";
import { Vector } from "./engine/vector";
import { blockMap } from "./blockmap";
import { AbstractSprite } from "./engine/sprite";
import { TImage } from "./engine/types";
import { Block, IBlockOptions, SolidBlock } from "./sprites/blocks/block";
import * as config from "./config";
import { Container } from "./engine/container";
import { BackgroundStarSprite } from "./sprites/star";
import { getRandomInt } from "./utils";
import { LightBlock } from "./sprites/blocks/lightblock";
import { JumpLights } from "./levels/jumplights";
import { JumpLight } from "./sprites/jumplight";

export class Nightlight extends GameRuntime {
  public level: number = 0;
  public levelData: string;
  public levels: Level[];
  public player: PlayerSprite;

  // containers
  public blocks: Container<Block> = new Container();
  public lightBlocks: Container<LightBlock> = new Container();
  public backgroundStars: Container<BackgroundStarSprite> = new Container();

  constructor() {
    super(document.getElementById("canvas") as HTMLCanvasElement);
  }

  public start() {
    super.start();

    this.levels = getLevels(this);

    this.createPlayer();
    this.createStarBackground();
    this.renderLevel();
  }

  private createPlayer() {
    this.player = new PlayerSprite({
      texture: this.getAsset("player/idle"),
      position: new Vector(0, 0, 10),
      width: config.BLOCK_WIDTH,
      height: config.BLOCK_HEIGHT,
      persistent: true,
    });
  }

  private createStarBackground() {
    for (let i = 0; i < 50; i++) {
      const x = getRandomInt(0, this.canvas.width);
      const y = getRandomInt(0, this.canvas.height);
      new BackgroundStarSprite({
        position: new Vector(x, y, -10),
        width: 2,
        height: 2,
        persistent: true,
      });
    }
  }

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
      texture = this.getAsset(blockType);
      spriteConstructor = SolidBlock;
    } else {
      texture = this.getAsset(blockType.texture);
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

    new spriteConstructor(opts);
  }

  public renderLevel(num: number = this.level) {
    this.destroyLevel();

    const level = this.levels[num];
    if (!level) {
      alert("That's the end of the game for now. Thanks for playing.");
    }
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

    if (level.newBackground) {
      this.background = level.newBackground;
    }

    if (level.handlers) {
      for (const handler of level.handlers) {
        handler(this);
      }
    }

    this.spawnJumpLights();

    this.player.reset();
  }

  private spawnJumpLights() {
    const jumpLights = JumpLights[this.level];
    if (!jumpLights) {
      return;
    }
    const texture = this.getAsset("jumplight");

    for (const position of jumpLights) {
      new JumpLight({
        texture,
        position,
      });
    }
  }
}
