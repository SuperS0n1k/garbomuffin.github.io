"use strict";

// This is really horrible.
// But it works.
// So that's great.

/* jshint -W097 */
/* globals window, console, document, setTimeout, XDomainRequest, XMLHttpRequest */

var running = false;

var defaults = {
  element: "code",
  error: "Failed to load. Are you sure it's shared? (try again?)",
  textarea: {
    element: "textarea",
    placeholder: "None.",
    readonly: "readonly"
  },
  pic: {
    element: "a", // we throw an <img> inside the <a>
    img: "img",
    target: "_blank"
  },
  remix: {
    none: "None",
    noneElement: "span",
    element: "a",
    target: "_blank"
  },
  bottom: {
    element: "a",
    separator: " | "
  }
};

var config = [
  {
    name: "Title",
    var: "ptitle",
  },
  {
    name: "ID",
    var: "pid"
  },
  {
    name: "Notes and Credits:",
    var: "pcredits",
    type: "textarea"
  },
  {
    name: "Instructions",
    var: "pinstructions",
    type: "textarea"
  },
  {
    name: "Author",
    var: "pauthor",
  },
  {
    name: "Thumbnail",
    var: "pimg",
    type: "pic"
  },
  {
    name: "Creation",
    var: "pcreate"
  },
  {
    name: "Last Modified",
    var: "pmodify"
  },
  {
    name: "Shared",
    var: "pshare"
  },
  {
    name: "Views",
    var: "pviews"
  },
  {
    name: "Loves",
    var: "ploves"
  },
  {
    name: "Favorites",
    var: "pfavs"
  },
  {
    name: "Comments",
    var: "pid"
  },
  {
    name: "[Remix] Parent",
    var: "pparent",
    type: "remix"
  },
  {
    name: "[Remix] Original",
    var: "proot",
    type: "remix"
  },
];

var bottomLinks = [
  {
    text: "Scratch API v1 JSON",
  },
  {
    text: "Scratch API v2 JSON"
  },
  {
    text: "Project Link"
  }
];

var noLinebreak = [
  "remix"
];

