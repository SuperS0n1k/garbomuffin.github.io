// constants
const HEIGHT = 360;
const WIDTH = 480;
const FRICTION = 0.5;
const GRAVITY = 0.3;
const JUMP = 7;
const CLOUD_JUMP = 1.5 * JUMP;
const RUN_SPEED = 3;
const PLAYER_HEIGHT = 16;
const PLAYER_WIDTH = 8;
const BLOCK_HEIGHT = 16;
const BLOCK_WIDTH = BLOCK_HEIGHT;
const CONTROLS = [38, 32, 87, 39, 68, 37, 65];
const DEGREE = Math.PI / 180;
const DIR_RIGHT = 1;
const DIR_LEFT = -1;
const LOADED_ASSETS = {};
const LEVEL_LENGTH = 30;
const LEVEL_HEIGHT = 23;
const FIRE_SUIT = 1;
const WIND_SUIT = 2;
const HAMMER_SUIT = 3;
const MAX_PROJECTILES = 2;
const FIREBALL_HEIGHT = 8;
const FIREBALL_WIDTH = 8;
const ICE_DELAY = 250;
const HAMMER_HEIGHT = FIREBALL_HEIGHT;
const HAMMER_WIDTH = FIREBALL_WIDTH;
const PROJECTILE_DELAY = 100; // in ms
const FIREBALL_ROTATION = 0.1;
const FIREBALL_SPEED = 3;
const FIREBALL_VELOCITY = 3;
const FIREBALL_GRAVITY = GRAVITY / 2;
const HAMMER_ROTATION = FIREBALL_ROTATION;
const PROJECTILE_SUITS = [
  FIRE_SUIT, HAMMER_SUIT
];
const SUIT_NAMES = [
  "default", "fire", "air", "hammer",
];
const RUNNING_ANIMATION_LENGTH = 3; // in frames
const RUNNING_FRAMES = [
  "run1",
  "run2",
  "run3",
  "run4",
];
var totalAssets = ASSETS.length;
var loadedAssets = 0;

// get the canvas ready
var canvas = document.getElementById("canvas");
var platformCanvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.height = HEIGHT;
canvas.width = WIDTH;

var gradientCanvas = document.createElement("canvas");
var gradientCtx = gradientCanvas.getContext("2d");
gradientCanvas.width = canvas.width;
gradientCanvas.height = canvas.height;

var gradient = ctx.createLinearGradient(WIDTH / 2, 0, WIDTH / 2, HEIGHT);
gradient.addColorStop(0, "#00CCCC");
gradient.addColorStop(1, "#006666");
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, WIDTH, HEIGHT);

// setup variables
var keys = [];
// var state = ;
var state = play;
var last;
var level = 0;
var frames = 0;
var last60 = Date.now();
var loaded = false;
var iceInterval = null;
// sprites
var player;
var graphic;
var suitGraphic;
// containers
var containers = [];
sprites = new Container();
animated = new Container();
tickable = new Container();
fireballs = new Container();
hammers = new Container();
ice = new Container();
// because it deletes and recreates the player sprite it can't store this stuff in there
var currentSuit = 0;
var unlockedSuits = 0;

/**
 * The main game loop that keeps everything running.
 */
function loop(){
  try{
    ++frames;
    var now = Date.now();
    if (frames % 60 === 0){
      frames = 0;
      fps.innerHTML = `Approx FPS: ${60 / (now - last60) * 1000}`;
      last60 = now;
    }
    var diff = (now - last) / 1000;

    state(diff);
    render();

    last = now;
    requestAnimationFrame(loop);
  }catch(e){
    console.error(e);
    document.getElementById("outputHolder").style.cssText += ';display:block !important;';
    document.getElementById("output").innerText = `The game crashed with the following errorm essage: "${e.toString()}"`;
  }
}

/**
 * Start the game!
 */
