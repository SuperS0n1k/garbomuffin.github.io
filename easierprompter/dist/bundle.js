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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/config/config.ts":
/*!******************************!*\
  !*** ./src/config/config.ts ***!
  \******************************/
/*! exports provided: ConfigManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ConfigManager\", function() { return ConfigManager; });\n/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./save */ \"./src/config/save.ts\");\n\r\nvar ConfigManager = (function () {\r\n    function ConfigManager() {\r\n        this.options = {};\r\n        this.configSaver = new _save__WEBPACK_IMPORTED_MODULE_0__[\"ConfigSaver\"](this);\r\n    }\r\n    ConfigManager.prototype.save = function () {\r\n        return this.configSaver.save();\r\n    };\r\n    ConfigManager.prototype.load = function () {\r\n        this.configSaver.load();\r\n    };\r\n    ConfigManager.prototype.promptReset = function () {\r\n        var message = [\r\n            \"Are you sure you want to reset the settings?\",\r\n            \"This will reset your script, the config, and reload the page.\",\r\n        ];\r\n        if (confirm(message.join(\"\\n\\n\"))) {\r\n            this.configSaver.reset();\r\n        }\r\n    };\r\n    ConfigManager.prototype.hasChanged = function () {\r\n        var newData = this.configSaver.generateSaveData();\r\n        var oldData = this.configSaver.lastSaveData;\r\n        for (var _i = 0, _a = Object.keys(newData); _i < _a.length; _i++) {\r\n            var key = _a[_i];\r\n            if (newData[key] !== oldData[key]) {\r\n                return true;\r\n            }\r\n        }\r\n        return false;\r\n    };\r\n    return ConfigManager;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack:///./src/config/config.ts?");

/***/ }),

/***/ "./src/config/option.ts":
/*!******************************!*\
  !*** ./src/config/option.ts ***!
  \******************************/
/*! exports provided: ConfigOption */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ConfigOption\", function() { return ConfigOption; });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/config/utils.ts\");\n\r\nvar ConfigOption = (function () {\r\n    function ConfigOption(options) {\r\n        this.get = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"getterFrom\"])(options.el, options.type);\r\n        this.set = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"setterFrom\"])(options.el, options.type || \"text\", options.setterOpts);\r\n        this.set(options.default);\r\n    }\r\n    return ConfigOption;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack:///./src/config/option.ts?");

/***/ }),

/***/ "./src/config/prompterconfig.ts":
/*!**************************************!*\
  !*** ./src/config/prompterconfig.ts ***!
  \**************************************/
