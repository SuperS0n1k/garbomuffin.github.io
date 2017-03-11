declare var Stats: any

var canvas = <HTMLCanvasElement> document.getElementById("canvas");
canvas.width = WIDTH;
canvas.height = HEIGHT;
var ctx = canvas.getContext("2d");

var gradientCanvas = document.createElement("canvas");
gradientCanvas.width = canvas.width;
gradientCanvas.height = canvas.height;
var gradientCtx = gradientCanvas.getContext("2d");

var gradient = gradientCtx.createLinearGradient(WIDTH / 2, 0, WIDTH / 2, HEIGHT);
gradient.addColorStop(0, "#61ede3");
gradient.addColorStop(1, "#d8d8d8");
ctx.fillStyle = gradient;

var level = 0;

var state: () => void = start;

var keys:boolean[] = [];
var containers:Container[] = [];
var sprites: Container
var blocks: Container
var updatable: Container
var projectiles: Container
var player: PlayerHitbox

var stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);

var loadInterval = setInterval(function(){
  if (typeof totalAssets !== "undefined" &&
      loadedAssets === totalAssets){
    clearInterval(loadInterval);
    state();
  }
}, 0);

document.addEventListener("keydown", function(e: KeyboardEvent){
  var code = e.keyCode;
  keys[code] = true;
  if (BLOCKED_INPUTS.indexOf(code) > -1){ // disable arrow and space scrolling
    e.preventDefault();
  }
});
document.addEventListener("keyup", function(e: KeyboardEvent){
  keys[e.keyCode] = false;
});
