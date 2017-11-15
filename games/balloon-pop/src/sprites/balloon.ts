import { IImageSpriteOptions, ImageSprite } from "../engine/sprites/imagesprite";

export const BASE_SPEED = 3;

export class BalloonSprite extends ImageSprite {
  constructor(options: IImageSpriteOptions) {
    super(options);

    // make it so our update task actually happens
    this.addTask(this.updateBalloon);
  }

  // called every frame a balloon exists
  private updateBalloon() {
    // move us down relavent to the difficulty
    const speed = this.speed;
    this.y += speed;

    // if we went below the screen gameover
    if (this.y >= this.runtime.canvas.height) {
      this.runtime.gameover();
      return;
    }

    // due to the lack of an onclick() method we
    // a) figure out if the mouse is over us
    // b) found out if this is the first frame the mouse has been down
    const containsMouse = this.containsPoint(this.runtime.mouse.position);
    if (containsMouse && this.runtime.mouse.isClick) {
      this.destroy();
      this.runtime.score++;
    }
  }

  get speed() {
    return BASE_SPEED ** (1 + this.runtime.difficulty);
  }
}
