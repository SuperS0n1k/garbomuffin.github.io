import { IBlockOptions } from "./block";
import { SolidBlock } from "./solid";
import { PlayerSprite } from "../player/player";

export class SpikeBlock extends SolidBlock {
  public handleIntersect(sprite: AbstractSprite, horizontal: boolean) {
    super.handleIntersect(sprite, horizontal);

    if (sprite.y + sprite.height === this.y && sprite instanceof PlayerSprite) {
      sprite.kill();
    }
  }
}
