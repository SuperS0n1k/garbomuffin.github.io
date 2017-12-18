/*
 * A light that will allow the player to jump again once while in the air.
 */

import { Block, IBlockOptions, SolidBlock } from "./blocks/block";
import { AbstractSprite } from "../engine/sprite";
import { PlayerSprite } from "./player/player";
import { Task } from "../engine/task";

const HIDE_DURATION = 60 * 3;

export class JumpLight extends SolidBlock {
  private show() {
    this.visible = true;
  }

  private activate(player: PlayerSprite) {
    player.hasJumpLight = true;
    this.visible = false;

    this.addTask(new Task({
      run: this.show,
      delay: HIDE_DURATION,
    }));
  }

  public handleIntersect(sprite: AbstractSprite, velocity: number, horizontal: boolean) {
    // Only do things for players
    if (sprite instanceof PlayerSprite) {
      if (this.visible) {
        this.activate(sprite);
      }
    }

    // Never solid
    return false;
  }
}
