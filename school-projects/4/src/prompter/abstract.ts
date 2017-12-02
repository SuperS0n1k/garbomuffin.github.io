import { ConfigManager } from "../config/config";
import { getElement } from "../utils";

interface IPrompter {
  start(): void;
  stop(): void;

  show(): void;
  hide(): void;
}

export enum Direction {
  Up = 1, Down = -1,
}

export abstract class AbstractPrompter implements IPrompter {
  private _scrollDistance: number = 0;

  protected config: ConfigManager;
  protected showing: boolean = false;
  protected scrolling: boolean = false;
  protected direction: Direction = Direction.Up;
  protected textLength: number = Infinity;

  constructor(config: ConfigManager) {
    this.config = config;

    this.loop = this.loop.bind(this);
    this.loop();
  }

  // Start the scrolling
  public start() {
    this.scrolling = true;
  }

  // Stop the scrolling
  public stop() {
    this.scrolling = false;
  }

  // Reverse the going direction
  public reverseDirection() {
    if (this.direction === Direction.Up) {
      this.direction = Direction.Down;
    } else {
      this.direction = Direction.Up;
    }
  }

  // Main loop - renders and scrolls
  public loop() {
    requestAnimationFrame(this.loop);

    if (!this.showing) {
      return;
    }

    if (this.scrolling) {
      this.scroll();
    }

    this.render(this.scrollDistance);
  }

  // Render the prompter.
  // distance - how far the scrolling has gone (in pixels)
  public abstract render(distance: number): void;

  // Move the current scroll distance according to the speed
  public scroll() {
    this.scrollDistance += this.config.speed * this.direction;
  }

  // returns the script
  public abstract getScript(): string;

  // loads a script (not the javascript type) into the DOM
  public abstract loadScript(script: string): void;

  // show the prompter
  // call super.show() in implementations
  public show() {
    this.showing = true;
    this.scrollDistance = 0;

    this.loadScript(this.getScript());
    this.calculateTextLength();
  }

  // hide & stop the prompter
  // call super.hide() in implementations
  public hide() {
    this.stop();

    this.showing = false;
  }

  // sets the textLength variable to how long the text is (in pixels)
  public abstract calculateTextLength(): void;

  get scrollDistance() {
    return this._scrollDistance;
  }

  set scrollDistance(distance) {
    if (distance < 0) {
      distance = 0;
    }

    if (distance > this.textLength) {
      distance = this.textLength;
    }

    this._scrollDistance = distance;
  }
}
