import { SpaceInvaderGame } from "./game";

import { Position } from "./engine/position";
import { Scale } from "./engine/scale";
import { Task } from "./engine/task";

import { BulletSprite } from "./sprites/bullet";
import { RocketSprite } from "./sprites/rocket";

const game = new SpaceInvaderGame();

// add in all of our assets
game.addAsset("rocket");
game.addAsset("saucer");
game.addAsset("bullet");

// wait for it to load then run our stuff
game.waitForAssets().then(run);

function run() {
  (document.getElementById("start") as HTMLButtonElement).onclick = () => {
    (document.getElementById("start") as HTMLButtonElement).style.display = "none";
    game.start();
  };
}
