import { GameRuntime } from "../game";

export enum Button {
  left = 0,
  middle = 1,
  right = 2,
}

export class MouseButton {
  constructor(button: Button){
    this.button = button;
    document.addEventListener("mousedown", function(this: MouseButton, e: any){
      if (e.button === this.button){
        this.isDown = true;
      }
    }.bind(this));
    document.addEventListener("mouseup", function(this: MouseButton, e: any){
      if (e.button === this.button){
        this.isDown = false;
      }
    }.bind(this));
  }

  public isDown: boolean = false;
  get isUp(){
    return !this.isDown;
  }

  private button: Button;
}

export class Mouse {
  constructor(runtime: GameRuntime){
    this.right = new MouseButton(Button.right);
    this.middle = new MouseButton(Button.middle);
    this.left = new MouseButton(Button.left);

    runtime.canvas.addEventListener("mousemove", function(this: Mouse, e: any){
      this.x = e.layerX;
      this.y = e.layerY;
    }.bind(this));

    runtime.canvas.addEventListener("mousedown", function(this: Mouse, e: any){
      e.preventDefault();
    }.bind(this));
  }

  public update(){
    if (this.isDown && !this._previousIsDown){
      this.isClicking = true;
    }else{
      this.isClicking = false;
    }
    this._previousIsDown = this.isDown;
  }
  private _previousIsDown: boolean;
  public isClicking: boolean = false;

  public readonly right: MouseButton
  public readonly middle: MouseButton
  public readonly left: MouseButton

  public x: number
  public y: number

  get isDown(){
    return this.left.isDown;
  }
}
