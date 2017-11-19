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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = isMobile;
/* harmony export (immutable) */ __webpack_exports__["a"] = getOrDefault;
/* harmony export (immutable) */ __webpack_exports__["c"] = toHex;
// https://stackoverflow.com/a/3540295
// tests if the device is probably a mobile phone
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
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
function toHex(number) {
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sprite__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__color__ = __webpack_require__(22);



class TextSprite extends __WEBPACK_IMPORTED_MODULE_0__sprite__["a" /* AbstractSprite */] {
    constructor(options) {
        super(options);
        this.text = Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* getOrDefault */])(options.text, "");
        this.fontSize = Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* getOrDefault */])(options.fontSize, 10);
        this.fontFamily = Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* getOrDefault */])(options.fontFamily, "sans-serif");
        this.color = Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* getOrDefault */])(options.color, new __WEBPACK_IMPORTED_MODULE_2__color__["a" /* NamedColor */]("black"));
    }
    get font() {
        return `${this.fontSize}px ${this.fontFamily}`;
    }
    render(ctx) {
        ctx.font = this.font;
        ctx.fillStyle = this.color.toString();
        ctx.fillText(this.text, this.x, this.y);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TextSprite;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vector2d__ = __webpack_require__(7);

// a simple position class that removes some verbosity from code
// can make for some nicer code sometimes
class Vector extends __WEBPACK_IMPORTED_MODULE_0__vector2d__["a" /* Vector2D */] {
    constructor(x = 0, y = 0, z = 0) {
        super(x, y);
        if (typeof x === "object") {
            this.z = x.z;
        }
        else {
            this.z = z;
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Vector;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vector2d__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__task__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(0);



class AbstractSprite extends __WEBPACK_IMPORTED_MODULE_1__task__["b" /* TaskRunner */] {
    constructor(options) {
        super();
        this.runtime = AbstractSprite.runtime;
        this.position = options.position;
        this.width = Object(__WEBPACK_IMPORTED_MODULE_2__utils__["a" /* getOrDefault */])(options.width, 0);
        this.height = Object(__WEBPACK_IMPORTED_MODULE_2__utils__["a" /* getOrDefault */])(options.height, 0);
        this.scale = Object(__WEBPACK_IMPORTED_MODULE_2__utils__["a" /* getOrDefault */])(options.scale, new __WEBPACK_IMPORTED_MODULE_0__vector2d__["a" /* Vector2D */](1, 1));
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
        this.resetTasks(); // stop all future things from running
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
    intersects(sprite) {
        return this.x < sprite.x + sprite.width &&
            this.x + this.width > sprite.x &&
            this.y < sprite.y + sprite.height &&
            this.y + this.height > sprite.y;
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



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vector__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__task__ = __webpack_require__(1);


class BaseMouse extends __WEBPACK_IMPORTED_MODULE_1__task__["b" /* TaskRunner */] {
    constructor(runtime) {
        super();
        this.position = new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* Vector */](0, 0);
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
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Vector2D {
    constructor(x = 0, y = 0) {
        if (typeof x === "object") {
            this.x = x.x;
            this.y = x.y;
        }
        else {
            this.x = x;
            this.y = y;
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Vector2D;



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_sprites_imagesprite__ = __webpack_require__(5);

class SaucerSprite extends __WEBPACK_IMPORTED_MODULE_0__engine_sprites_imagesprite__["a" /* ImageSprite */] {
    constructor(options) {
        super(options);
        this.hSpeed = options.hSpeed;
        this.addTask(this.move);
    }
    shouldDeductHealth() {
        return this.intersects(this.runtime.rocketSprite) ||
            this.y >= this.runtime.canvas.height;
    }
    move() {
        this.y += SaucerSprite.Y_SPEED;
        if (this.shouldDeductHealth()) {
            this.runtime.lives--;
            this.destroy();
            return;
        }
        this.x += this.hSpeed;
        if (this.x <= 0 || this.x + this.width >= this.runtime.canvas.width) {
            this.hSpeed = -this.hSpeed;
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SaucerSprite;

SaucerSprite.Y_SPEED = 3;


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(10);

const game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* SpaceInvaderGame */]();
// add in all of our assets
game.addAsset("rocket");
game.addAsset("saucer");
game.addAsset("bullet");
// wait for it to load then run our stuff
game.waitForAssets().then(run);
function run() {
    document.getElementById("start").onclick = () => {
        document.getElementById("start").style.display = "none";
        game.start();
    };
}


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_runtime__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__engine_vector__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__engine_task__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__engine_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sprites_bullet__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sprites_rocket__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__sprites_saucer__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__sprites_text_highscore__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__sprites_text_score__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__utils__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__sprites_text_lives__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__sprites_text_globalhighscore__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__sprites_text_globalhighscoreholder__ = __webpack_require__(27);













class SpaceInvaderGame extends __WEBPACK_IMPORTED_MODULE_0__engine_runtime__["a" /* GameRuntime */] {
    constructor() {
        super(document.getElementById("canvas"));
        this._lives = 3;
        this._score = 0;
        this._highscore = 0;
        this.startTime = performance.now();
        this.globalHighscore = 0;
        this.globalHighscoreHolder = "Anonymous";
        this.addTask(new __WEBPACK_IMPORTED_MODULE_2__engine_task__["a" /* Task */]({
            run: this.createEnemy,
            repeatEvery: 180,
            delay: 60,
        }));
        // query for current highscore every minute
        this.addTask(new __WEBPACK_IMPORTED_MODULE_2__engine_task__["a" /* Task */]({
            run: this.updateGlobalHighscore,
            repeatEvery: 60 * 60,
        }));
        // see if we beat the global highscore every second
        this.addTask(new __WEBPACK_IMPORTED_MODULE_2__engine_task__["a" /* Task */]({
            run: this.checkForNewGlobalHighscore,
            repeatEvery: 60,
        }));
        this.score = 0;
        this.highscore = Object(__WEBPACK_IMPORTED_MODULE_3__engine_utils__["a" /* getOrDefault */])(Number(localStorage.getItem("highscore")), 0);
        this.addTask(this.detectShooting);
        // run inital tasks once
        this.runTasks();
    }
    start() {
        super.start();
        const texture = this.getAsset("rocket");
        this.rocketSprite = new __WEBPACK_IMPORTED_MODULE_5__sprites_rocket__["a" /* RocketSprite */]({
            position: new __WEBPACK_IMPORTED_MODULE_1__engine_vector__["a" /* Vector */](100, this.canvas.height - texture.height / 10),
            texture,
            height: texture.height / 10, width: texture.width / 10,
        });
        this.createStatsDisplay();
    }
    createStatsDisplay() {
        const sprites = [
            __WEBPACK_IMPORTED_MODULE_7__sprites_text_highscore__["a" /* HighscoreTextSprite */],
            __WEBPACK_IMPORTED_MODULE_11__sprites_text_globalhighscore__["a" /* GlobalHighscoreTextSprite */],
            __WEBPACK_IMPORTED_MODULE_12__sprites_text_globalhighscoreholder__["a" /* GlobalHighscoreHolderTextSprite */],
            __WEBPACK_IMPORTED_MODULE_8__sprites_text_score__["a" /* ScoreTextSprite */],
            __WEBPACK_IMPORTED_MODULE_10__sprites_text_lives__["a" /* LivesTextSprite */],
        ];
        const fontSize = 20;
        for (let i = 0; i < sprites.length; i++) {
            const y = (i + 1) * fontSize;
            const x = 3;
            new sprites[i]({
                position: new __WEBPACK_IMPORTED_MODULE_1__engine_vector__["a" /* Vector */](x, y, 10),
                fontSize,
            });
        }
    }
    detectShooting() {
        if (this.mouse.isClick) {
            this.shoot();
        }
        const space = this.keyboard.keys[32];
        const z = this.keyboard.keys[90];
        const up = this.keyboard.keys[38];
        if (space.justPressed || z.justPressed || up.justPressed) {
            this.shoot();
        }
        const testRapidfire = (key) => {
            if (key.framesDown > 1 && key.framesDown % 10 === 0) {
                this.shoot();
            }
        };
        testRapidfire(space);
        testRapidfire(z);
        testRapidfire(up);
    }
    shoot() {
        if (!this.rocketSprite) {
            return;
        }
        const texture = this.getAsset("bullet");
        const width = texture.width / 15;
        const height = texture.height / 15;
        new __WEBPACK_IMPORTED_MODULE_4__sprites_bullet__["a" /* BulletSprite */]({
            position: new __WEBPACK_IMPORTED_MODULE_1__engine_vector__["a" /* Vector */](this.rocketSprite.position),
            texture, width, height,
        });
    }
    // creats a balloon in a random location above the screen
    createEnemy(task) {
        const texture = this.getAsset("saucer");
        const width = texture.width / 20;
        const height = texture.height / 20;
        const sprite = new __WEBPACK_IMPORTED_MODULE_6__sprites_saucer__["a" /* SaucerSprite */]({
            position: new __WEBPACK_IMPORTED_MODULE_1__engine_vector__["a" /* Vector */](Object(__WEBPACK_IMPORTED_MODULE_9__utils__["a" /* getRandomInt */])(0, this.canvas.width - width), -height),
            hSpeed: Object(__WEBPACK_IMPORTED_MODULE_9__utils__["a" /* getRandomInt */])(-5000, 5000) / 1000,
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
    // renders a game over screen and stops the game
    gameover() {
        this.resetCanvas();
        // TODO: consider using a TextSprite?
        const showCenteredText = (text, y, fontSize) => {
            this.ctx.font = `${fontSize}px Arial`;
            this.ctx.fillStyle = "black";
            const width = this.ctx.measureText(text).width;
            this.ctx.fillText(text, (this.canvas.width / 2) - width / 2, y);
        };
        showCenteredText("Game Over!", this.canvas.height / 2, 50);
        showCenteredText(`Score: ${this.score}`, this.canvas.height / 2 + 50, 25);
        this.exit();
    }
    get difficulty() {
        return (performance.now() - this.startTime) / 1000 / 100;
    }
    get score() {
        return this._score;
    }
    set score(score) {
        score = Math.max(score, 0);
        if (score > this.highscore) {
            this.highscore = score;
        }
        this._score = score;
    }
    get highscore() {
        return this._highscore;
    }
    set highscore(highscore) {
        localStorage.setItem("highscore", highscore.toString());
        this._highscore = highscore;
    }
    get lives() {
        return this._lives;
    }
    set lives(lives) {
        if (lives <= 0) {
            this.gameover();
        }
        else {
            this._lives = lives;
        }
    }
    get username() {
        return document.getElementById("user").value;
    }
    onexit() {
        document.getElementById("start").style.display = "block";
    }
    resetVariables() {
        super.resetVariables();
        this.score = 0;
        this.startTime = performance.now();
    }
    get highscoreServer() {
        if (location.href.includes("localhost:8080")) {
            return "http://localhost:8123/games/space-invaders";
        }
        else {
            return "https://garbomuffin.tk/games/space-invaders";
        }
    }
    updateGlobalHighscore() {
        return fetch(`${this.highscoreServer}/get`)
            .then((res) => res.json())
            .then((res) => {
            this.globalHighscore = res.highscore;
            this.globalHighscoreHolder = res.user;
        });
    }
    setGlobalHighscore(highscore, user) {
        const opts = {
            method: "POST",
            body: JSON.stringify({
                highscore, user,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        };
        this.globalHighscore = highscore;
        this.globalHighscoreHolder = user;
        return fetch(`${this.highscoreServer}/set`, opts);
    }
    checkForNewGlobalHighscore() {
        if (this.score > this.globalHighscore) {
            this.setGlobalHighscore(this.score, this.username);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SpaceInvaderGame;



/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__container__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__drivers_keyboard_keyboard__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__drivers_mouse_mouse__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__drivers_mouse_touchscreen__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__errors_exit__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sprite__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__task__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__utils__ = __webpack_require__(0);








// this is the main game runtime object
// rendering is done here
// a lot of stuff is done here
class GameRuntime extends __WEBPACK_IMPORTED_MODULE_6__task__["b" /* TaskRunner */] {
    constructor(canvas) {
        super();
        // see resetVariables()
        this.assets = new Map();
        this.containers = [];
        this._assetPromises = [];
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        // mouse driver, support pc and mobile to some degree
        if (!Object(__WEBPACK_IMPORTED_MODULE_7__utils__["b" /* isMobile */])()) {
            console.log("using normal mouse");
            this.mouse = new __WEBPACK_IMPORTED_MODULE_2__drivers_mouse_mouse__["a" /* Mouse */](this);
        }
        else {
            console.log("using mobile mouse");
            this.mouse = new __WEBPACK_IMPORTED_MODULE_3__drivers_mouse_touchscreen__["a" /* TouchscreenMouse */](this);
        }
        this.keyboard = new __WEBPACK_IMPORTED_MODULE_1__drivers_keyboard_keyboard__["a" /* Keyboard */](this);
        // set the current runtime on some objects
        // i dont want to do this but it works
        __WEBPACK_IMPORTED_MODULE_5__sprite__["a" /* AbstractSprite */].runtime = this;
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
    waitForAssets() {
        // Promise.all will fail on an error and that is probably preferred behavior
        return Promise.all(this._assetPromises)
            .then(() => console.log("loaded assets"))
            .then(() => this._assetPromises = []);
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
            if (e instanceof __WEBPACK_IMPORTED_MODULE_4__errors_exit__["a" /* ExitError */]) {
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
        // sort sprites by z TODO: find a better for to do this
        this.sortSprites();
        // render all sprites onto our canvas
        for (const sprite of this.sprites) {
            sprite.render(this.ctx);
        }
    }
    sortSprites() {
        this.sprites.sort();
    }
    // throws an error that is handled gracefully by the update function
    // stops ALL execution
    exit() {
        console.warn("exiting using exit()");
        // instances of ExitError are treated specially by the update function
        throw new __WEBPACK_IMPORTED_MODULE_4__errors_exit__["a" /* ExitError */]();
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
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__3rd_party_stableSort__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__3rd_party_stableSort___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__3rd_party_stableSort__);
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
    sort() {
        this.sprites.stableSort((a, b) => {
            return a.position.z - b.position.z;
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Container;



/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://gist.github.com/fsufitch/18bb4692d5f46b649890f8fd58765fbc
let defaultCmp = (a, b) => {
    if (a < b) {
        return -1;
    }
    else if (a > b) {
        return 1;
    }
    else {
        return 0;
    }
};
Array.prototype.stableSort = function (cmp = defaultCmp) {
    const self = this; // for typing
    const stabilized = self.map((el, index) => ([el, index]));
    const stableCmp = (a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    };
    stabilized.sort(stableCmp);
    for (let i = 0; i < self.length; i++) {
        self[i] = stabilized[i][0];
    }
    return self;
};


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(15);

class Keyboard extends __WEBPACK_IMPORTED_MODULE_0__base__["a" /* AbstractKeyboard */] {
    constructor(runtime) {
        super(runtime);
        document.addEventListener("keydown", (e) => {
            const keyCode = e.keyCode;
            if (Keyboard.PREVENT.includes(keyCode)) {
                e.preventDefault();
            }
            this.keys[keyCode].isPressed = true;
        });
        document.addEventListener("keyup", (e) => {
            const keyCode = e.keyCode;
            if (Keyboard.PREVENT.includes(keyCode)) {
                e.preventDefault();
            }
            this.keys[keyCode].isPressed = false;
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Keyboard;

Keyboard.PREVENT = [
    32,
    37,
    38,
    39,
    40,
];


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__task__ = __webpack_require__(1);

class AbstractKeyboard extends __WEBPACK_IMPORTED_MODULE_0__task__["b" /* TaskRunner */] {
    constructor(runtime) {
        super();
        this.keys = [];
        runtime.addTask(this.update.bind(this));
        for (let i = 0; i < AbstractKeyboard.KEY_COUNT; i++) {
            this.keys[i] = new Key(this, i);
        }
    }
    update() {
        this.runTasks();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AbstractKeyboard;

AbstractKeyboard.KEY_COUNT = 256;
class Key {
    constructor(keyboard, keyCode) {
        this.isPressed = false;
        this.framesDown = 0;
        keyboard.addTask(this.update.bind(this));
    }
    update() {
        if (this.isPressed) {
            this.framesDown++;
        }
        else {
            this.framesDown = 0;
        }
    }
    get justPressed() {
        return this.framesDown === 1;
    }
}
/* unused harmony export Key */



/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(6);

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
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vector__ = __webpack_require__(3);


// handles mouse events
// a simple "driver" for the mouse
// TODO: touchscreen support
// probably will use another "driver" that is compatible
class TouchscreenButton extends __WEBPACK_IMPORTED_MODULE_0__base__["b" /* BaseMouseButton */] {
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
class TouchscreenMouse extends __WEBPACK_IMPORTED_MODULE_0__base__["a" /* BaseMouse */] {
    constructor(runtime) {
        super(runtime);
        // only the left mouse button does stuff
        this.left = new TouchscreenButton(this);
        this.middle = new __WEBPACK_IMPORTED_MODULE_0__base__["c" /* EmptyMouseButton */]();
        this.right = new __WEBPACK_IMPORTED_MODULE_0__base__["c" /* EmptyMouseButton */]();
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
        return new __WEBPACK_IMPORTED_MODULE_1__vector__["a" /* Vector */](curleft - document.body.scrollLeft, curtop - document.body.scrollTop);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TouchscreenMouse;



/***/ }),
/* 18 */
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
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_sprites_imagesprite__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__saucer__ = __webpack_require__(8);


class BulletSprite extends __WEBPACK_IMPORTED_MODULE_0__engine_sprites_imagesprite__["a" /* ImageSprite */] {
    constructor(options) {
        super(options);
        this.addTask(this.move);
        this.addTask(this.collision);
    }
    collision() {
        for (const sprite of this.runtime.sprites) {
            if (!(sprite instanceof __WEBPACK_IMPORTED_MODULE_1__saucer__["a" /* SaucerSprite */])) {
                continue;
            }
            if (!this.intersects(sprite)) {
                continue;
            }
            this.runtime.score++;
            sprite.destroy();
            this.destroy();
            break;
        }
    }
    move() {
        const speed = BulletSprite.BASE_SPEED;
        this.y -= speed;
        if (this.y + this.height <= 0) {
            this.runtime.score--;
            this.destroy();
            return;
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BulletSprite;

BulletSprite.BASE_SPEED = 6;


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_sprites_imagesprite__ = __webpack_require__(5);

class RocketSprite extends __WEBPACK_IMPORTED_MODULE_0__engine_sprites_imagesprite__["a" /* ImageSprite */] {
    constructor(options) {
        super(options);
        this.xVelocity = 0;
        this.previousMouseX = 0;
        this.addTask(this.detectInputs);
        this.addTask(this.move);
    }
    detectInputs() {
        const rightPressed = this.runtime.keyboard.keys[39].isPressed;
        const leftPressed = this.runtime.keyboard.keys[37].isPressed;
        if (rightPressed) {
            this.xVelocity += RocketSprite.KB_MOVE_SPEED;
        }
        if (leftPressed) {
            this.xVelocity += -RocketSprite.KB_MOVE_SPEED;
        }
        this.xVelocity *= RocketSprite.KB_FRICTION;
    }
    move() {
        const mouseX = this.runtime.mouse.position.x;
        const mouseMoved = mouseX !== this.previousMouseX;
        if (mouseMoved) {
            this.xVelocity = 0;
            this.x = (this.x - (this.width / 2) + mouseX) / 2;
        }
        else {
            this.x += this.xVelocity;
        }
        if (this.x < 0) {
            this.x = 0;
            this.xVelocity = 0;
        }
        if (this.x + this.width > this.runtime.canvas.width) {
            this.x = this.runtime.canvas.width - this.width;
            this.xVelocity = 0;
        }
        this.previousMouseX = mouseX;
    }
    calculateEase(start, end) {
        return (start + end) / 2;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = RocketSprite;

RocketSprite.KB_MOVE_SPEED = 3;
RocketSprite.KB_FRICTION = 0.75;


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_sprites_textsprite__ = __webpack_require__(2);

class HighscoreTextSprite extends __WEBPACK_IMPORTED_MODULE_0__engine_sprites_textsprite__["a" /* TextSprite */] {
    constructor(options) {
        super(options);
        this.addTask(this.updateText);
    }
    updateText() {
        this.text = `Highscore: ${this.runtime.highscore}`;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = HighscoreTextSprite;



/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);

// TODO: implement
// should support inputting individual r, g, b colors
// inputting a hex code like #ABCDEF
// inputting a color name like black
class Color {
}
/* unused harmony export Color */

class RGBColor {
    constructor(r = 0, g = 0, b = 0) {
        this.red = r;
        this.green = g;
        this.blue = b;
    }
    toString() {
        return `#${Object(__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* toHex */])(this.red)}${Object(__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* toHex */])(this.green)}${Object(__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* toHex */])(this.red)}`;
    }
}
/* unused harmony export RGBColor */

class NamedColor {
    constructor(color) {
        this.color = color;
    }
    toString() {
        return this.color;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = NamedColor;



/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_sprites_textsprite__ = __webpack_require__(2);

class ScoreTextSprite extends __WEBPACK_IMPORTED_MODULE_0__engine_sprites_textsprite__["a" /* TextSprite */] {
    constructor(options) {
        super(options);
        this.addTask(this.updateText);
    }
    updateText() {
        this.text = `Score: ${this.runtime.score}`;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ScoreTextSprite;



/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getRandomInt;
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_sprites_textsprite__ = __webpack_require__(2);

class LivesTextSprite extends __WEBPACK_IMPORTED_MODULE_0__engine_sprites_textsprite__["a" /* TextSprite */] {
    constructor(options) {
        super(options);
        this.addTask(this.updateText);
    }
    updateText() {
        this.text = `Lives: ${this.runtime.lives}`;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LivesTextSprite;



/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_sprites_textsprite__ = __webpack_require__(2);

class GlobalHighscoreTextSprite extends __WEBPACK_IMPORTED_MODULE_0__engine_sprites_textsprite__["a" /* TextSprite */] {
    constructor(options) {
        super(options);
        this.addTask(this.updateText);
    }
    updateText() {
        this.text = `Global Highscore: ${this.runtime.globalHighscore}`;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GlobalHighscoreTextSprite;



/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_sprites_textsprite__ = __webpack_require__(2);

class GlobalHighscoreHolderTextSprite extends __WEBPACK_IMPORTED_MODULE_0__engine_sprites_textsprite__["a" /* TextSprite */] {
    constructor(options) {
        super(options);
        this.addTask(this.updateText);
    }
    updateText() {
        this.text = `Highscore Holder: ${this.runtime.globalHighscoreHolder}`;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GlobalHighscoreHolderTextSprite;



/***/ })
/******/ ]);