import { ImageSprite, IImageSpriteOptions } from "../../engine/sprites/imagesprite";
import { FRICTION, GRAVITY, BLOCK_HEIGHT } from "../../config";
import { PlayerFragmentSprite } from "./fragment";
import { getRandomInt, clone } from "../../utils";
import { Vector } from "../../engine/vector";
import { PseudoSolidBlock } from "../blocks/block";

const PLAYER_WALK_SPEED = 0.5 / 2;
const JUMP_HEIGHT = 5.4;
const PLAYER_MAX_SPEED = 4 / 2;
const PLAYER_FRICTION = 0.8 / 2;

// const FRAGMENT_COUNT = 5;
// const FRAGMENT_TEXTURES = 5;
const FRAGMENT_TEXTURES = [1, 2, 3, 4];
const FRAGMENT_SMALL_PIECE_MIN = 4;
const FRAGMENT_SMALL_PIECE_MAX = 6;
const FRAGMENT_SMALL_PIECE_TEXTURE = 5;
const FRAGMENT_XV_RANGE = 1;
const FRAGMENT_YV_MIN = 3;
const FRAGMENT_YV_MAX = 6;
const FRAGMENT_RV_RANGE = 10;

const WALK_ANIMATION_FRAMES = 4;
const WALK_ANIMATION_LENGTH = 4;

enum MovementDirection {
  Right = 1, Left = -1,
}

export class PlayerSprite extends ImageSprite {
  public yv: number = 0;
  public xv: number = 0;
  private lastMovementDirection: MovementDirection = MovementDirection.Right;
  private onGround: boolean = true;
  private walkingAnimationProgress: number = 1;
  private currentFrameProgress: number = 0;
  private moving: boolean = false;
  public hasJumpLight: boolean = false;

  constructor(opts: IImageSpriteOptions) {
    super(opts);

    this.addTask(this.run);
    this.addTask(this.updateGraphic);
  }

  private handleInputs(onGround: boolean) {
    const keys = this.runtime.keyboard.keys;
    const rightDown = keys[39].isPressed;
    const leftDown = keys[37].isPressed;
    const upDown = keys[38].isPressed;
    const upJustPressed = keys[38].justPressed;
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

    if ((upDown && onGround) || (upJustPressed && this.hasJumpLight)) {
      const quiet = this.texture === this.runtime.getImage("player/idle");
      this.runtime.playSound(`player/jump${quiet ? 2 : 1}`);
      this.hasJumpLight = false;
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

    const prevXv = this.xv;
    const prevYv = this.yv;

    const physicsResult = this.runBasicPhysics(this.xv, this.yv, {
      friction: false,
    });
    this.xv = physicsResult.xv;
    this.yv = physicsResult.yv;
    this.onGround = physicsResult.onGround;

    if (this.onGround && prevYv < -1.6) {
      this.runtime.playSound("player/ding");
    }

    if (this.onGround) {
      this.hasJumpLight = false;
    }
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

    const sprites = this.runtime.blocks.sprites.filter((s) => s.solid || s instanceof PseudoSolidBlock);
    while (this.intersects(sprites)) {
      this.y -= BLOCK_HEIGHT;
    }
  }

  public kill() {
    const fragmentTextures = clone(FRAGMENT_TEXTURES);
    const smallPieces = getRandomInt(FRAGMENT_SMALL_PIECE_MIN, FRAGMENT_SMALL_PIECE_MAX);
    for (let i = 0; i < smallPieces; i++) {
      fragmentTextures.push(FRAGMENT_SMALL_PIECE_TEXTURE);
    }

    for (const i of fragmentTextures) {
      new PlayerFragmentSprite({
        position: new Vector(this.position),
        texture: this.runtime.getImage(`fragments/${i}`),

        xv: getRandomInt(-FRAGMENT_XV_RANGE * 1000, FRAGMENT_XV_RANGE * 1000) / 1000,
        yv: getRandomInt(FRAGMENT_YV_MIN * 1000, FRAGMENT_YV_MAX * 1000) / 1000,
        rv: getRandomInt(-FRAGMENT_RV_RANGE * 1000, FRAGMENT_RV_RANGE * 1000) / 1000,
      });
    }

    this.reset();
    this.runtime.playSound("player/death");
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
        this.texture = this.runtime.getImage(`player/walk${this.walkingAnimationProgress}`);
      } else {
        this.texture = this.runtime.getImage("player/idle");
      }
    } else {
      if (this.yv < 0.1) {
        this.texture = this.runtime.getImage("player/down");
      } else {
        this.texture = this.runtime.getImage("player/up");
      }
    }
  }
}
