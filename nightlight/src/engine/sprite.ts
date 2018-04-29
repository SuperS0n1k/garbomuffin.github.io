import { BLOCK_WIDTH, FRICTION, GRAVITY, BLOCK_HEIGHT, LEVEL_WIDTH } from "../config";
import { Block } from "../sprites/blocks/block";
import { GameState } from "./state";
import { TaskRunner } from "./task";
import { Sprite, TGame } from "./types";
import { degreeToRadians, getOrDefault } from "./utils";
import { Vector } from "./vector";
import { Vector2D } from "./vector2d";

export interface ISpriteOptions {
  position: Vector;

  width?: number;
  height?: number;

  scale?: Vector2D;
  visible?: boolean;
  rotation?: number;
  rotationPoint?: Vector2D;
  opacity?: number;
  static?: boolean;
  gameState?: GameState;

  // Nightlight:
  persistent?: boolean;
}

export abstract class AbstractSprite extends TaskRunner {
  public static runtime: TGame;
  public runtime: TGame = AbstractSprite.runtime;

  public position: Vector;
  public width: number;
  public height: number;
  public scale: Vector2D;
  public rotation: number;
  public rotationPoint: Vector2D;
  public opacity: number;
  public persistent: boolean;
  public visible: boolean;
  public static: boolean;
  public gameState: GameState | undefined;

  public constructor(options: ISpriteOptions) {
    super();

    // disable pass by reference for positions
    if (options.position instanceof Vector) {
      this.position = new Vector(options.position);
    } else {
      this.position = options.position;
    }

    this.width = getOrDefault(options.width, 0);
    this.height = getOrDefault(options.height, 0);
    this.scale = getOrDefault(options.scale, new Vector2D(1, 1));
    this.persistent = getOrDefault(options.persistent, false);
    this.visible = getOrDefault(options.visible, true);
    this.rotation = getOrDefault(options.rotation, 0);
    this.opacity = getOrDefault(options.opacity, 1);
    this.rotationPoint = getOrDefault(options.rotationPoint, new Vector2D(0.5, 0.5));
    this.static = getOrDefault(options.static, false);
    this.gameState = getOrDefault(options.gameState, this.runtime.defaultState);

    this.runtime.sprites.push(this);
  }

  public abstract render(ctx: CanvasRenderingContext2D): void;

  public update() {
    this.runTasks();
  }

  public destroy() {
    this._removeFromList(this.runtime.sprites);
    this.resetTasks(); // stop all future things from running

    // removed from all lists, should be effectively invisible
    // allows some nightlight optimizations to not ruin things
    this.visible = false;
  }

  protected _removeFromList(list: AbstractSprite[]) {
    const index = list.indexOf(this);
    if (index > -1) {
      list.splice(index, 1);
    }
  }

  // TODO: rotation
  public intersects(thing: Sprite | Sprite[]): boolean {
    if (thing instanceof AbstractSprite) {
      return this.x < thing.x + thing.width &&
        this.x + this.width > thing.x &&
        this.y < thing.y + thing.height &&
        this.y + this.height > thing.y;
    } else {
      for (const sprite of thing) {
        if (this.intersects(sprite)) {
          return true;
        }
      }
      return false;
    }
  }

  public containsPoint(point: Vector) {
    return this.x < point.x &&
      this.x + this.width > point.x &&
      this.y < point.y &&
      this.y + this.height > point.y;
  }

  protected _setRenderValues(ctx: CanvasRenderingContext2D) {
    ctx.globalAlpha = this.opacity;

    if (this.rotation !== 0) {
      // terrible code
      // rotation is difficult
      // https://stackoverflow.com/a/4650102
      const translateX = this.x + this.width * this.rotationPoint.x;
      const translateY = this.y + this.height * this.rotationPoint.y;
      ctx.translate(translateX, translateY);
      ctx.rotate(degreeToRadians(this.rotation));
      ctx.translate(-translateX, -translateY);
    }

    if (this.scale.x !== 1 || this.scale.y !== 1) {
      const translateX = this.x + this.width / 2;
      const translateY = this.y + this.height / 2;
      ctx.translate(translateX, translateY);
      ctx.scale(this.scale.x, this.scale.y);
      ctx.translate(-translateX, -translateY);
    }
  }

  // moves in the direction being faced X pixels
  public moveForward(steps: number) {
    const angle = degreeToRadians(this.rotation);
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);

