import { ImageSprite, IImageSpriteOptions } from "../engine/sprites/imagesprite";

export class SaucerSprite extends ImageSprite {
  constructor(options: IImageSpriteOptions) {
    super(options);

    this.addTask(this.move);
  }

  private move() {
    this.y += this.speed;

    if (this.y >= this.runtime.canvas.height) {
      this.runtime.gameover();
    }
  }

  get speed() {
    return 3;
  }
}