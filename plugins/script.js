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
    var pluginPage = document.getElementById("pluginPage");
    while (pluginPage.firstChild) {
        pluginPage.removeChild(pluginPage.firstChild);
    }
    document.getElementById("pluginList").style.display = "none";
    pluginPage.style.display = "block";
    var plugin = SpigotPlugins[pl];
    new PluginPage(plugin).appendTo(pluginPage);
}
function loadPlugins() {
    document.getElementById("pluginList").style.display = "block";
    document.getElementById("pluginPage").style.display = "none";
    if (loadedPlugins)
        return;
    loadedPlugins = true;
    for (var _i = 0, plugins_1 = plugins; _i < plugins_1.length; _i++) {
        var i = plugins_1[_i];
        i.appendTo(document.getElementById("pluginList"));
    }
}
window.onhashchange = function () {
    load();
};
