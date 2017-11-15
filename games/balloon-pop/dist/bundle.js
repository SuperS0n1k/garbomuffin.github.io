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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = isMobile;
/* harmony export (immutable) */ __webpack_exports__["b"] = isFileUrl;
/* harmony export (immutable) */ __webpack_exports__["a"] = getOrDefault;
/* unused harmony export decimalToHex */
// https://stackoverflow.com/a/3540295
// tests if the device is probably a mobile phone
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
// disable a couple error prone features when on a file: url
function isFileUrl() {
    return location.href.startsWith("file:");
}
// if obj is defined, return obj
// else return def
// used as less verbose option defaulting without neglecting falsy values (|| does that)
function getOrDefault(obj, def) {
    if (typeof obj === "undefined") {
        return def;
    }
    else {
        return obj;
    }
}
// https://stackoverflow.com/a/697841
function decimalToHex(number) {
    if (number < 0) {
        number = 0xFFFFFFFF + number + 1;
    }
    return number.toString(16).toUpperCase();
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);
// Tasks and TaskRunners

// a task is something to be run at a certain time, maybe repeating
class Task {
    constructor(options) {
        const runnable = options.run;
        const delay = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* getOrDefault */])(options.delay, 0);
        const repeatEvery = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* getOrDefault */])(options.repeatEvery, -1);
        this.originalOptions = options;
        this.runnable = runnable;
        this.delay = delay;
        this.repeatEvery = repeatEvery;
    }
    run() {
        // pass this task to the function so that it can call things like task.stop();
        this.runnable(this);
    }
    stop() {
        this.runnable = () => { };
        this.delay = 0;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Task;

// the things that runs tasks
// adds everything tasks use
// most methods prefixed with _ to avoid as many collisions as possible
// almost EVERYTHING extends this (and as such can have tasks on it)
class TaskRunner {
    constructor() {
        this._tasks = [];
    }
    runTasks() {
        for (const task of this._tasks) {
            if (task.delay <= 0) {
                task.run();
                // TODO: cleaner way to do this
                if (task.repeatEvery >= 0) {
                    task.delay = task.repeatEvery;
                }
                else {
                    task.delay = -1;
                }
            }
            else {
                task.delay--;
            }
        }
        this._tasks = this._tasks.filter((i) => i.delay !== -1);
    }
    resetTasks() {
        this._tasks = [];
    }
    // add a task
    // can either be a task or a function
    // if it is a task it is added as you would expect
    // if it is a function it will repeat every frame
    addTask(task) {
        if (typeof task === "function") {
            this.addTask(new Task({
                run: task,
                repeatEvery: 0,
            }));
        }
        else {
            task.runnable = task.runnable.bind(this);
            this._tasks.push(task);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = TaskRunner;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// a simple position class that removes some verbosity from code
// can make for some nicer code sometimes
class Position {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Position;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__position__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__task__ = __webpack_require__(1);


class BaseMouse extends __WEBPACK_IMPORTED_MODULE_1__task__["b" /* TaskRunner */] {
    constructor(runtime) {
        super();
        this.position = new __WEBPACK_IMPORTED_MODULE_0__position__["a" /* Position */](0, 0);
        this.runtime = runtime;
    }
    update() {
        this.runTasks();
    }
    get isDown() {
        return this.left.isDown;
    }
    get isUp() {
        return this.left.isUp;
    }
    get isClick() {
        return this.left.isClick;
    }
    get framesDown() {
        return this.left.framesDown;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BaseMouse;

class BaseMouseButton {
    constructor(mouse) {
        this.isDown = false;
        this.framesDown = 0;
        mouse.addTask(this.update.bind(this));
    }
    update() {
        if (this.isDown) {
            this.framesDown++;
        }
        else {
            this.framesDown = 0;
        }
    }
    get isUp() {
        return !this.isDown;
    }
    get isClick() {
        return this.framesDown === 1;
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = BaseMouseButton;

// A mouse button that doesn't do anything and always returns basic defaults
// Used by mobile mouse support as only left click is supported there
class EmptyMouseButton {
    constructor() {
        this.isDown = false;
        this.isUp = true;
        this.isClick = false;
        this.framesDown = 0;
    }
    update() { }
}
/* harmony export (immutable) */ __webpack_exports__["c"] = EmptyMouseButton;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scale__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__task__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(0);



class AbstractSprite extends __WEBPACK_IMPORTED_MODULE_1__task__["b" /* TaskRunner */] {
    constructor(options) {
        super();
        this.runtime = AbstractSprite.runtime;
        this.position = options.position;
        this.width = Object(__WEBPACK_IMPORTED_MODULE_2__utils__["a" /* getOrDefault */])(options.width, 0);
        this.height = Object(__WEBPACK_IMPORTED_MODULE_2__utils__["a" /* getOrDefault */])(options.height, 0);
        this.scale = Object(__WEBPACK_IMPORTED_MODULE_2__utils__["a" /* getOrDefault */])(options.scale, new __WEBPACK_IMPORTED_MODULE_0__scale__["a" /* Scale */]());
        this.runtime.sprites.push(this);
    }
    update() {
        this.runTasks();
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
        return p.x > this.x &&
            p.x < this.x + this.width &&
            p.y > this.y &&
            p.y < this.y + this.height;
    }
    get x() {
        return this.position.x;
    }
    set x(x) {
        this.position.x = x;
    }
    get y() {
        return this.position.y;
    }
    set y(y) {
        this.position.y = y;
    }
    get z() {
        return this.position.z;
    }
    set z(z) {
        this.position.z = z;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AbstractSprite;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(6);

const game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* BalloonPopGame */]();
// add in all of our assets
game.addAsset("balloon");
// wait for it to load then run our stuff
game.waitForAssets().then(run);
function run() {
    document.getElementById("start").onclick = () => {
        document.getElementById("start").style.display = "none";
        game.start();
    };
}


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_game__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__engine_position__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__engine_task__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__engine_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sprites_balloon__ = __webpack_require__(13);





class BalloonPopGame extends __WEBPACK_IMPORTED_MODULE_0__engine_game__["a" /* GameRuntime */] {
    constructor() {
        super(document.getElementById("canvas"));
        this._score = 0;
        this._highscore = 0;
        this.lastKnownGlobalHighscore = 0;
        this.startTime = performance.now();
        this.highscore = Object(__WEBPACK_IMPORTED_MODULE_3__engine_utils__["a" /* getOrDefault */])(Number(localStorage.getItem("highscore")), 0);
        this.addTask(new __WEBPACK_IMPORTED_MODULE_2__engine_task__["a" /* Task */]({
            run: this.createBalloon,
            repeatEvery: 60,
        }));
        this.addTask(new __WEBPACK_IMPORTED_MODULE_2__engine_task__["a" /* Task */]({
            run: this.getGlobalHighscore,
            repeatEvery: 60 * 60,
        }));
        this.addTask(new __WEBPACK_IMPORTED_MODULE_2__engine_task__["a" /* Task */]({
            run: this.checkForNewGlobalRecord,
            repeatEvery: 60,
        }));
    }
    start() {
        super.start();
    }
    // creats a balloon in a random location above the screen
    createBalloon(task) {
        const texture = this.getAsset("balloon");
        const width = texture.width / 10;
        const height = texture.height / 10;
        const sprite = new __WEBPACK_IMPORTED_MODULE_4__sprites_balloon__["a" /* BalloonSprite */]({
            position: new __WEBPACK_IMPORTED_MODULE_1__engine_position__["a" /* Position */](Math.random() * (this.canvas.width - width), -texture.height),
            height, width, texture,
        });
        // difficulty scaling
        const spawnRate = this.getSpawnRate(task);
        task.repeatEvery = spawnRate;
    }
    // returns how many frames should be between each balloon spawn
    getSpawnRate(task) {
        const BASE_SPEED = task.originalOptions.repeatEvery;
        return BASE_SPEED ** (1 - this.difficulty / 3);
    }
    // TODO: rewrite
    checkForNewGlobalRecord() {
        if (this.score > this.lastKnownGlobalHighscore) {
            this.setGlobalHighscore(this.score);
        }
    }
    // TODO: rewrite using subscriptions
    getGlobalHighscore() {
        if (Object(__WEBPACK_IMPORTED_MODULE_3__engine_utils__["b" /* isFileUrl */])()) {
            return;
        }
        const options = {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            // what the fuck?
            // this works?
            body: JSON.stringify({
                query: `{Highscore(id: "cj9ungg2zbh4f0167o0kigi5r"){score}}`,
            }),
        };
        return fetch("https://api.graph.cool/simple/v1/cj9un6whi02dn0163xh8unei0", options)
            .then((res) => res.json())
            .then((res) => res.data.Highscore.score)
            .then((score) => {
            this.lastKnownGlobalHighscore = score;
            document.getElementById("global-highscore").textContent = score;
        });
    }
    // TODO: rewrite
    setGlobalHighscore(score) {
        if (Object(__WEBPACK_IMPORTED_MODULE_3__engine_utils__["b" /* isFileUrl */])()) {
            return;
        }
        const options = {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: `mutation{updateHighscore(id: "cj9ungg2zbh4f0167o0kigi5r" score: ${score}){id score}}`,
            }),
        };
        return fetch("https://api.graph.cool/simple/v1/cj9un6whi02dn0163xh8unei0", options);
    }
    // renders a game over screen and stops the game
    gameover() {
        this.resetCanvas();
        // TODO: use a TextSprite once it's stable
        this.ctx.font = "50px Arial";
        this.ctx.fillStyle = "black";
        const text = "Game Over!";
        const width = this.ctx.measureText(text).width;
        this.ctx.fillText("Game Over!", (this.canvas.width / 2) - width / 2, this.canvas.height / 2);
        this.exit();
    }
    get difficulty() {
        return (performance.now() - this.startTime) / 1000 / 100;
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
        localStorage.setItem("highscore", highscore.toString());
        this._highscore = highscore;
    }
    onexit() {
        document.getElementById("start").style.display = "block";
    }
    resetVariables() {
        super.resetVariables();
        this.score = 0;
        this.startTime = performance.now();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BalloonPopGame;



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__container__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__drivers_mouse_mouse__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__drivers_mouse_touchscreen__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__errors_exit__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sprite__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__task__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils__ = __webpack_require__(0);







// this is the main game runtime object
// rendering is done here
// a lot of stuff is done here
class GameRuntime extends __WEBPACK_IMPORTED_MODULE_5__task__["b" /* TaskRunner */] {
    constructor(canvas) {
        super();
        // see resetVariables()
        this.assets = new Map();
        this.containers = [];
        this._assetPromises = [];
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        // mouse driver, support pc and mobile to some degree
        if (!Object(__WEBPACK_IMPORTED_MODULE_6__utils__["c" /* isMobile */])()) {
            console.log("using normal mouse");
            this.mouse = new __WEBPACK_IMPORTED_MODULE_1__drivers_mouse_mouse__["a" /* Mouse */](this);
        }
        else {
            console.log("using mobile mouse");
            this.mouse = new __WEBPACK_IMPORTED_MODULE_2__drivers_mouse_touchscreen__["a" /* TouchscreenMouse */](this);
        }
        // set the current runtime on some objects
        // i dont want to do this but it works
        __WEBPACK_IMPORTED_MODULE_4__sprite__["a" /* AbstractSprite */].runtime = this;
        __WEBPACK_IMPORTED_MODULE_0__container__["a" /* Container */].runtime = this;
        // reset other variables
        this.resetVariables();
        // debugging
        window.runtime = this;
        // run the mouse driver
        this.addTask(this.updateMouse);
        // classess are weird
        this.loop = this.loop.bind(this);
    }
    ///
    /// ASSETS
    ///
    // add an asset and start loading it
    addAsset(src) {
        // uses the original src for storage
        // TODO: consider using the new src and adding that into getAsset?
        const originalSrc = src;
        // add the extension and folder
        src = `assets/${src}.png`;
        console.log("adding asset", src);
        // create a promise that will resolve when onload is called or
        // reject when onerror is called
        const promise = new Promise((resolve, reject) => {
            const image = document.createElement("img");
            image.src = src;
            image.onload = () => {
                resolve();
            };
            image.onerror = () => {
                reject();
            };
            this.assets.set(originalSrc, image);
        });
        this._assetPromises.push(promise);
        return promise;
    }
    // wait for all assets to load
    async waitForAssets() {
        // Promise.all will fail on an error and that is probably preferred behavior
        await Promise.all(this._assetPromises);
        console.log("loaded assets");
    }
    // get an asset with a name
    getAsset(src) {
        return this.assets.get(src);
    }
    ///
    /// CORE
    ///
    // reset variabels to sane defaults
    // after starting it has to reset things
    resetVariables() {
        this.sprites = new __WEBPACK_IMPORTED_MODULE_0__container__["a" /* Container */]();
        this.containers = [];
    }
    // resets things and starts the loop
    start() {
        console.log("starting loop");
        this.resetVariables();
        this.loop();
    }
    // the main loop - calls all tasks in all sprites
    loop() {
        // update sprites and this
        try {
            this.update();
        }
        catch (e) {
            // handle exiting
            if (e instanceof __WEBPACK_IMPORTED_MODULE_3__errors_exit__["a" /* ExitError */]) {
                this.onexit();
                return;
            }
            else {
                throw e;
            }
        }
        // render
        this.render();
        // request the next frame to render
        requestAnimationFrame(this.loop);
    }
    update() {
        // all non-core details should be implemented using this.addTask
        // the only core things right now are sprite ticking and rendering (partly due to ordering reasons)
        // all tasks added on here are executed BEFORE sprites
        this.runTasks();
        // all sprites
        for (const sprite of this.sprites) {
            sprite.update();
        }
    }
    render() {
        // clear the canvas
        this.resetCanvas();
        // render all sprites onto our canvas
        for (const sprite of this.sprites) {
            sprite.render(this.ctx);
        }
    }
    // throws an error that is handled gracefully by the update function
    // stops ALL execution
    exit() {
        console.warn("exiting using exit()");
        // instances of ExitError are treated specially by the update function
        throw new __WEBPACK_IMPORTED_MODULE_3__errors_exit__["a" /* ExitError */]();
    }
    // clears the canvas and replaces it with a blank white background
    resetCanvas() {
        this.ctx.scale(1, 1);
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    // small function that calls the mouse driver's update funciton
    updateMouse() {
        this.mouse.update();
    }
    // called when exiting
    onexit() {
        console.warn("empty onexit()");
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GameRuntime;



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// a container contains sprites
// isn't that earth shattering or what?
// these were used more heavily in my older games
// currently only one of these are used: the sprites list
class Container {
    constructor() {
        this.runtime = Container.runtime;
        this.sprites = [];
        this.runtime.containers.push(this);
    }
    push(...items) {
        return this.sprites.push(...items);
    }
    *[Symbol.iterator]() {
        for (const sprite of this.sprites) {
            yield sprite;
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Container;



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(3);

// handles mouse events
// a simple "driver" for the mouse
// TODO: touchscreen support
// probably will use another "driver" that is compatible
var Button;
(function (Button) {
    Button[Button["left"] = 0] = "left";
    Button[Button["middle"] = 1] = "middle";
    Button[Button["right"] = 2] = "right";
})(Button || (Button = {}));
class MouseButton extends __WEBPACK_IMPORTED_MODULE_0__base__["b" /* BaseMouseButton */] {
    constructor(mouse, button) {
        super(mouse); // It's a bird! It's a plane! No it's Supermouse!
        this.button = button;
        document.addEventListener("mousedown", (e) => {
            if (e.button === this.button) {
                this.isDown = true;
            }
        });
        document.addEventListener("mouseup", (e) => {
            if (e.button === this.button) {
                this.isDown = false;
            }
        });
    }
}
class Mouse extends __WEBPACK_IMPORTED_MODULE_0__base__["a" /* BaseMouse */] {
    constructor(runtime) {
        super(runtime);
        this.right = new MouseButton(this, Button.right);
        this.middle = new MouseButton(this, Button.middle);
        this.left = new MouseButton(this, Button.left);
        runtime.canvas.addEventListener("mousemove", (e) => {
            this.position.x = e.layerX;
            this.position.y = e.layerY;
        });
        runtime.canvas.addEventListener("mousedown", (e) => {
            e.preventDefault();
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Mouse;



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__position__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base__ = __webpack_require__(3);


// handles mouse events
// a simple "driver" for the mouse
// TODO: touchscreen support
// probably will use another "driver" that is compatible
class TouchscreenButton extends __WEBPACK_IMPORTED_MODULE_1__base__["b" /* BaseMouseButton */] {
    constructor(mouse) {
        super(mouse); // It's a bird! It's a plane! No it's Supermouse!
        document.addEventListener("touchstart", (e) => {
            this.isDown = true;
        });
        document.addEventListener("touchend", (e) => {
            this.isDown = false;
        });
        document.addEventListener("touchcancel", (e) => {
            this.isDown = false;
        });
    }
}
class TouchscreenMouse extends __WEBPACK_IMPORTED_MODULE_1__base__["a" /* BaseMouse */] {
    constructor(runtime) {
        super(runtime);
        // only the left mouse button does stuff
        this.left = new TouchscreenButton(this);
        this.middle = new __WEBPACK_IMPORTED_MODULE_1__base__["c" /* EmptyMouseButton */]();
        this.right = new __WEBPACK_IMPORTED_MODULE_1__base__["c" /* EmptyMouseButton */]();
        // stop scrolling, zooming, or other stuff that you can do with your fingers
        this.handleEvent = this.handleEvent.bind(this);
        runtime.canvas.addEventListener("touchmove", this.handleEvent);
        runtime.canvas.addEventListener("touchstart", this.handleEvent);
        runtime.canvas.addEventListener("touchend", this.handleEvent);
        runtime.canvas.addEventListener("touchcancel", this.handleEvent);
    }
    handleEvent(e) {
        e.preventDefault();
        const offset = this.findOffset(this.runtime.canvas);
        this.position.x = e.changedTouches[0].clientX - offset.x;
        this.position.y = e.changedTouches[0].clientY - offset.y;
    }
    // https://developer.mozilla.org/en-US/docs/Web/API/Touch_events with minor modifications
    findOffset(el) {
        let curleft = 0;
        let curtop = 0;
        while (el.offsetParent) {
            curleft += el.offsetLeft;
            curtop += el.offsetTop;
            el = el.offsetParent;
        }
        return new __WEBPACK_IMPORTED_MODULE_0__position__["a" /* Position */](curleft - document.body.scrollLeft, curtop - document.body.scrollTop);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TouchscreenMouse;



/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// error is handled more gracefully by the engine
// than a regular error
class ExitError extends Error {
    constructor() {
        super("Stopping game execution");
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ExitError;



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// used in rendering. could be used as a coordinate although you should use Position for that
class Scale {
    constructor(x = 1, y = x) {
        this.x = x;
        this.y = y;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Scale;



/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_sprites_imagesprite__ = __webpack_require__(14);

const BASE_SPEED = 3;
/* unused harmony export BASE_SPEED */

class BalloonSprite extends __WEBPACK_IMPORTED_MODULE_0__engine_sprites_imagesprite__["a" /* ImageSprite */] {
    constructor(options) {
        super(options);
        // make it so our update task actually happens
        this.addTask(this.updateBalloon);
    }
    // called every frame a balloon exists
    updateBalloon() {
        // move us down relavent to the difficulty
        const speed = this.speed;
        this.y += speed;
        // if we went below the screen gameover
        if (this.y >= this.runtime.canvas.height) {
            this.runtime.gameover();
            return;
        }
        // due to the lack of an onclick() method we
        // a) figure out if the mouse is over us
        // b) found out if this is the first frame the mouse has been down
        const containsMouse = this.containsPoint(this.runtime.mouse.position);
        if (containsMouse && this.runtime.mouse.isClick) {
            this.destroy();
            this.runtime.score++;
        }
    }
    get speed() {
        return BASE_SPEED ** (1 + this.runtime.difficulty);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BalloonSprite;



/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sprite__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(0);


class ImageSprite extends __WEBPACK_IMPORTED_MODULE_0__sprite__["a" /* AbstractSprite */] {
    constructor(options) {
        super(options);
        this.texture = options.texture;
        this.width = Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* getOrDefault */])(this.width, this.texture.width);
        this.height = Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* getOrDefault */])(this.height, this.texture.height);
    }
    render(ctx) {
        ctx.scale(this.scale.x, this.scale.y);
        ctx.drawImage(this.texture, this.x, this.y, this.width, this.height);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ImageSprite;



/***/ })
/******/ ]);