var canvas = document.getElementById("canvas");
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
var state = start;
var keys = [];
var containers = [];
var sprites;
var blocks;
var updatable;
var projectiles;
var player;
var stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);
var loadInterval = setInterval(function () {
    if (typeof totalAssets !== "undefined" &&
        loadedAssets === totalAssets) {
        clearInterval(loadInterval);
        state();
    }
}, 0);
document.addEventListener("keydown", function (e) {
    var code = e.keyCode;
    keys[code] = true;
    if (BLOCKED_INPUTS.indexOf(code) > -1) {
        e.preventDefault();
    }
});
document.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});
