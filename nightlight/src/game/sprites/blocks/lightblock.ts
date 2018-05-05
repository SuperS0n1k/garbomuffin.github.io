import { Block, IBlockOptions } from "./block";

/*
 * A block that is toggled solid/not solid when a switch is hit.
 */

export enum LightBlockGroups {
  RedGreen = 0,
}

export abstract class LightBlock extends Block {
  public solid: boolean = true;
  public group: number = 0;

  constructor(options: IBlockOptions, group: number) {
    super(options);
    this.group = group;
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
export abstract class EnabledLightBlock extends LightBlock {
  constructor(options: IBlockOptions, group: number) {
    super(options, group);
    this.setSolid(true);
  }
}
export abstract class DisabledLightBlock extends LightBlock {
  constructor(options: IBlockOptions, group: number) {
    super(options, group);
    this.setSolid(false);
  }
}

export class RedGreenEnabledLightBlock extends EnabledLightBlock {
  constructor(opts: IBlockOptions) {
    super(opts, LightBlockGroups.RedGreen);
  }
  get type() { return RedGreenEnabledLightBlock; }
}
export class RedGreenDisabledLightBlock extends DisabledLightBlock {
  constructor(opts: IBlockOptions) {
    super(opts, LightBlockGroups.RedGreen);
  }
  get type() { return RedGreenDisabledLightBlock; }
}
