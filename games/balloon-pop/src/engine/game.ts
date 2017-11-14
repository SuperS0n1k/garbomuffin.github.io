// this is the main game runtime object
// rendering is done here
// a lot of stuff is done here

import { TImage } from "./types";
import { Sprite } from "./sprite";
import { Container } from "./container";
import { Mouse } from "./drivers/mouse";
import { TaskRunner, Task } from "./task";
import { BalloonSprite } from "../sprites/balloon";
import { Position } from "./position";
import { ExitError } from "./errors/exit";

export class GameRuntime extends TaskRunner {
  private _assetPromises: Promise<TImage>[] = [];

  // see resetVariables()
  public readonly assets: Map<string, TImage> = new Map();
  public sprites: Container;
  public containers: Container[] = [];
  public mouse: Mouse;
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    super();

    this.canvas = canvas;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    this.loop = this.loop.bind(this);
    this.mouse = new Mouse(this);

    // set the current runtime on some objects
    Sprite.runtime = this as any;
    Container.runtime = this as any;

    // reset other variables
    this.resetVariables();

    // debugging
    (window as any).runtime = this;

    // tasks
    this.addTask(new Task({
      run: this.updateMouse,
      repeatEvery: 0,
    }));
  }

  ///
  /// ASSETS
  ///

  // add an asset and start loading it
  public addAsset(src: string) {
    var originalSrc = src;
    src = `assets/${src}.png`;

    console.log("adding asset", src);

    const promise = new Promise<TImage>(function (this: GameRuntime, resolve: any, reject: any) {
      const image = document.createElement("img");
      image.src = src;
      image.onload = function () {
        resolve();
      };

      image.onerror = function () {
        reject();
      };

      this.assets.set(originalSrc, image);
    }.bind(this));

    this._assetPromises.push(promise);

    return promise;
  }

  // wait for all assets to load
  public async waitForAssets() {
    // Promise.all will fail on an error and that is probably preferred behavior
    await Promise.all(this._assetPromises);

    console.log("loaded assets");
  }

  // get an asset with a name
  public getAsset(src: string) {
    return this.assets.get(src) as TImage;
  }

  ///
  /// CORE
  ///

  // reset variabels to sane defaults
  // after starting it has to reset things
  protected resetVariables() {
    this.sprites = new Container();
    this.containers = [];
  }

  // resets things and starts the loop
  public start() {
    console.log("starting loop");
    this.resetVariables();
    this.loop();
  }

  // the main loop - calls all tasks in all sprites
  public loop() {
    // 1. Update sprites and this
    try {
      this.update();
    } catch (e) {
      // 1.1. Handle exiting
      if (e instanceof ExitError) {
        this.onexit();
        return;
      } else {
        throw e;
      }
    }

    // 2. Render
    this.render();

    // Get ready for the next frame
    requestAnimationFrame(this.loop);
  }

  public update() {
    // all non-core details should be implemented using this.addTask
    // the only core things right now are sprite ticking and rendering (partly due to ordering reasons)
    // all tasks added on here are executed BEFORE sprites
    this.runTasks();

    // all sprites
    for (const sprite of this.sprites) {
      sprite.update();
    }
  }

  public render() {
    this.resetCanvas();

    // render all sprites onto our canvas
    for (const sprite of this.sprites) {
      sprite.render(this.ctx);
    }
  }

  // throws an error that is handled gracefully by the update function
  // stops ALL execution
  public exit() {
    console.warn("exiting using exit()");
    throw new ExitError();
  }

  // clears the canvas and replaces it with a blank white background
  protected resetCanvas() {
    this.ctx.scale(1, 1);
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  // small function that calls the mouse driver's update funciton
  private updateMouse() {
    this.mouse.update();
  }

  // called when exiting
  public onexit() {
    console.warn("empty onexit()");
  }
}
