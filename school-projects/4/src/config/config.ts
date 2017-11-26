import { AbstractConfig } from "./abstract";
import { getElement } from "../utils";

export class Config extends AbstractConfig {
  private prompterElement = getElement("prompter-lines") as HTMLElement;
  private speedElement = getElement("options-current-speed") as HTMLElement;
  private textInputElement = getElement("text-input") as HTMLTextAreaElement;
  private fontSizeElement = getElement("options-font-size") as HTMLInputElement;
  private fontFamilyElement = getElement("options-font-family") as HTMLInputElement;
  private boldTextElement = getElement("options-bold-text") as HTMLInputElement;

  constructor() {
    super();
  }

  public get speed() {
    return Number(this.speedElement.textContent);
  }

  public set speed(speed) {
    this.speedElement.textContent = speed.toFixed(1);
  }

  public get fontSize() {
    return Number(this.fontSizeElement.value) || 75;
  }

  public set fontSize(fontSize) {
    this.fontSizeElement.value = fontSize.toString();
    this.prompterElement.style.fontSize = `${fontSize}px`;
  }

  public get fontFamily() {
    return this.fontFamilyElement.value || "sans-serif";
  }

  public set fontFamily(fontFamily) {
    this.fontFamilyElement.value = fontFamily;
    // set the font with sans-serif as a fallback
    this.prompterElement.style.fontFamily = `${fontFamily} sans-serif`;
  }

  public get boldText() {
    return this.boldTextElement.checked;
  }

  public set boldText(boldText) {
    this.boldTextElement.checked = boldText;
    this.prompterElement.style.fontWeight = boldText ? "bold" : "";
  }

  public get text() {
    return this.textInputElement.value;
  }

  public set text(text) {
    this.textInputElement.value = text;
  }
}
