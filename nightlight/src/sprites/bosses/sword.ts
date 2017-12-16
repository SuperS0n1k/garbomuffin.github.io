import { ImageSprite, IImageSpriteOptions } from "../../engine/sprites/imagesprite";
import { Task } from "../../engine/task";
import { BLOCK_HEIGHT } from "../../config";
import { SolidBlock, IBlockOptions } from "../blocks/block";
import { AbstractSprite } from "../../engine/sprite";
import { PlayerSprite } from "../player/player";

const HEALTH = 3;

export class SwordBoss extends ImageSprite {
  private health: number = HEALTH;
  private vulnerable: boolean = false;

  constructor(opts: IBlockOptions) {
    super(opts);

    this.resetCoordinates();

    this.addTask(new Task({
      run: this.runRoutine,
      delay: 60,
    }));

    this.addTask(this.intersectTest);
  }

  public intersectTest() {
    const intersectsPlayer = this.complexIntersects(this.runtime.player);
    if (intersectsPlayer) {
      this.runtime.player.kill();
    }
  }

  private runRoutine() {
    this.addTask(new Task({
      run: this.spinAttack,
      repeatEvery: 0,
      delay: 60,
    }));
  }

  private spinAttack(task: Task) {
    this.rotation++;
  }

  private resetCoordinates() {
    this.x = this.runtime.canvas.width / 2 - this.width / 2;
    this.y = 14 * BLOCK_HEIGHT;
  }
}
