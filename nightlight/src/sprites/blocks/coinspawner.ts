import { IBlockOptions, SolidBlock } from "./block";
import { LevelUpCoinSprite } from "../coin";
import { BLOCK_HEIGHT } from "../../config";
import { Vector } from "../../engine/vector";

abstract class LevelUpCoinSpawnerBlock extends SolidBlock {
  constructor(opts: IBlockOptions) {
    super(opts);

    const position = this.getCoinPosition();
    new LevelUpCoinSprite({
      position,
      texture: this.runtime.getImage("coin/1"),
    });
  }

  protected abstract getCoinPosition(): Vector;
}

export class AboveLevelUpCoinSpawnerBlock extends LevelUpCoinSpawnerBlock {
  protected getCoinPosition() {
    return new Vector(this.x, this.y - BLOCK_HEIGHT);
  }
}

export class BelowLevelUpCoinSpawnerBlock extends LevelUpCoinSpawnerBlock {
  protected getCoinPosition() {
    return new Vector(this.x, this.y + BLOCK_HEIGHT);
  }
}
