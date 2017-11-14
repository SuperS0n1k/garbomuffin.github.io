// handles mouse events
// a simple "driver" for the mouse

// TODO: touchscreen support
// probably will use another "driver" that is compatible

import { GameRuntime } from "../../game";
import { TaskRunner } from "../../task";
import { IMouseButton, IMouse, BaseMouse, BaseMouseButton, EmptyMouseButton } from "./base";
import { Position } from "../../position";

export class TouchscreenButton extends BaseMouseButton implements IMouseButton {
  constructor(mouse: Mouse) {
    super(mouse); // It's a bird! It's a plane! No it's Supermouse!

    document.addEventListener("touchstart", function (this: TouchscreenButton, e: any) {
      this.isDown = true;
    }.bind(this));

    document.addEventListener("touchend", function (this: TouchscreenButton, e: any) {
      this.isDown = false;
    }.bind(this));

    document.addEventListener("touchcancel", function (this: TouchscreenButton, e: any) {
      this.isDown = false;
    }.bind(this));
  }
}

export class Mouse extends BaseMouse implements IMouse {
  private readonly runtime: GameRuntime;

  constructor(runtime: GameRuntime) {
    super();

    this.runtime = runtime;

    // only the left mouse button does stuff
    this.left = new TouchscreenButton(this);
    this.middle = new EmptyMouseButton();
    this.right = new EmptyMouseButton();

    runtime.canvas.addEventListener("touchmove", (e: any) => {
      this.handleEvent(e);
    });

    runtime.canvas.addEventListener("touchstart", (e: any) => {
      this.handleEvent(e);
    });

    runtime.canvas.addEventListener("touchend", (e: any) => {
      this.handleEvent(e);
    });

    runtime.canvas.addEventListener("touchcancel", (e: any) => {
      this.handleEvent(e);
    });

    this.addTask(() => {
      console.log(this.isClick);
    })
  }

  private handleEvent(e: any){
    e.preventDefault();

    const offset = this.findOffset(this.runtime.canvas);

    this.position.x = e.changedTouches[0].clientX - offset.x;
    this.position.y = e.changedTouches[0].clientY - offset.y;
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/Touch_events with minor modifications
  private findOffset(el: HTMLElement){
    var curleft = 0;
    var curtop = 0;
  
    do {
      curleft += el.offsetLeft;
      curtop += el.offsetTop;
    } while (el = (el.offsetParent as HTMLElement));

    return { x: curleft-document.body.scrollLeft, y: curtop-document.body.scrollTop };
  }
}
