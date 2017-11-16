// a simple position class that removes some verbosity from code
// can make for some nicer code sometimes

export class Position {
  public x: number;
  public y: number;
  public z?: number;

  constructor(x: number | Position = 0, y: number = 0, z: number = 0) {
    if (typeof x === "object"){
      this.x = x.x;
      this.y = x.y;
      this.z = x.z;
    }else{
      this.x = x;
      this.y = y;
      this.z = z;
    }
  }
}
