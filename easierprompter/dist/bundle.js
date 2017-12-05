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
/* harmony export (immutable) */ __webpack_exports__["b"] = sanitize;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__error_idnotfound__ = __webpack_require__(6);

function getElement(id) {
    var el = document.getElementById(id);
    if (el === null) {
        throw new __WEBPACK_IMPORTED_MODULE_0__error_idnotfound__["a" /* ElementIDNotFoundError */](id);
    }
    return el;
}
function sanitize(str) {
    str = str.replace(/&/g, "&amp;");
    // several spaces in a row will look like several spaces
    str = str.replace(/ /g, "&nbsp;");
    // prevent xss
    str = str.replace(/>/g, "&gt;");
    str = str.replace(/</g, "&lt;");
    return str;
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config_config__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__prompter_prompter__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_option__ = __webpack_require__(8);




var prompterElement = Object(__WEBPACK_IMPORTED_MODULE_2__utils__["a" /* getElement */])("prompter-lines");
var config = new __WEBPACK_IMPORTED_MODULE_0__config_config__["a" /* ConfigManager */]();
config.options.speed = new __WEBPACK_IMPORTED_MODULE_3__config_option__["a" /* ConfigOption */]({
    default: 1.5,
    el: Object(__WEBPACK_IMPORTED_MODULE_2__utils__["a" /* getElement */])("options-current-speed"),
    type: "number",
    setterOpts: {
        transform: function (value) { return value.toFixed(1); },
    },
});
config.options.fontSize = new __WEBPACK_IMPORTED_MODULE_3__config_option__["a" /* ConfigOption */]({
    default: 75,
    el: Object(__WEBPACK_IMPORTED_MODULE_2__utils__["a" /* getElement */])("options-font-size"),
    type: "number",
    setterOpts: {
        onchange: true,
        callback: function (value) {
            prompterElement.style.fontSize = value + "px";
        },
    },
});
config.options.fontFamily = new __WEBPACK_IMPORTED_MODULE_3__config_option__["a" /* ConfigOption */]({
    default: "sans-serif",
    el: Object(__WEBPACK_IMPORTED_MODULE_2__utils__["a" /* getElement */])("options-font-family"),
    type: "text",
    setterOpts: {
        onchange: true,
        callback: function (value) {
            prompterElement.style.fontFamily = value + ", sans-serif";
        },
    },
});
config.options.boldText = new __WEBPACK_IMPORTED_MODULE_3__config_option__["a" /* ConfigOption */]({
    default: true,
    el: Object(__WEBPACK_IMPORTED_MODULE_2__utils__["a" /* getElement */])("options-bold-text"),
    type: "checkbox",
    setterOpts: {
        onchange: true,
        callback: function (value) {
            prompterElement.style.fontWeight = value ? "bold" : "normal";
        },
    },
});
config.options.text = new __WEBPACK_IMPORTED_MODULE_3__config_option__["a" /* ConfigOption */]({
    default: "Enter your script here!",
    el: Object(__WEBPACK_IMPORTED_MODULE_2__utils__["a" /* getElement */])("text-input"),
    type: "text",
});
config.load();
config.save();
Object(__WEBPACK_IMPORTED_MODULE_2__utils__["a" /* getElement */])("save-button").onclick = function () { return config.save(); };
Object(__WEBPACK_IMPORTED_MODULE_2__utils__["a" /* getElement */])("reset-button").onclick = function () { return config.promptReset(); };
var prompter = new __WEBPACK_IMPORTED_MODULE_1__prompter_prompter__["a" /* Prompter */](config);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfigManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__save__ = __webpack_require__(3);

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
        this.configSaver.save();
    };
    ConfigManager.prototype.load = function () {
        this.configSaver.load();
    };
    ConfigManager.prototype.promptReset = function () {
        var message = [
            "Are yousure you want to reset the settings?",
            "This will reset your script, the config, and reload the page",
        ];
        if (confirm(message.join("\n\n"))) {
            this.configSaver.reset();
        }
    };
    return ConfigManager;
}());



