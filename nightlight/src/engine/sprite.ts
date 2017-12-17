import { Container } from "./container";
import { Vector } from "./vector";
import { Vector2D } from "./vector2d";
import { TaskRunner } from "./task";
import { Sprite, TGame } from "./types";
import { getOrDefault, degreeToRadians } from "./utils";
import { FRICTION, GRAVITY } from "../config";
import { Bounds } from "./bounds";
import { ImageSprite } from "./sprites/imagesprite";

export interface ISpriteOptions {
  position: Vector;

  width?: number;
  height?: number;

  scale?: Vector2D;
  visible?: boolean;
  rotation?: number;
  rotationPoint?: Vector2D;
  opacity?: number;

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

  public constructor(options: ISpriteOptions) {
    super();

    this.position = options.position;

    this.width = getOrDefault(options.width, 0);
    this.height = getOrDefault(options.height, 0);
    this.scale = getOrDefault(options.scale, new Vector2D(1, 1));
    this.persistent = getOrDefault(options.persistent, false);
    this.visible = getOrDefault(options.visible, true);
    this.rotation = getOrDefault(options.rotation, 0);
    this.opacity = getOrDefault(options.opacity, 1);
    this.rotationPoint = getOrDefault(options.rotationPoint, new Vector2D(0.5, 0.5));

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

  // Test for intersections by literally rendering the sprites and looking for spots where they both exist
  // This needs some MASSIVE speed ups
  public complexIntersects(thing: Sprite): boolean {
    // some inspiration from:
    // https://github.com/nathan/phosphorus/blob/master/phosphorus.js#L1663

    const createCanvas = () => {
      const canvas = document.createElement("canvas");
      canvas.width = this.runtime.canvas.width;
      canvas.height = this.runtime.canvas.height;
      return canvas;
    };

    const canvasA = createCanvas();
    const canvasB = createCanvas();

    const ctxA = canvasA.getContext("2d") as CanvasRenderingContext2D;
    const ctxB = canvasB.getContext("2d") as CanvasRenderingContext2D;

    this.render(ctxA);
    thing.render(ctxB);

    const width = canvasA.width;
    const height = canvasA.height;
    const dataA = ctxA.getImageData(0, 0, width, height).data;
    const dataB = ctxB.getImageData(0, 0, width, height).data;

    const length = dataA.length;
    for (let i = 0; i < length; i += 4) {
      if (dataA[i + 3] && dataB[i + 3]) {
        return true;
      }
    }

    return false;
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

  //
  // Nightlight related code
  //

  protected runBasicPhysics(xv: number, yv: number, options: IPhysicsOptions = {}): IPhysicsResult {
    options.collision = getOrDefault(options.collision, true);
    options.restrictPositionValues = getOrDefault(options.restrictPositionValues, true);
    options.friction = getOrDefault(options.friction, true);
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

    if (options.friction) {
      if (onGround || options.midAirFriction) {
        xv *= FRICTION;
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
    for (const block of this.runtime.blocks) {
      if (block.solid && this.intersects(block) && block.handleIntersect(this, velocity, horizontal) !== false) {
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

  // apply friction?
  friction?: boolean;

  // apply friction when in midair?
  midAirFriction?: boolean;

  // round coordinates?
  roundValues?: boolean;
}
