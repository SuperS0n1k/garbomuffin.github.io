// aliases
const Container = PIXI.Container;
const autoDetectRenderer = PIXI.autoDetectRenderer;
const CanvasRenderer = PIXI.CanvasRenderer;
const loader = PIXI.loader;
const resources = PIXI.loader.resources;
const Sprite = PIXI.Sprite;
const TextureCache = PIXI.utils.TextureCache;
const Graphics = PIXI.Graphics;
const Point = PIXI.Point;
const Text = PIXI.Text;
const BaseTexture = PIXI.BaseTexture;
const Texture = PIXI.Texture;

// constants, a lot of them
const HEIGHT = 360;
const WIDTH = 480;
const GRAVITY = 0.95 / 5;
const WALK_SPEED = 3 / 2;
const FRICTION = 0.5;
const VOLUME = 0.5;
const TOTAL_SUITS = 3;
const ICE_LIFE_SPAN = 250; // in ms
const LEVEL_HEIGHT = 23;
const LEVEL_WIDTH = 30;
const BLOCK_HEIGHT = 16;
const BLOCK_WIDTH = BLOCK_HEIGHT;
const STARTING_X = 4;
const STARTING_Y = 360;
const JUMP_HEIGHT_DEPENDS_ON_PRESS_DURATION = true;
const JUMP_HEIGHT = 4.5;
const CLOUD_JUMP_HIGHT = JUMP_HEIGHT * 1.5;
const CONTINUED_JUMP = 0.05 / 4;
const PLAYER_WIDTH = 8;
const PLAYER_HEIGHT = 16;
const RUNNING_ANIMATION_FRAMES = 4;
const FRAMES_PER_RUNNING_ANIMATION = 5;
const MAX_PROJECTILES = 2;
const PROJECTILE_DELAY = 500; // in ms
const FIREBALL_SPEED = 3 / 2;
const FIREBALL_BOOST_HEIGHT = 3;
const FIREBALL_GRAVITY = GRAVITY;
const FIREBALL_ROTATION = 1 / 5;
const FIREBALL_LIFETIME = Infinity; // in frames
const FIREBALL_HEIGHT = 8;
const FIREBALL_WIDTH = FIREBALL_HEIGHT;
const HAMMER_SPEED = FIREBALL_SPEED;
const HAMMER_GRAVITY = FIREBALL_GRAVITY;
const HAMMER_ROTATION = FIREBALL_ROTATION;
const HAMMER_STARTING_VELOCITY = 4.5;
const HAMMER_HEIGHT = 16;
const HAMMER_WIDTH = HAMMER_HEIGHT;
const SWITCH_TIMEOUT = 1000; // in ms
const SUITS = {
  fire: 1,
  air: 2,
  wind: 2,
  jump: 2,
  hammer: 3,
};
const PROJECTILE_SUITS = [
  SUITS.fire, SUITS.hammer
];
const FACING = {
  right: 0.5,
  left: -0.5,
};
const COINS = [ // not zero indexed!
  1, 3, 7
];
const TOTAL_COINS = COINS.length;
const ZINDEX = { // higher number = furthur back
  platforms: 10,
  background: 20,
};
const HAMMER_SUIT_FALLING_SPEED = GRAVITY;
const HAMMER_SUIT_SPAWN_Y = 0;
const HAMMER_SUIT_SPAWN_X = 23 * BLOCK_WIDTH;
const FRAMES_PER_BLOCK_BREAK_FRAME = 10; // in frames
const HAMMER_SUIT_LVL = 7; // zero indexed
const HSWITCH_TIMEOUT = 1000; // in ms
const BLOCK_BREAK_FRAMES = [
  "tiles/switch/block/BB1.png",
  "tiles/switch/block/BB2.png",
  "tiles/switch/block/BB3.png",
  "tiles/switch/block/BB4.png",
  "tiles/switch/block/BB5.png",
  "tiles/switch/block/BB6.png",
  "tiles/switch/block/BB7.png",
  "tiles/switch/block/BB8.png",
  "tiles/switch/block/BB9.png",
];
const DEFAULT_SUIT = 0;
const WIND_SUIT = 0;

// set up the stages and renderer
var renderer = new autoDetectRenderer(WIDTH, HEIGHT);
var stage = new Container();
var platforms = new Container();
var interactable = new Container();
var animated = new Container();
var projectiles = new Container();
projectiles.name = "projectiles";
projectiles.zIndex = 1;

