import { blockMap } from "../../blockmap";
import { BLOCK_HEIGHT, BLOCK_WIDTH } from "../../config";
import { IImageSpriteOptions, ImageSprite } from "../../engine/sprites/imagesprite";
import { TImage } from "../../engine/types";
import { Vector } from "../../engine/vector";
import { BlackBlock } from "../../game/sprites/blocks/black";
import { LevelEditorIndexes } from "./LevelEditorIndexes";
import { NightlightLevelEditor } from "../editor";

const BLOCK_MAP_KEYS = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "[",
  "x",
  "y",
  "z",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "@",
  "!",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "-",
  "_",
  "=",
  "+",
  "`",
];

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
    const texture = this.runtime.getImage(blockMap[this.selection].texture);
    this.texture = texture;
    this.runtime.activeBlockImage.src = texture.src;
    this.runtime.activeBlockChar.textContent = this.selection.toUpperCase();
    this.updateDimensions();
  }

  private setBlock(x: number, y: number, char: string) {
    const row = this.runtime.levelData[y];
    if (row) {
      row[x] = char;
    } else {
      console.warn("no row for y=" + y);
    }
    this.runtime.levelRenderer.updateLevel();
  }

  private run() {
    // get hovered block
    const mouseX = this.runtime.mouse.position.x;
    const mouseY = this.runtime.mouse.position.y - this.runtime.blockOffsetY;
    const blockX = Math.floor(mouseX / BLOCK_WIDTH);
    const blockY = Math.floor(mouseY / BLOCK_HEIGHT);
    this.x = blockX * BLOCK_WIDTH;
    this.y = blockY * BLOCK_HEIGHT + this.runtime.blockOffsetY;

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
}
