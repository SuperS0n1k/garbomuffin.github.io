/*
 * A block that toggles the solidity of LightBlocks
 */

import { SolidBlock, IBlockOptions } from "./block";
import { AbstractSprite } from "../../engine/sprite";
import { PlayerSprite } from "../player/player";
import { Task } from "../../engine/task";

// The total frames in the animation
const ANIMATION_FRAMES = 2;

// The length per frame
const ANIMATION_FRAME_LENGTH = 5;

// How long the switch will remaing as pressed before deleting itself
const DESTROY_DELAY = 30;

export class LightSwitchBlock extends SolidBlock {
  private activated: boolean = false;
  private animationProgress: number = 1;

  constructor(opts: IBlockOptions) {
    super(opts);

    this.addTask(new Task({
      run: this.animate,
      repeatEvery: ANIMATION_FRAME_LENGTH,
    }));
  }

  private animate(task: Task) {
    if (this.activated) {
      task.stop();
      return;
    }

    this.animationProgress++;
    if (this.animationProgress > ANIMATION_FRAMES) {
      this.animationProgress = 1;
    }
    this.texture = this.runtime.getImage(`blocks/lightbutton/${this.animationProgress}`);
  }

  private activate() {
    this.activated = true;

    const lightBlocks = this.runtime.lightBlocks;
    for (const block of lightBlocks) {
      block.toggleSolid();
    }

    this.texture = this.runtime.getImage("blocks/lightbutton/down");
    this.updateDimensions();
    this.floorAlign();

    this.addTask(new Task({
      run: this.destroy,
      delay: DESTROY_DELAY,
    }));

    this.runtime.playSound("blocks/fds");
  }

  public handleIntersect(sprite: AbstractSprite, velocity: number, horizontal: boolean) {
    super.handleIntersect(sprite, velocity, horizontal);

    if (!this.activated && sprite.y + sprite.height === this.y && sprite instanceof PlayerSprite) {
      this.activate();
      return false;
    }
  }
}
