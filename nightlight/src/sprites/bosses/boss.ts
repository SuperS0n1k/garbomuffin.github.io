import { ImageSprite, IImageSpriteOptions } from "../../engine/sprites/imagesprite";
import { Task } from "../../engine/task";

const PLAYER_JUMP_YV = 3;

export abstract class AbstractBoss extends ImageSprite {
  protected phaseDelay: number;

  constructor(options: IImageSpriteOptions) {
    super(options);
  }

  // call super.startRoutine() in implementations!!!
  protected startRoutine() {
    this.phaseDelay = 0;
  }

  protected addPhase(task: Task, afterDelay: number = 0) {
    task.delay += this.phaseDelay;
    if (task.repeatEvery > -1) {
      this.phaseDelay += task.repeatMax * (task.repeatEvery + 1);
    }
    this.phaseDelay += (task.originalOptions.delay) || 0;
    this.phaseDelay += afterDelay;
    this.addTask(task);
  }

  protected playerJumpedOn() {
    return this.intersects(this.runtime.player) && this.runtime.player.yv < -1;
  }

  protected bouncePlayer() {
    this.runtime.player.yv = PLAYER_JUMP_YV;
  }
}
