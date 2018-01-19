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
/* harmony export (immutable) */ __webpack_exports__["c"] = getElement;
/* harmony export (immutable) */ __webpack_exports__["b"] = getCurrentTime;
/* harmony export (immutable) */ __webpack_exports__["d"] = setDisplay;
/* harmony export (immutable) */ __webpack_exports__["a"] = emptyElement;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__error_idnotfound__ = __webpack_require__(4);

// Returns an element with an ID or throws ElementIDNotFoundError if it doesn't exist
function getElement(id) {
    var el = document.getElementById(id);
    if (el === null) {
        throw new __WEBPACK_IMPORTED_MODULE_0__error_idnotfound__["a" /* ElementIDNotFoundError */](id);
    }
    return el;
}
// Gets the current time in milliseconds
function getCurrentTime() {
    // If performance is supported use that, it's the most accurate
    if (performance && performance.now) {
        return performance.now();
    }
    else {
        // Fallback to using date, supported in most browsers but just less accurate
        return Date.now();
    }
}
// Changes an element's visibility
function setDisplay(el, show) {
    el.style.display = show ? "block" : "none";
}
// Removes all children of an element
function emptyElement(el) {
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    }
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__prompter_prompter__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_prompterconfig__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__polyfill__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__polyfill___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__polyfill__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__email__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__email___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__email__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sw__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__sw__);






