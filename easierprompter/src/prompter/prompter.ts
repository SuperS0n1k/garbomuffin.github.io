import { AbstractPrompter, Direction } from "./abstract";
import { getElement } from "../utils";
import { ConfigManager } from "../config/config";
import { Keyboard } from "../keyboard/keyboard";

const SPEED_INCREMENT = 0.25;

export class Prompter extends AbstractPrompter {
  private prompterLines = getElement("prompter-lines") as HTMLUListElement;

  constructor(config: ConfigManager) {
    super(config);

    this.addListeners();
    this.addKeyboardHandlers();
  }

  ///
  /// Methods
  ///

  // Makes buttons work
  private addListeners() {
    getElement("start-button").addEventListener("click", (e) => this.show());
    getElement("options-toggle-run").addEventListener("click", (e) => this.toggleScrolling());
    getElement("options-toggle-direction").addEventListener("click", (e) => this.reverseDirection());
    getElement("options-exit").addEventListener("click", (e) => this.hide());
    getElement("options-speed-up").addEventListener("click", (e) => this.speedUp());
    getElement("options-speed-down").addEventListener("click", (e) => this.speedDown());
  }

  // Keyboard support
  private addKeyboardHandlers() {
    const keyboard = new Keyboard();

    // only enable keyboard shortcuts if the prompter is showing
    keyboard.require(() => this.showing);

    // 32 = space = start/stop
    keyboard.onKeyDown(32, () => {
      this.toggleScrolling();
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
    super.show();

    this.setDisplay(getElement("main"), false);
    this.setDisplay(getElement("prompter"), true);
  }

  // Hides the script
  public hide() {
    super.hide();

    this.setDisplay(getElement("main"), true);
    this.setDisplay(getElement("prompter"), false);
  }

  ///
  /// Implementations of abstract methods
  ///

  // Applies the margin style to scroll the script
  protected render(distance: number) {
    const lines = this.prompterLines as HTMLUListElement;
    lines.style.marginTop = `-${distance}px`;
  }

  // computes how long the script is and stores it
  // makes sure we don't scroll way too far
  protected getTextLength() {
    const styles = window.getComputedStyle(this.prompterLines);
    const height = (styles.height as string).replace("px", "");
    return Number(height);
  }

  // Insertst the script into the DOM
  protected loadScript(script: string) {
    this.resetScript();

    const prompterLines = getElement("prompter-lines");

    for (const line of script.split("\n")) {
      const listItem = document.createElement("p");
      listItem.textContent = line;
      prompterLines.appendChild(listItem);
    }
  }

  ///
  /// Utils or helper methods
  ///

  // Changes an element's visibility
  private setDisplay(el: HTMLElement, show: boolean) {
    el.style.display = show ? "block" : "none";
  }

  // Returns the current script
  protected getScript() {
    return (getElement("text-input") as HTMLTextAreaElement).value;
  }

  // Removes all existing lines from the script element
  private resetScript() {
    while (this.prompterLines.firstChild) {
      this.prompterLines.removeChild(this.prompterLines.firstChild);
    }
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
