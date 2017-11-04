"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Template = (function () {
    function Template(el, props) {
        this.el = el.innerHTML;
        for (var i in props) {
            this.format(i, props[i]);
        }
    }
    Template.prototype.format = function (old, replace) {
        // WIP
        if (replace instanceof Array) {
            replace = Template.listToHTMLString(replace);
        }
        else if (replace instanceof Template) {
            replace = replace.el;
        }
        if (typeof replace === "string") {
            var selector = "${" + old + "}";
            while (this.el.indexOf(selector) > -1) {
                this.el = this.el.replace(selector, replace);
            }
        }
        return this;
    };
    Template.prototype.append = function (el) {
        if (typeof el === "string") {
            this.el += el;
        }
        else if (el instanceof HTMLElement) {
            this.el += el.innerHTML;
        }
        else if (el instanceof Template) {
            this.el += el.el;
        }
        return this;
    };
    Template.prototype.appendTo = function (el, preserveUndefined) {
        if (preserveUndefined === void 0) { preserveUndefined = false; }
        // replace stray templates
        if (!preserveUndefined) {
            this.stripUndefined();
        }
        if (el instanceof HTMLElement) {
            el.insertAdjacentHTML("beforeend", this.el);
        }
        else {
            el.el += this.el;
        }
        return this;
    };
    Template.prototype.stripUndefined = function () {
        this.el = this.el.replace(/\${.*}/g, "");
        return this;
    };
    Template.listToHTMLString = function (list) {
        var ret = "";
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var i = list_1[_i];
            ret += "<li>" + i + "</li>";
        }
        return ret;
    };
    return Template;
}());
var Permission = (function (_super) {
    __extends(Permission, _super);
    function Permission(props) {
        var _this = _super.call(this, document.getElementById("entry"), props) || this;
        if (props["default"]) {
            _this.format("default", "(default)");
        }
        // this.name = props.name || "Permission";
        // this.default = typeof props.default !== "undefined" ? props.default : true;
        // this.about = props.about || "About";
        // this.children = props.children || [];
        if (props.children.length > 0) {
            _this.format("child", new Template(document.getElementById("permission-children"))
                .format("children", props.children));
        }
        _this.stripUndefined();
        return _this;
    }
    return Permission;
}(Template));
var ChangeLog = (function (_super) {
    __extends(ChangeLog, _super);
    function ChangeLog(props) {
        var _this = _super.call(this, document.getElementById("entry"), props) || this;
        _this.format("child", new Template(document.getElementById("changelog-children"), props)
            .format("children", props.changes));
        if (props.latest) {
            _this.format("lts", "(latest)");
        }
        _this.stripUndefined();
        return _this;
    }
    return ChangeLog;
}(Template));
var SpigotPlugins = {};
var SpigotPlugin = (function (_super) {
    __extends(SpigotPlugin, _super);
    function SpigotPlugin(props) {
        var _this = _super.call(this, document.getElementById("plugin"), props) || this;
        _this.props = props;
        SpigotPlugins[props.name] = _this;
        return _this;
    }
    return SpigotPlugin;
}(Template));
var PluginPage = (function (_super) {
    __extends(PluginPage, _super);
    function PluginPage(plugin) {
        var _this = _super.call(this, activePage, plugin.props) || this;
        // permissions
        var permissions = plugin.props.permissions;
        if (permissions && permissions.length > 0) {
            var perms = new Template(document.getElementById("container")).format("text", "Permissions");
            var row = new Template(document.getElementById("row"));
            _this.format("perms", createGridLayout(perms, permissions));
        }
        // changelog
        var changelog = plugin.props.changelog;
        if (changelog && changelog.length > 0) {
            var changes = new Template(document.getElementById("container"))
                .format("text", "Changelog")
                .append("</div>");
            _this.format("change", createGridLayout(changes, plugin.props.changelog, 2));
        }
        return _this;
    }
    return PluginPage;
}(Template));
var rowTemplate = document.getElementById("row");
function createGridLayout(container, items, rowLength) {
    if (rowLength === void 0) { rowLength = 3; }
    var colSize = Math.floor(12 / rowLength);
    ;
    var row = new Template(rowTemplate);
    var rs = 0;
    for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
        var item = items_1[_i];
        if (rs === 3) {
            rs = 0;
            row.append("</div>");
            container.append(row);
            row = new Template(document.getElementById("row"));
        }
        rs++;
        row.append(item);
    }
    row.append("</div>");
    container.append(row);
    container.append("</div>");
    return container;
}
var loadedPlugins = false;
var displayed = false;
var app = document.getElementById("app");
var activePage = document.getElementById("activePage");
function load() {
    var pluginPageRegexp = /^(#)?\/\w*$/ig;
    if (pluginPageRegexp.test(location.hash)) {
        setActive(location.hash.substr(2));
    }
    else {
        loadPlugins();
    }
}
function setActive(pl) {
    return __awaiter(this, void 0, void 0, function () {
        var pluginPage, plugin;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pluginPage = document.getElementById("pluginPage");
                    while (pluginPage.firstChild) {
                        pluginPage.removeChild(pluginPage.firstChild);
                    }
                    pluginPage.style.display = "block"; // reset some values for the next transition
                    if (!displayed) return [3 /*break*/, 2];
                    document.getElementById("pluginList").style.opacity = "0"; // starts the transition
                    pluginPage.style.opacity = "0";
                    return [4 /*yield*/, sleep(300)];
                case 1:
                    _a.sent(); // wait
                    _a.label = 2;
                case 2:
                    document.getElementById("pluginList").style.display = "none"; // fully hide the old thing
                    plugin = SpigotPlugins[pl];
                    new PluginPage(plugin).appendTo(pluginPage);
                    pluginPage.style.opacity = "1"; // start the transition
                    displayed = true;
                    ga("send", "event", "Plugin", "load", pl);
                    return [2 /*return*/];
            }
        });
    });
}
function sleep(ms) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) { return setTimeout(resolve, ms); })];
        });
    });
}
function loadPlugins() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, plugins_1, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!displayed) return [3 /*break*/, 3];
                    document.getElementById("pluginList").style.opacity = "0";
                    document.getElementById("pluginPage").style.opacity = "0";
                    return [4 /*yield*/, sleep(250)];
                case 1:
                    _a.sent();
                    document.getElementById("pluginPage").style.display = "none";
                    document.getElementById("pluginList").style.display = "block";
                    return [4 /*yield*/, sleep(50)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    document.getElementById("pluginList").style.opacity = "1";
                    if (loadedPlugins)
                        return [2 /*return*/];
                    loadedPlugins = true;
                    displayed = true;
                    for (_i = 0, plugins_1 = plugins; _i < plugins_1.length; _i++) {
                        i = plugins_1[_i];
                        i.appendTo(document.getElementById("pluginList"));
                    }
                    return [2 /*return*/];
            }
        });
    });
}
window.onhashchange = function () {
    load();
};
