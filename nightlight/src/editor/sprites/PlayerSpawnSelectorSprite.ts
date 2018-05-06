import { IImageSpriteOptions, ImageSprite } from "../../engine/sprites/imagesprite";
import { IPointSpawnType, IRangeSpawnType, TSpawnType } from "../../game/levels";
import { NightlightLevelEditor } from "../editor";
import { LevelEditorMode } from "../mode";
import { LevelEditorIndexes } from "./LevelEditorIndexes";

enum Mode {
  None,
  SelectingSpawnPoint,
}

export class PlayerSpawnSelectorSprite extends ImageSprite {
  public runtime!: NightlightLevelEditor;
  private mode: Mode = Mode.None;
  private ui = this.runtime.ui.playerSpawn;

  constructor(options: IImageSpriteOptions) {
    super(options);
    this.z = LevelEditorIndexes.Selector;
    this.opacity = 0.5;
    this.ui.spawnSelect.addEventListener("change", () => this.selectionChanged());
    this.ui.point.select.addEventListener("click", () => this.mode = Mode.SelectingSpawnPoint);
    this.addTask(() => this.run());
  }

  private run() {
    this.visible = false;
    if (this.runtime.mode !== LevelEditorMode.PlayerSpawn) {
      return;
    }

    if (this.mode === Mode.SelectingSpawnPoint) {
      const align = this.ui.point.gridAlign.checked;
      this.visible = true;

      const mouseX = this.runtime.mouse.position.x;
      const mouseY = this.runtime.mouse.position.y;
      if (align) {
        const distanceFromButton = this.runtime.canvas.height - mouseY;
        this.x = Math.round(mouseX / 8) * 8;
        this.y = this.runtime.canvas.height - (Math.round(distanceFromButton / 8) * 8);
      } else {
        this.x = mouseX;
        this.y = mouseY;
      }
      this.x -= (this.width / 2);
      this.y -= (this.height / 2);

      if (this.runtime.mouse.isClick) {
        this.mode = Mode.None;
        this.ui.point.x.value = this.x.toString();
        this.ui.point.y.value = this.y.toString();
      }
    } else if (this.mode === Mode.None) {
      const type = this.ui.spawnSelect.value;
      if (type === "point") {
        this.visible = true;
        this.x = +this.ui.point.x.value;
        this.y = +this.ui.point.y.value;
      }
    }
  }

  private selectionChanged() {
    const type = this.ui.spawnSelect.value;
    this.ui.point.container.style.display = type === "point" ? "block" : "";
    this.ui.range.container.style.display = type === "range" ? "block" : "";
  }

  get selection(): TSpawnType {
    const type = this.ui.spawnSelect.value;
    if (type === "default") {
      return {
        type: "default",
      };
    } else if (type === "range") {
      return {
        type: "range",
        min: +this.ui.range.min.value,
        max: +this.ui.range.max.value,
        requireSolid: this.ui.range.requireSolid.checked,
      };
    } else if (type === "point") {
      return {
        type: "point",
        x: +this.ui.point.x.value,
        y: +this.ui.point.y.value,
      };
    } else {
      throw new Error(`${type} is not a valid spawn or whatever`);
    }
  }

  set selection(selection: TSpawnType) {
    const type = selection.type;
    this.ui.spawnSelect.value = type;
    if (type === "default") {
      // nothing to do
    } else if (type === "range") {
      const s = selection as IRangeSpawnType;
      this.ui.range.min.value = s.min.toString();
      this.ui.range.max.value = s.max.toString();
      this.ui.range.requireSolid.checked = typeof s.requireSolid === "undefined" || s.requireSolid ? true : false;
    } else if (type === "point") {
      const s = selection as IPointSpawnType;
      this.ui.point.x.value = s.x.toString();
      this.ui.point.y.value = s.y.toString();
    } else {
      throw new Error(`${type} is not a valid spawn or whatever`);
    }
    this.selectionChanged();
  }
}
