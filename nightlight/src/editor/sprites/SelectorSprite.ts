import { blockMap } from "../../blockmap";
import { BLOCK_HEIGHT, BLOCK_WIDTH } from "../../config";
import { IImageSpriteOptions, ImageSprite } from "../../engine/sprites/imagesprite";
import { BLOCK_MAP_KEYS } from "../blockmapkeys";
import { NightlightLevelEditor } from "../editor";
import { LevelEditorIndexes } from "./LevelEditorIndexes";

export class SelectorSprite extends ImageSprite {
  private selection: string = "a";
  private selectionIndex: number = 0;
  public runtime!: NightlightLevelEditor;

  constructor(options: IImageSpriteOptions) {
    super(options);
    this.z = LevelEditorIndexes.Selector;
    this.addTask(() => this.run());
    this.width = BLOCK_WIDTH;
    this.height = BLOCK_HEIGHT;
    this.texture = this.runtime.getImage(blockMap[this.selection].texture);
    this.updateSelection();
  }

  private updateSelection() {
    this.selection = BLOCK_MAP_KEYS[this.selectionIndex];
    const blockDetails = blockMap[this.selection];
    const texture = this.runtime.getImage(blockDetails.texture);
    this.texture = texture;
    this.runtime.ui.activeBlockImage.src = texture.src;
    this.runtime.ui.activeBlockImage.height = this.texture.height * 6;
    this.runtime.ui.activeBlockImage.width = this.texture.width * 6;
    this.runtime.ui.activeBlockDescription.textContent = blockDetails.type.name + ", " + this.selection.toUpperCase();
    this.updateDimensions();
  }

  private setBlock(x: number, y: number, char: string) {
    const row = this.runtime.levelData[y];
    if (!row) {
      console.warn(`no row for y=${y}`);
      return;
    }
    const existingChar = row[x];
    if (!existingChar) {
      console.warn(`no existing char for y=${y} x=${x}`);
      return;
    }
    row[x] = char;
    this.runtime.levelRenderer.updateLevel();
  }

  private run() {
    // get hovered block
    const mouseX = this.runtime.mouse.position.x;
    const mouseY = this.runtime.mouse.position.y - this.runtime.blockOffsetY;
    const blockX = Math.floor(mouseX / BLOCK_WIDTH);
    const blockY = Math.ceil(mouseY / BLOCK_HEIGHT);
    this.x = blockX * BLOCK_WIDTH;
    this.y = blockY * BLOCK_HEIGHT - this.runtime.blockOffsetY;

    // block changing
    // up
    if (this.runtime.keyboard.keys[38].justPressed) {
      this.selectionIndex++;
      if (this.selectionIndex >= BLOCK_MAP_KEYS.length) {
        this.selectionIndex = 0;
      }
      this.updateSelection();
    }
    // down
    if (this.runtime.keyboard.keys[40].justPressed) {
      this.selectionIndex--;
      if (this.selectionIndex < 0) {
        this.selectionIndex = BLOCK_MAP_KEYS.length - 1;
      }
      this.updateSelection();
    }

    // drawing
    if (this.runtime.mouse.left.isDown) {
      this.opacity = 1;
      this.setBlock(blockX, blockY, this.selection);
    } else if (this.runtime.mouse.right.isDown) {
      this.opacity = 0;
      this.setBlock(blockX, blockY, ".");
    } else {
      this.opacity = 0.5;
    }
  }

  public setSelection(char: string) {
    const index = BLOCK_MAP_KEYS.indexOf(char);
    if (index === -1) {
      throw new Error(char + " is not in BLOCK_MAP_KEYS");
    }
    this.selection = char;
    this.selectionIndex = index;
    this.updateSelection();
  }
}
