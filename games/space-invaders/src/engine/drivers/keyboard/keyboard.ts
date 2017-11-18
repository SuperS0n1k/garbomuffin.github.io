import { GameRuntime } from "../../runtime";
import { AbstractKeyboard } from "./base";

export class Keyboard extends AbstractKeyboard {
  constructor(runtime: GameRuntime) {
    super(runtime);

    document.addEventListener("keydown", (e) => {
      const keyCode = e.keyCode;
      this.keys[keyCode].isPressed = true;
    });

    document.addEventListener("keyup", (e) => {
      const keyCode = e.keyCode;
      this.keys[keyCode].isPressed = false;
    });
  }
}
