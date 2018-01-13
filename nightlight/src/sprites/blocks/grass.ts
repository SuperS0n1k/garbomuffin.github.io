/*
 * It's a grass block.
 *
 * It is spawned on top of the regular blocks and moves itself down onto the block below.
 */

import { Block, IBlockOptions } from "./block";
import { BLOCK_HEIGHT } from "../../config";

export class GrassBlock extends Block {
  // there are a few visual bugs that come if you make this static
  // public static: boolean = true;

  constructor(opts: IBlockOptions) {
    super(opts);

    // Move ourselves down
    this.y += BLOCK_HEIGHT;
  }
}
