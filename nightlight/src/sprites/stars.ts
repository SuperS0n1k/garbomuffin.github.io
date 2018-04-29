import { AbstractSprite, ISpriteOptions } from "../engine/sprite";
import { Task } from "../engine/task";
import { toHex } from "../engine/utils";
import { Vector2D } from "../engine/vector2d";

/*
 * The stars in the background.
 */

// How often to update opacity
const UPDATE_EVERY = 6;

// How many times will it update in each cycle
// One cycle is Dark -> Bright or Bright -> Dark, not both
const ANIMATION_LENGTH = 10;

export class BackgroundStarsSprite extends AbstractSprite {
  private progress: number = 0;
  private direction: number = 1;
  private path: Path2D;

  constructor(opts: ISpriteOptions, positions: Vector2D[]) {
    super(opts);

    this.addTask(new Task({
      repeatEvery: UPDATE_EVERY,
      run: () => this.animate(),
    }));

    const path = new Path2D();
    this.path = path;
    for (const position of positions) {
      path.rect(position.x, position.y, this.width, this.height);
    }
  }

  private animate() {
    this.progress += this.direction;

    if (this.progress === 0 && this.direction === -1) {
      this.direction = 1;
      this.progress--;
    }

    if (this.progress === ANIMATION_LENGTH && this.direction === 1) {
      this.direction = -1;
      this.progress++;
    }
  }

  private clamp(x: number, min: number, max: number) {
    if (x < min) {
      return min;
    } else if (x > max) {
      return max;
    } else {
      return x;
    }
  }

  // Implement render as this extends AbstractSprite
  public render(ctx: CanvasRenderingContext2D) {
    if (!this.visible) {
      return;
    }

    const hex = (n: number) => {
      const h = toHex(n);
      if (h.length === 1) {
        return "0" + h;
      }
      return h;
    };

    const animationProgress = this.clamp(this.progress / ANIMATION_LENGTH, 0, 1);
    ctx.fillStyle = "#FFFFFF" + hex(Math.floor(animationProgress * 255));
    ctx.fill(this.path);
  }
}
