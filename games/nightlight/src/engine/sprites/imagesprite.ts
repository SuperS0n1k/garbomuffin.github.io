import { AbstractSprite, ISpriteOptions } from "../sprite";
import { TImage } from "../types";
import { getOrDefault } from "../utils";

export interface IImageSpriteOptions extends ISpriteOptions {
  texture: TImage;
}

export class ImageSprite extends AbstractSprite {
  public texture: TImage;

  constructor(options: IImageSpriteOptions) {
    super(options);

    this.texture = options.texture;
    this.width = getOrDefault(options.width, this.texture.width) as number;
    this.height = getOrDefault(options.height, this.texture.height) as number;
  }

  public render(ctx: CanvasRenderingContext2D) {
    ctx.scale(this.scale.x, this.scale.y);
    ctx.drawImage(this.texture, this.x, this.y, this.width, this.height);
  }
}
