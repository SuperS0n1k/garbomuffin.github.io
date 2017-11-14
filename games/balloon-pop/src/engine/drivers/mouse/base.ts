import { Position } from "../../position";
import { TaskRunner } from "../../task";

export interface IMouseButton {
  isDown: boolean
  isUp: boolean
  isClick: boolean
  framesDown: number
  update(): void
}

// isDown, isClick etc. should all just return the left mouse button's result
export interface IMouse extends IMouseButton {
  left: IMouseButton
  right: IMouseButton
  middle: IMouseButton
  position: Position
}

export class BaseMouse extends TaskRunner implements IMouse {
  public right: IMouseButton
  public middle: IMouseButton
  public left: IMouseButton
  public position: Position = new Position(0, 0);

  public update() {
    this.runTasks();
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

  constructor(mouse: BaseMouse){
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

export class EmptyMouseButton implements IMouseButton {
  public readonly isDown = false;
  public readonly isUp = true;
  public readonly isClick = false;
  public readonly framesDown = 0;
  public update(){}
}

export enum Button {
  left = 0,
  middle = 1,
  right = 2,
}
