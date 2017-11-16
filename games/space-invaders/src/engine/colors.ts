import { decimalToHex } from "./utils";

// TODO: implement
// should support inputting individual r, g, b colors
// inputting a hex code like #ABCDEF
// inputting a color name like black

export class Color {
  public red: number;
  public green: number;
  public blue: number;

  constructor(r: number, g: number, b: number) {
    this.red = r;
    this.green = g;
    this.blue = b;
  }
}
