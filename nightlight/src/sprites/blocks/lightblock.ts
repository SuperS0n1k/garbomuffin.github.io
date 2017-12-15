import { IBlockOptions, Block } from "./block";

// Idk what to name this

export abstract class LightBlock extends Block {
  constructor(opts: IBlockOptions) {
    super(opts);

    this.runtime.lightBlocks.push(this);
  }

  public toggleSolid() {
    this.solid = !this.solid;

    if (this.solid) {
      this.texture = this.runtime.getAsset("blocks/z");
    } else {
      this.texture = this.runtime.getAsset("blocks/y");
    }
  }
}

export class EnabledLightBlock extends LightBlock {
  public solid = true;
}

export class DisabledLightBlock extends LightBlock {
  public solid = false;
}
