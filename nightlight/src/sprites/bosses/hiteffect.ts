/*
 * Health events for bosses
 *
 * +0, +1, -1
 */

import { ImageSprite, IImageSpriteOptions } from "../../engine/sprites/imagesprite";

const LIFESPAN = 60;
const OPACITY_PER_FRAME = 1 / LIFESPAN;
const SIZE_CHANGE = 0.01;
const Y_CHANGE = 0.1;
const X_CHANGE = 0.1;

export class HitEffectSprite extends ImageSprite {
  private lifespan: number = 0;

  private readonly startingHeight: number;
  private readonly startingWidth: number;

  constructor(opts: IImageSpriteOptions) {
    super(opts);

    this.addTask(this.run);

    this.startingHeight = this.height;
    this.startingWidth = this.width;
  }

  private run() {
    this.lifespan++;
    if (this.lifespan >= LIFESPAN) {
      this.destroy();
    }

    this.opacity -= OPACITY_PER_FRAME;

    this.height = this.startingHeight * (1 + (this.lifespan * SIZE_CHANGE));
    this.width = this.startingWidth * (1 + (this.lifespan * SIZE_CHANGE));

    this.x += X_CHANGE;
    this.y -= Y_CHANGE;
  }
}