    this.x += sin * steps;
    this.y += cos * steps;
  }

  public distanceTo(point: Vector) {
    return Math.sqrt((point.x - this.centerX) ** 2 + (point.y - this.centerY) ** 2);
  }

  get x() {
    return this.position.x;
  }
  set x(x) {
    this.position.x = x;
  }
  get y() {
    return this.position.y;
  }
  set y(y) {
    this.position.y = y;
  }
  get z() {
    return this.position.z;
  }
  set z(z) {
    this.position.z = z;
  }

  get centerX() {
    return this.x + (this.width / 2);
  }

  get centerY() {
    return this.y + (this.height / 2);
  }

  get centerPosition() {
    return new Vector(this.centerX, this.centerY);
  }

  //
  // Nightlight related code
  //

  protected runBasicPhysics(xv: number, yv: number, options: IPhysicsOptions = {}): IPhysicsResult {
    options.collision = getOrDefault(options.collision, true);
    options.restrictPositionValues = getOrDefault(options.restrictPositionValues, true);
    options.friction = getOrDefault(options.friction, FRICTION);
    options.midAirFriction = getOrDefault(options.midAirFriction, true);
    options.roundValues = getOrDefault(options.roundValues, true);

    this.x += xv;
    if (options.collision && this.handleCollision(xv, true)) {
      xv = 0;
    }
    if (options.restrictPositionValues) {
      if (this.x < 0) {
        this.x = 0;
        xv = 0;
      } else if (this.x + this.width > this.runtime.canvas.width) {
        this.x = this.runtime.canvas.width - this.width;
        xv = 0;
      }
    }

    let onGround = false;

    yv -= GRAVITY;
    this.y -= yv;
    if (options.collision && this.handleCollision(yv, false)) {
      if (yv < 0) {
        onGround = true;
      }
      yv = 0;
    }

    if (options.friction !== false) {
      if (onGround || options.midAirFriction) {
        xv *= (options.friction as number);
      }
    }

    if (options.roundValues) {
      this.x = Math.round(this.x);
      this.y = Math.round(this.y);
    }

    return {
      xv, yv, onGround,
    };
  }

  private handleCollision(velocity: number, horizontal: boolean) {
    const intersects = (block: Block) => block.solid &&
                                         block.visible &&
                                         this.intersects(block) &&
                                         block.handleIntersect(this, velocity, horizontal) !== false;

    const self = this as any as {_lastSolidBlock?: Block};

    // optimization: if we are touching the same block as before (as when still)
    // then we try that first instead of looping over everything
    // this reduces the performance impact of running lots of physics, especially things that aren't moving
    if (self._lastSolidBlock && intersects(self._lastSolidBlock)) {
      return true;
    }

    const center = this.centerPosition;
    const blocksFromLeft = Math.floor(center.x / BLOCK_WIDTH);
    const blocksFromBottom = Math.floor((this.runtime.canvas.height - center.y) / BLOCK_HEIGHT);
    const centerLevelIndex = blocksFromBottom * LEVEL_WIDTH + blocksFromLeft;

    const ordereredBlocks = this.runtime.ordereredBlocks;
    const blocks = [
      ordereredBlocks[centerLevelIndex],
      ordereredBlocks[centerLevelIndex + LEVEL_WIDTH],
      ordereredBlocks[centerLevelIndex + LEVEL_WIDTH + 1],
      ordereredBlocks[centerLevelIndex + LEVEL_WIDTH - 1],
      ordereredBlocks[centerLevelIndex - LEVEL_WIDTH],
      ordereredBlocks[centerLevelIndex - LEVEL_WIDTH + 1],
      ordereredBlocks[centerLevelIndex - LEVEL_WIDTH - 1],
      ordereredBlocks[centerLevelIndex + 1],
      ordereredBlocks[centerLevelIndex - 1],
    ];
    for (const block of blocks) {
      if (!block) {
        continue;
      }
      if (intersects(block)) {
        self._lastSolidBlock = block;
        return true;
      }
    }

    return false;
  }

  // Tests if a "complex" (fancy rendering/non square) sprite is touching a simple (square) sprite
  public complexIntersectsSimple(sprite: AbstractSprite): boolean {
    const {canvas, ctx} = this.runtime.createCanvas({alpha: false});
    this.render(ctx);

    const height = canvas.height;
    const width = canvas.width;

    const data = ctx.getImageData(0, 0, width, height).data;
    // some browsers are funny (specifically tor)
    // TODO: warning message?
    if (!data) {
      return false;
    }

    const offsetOf = (x: number, y: number) => ((y * width) + x) * 4;

    const startingX = Math.floor(sprite.x);
    const startingY = Math.floor(sprite.y);
    const endingX = startingX + Math.floor(sprite.width);
    const endingY = startingY + Math.floor(sprite.height);

    for (let y = startingY; y < endingY; y++) {
      for (let x = startingX; x < endingX; x++) {
        const offset = offsetOf(x, y);
        if (data[offset] || data[offset + 1] || data[offset + 2]) {
          return true;
        }
      }
    }

    return false;
  }
}

//
// More Nightlight related code
//

interface IPhysicsResult {
  yv: number;
  xv: number;
  onGround: boolean;
}

interface IPhysicsOptions {
  // do collision checking?
  collision?: boolean;

  // restrict x values into 0 <= x <= CANVAS_WIDTH?
  restrictPositionValues?: boolean;

  // false: don't apply friction
  // number: will be used as friction value instead of FRICTION in /config.ts
  friction?: false | number;

  // apply friction when in midair?
  midAirFriction?: boolean;

  // round coordinates?
  roundValues?: boolean;
}
