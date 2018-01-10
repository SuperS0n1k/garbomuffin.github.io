/*
 * The loader.
 *
 * It creates the game object, adds in assets, and starts the game.
 */

import { Nightlight } from "./game";
import { Task } from "./engine/task";

const game = new Nightlight();

// add in all of our assets

//
// Pre sword and core
//
game.addImage("player/idle");
game.addImage("player/up");
game.addImage("player/down");
game.addImage("player/walk1");
game.addImage("player/walk2");
game.addImage("player/walk3");
game.addImage("player/walk4");

game.addImage("fragments/1");
game.addImage("fragments/2");
game.addImage("fragments/3");
game.addImage("fragments/4");
game.addImage("fragments/5");

game.addImage("coin/1");
game.addImage("coin/2");
game.addImage("coin/3");
game.addImage("coin/4");

game.addImage("blocks/a");
game.addImage("blocks/b");
game.addImage("blocks/c");
game.addImage("blocks/d");
game.addImage("blocks/e");
game.addImage("blocks/f");
game.addImage("blocks/g");
game.addImage("blocks/h");
game.addImage("blocks/i");
game.addImage("blocks/j");
game.addImage("blocks/k");
game.addImage("blocks/l");
game.addImage("blocks/m");
game.addImage("blocks/n");
game.addImage("blocks/p");
game.addImage("blocks/q");
game.addImage("blocks/r");
game.addImage("blocks/s");
game.addImage("blocks/u");
game.addImage("blocks/u2");
game.addImage("blocks/v");
game.addImage("blocks/w");
game.addImage("blocks/y");
game.addImage("blocks/z");

game.addImage("blocks/crumble/1");
game.addImage("blocks/crumble/2");
game.addImage("blocks/crumble/3");
game.addImage("blocks/crumble/4");
game.addImage("blocks/crumble/5");
game.addImage("blocks/crumble/6");
game.addImage("blocks/crumble/7");
game.addImage("blocks/crumble/8");
game.addImage("blocks/crumble/9");

game.addImage("blocks/button/red");
game.addImage("blocks/button/on");

game.addImage("blocks/spikes/up");
game.addImage("blocks/spikes/down");
game.addImage("blocks/spikes/left");
game.addImage("blocks/spikes/right");

game.addImage("boss/sword/sword");
game.addImage("boss/sword/open");
game.addImage("boss/sword/heal");
game.addImage("boss/sword/hurt");

game.addImage("hit/-1");
game.addImage("hit/+1");
game.addImage("hit/+0");

//
// Post sword
//

game.addImage("blocks/1");
game.addImage("blocks/2");
game.addImage("blocks/3");
game.addImage("blocks/4");
game.addImage("blocks/5");
game.addImage("blocks/6");
game.addImage("blocks/7");
game.addImage("blocks/8");
game.addImage("blocks/9");
game.addImage("blocks/!");

game.addImage("blocks/lightbutton/1");
game.addImage("blocks/lightbutton/2");
game.addImage("blocks/lightbutton/down");

game.addImage("jumplight");

// Noss
game.addImage("boss/noss/noss");
game.addImage("boss/noss/hit");
game.addImage("boss/noss/rest");
game.addImage("boss/noss/bullet");

//
// Post second boss / Castle
//

game.addImage("brick");
game.addImage("blocks/caret");
game.addImage("blocks/ampersand");
game.addImage("blocks/asterisk"); // IT WOULDN'T LET ME SAVE IT OTHERWISE
game.addImage("blocks/(");
game.addImage("blocks/)");
game.addImage("blocks/-");
game.addImage("blocks/underscore");
game.addImage("blocks/=");
game.addImage("blocks/+");
game.addImage("blocks/grave");

game.addImage("blocks/castlecorner/topright");
game.addImage("blocks/castlecorner/topleft");
game.addImage("blocks/castlecorner/bottomright");
game.addImage("blocks/castlecorner/bottomleft");

//
// Sounds
//

game.addSound("blocks/coin");
game.addSound("blocks/break");
game.addSound("blocks/fall");
game.addSound("blocks/smash");
game.addSound("blocks/button");
game.addSound("blocks/fds");

game.addSound("player/death");
game.addSound("player/ding");
game.addSound("player/jump1");
game.addSound("player/jump2");

// background music
game.addSound("music/exploration");
game.addSound("music/netherslament");
game.addSound("music/boss/1");
game.addSound("music/boss/2");
game.addSound("music/blackroad/1");
game.addSound("music/blackroad/2");
game.addSound("music/finalboss/1");
game.addSound("music/finalboss/2");

// wait for it to load then run our stuff
const progressElement = document.getElementById("progress") as HTMLProgressElement;
game.waitForAssets((progress) => {
  // show a progress bar
  // with the addition of sounds it can take a long time to download stuff and it was inevitable
  progressElement.value = progress;
}).then(run);

function run() {
  progressElement.style.display = "none";
  game.start();
}
