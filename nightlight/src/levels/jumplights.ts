import { Vector } from "../engine/vector";

// This is how the original defines jump lights
// It does not use the level code
// (although I believe it at one point did due to the image name being "^.png", as if it were the ^ character in level codes)

// Converts Scratch coordinates to coordinates this game will understand
// Hardcoded values are bad but just ignore that
function scratchCoordinate(x: number, y: number) {
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
    scratchCoordinate(-168, -60),
    scratchCoordinate(-184, 20),
    scratchCoordinate(-168, 100),
    scratchCoordinate(-56, 36),
    scratchCoordinate(136, -132),
    scratchCoordinate(184, -76),
    scratchCoordinate(136, -20),
    scratchCoordinate(88, 20),
    scratchCoordinate(136, 76),
    scratchCoordinate(184, 116),
  ],

  // in scratch: 11
  [
    scratchCoordinate(-200, 116),
    scratchCoordinate(104, -52),
    scratchCoordinate(-120, -44),
    scratchCoordinate(-120, 36),
    scratchCoordinate(-200, -28),
  ],

  // in scratch: 12
  [
    scratchCoordinate(104, -28),
    scratchCoordinate(-80, -116),
  ],
  // in scratch: 13
  [
    scratchCoordinate(0, -44),
    scratchCoordinate(0, 20),
    scratchCoordinate(0, 84),
  ],
  [],
  [],
  // in scratch: 16
  [
    scratchCoordinate(-144, -60),
    scratchCoordinate(-144, 0),
    scratchCoordinate(-144, 60),
    scratchCoordinate(0, -44),
    scratchCoordinate(144, -60),
    scratchCoordinate(144, 0),
    scratchCoordinate(144, 60),
  ],
  [],
  [],
  // in scratch: 19
  [
    scratchCoordinate(0, -52),
    scratchCoordinate(104, 20),
    scratchCoordinate(176, -35),
  ]
  // none past this level
];
