import { ConfigManager } from "./config/config";
import { Prompter } from "./prompter/prompter";
import { getElement } from "./utils";
import { ConfigOption } from "./config/option";
import { Keyboard } from "./keyboard/keyboard";

const prompterElement = getElement("prompter-lines");
const config = new ConfigManager();

config.options.speed = new ConfigOption<number>({
  default: 1.5,
  el: getElement("options-current-speed"),
  type: "number",
  setterOpts: {
    transform: (value: number) => value.toFixed(1),
  },
});

config.options.fontSize = new ConfigOption<number>({
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

config.options.fontFamily = new ConfigOption<string>({
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

config.options.boldText = new ConfigOption<boolean>({
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

config.options.text = new ConfigOption<string>({
  default: "Enter your script here!",
  el: getElement("text-input"),
  type: "text",
});

config.load();
config.save();

getElement("save-button").onclick = () => config.save();
getElement("reset-button").onclick = () => config.promptReset();

const prompter = new Prompter(config);
