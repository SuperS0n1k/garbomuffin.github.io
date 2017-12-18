/*
 * A 3D Vector: (x, y, z)
 *
 * z is optional when creating Vectors
 */

import { Vector2D } from "./vector2d";

// a simple position class that removes some verbosity from code
// can make for some nicer code sometimes

export class Vector extends Vector2D {
  public z: number;

  constructor(x: number | Vector = 0, y: number = 0, z: number = 0) {
    super(x, y);

    if (typeof x === "object") {
      this.z = x.z;
    } else {
      this.z = z;
    }
  }
}