/*! exports provided: PrompterConfigManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PrompterConfigManager\", function() { return PrompterConfigManager; });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ \"./src/utils.ts\");\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config */ \"./src/config/config.ts\");\n/* harmony import */ var _option__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./option */ \"./src/config/option.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\n\r\n\r\n\r\nvar PrompterConfigManager = (function (_super) {\r\n    __extends(PrompterConfigManager, _super);\r\n    function PrompterConfigManager() {\r\n        var _this = _super.call(this) || this;\r\n        var prompterContainer = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"getElement\"])(\"prompter-lines-container\");\r\n        var prompterLines = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"getElement\"])(\"prompter-lines\");\r\n        var caret = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"getElement\"])(\"prompter-caret\");\r\n        _this.options.speed = new _option__WEBPACK_IMPORTED_MODULE_2__[\"ConfigOption\"]({\r\n            default: 1.5,\r\n            el: Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"getElement\"])(\"options-current-speed\"),\r\n            type: \"number\",\r\n            setterOpts: {\r\n                transform: function (value) {\r\n                    if (value < 0) {\r\n                        value = 0;\r\n                    }\r\n                    return value.toFixed(2);\r\n                },\r\n            },\r\n        });\r\n        _this.options.fontSize = new _option__WEBPACK_IMPORTED_MODULE_2__[\"ConfigOption\"]({\r\n            default: 75,\r\n            el: Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"getElement\"])(\"options-font-size\"),\r\n            type: \"number\",\r\n            setterOpts: {\r\n                onchange: true,\r\n                callback: function (value) {\r\n                    prompterContainer.style.fontSize = value + \"px\";\r\n                },\r\n            },\r\n        });\r\n        _this.options.fontFamily = new _option__WEBPACK_IMPORTED_MODULE_2__[\"ConfigOption\"]({\r\n            default: \"sans-serif\",\r\n            el: Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"getElement\"])(\"options-font-family\"),\r\n            type: \"text\",\r\n            setterOpts: {\r\n                onchange: true,\r\n                callback: function (value) {\r\n                    prompterContainer.style.fontFamily = value + \", sans-serif\";\r\n                },\r\n            },\r\n        });\r\n        _this.options.boldText = new _option__WEBPACK_IMPORTED_MODULE_2__[\"ConfigOption\"]({\r\n            default: true,\r\n            el: Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"getElement\"])(\"options-bold-text\"),\r\n            type: \"checkbox\",\r\n            setterOpts: {\r\n                onchange: true,\r\n                callback: function (value) {\r\n                    prompterLines.style.fontWeight = value ? \"bold\" : \"normal\";\r\n                },\r\n            },\r\n        });\r\n        _this.options.lineHeight = new _option__WEBPACK_IMPORTED_MODULE_2__[\"ConfigOption\"]({\r\n            default: 1.15,\r\n            el: Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"getElement\"])(\"options-line-height\"),\r\n            type: \"number\",\r\n            setterOpts: {\r\n                onchange: true,\r\n                callback: function (value) {\r\n                    prompterLines.style.lineHeight = '' + value;\r\n                },\r\n            },\r\n        });\r\n        _this.options.unsavedChangesWarning = new _option__WEBPACK_IMPORTED_MODULE_2__[\"ConfigOption\"]({\r\n            default: false,\r\n            el: Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"getElement\"])(\"options-unsaved-changes-warning\"),\r\n            type: \"checkbox\",\r\n        });\r\n        _this.options.showCaret = new _option__WEBPACK_IMPORTED_MODULE_2__[\"ConfigOption\"]({\r\n            default: true,\r\n            el: Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"getElement\"])(\"options-show-caret\"),\r\n            type: \"checkbox\",\r\n            setterOpts: {\r\n                onchange: true,\r\n                callback: function (value) {\r\n                    Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"setDisplay\"])(caret, value);\r\n                },\r\n            },\r\n        });\r\n        _this.options.endText = new _option__WEBPACK_IMPORTED_MODULE_2__[\"ConfigOption\"]({\r\n            default: \"[END]\",\r\n            el: Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"getElement\"])(\"options-end-text\"),\r\n            type: \"text\",\r\n        });\r\n        _this.options.text = new _option__WEBPACK_IMPORTED_MODULE_2__[\"ConfigOption\"]({\r\n            default: \"Enter your script here!\",\r\n            el: Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"getElement\"])(\"text-input\"),\r\n            type: \"text\",\r\n        });\r\n        return _this;\r\n    }\r\n    return PrompterConfigManager;\r\n}(_config__WEBPACK_IMPORTED_MODULE_1__[\"ConfigManager\"]));\r\n\r\n\n\n//# sourceURL=webpack:///./src/config/prompterconfig.ts?");

/***/ }),

/***/ "./src/config/save.ts":
/*!****************************!*\
  !*** ./src/config/save.ts ***!
  \****************************/
/*! exports provided: ConfigSaver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ConfigSaver\", function() { return ConfigSaver; });\nvar STORE_VERSION = \"0\";\r\nvar STORAGE_KEY = \"easierPrompter\" + STORE_VERSION + \"_configStore\";\r\nvar ConfigSaver = (function () {\r\n    function ConfigSaver(config) {\r\n        this.config = config;\r\n        this.lastSaveData = this.generateSaveData();\r\n    }\r\n    ConfigSaver.prototype.getOptions = function () {\r\n        var localConfig = localStorage.getItem(STORAGE_KEY);\r\n        if (localConfig === null) {\r\n            return {};\r\n        }\r\n        else {\r\n            return JSON.parse(localConfig);\r\n        }\r\n    };\r\n    ConfigSaver.prototype.generateSaveData = function () {\r\n        var res = {};\r\n        for (var _i = 0, _a = Object.keys(this.config.options); _i < _a.length; _i++) {\r\n            var key = _a[_i];\r\n            var value = this.config.options[key];\r\n            res[key] = value.get();\r\n        }\r\n        return res;\r\n    };\r\n    ConfigSaver.prototype.reset = function () {\r\n        localStorage.removeItem(STORAGE_KEY);\r\n        location.reload();\r\n    };\r\n    ConfigSaver.prototype.save = function () {\r\n        var data = this.generateSaveData();\r\n        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));\r\n        this.lastSaveData = data;\r\n    };\r\n    ConfigSaver.prototype.load = function () {\r\n        var options = this.getOptions();\r\n        for (var _i = 0, _a = Object.keys(options); _i < _a.length; _i++) {\r\n            var key = _a[_i];\r\n            var value = options[key];\r\n            var configOption = this.config.options[key];\r\n            if (typeof configOption === \"undefined\") {\r\n                console.warn(\"Unknown item in save:\", key, value);\r\n                continue;\r\n            }\r\n            this.config.options[key].set(value);\r\n        }\r\n    };\r\n    return ConfigSaver;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack:///./src/config/save.ts?");

/***/ }),

