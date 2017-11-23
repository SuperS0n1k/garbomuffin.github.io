import * as config from "./config";

interface IEasierPrompterOptions {
  buttons: IEasierPrompterButtons;
  optionsElements: IEasierPrompterConfigElements;

  inputElement: HTMLTextAreaElement;

  prompterContainer: HTMLElement;
  prompterLinesContainer: HTMLElement;
  prompterLinesElement: HTMLUListElement;
  configContainer: HTMLElement;

  defaultConfig: config.IStoredConfig;
}

interface IEasierPrompterButtons {
  startStop: HTMLButtonElement;
  reverse: HTMLButtonElement;
  speedUp: HTMLButtonElement;
  speedDown: HTMLButtonElement;
  edit: HTMLButtonElement;
}

interface IEasierPrompterConfigElements {
  fontSize: HTMLInputElement;
  boldText: HTMLInputElement;
  removeButtonFocus: HTMLInputElement;
}

enum RunningState {
  Running, Paused,
}

export class EasierPrompter implements IEasierPrompterOptions {
  public optionsElements: IEasierPrompterConfigElements;
  public buttons: IEasierPrompterButtons;
  public inputElement: HTMLTextAreaElement;
  public prompterContainer: HTMLElement;
  public prompterLinesContainer: HTMLElement;
  public prompterLinesElement: HTMLUListElement;
  public configContainer: HTMLElement;
  public defaultConfig: config.IStoredConfig;

  private _speed: number = 3;
  private direction: number = 1;
  private runningState: RunningState = RunningState.Paused;
  private currentOffset: number = 0;
  private isFocused: boolean = false;

  private textHeight: number;
  public config: config.IStoredConfig;

  constructor(options: IEasierPrompterOptions) {
    // use a terrible for loop to just load all of the options
    for (const property in options) {
      if ((options as any).hasOwnProperty(property)) {
        (this as any)[property] = (options as any)[property];
      }
    }

    this.loop = this.loop.bind(this);

    this.setupButtons();

    this.config = config.load(options.defaultConfig);
    this.loadConfig();

    this.loadEvents();
  }

  // IMPLEMENTATION SPECIFIC STUFF

  private setupButtons() {
    this.buttons.startStop.onclick = () => {
      this.togglePlayState();
    };

    this.buttons.reverse.onclick = () => {
      this.reverseDirection();
    };

    this.buttons.speedUp.onclick = () => {
      this.speed++;
    };

    this.buttons.speedDown.onclick = () => {
      this.speed--;
    };

    this.buttons.edit.onclick = () => {
      this.hidePrompt();
    };
  }

  private loadScript() {
    while (this.prompterLinesElement.firstChild) {
      this.prompterLinesElement.removeChild(this.prompterLinesElement.firstChild);
    }

    const input = this.inputElement.value;
    for (const line of input.split("\n")) {
      const el = document.createElement("li");
      el.textContent = line;
      this.prompterLinesElement.appendChild(el);
    }

    const computedHeight = getComputedStyle(this.prompterLinesElement).height as string;
    this.textHeight = Number(computedHeight.substring(0, computedHeight.length - 2));
  }

  private loadStyles() {
    this.config.fontSize = Number(this.optionsElements.fontSize.value);
    this.prompterLinesElement.style.fontSize = `${this.config.fontSize}px`;

    this.config.boldText = this.optionsElements.boldText.checked;
    this.prompterLinesElement.style.fontWeight = this.config.boldText ? "bold" : "";
  }

  // CORE

  private loadEvents() {
    document.addEventListener("keydown", (e) => {
      if (!this.isFocused) {
        return;
      }

      const keyCode = e.keyCode;

      switch (keyCode) {
        case 32: // space
          this.togglePlayState();
          break;

        case 38: // up
          this.speed++;
          break;

        case 40: // down
          this.speed--;
          break;

        case 27: // escape
          if (this.currentOffset === 0) {
            this.hidePrompt();
            break;
          }

          this.stop();
          this.currentOffset = 0;
          this.render();
          break;
      }
    });

    document.addEventListener("wheel", (e) => {
      if (!this.isFocused) {
        return;
      }

      this.currentOffset += e.deltaY;
      this.render();
    });
  }

  private loadConfig() {
    this.config = config.load(this.defaultConfig);

    // trigger the setter (which has side effects kill me)
    this.speed = this.speed;

    this.optionsElements.fontSize.value = this.config.fontSize.toString();
    this.optionsElements.boldText.checked = this.config.boldText;
    this.inputElement.value = this.config.lastPrompt;
    this.optionsElements.removeButtonFocus.checked = this.config.removeButtonFocus;

    for (const button of document.getElementsByTagName("button")) {
      button.addEventListener("click", (e) => {
        if (this.config.removeButtonFocus) {
          (e.srcElement as HTMLButtonElement).blur();
        }
      });
    }
  }

  private saveConfig() {
    config.save(this.config);
  }

  public showPrompt() {
    this.prompterContainer.style.display = "block";
    this.isFocused = true;
    this.loadStyles();
    this.loadScript();
    this.saveConfig();
  }

  private hidePrompt() {
    this.isFocused = false;
    this.prompterContainer.style.display = "none";
    this.stop();
  }

  private loop() {
    this.render();

    if (this.runningState !== RunningState.Paused) {
      requestAnimationFrame(this.loop);
    }
  }

  private render() {
    if (this.runningState === RunningState.Running) {
      this.currentOffset += this.speed * this.direction;

      if (this.currentOffset < 0) {
        this.currentOffset = 0;
      } else if (this.currentOffset > this.textHeight) {
        this.currentOffset = this.textHeight;
      }
    }

    this.prompterLinesElement.style.marginTop = `-${this.currentOffset}px`;
  }

  private start() {
    this.buttons.startStop.textContent = "Pause";

    this.runningState = RunningState.Running;

    this.loop();
  }

  private stop() {
    this.runningState = RunningState.Paused;
    this.buttons.startStop.textContent = "Start";
  }

  // BUTTONS

  private togglePlayState() {
    if (this.runningState === RunningState.Paused) {
      this.start();
    } else if (this.runningState === RunningState.Running) {
      this.stop();
    }
  }

  private reverseDirection() {
    this.direction = -this.direction;
    if (this.direction === 1) {
      this.buttons.reverse.textContent = "Moving Down";
    } else {
      this.buttons.reverse.textContent = "Moving Up";
    }
  }

  // GETTERS AND SETTERS
  private get speed() {
    return this._speed;
  }

  private set speed(speed) {
    if (speed < 0) {
      this._speed = 0;
    } else {
      this._speed = speed;
      (document.getElementById("options-current-speed") as HTMLElement).textContent = speed.toString();
    }
  }
}
