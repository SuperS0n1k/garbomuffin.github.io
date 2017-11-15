import { BalloonPopGame } from "./game";

import { Position } from "./engine/position";
import { Scale } from "./engine/scale";
import { TextSprite } from "./engine/sprites/textsprite";
import { Task } from "./engine/task";
import { BalloonSprite } from "./sprites/balloon";

const game = new BalloonPopGame();

// add in all of our assets
game.addAsset("balloon");

// wait for it to load then run our stuff
game.waitForAssets().then(run);

function run() {
  (document.getElementById("start") as HTMLButtonElement).onclick = () => {
    (document.getElementById("start") as HTMLButtonElement).style.display = "none";
    game.start();

    new TextSprite({
      text: "123",
      fontSize: 10,
      position: new Position(100, 100),
    });
  };
}
