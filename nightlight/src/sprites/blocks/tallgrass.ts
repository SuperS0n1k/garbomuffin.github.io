/*
 * It's a tall grass block.
 *
 * It is spawned like normal grass blocks but also shows a taller grass on top of the block
 * It creates a normal grass to go below it
 */

import { Block, IBlockOptions } from "./block";
import { GrassBlock } from "./grass";
import { Vector } from "../../engine/vector";

export class TallGrassBlock extends Block {
  constructor(opts: IBlockOptions) {
    super(opts);

    new GrassBlock({
      position: new Vector(opts.position),
      texture: this.runtime.getImage("blocks/k"),
    });

    this.floorAlign();
  }
}
