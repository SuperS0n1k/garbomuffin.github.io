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
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vector2d__ = __webpack_require__(9);

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
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const BLOCK_HEIGHT = 16;
/* harmony export (immutable) */ __webpack_exports__["a"] = BLOCK_HEIGHT;

const BLOCK_WIDTH = 16;
/* harmony export (immutable) */ __webpack_exports__["c"] = BLOCK_WIDTH;

const BLOCK_SIZE_SCALE = 2;
/* harmony export (immutable) */ __webpack_exports__["b"] = BLOCK_SIZE_SCALE;

const LEVEL_HEIGHT = 23;
/* unused harmony export LEVEL_HEIGHT */

const LEVEL_WIDTH = 30;
/* harmony export (immutable) */ __webpack_exports__["g"] = LEVEL_WIDTH;

const GRAVITY = 0.165;
/* harmony export (immutable) */ __webpack_exports__["e"] = GRAVITY;

const FRICTION = 0.8;
/* harmony export (immutable) */ __webpack_exports__["d"] = FRICTION;

const PLAYER_WALK_SPEED = 0.5;
/* harmony export (immutable) */ __webpack_exports__["h"] = PLAYER_WALK_SPEED;

const JUMP_VELOCITY = 4.75;
/* harmony export (immutable) */ __webpack_exports__["f"] = JUMP_VELOCITY;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_sprites_imagesprite__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(1);


class Block extends __WEBPACK_IMPORTED_MODULE_0__engine_sprites_imagesprite__["a" /* ImageSprite */] {
    constructor(opts) {
        super(opts);
        this.solid = false;
        this.runtime.blocks.push(this);
    }
    groundedCenterAlign() {
        this.x -= (__WEBPACK_IMPORTED_MODULE_1__config__["c" /* BLOCK_WIDTH */] - this.width) / 2;
        this.x = Math.floor(this.x);
        this.y += __WEBPACK_IMPORTED_MODULE_1__config__["a" /* BLOCK_HEIGHT */] - this.height;
        this.y = Math.floor(this.y);
    }
    centerAlign() {
        this.x += (__WEBPACK_IMPORTED_MODULE_1__config__["c" /* BLOCK_WIDTH */] - this.width) / 2;
        this.x = Math.floor(this.x);
        this.y += (__WEBPACK_IMPORTED_MODULE_1__config__["a" /* BLOCK_HEIGHT */] - this.height) / 2;
        this.y = Math.floor(this.y);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Block;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(4);
// Tasks and TaskRunners

// a task is something to be run at a certain time, maybe repeating
class Task {
    constructor(options) {
        const runnable = options.run;
        const delay = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* getOrDefault */])(options.delay, 0);
        const repeatEvery = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* getOrDefault */])(options.repeatEvery, -1);
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
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = isMobile;
/* harmony export (immutable) */ __webpack_exports__["b"] = getOrDefault;
/* harmony export (immutable) */ __webpack_exports__["d"] = toHex;
/* unused harmony export radiansToDegree */
/* harmony export (immutable) */ __webpack_exports__["a"] = degreeToRadians;
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
function radiansToDegree(rad) {
    return rad * 180 / Math.PI;
}
function degreeToRadians(deg) {
    return deg * Math.PI / 180;
}


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sprite__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(4);


