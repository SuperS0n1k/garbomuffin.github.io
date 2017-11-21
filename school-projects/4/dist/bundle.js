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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__prompter__ = __webpack_require__(1);

function getElement(id) {
    return document.getElementById(id);
}
const prompter = new __WEBPACK_IMPORTED_MODULE_0__prompter__["a" /* EasierPrompter */]({
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
});
getElement("start").onclick = () => {
    prompter.showPrompt();
};
// debugging from the console
window.prompter = prompter;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var RunningState;
(function (RunningState) {
    RunningState[RunningState["Running"] = 0] = "Running";
    RunningState[RunningState["Paused"] = 1] = "Paused";
})(RunningState || (RunningState = {}));
class EasierPrompter {
    constructor(options) {
        this.speed = 3;
        this.direction = 1;
        this.runningState = RunningState.Paused;
        this.currentOffset = 0;
        // use a terrible for loop to just load all of the options
        for (const property in options) {
            if (options.hasOwnProperty(property)) {
                this[property] = options[property];
            }
        }
        this.loop = this.loop.bind(this);
        this.setupButtons();
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
    // CORE
    showPrompt() {
        this.prompterContainer.style.display = "block";
        this.loadScript();
    }
    hidePrompt() {
        this.prompterContainer.style.display = "none";
        this.stop();
    }
    loop() {
        if (this.runningState === RunningState.Running) {
            this.currentOffset += this.speed * this.direction;
            if (this.currentOffset < 0) {
                this.currentOffset = 0;
            }
            else if (this.currentOffset > this.textHeight) {
                this.currentOffset = this.textHeight;
            }
            this.prompterLinesElement.style.marginTop = `-${this.currentOffset}px`;
        }
        if (this.runningState !== RunningState.Paused) {
            requestAnimationFrame(this.loop);
        }
    }
    start() {
        console.log("starting prompter");
        this.showPrompt();
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
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = EasierPrompter;



/***/ })
/******/ ]);