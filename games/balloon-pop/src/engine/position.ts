// a simple position class that removes some verbosity from code
// can make for some nicer code sometimes

export class Position {
  constructor(x: number, y: number, z: number = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  public x: number;
  public y: number;
  public z?: number;
}