// NIGHTLIGHT: images are imported from scratch which has things at 2x actual res
const TEXTURE_SCALE = 2;
class ImageSprite extends __WEBPACK_IMPORTED_MODULE_0__sprite__["a" /* AbstractSprite */] {
    constructor(options) {
        super(options);
        this.texture = options.texture;
        this.width = Object(__WEBPACK_IMPORTED_MODULE_1__utils__["b" /* getOrDefault */])(options.width, this.texture.width / TEXTURE_SCALE);
        this.height = Object(__WEBPACK_IMPORTED_MODULE_1__utils__["b" /* getOrDefault */])(options.height, this.texture.height / TEXTURE_SCALE);
        this.rotation = Object(__WEBPACK_IMPORTED_MODULE_1__utils__["b" /* getOrDefault */])(options.rotation, 0);
        this.opacity = Object(__WEBPACK_IMPORTED_MODULE_1__utils__["b" /* getOrDefault */])(options.opacity, 1);
    }
    render(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        if (this.rotation !== 0) {
            // terrible code
            // rotation is difficult
            // https://stackoverflow.com/a/4650102
            const translateX = this.x + this.width / 2;
            const translateY = this.y + this.height / 2;
            ctx.translate(translateX, translateY);
            ctx.rotate(Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* degreeToRadians */])(this.rotation));
            ctx.translate(-translateX, -translateY);
        }
        ctx.scale(this.scale.x, this.scale.y);
        ctx.drawImage(this.texture, this.x, this.y, this.width, this.height);
        ctx.restore();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ImageSprite;



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vector2d__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__task__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__(1);