var config = new __WEBPACK_IMPORTED_MODULE_2__config_prompterconfig__["a" /* PrompterConfigManager */]();
config.load();
config.save();
Object(__WEBPACK_IMPORTED_MODULE_1__utils__["c" /* getElement */])("save-button").onclick = function () { return config.save(); };
Object(__WEBPACK_IMPORTED_MODULE_1__utils__["c" /* getElement */])("reset-button").onclick = function () { return config.promptReset(); };
var prompter = new __WEBPACK_IMPORTED_MODULE_0__prompter_prompter__["a" /* Prompter */](config);
window.onbeforeunload = function (e) {
    if (prompter.config.options.unsavedChangesWarning.get() && prompter.config.hasChanged()) {
        var text = "You have unsaved changes to your config! If you leave these changes will be reset!";
        e.returnValue = text;
        return text;
    }
};


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Prompter; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__abstract__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__keyboard_keyboard__ = __webpack_require__(5);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var SPEED_INCREMENT = 0.25;
var Prompter = /** @class */ (function (_super) {
    __extends(Prompter, _super);
    function Prompter(config) {
        var _this = _super.call(this, config) || this;
        _this.prompterText = Object(__WEBPACK_IMPORTED_MODULE_1__utils__["c" /* getElement */])("prompter-lines-text");
        _this.prompterEndText = Object(__WEBPACK_IMPORTED_MODULE_1__utils__["c" /* getElement */])("prompter-lines-end-text");
        _this.addListeners();
        _this.addKeyboardHandlers();
        return _this;
    }
    ///
    /// Init Methods
    ///
    // Makes buttons work
    Prompter.prototype.addListeners = function () {
        var _this = this;
        Object(__WEBPACK_IMPORTED_MODULE_1__utils__["c" /* getElement */])("start-button").addEventListener("click", function (e) { return _this.show(); });
        Object(__WEBPACK_IMPORTED_MODULE_1__utils__["c" /* getElement */])("options-toggle-run").addEventListener("click", function (e) { return _this.toggleScrolling(); });
        Object(__WEBPACK_IMPORTED_MODULE_1__utils__["c" /* getElement */])("options-toggle-direction").addEventListener("click", function (e) { return _this.reverseDirection(); });
        Object(__WEBPACK_IMPORTED_MODULE_1__utils__["c" /* getElement */])("options-exit").addEventListener("click", function (e) { return _this.hide(); });
        Object(__WEBPACK_IMPORTED_MODULE_1__utils__["c" /* getElement */])("options-speed-up").addEventListener("click", function (e) { return _this.speedUp(); });
        Object(__WEBPACK_IMPORTED_MODULE_1__utils__["c" /* getElement */])("options-speed-down").addEventListener("click", function (e) { return _this.speedDown(); });
        window.addEventListener("resize", function (e) {
            if (_this.showing) {
                _this.maxScrollDistance = _this.getTextLength();
            }
        });
    };
    // Keyboard support
    Prompter.prototype.addKeyboardHandlers = function () {
        var _this = this;
        var keyboard = new __WEBPACK_IMPORTED_MODULE_2__keyboard_keyboard__["a" /* Keyboard */]();
        // only enable keyboard shortcuts if the prompter is showing
        keyboard.require(function () { return _this.showing; });
        // 32 = space = start/stop
        keyboard.onKeyDown(32, function () {
            _this.toggleScrolling();
            // disable browser from using space as a way to press buttons
            // you can still use enter as an alternative
            return true;
        });
        // 27 = esc = stop & go back to start or leave if already at start
        keyboard.onKeyDown(27, function () {
            if (_this.scrollDistance === 0) {
                _this.hide();
            }
            else {
                _this.scrollDistance = 0;
                _this.stop();
            }
        });
        // up arrow - increase speed
        keyboard.onKeyDown(38, function () { return _this.speedUp(); });
        // down arrow - decrease speed
        keyboard.onKeyDown(40, function () { return _this.speedDown(); });
    };
    ///
    /// Overrides
    ///
    // reverse direction and moving up/down button text
    Prompter.prototype.reverseDirection = function () {
        _super.prototype.reverseDirection.call(this);
        if (this.direction === __WEBPACK_IMPORTED_MODULE_0__abstract__["b" /* Direction */].Up) {
            Object(__WEBPACK_IMPORTED_MODULE_1__utils__["c" /* getElement */])("options-toggle-direction").textContent = "Moving Down";
        }
        else {
            Object(__WEBPACK_IMPORTED_MODULE_1__utils__["c" /* getElement */])("options-toggle-direction").textContent = "Moving Up";
        }
    };
    // Start and update start/stop button text
    Prompter.prototype.start = function () {
        _super.prototype.start.call(this);
        Object(__WEBPACK_IMPORTED_MODULE_1__utils__["c" /* getElement */])("options-toggle-run").textContent = "Stop";
    };
    // Stop and update start/stop button text
    Prompter.prototype.stop = function () {
        _super.prototype.stop.call(this);
        Object(__WEBPACK_IMPORTED_MODULE_1__utils__["c" /* getElement */])("options-toggle-run").textContent = "Start";
    };
    // Shows the script
    Prompter.prototype.show = function () {
        Object(__WEBPACK_IMPORTED_MODULE_1__utils__["d" /* setDisplay */])(Object(__WEBPACK_IMPORTED_MODULE_1__utils__["c" /* getElement */])("main"), false);
        Object(__WEBPACK_IMPORTED_MODULE_1__utils__["d" /* setDisplay */])(Object(__WEBPACK_IMPORTED_MODULE_1__utils__["c" /* getElement */])("prompter"), true);
        _super.prototype.show.call(this);
    };
    // Hides the script
    Prompter.prototype.hide = function () {
        Object(__WEBPACK_IMPORTED_MODULE_1__utils__["d" /* setDisplay */])(Object(__WEBPACK_IMPORTED_MODULE_1__utils__["c" /* getElement */])("main"), true);
        Object(__WEBPACK_IMPORTED_MODULE_1__utils__["d" /* setDisplay */])(Object(__WEBPACK_IMPORTED_MODULE_1__utils__["c" /* getElement */])("prompter"), false);
        _super.prototype.hide.call(this);
    };
    ///
    /// Implementations of abstract methods
    ///
    // Applies the margin style to scroll the script
    Prompter.prototype.render = function (distance) {
        // This is the main bottle neck of the program
        // A better way to do this would be great
        // Considering:
        // Canvas
        // Scrolling
        var lines = this.prompterText;
        lines.style.marginTop = "-" + distance + "px";
    };
    // Inserts the script into the DOM
    Prompter.prototype.loadScript = function (script) {
        this.resetScript();
        var scriptLines = script.split("\n");
        for (var _i = 0, scriptLines_1 = scriptLines; _i < scriptLines_1.length; _i++) {
            var line = scriptLines_1[_i];
            this.addLine(line);
        }
        this.maxScrollDistance = this.getTextLength();
        this.addLine(this.config.options.endText.get(), Object(__WEBPACK_IMPORTED_MODULE_1__utils__["c" /* getElement */])("prompter-lines-end-text"));
    };
    // Returns the current script
    Prompter.prototype.getScript = function () {
        return Object(__WEBPACK_IMPORTED_MODULE_1__utils__["c" /* getElement */])("text-input").value;
    };
    ///
    /// Helper Methods
    ///
    Prompter.prototype.getTextLength = function () {
        return this.prompterText.scrollHeight;
    };
    Prompter.prototype.addLine = function (text, container) {
        if (container === void 0) { container = this.prompterText; }
        var item = document.createElement("p");
        item.textContent = text;
        container.appendChild(item);
    };
    // Removes all existing lines from the script element
    Prompter.prototype.resetScript = function () {
        Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* emptyElement */])(this.prompterText);
        Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* emptyElement */])(this.prompterEndText);
    };
    // Speed Up
    Prompter.prototype.speedUp = function () {
        if (this.showing) {
            this.config.speed += SPEED_INCREMENT;
        }
    };
    // Speed Down
    Prompter.prototype.speedDown = function () {
        if (this.showing) {
            this.config.speed -= SPEED_INCREMENT;
        }
    };
    return Prompter;
}(__WEBPACK_IMPORTED_MODULE_0__abstract__["a" /* AbstractPrompter */]));



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Direction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AbstractPrompter; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);

