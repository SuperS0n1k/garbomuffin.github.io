// It's a sprite.

import { Position } from "./position";
import { TImage, TGame } from "./types";
import { GameRuntime } from "./game";
import { TaskRunner, Task } from "./task";
import { Container } from "./container";
import { Scale } from "./scale";

// the options that can be given
export interface ISpriteOptions {
  position: Position;

  texture: TImage;
  width?: number;
  height?: number;

  scale?: Scale;
}

// if obj is defined, return obj
// else return def
// used as less verbose option defaulting without neglecting falsy values (|| does that)
function option(obj: any, def: any) {
  if (typeof obj === "undefined") {
    return def;
  } else {
    return obj;
  }
}

export class Sprite extends TaskRunner {
  static runtime: TGame;
  public runtime: TGame = Sprite.runtime;

  public position: Position;
  public texture: TImage;
  public width: number;
  public height: number;
  public scale: Scale;

  constructor(options: ISpriteOptions) {
    super();

    this.position = options.position;
    this.texture = options.texture;

    this.width = option(options.width, this.texture.width);
    this.height = option(options.height, this.texture.height);

    this.scale = option(options.scale, new Scale(1));

    this.runtime.sprites.push(this);
  }

  public update() {
    this.runTasks();
  }

  public render(ctx: CanvasRenderingContext2D) {
    ctx.scale(this.scale.x, this.scale.y);
    ctx.drawImage(this.texture, this.x, this.y, this.width, this.height);
  }

  public destroy() {
    this._removeFromContainer(this.runtime.sprites);
    for (const container of this.runtime.containers) {
      this._removeFromContainer(container);
    }
  }

  private _removeFromContainer(container: Container) {
    const index = container.sprites.indexOf(this);
    if (index > -1) {
      container.sprites.splice(index, 1);
    }
  }

  public containsPoint(p: Position) {
    return p.x > this.x && p.x < this.x + this.width &&
      p.y > this.y && p.y < this.y + this.height;
  }

  get x() {
    return this.position.x;
  }
  get y() {
    return this.position.y;
  }
  get z() {
    return this.position.z;
  }
  set x(x) {
    this.position.x = x;
  }
  set y(y) {
    this.position.y = y;
  }
  set z(z) {
    this.position.z = z;
  }
}
