import { Block, IBlockOptions } from "./block";
import { LEVEL_WIDTH, BLOCK_HEIGHT, BLOCK_WIDTH } from "../../config";
import { ImageSprite } from "../../engine/sprites/imagesprite";
import { Vector } from "../../engine/vector";

const AIR = [
  ".", // air
  "l", "k", "j", // grass on dirt
  "p", "q", // tall grass
];

export class CornerBlock extends Block {
  private readonly levelIndex: number;

  constructor(opts: IBlockOptions) {
    super(opts);

    this.levelIndex = opts.levelIndex || 0;

    // black background
    new Block({
      texture: this.runtime.getAsset("blocks/a"),
      position: new Vector(this.x, this.y, -1), // any corners placed on this should go on top
    });

    this.testCorner(LEVEL_WIDTH - 1, -90, 0, 0);
    this.testCorner(LEVEL_WIDTH + 1, 0, 1, 0);
    this.testCorner(-LEVEL_WIDTH - 1, 180, 0, 1);
    this.testCorner(-LEVEL_WIDTH + 1, 90, 1, 1);

    // the intent of a cornersprite is to create sprites
    // it itself does not do anything else so delete it
    this.destroy();
  }

  private testCorner(offset: number, rotation: number, x: number, y: number) {
    const charAtOffset = this.runtime.levelData[this.levelIndex + offset];
    const isAir = AIR.indexOf(charAtOffset) > -1;

    if (isAir) {
      const position = new Vector(
        this.x + x * (BLOCK_WIDTH / 2),
        this.y + y * (BLOCK_HEIGHT / 2),
      );
      new ImageSprite({
        position,
        texture: this.texture,
        rotation,
      });
    }
  }
}
