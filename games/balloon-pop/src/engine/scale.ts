// used in rendering. could be used as a coordinate although you should use Position for that

export class Scale {
  public x: number;
  public y: number;

  constructor(x: number = 1, y: number = x) {
    this.x = x;
    this.y = y;
  }
}
