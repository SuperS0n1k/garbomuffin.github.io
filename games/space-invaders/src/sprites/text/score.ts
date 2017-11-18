import { TextSprite, ITextSpriteOptions } from "../../engine/sprites/textsprite";

export class ScoreTextSprite extends TextSprite {
  constructor(options: ITextSpriteOptions) {
    super(options);

    this.addTask(this.updateText);
  }

  private updateText() {
    this.text = `Score: ${this.runtime.score}`;
  }
}
