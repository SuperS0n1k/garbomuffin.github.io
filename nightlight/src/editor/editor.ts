import { blockMap } from "../blockmap";
import { BLOCK_HEIGHT, LEVEL_HEIGHT, LEVEL_WIDTH } from "../config";
import { GameRuntime } from "../engine/runtime";
import { Vector } from "../engine/vector";
import { Vector2D } from "../engine/vector2d";
import { getLevelForCode } from "../levelcode";
import { clone, getElementById, getSearchParam, splitToChunks } from "../utils";
import { BLOCK_MAP_KEYS } from "./blockmapkeys";
import { LevelEditorMode } from "./mode";
import { BlockSelectorSprite } from "./sprites/BlockSelectorSprite";
import { JumpLightSelectorSprite } from "./sprites/JumpLightSelectorSprite";
import { LevelRenderer } from "./sprites/LevelRenderer";

export class NightlightLevelEditor extends GameRuntime {
  public levelData: string[][] = [];
  public jumpLights: Vector2D[] = [];
  public levelRenderer!: LevelRenderer;
  public blockSelector!: BlockSelectorSprite;
  public jumpLightSelector!: JumpLightSelectorSprite;
  public blockOffsetY: number;
  public mode: LevelEditorMode = LevelEditorMode.Blocks;

  public ui = {
    container: getElementById("level-editor-ui"),
    getCodeButton: getElementById<HTMLButtonElement>("level-editor-get-code"),
    getJsonCodeButton: getElementById<HTMLButtonElement>("level-editor-get-json-code"),
    importCodeButton: getElementById<HTMLButtonElement>("level-editor-import-code"),
    codeOutput: getElementById<HTMLTextAreaElement>("level-editor-code-output"),
    modeSelect: getElementById<HTMLSelectElement>("level-editor-option-mode"),
    options: {
      dark: getElementById<HTMLInputElement>("level-editor-option-dark"),
      stars: getElementById<HTMLInputElement>("level-editor-option-stars"),
      background: getElementById<HTMLSelectElement>("level-editor-option-background"),
      music: getElementById<HTMLSelectElement>("level-editor-option-music"),
    },
    jumpLights: {
      container: getElementById("level-editor-mode-jump-lights"),
      add: getElementById<HTMLButtonElement>("level-editor-jump-lights-add"),
      move: getElementById<HTMLButtonElement>("level-editor-jump-lights-move"),
      remove: getElementById<HTMLButtonElement>("level-editor-jump-lights-remove"),
    },
    blocks: {
      container: getElementById("level-editor-mode-block"),
      activeBlockImage: getElementById<HTMLImageElement>("level-editor-active-block-image"),
      gallery: getElementById("level-editor-block-gallery"),
      activeBlockDescription: getElementById("level-editor-active-block-description"),
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
    this.ui.modeSelect.addEventListener("change", () => this.setMode(+this.ui.modeSelect.value));
    this.setMode(this.mode);

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

    this.blockSelector = new BlockSelectorSprite({
      position: new Vector(0, 0),
      texture: this.getImage("blocks/a"),
    });
    this.jumpLightSelector = new JumpLightSelectorSprite({
      position: new Vector(0, 0),
      texture: this.getImage("blackjumplight"),
    });

    this.initGallery();

    const levelSearchParam = getSearchParam("level");
    if (levelSearchParam) {
      this.importLevelCode(levelSearchParam);
    }
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
    const music = this.ui.options.music.value.split(",");

    const levelData = clone(this.levelData);
    const code = levelData.reverse().map((s) => s.join("")).join("");

    this.ui.codeOutput.value = JSON.stringify({
      levelData: code,
      dark,
      stars,
      background,
      jumpLights: this.jumpLights,
      backgroundMusic: music,
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
    this.ui.options.music.value = (level.backgroundMusic || []).join(",");
    this.jumpLights = level.jumpLights || [];

    this.levelData = splitToChunks(level.levelData, LEVEL_WIDTH).map((i) => i.split("")).reverse();
    this.levelRenderer.updateLevel();
  }

  private handleGallerySelection(char: string) {
    this.blockSelector.setSelection(char);
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
        this.ui.blocks.gallery.appendChild(el);
        continue;
      }
      const val = blockMap[key];
      const texture = this.getImage(val.texture);
      const image = getImage(texture.src);
      image.addEventListener("click", () => this.handleGallerySelection(key));
      this.ui.blocks.gallery.appendChild(image);
    }
  }

  public setMode(m: LevelEditorMode) {
    this.mode = m;
    this.ui.blocks.container.style.display = m === 0 ? "block" : "";
    this.ui.jumpLights.container.style.display = m === 1 ? "block" : "";
  }
}
