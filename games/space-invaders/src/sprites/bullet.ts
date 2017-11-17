import { IImageSpriteOptions, ImageSprite } from "../engine/sprites/imagesprite";
import { SaucerSprite } from "./saucer";

export class BulletSprite extends ImageSprite {
  public static readonly BASE_SPEED = 6;

  constructor(options: IImageSpriteOptions) {
    super(options);

    this.addTask(this.move);
    this.addTask(this.collision);
  }

  private collision() {
    for (const sprite of this.runtime.sprites) {
      if (!(sprite instanceof SaucerSprite)) {
        continue;
      }

      if (!this.intersects(sprite)) {
        continue;
      }

      this.runtime.score++;
      sprite.destroy();
      this.destroy();
      break;
    }
  }

  private move() {
    const speed = BulletSprite.BASE_SPEED;
    this.y -= speed;

    if (this.y + this.height <= 0) {
      this.runtime.score--;
      this.destroy();
      return;
    }
  }
}
