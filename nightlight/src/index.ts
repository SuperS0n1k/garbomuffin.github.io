import { Nightlight } from "./game/game";
import { NightlightLevelEditor } from "./editor/editor";
import { GameRuntime } from "./engine/runtime";

/*
 * The loader.
 *
 * It creates the game object, adds in assets, and starts the game.
 */

function getRuntime(): GameRuntime {
  if (location.search === "?leveleditor") {
    return new NightlightLevelEditor();
  } else {
    return new Nightlight();
  }
}

const game = getRuntime();

// later made visibile in run()
game.canvas.style.display = "none";

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

game.addImage("text/a");
game.addImage("text/b");
game.addImage("text/c");
game.addImage("text/d");
game.addImage("text/e");
game.addImage("text/f");
game.addImage("text/g");
game.addImage("text/h");
game.addImage("text/i");
game.addImage("text/j");
game.addImage("text/k");
game.addImage("text/l");
game.addImage("text/m");
game.addImage("text/n");
game.addImage("text/o");
game.addImage("text/p");
game.addImage("text/q");
game.addImage("text/r");
game.addImage("text/s");
game.addImage("text/t");
game.addImage("text/u");
game.addImage("text/v");
game.addImage("text/w");
game.addImage("text/x");
game.addImage("text/y");
game.addImage("text/z");
game.addImage("text/0");
game.addImage("text/1");
game.addImage("text/2");
game.addImage("text/3");
game.addImage("text/4");
game.addImage("text/5");
game.addImage("text/6");
game.addImage("text/7");
game.addImage("text/8");
game.addImage("text/9");
game.addImage("text/period");
game.addImage("text/,");
game.addImage("text/!");
game.addImage("text/singlequote");
game.addImage("text/colon");

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
game.addImage("boss/noss/dust");

//
// Castle
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

// ending
game.addImage("end/scene");
game.addImage("thumb");

// pause
game.addImage("pause");

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
game.addSound("player/jump");

// boss
game.addSound("boss/ouch");
game.addSound("boss/sword/rumble");
game.addSound("boss/noss/shadow1");
game.addSound("boss/noss/shadow2");
game.addSound("boss/noss/shadow3");
game.addSound("boss/noss/shadow4");
game.addSound("boss/shadow5");

// background music
game.addSound("music/exploration");
game.addSound("music/netherslament");
game.addSound("music/boss/1");
game.addSound("music/boss/2");
game.addSound("music/blackroad/1");
game.addSound("music/blackroad/2");
game.addSound("music/finalboss/1");
game.addSound("music/finalboss/2");

// html elements
const progressBar = document.getElementById("progress-bar") as HTMLProgressElement;

const menuContainer = document.getElementById("menu-container")!;

const loadingScreen = document.getElementById("loading-screen")!;
const menuBackground = document.getElementById("menu-background")!;

const menuScreen = document.getElementById("menu-screen")!;
const playButton = document.getElementById("play-button") as HTMLButtonElement;
const loadCodeButton = document.getElementById("load-code-button") as HTMLButtonElement;

// wait for it to load then run our stuff
game.waitForAssets((progress) => {
  // show a progress bar
  // with the addition of sounds it can take a long time to download stuff and it was inevitable
  const value = progress * 100;
  progressBar.style.width = value + "%";
}).then(() => canPlay());

function canPlay() {
  if (game instanceof Nightlight) {
    playButton.onclick = () => run();
    loadCodeButton.onclick = () => {
      const code = prompt("Please enter the level code:");
      if (code === null) {
        return;
      }
      const res = game.readLevelCode(code);
      if (res === null) {
        alert("Invalid level code");
        return;
      }
      game.level = res;
      run();
    };
    menuBackground.classList.add("active");
    loadingScreen.style.display = "none";
    menuScreen.style.display = "block";

    if (location.search === "?run") {
      run();
    }
  } else {
    run();
  }
}

function run() {
  menuContainer.style.display = "none";
  game.canvas.style.display = "";
  game.start();
}
