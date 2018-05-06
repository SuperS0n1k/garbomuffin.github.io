import { IImageSpriteOptions, ImageSprite } from "../../engine/sprites/imagesprite";
import { NightlightLevelEditor } from "../editor";
import { LevelEditorMode } from "../mode";
import { LevelEditorIndexes } from "./LevelEditorIndexes";

export class BossSelectorSprite extends ImageSprite {
  public runtime!: NightlightLevelEditor;

  constructor(options: IImageSpriteOptions) {
    super(options);
    this.z = LevelEditorIndexes.Selector;
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
