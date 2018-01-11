import { ImageSprite, IImageSpriteOptions } from "../../../engine/sprites/imagesprite";
import { scratchCoordinate, getRandomInt } from "../../../utils";
import { Vector } from "../../../engine/vector";
import { NossBossBulletSprite, MOVE_TIME as BULLET_MOVE_TIME } from "./bullet";
import { AbstractBoss } from "../boss";
import { Task } from "../../../engine/task";
import { NossBossDustSprite } from "./dust";

interface INossPosition {
  position: Vector;
  direction?: 1 | -1;
}

const POSITIONS: INossPosition[] = [
  {
    position: scratchCoordinate(-156, 136), // original (-152, 132)
  },
  {
    position: scratchCoordinate(-116, -8), // original (-112, -12)
  },
  {
    position: scratchCoordinate(156, 72), // original (160, 68)
    direction: -1,
  },
];

export const BASE_TEXTURE = "boss/noss/noss";
const VULNERABLE_TEXTURE = "boss/noss/rest";

const STARTING_POS = scratchCoordinate(-4, -104); // original (0, -108)

const HEALTH = 3;

const POOF_PARTICLE_COUNT = 8;
const POOF_PARTICLE_ANGLE = 360 / POOF_PARTICLE_COUNT;

const HIT_ANIMATION_FRAMES = [
  "boss/noss/hit",
  BASE_TEXTURE,
];
const HIT_ANIMATION_LENGTH = 2;
const HIT_ANIMATION_REPEAT = 12;
const HIT_ANIMATION_REPEAT2 = 35; // for dead

const HIT_ANIMATION_TOTAL_LENGTH = HIT_ANIMATION_LENGTH *
                                   HIT_ANIMATION_REPEAT *
                                   HIT_ANIMATION_FRAMES.length +
                                   HIT_ANIMATION_LENGTH;
const HIT_ANIMATION_TOTAL_LENGTH2 = HIT_ANIMATION_LENGTH *
                                    HIT_ANIMATION_REPEAT2 *
                                    HIT_ANIMATION_FRAMES.length +
                                    HIT_ANIMATION_LENGTH;

export class NossBoss extends AbstractBoss {
  private health: number = HEALTH;
  private shouldEndRoutine: boolean;

  constructor(options: IImageSpriteOptions) {
    super(options);

    this.position = new Vector(STARTING_POS);

    this.addTask(new Task({
      run: () => this.startRoutine(),
      delay: 90,
    }));
  }

  //
  // ROUTINE
  //

  protected startRoutine() {
    super.startRoutine();
    this.shouldEndRoutine = true;

    this.addPhase(new Task({
      run: () => this.poof(),
    }));

    this.addPhase(new Task({
      run: () => this.teleport(),
    }), 60);

    this.addPhase(new Task({
      run: () => this.poof(),
    }));

    this.addPhase(new Task({
      run: () => this.spawnBullets(),
      repeatEvery: 1,
      repeatMax: 10,
    }), BULLET_MOVE_TIME);

    this.addPhase(new Task({
      run: () => this.texture = this.runtime.getImage(VULNERABLE_TEXTURE),
    }));

    this.addPhase(new Task({
      run: (task) => this.rest(task),
      repeatEvery: 0,
      repeatMax: 60,
    }));

    this.addPhase(new Task({
      run: (task) => this.testShouldEndRoutine(task),
      repeatEvery: 0,
    }));
  }

  private testShouldEndRoutine(task: Task) {
    if (this.shouldEndRoutine) {
      this.endRoutine();
      task.stop();
    }
  }

  private endRoutine() {
    this.addTask(new Task({
      run: () => this.startRoutine(),
      delay: 0,
    }));
  }

  private poof() {
    this.visible = !this.visible;

    const position = this.centerPosition();
    const texture = this.runtime.getImage("boss/noss/dust");
    position.x -= texture.width / 2;
    position.y -= texture.height / 2;

    for (let i = 0; i < POOF_PARTICLE_COUNT; i++) {
      new NossBossDustSprite({
        rotation: i * POOF_PARTICLE_ANGLE,
        position,
        texture,
      });
    }
  }

  private teleport() {
    const position = POSITIONS[getRandomInt(0, POSITIONS.length - 1)];
    this.position = new Vector(position.position);
    this.scale.x = position.direction || 1;
    this.texture = this.runtime.getImage(BASE_TEXTURE);
  }

  private rest(task: Task) {
    if (this.playerJumpedOn()) {
      this.bouncePlayer();
      task.stop();
      this.health--;
      this.shouldEndRoutine = false;

      if (this.health === 0) {
        this.dead();
      } else {
        this.damage();
      }
    }
  }

  private playHitAnimation(repeat: number) {
    for (let i = 0; i < HIT_ANIMATION_FRAMES.length; i++) {
      const frame = HIT_ANIMATION_FRAMES[i];
      this.addTask(new Task({
        run: () => this.texture = this.runtime.getImage(frame),
        repeatEvery: HIT_ANIMATION_LENGTH * 2,
        delay: i * HIT_ANIMATION_LENGTH,
        repeatMax: repeat,
      }));
    }
  }

  private damage() {
    this.playHitAnimation(HIT_ANIMATION_REPEAT);

    this.addTask(new Task({
      run: () => this.shouldEndRoutine = true,
      delay: HIT_ANIMATION_TOTAL_LENGTH,
    }));
  }

  private dead() {
    this.playHitAnimation(HIT_ANIMATION_REPEAT2);

    this.addTask(new Task({
      run: () => this.actuallyDead(),
      delay: HIT_ANIMATION_TOTAL_LENGTH2,
    }));
  }

  private actuallyDead() {
    this.poof();
    this.spawnLevelUpCoinCentered(this.centerPosition());
    this.destroy();
  }

  private spawnBullets() {
    new NossBossBulletSprite({
      position: this.position,
      texture: this.runtime.getImage("boss/noss/bullet"),
    });
  }
}