/***/ "./src/config/utils.ts":
/*!*****************************!*\
  !*** ./src/config/utils.ts ***!
  \*****************************/
/*! exports provided: getterFrom, setterFrom */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getterFrom\", function() { return getterFrom; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setterFrom\", function() { return setterFrom; });\nfunction getterFrom(el, type) {\r\n    if (type === void 0) { type = \"text\"; }\r\n    var getter = function () { return el.textContent || \"\"; };\r\n    if (el instanceof HTMLTextAreaElement) {\r\n        getter = function () { return el.value; };\r\n    }\r\n    if (el instanceof HTMLInputElement) {\r\n        if (el.type === \"checkbox\") {\r\n            getter = function () { return el.checked; };\r\n        }\r\n        else {\r\n            getter = function () { return el.value; };\r\n        }\r\n    }\r\n    if (type === \"number\") {\r\n        return function () {\r\n            var val = getter().trim();\r\n            if (val === \"\") {\r\n                return 0;\r\n            }\r\n            else {\r\n                return Number(val);\r\n            }\r\n        };\r\n    }\r\n    return getter;\r\n}\r\nfunction setterFrom(el, type, opts) {\r\n    if (opts === void 0) { opts = {}; }\r\n    var getBaseSetter = function () {\r\n        if (el instanceof HTMLTextAreaElement) {\r\n            return function (value) { return el.value = value; };\r\n        }\r\n        if (el instanceof HTMLInputElement) {\r\n            if (type === \"text\") {\r\n                return function (value) { return el.value = value; };\r\n            }\r\n            else if (type === \"number\") {\r\n                return function (value) { return el.value = value.toString(); };\r\n            }\r\n            else if (type === \"checkbox\") {\r\n                return function (value) { return el.checked = value; };\r\n            }\r\n            else {\r\n                console.warn(\"Unsupported input type: \" + type);\r\n            }\r\n        }\r\n        return function (value) { return el.textContent = value; };\r\n    };\r\n    var setter = getBaseSetter();\r\n    var stack = [];\r\n    if (opts.transform) {\r\n        stack.push(opts.transform);\r\n    }\r\n    stack.push(setter);\r\n    if (opts.callback) {\r\n        stack.push(opts.callback);\r\n    }\r\n    var functionStack = createFunctionPipe(stack);\r\n    if (opts.onchange) {\r\n        var getter_1 = getterFrom(el);\r\n        el.onchange = function () {\r\n            functionStack(getter_1());\r\n        };\r\n    }\r\n    return functionStack;\r\n}\r\nfunction createFunctionPipe(functions) {\r\n    if (functions === void 0) { functions = []; }\r\n    return function (value) {\r\n        for (var _i = 0, functions_1 = functions; _i < functions_1.length; _i++) {\r\n            var func = functions_1[_i];\r\n            value = func(value);\r\n        }\r\n        return value;\r\n    };\r\n}\r\n\n\n//# sourceURL=webpack:///./src/config/utils.ts?");

/***/ }),

/***/ "./src/email.ts":
/*!**********************!*\
  !*** ./src/email.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar emailEncoded = [\r\n    \"o\", \"m\", \"m\", \"y\", \"w\", \"e\", \"b\", \"e\", \"r\", \"3\", \"3\", \"@\", \"g\", \"m\", \"a\", \"i\", \"l\", \".\", \"c\", \"o\", \"m\", \"t\",\r\n].join(\"\");\r\nvar email = emailEncoded[emailEncoded.length - 1];\r\nfor (var i = 0; i < emailEncoded.length - 1; i++) {\r\n    email += emailEncoded[i];\r\n}\r\nvar els = document.getElementsByClassName(\"email\");\r\nfor (var i = 0; i < els.length; i++) {\r\n    var el = els[i];\r\n    el.textContent = email;\r\n    el.href = \"mailto:\" + email;\r\n}\r\n\n\n//# sourceURL=webpack:///./src/email.ts?");

/***/ }),

/***/ "./src/error/idnotfound.ts":
/*!*********************************!*\
  !*** ./src/error/idnotfound.ts ***!
  \*********************************/
