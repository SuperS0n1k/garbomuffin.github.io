import { SolidBlock, IBlockOptions } from "./block";
import { AbstractSprite } from "../../engine/sprite";
import { PlayerSprite } from "../player/player";
import { ZIndexes } from "../zindex";

// Just like in the original scratch game
// One way blocks are terrible hacks that shouldn't work

// I don't know how this works anymore

export class OneWayBlock extends SolidBlock {
  private intersectsPlayer: boolean = false;

  constructor(opts: IBlockOptions) {
    super(opts);

    // make our tasks run before others (they run in reverse z order)
    this.z = ZIndexes.TaskPriority;

    this.addTask(this.run);
  }

  private run() {
    // ???
    if (!this.intersects(this.runtime.player)) {
      this.intersectsPlayer = false;
    }
  }

  public handleIntersect(sprite: AbstractSprite, velocity: number, horizontal: boolean) {
    if (sprite instanceof PlayerSprite) {
      if (sprite.yv > 0 || this.intersectsPlayer) {
        this.intersectsPlayer = true;
        return false;
      }
    }

    return super.handleIntersect(sprite, velocity, horizontal);
  }
}
