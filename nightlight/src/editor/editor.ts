import { blockMap } from "../blockmap";
import { BLOCK_HEIGHT, LEVEL_HEIGHT, LEVEL_WIDTH } from "../config";
import { GameRuntime } from "../engine/runtime";
import { Vector } from "../engine/vector";
import { getLevelForCode } from "../levelcode";
import { clone, getElementById, splitToChunks } from "../utils";
import { BLOCK_MAP_KEYS } from "./blockmapkeys";
import { LevelRenderer } from "./sprites/LevelRenderer";
import { SelectorSprite } from "./sprites/SelectorSprite";

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
    getJsonCodeButton: getElementById<HTMLButtonElement>("level-editor-get-json-code"),
    importCodeButton: getElementById<HTMLButtonElement>("level-editor-import-code"),
    codeOutput: getElementById<HTMLTextAreaElement>("level-editor-code-output"),
    blockGallery: getElementById("level-editor-block-gallery"),
    options: {
      dark: getElementById<HTMLInputElement>("level-editor-option-dark"),
      stars: getElementById<HTMLInputElement>("level-editor-option-stars"),
      background: getElementById<HTMLSelectElement>("level-editor-option-background"),
    },
  };

  constructor() {
    super(getElementById("canvas"));

    this.blockOffsetY = this.canvas.height % BLOCK_HEIGHT;
    this.background = "white";
    this.canvas.style.border = "1px solid black";
    this.ui.getCodeButton.addEventListener("click", () => this.handleGetCodeButton());
    this.ui.getJsonCodeButton.addEventListener("click", () => this.handleGetJsonCodeButton());
    this.ui.importCodeButton.addEventListener("click", () => this.handleImportLevelCodeButton());

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

  private handleGetCodeButton() {
    const levelData = clone(this.levelData);
    const code = levelData.reverse().map((s) => s.join("")).join("");
    this.ui.codeOutput.value = code;
  }

  private handleGetJsonCodeButton() {
    const dark = this.ui.options.dark.checked;
    const stars = this.ui.options.stars.checked;
    const background = this.ui.options.background.value;

    const levelData = clone(this.levelData);
    const code = levelData.reverse().map((s) => s.join("")).join("");

    this.ui.codeOutput.value = JSON.stringify({
      levelData: code,
      dark,
      stars,
      background,
    });
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
    const level = getLevelForCode(str);

    this.ui.options.stars.checked = level.stars as boolean;
    this.ui.options.dark.checked = level.dark as boolean;
    this.ui.options.background.value = level.background as string;

    this.levelData = splitToChunks(level.levelData, LEVEL_WIDTH).map((i) => i.split("")).reverse();
    this.levelRenderer.updateLevel();
  }

  private handleGallerySelection(char: string) {
    this.selector.setSelection(char);
  }

  private initGallery() {
    const getImage = (src: string) => {
      const link = document.createElement("a");
      link.href = "";
      link.className = "level-editor-gallery-item";
      link.onclick = () => false;

      const image = document.createElement("img");
      image.src = src;
      image.className = "level-editor-block-gallery-item";

      link.appendChild(image);
      return link;
    };

    for (const key of BLOCK_MAP_KEYS) {
      if (key === "empty") {
        const el = document.createElement("div");
        el.className = "level-editor-gallery-item";
        this.ui.blockGallery.appendChild(el);
        continue;
      }
      const val = blockMap[key];
      const texture = this.getImage(val.texture);
      const image = getImage(texture.src);
      image.addEventListener("click", () => this.handleGallerySelection(key));
      this.ui.blockGallery.appendChild(image);
    }
  }
}
