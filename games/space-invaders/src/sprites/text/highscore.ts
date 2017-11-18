import { TextSprite, ITextSpriteOptions } from "../../engine/sprites/textsprite";

export class HighscoreTextSprite extends TextSprite {
  constructor(options: ITextSpriteOptions) {
    super(options);

    this.addTask(this.updateText);
  }

  private updateText() {
    this.text = `Highscore: ${this.runtime.highscore}`;
  }
}
