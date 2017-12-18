/*
 * A block that is toggled solid/not solid when a switch is hit.
 */

import { IBlockOptions, Block } from "./block";

export abstract class LightBlock extends Block {
  constructor(opts: IBlockOptions) {
    super(opts);

    this.runtime.lightBlocks.push(this);
  }

  public toggleSolid() {
    this.solid = !this.solid;

    if (this.solid) {
      this.texture = this.runtime.getImage("blocks/z");
    } else {
      this.texture = this.runtime.getImage("blocks/y");
    }
  }
}

export class EnabledLightBlock extends LightBlock {
  public solid = true;
}

export class DisabledLightBlock extends LightBlock {
  public solid = false;
}
