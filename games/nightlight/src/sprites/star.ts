import { AbstractSprite, ISpriteOptions } from "../engine/sprite";
import { Task } from "../engine/task";

const UPDATE_EVERY = 6;
const ANIMATION_LENGTH = 6;

export class BackgroundStarSprite extends AbstractSprite {
  private progress: number = 0;
  private direction: number = 1;

  constructor(opts: ISpriteOptions) {
    super(opts);

    this.animate = this.animate.bind(this);

    this.addTask(new Task({
      repeatEvery: UPDATE_EVERY,
      run: this.animate,
    }));
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

  public render(ctx: CanvasRenderingContext2D) {
    const animationProgress = this.clamp(this.progress / ANIMATION_LENGTH, 0, 1);
    const color = Math.floor(255 * animationProgress);
    const hexCode = color.toString(16);

    // console.log(animationProgress);

    ctx.fillStyle = `#${hexCode}${hexCode}${hexCode}`;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
