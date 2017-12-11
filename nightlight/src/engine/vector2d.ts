export class Vector2D {
  public x: number;
  public y: number;

  constructor(x: number | Vector2D = 0, y: number = 0) {
    if (typeof x === "object") {
      this.x = x.x;
      this.y = x.y;
    } else {
      this.x = x;
      this.y = y;
    }
  }
}
