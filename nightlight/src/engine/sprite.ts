import { Container } from "./container";
import { Vector } from "./vector";
import { Vector2D } from "./vector2d";
import { TaskRunner } from "./task";
import { Sprite, TGame } from "./types";
import { getOrDefault } from "./utils";
import { FRICTION, GRAVITY } from "../config";

export interface ISpriteOptions {
  position: Vector;

  width?: number;
  height?: number;

  scale?: Vector2D;
  visible?: boolean;

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

  public containsPoint(p: Vector) {
    return p.x > this.x &&
      p.x < this.x + this.width &&
      p.y > this.y &&
      p.y < this.y + this.height;
  }

  public intersects(thing: Sprite | Container | Sprite[]) {
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
    options.inAirFriction = getOrDefault(options.inAirFriction, true);
    options.restrictPositionValues = getOrDefault(options.restrictPositionValues, true);
    options.friction = getOrDefault(options.friction, true);
    options.midAirFriction = getOrDefault(options.midAirFriction, true);

    this.x += xv;
    if (options.collision && this.handleCollision(true)) {
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
    if (options.collision && this.handleCollision(false)) {
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

    this.x = Math.round(this.x);
    this.y = Math.round(this.y);

    return {
      xv, yv, onGround,
    };
  }

  private handleCollision(horizontal: boolean) {
    for (const block of this.runtime.blocks) {
      if (block.solid && this.intersects(block) && block.handleIntersect(this, horizontal) !== false) {
        block.handleIntersect(this, horizontal);
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

  // apply friction while in the air?
  inAirFriction?: boolean;

  // restrict x values into 0 <= x <= CANVAS_WIDTH?
  restrictPositionValues?: boolean;

  // apply friction?
  friction?: boolean;

  // apply friction when in midair?
  midAirFriction?: boolean;
}
