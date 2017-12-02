type Handler = () => void;

export class Keyboard {
  private handlers: Handler[][] = [];

  constructor() {
    document.addEventListener("keydown", (e) => {
      const keyCode = e.keyCode;

      const handlers = this.handlers[keyCode];
      if (typeof handlers === "undefined" || handlers.length === 0) {
        // no handlers
        return;
      }

      // only cancel the event if we have handlers assigned
      e.preventDefault();

      for (const func of handlers) {
        func();
      }
    });

    document.addEventListener("keyup", (e) => this.preventDefault(e));
    document.addEventListener("keypress", (e) => this.preventDefault(e));
  }

  private preventDefault(e: KeyboardEvent) {
    const keyCode = e.keyCode;
    const handlers = this.handlers[keyCode];
    const cancel = handlers && handlers.length > 0;

    if (cancel) {
      e.preventDefault();
    }
  }

  public handleKeypress(keyCode: number, func: () => void) {
    // create the array if it does not already exist
    if (typeof this.handlers[keyCode] === "undefined") {
      this.handlers[keyCode] = [];
    }

    const handlers = this.handlers[keyCode];
    handlers.push(func);
  }
}
