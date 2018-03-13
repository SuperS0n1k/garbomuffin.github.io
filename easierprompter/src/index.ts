import "./email";
import "./polyfill";
import "./sw";

import { ConfigManager } from "./config/config";
import { PrompterConfigManager } from "./config/prompterconfig";
import { Prompter } from "./prompter/prompter";
import { ReillyPrompter } from "./prompter/reilly";
import { getElement } from "./utils";

function getConfig() {
  return new PrompterConfigManager();
}

function getPrompter(config: ConfigManager) {
  if (location.search === "?reilly") {
    return new ReillyPrompter(config);
  } else {
    return new Prompter(config);
  }
}

const config = getConfig();
config.load();
config.save();

getElement("save-button").onclick = () => config.save();
getElement("reset-button").onclick = () => config.promptReset();

const prompter = getPrompter(config);

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
