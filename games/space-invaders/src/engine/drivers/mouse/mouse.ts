import { GameRuntime } from "../../runtime";
import { BaseMouse, BaseMouseButton, IMouse, IMouseButton } from "./base";

// handles mouse events
// a simple "driver" for the mouse

// TODO: touchscreen support
// probably will use another "driver" that is compatible

enum Button {
  left = 0,
  middle = 1,
  right = 2,
}

class MouseButton extends BaseMouseButton implements IMouseButton {
  private button: Button;

  constructor(mouse: Mouse, button: Button) {
    super(mouse); // It's a bird! It's a plane! No it's Supermouse!

    this.button = button;

    document.addEventListener("mousedown", (e: any) => {
      if (e.button === this.button) {
        this.isDown = true;
      }
    });

    document.addEventListener("mouseup", (e: any) => {
      if (e.button === this.button) {
        this.isDown = false;
      }
    });
  }
}

export class Mouse extends BaseMouse implements IMouse {
  constructor(runtime: GameRuntime) {
    super(runtime);

    this.right = new MouseButton(this, Button.right);
    this.middle = new MouseButton(this, Button.middle);
    this.left = new MouseButton(this, Button.left);

    runtime.canvas.addEventListener("mousemove", (e: any) => {
      this.position.x = e.layerX;
      this.position.y = e.layerY;
    });

    runtime.canvas.addEventListener("mousedown", (e: any) => {
      e.preventDefault();
    });
  }
}
