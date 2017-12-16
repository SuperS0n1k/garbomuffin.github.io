import { Block, IBlockOptions } from "./blocks/block";
import { Task } from "../engine/task";
import { Vector } from "../engine/vector";

const FRAME_LENGTH = 3;
const TOTAL_FRAMES = 4;

export class LevelUpCoinSprite extends Block {
  private animationFrame: number = 1;

  constructor(opts: IBlockOptions) {
    super(opts);
    this.centerAlign();
    this.addTask(this.run);
    this.addTask(new Task({
      run: this.animate,
      repeatEvery: FRAME_LENGTH,
      delay: FRAME_LENGTH,
    }));
  }

  public run() {
    const touchingPlayer = this.intersects(this.runtime.player);
    if (touchingPlayer) {
      this.runtime.playSound("blocks/coin");
      this.runtime.level++;
      this.runtime.renderLevel();
    }
  }

  public animate() {
    this.animationFrame++;

    if (this.animationFrame > TOTAL_FRAMES) {
      this.animationFrame = 1;
    }
  }
}
