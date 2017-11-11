import { TImage } from "./types";
import { Sprite } from "./sprite";
import { Container } from "./container";
import { Mouse } from "./drivers/mouse";
import { TaskRunner, Task } from "./task";
import { BalloonSprite } from "../sprites/balloon";
import { Position } from "./position";

export class GameRuntime extends TaskRunner {
  constructor(canvas: HTMLCanvasElement){
    super();

    this.canvas = canvas;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    this.loop = this.loop.bind(this);
    this.mouse = new Mouse(this);

    // set the current runtime on some objects
    Sprite.runtime = this as any;
    Container.runtime = this as any;

    this.sprites = new Container();

    // debugging
    (window as any).runtime = this;

    // tasks
    this.addTask(new Task({
      run: this.updateMouse,
      repeatEvery: 0,
    }));
  }

  private _assetPromises: Promise<TImage>[] = [];

  public readonly assets: Map<string, TImage> = new Map();
  public readonly sprites: Container;
  public readonly containers: Container[] = [];
  public readonly mouse: Mouse;

  // ASSET LOADING

  public addAsset(src: string){
    var originalSrc = src;
    src = `assets/${src}.png`;

    console.log("adding asset", src);

    const promise = new Promise<TImage>(function(this: GameRuntime, resolve: any, reject: any){
      const image = document.createElement("img");
      image.src = src;
      image.onload = function(){
        resolve();
      };
  
      image.onerror = function(){
        reject();
      };

      this.assets.set(originalSrc, image);
    }.bind(this));

    this._assetPromises.push(promise);

    return promise;
  }

  public async waitForAssets(){
    await Promise.all(this._assetPromises);

    console.log("loaded assets");
  }

  public getAsset(src: string){
    return this.assets.get(src) as TImage;
  }

  // GAME LOOP

  public start(){
    console.log("starting loop");
    this.loop();
  }

  public loop(){
    this.update();
    this.render();

    requestAnimationFrame(this.loop);
  }

  public update(){
    // all non-core details should be implemented using this.addTask
    // the only core things right now are sprite ticking and rendering
    // all tasks added on here are executed BEFORE sprites
    this.runTasks();

    for (const sprite of this.sprites){
      sprite.update();
    }
  }

  public render(){
    this.resetCanvas();
    for (const sprite of this.sprites){
      sprite.render(this.ctx);
    }
  }

  protected resetCanvas(){
    this.ctx.scale(1, 1);
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  // TASKS

  private updateMouse(){
    this.mouse.update();
  }

  public readonly canvas: HTMLCanvasElement;
  public readonly ctx: CanvasRenderingContext2D;
}

export class Game extends GameRuntime {
  constructor(){
    super(document.getElementById("canvas") as HTMLCanvasElement);

    this.addTask(new Task({
      run: this.createBalloon,
      repeatEvery: 100,
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

  public createBalloon(){
    const texture = this.getAsset("balloon");
    const width = texture.width / 10;
    const height = texture.height / 10;

    const sprite = new BalloonSprite({
      position: new Position(Math.random() * (this.canvas.width - width), 0),
      height, width, texture,
    });
  }

  public checkForNewGlobalRecord(){
    if (this.score > this.lastKnownGlobalHighscore){
      this.setGlobalHighscore(this.score);
    }
  }

  public getGlobalHighscore(){
    const options = {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      // what the fuck?
      // this works?
      body: JSON.stringify({
        query: `{Highscore(id: "cj9ungg2zbh4f0167o0kigi5r"){score}}`
      }),
    };
    return fetch("https://api.graph.cool/simple/v1/cj9un6whi02dn0163xh8unei0", options as any)
      .then(res => res.json())
      .then(res => res.data.Highscore.score)
      .then(score => {
        this.lastKnownGlobalHighscore = score;
        (document.getElementById("global-highscore") as HTMLElement).textContent = score
      });
  }

  public setGlobalHighscore(score: number){
    const options = {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: `mutation{updateHighscore(id: "cj9ungg2zbh4f0167o0kigi5r" score: ${score}){id score}}`
      }),
    };
    return fetch("https://api.graph.cool/simple/v1/cj9un6whi02dn0163xh8unei0", options as any);
  }

  public gameover(){
    this.resetCanvas();

    this.ctx.font = "70px Arial";
    this.ctx.fillStyle = "black";

    const text = "Game Over!";
    const width = this.ctx.measureText(text).width;

    this.ctx.fillText("Game Over!", (this.canvas.width / 2) - width / 2, this.canvas.height / 2);

    throw new Error("game over");
  }

  private _score: number = 0;
  private _highscore: number = 0;
  private lastKnownGlobalHighscore: number = 0;

  get score(){
    return this._score;
  }
  set score(score){
    (document.getElementById("score") as HTMLElement).textContent = score.toString();
    if (score > this.highscore){
      this.highscore = score;
    }
    this._score = score;
  }
  get highscore(){
    return this._highscore;
  }
  set highscore(highscore){
    (document.getElementById("player-highscore") as HTMLElement).textContent = highscore.toString();
    this._highscore = highscore;
  }
}
