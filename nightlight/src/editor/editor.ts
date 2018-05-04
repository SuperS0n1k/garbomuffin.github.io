import { GameRuntime } from "../engine/runtime";
import { SelectorSprite } from "./sprites/SelectorSprite";
import { Vector } from "../engine/vector";
import { IImageSpriteOptions } from "../engine/sprites/imagesprite";
import { AbstractSprite } from "../engine/sprite";
import { LEVEL_WIDTH, LEVEL_HEIGHT, BLOCK_HEIGHT } from "../config";
import { LevelRenderer } from "./sprites/LevelRenderer";
import { clone, getElementById, splitToChunks } from "../utils";
import { BLOCK_MAP_KEYS } from "./blockmapkeys";
import { blockMap } from "../blockmap";

export class NightlightLevelEditor extends GameRuntime {
  public levelData: string[][] = [];
  public levelRenderer!: LevelRenderer;
  public selector!: SelectorSprite;
  public blockOffsetY: number;

  public ui = {
    container: getElementById("level-editor-ui"),
    activeBlockImage: getElementById<HTMLImageElement>("level-editor-active-block-image"),
    activeBlockDescription: getElementById("level-editor-active-block-description"),
    getCodeButton: getElementById<HTMLButtonElement>("level-editor-get-code"),
    importCodeButton: getElementById<HTMLButtonElement>("level-editor-import-code"),
    codeOutput: getElementById<HTMLTextAreaElement>("level-editor-code-output"),
    showAdvanced: getElementById<HTMLButtonElement>("level-editor-show-advanced"),
    blockGallery: getElementById("level-editor-block-gallery"),
  };

  public advancedUi = {
    container: getElementById("level-editor-advanced-ui"),
  };

  constructor() {
    super(getElementById("canvas"));

    this.blockOffsetY = this.canvas.height % BLOCK_HEIGHT;
    this.background = "white";
    this.canvas.style.border = "1px solid black";
    this.ui.getCodeButton.addEventListener("click", () => this.handleGetLevelCodeButton());
    this.ui.importCodeButton.addEventListener("click", () => this.handleImportLevelCodeButton());
    this.ui.showAdvanced.addEventListener("click", () => this.advancedUi.container.style.display = "block");

    for (let y = 0; y < LEVEL_HEIGHT; y++) {
      const row = Array(LEVEL_WIDTH).fill(".");
      this.levelData.push(row);
    }

    (window as any).editor = this;
  }

  public start() {
    super.start();

    this.ui.container.style.display = "block";

    this.levelRenderer = new LevelRenderer({
      position: new Vector(0, 0),
    });
    this.levelRenderer.updateLevel();

    this.selector = new SelectorSprite({
      position: new Vector(0, 0),
      texture: this.getImage("blocks/a"), // ignored
    });

    this.initGallery();
  }

  public render() {
    super.render();
  }

  private handleGetLevelCodeButton() {
    const levelData = clone(this.levelData);
    const code = levelData.reverse().map((s) => s.join("")).join("");
    this.ui.codeOutput.value = code;
  }

  private handleImportLevelCodeButton() {
    const code = prompt("Please paste the level code here:");
    if (code === null) {
      return;
    }
    const levelDataBackup = this.levelData;
    try {
      this.importLevelCode(code);
    } catch (e) {
      alert("Bad level code. Importing aborted.\n\n" + e.stack);
      this.levelData = levelDataBackup;
      this.levelRenderer.updateLevel();
    }
  }

  private importLevelCode(str: string) {
    this.levelData = splitToChunks(str, LEVEL_WIDTH).map((i) => i.split("")).reverse();
    this.levelRenderer.updateLevel();
  }

  private handleGallerySelection(char: string) {
    this.selector.setSelection(char);
  }

  private initGallery() {
    const getImage = (src: string) => {
      const link = document.createElement("a");
      link.href = "";
      link.onclick = () => false;

      const image = document.createElement("img");
      image.src = src;
      image.className = "level-editor-block-gallery-item";

      link.appendChild(image);
      return link;
    };

    for (const key of BLOCK_MAP_KEYS) {
      const val = blockMap[key];
      const texture = this.getImage(val.texture);
      const image = getImage(texture.src);
      image.addEventListener("click", () => this.handleGallerySelection(key));
      this.ui.blockGallery.appendChild(image);
    }
  }
}
