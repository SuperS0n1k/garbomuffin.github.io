import { Sprite } from "./sprite";
import { GameRuntime } from "./game";

export class Container<T extends Sprite = Sprite> {
  static runtime: GameRuntime;
  public runtime: GameRuntime = Container.runtime;

  constructor() {
    this.runtime.containers.push(this);
  }

  *[Symbol.iterator]() {
    for (const sprite of this.sprites){
      yield sprite;
    }
  }

  public push(...items: T[]): number {
    return this.sprites.push(...items);
  }

  public sprites: T[] = [];
}
