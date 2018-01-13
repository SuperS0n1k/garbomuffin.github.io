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
import { StaticRendererSprite } from "./staticRenderer";
import { Vector } from "./vector";

// Dimensions of the canvas
const CANVAS_WIDTH = 480;
const CANVAS_HEIGHT = 360;

// Format of images
// .jpg might work but don't, just don't
const IMAGE_FORMAT = "png";

// Format of sounds
// mp3 has very wide browser support: https://caniuse.com/#feat=mp3
const SOUND_FORMAT = "mp3";

// Debugging rendering
const _DEBUG_NON_STATIC_OUTLINE = false;
const _DEBUG_STATIC_OUTLINE = false;

if (_DEBUG_NON_STATIC_OUTLINE || _DEBUG_STATIC_OUTLINE) {
  console.warn("Debug features are on!");
}

export class GameRuntime extends TaskRunner {
  // see resetVariables()
  public readonly images: Map<string, TImage> = new Map();
  public readonly sounds: Map<string, TSound> = new Map();
  public sprites: Container;
  public containers: Container[] = [];
  public mouse: Mouse;
  public keyboard: AbstractKeyboard;
  public frames: number = 0;
  public started: boolean = false;
  public background: TBackground = "white";
  private _assetPromises: Array<Promise<TImage>> = [];

  // rendering
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;

  public staticCanvas: HTMLCanvasElement;
  public staticCtx: CanvasRenderingContext2D;

  constructor(container: HTMLElement) {
    super();

    this.canvas = this.createCanvas();
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    container.appendChild(this.canvas);

    this.staticCanvas = this.createCanvas();
    this.staticCtx = this.staticCanvas.getContext("2d") as CanvasRenderingContext2D;

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
    this.addTask(() => this.mouse.update());

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

    new StaticRendererSprite({
      position: new Vector(0, 0, -1),
      persistent: true,
    });
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

  public updateStatic() {
    this.resetCanvas(this.staticCtx);
    this.sortSprites();

    for (const sprite of this.sprites) {
      if (sprite.static) {
        sprite.render(this.staticCtx);

        if (_DEBUG_STATIC_OUTLINE) {
          this.staticCtx.strokeStyle = "orange";
          this.staticCtx.lineWidth = 2;
          this.staticCtx.beginPath();
          this.staticCtx.rect(sprite.x, sprite.y, sprite.width, sprite.height);
          this.staticCtx.stroke();
        }
      }
    }
  }

  public render() {
    // clear the canvas
    this.resetCanvas(this.ctx, this.background);

    // sort sprites by z TODO: perhaps only do this when we know something changed?
    this.sortSprites();

    // render all non static sprites onto our canvas
    for (const sprite of this.sprites) {
      if (!sprite.static) {
        sprite.render(this.ctx);

        if (_DEBUG_NON_STATIC_OUTLINE) {
          this.ctx.strokeStyle = "red";
          this.ctx.lineWidth = 1;
          this.ctx.beginPath();
          this.ctx.rect(sprite.x, sprite.y, sprite.width, sprite.height);
          this.ctx.stroke();
        }
      }
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

  // clears the canvas and sets the background or makes it transparent
  protected resetCanvas(ctx: CanvasRenderingContext2D, background: TBackground = "rgba(0, 0, 0, 0)") {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;

    ctx.scale(1, 1);
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, width, height);
  }

  public createCanvas() {
    const canvas = document.createElement("canvas");
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    return canvas;
  }

  // called when exiting
  public onexit() {
    this.started = false;
  }
}
