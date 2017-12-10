import { Nightlight } from "./game";
import { Task } from "./engine/task";

const game = new Nightlight();

// add in all of our assets
game.addAsset("player/idle");
game.addAsset("blocks/a");
game.addAsset("blocks/b");
game.addAsset("blocks/c");
game.addAsset("blocks/d");
game.addAsset("blocks/e");
game.addAsset("blocks/f");
game.addAsset("blocks/g");
game.addAsset("blocks/h");
game.addAsset("blocks/i");
game.addAsset("blocks/j");
game.addAsset("blocks/k");
game.addAsset("blocks/l");
game.addAsset("blocks/m");
game.addAsset("blocks/n");
game.addAsset("blocks/o");
game.addAsset("blocks/p");
game.addAsset("blocks/q");
// game.addAsset("blocks/r");
// game.addAsset("blocks/s");
// game.addAsset("blocks/t");
// game.addAsset("blocks/u");
// game.addAsset("blocks/v");
// game.addAsset("blocks/w");
// game.addAsset("blocks/x");
// game.addAsset("blocks/y");
// game.addAsset("blocks/z");

// wait for it to load then run our stuff
game.waitForAssets().then(run);

function run() {
  game.start();
}
