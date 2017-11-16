import { GameRuntime } from "../../game";
import { BaseMouse, BaseMouseButton, EmptyMouseButton, IMouse, IMouseButton } from "./base";

// handles mouse events
// a simple "driver" for the mouse

// TODO: touchscreen support
// probably will use another "driver" that is compatible

class TouchscreenButton extends BaseMouseButton implements IMouseButton {
  constructor(mouse: TouchscreenMouse) {
    super(mouse); // It's a bird! It's a plane! No it's Supermouse!

    document.addEventListener("touchstart", (e: any) => {
      this.isDown = true;
    });

    document.addEventListener("touchend", (e: any) => {
      this.isDown = false;
    });

    document.addEventListener("touchcancel", (e: any) => {
      this.isDown = false;
    });
  }
}

export class TouchscreenMouse extends BaseMouse implements IMouse {
  constructor(runtime: GameRuntime) {
    super(runtime);

    // only the left mouse button does stuff
    this.left = new TouchscreenButton(this);
    this.middle = new EmptyMouseButton();
    this.right = new EmptyMouseButton();

    // stop scrolling, zooming, or other stuff that you can do with your fingers
    this.handleEvent = this.handleEvent.bind(this);

    runtime.canvas.addEventListener("touchmove", this.handleEvent);
    runtime.canvas.addEventListener("touchstart", this.handleEvent);
    runtime.canvas.addEventListener("touchend", this.handleEvent);
    runtime.canvas.addEventListener("touchcancel", this.handleEvent);
  }

  private handleEvent(e: any) {
    e.preventDefault();

    const offset = this.findOffset(this.runtime.canvas);

    this.position.x = e.changedTouches[0].clientX - offset.x;
    this.position.y = e.changedTouches[0].clientY - offset.y;
  }
}
