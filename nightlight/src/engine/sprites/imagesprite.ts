/*
 * A sprite that has an image as a texture.
 */

import { AbstractSprite, ISpriteOptions } from "../sprite";
import { TImage } from "../types";
import { getOrDefault, degreeToRadians } from "../utils";
import { Vector } from "../vector";

export interface IImageSpriteOptions extends ISpriteOptions {
  texture: TImage;
  rotation?: number;
  opacity?: number;
}

export class ImageSprite extends AbstractSprite {
  public texture: TImage;
  public rotation: number;
  public opacity: number;

  constructor(options: IImageSpriteOptions) {
    super(options);

    this.texture = options.texture;
    this.width = getOrDefault(options.width, this.texture.width) as number;
    this.height = getOrDefault(options.height, this.texture.height) as number;
  }

  public render(ctx: CanvasRenderingContext2D) {
    if (!this.visible) {
      return;
    }

    ctx.save();

    this._setRenderValues(ctx);

    const x = Math.floor(this.x);
    const y = Math.floor(this.y);

    ctx.drawImage(this.texture, x, y, this.width, this.height);
    ctx.restore();
  }

  public updateDimensions() {
    this.width = this.texture.width;
    this.height = this.texture.height;
  }
}
