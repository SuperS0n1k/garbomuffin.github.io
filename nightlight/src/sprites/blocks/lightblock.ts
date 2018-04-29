import { Block, IBlockOptions } from "./block";

/*
 * A block that is toggled solid/not solid when a switch is hit.
 */

export abstract class LightBlock extends Block {
  public solid: boolean = true;
  public abstract startingState: boolean;

  constructor(options: IBlockOptions) {
    super(options);
  }

  protected setSolid(solid: boolean) {
    this.solid = solid;
    if (this.solid) {
      this.texture = this.runtime.getImage("blocks/z");
    } else {
      this.texture = this.runtime.getImage("blocks/y");
    }
  }

  get needsReinstantiate() {
    return true;
  }

  public toggleSolid() {
    this.setSolid(!this.solid);
  }
}

export class EnabledLightBlock extends LightBlock {
  public startingState = true;
  constructor(options: IBlockOptions) {
    super(options);
    this.setSolid(this.startingState);
  }

  get type() {
    return EnabledLightBlock;
  }
}

export class DisabledLightBlock extends LightBlock {
  public startingState = false;
  constructor(options: IBlockOptions) {
    super(options);
    this.setSolid(this.startingState);
  }

  get type() {
    return DisabledLightBlock;
  }
}
