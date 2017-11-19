import { TextSprite, ITextSpriteOptions } from "../../engine/sprites/textsprite";

export class GlobalHighscoreTextSprite extends TextSprite {
  constructor(options: ITextSpriteOptions) {
    super(options);

    this.addTask(this.updateText);
  }

  private updateText() {
    this.text = `Global Highscore: ${this.runtime.globalHighscore}`;
  }
}
