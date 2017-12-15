import { IBlockOptions, SolidBlock } from "./block";
import { PlayerSprite } from "../player/player";
import { AbstractSprite } from "../../engine/sprite";

abstract class SpikeBlock extends SolidBlock {
  protected abstract canKill(sprite: AbstractSprite): boolean;

  public handleIntersect(sprite: AbstractSprite, horizontal: boolean) {
    super.handleIntersect(sprite, horizontal);

    if (this.canKill(sprite) && sprite instanceof PlayerSprite) {
      sprite.kill();
      return false;
    }
  }
}

export class UpSpikeBlock extends SpikeBlock {
  constructor(opts: IBlockOptions) {
    super(opts);

    this.floorAlign();
  }

  protected canKill(sprite: AbstractSprite) {
    return sprite.y + sprite.height === this.y;
  }
}

export class DownSpikeBlock extends SpikeBlock {
  // Already aligned due to spawning

  protected canKill(sprite: AbstractSprite) {
    return sprite.y === this.y + this.height;
  }
}

export class LeftSpikeBlock extends SpikeBlock {
  constructor(opts: IBlockOptions) {
    super(opts);

    this.leftAlign();
  }

  protected canKill(sprite: AbstractSprite) {
    return sprite.x + sprite.width === this.x;
  }
}

export class RightSpikeBlock extends SpikeBlock {
  // Already aligned due to spawning

  protected canKill(sprite: AbstractSprite) {
    return sprite.x === this.x + this.width;
  }
}