import { Block, IBlockOptions } from "./block";
import { BLOCK_HEIGHT } from "../../config";

export class GrassBlock extends Block {
  constructor(opts: IBlockOptions) {
    super(opts);

    this.y += BLOCK_HEIGHT;
  }
}
