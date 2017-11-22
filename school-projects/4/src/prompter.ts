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

  private speed: number = 3;
  private direction: number = 1;
  private runningState: RunningState = RunningState.Paused;
  private currentOffset: number = 0;

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

  private loadConfig() {
    this.config = config.load(this.defaultConfig);
    this.optionsElements.fontSize.value = this.config.fontSize.toString();
    this.optionsElements.boldText.checked = this.config.boldText;
    this.inputElement.value = this.config.lastPrompt;
  }

  private saveConfig() {
    config.save(this.config);
  }

  public showPrompt() {
    this.prompterContainer.style.display = "block";
    this.loadStyles();
    this.loadScript();
    this.saveConfig();
  }

  private hidePrompt() {
    this.prompterContainer.style.display = "none";
    this.stop();
  }

  private loop() {
    if (this.runningState === RunningState.Running) {
      this.currentOffset += this.speed * this.direction;

      if (this.currentOffset < 0) {
        this.currentOffset = 0;
      } else if (this.currentOffset > this.textHeight) {
        this.currentOffset = this.textHeight;
      }

      this.prompterLinesElement.style.marginTop = `-${this.currentOffset}px`;
    }

    if (this.runningState !== RunningState.Paused) {
      requestAnimationFrame(this.loop);
    }
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
}
