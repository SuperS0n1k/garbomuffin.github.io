// handles mouse events
// a simple "driver" for the mouse

// TODO: touchscreen support
// probably will use another "driver" that is compatible

import { GameRuntime } from "../game";
import { TaskRunner } from "../task";

export enum Button {
  left = 0,
  middle = 1,
  right = 2,
}

export class MouseButton {
  private button: Button;
  public isDown: boolean = false;
  public framesDown: number = 0;

  constructor(mouse: Mouse, button: Button) {
    this.button = button;

    document.addEventListener("mousedown", function (this: MouseButton, e: any) {
      if (e.button === this.button) {
        this.isDown = true;
      }
    }.bind(this));

    document.addEventListener("mouseup", function (this: MouseButton, e: any) {
      if (e.button === this.button) {
        this.isDown = false;
      }
    }.bind(this));

    mouse.addTask(this.update.bind(this));
  }

  public update() {
    if (this.isDown) {
      this.framesDown++;
    } else {
      this.framesDown = 0;
    }
  }

  get isUp() {
    return !this.isDown;
  }

  get isClick() {
    return this.framesDown === 1;
  }
}

export class Mouse extends TaskRunner {
  public readonly right: MouseButton
  public readonly middle: MouseButton
  public readonly left: MouseButton
  public x: number
  public y: number

  constructor(runtime: GameRuntime) {
    super();

    this.right = new MouseButton(this, Button.right);
    this.middle = new MouseButton(this, Button.middle);
    this.left = new MouseButton(this, Button.left);

    runtime.canvas.addEventListener("mousemove", function (this: Mouse, e: any) {
      this.x = e.layerX;
      this.y = e.layerY;
    }.bind(this));

    runtime.canvas.addEventListener("mousedown", function (this: Mouse, e: any) {
      e.preventDefault();
    }.bind(this));
  }

  public update() {
    this.runTasks();
  }

  get isDown() {
    return this.left.isDown;
  }

  get isClick() {
    return this.left.isClick;
  }
}
