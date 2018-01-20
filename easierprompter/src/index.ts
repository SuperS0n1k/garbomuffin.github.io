import "./email";
import "./polyfill";
import "./sw";

import { PrompterConfigManager } from "./config/prompterconfig";
import { Prompter } from "./prompter/prompter";
import { getElement } from "./utils";

const config = new PrompterConfigManager();
config.load();
config.save();

getElement("save-button").onclick = () => config.save();
getElement("reset-button").onclick = () => config.promptReset();

const prompter = new Prompter(config);

window.onbeforeunload = (e) => {
  if (config.options.unsavedChangesWarning.get() && prompter.config.hasChanged()) {
    // Browsers such as Chrome have stopped showing the text here and instead some predetermined message
    // That's fine and this will work for other browsers.
    const text = [
      "You have unsaved changes to your config!",
      "If you leave these changes will be reset!",
      "(disable this warning by unchecking \"Unsaved changes warning\"",
    ].join("\n");
    e.returnValue = text;
    return text;
  }
};
