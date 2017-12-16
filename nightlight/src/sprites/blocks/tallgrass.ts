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
