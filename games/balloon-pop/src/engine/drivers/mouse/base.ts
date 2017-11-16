import { GameRuntime } from "../../game";
import { Position } from "../../position";
import { TaskRunner } from "../../task";

export interface IMouseButton {
  isDown: boolean;
  isUp: boolean;
  isClick: boolean;
  framesDown: number;
  update(): void;
}

// isDown, isClick etc. should all just return the left mouse button's result
export interface IMouse extends IMouseButton {
  left: IMouseButton;
  right: IMouseButton;
  middle: IMouseButton;
  position: Position;
}

export class BaseMouse extends TaskRunner implements IMouse {
  public runtime: GameRuntime;
  public right: IMouseButton;
  public middle: IMouseButton;
  public left: IMouseButton;
  public position: Position = new Position(0, 0);

  constructor(runtime: GameRuntime) {
    super();

    this.runtime = runtime;
  }

  public update() {
    this.runTasks();
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/Touch_events with minor modifications
  protected findOffset(el: HTMLElement): Position {
    let curleft = 0;
    let curtop = 0;

    while (el.offsetParent) {
      curleft += el.offsetLeft;
      curtop += el.offsetTop;
      el = el.offsetParent as HTMLElement;
    }

    return new Position(curleft - document.body.scrollLeft, curtop - document.body.scrollTop);
  }

  get isDown() {
    return this.left.isDown;
  }

  get isUp() {
    return this.left.isUp;
  }

  get isClick() {
    return this.left.isClick;
  }

  get framesDown() {
    return this.left.framesDown;
  }
}

export class BaseMouseButton implements IMouseButton {
  public isDown: boolean = false;
  public framesDown: number = 0;

  constructor(mouse: BaseMouse) {
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

// A mouse button that doesn't do anything and always returns basic defaults
// Used by mobile mouse support as only left click is supported there
export class EmptyMouseButton implements IMouseButton {
  public readonly isDown = false;
  public readonly isUp = true;
  public readonly isClick = false;
  public readonly framesDown = 0;
  public update() { }
}
