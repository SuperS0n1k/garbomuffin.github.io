import { BLOCK_HEIGHT } from "../../config";
import { Vector } from "../../engine/vector";
import { BlockSwitch } from "../blockswitch";
import { IBlockOptions, SolidBlock } from "./block";

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
