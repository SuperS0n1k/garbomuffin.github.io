import { Block, IBlockOptions } from "./block";
import { GrassBlock } from "./grass";
import { GroundedCenteredBlock } from "./center";
import { Vector } from "../../engine/vector";

export class TallGrassBlock extends Block {
  constructor(opts: IBlockOptions) {
    super(opts);

    new GrassBlock({
      position: new Vector(opts.position),
      texture: this.runtime.getAsset("blocks/k"),
    });

    this.groundedCenterAlign();
  }
}