renderer.view.id = "renderer";
stage.addChild(projectiles);
stage.addChild(platforms);

// setup sprites
var costume; // the visual part of the player
var player; // the actual hitbox, invisible
var suit; // suit overlay
var textures; // textures for sprites

// setup generic variables
var state = function(){
  state = render;
  state();
};
var level = 0;
var end = false;
var lastProjectile;
var iceInterval;

// music
var loadedSongs = 0;

// keyboard controlls
var up = keyboard(38);
var down = keyboard(40);
var left = keyboard(37);
var right = keyboard(39);
var x = keyboard(88);
var z = keyboard(90);
var f5 = keyboard(116); // MAKE F5 GREAT AGAIN
var downPressed = false;
var f = keyboard(70);

window.frames = 0;
var date = new Date();

// for some cool canvas only effects (gradients)
var canvas = document.createElement("canvas");
canvas.width = WIDTH;
canvas.height = HEIGHT;
var ctx = canvas.getContext("2d");

// https://github.com/pixijs/pixi.js/issues/296
stage.updateLayersOrder = function () {
  stage.children.sort(function(a,b) {
    a.zIndex = a.zIndex || 0;
    b.zIndex = b.zIndex || 0;
    return b.zIndex - a.zIndex;
  });
};

stage.updateLayersOrder();

loader
  .add("assets.json")
  .load(init);

function init(){
  document.getElementById("canvas").appendChild(renderer.view);

  textures = PIXI.loader.resources["assets.json"].textures;

  costume = new Sprite(textures["player/still.png"]);
  player = new Sprite(textures["player/hitbox.png"]);
  suit = new Sprite(textures["player/suits/fire/still.png"]);

  costume.visible = true;
  player.visible = false;
  suit.visible = false;

  costume.name = "costume";
  player.name = "player";
  suit.name = "suit";

  var gradient = ctx.createLinearGradient(WIDTH / 2, 0, WIDTH / 2, HEIGHT);
  gradient.addColorStop(0, "#00CCCC");
  gradient.addColorStop(1, "#006666");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  var base = new BaseTexture(canvas);
  var background = new Sprite(new Texture(base));
  background.zIndex = ZINDEX.background;

  stage.addChild(costume);
  stage.addChild(suit);
  stage.addChild(background);

  renderer.render(stage);
  
  player.width = PLAYER_WIDTH;
  player.height = PLAYER_HEIGHT;
  costume.width = player.width;
  costume.height = player.height;
  suit.width = costume.width;
  suit.height = costume.height;

  player.anchor.set(0.5, 0.5);
  costume.anchor.set(player.anchor.x, player.anchor.y);
  suit.anchor.set(costume.anchor.x, costume.anchor.y);

  costume.x = player.x;
  costume.y = player.y;
  suit.x = costume.x;
  suit.y = costume.y;

  // initate our variables
  player.xv = 0;
  player.yv = 0;
  player.unlocked = 0;
  player.suit = 0;
  player.facing = player.scale.x;
  player.still = true;
  player.jumping = false;
  player.frame = 0;
  player.run = 1;

  player.coins = [];
  for (let i = 0; i < TOTAL_COINS; i++) player.coins.push(false);

  // wait until the other stuff is loaded
  var loadInterval = setInterval(function(){
    if (typeof loop === "function" &&
        typeof LEVELS === "object" &&
        typeof TILES === "object" &&
        typeof AUDIO === "object" &&
        loadedSongs === AUDIO.length){
      playBackgroundMusic();
      clearInterval(loadInterval);
      state = render;
      loop();
    }
  }, 0);
}

/**
 * @param {number} keyCode key code
 * @returns {object}
 */
function keyboard(keyCode) {
  var key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };

  //The `upHandler`
  key.upHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };

  //Attach event listeners
  window.addEventListener(
    "keydown", key.downHandler.bind(key), false
  );
  window.addEventListener(
    "keyup", key.upHandler.bind(key), false
  );
  return key;
}

// OVERRIDING DEFAULT FUNCTIONS WITH NEW AND IMPROVED ONES HAHAHAHHAHAHAHAHAHAHA
Math._floor = Math.floor;
Math.floor = function(x){
  return x|0;
};
