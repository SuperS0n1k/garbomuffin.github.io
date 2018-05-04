import { IImageSpriteOptions, ImageSprite } from "../../../engine/sprites/imagesprite";
import { Task } from "../../../engine/task";
import { EndingSprite } from "./EndingSprite";
import { Nightlight } from "../../game";

const MOVE_LENGTH = 368;

export class EndingSceneSprite extends ImageSprite {
  private readonly endX: number;
  private readonly endY: number;
  private readonly moveX: number;
  private readonly moveY: number;
  public runtime!: Nightlight;

  constructor(options: IImageSpriteOptions) {
    super(options);

    this.endX = 0;
    this.endY = this.runtime.canvas.height - this.height + 4;
    const xDistance = Math.abs(this.endX - this.x);
    const yDistance = Math.abs(this.endY - this.y);
    this.moveX = xDistance / MOVE_LENGTH;
    this.moveY = yDistance / MOVE_LENGTH;

    this.addTask((task) => this.move(task));
  }

  private move(task: Task) {
    this.x += this.moveX;
    this.y -= this.moveY;

    this.x = Math.min(this.x, this.endX);
    this.y = Math.max(this.y, this.endY);

    if (this.x === this.endX && this.y === this.endY) {
      const sprites = this.runtime.sprites;
      const endingSprite = sprites.filter((sprite) => sprite instanceof EndingSprite)[0] as EndingSprite;
      endingSprite.sceneMoveEnd();
      task.stop();
    }
  }
}
