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
function getElement(id) {
    return document.getElementById(id);
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config_config__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__prompter_prompter__ = __webpack_require__(4);


const config = new __WEBPACK_IMPORTED_MODULE_0__config_config__["a" /* Config */]();
config.load();
const prompter = new __WEBPACK_IMPORTED_MODULE_1__prompter_prompter__["a" /* Prompter */](config);
window.config = config;
window.prompter = prompter;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__abstract__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(0);


class Config extends __WEBPACK_IMPORTED_MODULE_0__abstract__["a" /* AbstractConfig */] {
    constructor() {
        super();
        this.prompterElement = Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* getElement */])("prompter-lines");
        this.speedElement = Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* getElement */])("options-current-speed");
        this.textInputElement = Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* getElement */])("text-input");
        this.fontSizeElement = Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* getElement */])("options-font-size");
        this.fontFamilyElement = Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* getElement */])("options-font-family");
        this.boldTextElement = Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* getElement */])("options-bold-text");
    }
    get speed() {
        return Number(this.speedElement.textContent);
    }
    set speed(speed) {
        this.speedElement.textContent = speed.toFixed(1);
    }
    get fontSize() {
        return Number(this.fontSizeElement.value) || 75;
    }
    set fontSize(fontSize) {
        this.fontSizeElement.value = fontSize.toString();
        this.prompterElement.style.fontSize = `${fontSize}px`;
    }
    get fontFamily() {
        return this.fontFamilyElement.value || "sans-serif";
    }
    set fontFamily(fontFamily) {
        this.fontFamilyElement.value = fontFamily;
        // set the font with sans-serif as a fallback
        this.prompterElement.style.fontFamily = `${fontFamily} sans-serif`;
    }
    get boldText() {
        return this.boldTextElement.checked;
    }
    set boldText(boldText) {
        this.boldTextElement.checked = boldText;
        this.prompterElement.style.fontWeight = boldText ? "bold" : "";
    }
    get text() {
        return this.textInputElement.value;
    }
    set text(text) {
        this.textInputElement.value = text;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Config;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class AbstractConfig {
    generateJSON() {
        return JSON.stringify({
            speed: this.speed,
            fontSize: this.fontSize,
            fontFamily: this.fontFamily,
            boldText: this.boldText,
            text: this.text,
        });
    }
    save() {
        localStorage.setItem(AbstractConfig.STORAGE_KEY, this.generateJSON());
        return this;
    }
    load() {
        const storage = localStorage.getItem(AbstractConfig.STORAGE_KEY);
        if (storage !== null) {
            try {
                const data = JSON.parse(storage);
                for (const key of Object.keys(data)) {
                    const value = data[key];
                    this[key] = value;
                }
            }
            catch (e) {
                // invalid json, save the current one and abort
                alert("Stored config invalid. Ignoring.");
            }
        }
        return this;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AbstractConfig;

AbstractConfig.STORAGE_KEY = "EasierPrompter_Config";


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__abstract__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(0);


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
            this.config.speed += Prompter.SPEED_INCREMENT;
        });
        Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* getElement */])("options-speed-down").addEventListener("click", (e) => {
            this.config.speed -= Prompter.SPEED_INCREMENT;
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

Prompter.SPEED_INCREMENT = 0.5;


/***/ }),
/* 5 */
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
        this.config.save();
        this.config.load();
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



/***/ })
/******/ ]);