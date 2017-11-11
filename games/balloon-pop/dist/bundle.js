/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__task__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scale__ = __webpack_require__(8);


function option(obj, def) {
    if (typeof obj === "undefined") {
        return def;
    }
    else {
        return obj;
    }
}
class Sprite extends __WEBPACK_IMPORTED_MODULE_0__task__["b" /* TaskRunner */] {
    constructor(options) {
        super();
        this.runtime = Sprite.runtime;
        this.position = options.position;
        this.texture = options.texture;
        this.width = option(options.width, this.texture.width);
        this.height = option(options.height, this.texture.height);
        this.scale = option(options.scale, new __WEBPACK_IMPORTED_MODULE_1__scale__["a" /* Scale */](1));
        this.runtime.sprites.push(this);
    }
    update() {
        this.runTasks();
    }
    render(ctx) {
        ctx.scale(this.scale.x, this.scale.y);
        ctx.drawImage(this.texture, this.x, this.y, this.width, this.height);
    }
    destroy() {
        this._removeFromContainer(this.runtime.sprites);
        for (const container of this.runtime.containers) {
            this._removeFromContainer(container);
        }
    }
    _removeFromContainer(container) {
        const index = container.sprites.indexOf(this);
        if (index > -1) {
            container.sprites.splice(index, 1);
        }
    }
    containsPoint(p) {
        return p.x > this.x && p.x < this.x + this.width &&
            p.y > this.y && p.y < this.y + this.height;
    }
    get x() {
        return this.position.x;
    }
    get y() {
        return this.position.y;
    }
    get z() {
        return this.position.z;
    }
    set x(x) {
        this.position.x = x;
    }
    set y(y) {
        this.position.y = y;
    }
    set z(z) {
        this.position.z = z;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Sprite;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_game__ = __webpack_require__(2);

const game = new __WEBPACK_IMPORTED_MODULE_0__engine_game__["a" /* Game */]();
(async function () {
    game.addAsset("balloon");
    await game.waitForAssets();
    run();
})();
function run() {
    document.getElementById("start").onclick = function () {
        document.getElementById("start").style.display = "none";
        game.start();
    };
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sprite__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__container__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__drivers_mouse__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__task__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sprites_balloon__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__position__ = __webpack_require__(7);






class GameRuntime extends __WEBPACK_IMPORTED_MODULE_3__task__["b" /* TaskRunner */] {
    constructor(canvas) {
        super();
        this._assetPromises = [];
        this.assets = new Map();
        this.containers = [];
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.loop = this.loop.bind(this);
        this.mouse = new __WEBPACK_IMPORTED_MODULE_2__drivers_mouse__["a" /* Mouse */](this);
        // set the current runtime on some objects
        __WEBPACK_IMPORTED_MODULE_0__sprite__["a" /* Sprite */].runtime = this;
        __WEBPACK_IMPORTED_MODULE_1__container__["a" /* Container */].runtime = this;
        this.sprites = new __WEBPACK_IMPORTED_MODULE_1__container__["a" /* Container */]();
        // debugging
        window.runtime = this;
        // tasks
        this.addTask(new __WEBPACK_IMPORTED_MODULE_3__task__["a" /* Task */]({
            run: this.updateMouse,
            repeatEvery: 0,
        }));
    }
    // ASSET LOADING
    addAsset(src) {
        var originalSrc = src;
        src = `assets/${src}.png`;
        console.log("adding asset", src);
        const promise = new Promise(function (resolve, reject) {
            const image = document.createElement("img");
            image.src = src;
            image.onload = function () {
                resolve();
            };
            image.onerror = function () {
                reject();
            };
            this.assets.set(originalSrc, image);
        }.bind(this));
        this._assetPromises.push(promise);
        return promise;
    }
    async waitForAssets() {
        await Promise.all(this._assetPromises);
        console.log("loaded assets");
    }
    getAsset(src) {
        return this.assets.get(src);
    }
    // GAME LOOP
    start() {
        console.log("starting loop");
        this.loop();
    }
    loop() {
        this.update();
        this.render();
        requestAnimationFrame(this.loop);
    }
    update() {
        // all non-core details should be implemented using this.addTask
        // the only core things right now are sprite ticking and rendering
        // all tasks added on here are executed BEFORE sprites
        this.runTasks();
        for (const sprite of this.sprites) {
            sprite.update();
        }
    }
    render() {
        this.resetCanvas();
        for (const sprite of this.sprites) {
            sprite.render(this.ctx);
        }
    }
    resetCanvas() {
        this.ctx.scale(1, 1);
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    // TASKS
    updateMouse() {
        this.mouse.update();
    }
}
/* unused harmony export GameRuntime */

class Game extends GameRuntime {
    constructor() {
        super(document.getElementById("canvas"));
        this._score = 0;
        this._highscore = 0;
        this.lastKnownGlobalHighscore = 0;
        this.addTask(new __WEBPACK_IMPORTED_MODULE_3__task__["a" /* Task */]({
            run: this.createBalloon,
            repeatEvery: 100,
        }));
        this.addTask(new __WEBPACK_IMPORTED_MODULE_3__task__["a" /* Task */]({
            run: this.getGlobalHighscore,
            repeatEvery: 60 * 60,
        }));
        this.addTask(new __WEBPACK_IMPORTED_MODULE_3__task__["a" /* Task */]({
            run: this.checkForNewGlobalRecord,
            repeatEvery: 60,
        }));
    }
    createBalloon() {
        const texture = this.getAsset("balloon");
        const width = texture.width / 10;
        const height = texture.height / 10;
        const sprite = new __WEBPACK_IMPORTED_MODULE_4__sprites_balloon__["a" /* BalloonSprite */]({
            position: new __WEBPACK_IMPORTED_MODULE_5__position__["a" /* Position */](Math.random() * (this.canvas.width - width), 0),
            height, width, texture,
        });
    }
    checkForNewGlobalRecord() {
        if (this.score > this.lastKnownGlobalHighscore) {
            this.setGlobalHighscore(this.score);
        }
    }
    getGlobalHighscore() {
        const options = {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            // what the fuck?
            // this works?
            body: JSON.stringify({
                query: `{Highscore(id: "cj9ungg2zbh4f0167o0kigi5r"){score}}`
            }),
        };
        return fetch("https://api.graph.cool/simple/v1/cj9un6whi02dn0163xh8unei0", options)
            .then(res => res.json())
            .then(res => res.data.Highscore.score)
            .then(score => {
            this.lastKnownGlobalHighscore = score;
            document.getElementById("global-highscore").textContent = score;
        });
    }
    setGlobalHighscore(score) {
        const options = {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query: `mutation{updateHighscore(id: "cj9ungg2zbh4f0167o0kigi5r" score: ${score}){id score}}`
            }),
        };
        return fetch("https://api.graph.cool/simple/v1/cj9un6whi02dn0163xh8unei0", options);
    }
    gameover() {
        this.resetCanvas();
        this.ctx.font = "70px Arial";
        this.ctx.fillStyle = "black";
        const text = "Game Over!";
        const width = this.ctx.measureText(text).width;
        this.ctx.fillText("Game Over!", (this.canvas.width / 2) - width / 2, this.canvas.height / 2);
        throw new Error("game over");
    }
    get score() {
        return this._score;
    }
    set score(score) {
        document.getElementById("score").textContent = score.toString();
        if (score > this.highscore) {
            this.highscore = score;
        }
        this._score = score;
    }
    get highscore() {
        return this._highscore;
    }
    set highscore(highscore) {
        document.getElementById("player-highscore").textContent = highscore.toString();
        this._highscore = highscore;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Game;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Container {
    constructor() {
        this.runtime = Container.runtime;
        this.sprites = [];
        this.runtime.containers.push(this);
    }
    *[Symbol.iterator]() {
        for (const sprite of this.sprites) {
            yield sprite;
        }
    }
    push(...items) {
        return this.sprites.push(...items);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Container;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_sprite__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__engine_task__ = __webpack_require__(6);


class BalloonSprite extends __WEBPACK_IMPORTED_MODULE_0__engine_sprite__["a" /* Sprite */] {
    constructor(options) {
        super(options);
        this.addTask(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
            run: this.updateBalloon,
            repeatEvery: 0,
        }));
    }
    updateBalloon() {
        this.y += 3;
        if (this.y >= this.runtime.canvas.height) {
            this.gameover();
            return;
        }
        const containsMouse = this.containsPoint(this.runtime.mouse);
        if (containsMouse && this.runtime.mouse.isClicking) {
            console.log("click");
            this.score();
        }
    }
    score() {
        this.destroy();
        this.runtime.score++;
    }
    gameover() {
        this.runtime.gameover();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BalloonSprite;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Button */
var Button;
(function (Button) {
    Button[Button["left"] = 0] = "left";
    Button[Button["middle"] = 1] = "middle";
    Button[Button["right"] = 2] = "right";
})(Button || (Button = {}));
class MouseButton {
    constructor(button) {
        this.isDown = false;
        this.button = button;
        document.addEventListener("mousedown", function (e) {
            if (e.button === this.button) {
                this.isDown = true;
            }
        }.bind(this));
        document.addEventListener("mouseup", function (e) {
            if (e.button === this.button) {
                this.isDown = false;
            }
        }.bind(this));
    }
    get isUp() {
        return !this.isDown;
    }
}
/* unused harmony export MouseButton */

class Mouse {
    constructor(runtime) {
        this.isClicking = false;
        this.right = new MouseButton(Button.right);
        this.middle = new MouseButton(Button.middle);
        this.left = new MouseButton(Button.left);
        runtime.canvas.addEventListener("mousemove", function (e) {
            this.x = e.layerX;
            this.y = e.layerY;
        }.bind(this));
        runtime.canvas.addEventListener("mousedown", function (e) {
            e.preventDefault();
        }.bind(this));
    }
    update() {
        if (this.isDown && !this._previousIsDown) {
            this.isClicking = true;
        }
        else {
            this.isClicking = false;
        }
        this._previousIsDown = this.isDown;
    }
    get isDown() {
        return this.left.isDown;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Mouse;



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Task {
    constructor(options) {
        this.runnable = options.run;
        this.delay = options.delay || 0;
        this.repeatEvery = typeof options.repeatEvery === "undefined" ? -1 : options.repeatEvery;
    }
    run() {
        this.runnable();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Task;

class TaskRunner {
    constructor() {
        this._tasks = [];
    }
    runTasks() {
        for (const task of this._tasks) {
            if (task.delay === 0) {
                task.run();
                if (task.repeatEvery === -1) {
                    task.delay = -1;
                }
                else {
                    task.delay = task.repeatEvery;
                }
            }
            else {
                task.delay--;
            }
        }
        this._tasks = this._tasks.filter(i => i.delay >= 0);
    }
    _removeTask(task) {
        var index = this._tasks.indexOf(task);
    }
    addTask(task) {
        task.runnable = task.runnable.bind(this);
        this._tasks.push(task);
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = TaskRunner;



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Position {
    constructor(x, y, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Position;



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Scale {
    constructor(x, y = x) {
        this.x = x;
        this.y = y;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Scale;



/***/ })
/******/ ]);