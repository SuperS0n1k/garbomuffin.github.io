// a container contains sprites
// isn't that earth shattering or what?
// these were used more heavily in my older games
// currently only one of these are used: the sprites list

import { GameRuntime } from "./runtime";
import { Sprite, TGame } from "./types";

import "../3rd-party/stableSort";

export class Container<T extends Sprite = Sprite> {
  public static runtime: TGame;
  public runtime: TGame = Container.runtime;
  public sprites: T[] = [];

  constructor() {
    this.runtime.containers.push(this);
  }

  public push(...items: T[]): number {
    return this.sprites.push(...items);
  }

  public *[Symbol.iterator]() {
    for (const sprite of this.sprites) {
      yield sprite;
    }
  }

  public sort() {
    this.sprites.stableSort((a, b) => {
      return a.position.z - b.position.z;
    });
  }
}
