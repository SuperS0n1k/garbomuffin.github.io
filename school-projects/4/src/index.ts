import { EasierPrompter } from "./prompter";
import * as config from "./config";

function getElement(id: string) {
  return document.getElementById(id) as HTMLElement;
}

const defaultConfig = {
  fontSize: 75,
  boldText: true,
  lastPrompt: "Enter your script here!",
  removeButtonFocus: true,
};

const prompter = new EasierPrompter({
  optionsElements: {
    fontSize: getElement("options-font-size") as HTMLInputElement,
    boldText: getElement("options-bold") as HTMLInputElement,
    removeButtonFocus: getElement("options-remove-focus") as HTMLInputElement,
  },

  buttons: {
    startStop: getElement("prompter-start-stop") as HTMLButtonElement,
    reverse: getElement("prompter-reverse") as HTMLButtonElement,
    speedUp: getElement("prompter-speed-up") as HTMLButtonElement,
    speedDown: getElement("prompter-speed-down") as HTMLButtonElement,
    edit: getElement("prompter-edit") as HTMLButtonElement,
  },

  inputElement: getElement("input") as HTMLTextAreaElement,

  prompterContainer: getElement("prompter"),
  prompterLinesContainer: getElement("prompter-lines-container"),
  prompterLinesElement: getElement("prompter-lines") as HTMLUListElement,

  configContainer: getElement("config"),
  defaultConfig,
});

(getElement("start") as HTMLButtonElement).onclick = () => {
  prompter.showPrompt();
};

(getElement("options-reset") as HTMLButtonElement).onclick = () => {
  if (confirm("Are you sure?")) {
    config.save(defaultConfig);
    location.reload();
  }
};

// debugging from the console
(window as any).prompter = prompter;
