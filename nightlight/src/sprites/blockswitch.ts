import { IBlockOptions, Block } from "./blocks/block";
import { Task } from "../engine/task";
import { FallingBlock } from "./blocks/falling";
import { BlockSwitchSpawnerBlock } from "./blocks/blockswitchspawner";
import { Vector } from "../engine/vector";

export interface IBlockSwitchOptions extends IBlockOptions {
  spawner: BlockSwitchSpawnerBlock;
}

export class BlockSwitch extends Block {
  private spawner: BlockSwitchSpawnerBlock;
  private startingPosition: Vector;

  constructor(opts: IBlockSwitchOptions) {
    super(opts);
    this.spawner = opts.spawner;
    this.startingPosition = new Vector(this.position);
    this.floorAlign();
    this.addTask(this.run);
  }

  private trigger() {
    const allSprites = this.runtime.sprites.sprites;
    const fallingBlocks = allSprites.filter((sprite) => sprite instanceof FallingBlock) as FallingBlock[];
    for (const sprite of fallingBlocks) {
      sprite.trigger();
    }

    this.spawner.texture = this.runtime.getImage("blocks/u2");
    this.texture = this.runtime.getImage("blocks/button/on");
    this.updateDimensions();
    this.position = this.startingPosition;
    this.floorAlign();

    this.runtime.playSound("blocks/button");
  }

  private run(task: Task) {
    if (this.intersects(this.runtime.player)) {
      this.trigger();
      task.stop();
    }
  }
}
