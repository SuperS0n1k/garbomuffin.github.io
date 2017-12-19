/*
 * A container holds sprites
 *
 * Has a few utilty methods that a normal array does not and allows more flexibility
 */

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

  get length() {
    return this.sprites.length;
  }
}
