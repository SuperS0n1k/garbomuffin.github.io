import { EasierPrompter } from "./prompter";

function getElement(id: string) {
  return document.getElementById(id) as HTMLElement;
}

const prompter = new EasierPrompter({
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
});

(getElement("start") as HTMLButtonElement).onclick = () => {
  prompter.showPrompt();
};

// debugging from the console
(window as any).prompter = prompter;
