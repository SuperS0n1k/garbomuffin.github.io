import { ImageSprite, IImageSpriteOptions } from "../../../engine/sprites/imagesprite";
import { scratchCoordinate, getRandomInt } from "../../../utils";
import { Vector } from "../../../engine/vector";
import { NossBossBulletSprite, MOVE_TIME as BULLET_MOVE_TIME } from "./bullet";
import { AbstractBoss } from "../boss";
import { Task } from "../../../engine/task";

const POSITIONS: Vector[] = [
  scratchCoordinate(-152, 136), // original y=132
  scratchCoordinate(-112, -8), // original y=-12
  scratchCoordinate(160, 72), // original y=68
];

const HEALTH = 3;

export class NossBoss extends AbstractBoss {
  private health: number = HEALTH;

  constructor(options: IImageSpriteOptions) {
    super(options);
    this.x = this.runtime.canvas.width / 2;
    this.y = this.runtime.canvas.height / 2;

    this.startRoutine();
  }

  //
  // ROUTINE
  //

  protected startRoutine() {
    super.startRoutine();

    this.addPhase(new Task({
      run: () => this.teleport(),
    }), 60);

    this.addPhase(new Task({
      run: () => this.spawnBullets(),
      repeatEvery: 1,
      repeatMax: 10,
    }), BULLET_MOVE_TIME);

    this.addPhase(new Task({
      run: (task) => this.rest(task),
      repeatEvery: 0,
      repeatMax: 60,
    }));

    this.addPhase(new Task({
      run: () => this.endRoutine(),
    }));
  }

  private endRoutine() {
    this.addTask(new Task({
      run: () => this.startRoutine(),
      delay: 0,
    }));
  }

  private poof() {

  }

  private teleport() {
    const position = POSITIONS[getRandomInt(0, POSITIONS.length - 1)];
    this.position = position;
  }

  private rest(task: Task) {
    if (this.playerJumpedOn()) {
      task.stop();
      this.health--;
      this.bouncePlayer();
      console.log("oof");
    }
  }

  private spawnBullets() {
    new NossBossBulletSprite({
      position: this.position,
      texture: this.runtime.getImage("boss/noss/bullet"),
    });
  }
}
