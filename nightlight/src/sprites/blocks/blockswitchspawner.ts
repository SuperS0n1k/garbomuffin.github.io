import { SolidBlock, IBlockOptions } from "./block";
import { BlockSwitch } from "../blockswitch";
import { BLOCK_HEIGHT } from "../../config";
import { Vector } from "../../engine/vector";

// Block that spawns a switch
export class BlockSwitchSpawnerBlock extends SolidBlock {
  constructor(opts: IBlockOptions) {
    super(opts);

    const position = new Vector(this.position);
    position.y -= BLOCK_HEIGHT;
    new BlockSwitch({
      texture: this.runtime.getImage("blocks/button/red"),
      position,
      spawner: this,
    });
  }
}
