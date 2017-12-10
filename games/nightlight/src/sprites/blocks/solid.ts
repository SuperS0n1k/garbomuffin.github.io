import { Block } from "./block";
import { Sprite } from "../../engine/types";

export class SolidBlock extends Block {
  public handleIntersect(sprite: Sprite, horizontal: boolean): void {
    if (horizontal) {
      if (sprite.x > this.x) {
        sprite.x = this.x + sprite.width;
      } else {
        sprite.x = this.x - sprite.width;
      }
    } else {
      if (sprite.y < this.y) {
        sprite.y = this.y - sprite.height;
      } else {
        sprite.y = this.y + sprite.height;
      }
    }
  }
}
