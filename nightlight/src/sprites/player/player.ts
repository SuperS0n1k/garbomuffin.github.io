import { ImageSprite, IImageSpriteOptions } from "../../engine/sprites/imagesprite";
import { FRICTION, GRAVITY, PLAYER_WALK_SPEED, JUMP_VELOCITY, BLOCK_HEIGHT } from "../../config";
import { PlayerFragmentSprite } from "./fragment";
import { getRandomInt } from "../../utils";
import { Vector } from "../../engine/vector";

const FRAGMENT_COUNT = 5;
const FRAGMENT_XV_RANGE = 1;
const FRAGMENT_YV_MIN = 3;
const FRAGMENT_YV_MAX = 5;
const FRAGMENT_RV_RANGE = 10;
const FRAGMENT_TEXTURES = 5;

const WALK_ANIMATION_FRAMES = 4;
const WALK_ANIMATION_LENGTH = 4;

enum MovementDirection {
  Right = 1, Left = -1,
}

export class PlayerSprite extends ImageSprite {
  private yv: number = 0;
  private xv: number = 0;
  private lastMovementDirection: MovementDirection = MovementDirection.Right;
  private onGround: boolean = true;
  private walkingAnimationProgress: number = 1;
  private currentFrameProgress: number = 0;
  private moving: boolean = false;

  private _jumpMonitorLastYv: number = 0;
  private _jumpMonitorStart: number = 0;
  private _jumpMonitorStarted: boolean = false;

  constructor(opts: IImageSpriteOptions) {
    super(opts);

    this.addTask(this.run);
    this.addTask(this.jumpMonitor);
    this.addTask(this.updateGraphic);
  }

  // Monitors the length of a jump in frames to allow easier fine tuning
  private jumpMonitor() {
    if (this.yv < this._jumpMonitorLastYv && !this._jumpMonitorStarted) {
      this._jumpMonitorStarted = true;
      this._jumpMonitorStart = this.runtime.frames;
      console.log("jump start");
    }

    if (this.yv > this._jumpMonitorLastYv && this._jumpMonitorStarted) {
      this._jumpMonitorStarted = false;
      const length = this.runtime.frames - this._jumpMonitorStart;
      console.log("jump end length=" + length);
    }

    this._jumpMonitorLastYv = this.yv;
  }

  private handleInputs(onGround: boolean) {
    const keys = this.runtime.keyboard.keys;
    const rightDown = keys[39].isPressed;
    const leftDown = keys[37].isPressed;
    const upPressed = keys[38].isPressed;
    this.moving = false;

    if (rightDown && !leftDown) {
      this.xv += PLAYER_WALK_SPEED;
      this.lastMovementDirection = MovementDirection.Right;
      this.moving = true;
    }

    if (leftDown && !rightDown) {
      this.xv -= PLAYER_WALK_SPEED;
      this.lastMovementDirection = MovementDirection.Left;
      this.moving = true;
    }

    if (upPressed && onGround) {
      this.yv = JUMP_VELOCITY;
    } else if (!upPressed && this.yv > 3) {
      this.yv = 3;
    }
  }

  private run() {
    const physicsResult = this.runBasicPhysics(this.xv, this.yv);
    this.xv = physicsResult.xv;
    this.yv = physicsResult.yv;
    this.onGround = physicsResult.onGround;
    this.handleInputs(physicsResult.onGround);

    if (this.y >= this.runtime.canvas.height) {
      this.kill();
    }
  }

  public reset() {
    this.position.x = 40;
    this.position.y = this.runtime.canvas.height - BLOCK_HEIGHT;

    this.xv = 0;
    this.yv = 0;

    const sprites = this.runtime.blocks.sprites.filter((s) => s.solid);
    while (this.intersects(sprites)) {
      this.y -= BLOCK_HEIGHT;
    }
  }

  public kill() {
    for (let i = 0; i < FRAGMENT_COUNT; i++) {
      new PlayerFragmentSprite({
        position: new Vector(this.position),
        texture: this.runtime.getAsset(`fragments/${getRandomInt(1, FRAGMENT_TEXTURES)}`),

        xv: getRandomInt(-FRAGMENT_XV_RANGE * 1000, FRAGMENT_XV_RANGE * 1000) / 1000,
        yv: getRandomInt(FRAGMENT_YV_MIN * 1000, FRAGMENT_YV_MAX * 1000) / 1000,
        rv: getRandomInt(-FRAGMENT_RV_RANGE * 1000, FRAGMENT_RV_RANGE * 1000) / 1000,
      });
    }

    this.reset();
  }

  private updateGraphic() {
    this.scale.x = this.lastMovementDirection;
    // console.log(this.yv);
    if (this.onGround) {
      if (this.moving) {
        console.log("move");
        this.currentFrameProgress++;
        if (this.currentFrameProgress === WALK_ANIMATION_LENGTH) {
          this.currentFrameProgress = 0;
          this.walkingAnimationProgress++;
        }
        if (this.walkingAnimationProgress > WALK_ANIMATION_FRAMES) {
          this.walkingAnimationProgress = 1;
        }
        this.texture = this.runtime.getAsset(`player/walk${this.walkingAnimationProgress}`);
      } else {
        console.log("idle");
        this.texture = this.runtime.getAsset("player/idle");
      }
    } else {
      if (this.yv < 0.1) {
        console.log("down");
        this.texture = this.runtime.getAsset("player/down");
      } else {
        console.log("up");
        this.texture = this.runtime.getAsset("player/up");
      }
    }
  }
}
