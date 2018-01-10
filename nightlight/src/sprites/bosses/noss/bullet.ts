import { ImageSprite, IImageSpriteOptions } from "../../../engine/sprites/imagesprite";
import { Task } from "../../../engine/task";
import { Vector } from "../../../engine/vector";
import { clamp } from "../../../utils";

const GLIDE_TIME = 30;
const SPEED_GAIN = 0.5;
const TURN_SPEED = 7.5;
export const MOVE_TIME = 180;

export class NossBossBulletSprite extends ImageSprite {
  private speed: number = 0;
  private center: Vector;
  private glideMoveSpeed: number;

  constructor(options: IImageSpriteOptions) {
    super(options);

    // TODO: actual gliding
    this.addTask(new Task({
      run: () => this.glideToCenter(),
      repeatEvery: 0,
      repeatMax: GLIDE_TIME,
    }));
    const height = this.runtime.canvas.height;
    const width = this.runtime.canvas.width;
    this.center = new Vector((width / 2) - (this.width / 2), (height / 2) - (this.height / 2));
    this.glideMoveSpeed = this.distanceTo(this.center) / GLIDE_TIME;

    this.addTask(new Task({
      run: () => this.move(),
      delay: GLIDE_TIME,
      repeatEvery: 0,
      repeatMax: MOVE_TIME,
    }));
    this.addTask(new Task({
      run: () => this.destroy(),
      delay: MOVE_TIME,
    }));
    this.rotation = 45;

  }

  // TODO: actual gliding
  private glideToCenter() {
    this.position = this.center;
  }

  private move() {
    this.speed += SPEED_GAIN;
    this.rotation -= TURN_SPEED;
    this.moveForward(this.speed);

    this.x = clamp(this.x, 0, this.runtime.canvas.width);
    this.y = clamp(this.y, 0, this.runtime.canvas.height);

    if (this.intersects(this.runtime.player)) {
      this.runtime.player.kill();
    }
  }
}
