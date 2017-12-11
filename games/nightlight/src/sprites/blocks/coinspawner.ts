import { IBlockOptions, SolidBlock } from "./block";
import { LevelUpCoinSprite } from "../coin";
import { BLOCK_HEIGHT } from "../../config";
import { Vector } from "../../engine/vector";

export class LevelUpCoinSpawnerBlock extends SolidBlock {
  constructor(opts: IBlockOptions) {
    super(opts);

    const position = new Vector(this.x, this.y - BLOCK_HEIGHT);
    new LevelUpCoinSprite({
      position,
      texture: this.runtime.getAsset("coin/1"),
    });
  }
}
