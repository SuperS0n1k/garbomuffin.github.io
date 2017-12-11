import { IBlockOptions, SolidBlock } from "./block";
import { PlayerSprite } from "../player/player";
import { AbstractSprite } from "../../engine/sprite";

export class SpikeBlock extends SolidBlock {
  constructor(opts: IBlockOptions) {
    super(opts);

    this.groundedCenterAlign();
  }

  public handleIntersect(sprite: AbstractSprite, horizontal: boolean) {
    super.handleIntersect(sprite, horizontal);

    if (sprite.y + sprite.height === this.y && sprite instanceof PlayerSprite) {
      sprite.kill();
    }
  }
}
