import { BalloonPopGame } from "./game";

import { BalloonSprite } from "./sprites/balloon";
import { Task } from "./engine/task";
import { Position } from "./engine/position";
import { Scale } from "./engine/scale";

const game = new BalloonPopGame();

// add in all of our assets
game.addAsset("balloon");

// wait for it to load then run our stuff
(async function () {
  await game.waitForAssets();
  run();
})();

function run() {
  (document.getElementById("start") as HTMLButtonElement).onclick = function () {
    (document.getElementById("start") as HTMLButtonElement).style.display = "none";
    game.start();
  };
}
