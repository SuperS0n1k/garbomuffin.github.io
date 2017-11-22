import { GameRuntime } from "./engine/runtime";
import { Vector } from "./engine/vector";
import { IRepeatingTaskOptions, Task } from "./engine/task";
import { getOrDefault } from "./engine/utils";
import { BulletSprite } from "./sprites/bullet";
import { RocketSprite } from "./sprites/rocket";
import { SaucerSprite } from "./sprites/saucer";
import { TextSprite } from "./engine/sprites/textsprite";
import { HighscoreTextSprite } from "./sprites/text/highscore";
import { ScoreTextSprite } from "./sprites/text/score";
import { getRandomInt } from "./utils";
import { LivesTextSprite } from "./sprites/text/lives";
import { GlobalHighscoreTextSprite } from "./sprites/text/globalhighscore";
import { Key } from "./engine/drivers/keyboard/base";
import { GlobalHighscoreHolderTextSprite } from "./sprites/text/globalhighscoreholder";

export class SpaceInvaderGame extends GameRuntime {
  private _lives: number = 3;
  private _score: number = 0;
  private _highscore: number = 0;
  private startTime: number = performance.now();
  public globalHighscore: number = 0;
  public globalHighscoreHolder: string = "Anonymous";
  public rocketSprite: RocketSprite;

  constructor() {
    super(document.getElementById("canvas") as HTMLCanvasElement);

    this.addTask(new Task({
      run: this.createEnemy,
      repeatEvery: 180, // 3 seconds
      delay: 60,
    }));

    // query for current highscore every minute
    this.addTask(new Task({
      run: this.updateGlobalHighscore,
      repeatEvery: 60 * 60, // 1 minute
    }));

    // see if we beat the global highscore every second
    this.addTask(new Task({
      run: this.checkForNewGlobalHighscore,
      repeatEvery: 60, // 1 second
    }));

    this.score = 0;
    this.highscore = getOrDefault(Number(localStorage.getItem("highscore")), 0);

    this.addTask(this.detectShooting);

    // run inital tasks once
    this.runTasks();
  }

  public start() {
    super.start();

    const texture = this.getAsset("rocket");
    this.rocketSprite = new RocketSprite({
      position: new Vector(100, this.canvas.height - texture.height / 10),
      texture,
      height: texture.height / 10, width: texture.width / 10,
    });

    this.createStatsDisplay();
  }

  private createStatsDisplay() {
    const sprites: Array<typeof TextSprite> = [
      HighscoreTextSprite,
      GlobalHighscoreTextSprite,
      GlobalHighscoreHolderTextSprite,
      ScoreTextSprite,
      LivesTextSprite,
    ];
    const fontSize = 20;

    for (let i = 0; i < sprites.length; i++) {
      const y = (i + 1) * fontSize;
      const x = 3;

      new sprites[i]({
        position: new Vector(x, y, 10),
        fontSize,
      });
    }
  }

  public detectShooting() {
    if (this.mouse.isClick) {
      this.shoot();
    }

    const space = this.keyboard.keys[32];
    const z = this.keyboard.keys[90];
    const up = this.keyboard.keys[38];

    if (space.justPressed || z.justPressed || up.justPressed) {
      this.shoot();
    }

    const testRapidfire = (key: Key) => {
      if (key.framesDown > 1 && key.framesDown % 10 === 0) {
        this.shoot();
      }
    };

    testRapidfire(space);
    testRapidfire(z);
    testRapidfire(up);
  }

  public shoot() {
    if (!this.rocketSprite) {
      return;
    }

    const texture = this.getAsset("bullet");
    const width = texture.width / 15;
    const height = texture.height / 15;
    new BulletSprite({
      position: new Vector(this.rocketSprite.position),
      texture, width, height,
    });
  }

  // creats a balloon in a random location above the screen
  public createEnemy(task: Task) {
    const texture = this.getAsset("saucer");
    const width = texture.width / 20;
    const height = texture.height / 20;

    const sprite = new SaucerSprite({
      position: new Vector(getRandomInt(0, this.canvas.width - width), -height),
      hSpeed: getRandomInt(-5000, 5000) / 1000,
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

    // TODO: consider using a TextSprite?

    const showCenteredText = (text: string, y: number, fontSize: number) => {
      this.ctx.font = `${fontSize}px Arial`;
      this.ctx.fillStyle = "black";
      const width = this.ctx.measureText(text).width;
      this.ctx.fillText(text, (this.canvas.width / 2) - width / 2, y);
    };

    showCenteredText("Game Over!", this.canvas.height / 2, 50);
    showCenteredText(`Score: ${this.score}`, this.canvas.height / 2 + 50, 25);

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

    if (score > this.highscore) {
      this.highscore = score;
    }

    this._score = score;
  }

  get highscore() {
    return this._highscore;
  }

  set highscore(highscore) {
    localStorage.setItem("highscore", highscore.toString());
    this._highscore = highscore;
  }

  get lives() {
    return this._lives;
  }

  set lives(lives) {
    if (lives <= 0) {
      this.gameover();
    } else {
      this._lives = lives;
    }
  }

  get username() {
    return (document.getElementById("user") as HTMLInputElement).value;
  }

  public onexit() {
    (document.getElementById("start") as HTMLButtonElement).style.display = "block";
  }

  protected resetVariables() {
    super.resetVariables();
    this.score = 0;
    this.startTime = performance.now();
  }

  private get highscoreServer() {
    if (location.href.includes("localhost:8080")) {
      return "http://localhost:8123/games/space-invaders";
    } else {
      return "https://garbomuffin.com/games/space-invaders";
    }
  }

  private updateGlobalHighscore() {
    return fetch(`${this.highscoreServer}/get`)
      .then((res) => res.json())
      .then((res) => {
        this.globalHighscore = res.highscore;
        this.globalHighscoreHolder = res.user;
      });
  }

  private setGlobalHighscore(highscore: number, user: string) {
    const opts = {
      method: "POST",
      body: JSON.stringify({
        highscore, user,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    this.globalHighscore = highscore;
    this.globalHighscoreHolder = user;
    return fetch(`${this.highscoreServer}/set`, opts as any);
  }

  private checkForNewGlobalHighscore() {
    if (this.score > this.globalHighscore) {
      this.setGlobalHighscore(this.score, this.username);
    }
  }
}
