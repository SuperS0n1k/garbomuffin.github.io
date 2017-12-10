import { Block } from "./block";
import { IImageSpriteOptions } from "../../engine/sprites/imagesprite";
import { BLOCK_WIDTH, BLOCK_HEIGHT } from "../../config";

// Some textures don't quite fill the entire block space
// and have to be centered on the ground
// (eg characters p and q)

export class GroundedCenteredBlock extends Block {
  constructor(opts: IImageSpriteOptions) {
    super(opts);

    // debugger;

    this.x -= (BLOCK_WIDTH - this.width) / 2;
    this.x = Math.floor(this.x);

    this.y += BLOCK_HEIGHT - this.height;
    this.y = Math.floor(this.y);
    // this.y += BLOCK_HEIGHT - (this.height / 2);
  }
}
