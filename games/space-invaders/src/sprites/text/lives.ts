import { TextSprite, ITextSpriteOptions } from "../../engine/sprites/textsprite";

export class LivesTextSprite extends TextSprite {
  constructor(options: ITextSpriteOptions) {
    super(options);

    this.addTask(this.updateText);
  }

  private updateText() {
    this.text = `Lives: ${this.runtime.lives}`;
  }
}
