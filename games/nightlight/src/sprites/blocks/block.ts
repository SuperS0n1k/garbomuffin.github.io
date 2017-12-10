import { ImageSprite, IImageSpriteOptions } from "../../engine/sprites/imagesprite";
import { AbstractSprite } from "../../engine/sprite";
import { Sprite } from "../../engine/types";

export class Block extends ImageSprite {
  constructor(opts: IImageSpriteOptions) {
    super(opts);

    this.runtime.blocks.push(this);
  }
}
