import { Vector } from "../engine/vector";

// This is how the original defines jump lights
// It does not use the level code
// (although I believe it at one point did due to the image name being "^.png", as if it were the ^ character)

// Converts Scratch coordinates to coordinates this game will understand
// Hardcodes values are bad but just ignore that
function coordinate(x: number, y: number) {
  return new Vector(x + 236, (360 - y) - 184);
}

export const JumpLights: Vector[][] = [
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  // in scratch: 10
  [
    coordinate(-168, -60),
    coordinate(-184, 20),
    coordinate(-168, 100),
    coordinate(-56, 36),
    coordinate(136, -132),
    coordinate(184, -76),
    coordinate(136, -20),
    coordinate(88, 20),
    coordinate(136, 76),
    coordinate(184, 116),
  ],

  // in scratch: 11
  [
    coordinate(-200, 116),
    coordinate(104, -52),
    coordinate(-120, -44),
    coordinate(-120, 36),
    coordinate(-200, -28),
  ],

  // in scratch: 12
  [
    coordinate(104, -28),
    coordinate(-80, -116),
  ],
  // in scratch: 13
  [
    coordinate(0, -44),
    coordinate(0, 20),
    coordinate(0, 84),
  ],
  [],
  [],
  // in scratch: 16
  [
    coordinate(-144, -60),
    coordinate(-144, 0),
    coordinate(-144, 60),
    coordinate(0, -44),
    coordinate(144, -60),
    coordinate(144, 0),
    coordinate(144, 60),
  ],
  [],
  [],
  // in scratch: 19
  [
    coordinate(0, -52),
    coordinate(104, 20),
    coordinate(176, -35),
  ]
  // none past this level
];
