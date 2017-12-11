import { ImageSprite, IImageSpriteOptions } from "../../engine/sprites/imagesprite";
import { FRICTION, GRAVITY, BLOCK_HEIGHT } from "../../config";
import { PlayerFragmentSprite } from "./fragment";
import { getRandomInt } from "../../utils";
import { Vector } from "../../engine/vector";

const PLAYER_WALK_SPEED = 0.5;
const JUMP_HEIGHT = 5.25;
const PLAYER_MAX_SPEED = 4 / 2;
const PLAYER_FRICTION = 0.8 / 2;

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
    const upDown = keys[38].isPressed;
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

    if (upDown && onGround) {
      this.yv = JUMP_HEIGHT;
    } else if (!upDown && this.yv > 3) {
      this.yv = 3;
    }

    return {
      rightDown, leftDown, upDown,
    };
  }

  private run() {
    if (this.xv > PLAYER_MAX_SPEED) {
      this.xv = PLAYER_MAX_SPEED;
    } else if (this.xv < -PLAYER_MAX_SPEED) {
      this.xv = -PLAYER_MAX_SPEED;
    }

    const physicsResult = this.runBasicPhysics(this.xv, this.yv, {
      friction: false,
    });
    this.xv = physicsResult.xv;
    this.yv = physicsResult.yv;
    this.onGround = physicsResult.onGround;
    const inputs = this.handleInputs(physicsResult.onGround);

    if ((!inputs.leftDown && !inputs.rightDown) || (inputs.leftDown && inputs.rightDown)) {
      if (this.xv > 0) {
        this.xv -= PLAYER_FRICTION;
        this.xv = Math.max(this.xv, 0);
      } else {
        this.xv += PLAYER_FRICTION;
        this.xv = Math.min(this.xv, 0);
      }
    }

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
    if (this.onGround) {
      if (this.moving) {
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
        this.texture = this.runtime.getAsset("player/idle");
      }
    } else {
      if (this.yv < 0.1) {
        this.texture = this.runtime.getAsset("player/down");
      } else {
        this.texture = this.runtime.getAsset("player/up");
      }
    }
  }
}
