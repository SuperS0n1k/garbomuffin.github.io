/*
 * The main game runtime object
 */

import { Container } from "./container";
import { AbstractKeyboard } from "./drivers/keyboard/base";
import { Keyboard } from "./drivers/keyboard/keyboard";
import { Mouse } from "./drivers/mouse/mouse";
import { TouchscreenMouse } from "./drivers/mouse/touchscreen";
import { ExitError } from "./errors/exit";
import { AbstractSprite } from "./sprite";
import { TaskRunner } from "./task";
import { TImage, TBackground, TSound } from "./types";
import { isMobile } from "./utils";

// Dimensions of the canvas
const CANVAS_WIDTH = 480;
const CANVAS_HEIGHT = 360;

// Format of images
// .jpg might work but don't, just don't
const IMAGE_FORMAT = "png";

// Format of sounds
// mp3 has very wide browser support: https://caniuse.com/#feat=mp3
const SOUND_FORMAT = "mp3";

export class GameRuntime extends TaskRunner {
  // see resetVariables()
  public readonly images: Map<string, TImage> = new Map();
  public readonly sounds: Map<string, TSound> = new Map();
  public sprites: Container;
  public containers: Container[] = [];
  public mouse: Mouse;
  public keyboard: AbstractKeyboard;
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  public frames: number = 0;
  public started: boolean = false;

  public background: TBackground = "white";
  private _assetPromises: Array<Promise<TImage>> = [];

  constructor(canvas: HTMLCanvasElement) {
    super();

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    // mouse driver, support pc and mobile to some degree
    if (!isMobile()) {
      console.log("using normal mouse");
      this.mouse = new Mouse(this);
    } else {
      console.log("using mobile mouse");
      this.mouse = new TouchscreenMouse(this);
    }

    this.keyboard = new Keyboard(this);

    // set the current runtime on some objects
    // i dont want to do this but it works
    AbstractSprite.runtime = this as any;
    Container.runtime = this as any;

    // reset other variables
    this.resetVariables();

    // debugging
    (window as any).runtime = this;

    // run the mouse driver
    this.addTask(() => this.updateMouse());

    // classess are weird
    this.loop = this.loop.bind(this);
  }

  ///
  /// ASSETS
  ///

  // add an asset and start loading it
  public addImage(src: string) {
    // uses the original src for storage
    // TODO: consider using the new src and adding that into getAsset?
    const originalSrc = src;

    // add the extension and folder
    src = `assets/${src}`;
    if (src.indexOf(".") === -1) {
      src += "." + IMAGE_FORMAT;
    }

    console.log("adding image", src);

    const promise = new Promise<TImage>((resolve, reject) => {
      const image = new Image();
      image.src = src;
      image.onload = () => resolve();
      image.onerror = () => reject();
      this.images.set(originalSrc, image);
    });
    this._assetPromises.push(promise);
    return promise;
  }

  // see: addImage()
  public addSound(src: string) {
    const originalSrc = src;

    // add the extension and folder
    src = `assets/sounds/${src}`;
    if (src.indexOf(".") === -1) {
      src += "." + SOUND_FORMAT;
    }

    console.log("adding sound", src);

    const promise = new Promise<TImage>((resolve: any, reject: any) => {
      const sound = new Audio(src);
      sound.oncanplaythrough = () => resolve();
      sound.onerror = () => reject();
      sound.preload = "auto";
      this.sounds.set(originalSrc, sound);
    });

    this._assetPromises.push(promise);
    return promise;
  }

  // wait for all assets to load
  public waitForAssets(handler: (num: number) => void = () => {}) {
    // progress reporting
    const total = this._assetPromises.length;
    let current = 0;
    for (const promise of this._assetPromises) {
      promise.then(() => {
        current++;
        handler(current / total);
      });
    }

    // the actual loading stuff
    return Promise.all(this._assetPromises)
      .then(() => {
        console.log("loaded assets");
        this._assetPromises = [];
      });
  }

  // get an asset with a name
  public getImage(src: string): TImage {
    const image = this.images.get(src);
    if (!image) {
      console.warn("Couldn't get image", src);
    }
    return image as TImage;
  }

  // get a sound with a name
  public getSound(src: string): TSound {
    return this.sounds.get(src) as TSound;
  }

  // plays a sound and resets its currentTime to 0
  public playSound(src: string | TSound) {
    if (typeof src === "string") {
      src = this.getSound(src);
    }
    src.currentTime = 0;
    src.play();
    return src;
  }

  // stops a sound and resets its currentTime to 0
  public stopSound(src: string | TSound) {
    if (typeof src === "string") {
      src = this.getSound(src);
    }
    src.currentTime = 0;
    src.pause();
    return src;
  }

  ///
  /// CORE
  ///

  // reset variabels to sane defaults
  // after starting it has to reset things
  protected resetVariables() {
    // this.containers = [];
    this.sprites = new Container();
  }

  // resets things and starts the loop
  public start() {
    console.log("starting loop");
    this.resetVariables();
    this.loop();

    this.started = true;
  }

  // the main loop - calls all tasks in all sprites
  public loop() {
    // update sprites and this
    this.frames++;
    try {
      this.update();
    } catch (e) {
      // handle exiting
      if (e instanceof ExitError) {
        this.onexit();
        return;
      } else {
        throw e;
      }
    }

    // render
    this.render();

    // request the next frame to render
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
    // clear the canvas
    this.resetCanvas(this.ctx, this.background);

    // sort sprites by z TODO: find a better for to do this
    this.sortSprites();

    // render all sprites onto our canvas
    for (const sprite of this.sprites) {
      sprite.render(this.ctx);
    }
  }

  protected sortSprites() {
    this.sprites.sort();
  }

  public stopAllSounds() {
    this.sounds.forEach((sound) => this.stopSound(sound));
  }

  // throws an error that is handled gracefully by the update function
  // stops ALL execution
  public exit() {
    this.stopAllSounds();

    console.warn("exiting using exit()");

    // instances of ExitError are treated specially by the update function
    throw new ExitError();
  }

  // clears the canvas and replaces it with a blank white background
  protected resetCanvas(ctx: CanvasRenderingContext2D, background: TBackground = "white") {
    ctx.scale(1, 1);
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  // small function that calls the mouse driver's update funciton
  private updateMouse() {
    this.mouse.update();
  }

  // called when exiting
  public onexit() {
    this.started = false;
  }
}
