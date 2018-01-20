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
/* harmony export (immutable) */ __webpack_exports__["b"] = getElement;
/* harmony export (immutable) */ __webpack_exports__["c"] = setDisplay;
/* harmony export (immutable) */ __webpack_exports__["a"] = emptyElement;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__error_idnotfound__ = __webpack_require__(6);

function getElement(id) {
    var el = document.getElementById(id);
    if (el === null) {
        throw new __WEBPACK_IMPORTED_MODULE_0__error_idnotfound__["a" /* ElementIDNotFoundError */](id);
    }
    return el;
}
function setDisplay(el, show) {
    el.style.display = show ? "block" : "none";
}
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__email__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__email___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__email__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__polyfill__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__polyfill___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__polyfill__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sw__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__sw__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_prompterconfig__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__prompter_prompter__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils__ = __webpack_require__(0);






var config = new __WEBPACK_IMPORTED_MODULE_3__config_prompterconfig__["a" /* PrompterConfigManager */]();
config.load();
config.save();
Object(__WEBPACK_IMPORTED_MODULE_5__utils__["b" /* getElement */])("save-button").onclick = function () { return config.save(); };
Object(__WEBPACK_IMPORTED_MODULE_5__utils__["b" /* getElement */])("reset-button").onclick = function () { return config.promptReset(); };
var prompter = new __WEBPACK_IMPORTED_MODULE_4__prompter_prompter__["a" /* Prompter */](config);
window.onbeforeunload = function (e) {
    if (config.options.unsavedChangesWarning.get() && prompter.config.hasChanged()) {
        var text = [
            "You have unsaved changes to your config!",
            "If you leave these changes will be reset!",
            "(disable this warning by unchecking \"Unsaved changes warning\"",
        ].join("\n");
        e.returnValue = text;
        return text;
    }
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
/* 3 */
/***/ (function(module, exports) {

/// Older browsers do not have requestAnimationFrame so a polyfill is needed
/// Adds support for: IE 9

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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker.register("sw.js").then(function () {
            console.log("Registered Service Worker");
        });
    });
}


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PrompterConfigManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__option__ = __webpack_require__(9);
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



