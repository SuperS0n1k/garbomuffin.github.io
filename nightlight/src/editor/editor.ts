import { GameRuntime } from "engine/runtime";
import { SelectorSprite } from "./sprites/SelectorSprite";
import { Vector } from "../engine/vector";
import { IImageSpriteOptions } from "../engine/sprites/imagesprite";
import { AbstractSprite } from "../engine/sprite";
import { LEVEL_WIDTH, LEVEL_HEIGHT, BLOCK_HEIGHT } from "../config";
import { LevelRenderer } from "./sprites/LevelRenderer";
import { clone } from "../utils";

export class NightlightLevelEditor extends GameRuntime {
  public levelData: string[][] = [];
  public levelRenderer!: LevelRenderer;
  public blockOffsetY: number;

  public ui: HTMLElement = document.getElementById("level-editor-ui")!;
  public activeBlockImage: HTMLImageElement =
    document.getElementById("level-editor-active-block-image") as HTMLImageElement;
  public activeBlockChar: HTMLElement = document.getElementById("level-editor-active-block-char")!;
  public getCodeButton: HTMLButtonElement = document.getElementById("level-editor-get-code") as HTMLButtonElement;
  public codeOutput: HTMLTextAreaElement = document.getElementById("level-editor-code-output") as HTMLTextAreaElement;

  constructor() {
    super(document.getElementById("container")!);

    this.blockOffsetY = this.canvas.height % BLOCK_HEIGHT;
    this.background = "white";
    this.canvas.style.border = "1px solid black";
    this.ui.style.display = "block";
    this.getCodeButton.onclick = () => this.generateLevelCode();

    for (let y = 0; y < LEVEL_HEIGHT; y++) {
      const row = Array(LEVEL_WIDTH).fill(".");
      this.levelData.push(row);
    }

    (window as any).editor = this;
  }

  public start() {
    super.start();

    this.levelRenderer = new LevelRenderer({
      position: new Vector(0, 0),
    });
    this.levelRenderer.updateLevel();

    new SelectorSprite({
      position: new Vector(0, 0),
      texture: this.getImage("blocks/a"), // ignored
    });
  }

  public render() {
    super.render();
  }

  public generateLevelCode() {
    const levelData = clone(this.levelData);
    const code = levelData.reverse().map((s) => s.join("")).join("");
    this.codeOutput.value = code;
  }
}
