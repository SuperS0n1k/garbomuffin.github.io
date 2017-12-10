import { Block, IBlockOptions } from "./block";

export class SpikeBlock extends Block {
  constructor(opts: IBlockOptions) {
    super(opts);

    this.addTask(this.run);
  }

  private run() {
    if (this.intersects(this.runtime.player)) {
      this.runtime.player.kill();
    }
  }
}
