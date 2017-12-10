import { ImageSprite, IImageSpriteOptions } from "../../engine/sprites/imagesprite";
import { AbstractSprite } from "../../engine/sprite";
import { Sprite } from "../../engine/types";
import { BLOCK_WIDTH, BLOCK_HEIGHT } from "../../config";

export interface IBlockOptions extends IImageSpriteOptions {
  levelIndex?: number;
}

export class Block extends ImageSprite {
  public solid: boolean = false;

  constructor(opts: IBlockOptions) {
    super(opts);

    this.runtime.blocks.push(this);
  }

  public groundedCenterAlign() {
    this.x -= (BLOCK_WIDTH - this.width) / 2;
    this.x = Math.floor(this.x);

    this.y += BLOCK_HEIGHT - this.height;
    this.y = Math.floor(this.y);
  }

  public centerAlign() {
    this.x += (BLOCK_WIDTH - this.width) / 2;
    this.x = Math.floor(this.x);

    this.y += (BLOCK_HEIGHT - this.height) / 2;
    this.y = Math.floor(this.y);
  }

  public handleIntersect(sprite: AbstractSprite, horizontal: boolean): void {
    if (horizontal) {
      if (sprite.x > this.x) {
        sprite.x = this.x + this.width;
      } else {
        sprite.x = this.x - sprite.width;
      }
    } else {
      if (sprite.y < this.y) {
        sprite.y = this.y - sprite.height;
      } else {
        sprite.y = this.y + this.height;
      }
    }
  }
}

export class SolidBlock extends Block {
  public solid: boolean = true;
}
