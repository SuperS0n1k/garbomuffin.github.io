import { Block, IBlockOptions } from "./blocks/block";

// Extends block rather than ImageSprite to use some more utility methods

export class LevelUpCoinSprite extends Block {
  constructor(opts: IBlockOptions) {
    super(opts);
    this.centerAlign();
    this.addTask(this.run);
  }

  public run() {
    const touchingPlayer = this.intersects(this.runtime.player);
    if (touchingPlayer) {
      this.runtime.level++;
      this.runtime.renderLevel();
    }
  }
}
