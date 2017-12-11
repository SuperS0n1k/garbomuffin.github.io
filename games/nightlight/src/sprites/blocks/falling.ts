import { SolidBlock, IBlockOptions } from "./block";
import { Task } from "../../engine/task";
import { Vector } from "../../engine/vector";

const VIBRATE_EVERY = 3;
const VIBRATE_RANGE = 2;
const VIBRATE_TIMES = 20;
const FALL_DELAY_PER_Y = 0.25;

export class FallingBlock extends SolidBlock {
  private startingPosition: Vector;
  private yv: number = 0;
  private vibrateProgress: number = 0;
  private frame: number = 0;

  constructor(opts: IBlockOptions) {
    super(opts);

    this.startingPosition = new Vector(this.position);
  }

  public trigger() {
    this.x -= VIBRATE_RANGE / 2;
    this.addTask(new Task({
      run: this.vibrate,
      repeatEvery: 3,
    }));
  }

  private vibrate(task: Task) {
    this.vibrateProgress++;

    if (this.vibrateProgress === VIBRATE_TIMES) {
      const fromBottom = this.runtime.canvas.height - this.y;
      task.stop();
      this.position = this.startingPosition;
      this.solid = false;
      this.addTask(new Task({
        run: this.fall,
        delay: fromBottom * FALL_DELAY_PER_Y,
        repeatEvery: 0,
      }));
    } else if (this.vibrateProgress % 2 === 0) {
      this.x -= VIBRATE_RANGE;
    } else {
      this.x += VIBRATE_RANGE;
    }
  }

  private fall(task: Task) {
    const physicsResult = this.runBasicPhysics(0, this.yv, {
      collision: false,
    });
    this.yv = physicsResult.yv;

    if (this.y >= this.runtime.canvas.height) {
      task.stop();
    }
  }
}
