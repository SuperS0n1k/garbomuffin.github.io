import { Task } from "engine/task";
import { Vector } from "engine/vector";
import { IBlockOptions, SolidBlock } from "./block";
import { runBasicPhysics } from "../../physics";

/*
 * A block that falls when you hit the switch.
 *
 * Will vibrate for a bit before disappearing.
 */

// Time between each vibration before falling
const VIBRATE_EVERY = 3;

// The distance to move when vibrating
const VIBRATE_RANGE = 2;

// How many times to vibrate
const VIBRATE_TIMES = 20;

// Delay before block will fall after vibrating
// Makes blocks from the bottom fall before the ones on the top, which looks nice
const FALL_DELAY_PER_Y = 0.25;

export abstract class AbstractFallingBlock extends SolidBlock {
  protected startingPosition: Vector;
  public xv: number = 0;
  public yv: number = 0;

  constructor(opts: IBlockOptions) {
    super(opts);

    this.startingPosition = new Vector(this.position);
  }

  public abstract trigger(): void;

  protected playSound() {
    this.runtime.playSound("blocks/smash");
  }

  protected fall(task: Task) {
    this.solid = false;

    const physicsResult = runBasicPhysics(this, {
      collision: false,
    });

    if (this.y >= this.runtime.canvas.height) {
      task.stop();
    }
  }

  get needsReinstantiate() {
    return true;
  }
}

export class InstantFallingBlock extends AbstractFallingBlock {
  public trigger() {
    this.playSound();
    this.addTask(new Task({
      run: (task) => this.fall(task),
      repeatEvery: 0,
    }));
  }

  get type() {
    return InstantFallingBlock;
  }
}

export class VibratingFallingBlock extends InstantFallingBlock {
  private vibrateProgress: number = 0;
  private frame: number = 0;

  get needsReinstantiate() {
    return true;
  }

  get type() {
    return VibratingFallingBlock;
  }

  public trigger() {
    this.x -= VIBRATE_RANGE / 2;
    this.addTask(new Task({
      run: (task) => this.vibrate(task),
      repeatEvery: 3,
    }));
  }

  private vibrate(task: Task) {
    this.vibrateProgress++;

    if (this.vibrateProgress === VIBRATE_TIMES) {
      const fromBottom = this.runtime.canvas.height - this.y;
      task.stop();
      this.position = new Vector(this.startingPosition);

      const delay = fromBottom * FALL_DELAY_PER_Y;
      this.addTask(new Task({
        run: (task2) => this.fall(task2),
        delay,
        repeatEvery: 0,
      }));

      this.addTask(new Task({
        run: () => this.playSound(),
        delay,
      }));
    } else if (this.vibrateProgress % 2 === 0) {
      this.x -= VIBRATE_RANGE;
    } else {
      this.x += VIBRATE_RANGE;
    }
  }
}
