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

// constants
const GRAVITY = 0.95 / 5;
const WALK_SPEED = 3 / 2;
const STARTING_X = 4;
const STARTING_Y = 360;
// temporary values
const JUMP_HEIGHT = 5;
const CLOUD_JUMP_HIGHT = JUMP_HEIGHT * 2;

// set up the stage
var renderer = new CanvasRenderer(480, 360);
var stage = new Container();
var platforms = new Container();
renderer.view.id = "renderer";
stage.addChild(platforms);

var player;
var hitbox;
var textures;
var state = function(){
  state = render;
  state();
};
var level = 0;

// keyboard controlls
var up = keyboard(38);
var right = keyboard(39);
var left = keyboard(37);
var z = keyboard(90);

// stage, textures, sprites
var player; // the visual part of the player
var hitbox; // the actual hitbox, invisible
var textures;
var state = function(){
  state = render;
  state();
};

loader
  .add("assets.json")
  .load(init);

function init(){
  document.body.removeChild(document.getElementById("progress"));
  document.getElementById("canvas").appendChild(renderer.view);

  textures = PIXI.loader.resources["assets.json"].textures;

  player = new Sprite(textures["player/still.png"]);
  player.visible = true;
  hitbox = new Sprite(textures["player/hitbox.png"]);
  hitbox.visible = false;
  // player = new Sprite(textures["player/still.png"]);
  // player.visible = false;
  // hitbox = new Sprite(textures["player/hitbox_red.png"]);
  // hitbox.visible = true;
  
  stage.addChild(player);
  stage.addChild(hitbox);

  renderer.render(stage);
  
  hitbox.width = 8;
  hitbox.height = 16;

  hitbox.anchor.set(0.5, 0.5);
  player.anchor.set(0.5, 0.5);

  player.width = hitbox.width;
  player.height = hitbox.height;
  player.x = hitbox.x;
  player.y = hitbox.y;

  // initate our variables
  hitbox.xv = 0;
  hitbox.yv = 0;
  hitbox.jump = 0;
  hitbox.suit = 0;
  hitbox.facing = player.scale.x;

  // wait until the other stuff is loaded
  var loadInterval = setInterval(function(){
    if (typeof loop == "function" &&
        typeof LEVELS == "object" &&
        typeof TILES == "object"){
      clearInterval(loadInterval);
      loop();
    }
  }, 0);
}

function progress(progress){
  console.log(progress.progress);
  document.getElementById("progress").value = progress.progress;
}

// TOTALLY NOT COPY+PASTED
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
