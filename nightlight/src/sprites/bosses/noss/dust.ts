import { IImageSpriteOptions, ImageSprite } from "../../../engine/sprites/imagesprite";
import { Task } from "../../../engine/task";

const LIFESPAN = 20;
const STEP = 1;

export class NossBossDustSprite extends ImageSprite {
  constructor(options: IImageSpriteOptions) {
    super(options);

    this.addTask(new Task({
      run: () => this.destroy(),
      delay: LIFESPAN,
    }));

    this.addTask(() => this.move());
  }

  private move() {
    this.moveForward(STEP);
  }
}
