import { IImageSpriteOptions } from "../../../engine/sprites/imagesprite";
import { Task } from "../../../engine/task";
import { getRandomInt } from "../../../utils";
import { ZIndexes } from "../../zindex";
import {
  AbstractNossBoss,
  BASE_TEXTURE,
  HIT_ANIMATION_REPEAT,
  HIT_ANIMATION_REPEAT2,
  HIT_ANIMATION_TOTAL_LENGTH,
  HIT_ANIMATION_TOTAL_LENGTH2,
} from "../noss";
import { Vector2D } from "../../../engine/vector2d";

const HEALTH = 3;

// seen in scratch as "Attack2"
const SLIDE_ATTACK_SPEED = 8;
// todo: can't figure out how to get the canvas width from outside a sprite
// so just hard coding a value for now
const SLIDE_ATTACK_REPEAT = Math.ceil(480 / SLIDE_ATTACK_SPEED);
const SLIDE_ATTACK_SIZE_CHANGE = 0.2 / 2;
const SLIDE_ATTACK_MIN = 5;
const SLIDE_ATTACK_MAX = 7;

// typically the slide attack ends at around 1.9999999 due to floating point math
const DROP_ATTACK_SCALE = 2;
const DROP_ATTACK_GRAVITY = 7;
const DROP_ATTACK_FALL_LENGTH = 46;
const DROP_ATTACK_REPEAT = 5;
const DROP_ATTACK_END = 288.5; // fuck it, close enough

const REST_TEXTURE = "boss/noss/rest";

export class FinalBoss extends AbstractNossBoss {
  private canKillPlayer: boolean = false;
  private health: number = HEALTH;
  private wasHit: boolean = false;
  private animationProgress: number = 0;

  constructor(opts: IImageSpriteOptions) {
    super(opts);

    this.z = ZIndexes.FinalBoss;
    this.visible = false;
    this.addTask(new Task({
      run: () => this.testForPlayer(),
      repeatEvery: 1,
    }));
    this.addTask(new Task({
      run: () => this.startRoutine(),
      delay: 30,
    }));
  }

  private testForPlayer() {
    if (this.canKillPlayer && this.complexIntersectsSimple(this.runtime.player)) {
      this.runtime.player.kill();
    }
  }

  protected startRoutine() {
    super.startRoutine();
    this.canKillPlayer = true;
    this.wasHit = false;
    this.scale.x = 1;
    this.scale.y = 1;
    this.visible = true;

    const repeatSlideAttack = getRandomInt(SLIDE_ATTACK_MIN, SLIDE_ATTACK_MAX);
    for (let i = 0; i < repeatSlideAttack; i++) {
      const addSpinAttack = (direction: number) => {
        this.addPhase(new Task({
          run: () => this.prepareSlideAttack(direction),
        }), 30);
        this.addPhase(new Task({
          run: () => this.slideAttack(direction),
          repeatEvery: 0,
          repeatMax: SLIDE_ATTACK_REPEAT,
        }));
      };
      addSpinAttack(1);
      addSpinAttack(-1);
    }

    const addDropAttack = (endDelay: boolean = true) => {
      this.addPhase(new Task({
        run: () => this.prepareDropAttack(),
      }));

      this.addPhase(new Task({
        run: () => this.dropAttack(),
        repeatEvery: 0,
        repeatMax: DROP_ATTACK_FALL_LENGTH,
      }), endDelay ? 30 : 0);
    }

    for (let i = 0; i < DROP_ATTACK_REPEAT; i++) {
      addDropAttack();
    }

    addDropAttack(false);
    this.addPhase(new Task({
      run: (task) => this.vulnerableAfterDropAttack(task),
      repeatEvery: 0,
      repeatMax: 90,
    }));
    this.addPhase(new Task({
      run: () => this.endRoutine(this.wasHit),
    }));
  }

  private endRoutine(wasHit: boolean = false) {
    if (wasHit) {
      return;
    }

    this.poof();
    this.visible = false;
    this.texture = this.runtime.getImage(BASE_TEXTURE);
    this.addTask(new Task({
      run: () => this.startRoutine(),
      delay: 120,
    }));
  }

  private prepareSlideAttack(direction: number) {
    this.visible = false;
    this.scale.x = (Math.abs(this.scale.x) + SLIDE_ATTACK_SIZE_CHANGE) * direction;
    this.scale.y = (Math.abs(this.scale.y) + SLIDE_ATTACK_SIZE_CHANGE) * direction;
    if (direction === 1) {
      this.x = 0;
    } else if (direction === -1) {
      this.x = this.runtime.canvas.width;
    }
    this.y = this.runtime.player.y;
  }

  private slideAttack(direction: number) {
    this.visible = true;
    this.canKillPlayer = true;

    this.x += SLIDE_ATTACK_SPEED * direction;
  }

  private prepareDropAttack() {
    this.scale.x = DROP_ATTACK_SCALE;
    this.scale.y = DROP_ATTACK_SCALE;
    this.y = -this.height;
    this.x = this.runtime.player.x - (this.width / 2);
  }

  private dropAttack() {
    this.y += DROP_ATTACK_GRAVITY;

    if (this.y > DROP_ATTACK_END) {
      this.y = DROP_ATTACK_END;
    }
  }

  private vulnerableAfterDropAttack(task: Task) {
    this.canKillPlayer = false;
    this.texture = this.runtime.getImage(REST_TEXTURE);

    if (this.playerJumpedOn()) {
      this.bouncePlayer();
      this.spawnHitEffect("-1");
      this.health--;
      this.wasHit = true;
      this.animationProgress = 0;
      task.stop();

      if (this.health === 0) {
        this.playHitAnimation(HIT_ANIMATION_REPEAT2);
        this.addTask(new Task({
          run: () => this.dead(),
          delay: HIT_ANIMATION_TOTAL_LENGTH2,
        }))
      } else {
        this.playHitAnimation(HIT_ANIMATION_REPEAT);
        this.addTask(new Task({
          run: () => this.endRoutine(),
          delay: HIT_ANIMATION_TOTAL_LENGTH,
        }));
      }
    }
  }

  private dead() {
    this.spawnLevelUpCoin(this.position);
    this.destroy();
  }
}