function start(){
  var progress = document.getElementById("progress");
  progress.parentNode.parentNode.removeChild(progress.parentNode);
  loaded = true;
  renderLevel();
  requestAnimationFrame(loop);
}

/**
 * Reset the game
 */
function reset(){
  // delete all containers
  for (let container of containers){
    container.delete();
  }
  // recreate sprites and containers
  sprites = new Container();
  animated = new Container();
  tickable = new Container();
  fireballs = new Container();
  hammers = new Container();
  ice = new Container();
  player = new Sprite({
    texture: "player/hitbox.png",
    x: 0,
    y: HEIGHT - 1,
    width: PLAYER_WIDTH,
    height: PLAYER_HEIGHT,
    tick: playerUpdate,
    visible: false,
    solid: false,
  });
  graphic = new Sprite({
    texture: "player/still.png",
    x: player.x,
    y: player.y,
    width: player.width,
    height: player.height,
    solid: false,
    render: showPlayer,
  });
  suitGraphic = new Sprite({
    texture: "player/suits/fire/still.png",
    x: player.x,
    y: player.y,
    width: player.width,
    height: player.height,
    solid: false,
    visible: false,
    render: showSuit,
  });
  player.xv = 0;
  player.yv = 0;
  player.jumping = false;
  player.dir = DIR_RIGHT;
  player.suit = 0;
  player.run = 0;
  player.moving = false;
  player.frame = 0;
  player.projectiles = 0;
  player.lastProjectile = 0;
  clearInterval(iceInterval);
  iceInterval = null;
}

/**
 * Ticks all sprites
 * @param {any} diff
 */
function play(diff){
  for (let sprite of tickable){
    sprite.tick.call(sprite, diff);
  }
}

/**
 * Render the sprites.
 */
function render(){
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(gradientCanvas, 0, 0);
  for (let sprite of sprites){
    sprite.render.call(sprite);
  }
}

/**
 * Render the current level
 */
function renderLevel(){
  var rendering = LEVELS[level];
  reset();
  var levelHeight = rendering.length;
  for (let y = 0; y < levelHeight; y++){
    var xStrip = rendering[y];
    var xLength = xStrip.length;
    var lastChar = " ";
    for (let x = 0; x < xLength; x++){
      var char = xStrip.charAt(x);
      if (char === " "){
        // space is air, so do nothing
        continue;
      }
      // . fills the rest of the row with the previous texture
      if (char === "."){
        char = lastChar;
        xStrip += ".";
        if (xLength < LEVEL_LENGTH) xLength += 1;
      }else{
        lastChar = char;
      }
      var meta = TILES[char.toUpperCase()];
      var texture = meta.texture;
      var xPos = x * BLOCK_WIDTH;
      var yPos = HEIGHT - (y + 1) * BLOCK_HEIGHT;
      var tick = meta.tick;
      var animation = meta.animation;
      var solid = meta.solid;
      var type = meta.type;
      new Sprite({
        texture: texture,
        x: xPos,
        y: yPos,
        width: BLOCK_WIDTH,
        height: BLOCK_HEIGHT,
        tick: tick,
        animation: animation,
        solid: solid,
        type: type,
      });
    }
  }
  resetPlayer.call(player);
}

// load the assets
for (let asset of ASSETS){
  load(asset);
}

// once they're all loaded start the damn thing!
var loadInterval = setInterval(function(){
  if (totalAssets === loadedAssets &&
      typeof LEVELS !== "undefined" &&
      typeof TILES !== "undefined" &&
      typeof Sprite !== "undefined" &&
      typeof boxesIntersect !== "undefined" &&
      typeof Container !== "undefined"){
    clearInterval(loadInterval);
    start();
  }
}, 1);

// key detection
document.addEventListener("keydown", function(e){
  var code = e.keyCode;
  keys[code] = true;
  if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1){ // disable arrow and space scrolling
    e.preventDefault();
  }
});
document.addEventListener("keyup", function(e){
  keys[e.keyCode] = false;
});