/***/ }),
/* 3 */
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
    };
    ConfigSaver.prototype.load = function () {
        var options = this.getOptions();
        for (var _i = 0, _a = Object.keys(options); _i < _a.length; _i++) {
            var key = _a[_i];
            var value = options[key];
            var configOption = this.config.options[key];
            if (typeof configOption === "undefined") {
                console.warn("unknown item in save:", key, value);
                continue;
            }
            this.config.options[key].set(value);
        }
    };
    return ConfigSaver;
}());



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Prompter; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__abstract__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__keyboard_keyboard__ = __webpack_require__(7);
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



var SPEED_INCREMENT = 0.5;
var Prompter = /** @class */ (function (_super) {
    __extends(Prompter, _super);
    function Prompter(config) {
        var _this = _super.call(this, config) || this;
        _this.prompterLines = Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* getElement */])("prompter-lines");
        _this.addListeners();
        _this.addKeyboardHandlers();
        return _this;
    }
    ///
    /// Methods
    ///
    // Makes buttons work
    Prompter.prototype.addListeners = function () {
        var _this = this;
        Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* getElement */])("start-button").addEventListener("click", function (e) { return _this.show(); });
        Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* getElement */])("options-toggle-run").addEventListener("click", function (e) { return _this.toggleScrolling(); });
        Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* getElement */])("options-toggle-direction").addEventListener("click", function (e) { return _this.reverseDirection(); });
        Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* getElement */])("options-exit").addEventListener("click", function (e) { return _this.hide(); });
        Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* getElement */])("options-speed-up").addEventListener("click", function (e) { return _this.config.speed += SPEED_INCREMENT; });
        Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* getElement */])("options-speed-down").addEventListener("click", function (e) { return _this.config.speed -= SPEED_INCREMENT; });
    };
    // Keyboard support
    Prompter.prototype.addKeyboardHandlers = function () {
        var _this = this;
        var keyboard = new __WEBPACK_IMPORTED_MODULE_2__keyboard_keyboard__["a" /* Keyboard */](this);
        this.keyboard = keyboard;
        // 32 = space = start/stop
        keyboard.handleKeypress(32, function () {
            if (_this.showing) {
                _this.toggleScrolling();
            }
        });
        // 27 = esc = stop & go back to start or leave if already at start
        keyboard.handleKeypress(27, function () {
            if (_this.showing) {
                if (_this.scrollDistance === 0) {
                    _this.hide();
                }
                else {
                    _this.scrollDistance = 0;
                    _this.stop();
                }
            }
        });
    };
    ///
    /// Overrides
    ///
    // reverse direction and moving up/down button text
    Prompter.prototype.reverseDirection = function () {
        _super.prototype.reverseDirection.call(this);
        if (this.direction === __WEBPACK_IMPORTED_MODULE_0__abstract__["b" /* Direction */].Up) {
            Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* getElement */])("options-toggle-direction").textContent = "Moving Down";
        }
        else {
            Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* getElement */])("options-toggle-direction").textContent = "Moving Up";
        }
    };
    // Start and update start/stop button text
    Prompter.prototype.start = function () {
        _super.prototype.start.call(this);
        Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* getElement */])("options-toggle-run").textContent = "Stop";
    };
    // Stop and update start/stop button text
    Prompter.prototype.stop = function () {
        _super.prototype.stop.call(this);
        Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* getElement */])("options-toggle-run").textContent = "Start";
    };
    // Shows the script
    Prompter.prototype.show = function () {
        _super.prototype.show.call(this);
        this.setDisplay(Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* getElement */])("main"), false);
        this.setDisplay(Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* getElement */])("prompter"), true);
    };
    // Hides the script
    Prompter.prototype.hide = function () {
        _super.prototype.hide.call(this);
        this.setDisplay(Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* getElement */])("main"), true);
        this.setDisplay(Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* getElement */])("prompter"), false);
    };
    ///
    /// Implementations of abstract methods
    ///
    // Applies the margin style to scroll the script
    Prompter.prototype.render = function (distance) {
        var lines = this.prompterLines;
        lines.style.marginTop = "-" + distance + "px";
    };
    // computes how long the script is and stores it
    // makes sure we don't scroll way too far
    Prompter.prototype.getTextLength = function () {
        var styles = window.getComputedStyle(this.prompterLines);
        var height = styles.height.replace("px", "");
        return Number(height);
    };
    // Insertst the script into the DOM
    Prompter.prototype.loadScript = function (script) {
        this.resetScript();
        var prompterLines = Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* getElement */])("prompter-lines");
        for (var _i = 0, _a = script.split("\n"); _i < _a.length; _i++) {
            var line = _a[_i];
            var listItem = document.createElement("li");
            listItem.innerHTML = line;
            prompterLines.appendChild(listItem);
        }
    };
    ///
    /// Utils or helper methods
    ///
    // Changes an element's visibility
    Prompter.prototype.setDisplay = function (el, show) {
        el.style.display = show ? "block" : "none";
    };
    // Returns the current script
    Prompter.prototype.getScript = function () {
        var rawInput = Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* getElement */])("text-input").value;
        return Object(__WEBPACK_IMPORTED_MODULE_1__utils__["b" /* sanitize */])(rawInput);
    };
    // Removes all existing lines from the script element
    Prompter.prototype.resetScript = function () {
        while (this.prompterLines.firstChild) {
            this.prompterLines.removeChild(this.prompterLines.firstChild);
        }
    };
    return Prompter;
}(__WEBPACK_IMPORTED_MODULE_0__abstract__["a" /* AbstractPrompter */]));



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Direction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AbstractPrompter; });
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 1] = "Up";
    Direction[Direction["Down"] = -1] = "Down";
})(Direction || (Direction = {}));
var AbstractPrompter = /** @class */ (function () {
    function AbstractPrompter(config) {
        this._scrollDistance = 0;
        this.textLength = Infinity;
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
        this.textLength = this.getTextLength();
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
        if (this.scrolling) {
            this.scroll();
        }
        this.render(this.scrollDistance);
    };
    // Move the current scroll distance according to the speed
    AbstractPrompter.prototype.scroll = function () {
        this.scrollDistance += this.config.speed * this.direction;
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
        get: function () {
            return this._scrollDistance;
        },
        set: function (distance) {
            // Make sure we can't scroll before the script
            if (distance < 0) {
                distance = 0;
            }
            // Make sure we can't scroll too far past the script
            if (distance > this.textLength) {
                distance = this.textLength;
            }
            this._scrollDistance = distance;
        },
        enumerable: true,
        configurable: true
    });
    return AbstractPrompter;
}());



