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
        super(document.getElementById("entry"), props);
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
class ChangeLog extends Template {
    constructor(props) {
        super(document.getElementById("entry"), props);
        this.format("child", new Template(document.getElementById("changelog-children"), props)
            .format("children", props.changes));
        if (props.latest) {
            this.format("lts", "(latest)");
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
class PluginPage extends Template {
    constructor(plugin) {
        super(activePage, plugin.props);
        // permissions
        var permissions = plugin.props.permissions;
        if (permissions && permissions.length > 0) {
            var perms = new Template(document.getElementById("container")).format("text", "Permissions");
            var row = new Template(document.getElementById("row"));
            this.format("perms", createGridLayout(perms, permissions));
        }
        // changelog
        var changelog = plugin.props.changelog;
        if (changelog && changelog.length > 0) {
            var changes = new Template(document.getElementById("container"))
                .format("text", "Changelog")
                .append("</div>");
            this.format("change", createGridLayout(changes, plugin.props.changelog, 2));
        }
    }
}
var rowTemplate = document.getElementById("row");
function createGridLayout(container, items, rowLength = 3) {
    var colSize = Math.floor(12 / rowLength);
    ;
    var row = new Template(rowTemplate);
    var rs = 0;
    for (var item of items) {
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
async function setActive(pl) {
    // reset the #pluginPage element
    var pluginPage = document.getElementById("pluginPage");
    while (pluginPage.firstChild) {
        pluginPage.removeChild(pluginPage.firstChild);
    }
    pluginPage.style.display = "block"; // reset some values for the next transition
    if (displayed) {
        document.getElementById("pluginList").style.opacity = "0"; // starts the transition
        pluginPage.style.opacity = "0";
        await sleep(300); // wait
    }
    document.getElementById("pluginList").style.display = "none"; // fully hide the old thing
    var plugin = SpigotPlugins[pl]; // get the content in there
    new PluginPage(plugin).appendTo(pluginPage);
    pluginPage.style.opacity = "1"; // start the transition
    displayed = true;
}
async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function loadPlugins() {
    if (displayed) {
        document.getElementById("pluginList").style.opacity = "0";
        document.getElementById("pluginPage").style.opacity = "0";
        await sleep(250);
        document.getElementById("pluginPage").style.display = "none";
        document.getElementById("pluginList").style.display = "block";
        await sleep(50);
    }
    document.getElementById("pluginList").style.opacity = "1";
    if (loadedPlugins)
        return;
    loadedPlugins = true;
    displayed = true;
    for (var i of plugins) {
        i.appendTo(document.getElementById("pluginList"));
    }
}
window.onhashchange = function () {
    load();
};