var ONE_FRAME = 1000 / 60; // length of one frame at 60 fps
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 1] = "Up";
    Direction[Direction["Down"] = -1] = "Down";
})(Direction || (Direction = {}));
var AbstractPrompter = /** @class */ (function () {
    function AbstractPrompter(config) {
        this._scrollDistance = 0;
        this.maxScrollDistance = Infinity;
        this.direction = Direction.Up;
        this.showing = false;
        this.scrolling = false;
        this.config = config;
        this.loop = this.loop.bind(this);
        this.loop();
    }
    ///
    /// Inherited from IPrompter
    ///
    // Start the scrolling
    AbstractPrompter.prototype.start = function () {
        this.scrolling = true;
    };
    // Stop the scrolling
    AbstractPrompter.prototype.stop = function () {
        this.scrolling = false;
    };
    // show the prompter
    // call super.show() in implementations
    AbstractPrompter.prototype.show = function () {
        this.showing = true;
        this.scrollDistance = 0;
        this.loadScript(this.getScript());
    };
    // hide & stop the prompter
    // call super.hide() in implementations
    AbstractPrompter.prototype.hide = function () {
        this.stop();
        this.showing = false;
    };
    ///
    /// Methods
    ///
    // Reverse the going direction
    AbstractPrompter.prototype.reverseDirection = function () {
        if (this.direction === Direction.Up) {
            this.direction = Direction.Down;
        }
        else {
            this.direction = Direction.Up;
        }
    };
    // Main loop - renders and scrolls
    AbstractPrompter.prototype.loop = function () {
        requestAnimationFrame(this.loop);
        if (!this.showing) {
            return;
        }
        var currentTime = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* getCurrentTime */])();
        var timeSinceLastFrame = currentTime - this.lastFrame;
        if (this.scrolling) {
            this.scroll(timeSinceLastFrame / ONE_FRAME);
        }
        this.render(Math.floor(this.scrollDistance));
        this.lastFrame = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* getCurrentTime */])();
    };
    // Move the current scroll distance according to the speed
    // Also use the "time since last frame" to move slower or faster during periods of lag
    AbstractPrompter.prototype.scroll = function (frames) {
        this.scrollDistance += (this.config.speed * this.direction) * frames;
    };
    AbstractPrompter.prototype.toggleScrolling = function () {
        if (this.scrolling) {
            this.stop();
        }
        else {
            this.start();
        }
    };
    Object.defineProperty(AbstractPrompter.prototype, "scrollDistance", {
        ///
        /// Accessors
        ///
        get: function () {
            return this._scrollDistance;
        },
        set: function (scrollDistance) {
            // Make sure we don't scroll above the script
            if (scrollDistance < 0) {
                scrollDistance = 0;
            }
            // Make sure we can't scroll too far past the script
            if (scrollDistance > this.maxScrollDistance) {
                scrollDistance = this.maxScrollDistance;
            }
            this._scrollDistance = scrollDistance;
        },
        enumerable: true,
        configurable: true
    });
    return AbstractPrompter;
}());



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ElementIDNotFoundError; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ElementIDNotFoundError = /** @class */ (function (_super) {
    __extends(ElementIDNotFoundError, _super);
    function ElementIDNotFoundError(id) {
        return _super.call(this, "Element with id '" + id + "' not found.") || this;
    }
    return ElementIDNotFoundError;
}(Error));



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Keyboard; });
var Keyboard = /** @class */ (function () {
    function Keyboard() {
        this.handlers = [];
        this.requirements = [];
        this.keyDownHandlers = [];
        this.keyPressHandlers = [];
        this.keyUpHandlers = [];
        document.addEventListener("keydown", this._createEventHandler(this.keyDownHandlers));
        document.addEventListener("keyup", this._createEventHandler(this.keyUpHandlers));
        document.addEventListener("keypress", this._createEventHandler(this.keyPressHandlers));
    }
    Keyboard.prototype.require = function (func) {
        this.requirements.push(func);
    };
    Keyboard.prototype.onKeyDown = function (keyCode, handler) {
        this._addHandler(keyCode, handler, this.keyDownHandlers);
    };
    Keyboard.prototype.onKeyUp = function (keyCode, handler) {
        this._addHandler(keyCode, handler, this.keyUpHandlers);
    };
    Keyboard.prototype.onKeyPress = function (keyCode, handler) {
        this._addHandler(keyCode, handler, this.keyPressHandlers);
    };
    Keyboard.prototype.testRequirements = function (e) {
        for (var _i = 0, _a = this.requirements; _i < _a.length; _i++) {
            var func = _a[_i];
            if (!func(e)) {
                return false;
            }
        }
        return true;
    };
    Keyboard.prototype._addHandler = function (keyCode, handler, eventHandlers) {
        if (!eventHandlers[keyCode]) {
            eventHandlers[keyCode] = [];
        }
        var existingHandlers = eventHandlers[keyCode];
        existingHandlers.push(handler);
    };
    Keyboard.prototype._createEventHandler = function (eventHandlers) {
        var _this = this;
        return function (e) {
            if (!_this.testRequirements(e)) {
                return;
            }
            var keyCode = e.keyCode;
            var handlers = eventHandlers[keyCode];
            if (!handlers) {
                return;
            }
            var preventDefault = false;
            for (var _i = 0, handlers_1 = handlers; _i < handlers_1.length; _i++) {
                var handler = handlers_1[_i];
                var result = handler();
                if (result) {
                    preventDefault = true;
                    break;
                }
            }
            if (preventDefault) {
                e.preventDefault();
            }
        };
    };
    return Keyboard;
}());



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PrompterConfigManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__option__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(0);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var PrompterConfigManager = /** @class */ (function (_super) {
    __extends(PrompterConfigManager, _super);
    function PrompterConfigManager() {
        var _this = _super.call(this) || this;
        var prompterElement = Object(__WEBPACK_IMPORTED_MODULE_2__utils__["c" /* getElement */])("prompter-lines-container");
        _this.options.speed = new __WEBPACK_IMPORTED_MODULE_1__option__["a" /* ConfigOption */]({
            default: 1.5,
            el: Object(__WEBPACK_IMPORTED_MODULE_2__utils__["c" /* getElement */])("options-current-speed"),
            type: "number",
            setterOpts: {
                transform: function (value) {
                    if (value < 0) {
                        value = 0;
                    }
                    return value.toFixed(2);
                },
            },
        });
        _this.options.fontSize = new __WEBPACK_IMPORTED_MODULE_1__option__["a" /* ConfigOption */]({
            default: 75,
            el: Object(__WEBPACK_IMPORTED_MODULE_2__utils__["c" /* getElement */])("options-font-size"),
            type: "number",
            setterOpts: {
                onchange: true,
                callback: function (value) {
                    prompterElement.style.fontSize = value + "px";
                },
            },
        });
        _this.options.fontFamily = new __WEBPACK_IMPORTED_MODULE_1__option__["a" /* ConfigOption */]({
            default: "sans-serif",
            el: Object(__WEBPACK_IMPORTED_MODULE_2__utils__["c" /* getElement */])("options-font-family"),
            type: "text",
            setterOpts: {
                onchange: true,
                callback: function (value) {
                    prompterElement.style.fontFamily = value + ", sans-serif";
                },
            },
        });
        _this.options.boldText = new __WEBPACK_IMPORTED_MODULE_1__option__["a" /* ConfigOption */]({
            default: true,
            el: Object(__WEBPACK_IMPORTED_MODULE_2__utils__["c" /* getElement */])("options-bold-text"),
            type: "checkbox",
            setterOpts: {
                onchange: true,
                callback: function (value) {
                    prompterElement.style.fontWeight = value ? "bold" : "normal";
                },
            },
        });
        _this.options.unsavedChangesWarning = new __WEBPACK_IMPORTED_MODULE_1__option__["a" /* ConfigOption */]({
            default: false,
            el: Object(__WEBPACK_IMPORTED_MODULE_2__utils__["c" /* getElement */])("options-unsaved-changes-warning"),
            type: "checkbox",
        });
        _this.options.endText = new __WEBPACK_IMPORTED_MODULE_1__option__["a" /* ConfigOption */]({
            default: "[END]",
            el: Object(__WEBPACK_IMPORTED_MODULE_2__utils__["c" /* getElement */])("options-end-text"),
            type: "text",
        });
        _this.options.text = new __WEBPACK_IMPORTED_MODULE_1__option__["a" /* ConfigOption */]({
            default: "Enter your script here!",
            el: Object(__WEBPACK_IMPORTED_MODULE_2__utils__["c" /* getElement */])("text-input"),
            type: "text",
        });
        return _this;
    }
    return PrompterConfigManager;
}(__WEBPACK_IMPORTED_MODULE_0__config__["a" /* ConfigManager */]));



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfigManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__save__ = __webpack_require__(8);

