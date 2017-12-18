import { SolidBlock } from "./block";
import { AbstractSprite } from "../../engine/sprite";

// This is so much cleaner

export class OneWayBlock extends SolidBlock {
  private intersectsPlayer: boolean = false;

  public handleIntersect(sprite: AbstractSprite, velocity: number, horizontal: boolean) {
    if (horizontal) {
      return false;
    } else {
      const previousY = sprite.y + velocity;
      if (previousY + sprite.height > this.y) {
        return false;
      } else {
        return super.handleIntersect(sprite, velocity, horizontal);
      }
    }
  }
}
