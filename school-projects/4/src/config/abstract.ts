export abstract class AbstractConfig {
  private static readonly STORAGE_KEY = "EasierPrompter_Config";

  public abstract speed: number;
  public abstract fontSize: number;
  public abstract fontFamily: string;
  public abstract boldText: boolean;
  public abstract text: string;

  private generateJSON() {
    return JSON.stringify({
      speed: this.speed,
      fontSize: this.fontSize,
      fontFamily: this.fontFamily,
      boldText: this.boldText,
      text: this.text,
    });
  }

  public save() {
    localStorage.setItem(AbstractConfig.STORAGE_KEY, this.generateJSON());

    return this;
  }

  public load() {
    const storage = localStorage.getItem(AbstractConfig.STORAGE_KEY);

    if (storage !== null) {
      try {
        const data: any = JSON.parse(storage);

        for (const key of Object.keys(data)) {
          const value = data[key];
          (this as any)[key] = value;
        }
      } catch (e) {
        // invalid json, save the current one and abort
        alert("Stored config invalid. Ignoring.");
      }
    }

    return this;
  }
}