var STORAGE_KEY = "EasierPrompter_Config";
// TODO: saving & loading
var ConfigManager = /** @class */ (function () {
    function ConfigManager() {
        this.options = {};
        this.configSaver = new __WEBPACK_IMPORTED_MODULE_0__save__["a" /* ConfigSaver */](this);
    }
    Object.defineProperty(ConfigManager.prototype, "speed", {
        get: function () {
            return this.options.speed.get();
        },
        set: function (value) {
            this.options.speed.set(value);
        },
        enumerable: true,
        configurable: true
    });
    ConfigManager.prototype.save = function () {
        var saveData = this.configSaver.save();
    };
    ConfigManager.prototype.load = function () {
        this.configSaver.load();
    };
    ConfigManager.prototype.promptReset = function () {
        var message = [
            "Are you sure you want to reset the settings?",
            "This will reset your script, the config, and reload the page.",
        ];
        if (confirm(message.join("\n\n"))) {
            this.configSaver.reset();
        }
    };
    ConfigManager.prototype.hasChanged = function () {
        var newData = this.configSaver.generateSaveData();
        var oldData = this.configSaver.lastSaveData;
        for (var _i = 0, _a = Object.keys(newData); _i < _a.length; _i++) {
            var key = _a[_i];
            if (newData[key] !== oldData[key]) {
                return true;
            }
        }
        return false;
    };
    return ConfigManager;
}());



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfigSaver; });
// increase every time an incompatible change is made to the store data
var STORE_VERSION = "0";
// hopefully this is specific enough lol
var STORAGE_KEY = "easierPrompter" + STORE_VERSION + "_configStore";
var ConfigSaver = /** @class */ (function () {
    function ConfigSaver(config) {
        this.config = config;
    }
    ConfigSaver.prototype.getOptions = function () {
        var localConfig = localStorage.getItem(STORAGE_KEY);
        if (localConfig === null) {
            return {};
        }
        else {
            return JSON.parse(localConfig);
        }
    };
    ConfigSaver.prototype.generateSaveData = function () {
        var res = {};
        for (var _i = 0, _a = Object.keys(this.config.options); _i < _a.length; _i++) {
            var key = _a[_i];
            var value = this.config.options[key];
            res[key] = value.get();
        }
        return res;
    };
    ConfigSaver.prototype.reset = function () {
        localStorage.removeItem(STORAGE_KEY);
        location.reload();
    };
    ConfigSaver.prototype.save = function () {
        var data = this.generateSaveData();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        this.lastSaveData = data;
    };
    ConfigSaver.prototype.load = function () {
        var options = this.getOptions();
        for (var _i = 0, _a = Object.keys(options); _i < _a.length; _i++) {
            var key = _a[_i];
            var value = options[key];
            var configOption = this.config.options[key];
            if (typeof configOption === "undefined") {
                console.warn("Unknown item in save:", key, value);
                continue;
            }
            this.config.options[key].set(value);
        }
    };
    return ConfigSaver;
}());



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfigOption; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(10);