/*! exports provided: ElementIDNotFoundError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ElementIDNotFoundError\", function() { return ElementIDNotFoundError; });\nvar __extends = (undefined && undefined.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nvar ElementIDNotFoundError = (function (_super) {\r\n    __extends(ElementIDNotFoundError, _super);\r\n    function ElementIDNotFoundError(id) {\r\n        return _super.call(this, \"Element with id '\" + id + \"' not found.\") || this;\r\n    }\r\n    return ElementIDNotFoundError;\r\n}(Error));\r\n\r\n\n\n//# sourceURL=webpack:///./src/error/idnotfound.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _email__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./email */ \"./src/email.ts\");\n/* harmony import */ var _email__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_email__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _sw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sw */ \"./src/sw.ts\");\n/* harmony import */ var _config_prompterconfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config/prompterconfig */ \"./src/config/prompterconfig.ts\");\n/* harmony import */ var _prompter_prompter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./prompter/prompter */ \"./src/prompter/prompter.ts\");\n/* harmony import */ var _prompter_reilly__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./prompter/reilly */ \"./src/prompter/reilly.ts\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils */ \"./src/utils.ts\");\n\r\n\r\n\r\n\r\n\r\n\r\nfunction getConfig() {\r\n    return new _config_prompterconfig__WEBPACK_IMPORTED_MODULE_2__[\"PrompterConfigManager\"]();\r\n}\r\nfunction getPrompter(cfg) {\r\n    if (location.search === \"?reilly\") {\r\n        return new _prompter_reilly__WEBPACK_IMPORTED_MODULE_4__[\"ReillyPrompter\"](cfg);\r\n    }\r\n    else {\r\n        return new _prompter_prompter__WEBPACK_IMPORTED_MODULE_3__[\"Prompter\"](cfg);\r\n    }\r\n}\r\nvar config = getConfig();\r\nconfig.load();\r\nconfig.save();\r\nObject(_utils__WEBPACK_IMPORTED_MODULE_5__[\"getElement\"])(\"save-button\").onclick = function () { return config.save(); };\r\nObject(_utils__WEBPACK_IMPORTED_MODULE_5__[\"getElement\"])(\"reset-button\").onclick = function () { return config.promptReset(); };\r\nvar prompter = getPrompter(config);\r\nwindow.addEventListener('beforeunload', function (e) {\r\n    if (config.options.unsavedChangesWarning.get() && prompter.config.hasChanged()) {\r\n        var text = [\r\n            \"You have unsaved changes to your config!\",\r\n            \"If you leave these changes will be reset!\",\r\n            \"(disable this warning by unchecking \\\"Unsaved changes warning\\\")\",\r\n        ].join(\"\\n\");\r\n        e.returnValue = text;\r\n        return text;\r\n    }\r\n}, true);\r\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/keyboard/keyboard.ts":
/*!**********************************!*\
  !*** ./src/keyboard/keyboard.ts ***!
  \**********************************/
/*! exports provided: Keyboard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Keyboard\", function() { return Keyboard; });\nvar Keyboard = (function () {\r\n    function Keyboard() {\r\n        this.handlers = [];\r\n        this.requirements = [];\r\n        this.keyDownHandlers = [];\r\n        this.keyPressHandlers = [];\r\n        this.keyUpHandlers = [];\r\n        document.addEventListener(\"keydown\", this._createEventHandler(this.keyDownHandlers));\r\n        document.addEventListener(\"keyup\", this._createEventHandler(this.keyUpHandlers));\r\n        document.addEventListener(\"keypress\", this._createEventHandler(this.keyPressHandlers));\r\n    }\r\n    Keyboard.prototype.require = function (func) {\r\n        this.requirements.push(func);\r\n    };\r\n    Keyboard.prototype.onKeyDown = function (keyCode, handler) {\r\n        this._addHandler(keyCode, handler, this.keyDownHandlers);\r\n    };\r\n    Keyboard.prototype.onKeyUp = function (keyCode, handler) {\r\n        this._addHandler(keyCode, handler, this.keyUpHandlers);\r\n    };\r\n    Keyboard.prototype.onKeyPress = function (keyCode, handler) {\r\n        this._addHandler(keyCode, handler, this.keyPressHandlers);\r\n    };\r\n    Keyboard.prototype.testRequirements = function (e) {\r\n        for (var _i = 0, _a = this.requirements; _i < _a.length; _i++) {\r\n            var func = _a[_i];\r\n            if (!func(e)) {\r\n                return false;\r\n            }\r\n        }\r\n        return true;\r\n    };\r\n    Keyboard.prototype._addHandler = function (keyCode, handler, eventHandlers) {\r\n        if (!eventHandlers[keyCode]) {\r\n            eventHandlers[keyCode] = [];\r\n        }\r\n        var existingHandlers = eventHandlers[keyCode];\r\n        existingHandlers.push(handler);\r\n    };\r\n    Keyboard.prototype._createEventHandler = function (eventHandlers) {\r\n        var _this = this;\r\n        return function (e) {\r\n            if (!_this.testRequirements(e)) {\r\n                return;\r\n            }\r\n            var keyCode = e.keyCode;\r\n            var handlers = eventHandlers[keyCode];\r\n            if (!handlers) {\r\n                return;\r\n            }\r\n            var preventDefault = false;\r\n            for (var _i = 0, handlers_1 = handlers; _i < handlers_1.length; _i++) {\r\n                var handler = handlers_1[_i];\r\n                var result = handler();\r\n                if (result) {\r\n                    preventDefault = true;\r\n                    break;\r\n                }\r\n            }\r\n            if (preventDefault) {\r\n                e.preventDefault();\r\n            }\r\n        };\r\n    };\r\n    return Keyboard;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack:///./src/keyboard/keyboard.ts?");

/***/ }),

