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
  private textLength: number = Infinity;
  protected direction: Direction = Direction.Up;
  public showing: boolean = false;
  public scrolling: boolean = false;
  public config: ConfigManager;

  constructor(config: ConfigManager) {
    this.config = config;

    this.loop = this.loop.bind(this);
    this.loop();
  }

  ///
  /// Inherited from IPrompter
  ///

  // Start the scrolling
  public start() {
    this.scrolling = true;
  }

  // Stop the scrolling
  public stop() {
    this.scrolling = false;
  }

  // show the prompter
  // call super.show() in implementations
  public show() {
    this.showing = true;
    this.scrollDistance = 0;

    this.loadScript(this.getScript());
    this.textLength = this.getTextLength();
  }

  // hide & stop the prompter
  // call super.hide() in implementations
  public hide() {
    this.stop();

    this.showing = false;
  }

  ///
  /// Methods
  ///

  // Reverse the going direction
  protected reverseDirection() {
    if (this.direction === Direction.Up) {
      this.direction = Direction.Down;
    } else {
      this.direction = Direction.Up;
    }
  }

  // Main loop - renders and scrolls
  protected loop() {
    requestAnimationFrame(this.loop);

    if (!this.showing) {
      return;
    }

    if (this.scrolling) {
      this.scroll();
    }

    this.render(this.scrollDistance);
  }

  // Move the current scroll distance according to the speed
  protected scroll() {
    this.scrollDistance += this.config.speed * this.direction;
  }

  protected toggleScrolling() {
    if (this.scrolling) {
      this.stop();
    } else {
      this.start();
    }
  }

  protected get scrollDistance() {
    return this._scrollDistance;
  }

  protected set scrollDistance(distance) {
    // Make sure we can't scroll before the script
    if (distance < 0) {
      distance = 0;
    }

    // Make sure we can't scroll too far past the script
    if (distance > this.textLength) {
      distance = this.textLength;
    }

    this._scrollDistance = distance;
  }

  ///
  /// Abstract
  ///

  // returns the script
  protected abstract getScript(): string;

  // loads a script (not the javascript type) into the DOM
  protected abstract loadScript(script: string): void;

  // Render the prompter.
  // distance - how far the scrolling has gone (in pixels)
  protected abstract render(distance: number): void;

  // how long the text is (in pixels)
  protected abstract getTextLength(): number;
}
