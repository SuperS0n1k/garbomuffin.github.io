import { IImageSpriteOptions, ImageSprite } from "../../engine/sprites/imagesprite";
import { NightlightLevelEditor } from "../editor";
import { LevelEditorMode } from "../mode";

export class BossSelectorSprite extends ImageSprite {
  public runtime!: NightlightLevelEditor;

  constructor(options: IImageSpriteOptions) {
    super(options);

    this.addTask(() => this.run());
    this.opacity = 0.5;
  }

  private run() {
    if (this.runtime.mode !== LevelEditorMode.Boss) {
      this.visible = false;
      return;
    }
    this.visible = true;
  }
}