/***/ "./src/prompter/abstract.ts":
/*!**********************************!*\
  !*** ./src/prompter/abstract.ts ***!
  \**********************************/
/*! exports provided: Direction, AbstractPrompter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Direction\", function() { return Direction; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"AbstractPrompter\", function() { return AbstractPrompter; });\nvar ONE_FRAME = 1000 / 60;\r\nvar Direction;\r\n(function (Direction) {\r\n    Direction[Direction[\"Up\"] = -1] = \"Up\";\r\n    Direction[Direction[\"Down\"] = 1] = \"Down\";\r\n})(Direction || (Direction = {}));\r\nvar AbstractPrompter = (function () {\r\n    function AbstractPrompter(config) {\r\n        this._scrollDistance = 0;\r\n        this.lastFrameTime = 0;\r\n        this.maxScrollDistance = Infinity;\r\n        this.direction = Direction.Down;\r\n        this.showing = false;\r\n        this.scrolling = false;\r\n        this.config = config;\r\n        this.loop = this.loop.bind(this);\r\n        this.loop(0);\r\n    }\r\n    AbstractPrompter.prototype.start = function () {\r\n        this.scrolling = true;\r\n    };\r\n    AbstractPrompter.prototype.stop = function () {\r\n        this.scrolling = false;\r\n    };\r\n    AbstractPrompter.prototype.show = function () {\r\n        this.showing = true;\r\n        this.scrollDistance = 0;\r\n        this.loadScript(this.getScript());\r\n    };\r\n    AbstractPrompter.prototype.hide = function () {\r\n        this.stop();\r\n        this.showing = false;\r\n    };\r\n    AbstractPrompter.prototype.reverseDirection = function () {\r\n        if (this.direction === Direction.Up) {\r\n            this.direction = Direction.Down;\r\n        }\r\n        else {\r\n            this.direction = Direction.Up;\r\n        }\r\n    };\r\n    AbstractPrompter.prototype.loop = function (currentTime) {\r\n        requestAnimationFrame(this.loop);\r\n        if (!this.showing) {\r\n            return;\r\n        }\r\n        var timeSinceLastFrame = Math.min(currentTime - this.lastFrameTime, 1000);\r\n        if (this.scrolling) {\r\n            this.scroll(timeSinceLastFrame / ONE_FRAME);\r\n        }\r\n        this.lastFrameTime = currentTime;\r\n        this.render(Math.floor(this.scrollDistance));\r\n    };\r\n    AbstractPrompter.prototype.scroll = function (frames) {\r\n        this.scrollDistance += this.config.options.speed.get() * this.direction * frames;\r\n    };\r\n    AbstractPrompter.prototype.toggleScrolling = function () {\r\n        if (this.scrolling) {\r\n            this.stop();\r\n        }\r\n        else {\r\n            this.start();\r\n        }\r\n    };\r\n    Object.defineProperty(AbstractPrompter.prototype, \"scrollDistance\", {\r\n        get: function () {\r\n            return this._scrollDistance;\r\n        },\r\n        set: function (scrollDistance) {\r\n            if (scrollDistance < 0) {\r\n                scrollDistance = 0;\r\n            }\r\n            if (scrollDistance > this.maxScrollDistance) {\r\n                scrollDistance = this.maxScrollDistance;\r\n            }\r\n            this._scrollDistance = scrollDistance;\r\n        },\r\n        enumerable: true,\r\n        configurable: true\r\n    });\r\n    return AbstractPrompter;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack:///./src/prompter/abstract.ts?");

/***/ }),

