import { Block, IBlockOptions } from "./block";
import { LEVEL_WIDTH, BLOCK_HEIGHT, BLOCK_WIDTH } from "../../config";
import { ImageSprite } from "../../engine/sprites/imagesprite";
import { Vector } from "../../engine/vector";
import { TImage } from "../../engine/types";

const AIR = [
  ".", // air, literally
  "l", "k", "j", // grass on dirt
  "p", "q", // tall grass
  "%", "#", "$", "o", // spikes
];

abstract class CornerBlock extends Block {
  protected readonly levelIndex: number;

  constructor(opts: IBlockOptions) {
    super(opts);

    this.levelIndex = opts.levelIndex || 0;

    // queue deletion
    this.destroy();
  }

  protected testCorner(offset: number, texture: TImage, rotation: number, x: number, y: number) {
    const charAtOffset = this.runtime.levelData[this.levelIndex + offset];
    const isAir = AIR.indexOf(charAtOffset) > -1;

    if (isAir) {
      const position = new Vector(
        this.x + x * (BLOCK_WIDTH / 2),
        this.y + y * (BLOCK_HEIGHT / 2),
      );
      const sprite = new ImageSprite({
        position,
        texture,
        rotation,
      });
    }
  }
}

export class RotatedCornerBlock extends CornerBlock {
  constructor(opts: IBlockOptions) {
    super(opts);

    // black background
    new Block({
      texture: this.runtime.getImage("blocks/a"),
      position: new Vector(this.x, this.y, -1), // any corners placed on this should go on top
    });

    const offset = this.width === BLOCK_WIDTH ? 0 : 1;

    // if spawned on far left edge then don't check for things that will wrap around to other side of screen
    if (this.levelIndex % LEVEL_WIDTH !== 0) {
      this.testCorner(LEVEL_WIDTH - 1, this.texture, -90, 0, 0);
      this.testCorner(-LEVEL_WIDTH - 1, this.texture, 180, 0, offset);
    }
    // if spawned on far right edge then don't check for things that will wrap around to other side of screen
    // untested but should work
    if (this.levelIndex % LEVEL_WIDTH !== LEVEL_WIDTH - 1) {
      this.testCorner(LEVEL_WIDTH + 1, this.texture, 0, offset, 0);
      this.testCorner(-LEVEL_WIDTH + 1, this.texture, 90, offset, offset);
    }
  }
}

export class CastleCornerBlock extends CornerBlock {
  constructor(opts: IBlockOptions) {
    super(opts);

    if (this.levelIndex % LEVEL_WIDTH !== 0) {
      this.testCorner(LEVEL_WIDTH - 1, this.runtime.getImage("blocks/castlecorner/topleft"), 0, 0, 0);
      this.testCorner(-LEVEL_WIDTH - 1, this.runtime.getImage("blocks/castlecorner/bottomleft"), 0, 0, 0);
    }
    if (this.levelIndex % LEVEL_WIDTH !== LEVEL_WIDTH - 1) {
      this.testCorner(LEVEL_WIDTH + 1, this.runtime.getImage("blocks/castlecorner/topright"), 0, 0, 0);
      this.testCorner(-LEVEL_WIDTH + 1, this.runtime.getImage("blocks/castlecorner/bottomright"), 0, 0, 0);
    }
  }
}
