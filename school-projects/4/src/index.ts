import { Config } from "./config/config";
import { Prompter } from "./prompter/prompter";
import { getElement } from "./utils";

const config = new Config();
config.load();

const prompter = new Prompter(config);

(window as any).config = config;
(window as any).prompter = prompter;