/***/ "./src/prompter/prompter.ts":
/*!**********************************!*\
  !*** ./src/prompter/prompter.ts ***!
  \**********************************/
/*! exports provided: Prompter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Prompter\", function() { return Prompter; });\n/* harmony import */ var _keyboard_keyboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../keyboard/keyboard */ \"./src/keyboard/keyboard.ts\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ \"./src/utils.ts\");\n/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./abstract */ \"./src/prompter/abstract.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\n\r\n\r\n\r\nvar SPEED_INCREMENT = 0.25;\r\nvar MIN_SPEED = 0;\r\nvar MAX_SPEED = 10;\r\nvar Prompter = (function (_super) {\r\n    __extends(Prompter, _super);\r\n    function Prompter(config) {\r\n        var _this = _super.call(this, config) || this;\r\n        _this.prompterLines = Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"getElement\"])(\"prompter-lines\");\r\n        _this.prompterText = Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"getElement\"])(\"prompter-lines-text\");\r\n        _this.prompterEndText = Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"getElement\"])(\"prompter-lines-end-text\");\r\n        _this.addListeners();\r\n        _this.addKeyboardHandlers();\r\n        return _this;\r\n    }\r\n    Prompter.prototype.addListeners = function () {\r\n        var _this = this;\r\n        Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"getElement\"])(\"start-button\").addEventListener(\"click\", function (e) { return _this.show(); });\r\n        Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"getElement\"])(\"options-toggle-run\").addEventListener(\"click\", function (e) { return _this.toggleScrolling(); });\r\n        Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"getElement\"])(\"options-toggle-direction\").addEventListener(\"click\", function (e) { return _this.reverseDirection(); });\r\n        Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"getElement\"])(\"options-exit\").addEventListener(\"click\", function (e) { return _this.hide(); });\r\n        Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"getElement\"])(\"options-speed-up\").addEventListener(\"click\", function (e) { return _this.speedUp(); });\r\n        Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"getElement\"])(\"options-speed-down\").addEventListener(\"click\", function (e) { return _this.speedDown(); });\r\n        window.addEventListener(\"wheel\", function (e) {\r\n            if (_this.showing) {\r\n                _this.scrollDistance += e.deltaY;\r\n            }\r\n        });\r\n        window.addEventListener(\"resize\", function (e) {\r\n            if (_this.showing) {\r\n                _this.maxScrollDistance = _this.getTextLength();\r\n            }\r\n        });\r\n    };\r\n    Prompter.prototype.addKeyboardHandlers = function () {\r\n        var _this = this;\r\n        var keyboard = new _keyboard_keyboard__WEBPACK_IMPORTED_MODULE_0__[\"Keyboard\"]();\r\n        keyboard.require(function () { return _this.showing; });\r\n        keyboard.onKeyDown(32, function () { return _this.toggleScrolling(); });\r\n        keyboard.onKeyPress(32, function () { return _this.showing; });\r\n        keyboard.onKeyUp(32, function () { return _this.showing; });\r\n        keyboard.onKeyDown(27, function () {\r\n            if (_this.scrollDistance === 0) {\r\n                _this.hide();\r\n            }\r\n            else {\r\n                _this.scrollDistance = 0;\r\n                _this.stop();\r\n            }\r\n        });\r\n        keyboard.onKeyDown(38, function () { return _this.speedUp(); });\r\n        keyboard.onKeyDown(40, function () { return _this.speedDown(); });\r\n        keyboard.onKeyDown(82, function () { return _this.setDirection(_abstract__WEBPACK_IMPORTED_MODULE_2__[\"Direction\"].Up); });\r\n        keyboard.onKeyUp(82, function () { return _this.setDirection(_abstract__WEBPACK_IMPORTED_MODULE_2__[\"Direction\"].Down); });\r\n    };\r\n    Prompter.prototype.reverseDirection = function () {\r\n        _super.prototype.reverseDirection.call(this);\r\n        if (this.direction === _abstract__WEBPACK_IMPORTED_MODULE_2__[\"Direction\"].Up) {\r\n            Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"getElement\"])(\"options-toggle-direction\").textContent = \"Moving Up\";\r\n        }\r\n        else {\r\n            Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"getElement\"])(\"options-toggle-direction\").textContent = \"Moving Down\";\r\n        }\r\n    };\r\n    Prompter.prototype.start = function () {\r\n        _super.prototype.start.call(this);\r\n        Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"getElement\"])(\"options-toggle-run\").textContent = \"Stop\";\r\n    };\r\n    Prompter.prototype.stop = function () {\r\n        _super.prototype.stop.call(this);\r\n        Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"getElement\"])(\"options-toggle-run\").textContent = \"Start\";\r\n    };\r\n    Prompter.prototype.show = function () {\r\n        Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"setDisplay\"])(Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"getElement\"])(\"main\"), false);\r\n        Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"setDisplay\"])(Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"getElement\"])(\"prompter\"), true);\r\n        _super.prototype.show.call(this);\r\n    };\r\n    Prompter.prototype.hide = function () {\r\n        Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"setDisplay\"])(Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"getElement\"])(\"main\"), true);\r\n        Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"setDisplay\"])(Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"getElement\"])(\"prompter\"), false);\r\n        _super.prototype.hide.call(this);\r\n    };\r\n    Prompter.prototype.render = function (distance) {\r\n        var lines = this.prompterLines;\r\n        lines.style.transform = \"translateY(-\" + distance + \"px)\";\r\n    };\r\n    Prompter.prototype.loadScript = function (script) {\r\n        this.resetScript();\r\n        var scriptLines = script.split(\"\\n\");\r\n        for (var _i = 0, scriptLines_1 = scriptLines; _i < scriptLines_1.length; _i++) {\r\n            var line = scriptLines_1[_i];\r\n            this.addLine(line);\r\n        }\r\n        this.maxScrollDistance = this.getTextLength();\r\n        this.addLine(this.config.options.endText.get(), Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"getElement\"])(\"prompter-lines-end-text\"));\r\n    };\r\n    Prompter.prototype.getScript = function () {\r\n        return Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"getElement\"])(\"text-input\").value;\r\n    };\r\n    Prompter.prototype.getTextLength = function () {\r\n        return this.prompterText.scrollHeight;\r\n    };\r\n    Prompter.prototype.addLine = function (text, container) {\r\n        if (container === void 0) { container = this.prompterText; }\r\n        var item = document.createElement(\"p\");\r\n        item.textContent = text;\r\n        container.appendChild(item);\r\n    };\r\n    Prompter.prototype.resetScript = function () {\r\n        Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"emptyElement\"])(this.prompterText);\r\n        Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"emptyElement\"])(this.prompterEndText);\r\n    };\r\n    Prompter.prototype.setSpeed = function (speed) {\r\n        this.config.options.speed.set(Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"clamp\"])(speed, MIN_SPEED, MAX_SPEED));\r\n    };\r\n    Prompter.prototype.speedUp = function () {\r\n        if (this.showing) {\r\n            this.setSpeed(this.config.options.speed.get() + SPEED_INCREMENT);\r\n        }\r\n    };\r\n    Prompter.prototype.speedDown = function () {\r\n        if (this.showing) {\r\n            this.setSpeed(this.config.options.speed.get() - SPEED_INCREMENT);\r\n        }\r\n    };\r\n    Prompter.prototype.setDirection = function (direction) {\r\n        this.direction = direction;\r\n    };\r\n    return Prompter;\r\n}(_abstract__WEBPACK_IMPORTED_MODULE_2__[\"AbstractPrompter\"]));\r\n\r\n\n\n//# sourceURL=webpack:///./src/prompter/prompter.ts?");

