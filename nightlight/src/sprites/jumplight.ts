import { IImageSpriteOptions } from "../engine/sprites/imagesprite";
import { Task } from "../engine/task";
import { Block } from "./blocks/block";
import { PlayerSprite } from "./player/player";

/*
 * A light that will allow the player to jump again once while in the air.
 */

const HIDE_DURATION = 60 * 3;

export class JumpLight extends Block {
  constructor(opts: IImageSpriteOptions) {
    super(opts);

    this.addTask(() => this.testIntersects());
  }

  private show() {
    this.visible = true;
  }

  private activate(player: PlayerSprite) {
    player.hasJumpLight = true;
    this.visible = false;

    this.addTask(new Task({
      run: () => this.show(),
      delay: HIDE_DURATION,
    }));
  }

  public testIntersects() {
    if (this.visible && this.intersects(this.runtime.player)) {
      this.activate(this.runtime.player);
    }
  }
}