var PrompterConfigManager = (function (_super) {
    __extends(PrompterConfigManager, _super);
    function PrompterConfigManager() {
        var _this = _super.call(this) || this;
        var prompterContainer = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* getElement */])("prompter-lines-container");
        var prompterLines = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* getElement */])("prompter-lines");
        _this.options.speed = new __WEBPACK_IMPORTED_MODULE_2__option__["a" /* ConfigOption */]({
            default: 1.5,
            el: Object(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* getElement */])("options-current-speed"),
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
        _this.options.fontSize = new __WEBPACK_IMPORTED_MODULE_2__option__["a" /* ConfigOption */]({
            default: 75,
            el: Object(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* getElement */])("options-font-size"),
            type: "number",
            setterOpts: {
                onchange: true,
                callback: function (value) {
                    prompterContainer.style.fontSize = value + "px";
                },
            },
        });
        _this.options.fontFamily = new __WEBPACK_IMPORTED_MODULE_2__option__["a" /* ConfigOption */]({
            default: "sans-serif",
            el: Object(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* getElement */])("options-font-family"),
            type: "text",
            setterOpts: {
                onchange: true,
                callback: function (value) {
                    prompterContainer.style.fontFamily = value + ", sans-serif";
                },
            },
        });
        _this.options.boldText = new __WEBPACK_IMPORTED_MODULE_2__option__["a" /* ConfigOption */]({
            default: true,
            el: Object(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* getElement */])("options-bold-text"),
            type: "checkbox",
            setterOpts: {
                onchange: true,
                callback: function (value) {
                    prompterLines.style.fontWeight = value ? "bold" : "normal";
                },
            },
        });
        _this.options.unsavedChangesWarning = new __WEBPACK_IMPORTED_MODULE_2__option__["a" /* ConfigOption */]({
            default: false,
            el: Object(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* getElement */])("options-unsaved-changes-warning"),
            type: "checkbox",
        });
        _this.options.endText = new __WEBPACK_IMPORTED_MODULE_2__option__["a" /* ConfigOption */]({
            default: "[END]",
            el: Object(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* getElement */])("options-end-text"),
            type: "text",
        });
        _this.options.text = new __WEBPACK_IMPORTED_MODULE_2__option__["a" /* ConfigOption */]({
            default: "Enter your script here!",
            el: Object(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* getElement */])("text-input"),
            type: "text",
        });
        return _this;
    }
    return PrompterConfigManager;
}(__WEBPACK_IMPORTED_MODULE_1__config__["a" /* ConfigManager */]));



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
var ElementIDNotFoundError = (function (_super) {
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfigManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__save__ = __webpack_require__(8);

var STORAGE_KEY = "EasierPrompter_Config";
var ConfigManager = (function () {
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
var STORE_VERSION = "0";
var STORAGE_KEY = "easierPrompter" + STORE_VERSION + "_configStore";
var ConfigSaver = (function () {
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

var ConfigOption = (function () {
    function ConfigOption(options) {
        this.get = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* getterFrom */])(options.el, options.type);
        this.set = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* setterFrom */])(options.el, options.type || "text", options.setterOpts);
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
function setterFrom(el, type, opts) {
    if (opts === void 0) { opts = {}; }
    var getBaseSetter = function () {
        if (el instanceof HTMLTextAreaElement) {
            return function (value) { return el.value = value; };
        }
        if (el instanceof HTMLInputElement) {
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
    };
    var setter = getBaseSetter();
    var stack = [];
    if (opts.transform) {
        stack.push(opts.transform);
    }
    stack.push(setter);
    if (opts.callback) {
        stack.push(opts.callback);
    }
    var functionStack = createFunctionPipe(stack);
    if (opts.onchange) {
        var getter_1 = getterFrom(el);
        el.onchange = function () {
            functionStack(getter_1());
        };
    }
    return functionStack;
}
function createFunctionPipe(functions) {
    if (functions === void 0) { functions = []; }
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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Prompter; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__keyboard_keyboard__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__abstract__ = __webpack_require__(13);
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
var Prompter = (function (_super) {
    __extends(Prompter, _super);
    function Prompter(config) {
        var _this = _super.call(this, config) || this;
        _this.prompterText = Object(__WEBPACK_IMPORTED_MODULE_1__utils__["b" /* getElement */])("prompter-lines-text");
        _this.prompterEndText = Object(__WEBPACK_IMPORTED_MODULE_1__utils__["b" /* getElement */])("prompter-lines-end-text");
        _this.addListeners();
        _this.addKeyboardHandlers();
        return _this;
    }
    Prompter.prototype.addListeners = function () {
        var _this = this;
        Object(__WEBPACK_IMPORTED_MODULE_1__utils__["b" /* getElement */])("start-button").addEventListener("click", function (e) { return _this.show(); });
        Object(__WEBPACK_IMPORTED_MODULE_1__utils__["b" /* getElement */])("options-toggle-run").addEventListener("click", function (e) { return _this.toggleScrolling(); });
        Object(__WEBPACK_IMPORTED_MODULE_1__utils__["b" /* getElement */])("options-toggle-direction").addEventListener("click", function (e) { return _this.reverseDirection(); });
        Object(__WEBPACK_IMPORTED_MODULE_1__utils__["b" /* getElement */])("options-exit").addEventListener("click", function (e) { return _this.hide(); });
        Object(__WEBPACK_IMPORTED_MODULE_1__utils__["b" /* getElement */])("options-speed-up").addEventListener("click", function (e) { return _this.speedUp(); });
        Object(__WEBPACK_IMPORTED_MODULE_1__utils__["b" /* getElement */])("options-speed-down").addEventListener("click", function (e) { return _this.speedDown(); });
        window.addEventListener("resize", function (e) {
            if (_this.showing) {
                _this.maxScrollDistance = _this.getTextLength();
            }
        });
    };
    Prompter.prototype.addKeyboardHandlers = function () {
        var _this = this;
        var keyboard = new __WEBPACK_IMPORTED_MODULE_0__keyboard_keyboard__["a" /* Keyboard */]();
        keyboard.require(function () { return _this.showing; });
        keyboard.onKeyDown(32, function () {
            _this.toggleScrolling();
            return true;
        });
        keyboard.onKeyDown(27, function () {
            if (_this.scrollDistance === 0) {
                _this.hide();
            }
            else {
                _this.scrollDistance = 0;
                _this.stop();
            }
        });
        keyboard.onKeyDown(38, function () { return _this.speedUp(); });
        keyboard.onKeyDown(40, function () { return _this.speedDown(); });
    };
    Prompter.prototype.reverseDirection = function () {
        _super.prototype.reverseDirection.call(this);
        if (this.direction === __WEBPACK_IMPORTED_MODULE_2__abstract__["b" /* Direction */].Up) {
            Object(__WEBPACK_IMPORTED_MODULE_1__utils__["b" /* getElement */])("options-toggle-direction").textContent = "Moving Down";
        }
        else {
            Object(__WEBPACK_IMPORTED_MODULE_1__utils__["b" /* getElement */])("options-toggle-direction").textContent = "Moving Up";
        }
    };
    Prompter.prototype.start = function () {
        _super.prototype.start.call(this);
        Object(__WEBPACK_IMPORTED_MODULE_1__utils__["b" /* getElement */])("options-toggle-run").textContent = "Stop";
    };
    Prompter.prototype.stop = function () {
        _super.prototype.stop.call(this);
        Object(__WEBPACK_IMPORTED_MODULE_1__utils__["b" /* getElement */])("options-toggle-run").textContent = "Start";
    };
    Prompter.prototype.show = function () {
        Object(__WEBPACK_IMPORTED_MODULE_1__utils__["c" /* setDisplay */])(Object(__WEBPACK_IMPORTED_MODULE_1__utils__["b" /* getElement */])("main"), false);
        Object(__WEBPACK_IMPORTED_MODULE_1__utils__["c" /* setDisplay */])(Object(__WEBPACK_IMPORTED_MODULE_1__utils__["b" /* getElement */])("prompter"), true);
        _super.prototype.show.call(this);
    };
    Prompter.prototype.hide = function () {
        Object(__WEBPACK_IMPORTED_MODULE_1__utils__["c" /* setDisplay */])(Object(__WEBPACK_IMPORTED_MODULE_1__utils__["b" /* getElement */])("main"), true);
        Object(__WEBPACK_IMPORTED_MODULE_1__utils__["c" /* setDisplay */])(Object(__WEBPACK_IMPORTED_MODULE_1__utils__["b" /* getElement */])("prompter"), false);
        _super.prototype.hide.call(this);
    };
    Prompter.prototype.render = function (distance) {
        var lines = this.prompterText;
        lines.style.marginTop = "-" + distance + "px";
    };
    Prompter.prototype.loadScript = function (script) {
        this.resetScript();
        var scriptLines = script.split("\n");
        for (var _i = 0, scriptLines_1 = scriptLines; _i < scriptLines_1.length; _i++) {
            var line = scriptLines_1[_i];
            this.addLine(line);
        }
        this.maxScrollDistance = this.getTextLength();
        this.addLine(this.config.options.endText.get(), Object(__WEBPACK_IMPORTED_MODULE_1__utils__["b" /* getElement */])("prompter-lines-end-text"));
    };
    Prompter.prototype.getScript = function () {
        return Object(__WEBPACK_IMPORTED_MODULE_1__utils__["b" /* getElement */])("text-input").value;
    };
    Prompter.prototype.getTextLength = function () {
        return this.prompterText.scrollHeight;
    };
    Prompter.prototype.addLine = function (text, container) {
        if (container === void 0) { container = this.prompterText; }
        var item = document.createElement("p");
        item.textContent = text;
        container.appendChild(item);
    };
    Prompter.prototype.resetScript = function () {
        Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* emptyElement */])(this.prompterText);
        Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* emptyElement */])(this.prompterEndText);
    };
    Prompter.prototype.speedUp = function () {
        if (this.showing) {
            this.config.speed += SPEED_INCREMENT;
        }
    };
    Prompter.prototype.speedDown = function () {
        if (this.showing) {
            this.config.speed -= SPEED_INCREMENT;
        }
    };
    return Prompter;
}(__WEBPACK_IMPORTED_MODULE_2__abstract__["a" /* AbstractPrompter */]));



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Keyboard; });
var Keyboard = (function () {
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
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Direction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AbstractPrompter; });
var ONE_FRAME = 1000 / 60;
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 1] = "Up";
    Direction[Direction["Down"] = -1] = "Down";
})(Direction || (Direction = {}));
var AbstractPrompter = (function () {
    function AbstractPrompter(config) {
        this._scrollDistance = 0;
        this.maxScrollDistance = Infinity;
        this.direction = Direction.Up;
        this.showing = false;
        this.scrolling = false;
        this.config = config;
        this.loop = this.loop.bind(this);
        this.loop(0);
    }
    AbstractPrompter.prototype.start = function () {
        this.scrolling = true;
    };
    AbstractPrompter.prototype.stop = function () {
        this.scrolling = false;
    };
    AbstractPrompter.prototype.show = function () {
        this.showing = true;
        this.scrollDistance = 0;
        this.loadScript(this.getScript());
    };
    AbstractPrompter.prototype.hide = function () {
        this.stop();
        this.showing = false;
    };
    AbstractPrompter.prototype.reverseDirection = function () {
        if (this.direction === Direction.Up) {
            this.direction = Direction.Down;
        }
        else {
            this.direction = Direction.Up;
        }
    };
    AbstractPrompter.prototype.loop = function (currentTime) {
        requestAnimationFrame(this.loop);
        if (!this.showing) {
            return;
        }
        var timeSinceLastFrame = currentTime - this.lastFrame;
        if (this.scrolling) {
            this.scroll(timeSinceLastFrame / ONE_FRAME);
        }
        this.lastFrame = currentTime;
        this.render(Math.floor(this.scrollDistance));
    };
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
        get: function () {
            return this._scrollDistance;
        },
        set: function (scrollDistance) {
            if (scrollDistance < 0) {
                scrollDistance = 0;
            }
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



/***/ })
/******/ ]);