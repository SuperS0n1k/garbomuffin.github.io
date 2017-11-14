// used in rendering. could be used as a coordinate although you should use Position for that

export class Scale {
  constructor(x: number, y: number = x) {
    this.x = x;
    this.y = y;
  }

  public x: number;
  public y: number;
}
