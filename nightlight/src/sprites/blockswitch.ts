import { Task } from "../engine/task";
import { Vector } from "../engine/vector";
import { Block, IBlockOptions } from "./blocks/block";
import { BlockSwitchSpawnerBlock } from "./blocks/blockswitchspawner";
import { AbstractFallingBlock as FallingBlock } from "./blocks/falling";

/*
 * The switch that makes the FallingBlocks fall
 *
 * Spawned by a BlockSwitchSpawnerBlock as this is not actually part of the level code, only the spawner
 */

export interface IBlockSwitchOptions extends IBlockOptions {
  spawner: BlockSwitchSpawnerBlock;
}

export class BlockSwitch extends Block {
  private spawner: BlockSwitchSpawnerBlock;
  private startingPosition: Vector;
  private triggered: boolean = false;

  constructor(opts: IBlockSwitchOptions) {
    super(opts);
    this.spawner = opts.spawner;
    this.startingPosition = new Vector(this.position);
    this.floorAlign();
    this.addTask(() => this.run());
  }

  public resetState() {
    this.triggered = false;
    this.texture = this.runtime.getImage("blocks/button/red");
    this.spawner.texture = this.runtime.getImage("blocks/u");
    this.updateDimensions();
    this.position = new Vector(this.startingPosition);
    this.floorAlign();
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
    this.position = new Vector(this.startingPosition);
    this.floorAlign();
    this.triggered = true;

    this.runtime.playSound("blocks/button");
  }

  private run() {
    if (!this.triggered && this.intersects(this.runtime.player)) {
      this.trigger();
    }
  }
}