/***/ }),
/* 6 */
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
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Keyboard; });
var Keyboard = /** @class */ (function () {
    function Keyboard(prompter) {
        var _this = this;
        this.handlers = [];
        this.prompter = prompter;
        document.addEventListener("keydown", function (e) {
            if (!prompter.showing) {
                return;
            }
            var keyCode = e.keyCode;
            var handlers = _this.handlers[keyCode];
            if (typeof handlers === "undefined" || handlers.length === 0) {
                // no handlers
                return;
            }
            // only cancel the event if we have handlers assigned
            e.preventDefault();
            for (var _i = 0, handlers_1 = handlers; _i < handlers_1.length; _i++) {
                var func = handlers_1[_i];
                func();
            }
        });
        document.addEventListener("keyup", function (e) { return _this.preventDefault(e); });
        document.addEventListener("keypress", function (e) { return _this.preventDefault(e); });
    }
    Keyboard.prototype.preventDefault = function (e) {
        if (!this.prompter.showing) {
            return;
        }
        var keyCode = e.keyCode;
        var handlers = this.handlers[keyCode];
        var cancel = handlers && handlers.length > 0;
        if (cancel) {
            e.preventDefault();
        }
    };
    Keyboard.prototype.handleKeypress = function (keyCode, func) {
        // create the array if it does not already exist
        if (typeof this.handlers[keyCode] === "undefined") {
            this.handlers[keyCode] = [];
        }
        var handlers = this.handlers[keyCode];
        handlers.push(func);
    };
    return Keyboard;
}());



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfigOption; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(9);

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
/* 9 */
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
        el.onchange = function () {
            functionStack(getterFrom(el)());
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


/***/ })
/******/ ]);