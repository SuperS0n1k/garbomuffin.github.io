import { GameRuntime } from "./engine/game";
import { Position } from "./engine/position";
import { IRepeatingTaskOptions, Task } from "./engine/task";
import { getOrDefault } from "./engine/utils";
import { BulletSprite } from "./sprites/bullet";
import { RocketSprite } from "./sprites/rocket";
import { SaucerSprite } from "./sprites/saucer";

export class SpaceInvaderGame extends GameRuntime {
  private _score: number = 0;
  private _highscore: number = 0;
  private lastKnownGlobalHighscore: number = 0;
  private startTime: number = performance.now();
  private rocketSprite: RocketSprite;

  constructor() {
    super(document.getElementById("canvas") as HTMLCanvasElement);

    this.addTask(new Task({
      run: this.createEnemy,
      repeatEvery: 180, // 3 seconds
      delay: 60,
    }));

    this.score = 0;
    this.highscore = getOrDefault(Number(localStorage.getItem("highscore")), 0);

    this.addTask(this.detectShooting);
  }

  public start() {
    super.start();

    const texture = this.getAsset("rocket");
    this.rocketSprite = new RocketSprite({
      position: new Position(100, this.canvas.height - texture.height / 10),
      texture,
      height: texture.height / 10, width: texture.width / 10,
    });
  }

  public detectShooting() {
    if (this.mouse.isClick) {
      this.shoot();
    }

    if (
        this.keyboard.keys[32].justPressed || // Space
        this.keyboard.keys[90].justPressed || // Z
        this.keyboard.keys[38].justPressed    // Up arrow
      ) {
      this.shoot();
    }
  }

  public shoot() {
    if (!this.rocketSprite) {
      return;
    }

    const texture = this.getAsset("bullet");
    const width = texture.width / 15;
    const height = texture.height / 15;
    new BulletSprite({
      position: new Position(this.rocketSprite.position),
      texture, width, height,
    });
  }

  // creats a balloon in a random location above the screen
  public createEnemy(task: Task) {
    const texture = this.getAsset("saucer");
    const width = texture.width / 20;
    const height = texture.height / 20;

    const sprite = new SaucerSprite({
      position: new Position(Math.random() * (this.canvas.width - width), -height),
      height, width, texture,
    });

    // difficulty scaling
    const spawnRate = this.getSpawnRate(task);
    task.repeatEvery = spawnRate;
  }

  // returns how many frames should be between each balloon spawn
  public getSpawnRate(task: Task) {
    const BASE_SPEED = (task.originalOptions as IRepeatingTaskOptions).repeatEvery;
    return BASE_SPEED ** (1 - this.difficulty / 3);
  }

  // renders a game over screen and stops the game
  public gameover() {
    this.resetCanvas();

    this.ctx.font = "50px Arial";
    this.ctx.fillStyle = "black";

    const text = "Game Over!";
    const width = this.ctx.measureText(text).width;

    this.ctx.fillText("Game Over!", (this.canvas.width / 2) - width / 2, this.canvas.height / 2);

    this.exit();
  }

  get difficulty() {
    return (performance.now() - this.startTime) / 1000 / 100;
  }

  get score() {
    return this._score;
  }

  set score(score) {
    score = Math.max(score, 0);

    (document.getElementById("score") as HTMLElement).textContent = score.toString();

    if (score > this.highscore) {
      this.highscore = score;
    }

    this._score = score;
  }

  get highscore() {
    return this._highscore;
  }

  set highscore(highscore) {
    (document.getElementById("player-highscore") as HTMLElement).textContent = highscore.toString();
    localStorage.setItem("highscore", highscore.toString());
    this._highscore = highscore;
  }

  public onexit() {
    (document.getElementById("start") as HTMLButtonElement).style.display = "block";
  }

  protected resetVariables() {
    super.resetVariables();
    this.score = 0;
    this.startTime = performance.now();
  }
}
