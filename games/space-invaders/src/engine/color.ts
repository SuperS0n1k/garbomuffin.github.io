import { toHex } from "./utils";

// TODO: implement
// should support inputting individual r, g, b colors
// inputting a hex code like #ABCDEF
// inputting a color name like black

export abstract class Color {
  public abstract toString(): string;
}

export class RGBColor {
  public red: number;
  public green: number;
  public blue: number;

  constructor(r: number = 0, g: number = 0, b: number = 0) {
    this.red = r;
    this.green = g;
    this.blue = b;
  }

  public toString() {
    return `#${toHex(this.red)}${toHex(this.green)}${toHex(this.red)}`;
  }
}

export class NamedColor {
  private color: string;

  constructor(color: string) {
    this.color = color;
  }

  public toString() {
    return this.color;
  }
}
