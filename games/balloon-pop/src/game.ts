import { GameRuntime } from "./engine/game";
import { Position } from "./engine/position";
import { IRepeatingTaskOptions, Task } from "./engine/task";
import { BalloonSprite } from "./sprites/balloon";

export class BalloonPopGame extends GameRuntime {
  private _score: number = 0;
  private _highscore: number = 0;
  private lastKnownGlobalHighscore: number = 0;
  private startTime: number = performance.now();

  constructor() {
    super(document.getElementById("canvas") as HTMLCanvasElement);

    this.addTask(new Task({
      run: this.createBalloon,
      repeatEvery: 60,
    }));

    this.addTask(new Task({
      run: this.getGlobalHighscore,
      repeatEvery: 60 * 60, // 1 minute
    }));

    this.addTask(new Task({
      run: this.checkForNewGlobalRecord,
      repeatEvery: 60,
    }));
  }

  public start() {
    super.start();
  }

  // creats a balloon in a random location above the screen
  public createBalloon(task: Task) {
    const texture = this.getAsset("balloon");
    const width = texture.width / 10;
    const height = texture.height / 10;

    const sprite = new BalloonSprite({
      position: new Position(Math.random() * (this.canvas.width - width), -texture.height),
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

  // TODO: rewrite
  public checkForNewGlobalRecord() {
    if (this.score > this.lastKnownGlobalHighscore) {
      this.setGlobalHighscore(this.score);
    }
  }

  // TODO: rewrite using subscriptions
  public getGlobalHighscore() {
    const options = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      // what the fuck?
      // this works?
      body: JSON.stringify({
        query: `{Highscore(id: "cj9ungg2zbh4f0167o0kigi5r"){score}}`,
      }),
    };
    return fetch("https://api.graph.cool/simple/v1/cj9un6whi02dn0163xh8unei0", options as any)
      .then((res) => res.json())
      .then((res) => res.data.Highscore.score)
      .then((score) => {
        this.lastKnownGlobalHighscore = score;
        (document.getElementById("global-highscore") as HTMLElement).textContent = score;
      });
  }

  // TODO: rewrite
  public setGlobalHighscore(score: number) {
    const options = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `mutation{updateHighscore(id: "cj9ungg2zbh4f0167o0kigi5r" score: ${score}){id score}}`,
      }),
    };
    return fetch("https://api.graph.cool/simple/v1/cj9un6whi02dn0163xh8unei0", options as any);
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
