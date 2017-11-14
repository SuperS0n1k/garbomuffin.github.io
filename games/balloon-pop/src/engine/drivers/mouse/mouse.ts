// handles mouse events
// a simple "driver" for the mouse

// TODO: touchscreen support
// probably will use another "driver" that is compatible

import { GameRuntime } from "../../game";
import { TaskRunner } from "../../task";
import { IMouseButton, IMouse, BaseMouse, BaseMouseButton, Button } from "./base";
import { Position } from "../../position";

export class MouseButton extends BaseMouseButton implements IMouseButton {
  private button: Button;

  constructor(mouse: Mouse, button: Button) {
    super(mouse); // It's a bird! It's a plane! No it's Supermouse!

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
  }
}

export class Mouse extends BaseMouse implements IMouse {
  constructor(runtime: GameRuntime) {
    super();

    this.right = new MouseButton(this, Button.right);
    this.middle = new MouseButton(this, Button.middle);
    this.left = new MouseButton(this, Button.left);

    runtime.canvas.addEventListener("mousemove", function (this: Mouse, e: any) {
      this.position.x = e.layerX;
      this.position.y = e.layerY;
    }.bind(this));

    runtime.canvas.addEventListener("mousedown", function (this: Mouse, e: any) {
      e.preventDefault();
    }.bind(this));
  }
}
