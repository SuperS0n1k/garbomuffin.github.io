// Saves configs and whatever

const CONFIG_KEY = "easierprompter_Config";

export interface IStoredConfig {
  fontSize: number;
  boldText: boolean;

  lastPrompt: string;
}

export function save(config: IStoredConfig) {
  localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
}

export function load(defaults: IStoredConfig): IStoredConfig {
  const localData = localStorage.getItem(CONFIG_KEY);
  if (localData) {
    return JSON.parse(localData);
  } else {
    save(defaults);
    return defaults;
  }
}
