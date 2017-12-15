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

  // Ugly duplication but it works

  public floorAlign() {
    this.centerAlign(true, false);

    this.y += BLOCK_HEIGHT - this.height;
    this.y = Math.floor(this.y);
  }

  public leftAlign() {
    this.centerAlign(false, true);

    this.x += BLOCK_WIDTH - this.width;
    this.x = Math.floor(this.x);
  }

  public centerAlign(centerX: boolean = true, centerY: boolean = true) {
    if (centerX) {
      this.x += (BLOCK_WIDTH - this.width) / 2;
      this.x = Math.floor(this.x);
    }

    if (centerY) {
      this.y += (BLOCK_HEIGHT - this.height) / 2;
      this.y = Math.floor(this.y);
    }
  }

  public handleIntersect(sprite: AbstractSprite, velocity: number, horizontal: boolean): boolean | void {
    if (horizontal) {
      if (velocity > 0) {
        sprite.x = this.x - sprite.width;
      } else if (velocity < 0) {
        sprite.x = this.x + this.width;
      }
    } else {
      if (velocity > 0) {
        sprite.y = this.y + this.height;
      } else if (velocity < 0) {
        sprite.y = this.y - sprite.height;
      }
    }

    return true;
  }
}

// Block with solid = true by default
export class SolidBlock extends Block {
  public solid: boolean = true;
}

// Block that is solid but doesn't handle intersecting
// Used for blocks that shouldn't be solid but needed for player.reset() to work
export class PseudoSolidBlock extends SolidBlock {
  public handleIntersect() {
    return false;
  }
}