/***/ }),

/***/ "./src/prompter/reilly.ts":
/*!********************************!*\
  !*** ./src/prompter/reilly.ts ***!
  \********************************/
/*! exports provided: ReillyPrompter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ReillyPrompter\", function() { return ReillyPrompter; });\n/* harmony import */ var _prompter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./prompter */ \"./src/prompter/prompter.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\n\r\nvar QUOTES = [\r\n    /„/ig,\r\n    /‚/ig,\r\n    /“/ig,\r\n    /‟/ig,\r\n    /‘/ig,\r\n    /‛/ig,\r\n    /”/ig,\r\n    /’/ig,\r\n    /\\\"/ig,\r\n    /❛/ig,\r\n    /❜/ig,\r\n    /❟/ig,\r\n    /❝/ig,\r\n    /❞/ig,\r\n    /⹂/ig,\r\n    /〝/ig,\r\n    /〞/ig,\r\n    /〟/ig,\r\n    /＂/ig,\r\n];\r\nfunction unquote(input) {\r\n    for (var _i = 0, QUOTES_1 = QUOTES; _i < QUOTES_1.length; _i++) {\r\n        var c = QUOTES_1[_i];\r\n        input = input.replace(c, \"\");\r\n    }\r\n    return input;\r\n}\r\nfunction comma(input) {\r\n    var s = input.split(\" \");\r\n    var length = s.length;\r\n    var res = \"\";\r\n    for (var i = 0; i < length; i++) {\r\n        var text = s[i];\r\n        var progress = i / length;\r\n        res += text;\r\n        if (Math.random() < progress / 10 && /(?:\\w|\\d)$/.test(text)) {\r\n            res += \", \";\r\n        }\r\n        else {\r\n            res += \" \";\r\n        }\r\n    }\r\n    return res;\r\n}\r\nfunction replacePeriods(input) {\r\n    var REPLACEMENTS = [\"!\", \"?\", \".\"];\r\n    var s = input.split(/!|\\?|\\./ig);\r\n    var length = s.length - 1;\r\n    var res = \"\";\r\n    for (var i = 0; i < length; i++) {\r\n        var text = s[i];\r\n        var progress = i / length;\r\n        res += text;\r\n        if (Math.random() < progress / 10) {\r\n            res += REPLACEMENTS[Math.floor(Math.random() * (REPLACEMENTS.length - 1))];\r\n        }\r\n        else {\r\n            res += \".\";\r\n        }\r\n    }\r\n    return res;\r\n}\r\nvar ReillyPrompter = (function (_super) {\r\n    __extends(ReillyPrompter, _super);\r\n    function ReillyPrompter() {\r\n        return _super !== null && _super.apply(this, arguments) || this;\r\n    }\r\n    ReillyPrompter.prototype.getScript = function () {\r\n        var input = _super.prototype.getScript.call(this);\r\n        input = unquote(input);\r\n        input = comma(input);\r\n        input = replacePeriods(input);\r\n        return input;\r\n    };\r\n    return ReillyPrompter;\r\n}(_prompter__WEBPACK_IMPORTED_MODULE_0__[\"Prompter\"]));\r\n\r\n\n\n//# sourceURL=webpack:///./src/prompter/reilly.ts?");

