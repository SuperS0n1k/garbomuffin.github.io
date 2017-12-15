import { ImageSprite, IImageSpriteOptions } from "../../engine/sprites/imagesprite";

const LIFESPAN = 300;
const GHOST_RATE = 0.03;

// TODO: Max fragments

export interface IPlayerFragmentSpriteOptions extends IImageSpriteOptions {
  yv: number;
  xv: number;
  rv: number; // rotation velocity
}

export class PlayerFragmentSprite extends ImageSprite {
  private xv: number = 0;
  private yv: number = 0;
  private rv: number = 0;
  private lifespan: number = 0;

  constructor(opts: IPlayerFragmentSpriteOptions) {
    super(opts);

    this.xv = opts.xv;
    this.yv = opts.yv;
    this.rv = opts.rv;

    if (this.y >= this.runtime.canvas.height) {
      this.y = this.runtime.canvas.height - 1;
    }

    this.addTask(this.run);
  }

  private run() {
    this.lifespan++;

    const physicsResult = this.runBasicPhysics(this.xv, this.yv, {
      midAirFriction: false,
      roundValues: false,
    });
    this.xv = physicsResult.xv;
    this.yv = physicsResult.yv;

    if (physicsResult.onGround) {
      this.rv *= 0.5;
    }

    this.rotation += this.rv;

    if (this.lifespan >= LIFESPAN) {
      this.opacity -= GHOST_RATE;
    }

    if (this.opacity < 0 || this.y > this.runtime.canvas.height) {
      this.destroy();
    }
  }
}
