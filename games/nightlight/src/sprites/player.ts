import { ImageSprite, IImageSpriteOptions } from "../engine/sprites/imagesprite";
import { SolidBlock } from "./blocks/solid";
import { FRICTION, GRAVITY, PLAYER_WALK_SPEED, JUMP_VELOCITY, BLOCK_HEIGHT } from "../config";

export class PlayerSprite extends ImageSprite {
  public yv: number = 0;
  public xv: number = 0;

  private _jumpMonitorLastYv: number = 0;
  private _jumpMonitorStart: number = 0;
  private _jumpMonitorStarted: boolean = false;

  constructor(opts: IImageSpriteOptions) {
    super(opts);

    this.addTask(this.run);
    this.addTask(this.jumpMonitor);
  }

  private jumpMonitor() {
    if (this.yv < this._jumpMonitorLastYv && !this._jumpMonitorStarted) {
      this._jumpMonitorStarted = true;
      this._jumpMonitorStart = this.runtime.frames;
      console.log("jump start");
    }

    if (this.yv > this._jumpMonitorLastYv && this._jumpMonitorStarted) {
      this._jumpMonitorStarted = false;
      const length = this.runtime.frames - this._jumpMonitorStart;
      console.log("jump end", length);
    }

    this._jumpMonitorLastYv = this.yv;
  }

  private handleCollision(horizontal: boolean) {
    for (const block of this.runtime.blocks) {
      if (this.intersects(block) && block instanceof SolidBlock) {
        block.handleIntersect(this, horizontal);
        return true;
      }
    }

    return false;
  }

  private handleInputs(onGround: boolean) {
    const keys = this.runtime.keyboard.keys;
    const rightDown = keys[39].isPressed;
    const leftDown = keys[37].isPressed;

    const upPressed = keys[38].isPressed;

    if (rightDown && !leftDown) {
      this.xv += PLAYER_WALK_SPEED;
    }

    if (leftDown && !rightDown) {
      this.xv -= PLAYER_WALK_SPEED;
    }

    if (upPressed && onGround) {
      this.yv = JUMP_VELOCITY;
    } else if (!upPressed && this.yv > 3) {
      this.yv = 3;
    }
  }

  private run() {
    this.x += this.xv;
    if (this.handleCollision(true)) {
      this.xv = 0;
    }
    if (this.x < 0) {
      this.x = 0;
      this.xv = 0;
    }
    if (this.x + this.width > this.runtime.canvas.width) {
      this.x = this.runtime.canvas.width - this.width;
      this.xv = 0;
    }

    let onGround = false;

    this.y -= this.yv;
    if (this.handleCollision(false)) {
      if (this.yv < 0) {
        onGround = true;
      }
      this.yv = 0;
    }

    this.xv *= FRICTION;
    this.yv -= GRAVITY;

    this.handleInputs(onGround);
  }

  public reset() {
    this.position.x = 40;
    this.position.y = this.runtime.canvas.height - BLOCK_HEIGHT;

    while (this.intersects(this.runtime.blocks)) {
      this.y -= BLOCK_HEIGHT;
    }
  }
}
