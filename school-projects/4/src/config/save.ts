import { ConfigManager } from "./config";
import { ConfigOption } from "./option";

// increase every time an incompatible change is made to the store data
const STORE_VERSION = "0";

// hopefully this is specific enough lol
const STORAGE_KEY = `easierPrompter${STORE_VERSION}_configStore`;

export class ConfigSaver {
  private config: ConfigManager;

  constructor(config: ConfigManager) {
    this.config = config;
  }

  private getOptions() {
    const localConfig = localStorage.getItem(STORAGE_KEY);
    if (localConfig === null) {
      return {};
    } else {
      return JSON.parse(localConfig);
    }
  }

  private generateSaveData() {
    const res: {[s: string]: ConfigOption} = {};

    for (const key of Object.keys(this.config.options)) {
      const value = this.config.options[key];
      res[key] = value.get();
    }

    return res;
  }

  public reset() {
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
  }

  public save() {
    const data = this.generateSaveData();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  public load() {
    const options = this.getOptions();
    for (const key of Object.keys(options)) {
      const value = options[key];
      const configOption = this.config.options[key];
      if (typeof configOption === "undefined") {
        console.warn("unknown item in save:", key, value);
        continue;
      }
      this.config.options[key].set(value);
    }
  }
}
