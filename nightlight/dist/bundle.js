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
/******/ 	return __webpack_require__(__webpack_require__.s = 20);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vector2d__ = __webpack_require__(9);

/*
 * A 3D Vector: (x, y, z)
 *
 * z is optional when creating Vectors
 */
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__engine_sprites_imagesprite__ = __webpack_require__(4);


class Block extends __WEBPACK_IMPORTED_MODULE_1__engine_sprites_imagesprite__["a" /* ImageSprite */] {
    constructor(opts) {
        super(opts);
        this.solid = false;
        this.runtime.blocks.push(this);
    }
    // Ugly duplication but it works
    // Align the sprite to the floor and centered horizontally
    floorAlign() {
        this.centerAlign(true, false);
        this.y += __WEBPACK_IMPORTED_MODULE_0__config__["a" /* BLOCK_HEIGHT */] - this.height;
        this.y = Math.floor(this.y);
    }
    // Align the sprite to the left and centered vertically
    leftAlign() {
        this.centerAlign(false, true);
        this.x += __WEBPACK_IMPORTED_MODULE_0__config__["b" /* BLOCK_WIDTH */] - this.width;
        this.x = Math.floor(this.x);
    }
    // Center the sprite
    centerAlign(centerX = true, centerY = true) {
        if (centerX) {
            this.x += (__WEBPACK_IMPORTED_MODULE_0__config__["b" /* BLOCK_WIDTH */] - this.width) / 2;
            this.x = Math.floor(this.x);
        }
        if (centerY) {
            this.y += (__WEBPACK_IMPORTED_MODULE_0__config__["a" /* BLOCK_HEIGHT */] - this.height) / 2;
            this.y = Math.floor(this.y);
        }
    }
    /**
     * Moves the sprite off of this block
     * Return values:
     * true or undefined - collision handled
     * false - collision was not handled, this is used by other blocks that replace this method
     */
    handleIntersect(sprite, velocity, horizontal) {
        if (horizontal) {
            if (velocity > 0) {
                sprite.x = this.x - sprite.width;
            }
            else if (velocity < 0) {
                sprite.x = this.x + this.width;
            }
        }
        else {
            if (velocity > 0) {
                sprite.y = this.y + this.height;
            }
            else if (velocity < 0) {
                sprite.y = this.y - sprite.height;
            }
        }
        return true;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Block;

// Block with solid = true by default
// Note that just because solid = true does not actually mean it is solid, just likely that it is solid
// Some blocks extend this then in handleIntersect have special behavior
class SolidBlock extends Block {
    constructor() {
        super(...arguments);
        this.solid = true;
    }
}
/* harmony export (immutable) */ __webpack_exports__["c"] = SolidBlock;

// Block with solid = true and staic = true by default
// Setting static = true can greatly improve performance by not rendering things more than they need to be
class StaticSolidBlock extends SolidBlock {
    constructor() {
        super(...arguments);
        this.static = true;
    }
}
/* harmony export (immutable) */ __webpack_exports__["d"] = StaticSolidBlock;

// Block that is solid but doesn't handle intersecting
// Used for blocks that shouldn't be solid but needed for player.reset() to work
class PseudoSolidBlock extends StaticSolidBlock {
    handleIntersect() {
        return false;
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = PseudoSolidBlock;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(5);

// a task is something to be run at a certain time, maybe repeating
class Task {
    constructor(options) {
        this.repeatCount = 0;
        const runnable = options.run;
        const delay = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* getOrDefault */])(options.delay, 0);
        const repeatEvery = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* getOrDefault */])(options.repeatEvery, -1);
        const repeatMax = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* getOrDefault */])(options.repeatMax, Infinity);
        this.originalOptions = options;
        this.runnable = runnable;
        this.delay = delay;
        this.repeatEvery = repeatEvery;
        this.repeatMax = repeatMax;
    }
    run() {
        // pass this task to the function so that it can call things like task.stop();
        this.runnable(this);
    }
    stop() {
        this.delay = -1;
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
                task.repeatCount++;
                if (task.delay === -1) {
                    // called task.stop();
                }
                else if (task.repeatEvery >= 0 && task.repeatCount < task.repeatMax) {
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
        this._tasks = this._tasks.filter((task) => task.delay !== -1);
    }
    resetTasks() {
        this._tasks = [];
    }
    stopAllTasks() {
        for (const task of this._tasks) {
            task.stop();
        }
    }
    // add a task
    // can either be a task or a function
    // if it is a task it is added as you would expect
    // if it is a function it will repeat every frame
    addTask(task) {
        if (typeof task === "function") {
            return this.addTask(new Task({
                run: task,
                repeatEvery: 0,
            }));
        }
        else {
            this._tasks.push(task);
            return task;
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = TaskRunner;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*
 * Config values that are global to the whole game
 * Options to one specific thing are in its file
 */
const BLOCK_HEIGHT = 16;
/* harmony export (immutable) */ __webpack_exports__["a"] = BLOCK_HEIGHT;

const BLOCK_WIDTH = 16;
/* harmony export (immutable) */ __webpack_exports__["b"] = BLOCK_WIDTH;

const LEVEL_HEIGHT = 23;
/* unused harmony export LEVEL_HEIGHT */

const LEVEL_WIDTH = 30;
/* harmony export (immutable) */ __webpack_exports__["e"] = LEVEL_WIDTH;

const GRAVITY = 0.195;
/* harmony export (immutable) */ __webpack_exports__["d"] = GRAVITY;

const FRICTION = 0.75;
/* harmony export (immutable) */ __webpack_exports__["c"] = FRICTION;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sprite__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(5);


class ImageSprite extends __WEBPACK_IMPORTED_MODULE_0__sprite__["a" /* AbstractSprite */] {
    constructor(options) {
        super(options);
        this.texture = options.texture;
        this.width = Object(__WEBPACK_IMPORTED_MODULE_1__utils__["b" /* getOrDefault */])(options.width, this.texture.width);
        this.height = Object(__WEBPACK_IMPORTED_MODULE_1__utils__["b" /* getOrDefault */])(options.height, this.texture.height);
        this.rotation = Object(__WEBPACK_IMPORTED_MODULE_1__utils__["b" /* getOrDefault */])(options.rotation, 0);
        this.opacity = Object(__WEBPACK_IMPORTED_MODULE_1__utils__["b" /* getOrDefault */])(options.opacity, 1);
    }
    render(ctx) {
        if (!this.visible) {
            return;
        }
        ctx.save();
        this._setRenderValues(ctx);
        const x = this.x;
        const y = this.y;
        ctx.drawImage(this.texture, x, y, this.width, this.height);
        ctx.restore();
    }
    updateDimensions() {
        this.width = this.texture.width;
        this.height = this.texture.height;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ImageSprite;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = isMobile;
/* harmony export (immutable) */ __webpack_exports__["b"] = getOrDefault;
/* harmony export (immutable) */ __webpack_exports__["e"] = toHex;
/* harmony export (immutable) */ __webpack_exports__["d"] = radiansToDegree;
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
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = getRandomInt;
/* harmony export (immutable) */ __webpack_exports__["b"] = clone;
/* harmony export (immutable) */ __webpack_exports__["d"] = scratchCoordinate;
/* harmony export (immutable) */ __webpack_exports__["a"] = clamp;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_vector__ = __webpack_require__(0);

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Clones an array
// Allows you to use inplace methods on an array without changing the actual array
// (eg. sort)
function clone(array) {
    let i = array.length;
    const result = [];
    while (i--) {
        result[i] = array[i];
    }
    return result;
}
// Converts Scratch coordinates to coordinates this game will understand
function scratchCoordinate(x, y) {
    return new __WEBPACK_IMPORTED_MODULE_0__engine_vector__["a" /* Vector */](x + 236, (360 - y) - 184);
}
function clamp(x, min, max) {
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


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__task__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__vector__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__vector2d__ = __webpack_require__(9);





class AbstractSprite extends __WEBPACK_IMPORTED_MODULE_1__task__["b" /* TaskRunner */] {
    constructor(options) {
        super();
        this.runtime = AbstractSprite.runtime;
        // disable pass by reference for positions
        if (options.position instanceof __WEBPACK_IMPORTED_MODULE_3__vector__["a" /* Vector */]) {
            this.position = new __WEBPACK_IMPORTED_MODULE_3__vector__["a" /* Vector */](options.position);
        }
        else {
            this.position = options.position;
        }
        this.width = Object(__WEBPACK_IMPORTED_MODULE_2__utils__["b" /* getOrDefault */])(options.width, 0);
        this.height = Object(__WEBPACK_IMPORTED_MODULE_2__utils__["b" /* getOrDefault */])(options.height, 0);
        this.scale = Object(__WEBPACK_IMPORTED_MODULE_2__utils__["b" /* getOrDefault */])(options.scale, new __WEBPACK_IMPORTED_MODULE_4__vector2d__["a" /* Vector2D */](1, 1));
        this.persistent = Object(__WEBPACK_IMPORTED_MODULE_2__utils__["b" /* getOrDefault */])(options.persistent, false);
        this.visible = Object(__WEBPACK_IMPORTED_MODULE_2__utils__["b" /* getOrDefault */])(options.visible, true);
        this.rotation = Object(__WEBPACK_IMPORTED_MODULE_2__utils__["b" /* getOrDefault */])(options.rotation, 0);
        this.opacity = Object(__WEBPACK_IMPORTED_MODULE_2__utils__["b" /* getOrDefault */])(options.opacity, 1);
        this.rotationPoint = Object(__WEBPACK_IMPORTED_MODULE_2__utils__["b" /* getOrDefault */])(options.rotationPoint, new __WEBPACK_IMPORTED_MODULE_4__vector2d__["a" /* Vector2D */](0.5, 0.5));
        this.static = Object(__WEBPACK_IMPORTED_MODULE_2__utils__["b" /* getOrDefault */])(options.static, false);
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
        // removed from all lists, should be effectively invisible
        // allows some nightlight optimizations to not ruin things
        this.visible = false;
    }
    _removeFromContainer(container) {
        const index = container.sprites.indexOf(this);
        if (index > -1) {
            container.sprites.splice(index, 1);
        }
    }
    // TODO: rotation
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
    containsPoint(point) {
        return this.x < point.x &&
            this.x + this.width > point.x &&
            this.y < point.y &&
            this.y + this.height > point.y;
    }
    _setRenderValues(ctx) {
        ctx.globalAlpha = this.opacity;
        if (this.rotation !== 0) {
            // terrible code
            // rotation is difficult
            // https://stackoverflow.com/a/4650102
            const translateX = this.x + this.width * this.rotationPoint.x;
            const translateY = this.y + this.height * this.rotationPoint.y;
            ctx.translate(translateX, translateY);
            ctx.rotate(Object(__WEBPACK_IMPORTED_MODULE_2__utils__["a" /* degreeToRadians */])(this.rotation));
            ctx.translate(-translateX, -translateY);
        }
        if (this.scale.x !== 1 || this.scale.y !== 1) {
            const translateX = this.x + this.width / 2;
            const translateY = this.y + this.height / 2;
            ctx.translate(translateX, translateY);
            ctx.scale(this.scale.x, this.scale.y);
            ctx.translate(-translateX, -translateY);
        }
    }
    // moves in the direction being faced X pixels
    moveForward(steps) {
        const angle = Object(__WEBPACK_IMPORTED_MODULE_2__utils__["a" /* degreeToRadians */])(this.rotation);
        const sin = Math.sin(angle);
        const cos = Math.cos(angle);
        this.x += sin * steps;
        this.y += cos * steps;
    }
    distanceTo(point) {
        return Math.sqrt(Math.pow((point.x - this.centerX), 2) + Math.pow((point.y - this.centerY), 2));
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
    get centerX() {
        return this.x + (this.width / 2);
    }
    get centerY() {
        return this.y + (this.height / 2);
    }
    get centerPosition() {
        return new __WEBPACK_IMPORTED_MODULE_3__vector__["a" /* Vector */](this.centerX, this.centerY);
    }
    //
    // Nightlight related code
    //
    runBasicPhysics(xv, yv, options = {}) {
        options.collision = Object(__WEBPACK_IMPORTED_MODULE_2__utils__["b" /* getOrDefault */])(options.collision, true);
        options.restrictPositionValues = Object(__WEBPACK_IMPORTED_MODULE_2__utils__["b" /* getOrDefault */])(options.restrictPositionValues, true);
        options.friction = Object(__WEBPACK_IMPORTED_MODULE_2__utils__["b" /* getOrDefault */])(options.friction, __WEBPACK_IMPORTED_MODULE_0__config__["c" /* FRICTION */]);
        options.midAirFriction = Object(__WEBPACK_IMPORTED_MODULE_2__utils__["b" /* getOrDefault */])(options.midAirFriction, true);
        options.roundValues = Object(__WEBPACK_IMPORTED_MODULE_2__utils__["b" /* getOrDefault */])(options.roundValues, true);
        this.x += xv;
        if (options.collision && this.handleCollision(xv, true)) {
            xv = 0;
        }
        if (options.restrictPositionValues) {
            if (this.x < 0) {
                this.x = 0;
                xv = 0;
            }
            else if (this.x + this.width > this.runtime.canvas.width) {
                this.x = this.runtime.canvas.width - this.width;
                xv = 0;
            }
        }
        let onGround = false;
        yv -= __WEBPACK_IMPORTED_MODULE_0__config__["d" /* GRAVITY */];
        this.y -= yv;
        if (options.collision && this.handleCollision(yv, false)) {
            if (yv < 0) {
                onGround = true;
            }
            yv = 0;
        }
        if (options.friction !== false) {
            if (onGround || options.midAirFriction) {
                xv *= options.friction;
            }
        }
        if (options.roundValues) {
            this.x = Math.round(this.x);
            this.y = Math.round(this.y);
        }
        return {
            xv, yv, onGround,
        };
    }
    handleCollision(velocity, horizontal) {
        const intersects = (block) => block.solid &&
            block.visible &&
            this.intersects(block) &&
            block.handleIntersect(this, velocity, horizontal) !== false;
        const self = this;
        // optimization: if we are touching the same block as before (as when still)
        // then we try that first instead of looping over everything
        // this reduces the performance impact of running lots of physics, especially things that aren't moving
        if (self._lastSolidBlock && intersects(self._lastSolidBlock)) {
            return true;
        }
        // optimization: if we are consistently running into blocks above us then break early
        // if 5 blocks in a row are definitely above us then we know we are probably done and stop
        // this is a major performance improvement
        let above = 0;
        for (const block of this.runtime.blocks) {
            if (block.y + block.width < this.y) {
                above++;
                if (above > 5) {
                    break;
                }
            }
            else {
                above = 0;
            }
            if (intersects(block)) {
                self._lastSolidBlock = block;
                return true;
            }
        }
        return false;
    }
    // Tests if a "complex" (fancy rendering/non square) sprite is touching a simple (square) sprite
    complexIntersectsSimple(sprite) {
        // Render ourselves on a canvas
        const canvas = this.runtime.createCanvas();
        const ctx = canvas.getContext("2d");
        this.render(ctx);
        const height = canvas.height;
        const width = canvas.width;
        const data = ctx.getImageData(0, 0, width, height).data;
        // some browsers are funny
        // TODO: warning message?
        if (!data) {
            return false;
        }
        const offsetOf = (x, y) => ((y * width) + x) * 4;
        const startingX = Math.floor(sprite.x);
        const startingY = Math.floor(sprite.y);
        const endingX = startingX + Math.floor(sprite.width);
        const endingY = startingY + Math.floor(sprite.height);
        for (let y = startingY; y < endingY; y++) {
            for (let x = startingX; x < endingX; x++) {
                // if (this.canKill) debugger;
                if (data[offsetOf(x, y) + 3]) {
                    return true;
                }
            }
        }
        // const length = data.length;
        // for (let i = 0; i < length; i += 4) {
        //   const j = i / 4;
        //   if (data[i + 3]) {
        //     const point = new Vector(j % width, Math.floor(j / width));
        //     if (sprite.containsPoint(point)) {
        //       return true;
        //     }
        //   }
        // }
        return false;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AbstractSprite;



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__engine_sprites_imagesprite__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__engine_vector__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__blocks_block__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__fragment__ = __webpack_require__(30);






/*
 * It's a player.
 *
 * For now there doesn't seem to be any problems with having the player also be the graphic
 * And until there are problems they will be staying as one
 * (in some other games the size of the player textures chagne and that ruins physics)
 */
// How fast the player walks
const PLAYER_WALK_SPEED = 0.5 / 2;
// The velocity gained when jumping
const JUMP_HEIGHT = 5.4;
// Maximum speed the player is allowed to move at
const PLAYER_MAX_SPEED = 4 / 2;
// The player uses a custom friction
// This is the value used in that friction
const PLAYER_FRICTION = 0.8 / 2;
// Fragment textures that will always be present when dying
const FRAGMENT_TEXTURES = [1, 2, 3, 4];
// The minimum amount of small pieces to create
const FRAGMENT_SMALL_PIECE_MIN = 4;
// The maxiumum amount of small pieces to create
const FRAGMENT_SMALL_PIECE_MAX = 6;
// The texture associated with small pieces
const FRAGMENT_SMALL_PIECE_TEXTURE = 5;
// The range of xv values that pieces will have
const FRAGMENT_XV_RANGE = 1;
// The minimum yv that pieces will have
const FRAGMENT_YV_MIN = 3;
// The maxiumum yv that pieces will have
const FRAGMENT_YV_MAX = 6;
// The range of rotation change that pieces will have
const FRAGMENT_RV_RANGE = 10;
// Frames in the walk animation
const WALK_ANIMATION_FRAMES = 4;
// Length of each frame
const WALK_ANIMATION_LENGTH = 4;
var MovementDirection;
(function (MovementDirection) {
    MovementDirection[MovementDirection["Right"] = 1] = "Right";
    MovementDirection[MovementDirection["Left"] = -1] = "Left";
})(MovementDirection || (MovementDirection = {}));
class PlayerSprite extends __WEBPACK_IMPORTED_MODULE_1__engine_sprites_imagesprite__["a" /* ImageSprite */] {
    constructor(opts) {
        super(opts);
        this.yv = 0;
        this.xv = 0;
        this.lastMovementDirection = MovementDirection.Right;
        this.onGround = true;
        this.walkingAnimationProgress = 1;
        this.currentFrameProgress = 0;
        this.moving = false;
        this.hasJumpLight = false;
        this.addTask(() => this.run());
        this.addTask(() => this.updateGraphic());
    }
    handleInputs(onGround) {
        const keys = this.runtime.keyboard.keys;
        const rightDown = keys[39].isPressed;
        const leftDown = keys[37].isPressed;
        const upDown = keys[38].isPressed;
        const upJustPressed = keys[38].justPressed;
        this.moving = false;
        if (rightDown && !leftDown) {
            this.xv += PLAYER_WALK_SPEED;
            this.lastMovementDirection = MovementDirection.Right;
            this.moving = true;
        }
        if (leftDown && !rightDown) {
            this.xv -= PLAYER_WALK_SPEED;
            this.lastMovementDirection = MovementDirection.Left;
            this.moving = true;
        }
        if ((upDown && onGround) || (upJustPressed && this.hasJumpLight)) {
            this.runtime.playSound("player/jump");
            this.hasJumpLight = false;
            this.yv = JUMP_HEIGHT;
        }
        else if (!upDown && this.yv > 3) {
            this.yv = 3;
        }
        return {
            rightDown, leftDown, upDown,
        };
    }
    run() {
        if (this.xv > PLAYER_MAX_SPEED) {
            this.xv = PLAYER_MAX_SPEED;
        }
        else if (this.xv < -PLAYER_MAX_SPEED) {
            this.xv = -PLAYER_MAX_SPEED;
        }
        const prevXv = this.xv;
        const prevYv = this.yv;
        const physicsResult = this.runBasicPhysics(this.xv, this.yv, {
            friction: false,
        });
        this.xv = physicsResult.xv;
        this.yv = physicsResult.yv;
        this.onGround = physicsResult.onGround;
        if (this.onGround && prevYv < -1.6) {
            this.runtime.playSound("player/ding");
        }
        if (this.onGround) {
            this.hasJumpLight = false;
        }
        const inputs = this.handleInputs(physicsResult.onGround);
        if ((!inputs.leftDown && !inputs.rightDown) || (inputs.leftDown && inputs.rightDown)) {
            if (this.xv > 0) {
                this.xv -= PLAYER_FRICTION;
                this.xv = Math.max(this.xv, 0);
            }
            else {
                this.xv += PLAYER_FRICTION;
                this.xv = Math.min(this.xv, 0);
            }
        }
        if (this.y >= this.runtime.canvas.height) {
            this.kill();
        }
    }
    reset() {
        this.position.x = 40;
        this.position.y = this.runtime.canvas.height - __WEBPACK_IMPORTED_MODULE_0__config__["a" /* BLOCK_HEIGHT */];
        this.xv = 0;
        this.yv = 0;
        const sprites = this.runtime.blocks.sprites.filter((s) => s.solid || s instanceof __WEBPACK_IMPORTED_MODULE_4__blocks_block__["b" /* PseudoSolidBlock */]);
        while (this.intersects(sprites)) {
            this.y -= __WEBPACK_IMPORTED_MODULE_0__config__["a" /* BLOCK_HEIGHT */];
        }
    }
    kill() {
        const fragmentTextures = Object(__WEBPACK_IMPORTED_MODULE_3__utils__["b" /* clone */])(FRAGMENT_TEXTURES);
        const smallPieces = Object(__WEBPACK_IMPORTED_MODULE_3__utils__["c" /* getRandomInt */])(FRAGMENT_SMALL_PIECE_MIN, FRAGMENT_SMALL_PIECE_MAX);
        for (let i = 0; i < smallPieces; i++) {
            fragmentTextures.push(FRAGMENT_SMALL_PIECE_TEXTURE);
        }
        for (const i of fragmentTextures) {
            new __WEBPACK_IMPORTED_MODULE_5__fragment__["a" /* PlayerFragmentSprite */]({
                position: new __WEBPACK_IMPORTED_MODULE_2__engine_vector__["a" /* Vector */](this.position),
                texture: this.runtime.getImage(`fragments/${i}`),
                xv: Object(__WEBPACK_IMPORTED_MODULE_3__utils__["c" /* getRandomInt */])(-FRAGMENT_XV_RANGE * 1000, FRAGMENT_XV_RANGE * 1000) / 1000,
                yv: Object(__WEBPACK_IMPORTED_MODULE_3__utils__["c" /* getRandomInt */])(FRAGMENT_YV_MIN * 1000, FRAGMENT_YV_MAX * 1000) / 1000,
                rv: Object(__WEBPACK_IMPORTED_MODULE_3__utils__["c" /* getRandomInt */])(-FRAGMENT_RV_RANGE * 1000, FRAGMENT_RV_RANGE * 1000) / 1000,
            });
        }
        this.reset();
        this.runtime.playSound("player/death");
    }
    updateGraphic() {
        this.scale.x = this.lastMovementDirection;
        if (this.onGround) {
            if (this.moving) {
                this.currentFrameProgress++;
                if (this.currentFrameProgress === WALK_ANIMATION_LENGTH) {
                    this.currentFrameProgress = 0;
                    this.walkingAnimationProgress++;
                }
                if (this.walkingAnimationProgress > WALK_ANIMATION_FRAMES) {
                    this.walkingAnimationProgress = 1;
                }
                this.texture = this.runtime.getImage(`player/walk${this.walkingAnimationProgress}`);
            }
            else {
                this.texture = this.runtime.getImage("player/idle");
            }
        }
        else {
            if (this.yv < 0.1) {
                this.texture = this.runtime.getImage("player/down");
            }
            else {
                this.texture = this.runtime.getImage("player/up");
            }
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PlayerSprite;



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*
 * A 2D Vector: (x, y)
 *
 * Used for scale and other only 2D stuff
 */
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_sprites_imagesprite__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__engine_task__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__boss__ = __webpack_require__(17);



const PARTICLE_LIFESPAN = 20;
const PARTICLE_STEP = 1;
const POOF_PARTICLE_COUNT = 8;
const POOF_PARTICLE_ANGLE = 360 / POOF_PARTICLE_COUNT;
const BASE_TEXTURE = "boss/noss/noss";
/* harmony export (immutable) */ __webpack_exports__["b"] = BASE_TEXTURE;

const HIT_ANIMATION_FRAMES = [
    "boss/noss/hit",
    BASE_TEXTURE,
];
const HIT_ANIMATION_LENGTH = 2;
const HIT_ANIMATION_REPEAT = 12;
/* unused harmony export HIT_ANIMATION_REPEAT */

const HIT_ANIMATION_REPEAT2 = 35;
/* unused harmony export HIT_ANIMATION_REPEAT2 */
 // for dead
const HIT_ANIMATION_TOTAL_LENGTH = HIT_ANIMATION_LENGTH *
    HIT_ANIMATION_REPEAT *
    HIT_ANIMATION_FRAMES.length +
    HIT_ANIMATION_LENGTH;
/* harmony export (immutable) */ __webpack_exports__["c"] = HIT_ANIMATION_TOTAL_LENGTH;

const HIT_ANIMATION_TOTAL_LENGTH2 = HIT_ANIMATION_LENGTH *
    HIT_ANIMATION_REPEAT2 *
    HIT_ANIMATION_FRAMES.length +
    HIT_ANIMATION_LENGTH;
/* unused harmony export HIT_ANIMATION_TOTAL_LENGTH2 */

class NossBossDustSprite extends __WEBPACK_IMPORTED_MODULE_0__engine_sprites_imagesprite__["a" /* ImageSprite */] {
    constructor(options) {
        super(options);
        this.addTask(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
            run: () => this.destroy(),
            delay: PARTICLE_LIFESPAN,
        }));
        this.addTask(() => this.move());
    }
    move() {
        this.moveForward(PARTICLE_STEP);
    }
}
class AbstractNossBoss extends __WEBPACK_IMPORTED_MODULE_2__boss__["a" /* AbstractBoss */] {
    poof() {
        const position = this.centerPosition;
        const texture = this.runtime.getImage("boss/noss/dust");
        position.x -= texture.width / 2;
        position.y -= texture.height / 2;
        for (let i = 0; i < POOF_PARTICLE_COUNT; i++) {
            new NossBossDustSprite({
                rotation: i * POOF_PARTICLE_ANGLE,
                position,
                texture,
            });
        }
    }
    playDeadAnimation() {
        this.playHitAnimation(HIT_ANIMATION_REPEAT2);
        this.runtime.playSound("boss/shadow5");
        this.addTask(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
            run: () => this.kill(),
            delay: HIT_ANIMATION_TOTAL_LENGTH2 + 60,
        }));
    }
    kill() {
        this.runtime.playSound("boss/noss/shadow1");
        this.poof();
        this.spawnLevelUpCoin(this.position);
        this.destroy();
    }
    playHitAnimation(repeat = HIT_ANIMATION_REPEAT) {
        for (let i = 0; i < HIT_ANIMATION_FRAMES.length; i++) {
            const frame = HIT_ANIMATION_FRAMES[i];
            this.addTask(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
                run: () => this.texture = this.runtime.getImage(frame),
                repeatEvery: HIT_ANIMATION_LENGTH * 2,
                delay: i * HIT_ANIMATION_LENGTH,
                repeatMax: repeat,
            }));
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AbstractNossBoss;



/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_task__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__engine_vector__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__block__ = __webpack_require__(1);



/*
 * A block that falls when you hit the switch.
 *
 * Will vibrate for a bit before disappearing.
 */
// Time between each vibration before falling
const VIBRATE_EVERY = 3;
// The distance to move when vibrating
const VIBRATE_RANGE = 2;
// How many times to vibrate
const VIBRATE_TIMES = 20;
// Delay before block will fall after vibrating
// Makes blocks from the bottom fall before the ones on the top, which looks nice
const FALL_DELAY_PER_Y = 0.25;
class FallingBlock extends __WEBPACK_IMPORTED_MODULE_2__block__["c" /* SolidBlock */] {
    constructor(opts) {
        super(opts);
        this.yv = 0;
        this.vibrateProgress = 0;
        this.frame = 0;
        this.startingPosition = new __WEBPACK_IMPORTED_MODULE_1__engine_vector__["a" /* Vector */](this.position);
    }
    trigger() {
        this.x -= VIBRATE_RANGE / 2;
        this.addTask(new __WEBPACK_IMPORTED_MODULE_0__engine_task__["a" /* Task */]({
            run: (task) => this.vibrate(task),
            repeatEvery: 3,
        }));
    }
    vibrate(task) {
        this.vibrateProgress++;
        if (this.vibrateProgress === VIBRATE_TIMES) {
            const fromBottom = this.runtime.canvas.height - this.y;
            task.stop();
            this.position = this.startingPosition;
            const delay = fromBottom * FALL_DELAY_PER_Y;
            this.addTask(new __WEBPACK_IMPORTED_MODULE_0__engine_task__["a" /* Task */]({
                run: (task2) => this.fall(task2),
                delay,
                repeatEvery: 0,
            }));
            this.addTask(new __WEBPACK_IMPORTED_MODULE_0__engine_task__["a" /* Task */]({
                run: () => this.playSound(),
                delay,
            }));
        }
        else if (this.vibrateProgress % 2 === 0) {
            this.x -= VIBRATE_RANGE;
        }
        else {
            this.x += VIBRATE_RANGE;
        }
    }
    playSound() {
        this.runtime.playSound("blocks/smash");
    }
    fall(task) {
        this.solid = false;
        const physicsResult = this.runBasicPhysics(0, this.yv, {
            collision: false,
        });
        this.yv = physicsResult.yv;
        if (this.y >= this.runtime.canvas.height) {
            task.stop();
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FallingBlock;



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_task__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__engine_vector__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__blocks_block__ = __webpack_require__(1);



/*
 * The coin that levels you up
 */
// Length of an animation frame
const FRAME_LENGTH = 4;
// The total frames in the animation
const TOTAL_FRAMES = 4;
class LevelUpCoinSprite extends __WEBPACK_IMPORTED_MODULE_2__blocks_block__["a" /* Block */] {
    constructor(opts) {
        super(opts);
        this.animationFrame = 1;
        // In order to stay centered after changing position it will recenter using the startingPosition
        this.startingPosition = new __WEBPACK_IMPORTED_MODULE_1__engine_vector__["a" /* Vector */](this.position);
        this.centerAlign();
        this.addTask(() => this.run());
        this.addTask(new __WEBPACK_IMPORTED_MODULE_0__engine_task__["a" /* Task */]({
            run: () => this.animate(),
            repeatEvery: FRAME_LENGTH,
            delay: FRAME_LENGTH,
        }));
    }
    run() {
        const touchingPlayer = this.intersects(this.runtime.player);
        if (touchingPlayer) {
            this.runtime.playSound("blocks/coin");
            this.runtime.level++;
            this.runtime.renderLevel();
        }
    }
    animate() {
        this.animationFrame++;
        if (this.animationFrame > TOTAL_FRAMES) {
            this.animationFrame = 1;
        }
        this.texture = this.runtime.getImage(`coin/${this.animationFrame}`);
        this.updateDimensions();
        this.position = new __WEBPACK_IMPORTED_MODULE_1__engine_vector__["a" /* Vector */](this.startingPosition);
        this.centerAlign();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LevelUpCoinSprite;



/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__block__ = __webpack_require__(1);


/*
 * It's a grass block.
 *
 * It is spawned on top of the regular blocks and moves itself down onto the block below.
 */
class GrassBlock extends __WEBPACK_IMPORTED_MODULE_1__block__["a" /* Block */] {
    // there are a few visual bugs that come if you make this static
    // public static: boolean = true;
    constructor(opts) {
        super(opts);
        // Move ourselves down
        this.y += __WEBPACK_IMPORTED_MODULE_0__config__["a" /* BLOCK_HEIGHT */];
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GrassBlock;



/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block__ = __webpack_require__(1);

/*
 * A block that is toggled solid/not solid when a switch is hit.
 */
class LightBlock extends __WEBPACK_IMPORTED_MODULE_0__block__["a" /* Block */] {
    toggleSolid() {
        this.solid = !this.solid;
        if (this.solid) {
            this.texture = this.runtime.getImage("blocks/z");
        }
        else {
            this.texture = this.runtime.getImage("blocks/y");
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["c"] = LightBlock;

class EnabledLightBlock extends LightBlock {
    constructor() {
        super(...arguments);
        this.solid = true;
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = EnabledLightBlock;

class DisabledLightBlock extends LightBlock {
    constructor() {
        super(...arguments);
        this.solid = false;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DisabledLightBlock;



/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__3rd_party_stableSort__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__3rd_party_stableSort___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__3rd_party_stableSort__);

/*
 * A container holds sprites
 *
 * Has a few utilty methods that a normal array does not and allows more flexibility
 */
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
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__task__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vector__ = __webpack_require__(0);


class BaseMouse extends __WEBPACK_IMPORTED_MODULE_0__task__["b" /* TaskRunner */] {
    constructor(runtime) {
        super();
        this.position = new __WEBPACK_IMPORTED_MODULE_1__vector__["a" /* Vector */](0, 0);
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
        mouse.addTask(() => this.update());
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
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_sprites_imagesprite__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__engine_vector__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__coin__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__hiteffect__ = __webpack_require__(45);




const PLAYER_JUMP_YV = 3;
class AbstractBoss extends __WEBPACK_IMPORTED_MODULE_0__engine_sprites_imagesprite__["a" /* ImageSprite */] {
    constructor(options) {
        super(options);
        this.phaseDelay = 0;
    }
    // call super.startRoutine() in implementations!!!
    startRoutine() {
        this.phaseDelay = 0;
    }
    addPhase(task, afterDelay = 0) {
        task.delay += this.phaseDelay;
        if (task.repeatEvery > -1) {
            this.phaseDelay += task.repeatMax * (task.repeatEvery + 1);
        }
        this.phaseDelay += (task.originalOptions.delay) || 0;
        this.phaseDelay += afterDelay;
        this.addTask(task);
    }
    playerJumpedOn() {
        return this.intersects(this.runtime.player) && this.runtime.player.yv < -1;
    }
    bouncePlayer() {
        this.runtime.playSound("boss/ouch");
        this.runtime.player.yv = PLAYER_JUMP_YV;
    }
    spawnLevelUpCoin(position) {
        const texture = this.runtime.getImage("coin/1");
        new __WEBPACK_IMPORTED_MODULE_2__coin__["a" /* LevelUpCoinSprite */]({
            texture,
            position,
        });
    }
    spawnHitEffect(type) {
        const texture = this.runtime.getImage(`hit/${type}`);
        const position = new __WEBPACK_IMPORTED_MODULE_1__engine_vector__["a" /* Vector */](this.centerX, this.y);
        position.y -= texture.height;
        position.x -= texture.width / 2;
        new __WEBPACK_IMPORTED_MODULE_3__hiteffect__["a" /* HitEffectSprite */]({
            texture, position,
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AbstractBoss;



/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_sprite__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__engine_task__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__engine_utils__ = __webpack_require__(5);



/*
 * The stars in the background.
 *
 * Spawned randomly when the game starts and are deleted when you enter the castle.
 */
// How often to update opacity
const UPDATE_EVERY = 6;
// How many times will it update in each cycle
// One cycle is Dark -> Bright or Bright -> Dark, not both
const ANIMATION_LENGTH = 10;
class BackgroundStarSprite extends __WEBPACK_IMPORTED_MODULE_0__engine_sprite__["a" /* AbstractSprite */] {
    constructor(opts) {
        super(opts);
        this.progress = 0;
        this.direction = 1;
        this.addTask(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
            repeatEvery: UPDATE_EVERY,
            run: () => this.animate(),
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
    // Implement render as this extends AbstractSprite
    render(ctx) {
        const animationProgress = this.clamp(this.progress / ANIMATION_LENGTH, 0, 1);
        const color = Math.floor(255 * animationProgress);
        const hexCode = Object(__WEBPACK_IMPORTED_MODULE_2__engine_utils__["e" /* toHex */])(color);
        ctx.fillStyle = `#${hexCode}${hexCode}${hexCode}`;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BackgroundStarSprite;



/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ZIndexes; });
// All z indexes are defined here to avoid magic numbers and using 9999999
// Reminder: Static stuff renders at -1
var ZIndexes;
(function (ZIndexes) {
    ZIndexes[ZIndexes["Star"] = -10] = "Star";
    ZIndexes[ZIndexes["Block"] = 0] = "Block";
    ZIndexes[ZIndexes["Grass"] = 1] = "Grass";
    ZIndexes[ZIndexes["Player"] = 10] = "Player";
    ZIndexes[ZIndexes["FinalBoss"] = 20] = "FinalBoss";
})(ZIndexes || (ZIndexes = {}));


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(21);

/*
 * The loader.
 *
 * It creates the game object, adds in assets, and starts the game.
 */
const game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* Nightlight */]();
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
// wait for it to load then run our stuff
const progressElement = document.getElementById("progress");
game.waitForAssets((progress) => {
    // show a progress bar
    // with the addition of sounds it can take a long time to download stuff and it was inevitable
    progressElement.value = progress;
}).then(run);
function run() {
    progressElement.style.display = "none";
    game.start();
}


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stats_js__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stats_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stats_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__blockmap__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__engine_container__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__engine_runtime__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__engine_vector__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__levels_jumplights__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__levels_levels__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__sprites_blocks_block__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__sprites_jumplight__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__sprites_player_player__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__sprites_star__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__sprites_zindex__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__utils__ = __webpack_require__(6);














const SPOTLIGHT_SIZE = 75;
const TOTAL_BACKGROUND_STARS = 100;
class Nightlight extends __WEBPACK_IMPORTED_MODULE_4__engine_runtime__["a" /* GameRuntime */] {
    constructor() {
        super(document.getElementById("container"));
        this.level = 0;
        this.levelData = "";
        this.levels = [];
        this.background = "black";
        this.backgroundMusic = [];
        this.darkLevel = false;
        this.blocks = new __WEBPACK_IMPORTED_MODULE_3__engine_container__["a" /* Container */]();
        document.getElementById("volume").oninput = (e) => {
            const volume = Number(e.target.value);
            this.volume = volume / 100;
        };
        // stats.js for fps monitoring
        this.stats = new Stats();
        this.stats.showPanel(0);
        document.body.appendChild(this.stats.dom);
    }
    //
    // Utilities and Init
    //
    setBackgroundMusic(music) {
        for (const sound of this.backgroundMusic) {
            this.stopSound(sound);
            sound.loop = false;
            sound.onended = () => { };
        }
        for (const sound of music) {
            sound.onended = () => this.nextBackgroundMusic();
        }
        this.backgroundMusic = music;
        this.playSound(music[0]);
    }
    nextBackgroundMusic() {
        if (this.backgroundMusic.length > 1) {
            this.backgroundMusic.shift();
        }
        this.playSound(this.backgroundMusic[0]);
    }
    createPlayer() {
        this.player = new __WEBPACK_IMPORTED_MODULE_10__sprites_player_player__["a" /* PlayerSprite */]({
            texture: this.getImage("player/idle"),
            position: new __WEBPACK_IMPORTED_MODULE_5__engine_vector__["a" /* Vector */](0, 0, __WEBPACK_IMPORTED_MODULE_12__sprites_zindex__["a" /* ZIndexes */].Player),
            width: __WEBPACK_IMPORTED_MODULE_2__config__["b" /* BLOCK_WIDTH */],
            height: __WEBPACK_IMPORTED_MODULE_2__config__["a" /* BLOCK_HEIGHT */],
            persistent: true,
        });
    }
    createStarBackground() {
        for (let i = 0; i < TOTAL_BACKGROUND_STARS; i++) {
            const x = Object(__WEBPACK_IMPORTED_MODULE_13__utils__["c" /* getRandomInt */])(0, this.canvas.width);
            const y = Object(__WEBPACK_IMPORTED_MODULE_13__utils__["c" /* getRandomInt */])(0, this.canvas.height);
            new __WEBPACK_IMPORTED_MODULE_11__sprites_star__["a" /* BackgroundStarSprite */]({
                position: new __WEBPACK_IMPORTED_MODULE_5__engine_vector__["a" /* Vector */](x, y, __WEBPACK_IMPORTED_MODULE_12__sprites_zindex__["a" /* ZIndexes */].Star),
                width: 2,
                height: 2,
                persistent: true,
            });
        }
    }
    //
    // Overrides
    //
    start() {
        super.start();
        this.levels = Object(__WEBPACK_IMPORTED_MODULE_7__levels_levels__["a" /* getLevels */])(this);
        this.createPlayer();
        this.createStarBackground();
        this.renderLevel();
    }
    render() {
        this.stats.begin();
        super.render();
        if (this.darkLevel) {
            // https://stackoverflow.com/a/6271865
            const coverCanvas = this.createCanvas();
            const coverCtx = coverCanvas.getContext("2d");
            coverCtx.fillStyle = "black";
            this.resetCanvas(coverCtx, "black");
            coverCtx.globalCompositeOperation = "xor";
            const player = this.player;
            const centerX = player.x + (player.width / 2);
            const centerY = player.y + (player.height / 2);
            coverCtx.arc(centerX, centerY, SPOTLIGHT_SIZE, 0, 2 * Math.PI);
            coverCtx.fill();
            this.ctx.drawImage(coverCanvas, 0, 0);
        }
        this.stats.end();
    }
    //
    // Levels
    //
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
    createBlock(position, char, index) {
        const blockType = __WEBPACK_IMPORTED_MODULE_1__blockmap__["a" /* blockMap */][char];
        let spriteConstructor;
        let texture;
        if (typeof blockType === "undefined") {
            console.error(`Could not find block metadata for ${char}, skipping`);
            return;
        }
        else if (typeof blockType === "string") {
            texture = this.getImage(blockType);
            spriteConstructor = __WEBPACK_IMPORTED_MODULE_8__sprites_blocks_block__["d" /* StaticSolidBlock */];
        }
        else {
            texture = this.getImage(blockType.texture);
            spriteConstructor = blockType.type;
        }
        if (!texture) {
            console.error(`Could not find block texture for ${blockType}, skipping`);
            return;
        }
        const opts = {
            width: texture.width,
            height: texture.height,
            position,
            texture,
            levelIndex: index,
        };
        const block = new spriteConstructor(opts);
        return block;
    }
    renderLevel(num = this.level) {
        this.destroyLevel();
        const level = this.levels[num];
        const levelData = level.levelData;
        this.levelData = levelData;
        let x = 0;
        let y = this.canvas.height - __WEBPACK_IMPORTED_MODULE_2__config__["a" /* BLOCK_HEIGHT */];
        for (let i = 0; i < levelData.length; i++) {
            const char = levelData[i];
            if (char !== ".") {
                const position = new __WEBPACK_IMPORTED_MODULE_5__engine_vector__["a" /* Vector */](x, y);
                this.createBlock(position, char, i);
            }
            x += __WEBPACK_IMPORTED_MODULE_2__config__["b" /* BLOCK_WIDTH */];
            if (x >= this.canvas.width) {
                x = 0;
                y -= __WEBPACK_IMPORTED_MODULE_2__config__["a" /* BLOCK_HEIGHT */];
            }
        }
        // Level metadata
        // if a level changes the background
        if (level.newBackground) {
            this.background = level.newBackground;
        }
        // if a level has new background music
        if (level.newBackgroundMusic) {
            this.setBackgroundMusic(level.newBackgroundMusic);
        }
        // if a level has any handlers that need to run
        if (level.handlers) {
            for (const handler of level.handlers) {
                handler(this);
            }
        }
        // dark rooms
        this.darkLevel = !!level.dark;
        // spawn things that you can jump on
        this.spawnJumpLights();
        // render static things that were just created
        this.updateStatic();
        this.player.reset();
    }
    spawnJumpLights() {
        const jumpLights = __WEBPACK_IMPORTED_MODULE_6__levels_jumplights__["a" /* JUMP_LIGHTS */][this.level];
        if (!jumpLights) {
            return;
        }
        const texture = this.getImage("jumplight");
        for (const position of jumpLights) {
            new __WEBPACK_IMPORTED_MODULE_9__sprites_jumplight__["a" /* JumpLight */]({
                texture,
                position,
            });
        }
    }
    onsetvolume(volume) {
        document.getElementById("volume-level").textContent = Math.round(volume * 100) + "%";
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Nightlight;



/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// todo: actual type definitions


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sprites_blocks_black__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sprites_blocks_block__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sprites_blocks_blockswitchspawner__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sprites_blocks_coinspawner__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sprites_blocks_corner__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sprites_blocks_crumble__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__sprites_blocks_falling__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__sprites_blocks_grass__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__sprites_blocks_lightblock__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__sprites_blocks_lightswitch__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__sprites_blocks_oneway__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__sprites_blocks_spike__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__sprites_blocks_tallgrass__ = __webpack_require__(34);













function special(type, texture) {
    return {
        type, texture,
    };
}
const blockMap = {
    "a": special(__WEBPACK_IMPORTED_MODULE_0__sprites_blocks_black__["a" /* BlackBlock */], "blocks/a"),
    "b": "blocks/b",
    "c": "blocks/c",
    "d": "blocks/d",
    "e": "blocks/e",
    "f": "blocks/f",
    "g": "blocks/g",
    "h": "blocks/h",
    "i": "blocks/i",
    "j": special(__WEBPACK_IMPORTED_MODULE_7__sprites_blocks_grass__["a" /* GrassBlock */], "blocks/j"),
    "k": special(__WEBPACK_IMPORTED_MODULE_7__sprites_blocks_grass__["a" /* GrassBlock */], "blocks/k"),
    "l": special(__WEBPACK_IMPORTED_MODULE_7__sprites_blocks_grass__["a" /* GrassBlock */], "blocks/l"),
    "m": special(__WEBPACK_IMPORTED_MODULE_4__sprites_blocks_corner__["b" /* RotatedCornerBlock */], "blocks/m"),
    "n": special(__WEBPACK_IMPORTED_MODULE_3__sprites_blocks_coinspawner__["a" /* AboveLevelUpCoinSpawnerBlock */], "blocks/n"),
    "o": special(__WEBPACK_IMPORTED_MODULE_11__sprites_blocks_spike__["d" /* UpSpikeBlock */], "blocks/spikes/up"),
    "p": special(__WEBPACK_IMPORTED_MODULE_12__sprites_blocks_tallgrass__["a" /* TallGrassBlock */], "blocks/p"),
    "q": special(__WEBPACK_IMPORTED_MODULE_12__sprites_blocks_tallgrass__["a" /* TallGrassBlock */], "blocks/q"),
    "r": "blocks/r",
    "s": "blocks/s",
    "t": special(__WEBPACK_IMPORTED_MODULE_5__sprites_blocks_crumble__["a" /* CrumblingBlock */], "blocks/crumble/1"),
    "u": special(__WEBPACK_IMPORTED_MODULE_2__sprites_blocks_blockswitchspawner__["a" /* BlockSwitchSpawnerBlock */], "blocks/u"),
    "v": "blocks/v",
    "w": special(__WEBPACK_IMPORTED_MODULE_6__sprites_blocks_falling__["a" /* FallingBlock */], "blocks/w"),
    "x": special(__WEBPACK_IMPORTED_MODULE_9__sprites_blocks_lightswitch__["a" /* LightSwitchBlock */], "blocks/lightbutton/1"),
    "y": special(__WEBPACK_IMPORTED_MODULE_8__sprites_blocks_lightblock__["a" /* DisabledLightBlock */], "blocks/y"),
    "z": special(__WEBPACK_IMPORTED_MODULE_8__sprites_blocks_lightblock__["b" /* EnabledLightBlock */], "blocks/z"),
    // Post sword
    "1": "blocks/1",
    "2": "blocks/2",
    "3": "blocks/3",
    "4": "blocks/4",
    "5": "blocks/5",
    "6": "blocks/6",
    "7": "blocks/7",
    "8": "blocks/8",
    "9": special(__WEBPACK_IMPORTED_MODULE_4__sprites_blocks_corner__["b" /* RotatedCornerBlock */], "blocks/9"),
    "@": special(__WEBPACK_IMPORTED_MODULE_3__sprites_blocks_coinspawner__["b" /* BelowLevelUpCoinSpawnerBlock */], "blocks/n"),
    "!": special(__WEBPACK_IMPORTED_MODULE_10__sprites_blocks_oneway__["a" /* OneWayBlock */], "blocks/!"),
    "#": special(__WEBPACK_IMPORTED_MODULE_11__sprites_blocks_spike__["b" /* LeftSpikeBlock */], "blocks/spikes/left"),
    "$": special(__WEBPACK_IMPORTED_MODULE_11__sprites_blocks_spike__["c" /* RightSpikeBlock */], "blocks/spikes/right"),
    "%": special(__WEBPACK_IMPORTED_MODULE_11__sprites_blocks_spike__["a" /* DownSpikeBlock */], "blocks/spikes/down"),
    // Castle
    "^": special(__WEBPACK_IMPORTED_MODULE_1__sprites_blocks_block__["b" /* PseudoSolidBlock */], "blocks/caret"),
    "&": "blocks/ampersand",
    "*": "blocks/asterisk",
    "(": "blocks/(",
    ")": "blocks/)",
    "-": "blocks/-",
    "_": "blocks/underscore",
    "=": "blocks/=",
    "+": "blocks/+",
    "`": special(__WEBPACK_IMPORTED_MODULE_4__sprites_blocks_corner__["a" /* CastleCornerBlock */], "blocks/grave"),
};
/* harmony export (immutable) */ __webpack_exports__["a"] = blockMap;



/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block__ = __webpack_require__(1);

class BlackBlock extends __WEBPACK_IMPORTED_MODULE_0__block__["b" /* PseudoSolidBlock */] {
    constructor() {
        super(...arguments);
        this.static = true;
    }
    render(ctx) {
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BlackBlock;



/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__engine_vector__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__blockswitch__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__block__ = __webpack_require__(1);




// Block that spawns a switch
class BlockSwitchSpawnerBlock extends __WEBPACK_IMPORTED_MODULE_3__block__["c" /* SolidBlock */] {
    constructor(opts) {
        super(opts);
        const position = new __WEBPACK_IMPORTED_MODULE_1__engine_vector__["a" /* Vector */](this.position);
        position.y -= __WEBPACK_IMPORTED_MODULE_0__config__["a" /* BLOCK_HEIGHT */];
        new __WEBPACK_IMPORTED_MODULE_2__blockswitch__["a" /* BlockSwitch */]({
            texture: this.runtime.getImage("blocks/button/red"),
            position,
            spawner: this,
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BlockSwitchSpawnerBlock;



/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_vector__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__blocks_block__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__blocks_falling__ = __webpack_require__(11);



class BlockSwitch extends __WEBPACK_IMPORTED_MODULE_1__blocks_block__["a" /* Block */] {
    constructor(opts) {
        super(opts);
        this.spawner = opts.spawner;
        this.startingPosition = new __WEBPACK_IMPORTED_MODULE_0__engine_vector__["a" /* Vector */](this.position);
        this.floorAlign();
        this.addTask((task) => this.run(task));
    }
    trigger() {
        const allSprites = this.runtime.sprites.sprites;
        const fallingBlocks = allSprites.filter((sprite) => sprite instanceof __WEBPACK_IMPORTED_MODULE_2__blocks_falling__["a" /* FallingBlock */]);
        for (const sprite of fallingBlocks) {
            sprite.trigger();
        }
        this.spawner.texture = this.runtime.getImage("blocks/u2");
        this.texture = this.runtime.getImage("blocks/button/on");
        this.updateDimensions();
        this.position = this.startingPosition;
        this.floorAlign();
        this.runtime.playSound("blocks/button");
    }
    run(task) {
        if (this.intersects(this.runtime.player)) {
            this.trigger();
            task.stop();
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BlockSwitch;



/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__engine_vector__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__coin__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__block__ = __webpack_require__(1);




/*
 * Spawns the level up coin
 * The level up coin itself is not part of the level code,
 * only the spawner.
 *
 * Different types becasue that's how the level codes are. (and I really don't want to touch those)
 */
class LevelUpCoinSpawnerBlock extends __WEBPACK_IMPORTED_MODULE_3__block__["c" /* SolidBlock */] {
    constructor(opts) {
        super(opts);
        this.static = true;
        const position = this.getCoinPosition();
        new __WEBPACK_IMPORTED_MODULE_2__coin__["a" /* LevelUpCoinSprite */]({
            position,
            texture: this.runtime.getImage("coin/1"),
        });
    }
}
// Spawns the coin above the block
class AboveLevelUpCoinSpawnerBlock extends LevelUpCoinSpawnerBlock {
    getCoinPosition() {
        return new __WEBPACK_IMPORTED_MODULE_1__engine_vector__["a" /* Vector */](this.x, this.y - __WEBPACK_IMPORTED_MODULE_0__config__["a" /* BLOCK_HEIGHT */]);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AboveLevelUpCoinSpawnerBlock;

// Spawns the coin below the block
class BelowLevelUpCoinSpawnerBlock extends LevelUpCoinSpawnerBlock {
    getCoinPosition() {
        return new __WEBPACK_IMPORTED_MODULE_1__engine_vector__["a" /* Vector */](this.x, this.y + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* BLOCK_HEIGHT */]);
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = BelowLevelUpCoinSpawnerBlock;



/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__engine_sprites_imagesprite__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__engine_vector__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__block__ = __webpack_require__(1);




/*
 * A block that is in the corner
 */
const AIR = [
    ".",
    "l", "k", "j",
    "p", "q",
    "%", "#", "$", "o",
];
class CornerBlock extends __WEBPACK_IMPORTED_MODULE_3__block__["a" /* Block */] {
    constructor(opts) {
        super(opts);
        this.levelIndex = opts.levelIndex || 0;
        // queue deletion after other stuff runs
        this.destroy();
    }
    /**
     * If the block that is X distance from this one is air,
     * then create a new sprite with the texture, rotation, x offset, and y offset as provided
     */
    testCorner(offset, texture, rotation, x, y) {
        const charAtOffset = this.runtime.levelData[this.levelIndex + offset];
        const isAir = AIR.indexOf(charAtOffset) > -1;
        if (isAir) {
            const position = new __WEBPACK_IMPORTED_MODULE_2__engine_vector__["a" /* Vector */](this.x + x * (__WEBPACK_IMPORTED_MODULE_0__config__["b" /* BLOCK_WIDTH */] / 2), this.y + y * (__WEBPACK_IMPORTED_MODULE_0__config__["a" /* BLOCK_HEIGHT */] / 2));
            // these should be static, but that seems to cause problems that i don't want to debug
            const sprite = new __WEBPACK_IMPORTED_MODULE_1__engine_sprites_imagesprite__["a" /* ImageSprite */]({
                position,
                texture,
                rotation,
            });
        }
    }
}
// A normal corner block that spawns rotations of itself
// Used in all zones but castle
class RotatedCornerBlock extends CornerBlock {
    constructor(opts) {
        super(opts);
        // black background
        new __WEBPACK_IMPORTED_MODULE_3__block__["a" /* Block */]({
            texture: this.runtime.getImage("blocks/a"),
            position: new __WEBPACK_IMPORTED_MODULE_2__engine_vector__["a" /* Vector */](this.x, this.y, -1),
        });
        const offset = this.width === __WEBPACK_IMPORTED_MODULE_0__config__["b" /* BLOCK_WIDTH */] ? 0 : 1;
        // if spawned on far left edge then don't check for things that will wrap around to other side of screen
        if (this.levelIndex % __WEBPACK_IMPORTED_MODULE_0__config__["e" /* LEVEL_WIDTH */] !== 0) {
            this.testCorner(__WEBPACK_IMPORTED_MODULE_0__config__["e" /* LEVEL_WIDTH */] - 1, this.texture, -90, 0, 0);
            this.testCorner(-__WEBPACK_IMPORTED_MODULE_0__config__["e" /* LEVEL_WIDTH */] - 1, this.texture, 180, 0, offset);
        }
        // if spawned on far right edge then don't check for things that will wrap around to other side of screen
        // untested but should work
        if (this.levelIndex % __WEBPACK_IMPORTED_MODULE_0__config__["e" /* LEVEL_WIDTH */] !== __WEBPACK_IMPORTED_MODULE_0__config__["e" /* LEVEL_WIDTH */] - 1) {
            this.testCorner(__WEBPACK_IMPORTED_MODULE_0__config__["e" /* LEVEL_WIDTH */] + 1, this.texture, 0, offset, 0);
            this.testCorner(-__WEBPACK_IMPORTED_MODULE_0__config__["e" /* LEVEL_WIDTH */] + 1, this.texture, 90, offset, offset);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = RotatedCornerBlock;

// The corner blocks in the castle are special
// I believe this block actually only shows up like once in the whole game
class CastleCornerBlock extends CornerBlock {
    constructor(opts) {
        super(opts);
        if (this.levelIndex % __WEBPACK_IMPORTED_MODULE_0__config__["e" /* LEVEL_WIDTH */] !== 0) {
            this.testCorner(__WEBPACK_IMPORTED_MODULE_0__config__["e" /* LEVEL_WIDTH */] - 1, this.runtime.getImage("blocks/castlecorner/topleft"), 0, 0, 0);
            this.testCorner(-__WEBPACK_IMPORTED_MODULE_0__config__["e" /* LEVEL_WIDTH */] - 1, this.runtime.getImage("blocks/castlecorner/bottomleft"), 0, 0, 0);
        }
        if (this.levelIndex % __WEBPACK_IMPORTED_MODULE_0__config__["e" /* LEVEL_WIDTH */] !== __WEBPACK_IMPORTED_MODULE_0__config__["e" /* LEVEL_WIDTH */] - 1) {
            this.testCorner(__WEBPACK_IMPORTED_MODULE_0__config__["e" /* LEVEL_WIDTH */] + 1, this.runtime.getImage("blocks/castlecorner/topright"), 0, 0, 0);
            this.testCorner(-__WEBPACK_IMPORTED_MODULE_0__config__["e" /* LEVEL_WIDTH */] + 1, this.runtime.getImage("blocks/castlecorner/bottomright"), 0, 0, 0);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CastleCornerBlock;



/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_task__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__player_player__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__block__ = __webpack_require__(1);



/*
 * A block that crumbles beneath you as you stand on it
 * Will reappear after a few seconds
 */
// The amount of frames in the crumbling animation
const CRUMBLE_FRAMES = 9;
// The length of each frame in the crumbling animation
const CRUMBLE_FRAME_LENGTH = 5;
// How long before the block will reappear
const CRUMBLE_RESPAWN = 60 * 3;
class CrumblingBlock extends __WEBPACK_IMPORTED_MODULE_2__block__["c" /* SolidBlock */] {
    constructor(opts) {
        super(opts);
        this.crumbling = false;
        this.crumbleProgress = 1;
        this.yv = 0;
        this.startingX = this.x;
        this.startingY = this.y;
    }
    handleIntersect(sprite, velocity, horizontal) {
        super.handleIntersect(sprite, velocity, horizontal);
        if (!this.crumbling && !horizontal && velocity < 0 && sprite instanceof __WEBPACK_IMPORTED_MODULE_1__player_player__["a" /* PlayerSprite */]) {
            this.crumbling = true;
            this.addTask(new __WEBPACK_IMPORTED_MODULE_0__engine_task__["a" /* Task */]({
                run: (task) => this.crumble(task),
                repeatEvery: CRUMBLE_FRAME_LENGTH,
            }));
        }
    }
    updateVisual() {
        this.texture = this.runtime.getImage(`blocks/crumble/${this.crumbleProgress}`);
        this.updateDimensions();
    }
    respawn() {
        this.x = this.startingX;
        this.y = this.startingY;
        this.crumbling = false;
        this.yv = 0;
        this.crumbleProgress = 1;
        this.solid = true;
        this.updateVisual();
    }
    crumble(task) {
        this.crumbleProgress++;
        this.updateVisual();
        this.runtime.playSound("blocks/break");
        if (this.crumbleProgress === CRUMBLE_FRAMES) {
            task.stop();
            this.solid = false;
            this.runtime.playSound("blocks/fall");
            this.addTask((task2) => this.fall(task2));
        }
    }
    fall(task) {
        const physicsResult = this.runBasicPhysics(0, this.yv, {
            collision: false,
        });
        this.yv = physicsResult.yv;
        if (this.y >= this.runtime.canvas.height) {
            task.stop();
            this.addTask(new __WEBPACK_IMPORTED_MODULE_0__engine_task__["a" /* Task */]({
                run: () => this.respawn(),
                delay: CRUMBLE_RESPAWN,
            }));
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CrumblingBlock;



/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_sprites_imagesprite__ = __webpack_require__(4);

/*
 * Fragments of the player that will fly everywhere you when the player dies
 */
// How long before they will start to go away (opacity up)
const LIFESPAN = 300;
// The rate at which the opacity will go up each frame after the life span is reached
const GHOST_RATE = 0.03;
// The friction value for rotation when on the ground
// Multiplied by rotation so higher is less, 1 is 0
const ROTATION_FRICTION = 0.5;
// create a high limit to prevent constant death from crashing everything
// but that also will be hard to find during normal play
const MAX_FRAGMENTS = 50;
let existingFragments = 0;
class PlayerFragmentSprite extends __WEBPACK_IMPORTED_MODULE_0__engine_sprites_imagesprite__["a" /* ImageSprite */] {
    constructor(opts) {
        super(opts);
        this.xv = 0;
        this.yv = 0;
        this.rv = 0;
        this.lifespan = 0;
        existingFragments++;
        if (existingFragments > MAX_FRAGMENTS) {
            this.destroy();
            return;
        }
        this.xv = opts.xv;
        this.yv = opts.yv;
        this.rv = opts.rv;
        if (this.y >= this.runtime.canvas.height) {
            this.y = this.runtime.canvas.height - 1;
        }
        this.addTask(() => this.run());
    }
    run() {
        this.lifespan++;
        const physicsResult = this.runBasicPhysics(this.xv, this.yv, {
            midAirFriction: false,
            roundValues: false,
        });
        this.xv = physicsResult.xv;
        this.yv = physicsResult.yv;
        if (physicsResult.onGround) {
            this.rv *= ROTATION_FRICTION;
        }
        this.rotation += this.rv;
        if (this.lifespan >= LIFESPAN) {
            this.opacity -= GHOST_RATE;
        }
        if (this.opacity < 0 || this.y > this.runtime.canvas.height) {
            this.destroy();
        }
    }
    destroy() {
        super.destroy();
        existingFragments--;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PlayerFragmentSprite;



/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_task__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__engine_vector__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__player_player__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__block__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lightblock__ = __webpack_require__(14);





/*
 * A block that toggles the solidity of LightBlocks
 */
// Frames to be played in the animation
const ANIMATION_FRAMES = [
    "blocks/lightbutton/1",
    "blocks/lightbutton/2",
];
// The length of each animation frame
const ANIMATION_FRAME_LENGTH = 5;
// How long the switch will remaing as pressed before hiding
const HIDE_DELAY = 30;
class LightSwitchBlock extends __WEBPACK_IMPORTED_MODULE_3__block__["c" /* SolidBlock */] {
    constructor(opts) {
        super(opts);
        // see #show()
        this.activated = false;
        this.animationProgress = 0;
        this.startingPosition = new __WEBPACK_IMPORTED_MODULE_1__engine_vector__["a" /* Vector */](this.position);
        this.show();
    }
    show() {
        // reset variables
        this.animationProgress = 0;
        this.activated = false;
        // reset texture and position
        this.texture = this.runtime.getImage(ANIMATION_FRAMES[0]);
        this.updateDimensions();
        this.position = new __WEBPACK_IMPORTED_MODULE_1__engine_vector__["a" /* Vector */](this.startingPosition);
        this.visible = true;
        // start animating
        this.addTask(new __WEBPACK_IMPORTED_MODULE_0__engine_task__["a" /* Task */]({
            run: (task) => this.animate(task),
            repeatEvery: ANIMATION_FRAME_LENGTH,
        }));
    }
    animate(task) {
        if (this.activated) {
            task.stop();
            return;
        }
        this.animationProgress++;
        if (this.animationProgress === ANIMATION_FRAMES.length) {
            this.animationProgress = 0;
        }
        this.texture = this.runtime.getImage(ANIMATION_FRAMES[this.animationProgress]);
    }
    activate() {
        this.activated = true;
        const sprites = this.runtime.sprites.sprites;
        const lightBlocks = sprites.filter((s) => s instanceof __WEBPACK_IMPORTED_MODULE_4__lightblock__["c" /* LightBlock */]);
        for (const block of lightBlocks) {
            block.toggleSolid();
        }
        const otherSwitches = sprites.filter((s) => s instanceof LightSwitchBlock && s !== this);
        for (const block of otherSwitches) {
            if (block.activated) {
                block.show();
            }
        }
        this.texture = this.runtime.getImage("blocks/lightbutton/down");
        this.updateDimensions();
        this.floorAlign();
        this.addTask(new __WEBPACK_IMPORTED_MODULE_0__engine_task__["a" /* Task */]({
            run: () => this.hide(),
            delay: HIDE_DELAY,
        }));
        this.runtime.playSound("blocks/fds");
    }
    hide() {
        this.visible = false;
    }
    handleIntersect(sprite, velocity, horizontal) {
        const res = super.handleIntersect(sprite, velocity, horizontal);
        if (!this.activated && sprite.y + sprite.height === this.y && sprite instanceof __WEBPACK_IMPORTED_MODULE_2__player_player__["a" /* PlayerSprite */]) {
            this.activate();
            return false;
        }
        return res;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LightSwitchBlock;



/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block__ = __webpack_require__(1);

/*
 * A block that allows things to go up but not down.
 */
class OneWayBlock extends __WEBPACK_IMPORTED_MODULE_0__block__["c" /* SolidBlock */] {
    constructor() {
        super(...arguments);
        this.static = true;
        this.intersectsPlayer = false;
    }
    handleIntersect(sprite, velocity, horizontal) {
        // Horizontally these have no collision
        if (horizontal) {
            return false;
        }
        else {
            const previousY = sprite.y + velocity;
            // If below then not solid
            // Otherwise use normal behavior when above
            if (previousY + sprite.height > this.y) {
                return false;
            }
            else {
                return super.handleIntersect(sprite, velocity, horizontal);
            }
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = OneWayBlock;



/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__player_player__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__block__ = __webpack_require__(1);


/*
 * It's a spike. It kills the player.
 */
// Spikes share pretty much all of their code
// So an abstract class is made and extended
class SpikeBlock extends __WEBPACK_IMPORTED_MODULE_1__block__["c" /* SolidBlock */] {
    constructor() {
        super(...arguments);
        this.static = true;
    }
    handleIntersect(sprite, velocity, horizontal) {
        super.handleIntersect(sprite, velocity, horizontal);
        if (this.canKill(sprite) && sprite instanceof __WEBPACK_IMPORTED_MODULE_0__player_player__["a" /* PlayerSprite */]) {
            sprite.kill();
            return false;
        }
        return true;
    }
}
class UpSpikeBlock extends SpikeBlock {
    constructor(opts) {
        super(opts);
        this.floorAlign();
    }
    canKill(sprite) {
        return sprite.y + sprite.height === this.y;
    }
}
/* harmony export (immutable) */ __webpack_exports__["d"] = UpSpikeBlock;

class DownSpikeBlock extends SpikeBlock {
    // Already aligned due to spawning
    canKill(sprite) {
        return sprite.y === this.y + this.height;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DownSpikeBlock;

class LeftSpikeBlock extends SpikeBlock {
    constructor(opts) {
        super(opts);
        this.leftAlign();
    }
    canKill(sprite) {
        return sprite.x + sprite.width === this.x;
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = LeftSpikeBlock;

class RightSpikeBlock extends SpikeBlock {
    // Already aligned due to spawning
    canKill(sprite) {
        return sprite.x === this.x + this.width;
    }
}
/* harmony export (immutable) */ __webpack_exports__["c"] = RightSpikeBlock;



/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_vector__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__block__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__grass__ = __webpack_require__(13);



/*
 * It's a tall grass block.
 *
 * It is spawned like normal grass blocks but also shows a taller grass on top of the block
 * It creates a normal grass to go below it
 */
class TallGrassBlock extends __WEBPACK_IMPORTED_MODULE_1__block__["a" /* Block */] {
    constructor(opts) {
        super(opts);
        this.static = true;
        new __WEBPACK_IMPORTED_MODULE_2__grass__["a" /* GrassBlock */]({
            position: new __WEBPACK_IMPORTED_MODULE_0__engine_vector__["a" /* Vector */](this.position),
            texture: this.runtime.getImage("blocks/k"),
        });
        this.floorAlign();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TallGrassBlock;



/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://gist.github.com/fsufitch/18bb4692d5f46b649890f8fd58765fbc with minor style changes
let defaultCmp = (a, b) => {
    return a - b;
};
Array.prototype.stableSort = function (cmp = defaultCmp) {
    const stabilized = this.map((el, index) => ([el, index]));
    const stableCmp = (a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    };
    stabilized.sort(stableCmp);
    for (let i = 0; i < this.length; i++) {
        this[i] = stabilized[i][0];
    }
    return this;
};


/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__container__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__drivers_keyboard_keyboard__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__drivers_mouse_mouse__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__drivers_mouse_touchscreen__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__errors_exit__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sprite__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__staticRenderer__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__task__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__utils__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__vector__ = __webpack_require__(0);










/*
 * The main game runtime object
 */
// Dimensions of the canvas
const CANVAS_WIDTH = 480;
const CANVAS_HEIGHT = 360;
// Format of images
// .jpg might work but don't, just don't
const IMAGE_FORMAT = "png";
// Format of sounds
// mp3 has very wide browser support: https://caniuse.com/#feat=mp3
const SOUND_FORMAT = "mp3";
class GameRuntime extends __WEBPACK_IMPORTED_MODULE_7__task__["b" /* TaskRunner */] {
    constructor(container) {
        super();
        // debug config variables
        this._DEBUG_NON_STATIC_OUTLINE = false;
        this._DEBUG_STATIC_OUTLINE = false;
        this.images = new Map();
        this.sounds = new Map();
        this.containers = [];
        this.frames = 0;
        this.started = false;
        this.background = "white";
        this._volume = 0;
        this._assetPromises = [];
        // make the main canvas and add it to the DOM
        this.canvas = this.createCanvas();
        this.ctx = this.canvas.getContext("2d");
        container.appendChild(this.canvas);
        // init static rendering optimizations
        this.staticCanvas = this.createCanvas();
        this.staticCtx = this.staticCanvas.getContext("2d");
        // mouse driver, support pc and mobile to some degree
        if (!Object(__WEBPACK_IMPORTED_MODULE_8__utils__["c" /* isMobile */])()) {
            this.mouse = new __WEBPACK_IMPORTED_MODULE_2__drivers_mouse_mouse__["a" /* Mouse */](this);
        }
        else {
            this.mouse = new __WEBPACK_IMPORTED_MODULE_3__drivers_mouse_touchscreen__["a" /* TouchscreenMouse */](this);
        }
        this.addTask(() => this.mouse.update());
        this.keyboard = new __WEBPACK_IMPORTED_MODULE_1__drivers_keyboard_keyboard__["a" /* Keyboard */](this);
        // set the current runtime on some objects
        // i dont want to do this but it works
        // FIXME: GameRuntime.instance instead of this.runtime
        __WEBPACK_IMPORTED_MODULE_5__sprite__["a" /* AbstractSprite */].runtime = this;
        __WEBPACK_IMPORTED_MODULE_0__container__["a" /* Container */].runtime = this;
        // set inital variables that have to happen after other things here
        this.volume = 0.5;
        this.sprites = new __WEBPACK_IMPORTED_MODULE_0__container__["a" /* Container */]();
    }
    ///
    /// ASSETS
    ///
    // add an asset and start loading it
    addImage(src) {
        // uses the original src for storage
        // TODO: consider using the new src and adding that into getAsset?
        const originalSrc = src;
        // add the extension and folder
        src = `assets/${src}`;
        if (src.indexOf(".") === -1) {
            src += "." + IMAGE_FORMAT;
        }
        console.log("adding image", src);
        const promise = new Promise((resolve, reject) => {
            const image = new Image();
            image.src = src;
            image.onload = () => resolve();
            image.onerror = () => reject();
            this.images.set(originalSrc, image);
        });
        this._assetPromises.push(promise);
        return promise;
    }
    // see: addImage()
    addSound(src) {
        const originalSrc = src;
        // add the extension and folder
        src = `assets/sounds/${src}`;
        if (src.indexOf(".") === -1) {
            src += "." + SOUND_FORMAT;
        }
        console.log("adding sound", src);
        const promise = new Promise((resolve, reject) => {
            const sound = new Audio(src);
            sound.oncanplaythrough = () => resolve();
            sound.onerror = () => reject();
            sound.preload = "auto";
            this.sounds.set(originalSrc, sound);
        });
        this._assetPromises.push(promise);
        return promise;
    }
    // wait for all assets to load
    waitForAssets(handler = () => { }) {
        // progress reporting
        const total = this._assetPromises.length;
        let current = 0;
        for (const promise of this._assetPromises) {
            promise.then(() => {
                current++;
                handler(current / total);
            });
        }
        // the actual loading stuff
        return Promise.all(this._assetPromises)
            .then(() => {
            console.log("loaded assets");
            this._assetPromises = [];
        });
    }
    // get an asset with a name
    getImage(src) {
        const image = this.images.get(src);
        if (!image) {
            console.warn("Couldn't get image", src);
        }
        return image;
    }
    // get a sound with a name
    getSound(src) {
        return this.sounds.get(src);
    }
    // plays a sound and resets its currentTime to 0
    playSound(src) {
        if (typeof src === "string") {
            src = this.getSound(src);
        }
        src.currentTime = 0;
        src.volume = this.volume;
        src.play();
        return src;
    }
    // stops a sound and resets its currentTime to 0
    stopSound(src) {
        if (typeof src === "string") {
            src = this.getSound(src);
        }
        src.currentTime = 0;
        src.pause();
        return src;
    }
    ///
    /// CORE
    ///
    // resets things and starts the loop
    start() {
        console.log("starting loop");
        this.loop();
        this.started = true;
        new __WEBPACK_IMPORTED_MODULE_6__staticRenderer__["a" /* StaticRendererSprite */]({
            position: new __WEBPACK_IMPORTED_MODULE_9__vector__["a" /* Vector */](0, 0, -1),
            persistent: true,
        });
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
        requestAnimationFrame(() => this.loop());
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
    stopAllSounds() {
        for (const sound of this.sounds.values()) {
            this.stopSound(sound);
        }
    }
    // throws an error that is handled gracefully by the update function
    // stops ALL execution
    exit() {
        this.stopAllSounds();
        console.warn("exiting using exit()");
        // instances of ExitError are treated specially by the update function
        throw new __WEBPACK_IMPORTED_MODULE_4__errors_exit__["a" /* ExitError */]();
    }
    ///
    /// EVENTS
    ///
    // called when exiting
    onexit() {
        this.started = false;
    }
    // when volume is set
    onsetvolume(volume) {
    }
    ///
    /// RENDERING
    ///
    updateStatic() {
        this.resetCanvas(this.staticCtx);
        this.sortSprites();
        for (const sprite of this.sprites) {
            if (sprite.static) {
                sprite.render(this.staticCtx);
                if (this._DEBUG_STATIC_OUTLINE) {
                    this.staticCtx.strokeStyle = "orange";
                    this.staticCtx.lineWidth = 1;
                    this.staticCtx.beginPath();
                    this.staticCtx.rect(sprite.x, sprite.y, sprite.width, sprite.height);
                    this.staticCtx.stroke();
                }
            }
        }
    }
    render() {
        // clear the canvas
        this.resetCanvas(this.ctx, this.background);
        // sort sprites by z TODO: perhaps only do this when we know something changed?
        this.sortSprites();
        // render all non static sprites onto our canvas
        for (const sprite of this.sprites) {
            if (!sprite.static) {
                sprite.render(this.ctx);
                if (this._DEBUG_NON_STATIC_OUTLINE) {
                    this.ctx.strokeStyle = "red";
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.rect(sprite.x, sprite.y, sprite.width, sprite.height);
                    this.ctx.stroke();
                }
            }
        }
    }
    sortSprites() {
        this.sprites.sort();
    }
    // clears the canvas and sets the background or makes it transparent
    resetCanvas(ctx, background = "rgba(0, 0, 0, 0)") {
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;
        ctx.scale(1, 1);
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, width, height);
    }
    createCanvas() {
        const canvas = document.createElement("canvas");
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;
        const ctx = canvas.getContext("2d");
        // makes images that are scaled still look pixelated, this is mainly for retro-style games
        // thanks web browsers for using vendor prefixed things
        ctx.imageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.mozImageSmoothingEnabled = false;
        return canvas;
    }
    ///
    /// ACCESSORS
    ///
    get volume() {
        return this._volume;
    }
    set volume(volume) {
        for (const sound of this.sounds.values()) {
            sound.volume = volume;
        }
        this._volume = volume;
        this.onsetvolume(volume);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GameRuntime;



/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(38);

/*
 * The keyboard driver for computers
 */
class Keyboard extends __WEBPACK_IMPORTED_MODULE_0__base__["a" /* AbstractKeyboard */] {
    constructor(runtime) {
        super(runtime);
        document.addEventListener("keydown", (e) => {
            const keyCode = e.keyCode;
            if (Keyboard.PREVENT.indexOf(keyCode) > -1) {
                e.preventDefault();
            }
            this.keys[keyCode].isPressed = true;
        });
        document.addEventListener("keyup", (e) => {
            const keyCode = e.keyCode;
            if (Keyboard.PREVENT.indexOf(keyCode) > -1) {
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
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__task__ = __webpack_require__(2);

/*
 * A few base classes and things to extend for keyboard drivers
 *
 * Currently there's only one driver for computers but I want to add one for mobile.
 */
class AbstractKeyboard extends __WEBPACK_IMPORTED_MODULE_0__task__["b" /* TaskRunner */] {
    constructor(runtime) {
        super();
        this.keys = [];
        runtime.addTask(() => this.update());
        for (let i = 0; i < AbstractKeyboard.KEY_COUNT; i++) {
            this.keys[i] = new Key(this);
        }
    }
    update() {
        this.runTasks();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AbstractKeyboard;

AbstractKeyboard.KEY_COUNT = 256;
class Key {
    constructor(keyboard) {
        this.isPressed = false;
        this.framesDown = 0;
        keyboard.addTask(() => this.update());
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
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(16);

/*
 * A mouse driver for computers
 */
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
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vector__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base__ = __webpack_require__(16);


/*
 * A mouse driver for touchscreens
 *
 * A little buggy but it does get the job done
 */
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
        runtime.canvas.addEventListener("touchmove", (e) => this.handleEvent(e));
        runtime.canvas.addEventListener("touchstart", (e) => this.handleEvent(e));
        runtime.canvas.addEventListener("touchend", (e) => this.handleEvent(e));
        runtime.canvas.addEventListener("touchcancel", (e) => this.handleEvent(e));
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
        return new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* Vector */](curleft - document.body.scrollLeft, curtop - document.body.scrollTop);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TouchscreenMouse;



/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*
 * When calling runtime.exit() this error is thrown
 * It is handled by the game better and calls onexit()
 */
class ExitError extends Error {
    constructor() {
        super("Stopping game execution");
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ExitError;



/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sprite__ = __webpack_require__(7);

class StaticRendererSprite extends __WEBPACK_IMPORTED_MODULE_0__sprite__["a" /* AbstractSprite */] {
    render(ctx) {
        ctx.drawImage(this.runtime.staticCanvas, 0, 0);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = StaticRendererSprite;



/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(6);

// This is how the original defines jump lights
// It does not use the level code
// (although I believe it at one point did due to the image name being "^.png", as if it were the ^ character in level codes)
const JUMP_LIGHTS = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    // in scratch: 10
    [
        Object(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* scratchCoordinate */])(-168, -60),
        Object(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* scratchCoordinate */])(-184, 20),
        Object(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* scratchCoordinate */])(-168, 100),
        Object(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* scratchCoordinate */])(-56, 36),
        Object(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* scratchCoordinate */])(136, -132),
        Object(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* scratchCoordinate */])(184, -76),
        Object(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* scratchCoordinate */])(136, -20),
        Object(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* scratchCoordinate */])(88, 20),
        Object(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* scratchCoordinate */])(136, 76),
        Object(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* scratchCoordinate */])(184, 116),
    ],
    // in scratch: 11
    [
        Object(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* scratchCoordinate */])(-200, 116),
        Object(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* scratchCoordinate */])(104, -52),
        Object(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* scratchCoordinate */])(-120, -44),
        Object(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* scratchCoordinate */])(-120, 36),
        Object(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* scratchCoordinate */])(-200, -28),
    ],
    // in scratch: 12
    [
        Object(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* scratchCoordinate */])(104, -28),
        Object(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* scratchCoordinate */])(-80, -116),
    ],
    // in scratch: 13
    [
        Object(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* scratchCoordinate */])(0, -44),
        Object(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* scratchCoordinate */])(0, 20),
        Object(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* scratchCoordinate */])(0, 84),
    ],
    [],
    [],
    // in scratch: 16
    [
        Object(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* scratchCoordinate */])(-144, -60),
        Object(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* scratchCoordinate */])(-144, 0),
        Object(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* scratchCoordinate */])(-144, 60),
        Object(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* scratchCoordinate */])(0, -44),
        Object(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* scratchCoordinate */])(144, -60),
        Object(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* scratchCoordinate */])(144, 0),
        Object(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* scratchCoordinate */])(144, 60),
    ],
    [],
    [],
    // in scratch: 19
    [
        Object(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* scratchCoordinate */])(0, -52),
        Object(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* scratchCoordinate */])(104, 20),
        Object(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* scratchCoordinate */])(176, -35),
    ],
];
/* harmony export (immutable) */ __webpack_exports__["a"] = JUMP_LIGHTS;



/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getLevels;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_vector__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sprites_bosses_noss__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sprites_bosses_sword_sword__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sprites_star__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sprites_bosses_final_finalboss__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sprites_bosses_noss_noss__ = __webpack_require__(48);






function deleteBackgroundStars(game) {
    // the sprites are removed from the list as we iterate over it
    // so a normal for loop would skip half the items
    const sprites = game.sprites.sprites.filter((s) => s instanceof __WEBPACK_IMPORTED_MODULE_3__sprites_star__["a" /* BackgroundStarSprite */]);
    for (const star of sprites) {
        star.destroy();
    }
}
function bossSpawner(bossType, texture) {
    // Spawn the boss with the texture at 0,0
    // The sprite should correct any values such as position
    return () => {
        new bossType({
            position: new __WEBPACK_IMPORTED_MODULE_0__engine_vector__["a" /* Vector */](0, 0, 0),
            texture,
        });
    };
}
// This is terrible and should be changed.
function getLevels(game) {
    return [
        /* tslint:disable:max-line-length */
        // 0
        {
            levelData: "eaaaaaaaaafeaaaafeaaaaaaaaaaaaeaaaaaaaaafbccccdeaaaaaaaaaaaaeaaaaaaaaafooooooeaaaaaaaaaaaaeaaaaaaaaaf......eaaaaaaaaaaaaeaaaaaaaaaf......eaaaaaaaaaaaabcccccccccd......bcccmaaaaaaaajkpppkkpqkl......jkqpeaaaaaaaa.....................eaaaaaaaa.....................eamccccnc.....................bcdkpkq.k.....................qpl..............................................................................................................................................................................................................................................................................................................................................................................",
            newBackground: "black",
            newBackgroundMusic: [game.getSound("music/exploration")],
        },
        // 1
        {
            levelData: "aaaaaaaaaafr.r.r.r.r.r.eaaaaaaaaaaaaaaaafo.o.o.o.o.o.eaaaaaaaaaaaaaaaaf............eaaaaaaaaaaaaaaaaf............eaaaaaaaaaaaaaaaaf............eaaaaaaaaaaaaaaaaf.gi.........eaaaaaaaaaaaaaaaaf.jl.........eaaaaaaaaaaaaaaaaf.......gi...eaaaaaaccccccccccd.......jl...eaaaaaaqkkpkpqqkkl...........gmaaaaaa.....................gmaaaaaaa.....................bcmaaaaaa.....................kqeaaaaaa............ghhhhi.....eaaaaaa............jpqqkl.....eaaaaaa......ghi..............eaaaaaa......qkp..............eaaaaaa.......................eaaaaaa.............ghhhhi....bccnccc.............jqkkpl....pkq.kqk..........................................................................................",
        },
        // 2
        {
            levelData: "aaaaaaf..............srrrrrrrraaaaaaf..............srrrrrrrraaaaaaf..............srrrrrrrraaaaaaf..............sssssrrrraaaaaaf..................srrrraaaaaaf..t....t..........srrrraaaaaaf..................srrrraaaaaaf..................ssnssaaaaaaf.......................ccccccd.......................kpkqqkl....gi............................ef.........ghhhhhhh...........ef.......ghmaaaaaaa...........ef......gmaaaaaaaaa...........emhhhhhhmaaaaaaaaaa...........eaaaaaaaaaaaaaaaaaa.........ghmaaaaaaaaaaaaaaaaaa.......ghmaaaaaaaaaaaaaaaaaaaa.....ghmaaaaaaaaaaaaaaaaaaaaaa...ghmaaaaaaaaaaaaaaaaaaaaaaaa..gmaaaaaaaaaaaaaaaaaaaaaaaaaa.gmaaaaaaaaaaaaaaaaaaaaaaaaaaa.eaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        },
        // 3
        {
            levelData: "rrrrrs...................srrrrrrrrrs...................srrrrrrrrrs...................srrrrrrrrrs...................srrrrrrssss...................ssnssrrs......t...t................rrs...........................sss..............t...................................................gi............................emhi.................hi......gmaaf.................amhi...gmaaami...............gaaamhhhmaaaaamhi...........ghmaaaaaaaaaaaaaaamhhi.....ghhmaaaaaaaaaaaaaaaaaaaamhhhhhmaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        },
        // 4
        {
            levelData: "aaaaaf.............t....eaaaaaaaaaaf...t..............bcmaaaaaaaaf........t...........bmaaaaamcd.....................bcmmccd.........................ef...........................gmf.....ghhhvvvvvvhhhi.......gmami...gmmcdoo..oobccmhhi....peafp..gmaf...........bcmmhhi..eaf...qeaf.............bmafp..eami...emmi.............emd...eaami..efpp..ghhhi......ef...gmaafq..ef....pqncmi....gmd...eaaaf...bmi.......ef....bd....eaaaf....ef.......ef....w....gmaaami...ef.ghhhhhmmi...w....eaaaaami..emhmccuccmamhi.w..ghmaaaaaaf..bccd.....bmaamhhhhmaaaaaaaaf............eaaaaaaaaaaaaaaaami..........gmaaaaaaaaaaaaaaaaami.......ghmaaaaaaaaaaaaaaaaaaamhhhhhhhmaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        },
        // 5
        {
            levelData: "aaaaaaaaaaafbccccdeaaaaaaaaaaaaaaaaaaaaaafooooooeaaaaaaaaaaaaaaaaaaaaaaf......eaaaaaaaaaaaaaaaaaaaaaaf......eaaaaaaaaaaaaaaaaaaaaaaf......eaaaaaaaaaaaaaaaaaaaaaaf......eaaaaaaaaaaaaaaaaaaaaaaf......eaaaaaaaaaaacccccccccccd......bccccccccccckkpppkkqpkkl......jkqkqkkpqqpp....................................................................................................................................................................................................................................................................................................................................................................................................................................",
            handlers: [bossSpawner(__WEBPACK_IMPORTED_MODULE_2__sprites_bosses_sword_sword__["a" /* SwordBoss */], game.getImage("boss/sword/sword"))],
            newBackgroundMusic: [game.getSound("music/boss/1"), game.getSound("music/boss/2")],
        },
        // 6
        {
            levelData: "aaaaaa5...................4aaaaaaaaa5...........y.......4aaaaaaaaa5...................4aaaaaaaaa5.....y.zzz.........1222aaaaaa5............zzz......x.aaaaaa5.......................2222223..zzz..............................................................................................................y..........................................................................................................................y678...........................4a5..........67778............123...t......4aaa5......68..............t..12n23......13....................................................................................................................................................",
            newBackgroundMusic: [game.getSound("music/blackroad/1"), game.getSound("music/blackroad/2")],
        },
        // 7
        {
            levelData: "aaaaaaaaaaaaaaaa5..!!!!!4aa5..aaaaaaaaaaaaaaaa5.....x.4aa98.aaaaaaaaaaaaaaaa5.......4aaa5.a9222222222229aa5.......4aaa98a5...w..w....4aa5..!!!!!122223a5...w.......4aa5.......aaaa..a5...w.......4aa5.......aaaa..a5.........!!4aa5!!!!!!!6778!.a5...........4aa5ooooooo4aa5..a978.........1223.......1223..aaa978........................aaaaa98.......................aaaaaa98......................aaaaaaa9778!!!!!..............229a9222223....................z1u3z.........................z...z......68ww68.............z...z......45!!45.............zzzzz......45..45........................45..45........................45..45........................497@95........................4aaaa5............",
        },
        // 8
        {
            levelData: "aaaa5...ooo45.45..45..soo4aaaaaaaa5......13.13..13..s..4aaaaaaaa5....s............s..4aaaa22223....s..#s$.......s..12222.........s..#ssss%s...s.......8........s..#ssssss!!!s.......978.....ss..#ss.......s.......aa98.....s...s$.sssssss@s.....aaa98....s...s$.s.......s.....aaaa98...s$..s$!s.......s.....aaaa93...s$..s$.s.......s.....aaaa5....s$..s$.s.......s.....aaaa5....s$..s$.s.......s.....aaaa5....s...s$!s.......s.....aaaa5...ss...s$.s.......s.....aaaa5....s..#s$.s!!!!!!!s.....aaaa5....s..#s$.sooooooos.....aaaa5....s..#s$!s......!s.....aaaa5.......#s$...............aaaa5.......ss$...............aaaa97778...ss$...............aaaaaaaa97778.................aaaaaaaaaaaa5.................",
        },
        // 9
        {
            levelData: "aaaaaaaaa5oooooooo4aa5......4aaaaaaaaaa5........4aa5......4aaaaaaaaaa5........1223......4a22222229a5..................4a.......4a5..................4a.......4a5..................4a.......4a5.............%....4a8ss....4a5.............o....4a5oo....4a5..................4a5......4a5..................4a5......4a5..................4a5......4a5...678............4a5....ss4a5...4a5.......%....4a5....oo4a5...4a5.......o....4a5......4a5...4a5............4a5......4a5...4a5............4a5......4a5...4a5............4a5s.....4a5...4a5............4a5o.....123...4a5.......%....4a5............4a5.......o....1n5............4a5..............5............4a5..............5............4a5..............",
        },
        // 10
        {
            levelData: "4aaaaaaaaaaaaa5............4aa4aaaaaaaaaaaaa5............4aa4aaaaaaaaaaaaa5............4aa4aaaaaaaaaaaaa5............1n2122222222222223............w........y....................w........y.............zzz....w..$..#ss$.#s..........z.z....w..$...#s$.#s..........z.z....w..$....s$.#s....%.....zzz....w..s$...s$.#s...#s$...........w..ss$..s$.#s...#s$...........w..sss!!s$.#s...#s$...........w..sx...s$.#s...#s$...........w..s....s$.#s...#s$...........w.......su!ss...#s$...........w.......s...s...#s$...........w.......s...s...#s$...........w.......s...s...#s$...........w.......s!!!s...#s$..........#s$..............#s$..........#s$..............#s$..........#s$..............#s$..........#s$.",
        },
        // 11
        {
            levelData: "aaaaaa5....................4aaaaa92n3....................4aaaaa5......................69aaaaa5.....................6aaaaaaa9778..................129aaaaaaaa5....................4aaaaaaaa5....................4aaaaaaaa5....................4aaaaaaaa5....................4aaaaaaaa5....................4aaaaaaaa5....................4aaaaaaaa5....................4aaaaaaaa5....................4aa2222223wwwwwwwwwwwwwwwwwwww1u2..............................................................................................................................................................................................................................................................................",
        },
        // 12
        {
            levelData: "2222222222229aaaa9222222222222............4aaaa5........................4aaaa5........................122223......................................._=+...........................)^-...........................)^-...........................)^-......6778.................)^-......1223.................)^-...........................)^-...........................)^-...........................)^-.......................6777)^-.......................1222)^-...........................)^-...........................)^-...67778...................)^-...12223...................)^-...........................)^-.........................._`^-..........................&**(..............................",
            handlers: [bossSpawner(__WEBPACK_IMPORTED_MODULE_5__sprites_bosses_noss_noss__["a" /* NossBoss */], game.getImage(__WEBPACK_IMPORTED_MODULE_1__sprites_bosses_noss__["b" /* BASE_TEXTURE */]))],
            newBackgroundMusic: [game.getSound("music/boss/1"), game.getSound("music/boss/2")],
        },
        // 13
        {
            levelData: "^^^-..........................^^^-..........................***(...t...................................t.............................................................................................t.....................................................................................t.......t................t..............................................................................u.......................................t.....%%%..........................%_=+%........................#_`^`+$.......................#)^^^-$.......................#&*n*($........%%%..............w.w.........._=+..............www..........)^-...........................)^-...........................)^-.",
            newBackground: game.ctx.createPattern(game.getImage("brick"), "repeat"),
            handlers: [deleteBackgroundStars],
            newBackgroundMusic: [game.getSound("music/netherslament")],
        },
        // 14
        {
            levelData: "^^^^-......................)^^^^^^-......................)^^****(...t...t...t...t..t..t)^^...........................)^^...........................)^^...........................&**....._==================+..........)`*****************(....._====`-oooooooooooooooooo.....&*****(..t...t...t...t...t.....................................................................t.............................._=======================......&*******************`^^^......oooooooooooooooooooo)^^^......t....t....t....t....&*n*........................................................................................................................==============================^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^",
        },
        // 15
        {
            levelData: "^^^^-....................)^^^^^^^^-....................)^^^^****(....................&*u**.....................................................................................................................................................................................................................................................................................................................................%%%%%====+...................._====^^^^-....................)^^^^****(....................&*n**..x......................zw.wz.........................zwwwz.........................zzzzz..........................................................................................",
        },
        // 16
        {
            levelData: "^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^`****************************`-...........................#)-...........................#)-...........................#)-!!_+......y.....zww..._+z..#)-..)-..................)-...#)-..)-..................)-...#)-%.)-..................)-...#)-sz)-......y.......zww.)-z..#)-..)-..................)-...#)-..)-..................)-...#)-.%)-..................)-...#)-zs)-......y.....wwz...)-z..#)-..)-..................)-...#)-..)-..................)-...#)-%.)-......s........._=`-s..#)-uz&(......x.........&n`-x..#)-....................w.)-...#)-....................w.)-...#)`======================``====`^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^",
        },
        // 17
        {
            levelData: "^^^^^^^^^^^^-....)^^^^^^^-....^^^^^^^^^^^^-....)^^^^^^^-....************(....&*******(................................................................................................yyy......................t.................................................................y..........ss............................x..............t.................................w............................w.w..........................._@+....................t......)^-................t..........&u(...t...t...t.................................................................................................................................................................................................",
            dark: true,
        },
        // 18
        {
            levelData: "^^^^^^^^-oooooooooooo)^^^^^^^^^^^^^^^^-............)^^^^^^^^^^^^^^^^-............)^^^^^^^^********(............&********................................................................................................................................................................................................................................................==================+$..........^^^^^^^^^^^^^^^^^^-$..........`*****************($..........-.............................-.............................-.............................-.............................-.............................-.............................`=@=======+...................^^^^^^^^^^-...................",
            dark: true,
        },
        // 19
        {
            levelData: "..)^^^^^^^^^^^^^^^^^^^^^^^^-....)^^^^^^^^^^^^^^^^^^^^^^^^-....&************************(..........................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................",
            newBackgroundMusic: [game.getSound("music/finalboss/1"), game.getSound("music/finalboss/2")],
            handlers: [bossSpawner(__WEBPACK_IMPORTED_MODULE_4__sprites_bosses_final_finalboss__["a" /* FinalBoss */], game.getImage(__WEBPACK_IMPORTED_MODULE_1__sprites_bosses_noss__["b" /* BASE_TEXTURE */]))],
        },
        // end
        {
            levelData: "",
        },
    ];
}


/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_sprites_imagesprite__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__engine_vector__ = __webpack_require__(0);


/*
 * Health events for bosses
 *
 * +0, +1, -1
 */
const LIFESPAN = 60;
const OPACITY_PER_FRAME = 1 / LIFESPAN;
const SIZE_CHANGE = 0.025;
const Y_CHANGE = 0.5;
class HitEffectSprite extends __WEBPACK_IMPORTED_MODULE_0__engine_sprites_imagesprite__["a" /* ImageSprite */] {
    constructor(opts) {
        super(opts);
        this.lifespan = 0;
        this.addTask(() => this.run());
        this.startingHeight = this.height;
        this.startingWidth = this.width;
        this.startingPosition = new __WEBPACK_IMPORTED_MODULE_1__engine_vector__["a" /* Vector */](this.position);
    }
    run() {
        this.lifespan++;
        if (this.lifespan >= LIFESPAN) {
            this.destroy();
        }
        this.opacity -= OPACITY_PER_FRAME;
        // adjust the size accordingly
        const mult = (1 + (this.lifespan * SIZE_CHANGE));
        this.height = this.startingHeight * mult;
        this.width = this.startingWidth * mult;
        this.x = this.startingPosition.x - ((this.width - this.startingWidth) / 2);
        this.y = this.startingPosition.y - ((this.height - this.startingHeight) / 2);
        // this is terrible
        this.startingPosition.y -= Y_CHANGE;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = HitEffectSprite;



/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__engine_task__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__engine_vector__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__engine_vector2d__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__boss__ = __webpack_require__(17);





/*
 * The first boss: A Sword
 *
 * This code is terrible. Please do not try to maintain it. Rewrite it from the ground up.
 */
const HEALTH = 3;
// swipe and spin cycle
const SPIN_ROTATION_SPEED = 5 / 2;
const SPIN_SIZE_CHANGE_RATE = 0.035;
const SWIPE_ROTATION_SPEED = 10 / 2;
const SWIPE_MOVE_SPEED = 12.5 / 2;
const SWIPE_BASE_DELAY = 60;
const SWIPE_SIZE_CHANGE_RATE = 0.115;
const SWIPE_ANIMATE_TIMES = 15;
const SWIPE_ANIMATE_FRAME_LENGTH = 3;
const SWIPE_TEXTURES = [
    "boss/sword/sword",
    "boss/sword/open",
];
const SWIPE_DOWN_SPEED = 15 / 2;
const SWIPE_UP_SPEED = SWIPE_DOWN_SPEED / 2;
// getting damaged
const DAMAGED_FALL_SPEED = 5;
const DAMAGED_RISE_SPEED = DAMAGED_FALL_SPEED / 2;
const DAMAGED_ANIMATE_TIMES = 20;
const DAMAGED_TEXTURES = [
    "boss/sword/open",
    "boss/sword/hurt",
];
const DAMAGE_ANIMATE_FRAME_LENGTH = 2;
const PLAYER_JUMP_YV = 3;
// death
const DEAD_ROTATION_SPEED = 0.742857142857 / 2; // 0.742... is how the game actually defines this.
const DEAD_STARTING_VELOCITY = 2;
// collision
const COLLISION_INTERVAL = 3;
const COLLISION_SPEED = 3;
class SwordBoss extends __WEBPACK_IMPORTED_MODULE_4__boss__["a" /* AbstractBoss */] {
    constructor(opts) {
        super(opts);
        this.health = HEALTH;
        this.hitPlayer = false;
        this._sizeScale = 1;
        this.spinDirection = 1;
        this.yv = DEAD_STARTING_VELOCITY;
        this.testCollision = false;
        this.startingHeight = this.height;
        this.startingWidth = this.width;
        this.resetCoordinates();
        this.addTask(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
            run: () => this.beginSpinAttack(),
            delay: 60,
        }));
        this.addTask(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
            run: () => this.intersectTest(),
            repeatEvery: COLLISION_INTERVAL,
        }));
        this.rotationPoint = new __WEBPACK_IMPORTED_MODULE_3__engine_vector2d__["a" /* Vector2D */](0.5, 0.1);
    }
    //
    // Utilities
    //
    intersectTest() {
        if (!this.testCollision) {
            return;
        }
        if (this.complexIntersectsSimple(this.runtime.player)) {
            this.runtime.player.kill();
            this.hitPlayer = true;
        }
    }
    startRoutine() {
        super.startRoutine();
        this.texture = this.runtime.getImage("boss/sword/sword");
        this.beginSpinAttack();
    }
    resetCoordinates() {
        this.recenter();
        this.y = 14 * __WEBPACK_IMPORTED_MODULE_0__config__["a" /* BLOCK_HEIGHT */];
    }
    recenter() {
        this.x = this.runtime.canvas.width / 2 - this.width / 2;
    }
    animate(textures, times, length, cb) {
        for (let i = 0; i < times; i++) {
            this.addTask(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
                run: () => {
                    this.texture = this.runtime.getImage(textures[i % textures.length]);
                    if (cb) {
                        cb();
                    }
                },
                delay: i * length,
            }));
        }
    }
    //
    // Spin Attack
    //
    beginSpinAttack() {
        this.testCollision = true;
        this.spinDirection = -this.multiplier;
        this.phaseDelay = SWIPE_BASE_DELAY;
        this.hitPlayer = false;
        this.addTask(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
            run: (task) => this.spinAttack(task),
            repeatEvery: 0,
            delay: 60,
        }));
    }
    spinAttack(task) {
        this.rotation += this.spinDirection * SPIN_ROTATION_SPEED;
        // could be pos or neg
        if (Math.abs(this.rotation) >= 180) {
            this.sizeScale -= SPIN_SIZE_CHANGE_RATE;
        }
        else {
            this.sizeScale += SPIN_SIZE_CHANGE_RATE;
        }
        // could be pos or neg
        if (Math.abs(this.rotation) >= 360) {
            this.rotation = 0;
            task.stop();
            this.beginSwipeAttack();
        }
        this.resetCoordinates();
    }
    //
    // Swipe Attack
    //
    beginSwipeAttack() {
        // make sure some values are reset properly
        this.sizeScale = 1;
        this.rotation = 0;
        this.phaseDelay = SWIPE_BASE_DELAY;
        // This is terrible.
        const multi = this.multiplier;
        const animate = () => {
            this.addPhase(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
                run: () => this.animate(SWIPE_TEXTURES, SWIPE_ANIMATE_TIMES, SWIPE_ANIMATE_FRAME_LENGTH),
                delay: 10,
            }), SWIPE_ANIMATE_TIMES * SWIPE_ANIMATE_FRAME_LENGTH);
        };
        const attack = () => {
            this.addPhase(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
                run: () => this.swipeAttack(SWIPE_DOWN_SPEED),
                repeatEvery: 0,
                repeatMax: 16,
                delay: 10,
            }));
            this.addPhase(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
                run: () => this.swipeAttack(-SWIPE_UP_SPEED),
                repeatEvery: 0,
                repeatMax: 32,
            }));
        };
        this.addPhase(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
            run: () => this.swipeRotate(-1 * multi),
            repeatEvery: 0,
            repeatMax: 36,
        }));
        this.addPhase(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
            run: () => this.swipeMove(1),
            repeatEvery: 0,
            repeatMax: 24,
        }));
        this.addPhase(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
            run: () => {
                this.swipeRotate(-1 * multi);
                this.swipeSize(1);
            },
            repeatEvery: 0,
            repeatMax: 18,
        }));
        animate();
        attack();
        this.addPhase(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
            run: () => this.swipeRotate(1 * multi),
            repeatEvery: 0,
            repeatMax: 36,
        }));
        animate();
        attack();
        this.addPhase(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
            run: () => {
                this.swipeRotate(1 * multi);
                this.swipeSize(-1);
            },
            repeatEvery: 0,
            repeatMax: 18,
        }));
        this.addPhase(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
            run: () => this.swipeMove(-1),
            repeatEvery: 0,
            repeatMax: 24,
        }));
        this.addPhase(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
            run: () => this.beginRestPhase(),
        }));
    }
    swipeRotate(multi) {
        this.rotation += SWIPE_ROTATION_SPEED * multi;
    }
    swipeMove(multi) {
        this.y -= SWIPE_MOVE_SPEED * multi;
    }
    swipeAttack(speed) {
        this.y += speed;
    }
    swipeSize(multi) {
        this.sizeScale += SWIPE_SIZE_CHANGE_RATE * multi;
    }
    //
    // Rest Phase
    //
    beginRestPhase() {
        this.testCollision = false;
        if (this.hitPlayer) {
            this.texture = this.runtime.getImage("boss/sword/heal");
            this.spawnHitEffect(this.health === HEALTH ? "+0" : "+1");
            if (this.health < HEALTH) {
                this.health++;
            }
            this.addTask(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
                run: () => this.startRoutine(),
                delay: 60,
            }));
        }
        else {
            this.texture = this.runtime.getImage("boss/sword/open");
            this.addTask(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
                run: (task) => this.restVulnerable(task),
                repeatEvery: 0,
                repeatMax: 180,
            }));
            const health = this.health;
            this.addTask(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
                run: () => {
                    if (this.health === health) {
                        this.startRoutine();
                    }
                },
                delay: 180,
            }));
        }
    }
    restVulnerable(task) {
        // use simple intersects for performance reasons
        if (this.playerJumpedOn()) {
            this.bouncePlayer();
            this.damage();
            task.stop();
        }
    }
    damage() {
        this.health--;
        this.spawnHitEffect("-1");
        this.phaseDelay = 0;
        this.addPhase(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
            run: () => this.y += DAMAGED_FALL_SPEED,
            repeatEvery: 0,
            repeatMax: 5,
        }));
        this.addPhase(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
            run: () => this.animate(DAMAGED_TEXTURES, DAMAGED_ANIMATE_TIMES, DAMAGE_ANIMATE_FRAME_LENGTH),
        }), DAMAGED_ANIMATE_TIMES * DAMAGE_ANIMATE_FRAME_LENGTH);
        if (this.health === 0) {
            this.addPhase(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
                run: () => this.animate(DAMAGED_TEXTURES, DAMAGED_ANIMATE_TIMES, DAMAGE_ANIMATE_FRAME_LENGTH, () => {
                    this.rotation -= DEAD_ROTATION_SPEED;
                }),
            }), DAMAGED_ANIMATE_TIMES * DAMAGE_ANIMATE_FRAME_LENGTH);
            this.addPhase(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
                run: (task) => this.deadPhysics(task),
                repeatEvery: 0,
            }));
        }
        else {
            this.addPhase(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
                run: () => this.runtime.playSound("boss/sword/rumble"),
            }));
            this.addPhase(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
                run: () => this.animate(DAMAGED_TEXTURES, DAMAGED_ANIMATE_TIMES, DAMAGE_ANIMATE_FRAME_LENGTH),
            }), DAMAGED_ANIMATE_TIMES * DAMAGE_ANIMATE_FRAME_LENGTH);
            this.addPhase(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
                run: () => this.texture = this.runtime.getImage("boss/sword/sword"),
            }));
            this.addPhase(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
                run: () => this.y -= DAMAGED_RISE_SPEED,
                repeatEvery: 0,
                repeatMax: 10,
            }));
            this.addPhase(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
                run: () => this.startRoutine(),
            }));
        }
    }
    //
    // Dead
    //
    deadPhysics(task) {
        const physicsResult = this.runBasicPhysics(0, this.yv, {
            collision: false,
        });
        this.yv = physicsResult.yv;
        if (this.y > this.runtime.canvas.height) {
            task.stop();
            this.addTask(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
                run: () => this.spawnCoin(),
                delay: 30,
            }));
        }
    }
    spawnCoin() {
        const texture = this.runtime.getImage("coin/1");
        const x = (this.runtime.canvas.width / 2) - (__WEBPACK_IMPORTED_MODULE_0__config__["b" /* BLOCK_WIDTH */] / 2);
        const y = (this.runtime.canvas.height / 2) - (__WEBPACK_IMPORTED_MODULE_0__config__["b" /* BLOCK_WIDTH */] / 2);
        this.spawnLevelUpCoin(new __WEBPACK_IMPORTED_MODULE_2__engine_vector__["a" /* Vector */](x, y));
    }
    //
    // Getters and Setters
    //
    set sizeScale(scale) {
        this.height = this.startingHeight * scale;
        this.width = this.startingWidth * scale;
        this._sizeScale = scale;
        this.recenter();
    }
    get sizeScale() {
        return this._sizeScale;
    }
    get multiplier() {
        if ((this.runtime.player.x + this.runtime.player.width / 2) < (this.x + this.width / 2)) {
            return 1;
        }
        else {
            return -1;
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SwordBoss;



/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_task__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__zindex__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__noss__ = __webpack_require__(10);




const HEALTH = 3;
// seen in scratch as "Attack2"
const SLIDE_ATTACK_SPEED = 8;
// todo: can't figure out how to get the canvas width from outside a sprite
// so just hard coding a value for now
const SLIDE_ATTACK_REPEAT = Math.ceil(480 / SLIDE_ATTACK_SPEED);
const SLIDE_ATTACK_SIZE_CHANGE = 0.2 / 2;
const SLIDE_ATTACK_MIN = 5;
const SLIDE_ATTACK_MAX = 7;
// any size changes during thet slide attack are replaced with this for consistency
const DROP_ATTACK_SCALE = 3;
const DROP_ATTACK_GRAVITY = 14;
const DROP_ATTACK_FALL_LENGTH = 23;
const DROP_ATTACK_REPEAT = 4; // +1 for the last one where the boss becomes vulnerable
const DROP_ATTACK_END = 280 + 1 / 3;
const REST_TEXTURE = "boss/noss/rest";
class FinalBoss extends __WEBPACK_IMPORTED_MODULE_3__noss__["a" /* AbstractNossBoss */] {
    constructor(opts) {
        super(opts);
        this.canKillPlayer = false;
        this.health = HEALTH;
        this.wasHit = false;
        this.animationProgress = 0;
        this.z = __WEBPACK_IMPORTED_MODULE_2__zindex__["a" /* ZIndexes */].FinalBoss;
        this.visible = false;
        this.addTask(new __WEBPACK_IMPORTED_MODULE_0__engine_task__["a" /* Task */]({
            run: () => this.testForPlayer(),
            repeatEvery: 1,
        }));
        this.addTask(new __WEBPACK_IMPORTED_MODULE_0__engine_task__["a" /* Task */]({
            run: () => this.startRoutine(),
            delay: 60,
        }));
    }
    testForPlayer() {
        if (this.canKillPlayer && this.complexIntersectsSimple(this.runtime.player)) {
            this.runtime.player.kill();
        }
    }
    startRoutine() {
        super.startRoutine();
        this.canKillPlayer = true;
        this.wasHit = false;
        this.scale.x = 1;
        this.scale.y = 1;
        this.visible = true;
        const repeatSlideAttack = Object(__WEBPACK_IMPORTED_MODULE_1__utils__["c" /* getRandomInt */])(SLIDE_ATTACK_MIN, SLIDE_ATTACK_MAX);
        for (let i = 0; i < repeatSlideAttack; i++) {
            const addSpinAttack = (direction) => {
                this.addPhase(new __WEBPACK_IMPORTED_MODULE_0__engine_task__["a" /* Task */]({
                    run: () => this.prepareSlideAttack(direction),
                }), Object(__WEBPACK_IMPORTED_MODULE_1__utils__["c" /* getRandomInt */])(0, 60));
                this.addPhase(new __WEBPACK_IMPORTED_MODULE_0__engine_task__["a" /* Task */]({
                    run: () => this.slideAttack(direction),
                    repeatEvery: 0,
                    repeatMax: SLIDE_ATTACK_REPEAT,
                }));
            };
            addSpinAttack(1);
            addSpinAttack(-1);
        }
        const addDropAttack = (endDelay = true) => {
            this.addPhase(new __WEBPACK_IMPORTED_MODULE_0__engine_task__["a" /* Task */]({
                run: () => this.prepareDropAttack(),
            }));
            this.addPhase(new __WEBPACK_IMPORTED_MODULE_0__engine_task__["a" /* Task */]({
                run: () => this.dropAttack(),
                repeatEvery: 0,
                repeatMax: DROP_ATTACK_FALL_LENGTH,
            }), endDelay ? 33 : 0); // 33: 0.05 sec + 30 frames (repeat 15)
        };
        for (let i = 0; i < DROP_ATTACK_REPEAT; i++) {
            addDropAttack();
        }
        addDropAttack(false);
        this.addPhase(new __WEBPACK_IMPORTED_MODULE_0__engine_task__["a" /* Task */]({
            run: (task) => this.vulnerableAfterDropAttack(task),
            repeatEvery: 0,
            repeatMax: 90,
        }));
        this.addPhase(new __WEBPACK_IMPORTED_MODULE_0__engine_task__["a" /* Task */]({
            run: () => this.endRoutine(this.wasHit),
        }));
    }
    endRoutine(wasHit = false) {
        if (wasHit) {
            return;
        }
        this.poof();
        this.visible = false;
        this.texture = this.runtime.getImage(__WEBPACK_IMPORTED_MODULE_3__noss__["b" /* BASE_TEXTURE */]);
        this.addTask(new __WEBPACK_IMPORTED_MODULE_0__engine_task__["a" /* Task */]({
            run: () => this.startRoutine(),
            delay: 120,
        }));
    }
    prepareSlideAttack(direction) {
        this.runtime.playSound("boss/noss/shadow3");
        this.visible = false;
        this.scale.x = (Math.abs(this.scale.x) + SLIDE_ATTACK_SIZE_CHANGE) * direction;
        this.scale.y = (Math.abs(this.scale.y) + SLIDE_ATTACK_SIZE_CHANGE) * direction;
        if (direction === 1) {
            this.x = 0;
        }
        else if (direction === -1) {
            this.x = this.runtime.canvas.width;
        }
        this.y = this.runtime.player.y;
    }
    slideAttack(direction) {
        this.visible = true;
        this.canKillPlayer = true;
        this.x += SLIDE_ATTACK_SPEED * direction;
    }
    prepareDropAttack() {
        this.runtime.playSound("boss/noss/shadow2");
        this.scale.x = DROP_ATTACK_SCALE;
        this.scale.y = DROP_ATTACK_SCALE;
        this.y = -this.height;
        this.x = this.runtime.player.x - (this.width / 2);
    }
    dropAttack() {
        this.y += DROP_ATTACK_GRAVITY;
        if (this.y > DROP_ATTACK_END) {
            this.y = DROP_ATTACK_END;
        }
    }
    vulnerableAfterDropAttack(task) {
        this.canKillPlayer = false;
        this.texture = this.runtime.getImage(REST_TEXTURE);
        if (this.playerJumpedOn()) {
            this.bouncePlayer();
            this.spawnHitEffect("-1");
            this.health--;
            this.wasHit = true;
            this.animationProgress = 0;
            task.stop();
            if (this.health === 0) {
                this.playDeadAnimation();
            }
            else {
                this.playHitAnimation();
                this.addTask(new __WEBPACK_IMPORTED_MODULE_0__engine_task__["a" /* Task */]({
                    run: () => this.endRoutine(),
                    delay: __WEBPACK_IMPORTED_MODULE_3__noss__["c" /* HIT_ANIMATION_TOTAL_LENGTH */],
                }));
            }
        }
    }
    dead() {
        this.spawnLevelUpCoin(this.position);
        this.destroy();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FinalBoss;



/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_task__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__engine_vector__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__noss__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__bullet__ = __webpack_require__(49);





const POSITIONS = [
    {
        position: Object(__WEBPACK_IMPORTED_MODULE_2__utils__["d" /* scratchCoordinate */])(-156, 136),
    },
    {
        position: Object(__WEBPACK_IMPORTED_MODULE_2__utils__["d" /* scratchCoordinate */])(-116, -8),
    },
    {
        position: Object(__WEBPACK_IMPORTED_MODULE_2__utils__["d" /* scratchCoordinate */])(156, 72),
        direction: -1,
    },
];
const VULNERABLE_TEXTURE = "boss/noss/rest";
const STARTING_POS = Object(__WEBPACK_IMPORTED_MODULE_2__utils__["d" /* scratchCoordinate */])(-4, -104); // original (0, -108)
const HEALTH = 3;
class NossBoss extends __WEBPACK_IMPORTED_MODULE_3__noss__["a" /* AbstractNossBoss */] {
    constructor(options) {
        super(options);
        this.health = HEALTH;
        this.shouldEndRoutine = false;
        this.alreadyHit = false;
        this.visible = false;
        this.position = new __WEBPACK_IMPORTED_MODULE_1__engine_vector__["a" /* Vector */](STARTING_POS);
        this.addTask(new __WEBPACK_IMPORTED_MODULE_0__engine_task__["a" /* Task */]({
            run: () => this.start(),
            delay: 60,
        }));
    }
    start() {
        this.audiblePoof(true);
        this.addTask(new __WEBPACK_IMPORTED_MODULE_0__engine_task__["a" /* Task */]({
            run: () => this.startRoutine(),
            delay: 90,
        }));
    }
    //
    // ROUTINE
    //
    startRoutine() {
        super.startRoutine();
        this.shouldEndRoutine = false;
        this.alreadyHit = false;
        this.addPhase(new __WEBPACK_IMPORTED_MODULE_0__engine_task__["a" /* Task */]({
            run: () => this.poof(),
        }));
        this.addPhase(new __WEBPACK_IMPORTED_MODULE_0__engine_task__["a" /* Task */]({
            run: () => this.runtime.playSound("boss/noss/shadow1"),
        }), 60);
        this.addPhase(new __WEBPACK_IMPORTED_MODULE_0__engine_task__["a" /* Task */]({
            run: () => this.runtime.playSound("boss/noss/shadow3"),
        }), 90);
        this.addPhase(new __WEBPACK_IMPORTED_MODULE_0__engine_task__["a" /* Task */]({
            run: () => this.teleport(),
        }));
        this.addPhase(new __WEBPACK_IMPORTED_MODULE_0__engine_task__["a" /* Task */]({
            run: () => this.audiblePoof(),
        }), 60);
        this.addPhase(new __WEBPACK_IMPORTED_MODULE_0__engine_task__["a" /* Task */]({
            run: () => this.spawnBullets(),
            repeatEvery: 1,
            repeatMax: 10,
        }));
        this.addPhase(new __WEBPACK_IMPORTED_MODULE_0__engine_task__["a" /* Task */]({
            run: () => this.afterSpawnBullets(),
        }), __WEBPACK_IMPORTED_MODULE_4__bullet__["a" /* MOVE_TIME */]);
        this.addPhase(new __WEBPACK_IMPORTED_MODULE_0__engine_task__["a" /* Task */]({
            run: () => this.texture = this.runtime.getImage(VULNERABLE_TEXTURE),
        }));
        this.addPhase(new __WEBPACK_IMPORTED_MODULE_0__engine_task__["a" /* Task */]({
            // note: this.rest() does its own endRoutine(), task.stop()
            run: (task) => this.rest(task),
            repeatEvery: 0,
        }));
    }
    endRoutine() {
        this.addTask(new __WEBPACK_IMPORTED_MODULE_0__engine_task__["a" /* Task */]({
            run: () => this.startRoutine(),
            delay: 0,
        }));
    }
    teleport() {
        const position = POSITIONS[Object(__WEBPACK_IMPORTED_MODULE_2__utils__["c" /* getRandomInt */])(0, POSITIONS.length - 1)];
        this.position = new __WEBPACK_IMPORTED_MODULE_1__engine_vector__["a" /* Vector */](position.position);
        this.scale.x = position.direction || 1;
        this.texture = this.runtime.getImage(__WEBPACK_IMPORTED_MODULE_3__noss__["b" /* BASE_TEXTURE */]);
    }
    rest(task) {
        if (this.shouldEndRoutine || task.repeatCount >= 300) {
            this.endRoutine();
            task.stop();
        }
        if (!this.alreadyHit && this.playerJumpedOn()) {
            this.alreadyHit = true;
            this.bouncePlayer();
            this.spawnHitEffect("-1");
            this.health--;
            if (this.health === 0) {
                this.dead();
            }
            else {
                this.damage();
            }
        }
    }
    damage() {
        this.playHitAnimation();
        this.addTask(new __WEBPACK_IMPORTED_MODULE_0__engine_task__["a" /* Task */]({
            run: () => this.shouldEndRoutine = true,
            delay: __WEBPACK_IMPORTED_MODULE_3__noss__["c" /* HIT_ANIMATION_TOTAL_LENGTH */],
        }));
    }
    dead() {
        this.playDeadAnimation();
    }
    spawnBullets() {
        new __WEBPACK_IMPORTED_MODULE_4__bullet__["b" /* NossBossBulletSprite */]({
            position: this.position,
            texture: this.runtime.getImage("boss/noss/bullet"),
        });
    }
    afterSpawnBullets() {
        this.runtime.playSound("boss/noss/shadow4");
    }
    poof(newVisibility = !this.visible) {
        super.poof();
        this.visible = newVisibility;
    }
    // this function is brought to you by audible
    audiblePoof(newVisibility) {
        this.poof(newVisibility);
        this.runtime.playSound("boss/noss/shadow2");
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = NossBoss;



/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_sprites_imagesprite__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__engine_task__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__engine_utils__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__engine_vector__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils__ = __webpack_require__(6);





const GLIDE_TIME = 30;
const SPEED_GAIN = 0.2;
const TURN_SPEED = 7.5;
const MOVE_TIME = 180;
/* harmony export (immutable) */ __webpack_exports__["a"] = MOVE_TIME;

class NossBossBulletSprite extends __WEBPACK_IMPORTED_MODULE_0__engine_sprites_imagesprite__["a" /* ImageSprite */] {
    constructor(options) {
        super(options);
        this.speed = 0;
        this.addTask(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
            run: () => this.glideToCenter(),
            repeatEvery: 0,
            repeatMax: GLIDE_TIME,
        }));
        const canvasX = (this.runtime.canvas.width / 2) - (this.width / 2);
        const canvasY = (this.runtime.canvas.height / 2) - (this.height / 2);
        const center = new __WEBPACK_IMPORTED_MODULE_3__engine_vector__["a" /* Vector */](canvasX, canvasY);
        // figure out what rotation should be in order to glide to the center
        const distance = this.distanceTo(center);
        this.glideMoveSpeed = distance / GLIDE_TIME;
        const heightDifference = this.centerY - canvasY;
        this.rotation = -Object(__WEBPACK_IMPORTED_MODULE_2__engine_utils__["d" /* radiansToDegree */])(Math.acos(heightDifference / distance));
        if (this.centerX > canvasX) {
            this.rotation *= -1;
        }
        this.addTask(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
            run: () => this.move(),
            delay: GLIDE_TIME,
            repeatEvery: 0,
            repeatMax: MOVE_TIME,
        }));
        this.addTask(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
            run: () => this.destroy(),
            delay: MOVE_TIME,
        }));
        this.addTask(() => this.testIntersects());
    }
    glideToCenter() {
        this.moveForward(-this.glideMoveSpeed);
    }
    testIntersects() {
        if (this.intersects(this.runtime.player)) {
            this.runtime.player.kill();
        }
    }
    move() {
        this.speed += SPEED_GAIN;
        this.rotation -= TURN_SPEED;
        this.moveForward(this.speed);
        this.x = Object(__WEBPACK_IMPORTED_MODULE_4__utils__["a" /* clamp */])(this.x, 0, this.runtime.canvas.width);
        this.y = Object(__WEBPACK_IMPORTED_MODULE_4__utils__["a" /* clamp */])(this.y, 0, this.runtime.canvas.height);
    }
    render() {
        const rotation = this.rotation;
        this.rotation = 0;
        super.render.apply(this, arguments);
        this.rotation = rotation;
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = NossBossBulletSprite;



/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_task__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__blocks_block__ = __webpack_require__(1);


/*
 * A light that will allow the player to jump again once while in the air.
 */
const HIDE_DURATION = 60 * 3;
class JumpLight extends __WEBPACK_IMPORTED_MODULE_1__blocks_block__["a" /* Block */] {
    constructor(opts) {
        super(opts);
        this.addTask(() => this.testIntersects());
    }
    show() {
        this.visible = true;
    }
    activate(player) {
        player.hasJumpLight = true;
        this.visible = false;
        this.addTask(new __WEBPACK_IMPORTED_MODULE_0__engine_task__["a" /* Task */]({
            run: () => this.show(),
            delay: HIDE_DURATION,
        }));
    }
    testIntersects() {
        if (this.visible && this.intersects(this.runtime.player)) {
            this.activate(this.runtime.player);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = JumpLight;



/***/ })
/******/ ]);