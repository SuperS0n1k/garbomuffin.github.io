import { Prompter } from "./prompter/prompter";
import { getElement } from "./utils";
import { PrompterConfigManager } from "./config/prompterconfig";

import "./polyfill";
import "./email";
import "./sw";

const config = new PrompterConfigManager();
config.load();
config.save();

getElement("save-button").onclick = () => config.save();
getElement("reset-button").onclick = () => config.promptReset();

const prompter = new Prompter(config);