/***/ }),

/***/ "./src/sw.ts":
/*!*******************!*\
  !*** ./src/sw.ts ***!
  \*******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/utils.ts\");\n\r\nfunction serviceWorkersSupported(supported) {\r\n    var element = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"getElement\"])(\"sw-support\");\r\n    element.classList.remove(\"maybe\");\r\n    if (supported) {\r\n        element.classList.add(\"yes\");\r\n        element.textContent = \"is probably\";\r\n    }\r\n    else {\r\n        element.classList.add(\"no\");\r\n        element.textContent = \"is not\";\r\n    }\r\n}\r\nif (\"serviceWorker\" in navigator) {\r\n    window.addEventListener(\"load\", function () {\r\n        navigator.serviceWorker.register(\"sw.js\").then(function () {\r\n            console.log(\"Registered Service Worker\");\r\n            serviceWorkersSupported(true);\r\n        }).catch(function (err) {\r\n            console.error(\"Service worker registration failed:\", err);\r\n            serviceWorkersSupported(false);\r\n        });\r\n    });\r\n}\r\nelse {\r\n    serviceWorkersSupported(false);\r\n}\r\n\n\n//# sourceURL=webpack:///./src/sw.ts?");

/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/*! exports provided: getElement, setDisplay, emptyElement, clamp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getElement\", function() { return getElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setDisplay\", function() { return setDisplay; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"emptyElement\", function() { return emptyElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"clamp\", function() { return clamp; });\n/* harmony import */ var _error_idnotfound__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./error/idnotfound */ \"./src/error/idnotfound.ts\");\n\r\nfunction getElement(id) {\r\n    var el = document.getElementById(id);\r\n    if (el === null) {\r\n        throw new _error_idnotfound__WEBPACK_IMPORTED_MODULE_0__[\"ElementIDNotFoundError\"](id);\r\n    }\r\n    return el;\r\n}\r\nfunction setDisplay(el, show) {\r\n    el.style.display = show ? \"block\" : \"none\";\r\n}\r\nfunction emptyElement(el) {\r\n    while (el.firstChild) {\r\n        el.removeChild(el.firstChild);\r\n    }\r\n}\r\nfunction clamp(i, min, max) {\r\n    if (i > max) {\r\n        return max;\r\n    }\r\n    else if (i < min) {\r\n        return min;\r\n    }\r\n    else {\r\n        return i;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/utils.ts?");

/***/ })

/******/ });