class AbstractSprite extends __WEBPACK_IMPORTED_MODULE_1__task__["b" /* TaskRunner */] {
    constructor(options) {
        super();
        this.runtime = AbstractSprite.runtime;
        this.position = options.position;
        this.width = Object(__WEBPACK_IMPORTED_MODULE_2__utils__["b" /* getOrDefault */])(options.width, 0);
        this.height = Object(__WEBPACK_IMPORTED_MODULE_2__utils__["b" /* getOrDefault */])(options.height, 0);
        this.scale = Object(__WEBPACK_IMPORTED_MODULE_2__utils__["b" /* getOrDefault */])(options.scale, new __WEBPACK_IMPORTED_MODULE_0__vector2d__["a" /* Vector2D */](1, 1));
        this.persistent = Object(__WEBPACK_IMPORTED_MODULE_2__utils__["b" /* getOrDefault */])(options.persistent, false);
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
    intersects(thing) {
        if (thing instanceof AbstractSprite) {
            return this.x < thing.x + thing.width &&
                this.x + this.width > thing.x &&
                this.y < thing.y + thing.height &&
                this.y + this.height > thing.y;
        }
        else {
            for (const sprite of thing) {
                if (this.intersects(sprite)) {
                    return true;
                }
            }
            return false;
        }
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
    //
    // Nightlight related code
    //
    runBasicPhysics(xv, yv, options = {}) {
        options.collision = Object(__WEBPACK_IMPORTED_MODULE_2__utils__["b" /* getOrDefault */])(options.collision, true);
        options.inAirFriction = Object(__WEBPACK_IMPORTED_MODULE_2__utils__["b" /* getOrDefault */])(options.inAirFriction, true);
        options.restrictValues = Object(__WEBPACK_IMPORTED_MODULE_2__utils__["b" /* getOrDefault */])(options.restrictValues, true);
        this.x += xv;
        if (this.handleCollision(true)) {
            xv = 0;
        }
        if (options.restrictValues) {
            if (this.x < 0) {
                this.x = 0;
                xv = 0;
            }
            if (this.x + this.width > this.runtime.canvas.width) {
                this.x = this.runtime.canvas.width - this.width;
                xv = 0;
            }
        }
        let onGround = false;
        this.y -= yv;
        if (this.handleCollision(false)) {
            if (yv < 0) {
                onGround = true;
            }
            yv = 0;
        }
        // TODO: nightlight uses a different friction implementation
        if (options.inAirFriction || onGround) {
            xv *= __WEBPACK_IMPORTED_MODULE_3__config__["d" /* FRICTION */];
        }
        yv -= __WEBPACK_IMPORTED_MODULE_3__config__["e" /* GRAVITY */];
        return {
            xv, yv, onGround,
        };
    }
    handleCollision(horizontal) {
        for (const block of this.runtime.blocks) {
            if (this.intersects(block) && block.solid) {
                block.handleIntersect(this, horizontal);
                return true;
            }
        }
        return false;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AbstractSprite;



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__3rd_party_stableSort__ = __webpack_require__(16);
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
    get length() {
        return this.sprites.length;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Container;



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vector__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__task__ = __webpack_require__(3);


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
/* 9 */
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
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block__ = __webpack_require__(2);

class SolidBlock extends __WEBPACK_IMPORTED_MODULE_0__block__["a" /* Block */] {
    constructor() {
        super(...arguments);
        this.solid = true;
    }
    handleIntersect(sprite, horizontal) {
        if (horizontal) {
            if (sprite.x > this.x) {
                sprite.x = this.x + sprite.width;
            }
            else {
                sprite.x = this.x - sprite.width;
            }
        }
        else {
            if (sprite.y < this.y) {
                sprite.y = this.y - sprite.height;
            }
            else {
                sprite.y = this.y + sprite.height;
            }
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SolidBlock;



/***/ }),
/* 11 */
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
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(1);


class GrassBlock extends __WEBPACK_IMPORTED_MODULE_0__block__["a" /* Block */] {
    constructor(opts) {
        super(opts);
        this.y += __WEBPACK_IMPORTED_MODULE_1__config__["a" /* BLOCK_HEIGHT */];
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GrassBlock;



/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(14);

const game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* Nightlight */]();
// add in all of our assets
game.addAsset("player/idle");
game.addAsset("fragments/1");
game.addAsset("fragments/2");
game.addAsset("fragments/3");
game.addAsset("fragments/4");
game.addAsset("fragments/5");
game.addAsset("coin/1");
// game.addAsset("coin/2");
// game.addAsset("coin/3");
// game.addAsset("coin/4");
game.addAsset("blocks/a");
game.addAsset("blocks/b");
game.addAsset("blocks/c");
game.addAsset("blocks/d");
game.addAsset("blocks/e");
game.addAsset("blocks/f");
game.addAsset("blocks/g");
game.addAsset("blocks/h");
game.addAsset("blocks/i");
game.addAsset("blocks/j");
game.addAsset("blocks/k");
game.addAsset("blocks/l");
game.addAsset("blocks/m");
game.addAsset("blocks/n");
game.addAsset("blocks/o");
game.addAsset("blocks/p");
game.addAsset("blocks/q");
game.addAsset("blocks/r");
// game.addAsset("blocks/s");
// game.addAsset("blocks/t");
// game.addAsset("blocks/u");
// game.addAsset("blocks/v");
// game.addAsset("blocks/w");
// game.addAsset("blocks/x");
// game.addAsset("blocks/y");
// game.addAsset("blocks/z");
// wait for it to load then run our stuff
game.waitForAssets().then(run);
function run() {
    game.start();
}


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_runtime__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__levels_levels__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sprites_player_player__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__engine_vector__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__blockmap__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sprites_blocks_solid__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__config__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__engine_container__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__sprites_star__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__utils__ = __webpack_require__(11);










class Nightlight extends __WEBPACK_IMPORTED_MODULE_0__engine_runtime__["a" /* GameRuntime */] {
    constructor() {
        super(document.getElementById("canvas"));
        this.level = 0;
        this.backgroundColor = "black";
        this.blocks = new __WEBPACK_IMPORTED_MODULE_7__engine_container__["a" /* Container */]();
    }
    start() {
        super.start();
        this.createPlayer();
        this.createStarBackground();
        this.renderLevel();
    }
    createPlayer() {
        this.player = new __WEBPACK_IMPORTED_MODULE_2__sprites_player_player__["a" /* PlayerSprite */]({
            texture: this.getAsset("player/idle"),
            position: new __WEBPACK_IMPORTED_MODULE_3__engine_vector__["a" /* Vector */](0, 0, 10),
            width: __WEBPACK_IMPORTED_MODULE_6__config__["c" /* BLOCK_WIDTH */],
            height: __WEBPACK_IMPORTED_MODULE_6__config__["a" /* BLOCK_HEIGHT */],
            persistent: true,
        });
    }
    createStarBackground() {
        for (let i = 0; i < 50; i++) {
            const x = Object(__WEBPACK_IMPORTED_MODULE_9__utils__["a" /* getRandomInt */])(0, this.canvas.width);
            const y = Object(__WEBPACK_IMPORTED_MODULE_9__utils__["a" /* getRandomInt */])(0, this.canvas.height);
            new __WEBPACK_IMPORTED_MODULE_8__sprites_star__["a" /* BackgroundStarSprite */]({
                position: new __WEBPACK_IMPORTED_MODULE_3__engine_vector__["a" /* Vector */](x, y, -10),
                width: 2,
                height: 2,
                persistent: true,
            });
        }
    }
    destroyLevel() {
        // a normal for loop won't work because we are modifying the list mid loop
        for (let i = 0; i < this.sprites.length;) {
            const sprite = this.sprites.sprites[i];
            if (sprite.persistent) {
                i++;
            }
            else {
                sprite.destroy();
            }
        }
    }
    renderLevel(level = this.level) {
        this.destroyLevel();
        const levelData = __WEBPACK_IMPORTED_MODULE_1__levels_levels__["a" /* Levels */][level];
        this.levelData = levelData;
        let x = 0;
        let y = this.canvas.height - __WEBPACK_IMPORTED_MODULE_6__config__["a" /* BLOCK_HEIGHT */];
        const createBlock = (position, char, index) => {
            const blockType = __WEBPACK_IMPORTED_MODULE_4__blockmap__["a" /* blockMap */][char];
            let spriteConstructor;
            let texture;
            if (typeof blockType === "undefined") {
                console.warn("skipping block", char);
                return;
            }
            else if (typeof blockType === "string") {
                texture = this.getAsset(blockType);
                spriteConstructor = __WEBPACK_IMPORTED_MODULE_5__sprites_blocks_solid__["a" /* SolidBlock */];
            }
            else {
                texture = this.getAsset(blockType.texture);
                spriteConstructor = blockType.type;
            }
            const opts = {
                width: texture.width / __WEBPACK_IMPORTED_MODULE_6__config__["b" /* BLOCK_SIZE_SCALE */],
                height: texture.height / __WEBPACK_IMPORTED_MODULE_6__config__["b" /* BLOCK_SIZE_SCALE */],
                position,
                texture,
                levelIndex: index,
            };
            new spriteConstructor(opts);
        };
        for (let i = 0; i < levelData.length; i++) {
            const char = levelData[i];
            if (char !== ".") {
                const position = new __WEBPACK_IMPORTED_MODULE_3__engine_vector__["a" /* Vector */](x, y);
                createBlock(position, char, i);
            }
            x += __WEBPACK_IMPORTED_MODULE_6__config__["c" /* BLOCK_WIDTH */];
            if (x >= this.canvas.width) {
                x = 0;
                y -= __WEBPACK_IMPORTED_MODULE_6__config__["a" /* BLOCK_HEIGHT */];
            }
        }
        this.player.reset();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Nightlight;



/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__container__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__drivers_keyboard_keyboard__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__drivers_mouse_mouse__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__drivers_mouse_touchscreen__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__errors_exit__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sprite__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__task__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__utils__ = __webpack_require__(4);








const CANVAS_WIDTH = 480;
const CANVAS_HEIGHT = 360;
// this is the main game runtime object
// rendering is done here
// a lot of stuff is done here
class GameRuntime extends __WEBPACK_IMPORTED_MODULE_6__task__["b" /* TaskRunner */] {
    constructor(canvas) {
        super();
        // see resetVariables()
        this.assets = new Map();
        this.containers = [];
        this.frames = 0;
        this.backgroundColor = "white";
        this._assetPromises = [];
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        // mouse driver, support pc and mobile to some degree
        if (!Object(__WEBPACK_IMPORTED_MODULE_7__utils__["c" /* isMobile */])()) {
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
        this.frames++;
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
        this.ctx.fillStyle = this.backgroundColor;
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
/* 16 */
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
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(18);

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
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__task__ = __webpack_require__(3);

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
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(8);

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
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vector__ = __webpack_require__(0);


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
/* 21 */
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
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const Levels = [
    "eaaaaaaaaafeaaaafeaaaaaaaaaaaaeaaaaaaaaafbccccdeaaaaaaaaaaaaeaaaaaaaaafooooooeaaaaaaaaaaaaeaaaaaaaaaf......eaaaaaaaaaaaaeaaaaaaaaaf......eaaaaaaaaaaaabcccccccccd......bcccmaaaaaaaajkpppkkpqkl......jkqpeaaaaaaaa.....................eaaaaaaaa.....................eamccccnc.....................bcdkpkq.k.....................qpl..............................................................................................................................................................................................................................................................................................................................................................................",
    "aaaaaaaaaafr.r.r.r.r.r.eaaaaaaaaaaaaaaaafo.o.o.o.o.o.eaaaaaaaaaaaaaaaaf............eaaaaaaaaaaaaaaaaf............eaaaaaaaaaaaaaaaaf............eaaaaaaaaaaaaaaaaf.gi.........eaaaaaaaaaaaaaaaaf.jl.........eaaaaaaaaaaaaaaaaf.......gi...eaaaaaaccccccccccd.......jl...eaaaaaaqkkpkpqqkkl...........gmaaaaaa.....................gmaaaaaaa.....................bcmaaaaaa.....................kqeaaaaaa............ghhhhi.....eaaaaaa............jpqqkl.....eaaaaaa......ghi..............eaaaaaa......qkp..............eaaaaaa.......................eaaaaaa.............ghhhhi....bccnccc.............jqkkpl....pkq.kqk..........................................................................................",
];
/* harmony export (immutable) */ __webpack_exports__["a"] = Levels;



/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_sprites_imagesprite__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__blocks_solid__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__fragment__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__engine_vector__ = __webpack_require__(0);






const FRAGMENT_COUNT = 5;
const FRAGMENT_XV_RANGE = 1;
const FRAGMENT_YV_MIN = 3;
const FRAGMENT_YV_MAX = 5;
const FRAGMENT_RV_RANGE = 10;
const FRAGMENT_TEXTURES = 5;
class PlayerSprite extends __WEBPACK_IMPORTED_MODULE_0__engine_sprites_imagesprite__["a" /* ImageSprite */] {
    constructor(opts) {
        super(opts);
        this.yv = 0;
        this.xv = 0;
        this._jumpMonitorLastYv = 0;
        this._jumpMonitorStart = 0;
        this._jumpMonitorStarted = false;
        this.addTask(this.run);
        this.addTask(this.jumpMonitor);
    }
    jumpMonitor() {
        if (this.yv < this._jumpMonitorLastYv && !this._jumpMonitorStarted) {
            this._jumpMonitorStarted = true;
            this._jumpMonitorStart = this.runtime.frames;
            console.log("jump start");
        }
        if (this.yv > this._jumpMonitorLastYv && this._jumpMonitorStarted) {
            this._jumpMonitorStarted = false;
            const length = this.runtime.frames - this._jumpMonitorStart;
            console.log("jump end", length);
        }
        this._jumpMonitorLastYv = this.yv;
    }
    handleInputs(onGround) {
        const keys = this.runtime.keyboard.keys;
        const rightDown = keys[39].isPressed;
        const leftDown = keys[37].isPressed;
        const upPressed = keys[38].isPressed;
        if (rightDown && !leftDown) {
            this.xv += __WEBPACK_IMPORTED_MODULE_2__config__["h" /* PLAYER_WALK_SPEED */];
        }
        if (leftDown && !rightDown) {
            this.xv -= __WEBPACK_IMPORTED_MODULE_2__config__["h" /* PLAYER_WALK_SPEED */];
        }
        if (upPressed && onGround) {
            this.yv = __WEBPACK_IMPORTED_MODULE_2__config__["f" /* JUMP_VELOCITY */];
        }
        else if (!upPressed && this.yv > 3) {
            this.yv = 3;
        }
    }
    run() {
        const physicsResult = this.runBasicPhysics(this.xv, this.yv);
        this.xv = physicsResult.xv;
        this.yv = physicsResult.yv;
        this.handleInputs(physicsResult.onGround);
    }
    reset() {
        this.position.x = 40;
        this.position.y = this.runtime.canvas.height - __WEBPACK_IMPORTED_MODULE_2__config__["a" /* BLOCK_HEIGHT */];
        while (this.intersects(this.runtime.blocks.sprites.filter((s) => s instanceof __WEBPACK_IMPORTED_MODULE_1__blocks_solid__["a" /* SolidBlock */]))) {
            this.y -= __WEBPACK_IMPORTED_MODULE_2__config__["a" /* BLOCK_HEIGHT */];
        }
    }
    kill() {
        for (let i = 0; i < FRAGMENT_COUNT; i++) {
            new __WEBPACK_IMPORTED_MODULE_3__fragment__["a" /* PlayerFragmentSprite */]({
                position: new __WEBPACK_IMPORTED_MODULE_5__engine_vector__["a" /* Vector */](this.position),
                texture: this.runtime.getAsset(`fragments/${Object(__WEBPACK_IMPORTED_MODULE_4__utils__["a" /* getRandomInt */])(1, FRAGMENT_TEXTURES)}`),
                xv: Object(__WEBPACK_IMPORTED_MODULE_4__utils__["a" /* getRandomInt */])(-FRAGMENT_XV_RANGE * 1000, FRAGMENT_XV_RANGE * 1000) / 1000,
                yv: Object(__WEBPACK_IMPORTED_MODULE_4__utils__["a" /* getRandomInt */])(FRAGMENT_YV_MIN * 1000, FRAGMENT_YV_MAX * 1000) / 1000,
                rv: Object(__WEBPACK_IMPORTED_MODULE_4__utils__["a" /* getRandomInt */])(-FRAGMENT_RV_RANGE * 1000, FRAGMENT_RV_RANGE * 1000) / 1000,
            });
        }
        this.reset();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PlayerSprite;



/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_sprites_imagesprite__ = __webpack_require__(5);

const LIFESPAN = 300;
const GHOST_RATE = 0.03;
class PlayerFragmentSprite extends __WEBPACK_IMPORTED_MODULE_0__engine_sprites_imagesprite__["a" /* ImageSprite */] {
    constructor(opts) {
        super(opts);
        this.xv = 0;
        this.yv = 0;
        this.rv = 0;
        this.lifespan = 0;
        this.xv = opts.xv;
        this.yv = opts.yv;
        this.rv = opts.rv;
        this.addTask(this.run);
    }
    run() {
        this.lifespan++;
        const physicsResult = this.runBasicPhysics(this.xv, this.yv, {
            inAirFriction: false,
        });
        this.xv = physicsResult.xv;
        this.yv = physicsResult.yv;
        if (physicsResult.onGround) {
            this.rv *= 0.5;
        }
        this.rotation += this.rv;
        if (this.lifespan >= LIFESPAN) {
            this.opacity -= GHOST_RATE;
        }
        if (this.opacity < 0) {
            this.destroy();
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PlayerFragmentSprite;



/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sprites_blocks_grass__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sprites_blocks_spike__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sprites_blocks_corner__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sprites_blocks_tallgrass__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sprites_blocks_coinspawner__ = __webpack_require__(29);





function special(type, texture) {
    return {
        type, texture,
    };
}
const blockMap = {
    a: "blocks/a",
    b: "blocks/b",
    c: "blocks/c",
    d: "blocks/d",
    e: "blocks/e",
    f: "blocks/f",
    g: "blocks/g",
    h: "blocks/h",
    i: "blocks/i",
    j: special(__WEBPACK_IMPORTED_MODULE_0__sprites_blocks_grass__["a" /* GrassBlock */], "blocks/j"),
    k: special(__WEBPACK_IMPORTED_MODULE_0__sprites_blocks_grass__["a" /* GrassBlock */], "blocks/k"),
    l: special(__WEBPACK_IMPORTED_MODULE_0__sprites_blocks_grass__["a" /* GrassBlock */], "blocks/l"),
    m: special(__WEBPACK_IMPORTED_MODULE_2__sprites_blocks_corner__["a" /* CornerBlock */], "blocks/m"),
    n: special(__WEBPACK_IMPORTED_MODULE_4__sprites_blocks_coinspawner__["a" /* LevelUpCoinSpawnerBlock */], "blocks/n"),
    o: special(__WEBPACK_IMPORTED_MODULE_1__sprites_blocks_spike__["a" /* SpikeBlock */], "blocks/o"),
    p: special(__WEBPACK_IMPORTED_MODULE_3__sprites_blocks_tallgrass__["a" /* TallGrassBlock */], "blocks/p"),
    q: special(__WEBPACK_IMPORTED_MODULE_3__sprites_blocks_tallgrass__["a" /* TallGrassBlock */], "blocks/q"),
    r: "blocks/r",
};
/* harmony export (immutable) */ __webpack_exports__["a"] = blockMap;



/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block__ = __webpack_require__(2);

class SpikeBlock extends __WEBPACK_IMPORTED_MODULE_0__block__["a" /* Block */] {
    constructor(opts) {
        super(opts);
        this.addTask(this.run);
    }
    run() {
        if (this.intersects(this.runtime.player)) {
            this.runtime.player.kill();
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SpikeBlock;



/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__engine_sprites_imagesprite__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__engine_vector__ = __webpack_require__(0);




const AIR = [
    ".",
    "l", "k", "j",
    "p", "q",
];
class CornerBlock extends __WEBPACK_IMPORTED_MODULE_0__block__["a" /* Block */] {
    constructor(opts) {
        super(opts);
        this.levelIndex = opts.levelIndex || 0;
        // black background
        new __WEBPACK_IMPORTED_MODULE_0__block__["a" /* Block */](Object.assign({}, opts, { texture: this.runtime.getAsset("blocks/a"), position: new __WEBPACK_IMPORTED_MODULE_3__engine_vector__["a" /* Vector */](this.x, this.y, -1) }));
        this.testCorner(__WEBPACK_IMPORTED_MODULE_1__config__["g" /* LEVEL_WIDTH */] - 1, -90, 0, 0);
        this.testCorner(__WEBPACK_IMPORTED_MODULE_1__config__["g" /* LEVEL_WIDTH */] + 1, 0, 1, 0);
        this.testCorner(-__WEBPACK_IMPORTED_MODULE_1__config__["g" /* LEVEL_WIDTH */] - 1, 180, 0, 1);
        this.testCorner(-__WEBPACK_IMPORTED_MODULE_1__config__["g" /* LEVEL_WIDTH */] + 1, -180, 1, 1);
        // the intent of a cornersprite is to create sprites
        // it itself does not do anything else so delete it
        this.destroy();
    }
    testCorner(offset, rotation, x, y) {
        const charAtOffset = this.runtime.levelData[this.levelIndex + offset];
        const isAir = AIR.includes(charAtOffset);
        if (isAir) {
            const position = new __WEBPACK_IMPORTED_MODULE_3__engine_vector__["a" /* Vector */](this.x + x * (__WEBPACK_IMPORTED_MODULE_1__config__["c" /* BLOCK_WIDTH */] / 2), this.y + y * (__WEBPACK_IMPORTED_MODULE_1__config__["a" /* BLOCK_HEIGHT */] / 2));
            new __WEBPACK_IMPORTED_MODULE_2__engine_sprites_imagesprite__["a" /* ImageSprite */]({
                position,
                texture: this.texture,
                rotation,
            });
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CornerBlock;



/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__grass__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__engine_vector__ = __webpack_require__(0);



class TallGrassBlock extends __WEBPACK_IMPORTED_MODULE_0__block__["a" /* Block */] {
    constructor(opts) {
        super(opts);
        new __WEBPACK_IMPORTED_MODULE_1__grass__["a" /* GrassBlock */]({
            position: new __WEBPACK_IMPORTED_MODULE_2__engine_vector__["a" /* Vector */](opts.position),
            texture: this.runtime.getAsset("blocks/k"),
        });
        this.groundedCenterAlign();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TallGrassBlock;



/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__coin__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__engine_vector__ = __webpack_require__(0);




class LevelUpCoinSpawnerBlock extends __WEBPACK_IMPORTED_MODULE_0__block__["a" /* Block */] {
    constructor(opts) {
        super(opts);
        const position = new __WEBPACK_IMPORTED_MODULE_3__engine_vector__["a" /* Vector */](this.x, this.y - __WEBPACK_IMPORTED_MODULE_2__config__["a" /* BLOCK_HEIGHT */]);
        new __WEBPACK_IMPORTED_MODULE_1__coin__["a" /* LevelUpCoinSprite */]({
            position,
            texture: this.runtime.getAsset("coin/1"),
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LevelUpCoinSpawnerBlock;



/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__blocks_block__ = __webpack_require__(2);

// Extends block rather than ImageSprite to use some more utility methods
class LevelUpCoinSprite extends __WEBPACK_IMPORTED_MODULE_0__blocks_block__["a" /* Block */] {
    constructor(opts) {
        super(opts);
        this.centerAlign();
        this.addTask(this.run);
    }
    run() {
        const touchingPlayer = this.intersects(this.runtime.player);
        if (touchingPlayer) {
            this.runtime.level++;
            this.runtime.renderLevel();
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LevelUpCoinSprite;



/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_sprite__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__engine_task__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__engine_utils__ = __webpack_require__(4);



const UPDATE_EVERY = 6;
const ANIMATION_LENGTH = 10;
class BackgroundStarSprite extends __WEBPACK_IMPORTED_MODULE_0__engine_sprite__["a" /* AbstractSprite */] {
    constructor(opts) {
        super(opts);
        this.progress = 0;
        this.direction = 1;
        this.animate = this.animate.bind(this);
        this.addTask(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
            repeatEvery: UPDATE_EVERY,
            run: this.animate,
        }));
    }
    animate() {
        this.progress += this.direction;
        if (this.progress === 0 && this.direction === -1) {
            this.direction = 1;
            this.progress--;
        }
        if (this.progress === ANIMATION_LENGTH && this.direction === 1) {
            this.direction = -1;
            this.progress++;
        }
    }
    clamp(x, min, max) {
        if (x < min) {
            return min;
        }
        else if (x > max) {
            return max;
        }
        else {
            return x;
        }
    }
    render(ctx) {
        const animationProgress = this.clamp(this.progress / ANIMATION_LENGTH, 0, 1);
        const color = Math.floor(255 * animationProgress);
        const hexCode = Object(__WEBPACK_IMPORTED_MODULE_2__engine_utils__["d" /* toHex */])(color);
        // console.log(animationProgress);
        ctx.fillStyle = `#${hexCode}${hexCode}${hexCode}`;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BackgroundStarSprite;



/***/ })
/******/ ]);