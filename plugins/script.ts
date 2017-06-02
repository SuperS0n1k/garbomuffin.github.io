"use strict";

declare var plugins: SpigotPlugin[]

type TemplateFormat = string|string[]|Template

interface IPlugin {
  name: string
  pluginVersion: string
  minecraftVersion: string
  about: string

  download: string
  source: string

  subtext?: string

  body?: string

  permissions?: Permission[]
  config?: string
  changelog?: ChangeLog[]
}

interface IPermission {
  name: string
  default: boolean
  about: string
  children?: string[]
}
interface IChangeLog {
  latest?: boolean
  version: string
  changes: string[]
}

class Template {
  constructor(el: HTMLElement, props?: Object){
    this.el = el.innerHTML;

    for (var i in props){
      this.format(i, props[i]);
    }
  }

  el: string

  format(old: string, replace: TemplateFormat){
    // WIP
    if (replace instanceof Array){
      replace = Template.listToHTMLString(replace);
    }else if (replace instanceof Template){
      replace = replace.el;
    }
    if (typeof replace === "string"){
      var selector = "${" + old + "}";
      while (this.el.indexOf(selector) > -1){
        this.el = this.el.replace(selector, replace);
      }
    }
    return this;
  }

  append(el: string|HTMLElement|Template){
    if (typeof el === "string"){
      this.el += el;
    }else if (el instanceof HTMLElement){
      this.el += el.innerHTML;
    }else if (el instanceof Template){
      this.el += el.el;
    }
    return this;
  }

  appendTo(el: HTMLElement|Template, preserveUndefined: boolean = false){
    // replace stray templates
    if (!preserveUndefined){
      this.stripUndefined();
    }

    if (el instanceof HTMLElement){
      el.insertAdjacentHTML("beforeend", this.el);
    }else{
      el.el += this.el;
    }

    return this;
  }

  stripUndefined(){
    this.el = this.el.replace(/\${.*}/g, "");
    return this;
  }

  static listToHTMLString(list: any[]){
    var ret = "";
    for (var i of list){
      ret += `<li>${i}</li>`
    }
    return ret;
  }
}

class Permission extends Template implements IPermission {
  constructor(props: IPermission){
    super(document.getElementById("entry"), props);

    if (props.default){
      this.format("default", "(default)");
    }

    // this.name = props.name || "Permission";
    // this.default = typeof props.default !== "undefined" ? props.default : true;
    // this.about = props.about || "About";
    // this.children = props.children || [];
    if (props.children.length > 0){
      this.format("child",
        new Template(document.getElementById("permission-children"))
          .format("children", props.children)
      );
    }

    this.stripUndefined();
  }

  name: string
  default: boolean
  about: string
  children?: string[]
}

class ChangeLog extends Template implements IChangeLog {
  constructor(props){
    super(document.getElementById("entry"), props);

    this.format("child",
      new Template(document.getElementById("changelog-children"), props)
        .format("children", props.changes)
    );

    if (props.latest){
      this.format("lts", "(latest)");
    }

    this.stripUndefined();
  }

  version: string
  changes: string[]
}

var SpigotPlugins:any = {};
class SpigotPlugin extends Template {
  constructor(props: IPlugin){
    super(document.getElementById("plugin"), props);

    this.props = props;

    SpigotPlugins[props.name as string] = this;
  }

  props: IPlugin
}

class PluginPage extends Template {
  constructor(plugin: SpigotPlugin){
    super(activePage, plugin.props);

    // permissions
    var permissions = plugin.props.permissions;
    if (permissions && permissions.length > 0){
      var perms = new Template(document.getElementById("container")).format("text", "Permissions");
      var row = new Template(document.getElementById("row"));

      this.format("perms", createGridLayout(perms, permissions));
    }

    // changelog
    var changelog = plugin.props.changelog;
    if (changelog && changelog.length > 0){
      var changes = new Template(document.getElementById("container"))
      .format("text", "Changelog")
      .append("</div>")

      this.format("change", createGridLayout(changes, plugin.props.changelog, 2));
    }
  }
}

var rowTemplate = document.getElementById("row");
function createGridLayout(container: Template, items: Template[], rowLength = 3): Template{
  var colSize = Math.floor(12 / rowLength);;

  var row = new Template(rowTemplate);
  var rs = 0;
  for (var item of items){
    if (rs === 3){
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

function load(){
  var pluginPageRegexp = /^(#)?\/\w*$/ig;
  if (pluginPageRegexp.test(location.hash)){
    setActive(location.hash.substr(2));
  }else{
    loadPlugins();
  }
}

function setActive(pl: string){
  var pluginPage = document.getElementById("pluginPage");
  while (pluginPage.firstChild){
    pluginPage.removeChild(pluginPage.firstChild);
  }

  document.getElementById("pluginList").style.display = "none";
  pluginPage.style.display = "block";

  var plugin = SpigotPlugins[pl];
  new PluginPage(plugin).appendTo(pluginPage);
}

function loadPlugins(){
  document.getElementById("pluginList").style.display = "block";
  document.getElementById("pluginPage").style.display = "none";
  if (loadedPlugins) return;

  loadedPlugins = true;

  for (var i of plugins){
    i.appendTo(document.getElementById("pluginList"));
  }
}

window.onhashchange = function(){
  load();
}
