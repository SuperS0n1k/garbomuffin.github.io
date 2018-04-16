import { Vector } from "../../engine/vector";
import { Block, IBlockOptions } from "./block";
import { GrassBlock } from "./grass";

/*
 * It's a tall grass block.
 *
 * It is spawned like normal grass blocks but also shows a taller grass on top of the block
 * It creates a normal grass to go below it
 */

export class TallGrassBlock extends Block {
  public static: boolean = true;
  constructor(opts: IBlockOptions) {
    super(opts);

    const block = new GrassBlock({
      position: new Vector(this.position),
      texture: this.runtime.getImage("blocks/k"),
    });
    // dirty hack to fix an OOB bug
    if (this.runtime.level === 4) {
      block.solid = true;
    }

    this.floorAlign();
  }
}
