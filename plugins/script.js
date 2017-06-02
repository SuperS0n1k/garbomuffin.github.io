"use strict";
class Template {
    constructor(el, props) {
        this.el = el.innerHTML;
        for (var i in props) {
            this.format(i, props[i]);
        }
    }
    format(old, replace) {
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
    }
    append(el) {
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
    }
    appendTo(el, preserveUndefined = false) {
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
    }
    stripUndefined() {
        this.el = this.el.replace(/\${.*}/g, "");
        return this;
    }
    static listToHTMLString(list) {
        var ret = "";
        for (var i of list) {
            ret += `<li>${i}</li>`;
        }
        return ret;
    }
}
class Permission extends Template {
    constructor(props) {
        super(document.getElementById("permission"), props);
        if (props.default) {
            this.format("default", "(default)");
        }
        // this.name = props.name || "Permission";
        // this.default = typeof props.default !== "undefined" ? props.default : true;
        // this.about = props.about || "About";
        // this.children = props.children || [];
        if (props.children.length > 0) {
            this.format("child", new Template(document.getElementById("permission-children"))
                .format("children", props.children));
        }
        this.stripUndefined();
    }
}
var SpigotPlugins = {};
class SpigotPlugin extends Template {
    constructor(props) {
        super(document.getElementById("plugin"), props);
        this.props = props;
        SpigotPlugins[props.name] = this;
    }
}
class ActivePage extends Template {
    constructor(plugin) {
        super(activePage, plugin.props);
        // permissions
        var permissions = plugin.props.permissions;
        if (permissions && permissions.length > 0) {
            var perms = new Template(document.getElementById("permissions"));
            var row = new Template(document.getElementById("row"));
            var rowSize = 0;
            for (var permission of permissions) {
                if (rowSize === 3) {
                    rowSize = 0;
                    row.append("</div>");
                    perms.append(row);
                    row = new Template(document.getElementById("row"));
                }
                rowSize++;
                row.append(permission);
            }
            row.append("</div>");
            perms.append(row);
            perms.append("</div>");
            this.append(perms);
        }
    }
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
    new ActivePage(plugin).appendTo(pluginPage);
}
function loadPlugins() {
    document.getElementById("pluginList").style.display = "block";
    document.getElementById("pluginPage").style.display = "none";
    if (loadedPlugins)
        return;
    loadedPlugins = true;
    for (var i of plugins) {
        i.appendTo(document.getElementById("pluginList"));
    }
}
window.onhashchange = function () {
    load();
};
