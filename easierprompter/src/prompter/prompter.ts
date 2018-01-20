import { ConfigManager } from "../config/config";
import { Keyboard } from "../keyboard/keyboard";
import { emptyElement, getElement, setDisplay } from "../utils";
import { AbstractPrompter, Direction } from "./abstract";

const SPEED_INCREMENT = 0.25;

export class Prompter extends AbstractPrompter {
  private prompterText = getElement("prompter-lines-text") as HTMLUListElement;
  private prompterEndText = getElement("prompter-lines-end-text") as HTMLUListElement;

  constructor(config: ConfigManager) {
    super(config);

    this.addListeners();
    this.addKeyboardHandlers();
  }

  ///
  /// Init Methods
  ///

  // Makes buttons work
  private addListeners() {
    getElement("start-button").addEventListener("click", (e) => this.show());
    getElement("options-toggle-run").addEventListener("click", (e) => this.toggleScrolling());
    getElement("options-toggle-direction").addEventListener("click", (e) => this.reverseDirection());
    getElement("options-exit").addEventListener("click", (e) => this.hide());
    getElement("options-speed-up").addEventListener("click", (e) => this.speedUp());
    getElement("options-speed-down").addEventListener("click", (e) => this.speedDown());

    window.addEventListener("resize", (e) => {
      if (this.showing) {
        this.maxScrollDistance = this.getTextLength();
      }
    });
  }

  // Keyboard support
  private addKeyboardHandlers() {
    const keyboard = new Keyboard();

    // only enable keyboard shortcuts if the prompter is showing
    keyboard.require(() => this.showing);

    // 32 = space = start/stop
    keyboard.onKeyDown(32, () => {
      this.toggleScrolling();

      // disable browser from using space as a way to press buttons
      // you can still use enter as an alternative
      return true;
    });

    // 27 = esc = stop & go back to start or leave if already at start
    keyboard.onKeyDown(27, () => {
      if (this.scrollDistance === 0) {
        this.hide();
      } else {
        this.scrollDistance = 0;
        this.stop();
      }
    });

    // up arrow - increase speed
    keyboard.onKeyDown(38, () => this.speedUp());

    // down arrow - decrease speed
    keyboard.onKeyDown(40, () => this.speedDown());
  }

  ///
  /// Overrides
  ///

  // reverse direction and moving up/down button text
  protected reverseDirection() {
    super.reverseDirection();

    if (this.direction === Direction.Up) {
      getElement("options-toggle-direction").textContent = "Moving Down";
    } else {
      getElement("options-toggle-direction").textContent = "Moving Up";
    }
  }

  // Start and update start/stop button text
  public start() {
    super.start();
    getElement("options-toggle-run").textContent = "Stop";
  }

  // Stop and update start/stop button text
  public stop() {
    super.stop();
    getElement("options-toggle-run").textContent = "Start";
  }

  // Shows the script
  public show() {
    setDisplay(getElement("main"), false);
    setDisplay(getElement("prompter"), true);
    super.show();
  }

  // Hides the script
  public hide() {
    setDisplay(getElement("main"), true);
    setDisplay(getElement("prompter"), false);
    super.hide();
  }

  ///
  /// Implementations of abstract methods
  ///

  // Applies the margin style to scroll the script
  protected render(distance: number) {
    // This is the main bottle neck of the program
    // A better way to do this would be great and really help performance
    // Considering:
    // Canvas
    // Scrolling
    const lines = this.prompterText;
    lines.style.marginTop = `-${distance}px`;
  }

  // Inserts the script into the DOM
  protected loadScript(script: string) {
    this.resetScript();

    // Add all of the lines to the prompter
    const scriptLines = script.split("\n");
    for (const line of scriptLines) {
      this.addLine(line);
    }

    // Get the current text length
    this.maxScrollDistance = this.getTextLength();

    // Now append the [END] text
    this.addLine(this.config.options.endText.get(), getElement("prompter-lines-end-text"));
  }

  // Returns the current script
  protected getScript() {
    return (getElement("text-input") as HTMLTextAreaElement).value;
  }

  ///
  /// Helper Methods
  ///

  private getTextLength() {
    return this.prompterText.scrollHeight;
  }

  private addLine(text: string, container: HTMLElement = this.prompterText) {
    const item = document.createElement("p");
    item.textContent = text;
    container.appendChild(item);
  }

  // Removes all existing lines from the script element
  private resetScript() {
    emptyElement(this.prompterText);
    emptyElement(this.prompterEndText);
  }

  // Speed Up
  private speedUp() {
    if (this.showing) {
      this.config.speed += SPEED_INCREMENT;
    }
  }

  // Speed Down
  private speedDown() {
    if (this.showing) {
      this.config.speed -= SPEED_INCREMENT;
    }
  }
}
