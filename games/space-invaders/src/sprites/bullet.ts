import { IImageSpriteOptions, ImageSprite } from "../engine/sprites/imagesprite";
import { SaucerSprite } from "./saucer";

export class BulletSprite extends ImageSprite {
  public static readonly BASE_SPEED = 3;

  constructor(options: IImageSpriteOptions) {
    super(options);

    // make it so our update task actually happens
    this.addTask(this.move);
    this.addTask(this.collision);
  }

  private collision() {
    for (let sprite of this.runtime.sprites) {
      if (sprite instanceof SaucerSprite) {
        if (this.containsPoint(sprite.position)) {
          sprite.destroy();
          this.destroy();
        }
      }
    }
  }

  // called every frame a balloon exists
  private move() {
    // move us down relavent to the difficulty
    const speed = this.speed;
    this.y -= speed;

    // if we went below the screen gameover
    if (this.y <= 0) {
      this.destroy();
      return;
    }
  }

  get speed() {
    return BulletSprite.BASE_SPEED ** (1 + this.runtime.difficulty);
  }
}