var ConfigOption = /** @class */ (function () {
    // constructor(def: T, el: HTMLElement, get: ConfigGetter<T>, set: ConfigSetter<T>) {
    function ConfigOption(options) {
        this.get = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* getterFrom */])(options.el, options.type);
        this.set = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* setterFrom */])(options.el, options.setterOpts);
        this.set(options.default);
    }
    return ConfigOption;
}());



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getterFrom;
/* harmony export (immutable) */ __webpack_exports__["b"] = setterFrom;
function getterFrom(el, type) {
    if (type === void 0) { type = "text"; }
    var getter = function () { return el.textContent || ""; };
    if (el instanceof HTMLTextAreaElement) {
        getter = function () { return el.value; };
    }
    if (el instanceof HTMLInputElement) {
        if (el.type === "checkbox") {
            getter = function () { return el.checked; };
        }
        else {
            getter = function () { return el.value; };
        }
    }
    if (type === "number") {
        return function () {
            var val = getter().trim();
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
function setterFrom(el, opts) {
    if (opts === void 0) { opts = {}; }
    function _getSetterFunction() {
        if (el instanceof HTMLTextAreaElement) {
            return function (value) { return el.value = value; };
        }
        if (el instanceof HTMLInputElement) {
            var type = el.type;
            if (type === "text") {
                return function (value) { return el.value = value; };
            }
            else if (type === "number") {
                return function (value) { return el.value = value.toString(); };
            }
            else if (type === "checkbox") {
                return function (value) { return el.checked = value; };
            }
            else {
                console.warn("Unsupported input type: " + type);
            }
        }
        return function (value) { return el.textContent = value; };
    }
    var setter = _getSetterFunction();
    var stack = [];
    if (opts.transform) {
        stack.push(opts.transform);
    }
    stack.push(setter);
    if (opts.callback) {
        stack.push(opts.callback);
    }
    var functionStack = generateFunctionStack(stack);
    if (opts.onchange) {
        var getter_1 = getterFrom(el);
        el.onchange = function () {
            functionStack(getter_1());
        };
    }
    return functionStack;
}
function generateFunctionStack(functions) {
    return function (value) {
        for (var _i = 0, functions_1 = functions; _i < functions_1.length; _i++) {
            var func = functions_1[_i];
            value = func(value);
        }
        return value;
    };
}


/***/ }),
/* 11 */
/***/ (function(module, exports) {

// Older browsers do not have requestAnimationFrame
// so use a simple polyfill just to setTimeout to run the code in ~1 frame
// Adds support for: IE 9

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

(function() {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                 || window[vendors[x]+'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame)
      window.requestAnimationFrame = function(callback, element) {
          var currTime = new Date().getTime();
          var timeToCall = Math.max(0, 16 - (currTime - lastTime));
          var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
            timeToCall);
          lastTime = currTime + timeToCall;
          return id;
      };

  if (!window.cancelAnimationFrame)
      window.cancelAnimationFrame = function(id) {
          clearTimeout(id);
      };
}());


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// To avoid spambots, emails are not directly in the HTML
// They are injected with javascript and some VERY simple "encryption"
// Shifted one letter to the left and stored in an array.
// No spambots are getting this unless they literally execute the page.
var emailEncoded = [
    "o", "m", "m", "y", "w", "e", "b", "e", "r", "3", "3", "@", "g", "m", "a", "i", "l", ".", "c", "o", "m", "t",
].join("");
var email = emailEncoded[emailEncoded.length - 1];
for (var i = 0; i < emailEncoded.length - 1; i++) {
    email += emailEncoded[i];
}
var els = document.getElementsByClassName("email");
for (var i = 0; i < els.length; i++) {
    var el = els[i];
    el.textContent = email;
    el.href = "mailto:" + email;
}


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Based on the code on:
// https://developers.google.com/web/fundamentals/primers/service-workers/
// https://developers.google.com/web/fundamentals/codelabs/offline/
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker.register("sw.js").then(function () {
            console.log("Registered Service Worker");
        });
    });
}


/***/ })
/******/ ]);