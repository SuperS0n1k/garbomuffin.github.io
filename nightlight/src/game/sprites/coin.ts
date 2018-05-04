import { Task } from "../../engine/task";
import { Vector } from "../../engine/vector";
import { Block, IBlockOptions } from "./blocks/block";

/*
 * The coin that levels you up
 */

// Length of an animation frame
const FRAME_LENGTH = 4;

// The total frames in the animation
const TOTAL_FRAMES = 4;

export class LevelUpCoinSprite extends Block {
  private animationFrame: number = 1;
  private startingPosition: Vector;

  constructor(opts: IBlockOptions) {
    super(opts);

    // In order to stay centered after changing position it will recenter using the startingPosition
    this.startingPosition = new Vector(this.position);

    this.centerAlign();
    this.addTask(() => this.run());
    this.addTask(new Task({
      run: () => this.animate(),
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

    this.texture = this.runtime.getImage(`coin/${this.animationFrame}`);
    this.updateDimensions();

    this.position = new Vector(this.startingPosition);
    this.centerAlign();
  }
}
