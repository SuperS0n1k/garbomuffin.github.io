import { Block } from "./block";
import { BLOCK_HEIGHT } from "../../config";
import { IImageSpriteOptions } from "../../engine/sprites/imagesprite";

export class GrassBlock extends Block {
  constructor(opts: IImageSpriteOptions) {
    super(opts);

    this.y += BLOCK_HEIGHT;
  }
}
