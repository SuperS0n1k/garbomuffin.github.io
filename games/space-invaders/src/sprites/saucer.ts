import { IImageSpriteOptions, ImageSprite } from "../engine/sprites/imagesprite";

export interface ISaucerSpriteOptions extends IImageSpriteOptions {
  hSpeed: number;
}

export class SaucerSprite extends ImageSprite {
  public static readonly Y_SPEED = 3;

  private hSpeed: number;

  constructor(options: ISaucerSpriteOptions) {
    super(options);

    this.hSpeed = options.hSpeed;

    this.addTask(this.move);
  }

  private shouldDeductHealth() {
    return this.intersects(this.runtime.rocketSprite) ||
      this.y >= this.runtime.canvas.height;
  }

  private move() {
    this.y += SaucerSprite.Y_SPEED;

    if (this.shouldDeductHealth()) {
      this.runtime.lives--;
      this.destroy();
      return;
    }

    this.x += this.hSpeed;

    if (this.x <= 0 || this.x + this.width >= this.runtime.canvas.width) {
      this.hSpeed = -this.hSpeed;
    }
  }
}
