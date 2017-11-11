import { Game } from "./engine/game";

import { BalloonSprite } from "./sprites/balloon";
import { Task } from "./engine/task";
import { Position } from "./engine/position";
import { Scale } from "./engine/scale";

const game = new Game();

(async function(){
  game.addAsset("balloon");

  await game.waitForAssets();

  run();
})();

function run(){
  (document.getElementById("start") as HTMLButtonElement).onclick = function(){
    (document.getElementById("start") as HTMLButtonElement).style.display = "none";
    game.start();
  };
}
