import { AbstractPrompter, Direction } from "./abstract";
import { getElement } from "../utils";
import { ConfigManager } from "../config/config";

const SPEED_INCREMENT = 0.5;

export class Prompter extends AbstractPrompter {
  private prompterLines = getElement("prompter-lines") as HTMLUListElement;

  constructor(config: ConfigManager) {
    super(config);

    this.addListeners();
  }

  public reverseDirection() {
    super.reverseDirection();

    if (this.direction === Direction.Up) {
      getElement("options-toggle-direction").textContent = "Moving Down";
    } else {
      getElement("options-toggle-direction").textContent = "Moving Up";
    }
  }

  // Makes buttons work
  private addListeners() {
    getElement("start-button").addEventListener("click", (e) => {
      this.show();
    });

    getElement("options-toggle-run").addEventListener("click", (e) => {
      if (this.scrolling) {
        this.stop();
      } else {
        this.start();
      }
    });

    getElement("options-toggle-direction").addEventListener("click", (e) => {
      this.reverseDirection();
    });

    getElement("options-exit").addEventListener("click", (e) => {
      this.hide();
    });

    getElement("options-speed-up").addEventListener("click", (e) => {
      this.config.speed += SPEED_INCREMENT;
    });

    getElement("options-speed-down").addEventListener("click", (e) => {
      this.config.speed -= SPEED_INCREMENT;
    });
  }

  // Applies the margin style to scroll the script
  public render(distance: number) {
    const lines = this.prompterLines as HTMLUListElement;
    lines.style.marginTop = `-${distance}px`;
  }

  // Changes an element's visibility
  private setDisplay(el: HTMLElement, show: boolean) {
    el.style.display = show ? "block" : "none";
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

  public getScript() {
    return (getElement("text-input") as HTMLTextAreaElement).value;
  }

  // Removes all existing lines from the script element
  private resetScript() {
    while (this.prompterLines.firstChild) {
      this.prompterLines.removeChild(this.prompterLines.firstChild);
    }
  }

  public loadScript(script: string) {
    this.resetScript();

    const prompterLines = getElement("prompter-lines");

    for (const line of script.split("\n")) {
      const listItem = document.createElement("li");
      listItem.textContent = line;
      prompterLines.appendChild(listItem);
    }
  }

  public calculateTextLength() {
    const styles = window.getComputedStyle(this.prompterLines);
    const height = (styles.height as string).replace("px", "");
    this.textLength = Number(height);
  }

  public start() {
    super.start();

    getElement("options-toggle-run").textContent = "Stop";
  }

  public stop() {
    super.stop();

    getElement("options-toggle-run").textContent = "Start";
  }
}
