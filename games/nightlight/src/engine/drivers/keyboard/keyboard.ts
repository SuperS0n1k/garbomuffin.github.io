import { GameRuntime } from "../../runtime";
import { AbstractKeyboard } from "./base";

export class Keyboard extends AbstractKeyboard {
  private static readonly PREVENT: number[] = [
    32, // space
    37, // left
    38, // up
    39, // right
    40, // down
  ];

  constructor(runtime: GameRuntime) {
    super(runtime);

    document.addEventListener("keydown", (e) => {
      const keyCode = e.keyCode;
      if (Keyboard.PREVENT.includes(keyCode)) {
        e.preventDefault();
      }
      this.keys[keyCode].isPressed = true;
    });

    document.addEventListener("keyup", (e) => {
      const keyCode = e.keyCode;
      if (Keyboard.PREVENT.includes(keyCode)) {
        e.preventDefault();
      }
      this.keys[keyCode].isPressed = false;
    });
  }
}