function jsonp(data){
  window.pauthor = data.creator.username;
  window.pid = data.id;
  var createCORSRequest = function(method, url){
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr){
      xhr.open(method, url, true);
    }else if (typeof XDomainRequest != "undefined"){
      xhr = new XDomainRequest();
      xhr.open(method, url);
    }else{
      itBroke();
    }
    return xhr;
  };
  var url = "https://api.scratch.mit.edu/users/" + window.pauthor + "/projects/" + window.pid;
  var method = "GET";
  var xhr = createCORSRequest(method, url);
  xhr.onload = function(){
    var responseText = JSON.parse(xhr.responseText);
    window.ptitle = responseText.title;
    window.pcredits = responseText.description;
    window.pinstructions = responseText.instructions;
    window.pimg = responseText.image;
    window.pcreate = responseText.history.created;
    window.pmodify = responseText.history.modified;
    window.pshare = responseText.history.shared;
    window.pviews = responseText.stats.views;
    window.ploves = responseText.stats.loves;
    window.pfavs = responseText.stats.favorites;
    window.pcomments = responseText.stats.comments;
    window.pparent = responseText.remix.parent;
    window.proot = responseText.remix.root;
    console.log("pid=" + window.pid);
    console.log("ptitle=" + window.ptitle);
    console.log("pcredits=" + window.pcredits);
    console.log("pinstructions=" + window.pinstructions);
    console.log("pauthor=" + window.pauthor);
    console.log("pimg=" + window.pimg);
    console.log("pcreate=" + window.pcreate);
    console.log("pmodify=" + window.pmodify);
    console.log("pshare=" + window.pshare);
    console.log("pviews=" + window.pviews);
    console.log("ploves=" + window.ploves);
    console.log("pfavs=" + window.pfavs);
    console.log("pcomments=" + window.pcomments);
    console.log("pparent=" + window.pparent);
    console.log("proot=" + window.proot);

    while (document.getElementById("info").firstChild){
      document.getElementById("info").removeChild(document.getElementById("info").firstChild);
    }

    var el;

    for (var i = 0; i < config.length; i++){
      if (i !== 0) document.getElementById("info").appendChild(document.createElement("br"));

      document.getElementById("info").appendChild(document.createTextNode(config[i].name + ": "));

      if (!config[i].type){
        el = document.createElement(defaults.element);
        el.appendChild(document.createTextNode(window[config[i].var]));
      }else{
        el = document.createElement(defaults[config[i].type].element);
        
        if (!noLinebreak.includes(config[i].type)) document.getElementById("info").appendChild(document.createElement("br"));

        if (config[i].type == "textarea"){
          el.value = window[config[i].var];
          el.placeholder = defaults.textarea.placeholder;
          el.setAttribute("readonly", defaults.textarea.readonly);
        }else if (config[i].type == "pic"){
          el.href = window[config[i].var];
          el.target = defaults.pic.target;
          var imgel = document.createElement(defaults.pic.img);
          imgel.src = el.href;
          imgel.setAttribute("width", "250px");
          el.appendChild(imgel);
        }else if (config[i].type == "remix"){
          if (window[config[i].var] === null){
            el = document.createElement(defaults.remix.noneElement);
            el.appendChild(document.createTextNode(defaults.remix.none));
          }else{
            el = document.createElement(defaults.remix.element);
            el.href = "https://scratch.mit.edu/projects/" + window[config[i].var] + "/";
            el.target = defaults.remix.target;
            el.appendChild(document.createTextNode(window[config[i].var]));
          }
        }else{
          console.warn("You broke it. [invald type]");
        }
      }
      
      document.getElementById("info").appendChild(el);
    }

    document.getElementById("info").appendChild(document.createElement("br"));
    document.getElementById("info").appendChild(document.createElement("br"));

    for (var n = 0; n < bottomLinks.length; n++){
      el = document.createElement(defaults.bottom.element);
      el.appendChild(document.createTextNode(bottomLinks[n].text));
      el.href = "";
      el.target = "_blank";

      if (n === 0){
        el.href = "https://scratch.mit.edu/api/v1/project/" + window.pid + "/";
      }else if (n == 1){
        el.href = "https://api.scratch.mit.edu/users/" + window.pauthor + "/projects/" + window.pid;
      }else if (n == 2){
        el.href = "https://scratch.mit.edu/projects/" + window.pid + "/";
      }

      document.getElementById("info").appendChild(el);
      if (n + 1 != bottomLinks.length) document.getElementById("info").appendChild(document.createTextNode(defaults.bottom.separator));
    }
    
    running = false;
  };
  xhr.onerror = function(){
    itBroke();
  };
  xhr.send();
}
function getInfo(){
  if (running) return;
  running = true;
  setTimeout(itBroke, 5000);
  while (document.getElementById("info").firstChild){
    document.getElementById("info").removeChild(document.getElementById("info").firstChild);
  }
  var id = document.getElementById("input").value;
  document.getElementById("info").appendChild(document.createTextNode("Loading..."));
  var el = document.createElement("script");
  el.src = "https://scratch.mit.edu/api/v1/project/" + id + "?callback=jsonp";
  document.body.appendChild(el);
}
function itBroke(){
  if (document.getElementById("info").innerHTML === "Loading..."){
    while (document.getElementById("info").firstChild){
      document.getElementById("info").removeChild(document.getElementById("info").firstChild);
    }
    console.log("error");
    document.getElementById("info").appendChild(document.createTextNode(defaults.error));
  }
  running = false;
}
document.getElementById('input').onkeydown = function(event) {
  if (event.keyCode == 13) {
    getInfo();
  }
};

document.addEventListener("DOMContentLoaded", function(){
  var input = document.getElementById("input");
  input.focus();
  input.select();
});
window.onload = function(){
  document.getElementById("getinfo").onclick = getInfo;
};
