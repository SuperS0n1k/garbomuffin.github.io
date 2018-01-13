/*
 * A light that will allow the player to jump again once while in the air.
 */

import { Block, IBlockOptions, SolidBlock } from "./blocks/block";
import { AbstractSprite } from "../engine/sprite";
import { PlayerSprite } from "./player/player";
import { Task } from "../engine/task";
import { IImageSpriteOptions } from "../engine/sprites/imagesprite";

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
