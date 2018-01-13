import { Container } from "./container";
import { Vector } from "./vector";
import { Vector2D } from "./vector2d";
import { TaskRunner } from "./task";
import { Sprite, TGame } from "./types";
import { getOrDefault, degreeToRadians } from "./utils";
import { FRICTION, GRAVITY } from "../config";
import { ImageSprite } from "./sprites/imagesprite";
import { Block } from "../sprites/blocks/block";

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

    this.runtime.sprites.push(this);
  }

  public abstract render(ctx: CanvasRenderingContext2D): void;

  public update() {
    this.runTasks();
  }

  public destroy() {
    this._removeFromContainer(this.runtime.sprites);
    for (const container of this.runtime.containers) {
      this._removeFromContainer(container);
    }
    this.resetTasks(); // stop all future things from running

    // removed from all lists, should be effectively invisible
    // allows some nightlight optimizations to not ruin things
    this.visible = false;
  }

  private _removeFromContainer(container: Container) {
    const index = container.sprites.indexOf(this);
    if (index > -1) {
      container.sprites.splice(index, 1);
    }
  }

  // TODO: rotation
  public intersects(thing: Sprite | Container | Sprite[]): boolean {
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

    // optimization: if we are consistently running into blocks above us then break early
    // if 5 blocks in a row are definitely above us then we know we are probably done and stop
    // this is a major performance improvement
    let above = 0;

    for (const block of this.runtime.blocks) {
      if (block.y + block.width < this.y) {
        above++;
        if (above > 5) {
          break;
        }
      } else {
        above = 0;
      }

      if (intersects(block)) {
        self._lastSolidBlock = block;
        return true;
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
