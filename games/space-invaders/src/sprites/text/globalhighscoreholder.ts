import { TextSprite, ITextSpriteOptions } from "../../engine/sprites/textsprite";

export class GlobalHighscoreHolderTextSprite extends TextSprite {
  constructor(options: ITextSpriteOptions) {
    super(options);

    this.addTask(this.updateText);
  }

  private updateText() {
    this.text = `Highscore Holder: ${this.runtime.globalHighscoreHolder}`;
  }
}
