import { ConfigOption } from "./option";
import { ConfigSaver } from "./save";

interface Config {
  [s: string]: ConfigOption;
}

const STORAGE_KEY = "EasierPrompter_Config";

// TODO: saving & loading
export class ConfigManager {
  public options: Config = {};
  private configSaver: ConfigSaver = new ConfigSaver(this);

  get speed() {
    return this.options.speed.get();
  }

  set speed(value) {
    this.options.speed.set(value);
  }

  public save() {
    this.configSaver.save();
  }

  public load() {
    this.configSaver.load();
  }
}
