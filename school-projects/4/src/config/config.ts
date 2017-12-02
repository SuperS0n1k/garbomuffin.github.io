import { ConfigOption } from "./option";

interface Config {
  [s: string]: ConfigOption;
}

const STORAGE_KEY = "EasierPrompter_Config";

// TODO: saving & loading
export class ConfigManager {
  public options: Config = {};

  get speed() {
    return this.options.speed.get();
  }

  set speed(value) {
    this.options.speed.set(value);
  }
}
