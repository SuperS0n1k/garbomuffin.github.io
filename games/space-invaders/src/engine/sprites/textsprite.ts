import { AbstractSprite, ISpriteOptions } from "../sprite";
import { TImage } from "../types";
import { getOrDefault } from "../utils";

// TODO: UNFINISHED
// maxWidth not implemented
// actual rendering doesn't work right now

export interface ITextSpriteOptions extends ISpriteOptions {
  text: string;
  fontSize?: number;
  fontFamily?: string;
  maxWidth?: number;
}

export class TextSprite extends AbstractSprite implements ITextSpriteOptions {
  public text: string;
  public fontSize: number;
  public fontFamily: string;
  public maxWidth: number;

  constructor(options: ITextSpriteOptions) {
    super(options);

    this.text = options.text;
    this.fontSize = getOrDefault(options.fontSize, 0);
    this.fontFamily = getOrDefault(options.fontFamily, "sans-serif");
  }

  private get font() {
    return `${this.fontSize}px ${this.fontFamily}`;
  }

  public render(ctx: CanvasRenderingContext2D) {
    ctx.font = this.font;
    ctx.fillText(this.text, this.x, this.y);
  }
}
