import { IImageSpriteOptions, ImageSprite } from "../../engine/sprites/imagesprite";
import { Vector2D } from "../../engine/vector2d";
import { NightlightLevelEditor } from "../editor";
import { LevelEditorMode } from "../mode";
import { LevelEditorIndexes } from "./LevelEditorIndexes";

enum Mode {
  Add,
  AddMoved,
  Move,
  Remove,
}

export class JumpLightSelectorSprite extends ImageSprite {
  public runtime!: NightlightLevelEditor;
  public mode: Mode = Mode.Add;
  public outlinePoint: Vector2D | null = null;
  public snapToGrid: boolean = true;

  constructor(opts: IImageSpriteOptions) {
    super(opts);
    this.opacity = 0.5;
    this.z = LevelEditorIndexes.Selector;
    this.addTask(() => this.run());
    this.setMode(this.mode);
    this.runtime.ui.jumpLights.add.addEventListener("click", () => this.setMode(Mode.Add));
    this.runtime.ui.jumpLights.move.addEventListener("click", () => this.setMode(Mode.Move));
    this.runtime.ui.jumpLights.remove.addEventListener("click", () => this.setMode(Mode.Remove));
    this.runtime.ui.jumpLights.snapToGrid.addEventListener("change", () => {
      this.snapToGrid = this.runtime.ui.jumpLights.snapToGrid.checked;
    });
    this.snapToGrid = this.runtime.ui.jumpLights.snapToGrid.checked;
  }

  private run() {
    if (this.runtime.mode !== LevelEditorMode.JumpLights) {
      this.visible = false;
      return;
    }
    const mouseX = this.runtime.mouse.position.x;
    const mouseY = this.runtime.mouse.position.y;
    if (this.snapToGrid) {
      const distanceFromButton = this.runtime.canvas.height - mouseY;
      this.x = Math.round(mouseX / 8) * 8;
      this.y = this.runtime.canvas.height - (Math.round(distanceFromButton / 8) * 8);
    } else {
      this.x = mouseX;
      this.y = mouseY;
    }
    this.x -= (this.width / 2);
    this.y -= (this.height / 2);

    if (this.mode === Mode.Add || this.mode === Mode.AddMoved) {
      this.visible = true;
      if (this.runtime.mouse.isClick) {
        this.addPoint(new Vector2D(this.x, this.y));
        if (this.mode === Mode.AddMoved) {
          this.mode = Mode.Move;
        }
      }
    } else if (this.mode === Mode.Move) {
      this.visible = false;
      const hovered = this.findHovered(mouseX, mouseY);
      this.outlinePoint = hovered;
      if (hovered) {
        this.runtime.cursor = "pointer";
        this.outlinePoint = hovered;
        if (this.runtime.mouse.isClick) {
          this.movePoint(hovered);
        }
      }
    } else if (this.mode === Mode.Remove) {
      this.visible = false;
      const hovered = this.findHovered(mouseX, mouseY);
      this.outlinePoint = hovered;
      if (hovered) {
        this.runtime.cursor = "pointer";
        this.outlinePoint = hovered;
        if (this.runtime.mouse.isClick) {
          this.removePoint(hovered);
        }
      }
    }
  }

  private findHovered(mx: number, my: number): Vector2D | null {
    const width = this.width;
    const height = this.height;
    for (const p of this.runtime.jumpLights) {
      const intersects =
        p.x < mx &&
        p.x + width > mx &&
        p.y < my &&
        p.y + height > my;
      if (intersects) {
        return p;
      }
    }
    return null;
  }

  public movePoint(p: Vector2D) {
    // remove it and switch to add mode
    // yep.
    // it works.
    this.removePoint(p);
    this.mode = Mode.AddMoved;
  }

  public removePoint(p: Vector2D) {
    const index = this.runtime.jumpLights.indexOf(p);
    if (index === -1) {
      throw new Error("couldn't find point");
    }
    this.runtime.jumpLights.splice(index, 1);
    this.runtime.levelRenderer.updateLevel();
  }

  public addPoint(p: Vector2D) {
    this.runtime.jumpLights.push(p);
    this.runtime.levelRenderer.updateLevel();
  }

  public setMode(mode: Mode) {
    this.mode = mode;
    this.runtime.ui.jumpLights.add.style.fontWeight = mode === Mode.Add ? "bold" : "";
    this.runtime.ui.jumpLights.move.style.fontWeight = mode === Mode.Move || mode === Mode.AddMoved ? "bold" : "";
    this.runtime.ui.jumpLights.remove.style.fontWeight = mode === Mode.Remove ? "bold" : "";
  }

  public render(ctx: CanvasRenderingContext2D) {
    super.render(ctx);

    if (this.outlinePoint) {
      ctx.strokeStyle = "black";
      ctx.lineWidth = 1;
      ctx.strokeRect(this.outlinePoint.x, this.outlinePoint.y, this.width, this.height);
    }
  }
}
