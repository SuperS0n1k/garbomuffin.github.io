import { IImageSpriteOptions, ImageSprite } from "../engine/sprites/imagesprite";

export class RocketSprite extends ImageSprite {
  private static readonly KB_MOVE_SPEED = 3;
  private static readonly KB_FRICTION = 0.75;

  private xVelocity: number = 0;
  private previousMouseX: number = 0;

  constructor(options: IImageSpriteOptions) {
    super(options);

    this.addTask(this.detectInputs);
    this.addTask(this.move);
  }

  private detectInputs() {
    const rightPressed = this.runtime.keyboard.keys[39].isPressed;
    const leftPressed = this.runtime.keyboard.keys[37].isPressed;

    if (rightPressed) {
      this.xVelocity += RocketSprite.KB_MOVE_SPEED;
    }

    if (leftPressed) {
      this.xVelocity += -RocketSprite.KB_MOVE_SPEED;
    }

    this.xVelocity *= RocketSprite.KB_FRICTION;
  }

  private move() {
    const mouseX = this.runtime.mouse.position.x;
    const mouseMoved = mouseX !== this.previousMouseX;

    if (mouseMoved) {
      this.xVelocity = 0;
      this.x = (this.x - (this.width / 2) + mouseX) / 2;
    } else {
      this.x += this.xVelocity;
    }

    if (this.x < 0) {
      this.x = 0;
      this.xVelocity = 0;
    }

    if (this.x + this.width > this.runtime.canvas.width) {
      this.x = this.runtime.canvas.width - this.width;
      this.xVelocity = 0;
    }

    this.previousMouseX = mouseX;
  }

  private calculateEase(start: number, end: number) {
    return (start + end) / 2;
  }
}
