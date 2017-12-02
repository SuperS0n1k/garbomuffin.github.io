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
/* harmony export (immutable) */ __webpack_exports__["a"] = getElement;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__error_idnotfound__ = __webpack_require__(5);

function getElement(id) {
    const el = document.getElementById(id);
    if (el === null) {
        throw new __WEBPACK_IMPORTED_MODULE_0__error_idnotfound__["a" /* ElementIDNotFoundError */](id);
    }
    return el;
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config_config__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__prompter_prompter__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_option__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__config_save__ = __webpack_require__(8);





const prompterElement = Object(__WEBPACK_IMPORTED_MODULE_2__utils__["a" /* getElement */])("prompter-lines");
const config = new __WEBPACK_IMPORTED_MODULE_0__config_config__["a" /* ConfigManager */]();
config.options.speed = new __WEBPACK_IMPORTED_MODULE_3__config_option__["a" /* ConfigOption */]({
    name: "speed",
    default: 1.5,
    el: Object(__WEBPACK_IMPORTED_MODULE_2__utils__["a" /* getElement */])("options-current-speed"),
    type: "number",
    setterOpts: {
        transform: (value) => value.toFixed(1),
    },
});
config.options.fontSize = new __WEBPACK_IMPORTED_MODULE_3__config_option__["a" /* ConfigOption */]({
    name: "fontSize",
    default: 75,
    el: Object(__WEBPACK_IMPORTED_MODULE_2__utils__["a" /* getElement */])("options-font-size"),
    type: "number",
    setterOpts: {
        onchange: true,
        callback: (value) => {
            prompterElement.style.fontSize = `${value}px`;
        },
    },
});
config.options.fontFamily = new __WEBPACK_IMPORTED_MODULE_3__config_option__["a" /* ConfigOption */]({
    name: "fontFamily",
    default: "sans-serif",
    el: Object(__WEBPACK_IMPORTED_MODULE_2__utils__["a" /* getElement */])("options-font-family"),
    type: "text",
    setterOpts: {
        onchange: true,
        callback: (value) => {
            prompterElement.style.fontFamily = `${value}, sans-serif`;
        },
    },
});
config.options.boldText = new __WEBPACK_IMPORTED_MODULE_3__config_option__["a" /* ConfigOption */]({
    name: "fontFamily",
    default: true,
    el: Object(__WEBPACK_IMPORTED_MODULE_2__utils__["a" /* getElement */])("options-bold-text"),
    type: "checkbox",
    setterOpts: {
        onchange: true,
        callback: (value) => {
            prompterElement.style.fontWeight = value ? "bold" : "normal";
        },
    },
});
config.options.text = new __WEBPACK_IMPORTED_MODULE_3__config_option__["a" /* ConfigOption */]({
    name: "text",
    default: "Enter your script here!",
    el: Object(__WEBPACK_IMPORTED_MODULE_2__utils__["a" /* getElement */])("text-input"),
    type: "text",
});
__WEBPACK_IMPORTED_MODULE_4__config_save__["a" /* Save */].load(config);
__WEBPACK_IMPORTED_MODULE_4__config_save__["a" /* Save */].save(config);
Object(__WEBPACK_IMPORTED_MODULE_2__utils__["a" /* getElement */])("save-button").onclick = () => __WEBPACK_IMPORTED_MODULE_4__config_save__["a" /* Save */].save(config);
Object(__WEBPACK_IMPORTED_MODULE_2__utils__["a" /* getElement */])("reset-button").onclick = () => __WEBPACK_IMPORTED_MODULE_4__config_save__["a" /* Save */].promptReset();
const prompter = new __WEBPACK_IMPORTED_MODULE_1__prompter_prompter__["a" /* Prompter */](config);
window.config = config;
window.prompter = prompter;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const STORAGE_KEY = "EasierPrompter_Config";
// TODO: saving & loading
class ConfigManager {
    constructor() {
        this.options = {};
    }
    get speed() {
        return this.options.speed.get();
    }
    set speed(value) {
        this.options.speed.set(value);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ConfigManager;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__abstract__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(0);


const SPEED_INCREMENT = 0.5;
class Prompter extends __WEBPACK_IMPORTED_MODULE_0__abstract__["a" /* AbstractPrompter */] {
    constructor(config) {
        super(config);
        this.prompterLines = Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* getElement */])("prompter-lines");
        this.addListeners();
    }
    reverseDirection() {
        super.reverseDirection();
        if (this.direction === __WEBPACK_IMPORTED_MODULE_0__abstract__["b" /* Direction */].Up) {
            Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* getElement */])("options-toggle-direction").textContent = "Moving Down";
        }
        else {
            Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* getElement */])("options-toggle-direction").textContent = "Moving Up";
        }
    }
    // Makes buttons work
    addListeners() {
        Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* getElement */])("start-button").addEventListener("click", (e) => {
            this.show();
        });
        Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* getElement */])("options-toggle-run").addEventListener("click", (e) => {
            if (this.scrolling) {
                this.stop();
            }
            else {
                this.start();
            }
        });
        Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* getElement */])("options-toggle-direction").addEventListener("click", (e) => {
            this.reverseDirection();
        });
        Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* getElement */])("options-exit").addEventListener("click", (e) => {
            this.hide();
        });
        Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* getElement */])("options-speed-up").addEventListener("click", (e) => {
            this.config.speed += SPEED_INCREMENT;
        });
        Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* getElement */])("options-speed-down").addEventListener("click", (e) => {
            this.config.speed -= SPEED_INCREMENT;
        });
    }
    // Applies the margin style to scroll the script
    render(distance) {
        const lines = this.prompterLines;
        lines.style.marginTop = `-${distance}px`;
    }
    // Changes an element's visibility
    setDisplay(el, show) {
        el.style.display = show ? "block" : "none";
    }
    // Shows the script
    show() {
        super.show();
        this.setDisplay(Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* getElement */])("main"), false);
        this.setDisplay(Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* getElement */])("prompter"), true);
    }
    // Hides the script
    hide() {
        super.hide();
        this.setDisplay(Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* getElement */])("main"), true);
        this.setDisplay(Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* getElement */])("prompter"), false);
    }
    getScript() {
        return Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* getElement */])("text-input").value;
    }
    // Removes all existing lines from the script element
    resetScript() {
        while (this.prompterLines.firstChild) {
            this.prompterLines.removeChild(this.prompterLines.firstChild);
        }
    }
    loadScript(script) {
        this.resetScript();
        const prompterLines = Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* getElement */])("prompter-lines");
        for (const line of script.split("\n")) {
            const listItem = document.createElement("li");
            listItem.textContent = line;
            prompterLines.appendChild(listItem);
        }
    }
    // computes how long the script is and stores it
    // makes sure we don't scroll way too far
    calculateTextLength() {
        const styles = window.getComputedStyle(this.prompterLines);
        const height = styles.height.replace("px", "");
        this.textLength = Number(height);
    }
    start() {
        super.start();
        Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* getElement */])("options-toggle-run").textContent = "Stop";
    }
    stop() {
        super.stop();
        Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* getElement */])("options-toggle-run").textContent = "Start";
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Prompter;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Direction; });
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 1] = "Up";
    Direction[Direction["Down"] = -1] = "Down";
})(Direction || (Direction = {}));
class AbstractPrompter {
    constructor(config) {
        this._scrollDistance = 0;
        this.showing = false;
        this.scrolling = false;
        this.direction = Direction.Up;
        this.textLength = Infinity;
        this.config = config;
        this.loop = this.loop.bind(this);
        this.loop();
    }
    // Start the scrolling
    start() {
        this.scrolling = true;
    }
    // Stop the scrolling
    stop() {
        this.scrolling = false;
    }
    // Reverse the going direction
    reverseDirection() {
        if (this.direction === Direction.Up) {
            this.direction = Direction.Down;
        }
        else {
            this.direction = Direction.Up;
        }
    }
    // Main loop - renders and scrolls
    loop() {
        requestAnimationFrame(this.loop);
        if (!this.showing) {
            return;
        }
        if (this.scrolling) {
            this.scroll();
        }
        this.render(this.scrollDistance);
    }
    // Move the current scroll distance according to the speed
    scroll() {
        this.scrollDistance += this.config.speed * this.direction;
    }
    // show the prompter
    // call super.show() in implementations
    show() {
        this.showing = true;
        this.scrollDistance = 0;
        this.loadScript(this.getScript());
        this.calculateTextLength();
    }
    // hide & stop the prompter
    // call super.hide() in implementations
    hide() {
        this.stop();
        this.showing = false;
    }
    get scrollDistance() {
        return this._scrollDistance;
    }
    set scrollDistance(distance) {
        if (distance < 0) {
            distance = 0;
        }
        if (distance > this.textLength) {
            distance = this.textLength;
        }
        this._scrollDistance = distance;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AbstractPrompter;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class ElementIDNotFoundError extends Error {
    constructor(id) {
        super(`Element with id '${id}' not found.`);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ElementIDNotFoundError;



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(7);

class ConfigOption {
    // constructor(def: T, el: HTMLElement, get: ConfigGetter<T>, set: ConfigSetter<T>) {
    constructor(options) {
        this.get = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* getterFrom */])(options.el, options.type);
        this.set = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* setterFrom */])(options.el, options.setterOpts);
        this.set(options.default);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ConfigOption;



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getterFrom;
/* harmony export (immutable) */ __webpack_exports__["b"] = setterFrom;
function getterFrom(el, type = "text") {
    let getter = () => el.textContent || "";
    if (el instanceof HTMLTextAreaElement) {
        getter = () => el.value;
    }
    if (el instanceof HTMLInputElement) {
        if (el.type === "checkbox") {
            getter = () => el.checked;
        }
        else {
            getter = () => el.value;
        }
    }
    if (type === "number") {
        return () => {
            const val = getter().trim();
            if (val === "") {
                return 0;
            }
            else {
                return Number(val);
            }
        };
    }
    return getter;
}
function setterFrom(el, opts = {}) {
    function _getSetterFunction() {
        if (el instanceof HTMLTextAreaElement) {
            return (value) => el.value = value;
        }
        if (el instanceof HTMLInputElement) {
            const type = el.type;
            if (type === "text") {
                return (value) => el.value = value;
            }
            else if (type === "number") {
                return (value) => el.value = value.toString();
            }
            else if (type === "checkbox") {
                return (value) => el.checked = value;
            }
            else {
                console.warn(`Unsupported input type: ${type}`);
            }
        }
        return (value) => el.textContent = value;
    }
    const setter = _getSetterFunction();
    const stack = [];
    if (opts.transform) {
        stack.push(opts.transform);
    }
    stack.push(setter);
    if (opts.callback) {
        stack.push(opts.callback);
    }
    const functionStack = generateFunctionStack(stack);
    if (opts.onchange) {
        el.onchange = () => {
            functionStack(getterFrom(el)());
        };
    }
    return functionStack;
}
function generateFunctionStack(functions) {
    return (value) => {
        for (const func of functions) {
            value = func(value);
        }
        return value;
    };
}


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// increase every time an incompatible change is made to the store data
const STORE_VERSION = "0";
// hopefully this is specific enough lol
const STORAGE_KEY = `easierPrompter${STORE_VERSION}_configStore`;
class Save {
    static getOptions() {
        const localConfig = localStorage.getItem(STORAGE_KEY);
        if (localConfig === null) {
            return {};
        }
        else {
            return JSON.parse(localConfig);
        }
    }
    static generateSaveData(config) {
        const res = {};
        for (const key of Object.keys(config.options)) {
            const value = config.options[key];
            res[key] = value.get();
        }
        return res;
    }
    static reset() {
        localStorage.removeItem(STORAGE_KEY);
        location.reload();
    }
    static save(config) {
        const data = Save.generateSaveData(config);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
    static load(config) {
        const options = Save.getOptions();
        for (const key of Object.keys(options)) {
            const value = options[key];
            config.options[key].set(value);
        }
    }
    static promptReset() {
        const message = [
            "Are yousure you want to reset the settings?",
            "This will reset your script, the config, and reload the page",
        ];
        if (confirm(message.join("\n\n"))) {
            Save.reset();
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Save;



/***/ })
/******/ ]);