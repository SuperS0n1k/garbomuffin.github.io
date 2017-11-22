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
/* harmony export (immutable) */ __webpack_exports__["b"] = save;
/* harmony export (immutable) */ __webpack_exports__["a"] = load;
// Saves configs and whatever
const CONFIG_KEY = "easierprompter_Config";
function save(config) {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
}
function load(defaults) {
    const localData = localStorage.getItem(CONFIG_KEY);
    if (localData) {
        return JSON.parse(localData);
    }
    else {
        save(defaults);
        return defaults;
    }
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__prompter__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(0);


function getElement(id) {
    return document.getElementById(id);
}
const defaultConfig = {
    fontSize: 75,
    boldText: false,
    lastPrompt: "Enter your script here!",
};
const prompter = new __WEBPACK_IMPORTED_MODULE_0__prompter__["a" /* EasierPrompter */]({
    optionsElements: {
        fontSize: getElement("options-font-size"),
        boldText: getElement("options-bold"),
    },
    buttons: {
        startStop: getElement("prompter-start-stop"),
        reverse: getElement("prompter-reverse"),
        speedUp: getElement("prompter-speed-up"),
        speedDown: getElement("prompter-speed-down"),
        edit: getElement("prompter-edit"),
    },
    inputElement: getElement("input"),
    prompterContainer: getElement("prompter"),
    prompterLinesContainer: getElement("prompter-lines-container"),
    prompterLinesElement: getElement("prompter-lines"),
    configContainer: getElement("config"),
    defaultConfig,
});
getElement("start").onclick = () => {
    prompter.showPrompt();
};
getElement("options-reset").onclick = () => {
    if (confirm("Are you sure?")) {
        __WEBPACK_IMPORTED_MODULE_1__config__["b" /* save */](defaultConfig);
        location.reload();
    }
};
// debugging from the console
window.prompter = prompter;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(0);

var RunningState;
(function (RunningState) {
    RunningState[RunningState["Running"] = 0] = "Running";
    RunningState[RunningState["Paused"] = 1] = "Paused";
})(RunningState || (RunningState = {}));
class EasierPrompter {
    constructor(options) {
        this._speed = 3;
        this.direction = 1;
        this.runningState = RunningState.Paused;
        this.currentOffset = 0;
        this.isFocused = false;
        // use a terrible for loop to just load all of the options
        for (const property in options) {
            if (options.hasOwnProperty(property)) {
                this[property] = options[property];
            }
        }
        this.loop = this.loop.bind(this);
        this.setupButtons();
        this.config = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* load */](options.defaultConfig);
        this.loadConfig();
        this.loadEvents();
    }
    // IMPLEMENTATION SPECIFIC STUFF
    setupButtons() {
        this.buttons.startStop.onclick = () => {
            this.togglePlayState();
        };
        this.buttons.reverse.onclick = () => {
            this.reverseDirection();
        };
        this.buttons.speedUp.onclick = () => {
            this.speed++;
        };
        this.buttons.speedDown.onclick = () => {
            this.speed--;
        };
        this.buttons.edit.onclick = () => {
            this.hidePrompt();
        };
    }
    loadScript() {
        while (this.prompterLinesElement.firstChild) {
            this.prompterLinesElement.removeChild(this.prompterLinesElement.firstChild);
        }
        const input = this.inputElement.value;
        for (const line of input.split("\n")) {
            const el = document.createElement("li");
            el.textContent = line;
            this.prompterLinesElement.appendChild(el);
        }
        const computedHeight = getComputedStyle(this.prompterLinesElement).height;
        this.textHeight = Number(computedHeight.substring(0, computedHeight.length - 2));
    }
    loadStyles() {
        this.config.fontSize = Number(this.optionsElements.fontSize.value);
        this.prompterLinesElement.style.fontSize = `${this.config.fontSize}px`;
        this.config.boldText = this.optionsElements.boldText.checked;
        this.prompterLinesElement.style.fontWeight = this.config.boldText ? "bold" : "";
    }
    // CORE
    loadEvents() {
        document.addEventListener("keydown", (e) => {
            if (!this.isFocused) {
                return;
            }
            const keyCode = e.keyCode;
            switch (keyCode) {
                case 32:// space
                    this.togglePlayState();
                    break;
                case 38:// up
                    this.speed++;
                    break;
                case 40:// down
                    this.speed--;
                    break;
                case 27:// escape
                    if (this.currentOffset === 0) {
                        this.hidePrompt();
                        break;
                    }
                    this.stop();
                    this.currentOffset = 0;
                    this.render();
                    break;
            }
        });
        document.addEventListener("wheel", (e) => {
            if (!this.isFocused) {
                return;
            }
            this.currentOffset += e.deltaY;
            this.render();
        });
    }
    loadConfig() {
        this.config = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* load */](this.defaultConfig);
        // trigger the setter (which has side effects kill me)
        this.speed = this.speed;
        this.optionsElements.fontSize.value = this.config.fontSize.toString();
        this.optionsElements.boldText.checked = this.config.boldText;
        this.inputElement.value = this.config.lastPrompt;
    }
    saveConfig() {
        __WEBPACK_IMPORTED_MODULE_0__config__["b" /* save */](this.config);
    }
    showPrompt() {
        this.prompterContainer.style.display = "block";
        this.isFocused = true;
        this.loadStyles();
        this.loadScript();
        this.saveConfig();
    }
    hidePrompt() {
        this.isFocused = false;
        this.prompterContainer.style.display = "none";
        this.stop();
    }
    loop() {
        this.render();
        if (this.runningState !== RunningState.Paused) {
            requestAnimationFrame(this.loop);
        }
    }
    render() {
        if (this.runningState === RunningState.Running) {
            this.currentOffset += this.speed * this.direction;
            if (this.currentOffset < 0) {
                this.currentOffset = 0;
            }
            else if (this.currentOffset > this.textHeight) {
                this.currentOffset = this.textHeight;
            }
        }
        this.prompterLinesElement.style.marginTop = `-${this.currentOffset}px`;
    }
    start() {
        this.buttons.startStop.textContent = "Pause";
        this.runningState = RunningState.Running;
        this.loop();
    }
    stop() {
        this.runningState = RunningState.Paused;
        this.buttons.startStop.textContent = "Start";
    }
    // BUTTONS
    togglePlayState() {
        if (this.runningState === RunningState.Paused) {
            this.start();
        }
        else if (this.runningState === RunningState.Running) {
            this.stop();
        }
    }
    reverseDirection() {
        this.direction = -this.direction;
        if (this.direction === 1) {
            this.buttons.reverse.textContent = "Moving Down";
        }
        else {
            this.buttons.reverse.textContent = "Moving Up";
        }
    }
    // GETTERS AND SETTERS
    get speed() {
        return this._speed;
    }
    set speed(speed) {
        if (speed < 0) {
            this._speed = 0;
        }
        else {
            this._speed = speed;
            document.getElementById("options-current-speed").textContent = speed.toString();
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = EasierPrompter;



/***/ })
/******/ ]);