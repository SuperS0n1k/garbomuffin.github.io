import { IImageSpriteOptions, ImageSprite } from "../../engine/sprites/imagesprite";
import { Task } from "../../engine/task";

const FADE_LENGTH = 100;

export class EndingThumbSprite extends ImageSprite {
  constructor(options: IImageSpriteOptions) {
    super(options);

    this.opacity = 0;

    this.addTask(new Task({
      run: () => this.fadeIn(),
      repeatEvery: 0,
      repeatMax: FADE_LENGTH,
      onend: () => this.opacity = 1, // fix any possible floating point errors or something
    }));
  }

  private fadeIn() {
    this.opacity += 1 / FADE_LENGTH;
  }
}
