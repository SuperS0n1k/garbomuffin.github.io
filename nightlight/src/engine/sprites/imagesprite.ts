import { AbstractSprite, ISpriteOptions } from "../sprite";
import { TImage } from "../types";
import { getOrDefault, degreeToRadians } from "../utils";

// NIGHTLIGHT: images are imported from scratch which has things at 2x actual res
export const TEXTURE_SCALE = 2;

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
    this.width = getOrDefault(options.width, this.texture.width / TEXTURE_SCALE) as number;
    this.height = getOrDefault(options.height, this.texture.height / TEXTURE_SCALE) as number;

    this.rotation = getOrDefault(options.rotation, 0);
    this.opacity = getOrDefault(options.opacity, 1);
  }

  public render(ctx: CanvasRenderingContext2D) {
    if (!this.visible) {
      return;
    }

    ctx.save();
    ctx.globalAlpha = this.opacity;

    if (this.rotation !== 0) {
      // terrible code
      // rotation is difficult
      // https://stackoverflow.com/a/4650102
      const translateX = this.x + this.width / 2;
      const translateY = this.y + this.height / 2;
      ctx.translate(translateX, translateY);
      ctx.rotate(degreeToRadians(this.rotation));
      ctx.translate(-translateX, -translateY);
    }

    if (this.scale.x !== 1 || this.scale.y !== 1) {
      const translateX = this.x + this.width / 2;
      const translateY = this.y + this.height / 2;
      ctx.translate(translateX, translateY);
      ctx.scale(this.scale.x, this.scale.y);
      ctx.translate(-translateX, -translateY);
    }

    ctx.drawImage(this.texture, this.x, this.y, this.width, this.height);
    ctx.restore();
  }

  public updateDimensions() {
    this.width = this.texture.width / TEXTURE_SCALE;
    this.height = this.texture.height / TEXTURE_SCALE;
  }
}
