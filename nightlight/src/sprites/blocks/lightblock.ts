import { Block } from "./block";

/*
 * A block that is toggled solid/not solid when a switch is hit.
 */

export abstract class LightBlock extends Block {
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
