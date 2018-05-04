import { blockMap } from "../../blockmap";
import { BLOCK_HEIGHT, BLOCK_WIDTH } from "../../config";
import { AbstractSprite, ISpriteOptions } from "../../engine/sprite";
import { NightlightLevelEditor } from "../editor";
import { LevelEditorIndexes } from "./LevelEditorIndexes";

export class LevelRenderer extends AbstractSprite {
  private levelCanvas!: HTMLCanvasElement;
  private levelCtx!: CanvasRenderingContext2D;
  public runtime!: NightlightLevelEditor;

  constructor(options: ISpriteOptions) {
    super(options);
    this.z = LevelEditorIndexes.Level;
    const { ctx, canvas } = this.runtime.createCanvas();
    this.levelCanvas = canvas;
    this.levelCtx = ctx;
  }

  public updateLevel() {
    this.levelCtx.clearRect(0, 0, this.levelCanvas.width, this.levelCanvas.height);

    const data = this.runtime.levelData;
    const height = this.runtime.canvas.height;

    for (let y = 0; y < data.length; y++) {
      const row = data[y];
      const blockY = y * BLOCK_HEIGHT - this.runtime.blockOffsetY;
      for (let x = 0; x < row.length; x++) {
        const char = row[x];
        if (char === ".") {
          continue;
        }
        const blockX = BLOCK_WIDTH * x;
        const texture = this.runtime.getImage(blockMap[char].texture);
        this.levelCtx.drawImage(texture, blockX, blockY);
      }
    }
  }

  public render(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.levelCanvas, 0, 0);
  }
}
