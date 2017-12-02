import { ConfigManager } from "./config";
import { ConfigOption } from "./option";

// increase every time an incompatible change is made to the store data
const STORE_VERSION = "0";

// hopefully this is specific enough lol
const STORAGE_KEY = `easierPrompter${STORE_VERSION}_configStore`;

export class Save {
  private static getOptions() {
    const localConfig = localStorage.getItem(STORAGE_KEY);
    if (localConfig === null) {
      return {};
    } else {
      return JSON.parse(localConfig);
    }
  }

  private static generateSaveData(config: ConfigManager) {
    const res: {[s: string]: ConfigOption} = {};

    for (const key of Object.keys(config.options)) {
      const value = config.options[key];
      res[key] = value.get();
    }

    return res;
  }

  private static reset() {
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
  }

  public static save(config: ConfigManager) {
    const data = Save.generateSaveData(config);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  public static load(config: ConfigManager) {
    const options = Save.getOptions();
    for (const key of Object.keys(options)) {
      const value = options[key];
      config.options[key].set(value);
    }
  }

  public static promptReset() {
    const message = [
      "Are yousure you want to reset the settings?",
      "This will reset your script, the config, and reload the page",
    ];
    if (confirm(message.join("\n\n"))) {
      Save.reset();
    }
  }
}
