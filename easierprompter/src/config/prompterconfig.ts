import { ConfigManager } from "./config";
import { ConfigOption } from "./option";
import { getElement } from "../utils";

export class PrompterConfigManager extends ConfigManager {
  constructor() {
    super();

    const prompterElement = getElement("prompter-lines-container");

    this.options.speed = new ConfigOption<number>({
      default: 1.5,
      el: getElement("options-current-speed"),
      type: "number",
      setterOpts: {
        transform: (value: number) => {
          if (value < 0) {
            value = 0;
          }
          return value.toFixed(2);
        },
      },
    });

    this.options.fontSize = new ConfigOption<number>({
      default: 75,
      el: getElement("options-font-size"),
      type: "number",
      setterOpts: {
        onchange: true,
        callback: (value: number) => {
          prompterElement.style.fontSize = `${value}px`;
        },
      },
    });

    this.options.fontFamily = new ConfigOption<string>({
      default: "sans-serif",
      el: getElement("options-font-family"),
      type: "text",
      setterOpts: {
        onchange: true,
        callback: (value: string) => {
          prompterElement.style.fontFamily = `${value}, sans-serif`;
        },
      },
    });

    this.options.boldText = new ConfigOption<boolean>({
      default: true,
      el: getElement("options-bold-text"),
      type: "checkbox",
      setterOpts: {
        onchange: true,
        callback: (value: boolean) => {
          prompterElement.style.fontWeight = value ? "bold" : "normal";
        },
      },
    });

    this.options.unsavedChangesWarning = new ConfigOption<boolean>({
      default: false,
      el: getElement("options-unsaved-changes-warning"),
      type: "checkbox",
    });

    this.options.endText = new ConfigOption<string>({
      default: "[END]",
      el: getElement("options-end-text"),
      type: "text",
    });

    this.options.text = new ConfigOption<string>({
      default: "Enter your script here!",
      el: getElement("text-input"),
      type: "text",
    });
  }
}
