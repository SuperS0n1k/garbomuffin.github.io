// ==UserScript==
// @name         Restricted Mode Bypass
// @namespace    https://garbomuffin.bitbucket.io/userscripts/restricted-mode-bypass
// @version      2.0.1
// @description  "I like restricted mode!" -Said nobody ever.
// @author       GarboMuffin
// @match        https://www.youtube.com/*
// @downloadURL  https://garbomuffin.bitbucket.io/userscripts/restricted-mode-bypass/restricted-mode-bypass.user.js
// @updateURL    https://garbomuffin.bitbucket.io/userscripts/restricted-mode-bypass/restricted-mode-bypass.meta.js
// ==/UserScript==

var quality = localStorage.RMBQuality || "highest";
var width = localStorage.RMBWidth || 480;
const SERVER = "https://stark-dawn-58632.herokuapp.com";

var qualities = [
  "highest (recommended)", "720p", "360p (better audio)", "360p",
];
var qualityCodes = {
  "highest (recommended)": "highest",
  "720p": "22",
  "360p (better audio)": "43",
  "360p": "18",
};

function start(){
  if (document.getElementById("unavailable-message")){
    if (document.getElementById("rmb")) document.getElementById("rmb").style.display = "block";
    document.getElementsByClassName("content")[0].appendChild(document.createElement("br"));
    document.getElementsByClassName("content")[0].appendChild(button("Watch it anyway.", bypass));
  }
}

function bypass(){
  document.getElementById("page").style.display = "none";
  document.getElementById("page-container").appendChild(container());
}

function container(){
  var el = div("rmb");
  el.style.marginLeft = "48px";
  el.style.marginRight = "48px";
  el.style.marginTop = "48px";
  // el.appendChild(element("h1", "", "Restricted Mode Bypass"));
  el.innerHTML += "It's a little buggy, is technically against the YouTube TOS, but hey it works.<br>";
  el.appendChild(div("rmbstatus", "Loading... (this can actually take a while)"));
  el.appendChild(video());
  el.appendChild(div("rmbmeta"));
  el.appendChild(options());
  return el;
}

function div(id = "", text = ""){
  return element("div", id, text);
}

function span(id = "", text = ""){
  return element("span", id, text);
}

function input(onchange, id = "", value = ""){
  var el = element("input", id);
  el.onchange = onchange;
  el.value = value;
  return el;
}

function element(type, id = "", text = ""){
  var el = document.createElement(type);
  if (id) el.id = id;
  if (text) el.innerHTML = text;
  return el;
}

function br(){
  return document.createElement("br");
}

function link(text, href, target = "_blank"){
  var el = element("a", "", text);
  el.href = href;
  el.target = target;
  return el;
}

function button(text, onclick){
  var el = element("a", "", text);
  el.onclick = onclick;
  return el;
}

function text(text){
  return document.createTextNode(text);
}

function video(){
  var el = document.createElement("video");
  el.width = width;
  // el.height = 360;
  el.src = videoUrl();
  el.autoplay = true;
  el.controls = true;
  el.id = "video";
  el.addEventListener("error", function(err){
    console.error(err);
    if (video.currentTime === 0){
      document.getElementById("video").src = videoUrl();
    }else{
      var a = document.createElement("a");
      a.onclick = function(){
        document.getElementById("video").src = videoUrl();
      };
      a.innerHTML = "Try to restart it.";
      document.getElementById("rmbstatus").innerHTML = `An error occured while playing the video. `;
      document.getElementById("rmbstatus").appendChild(a);
    }
  });
  el.addEventListener("canplay", function(){
    document.getElementById("rmbstatus").innerHTML = "Everything seems to be working, video should start playing.";
    videoMeta(videoId());
  });
  return el;
}

function videoId(){
  return location.search.match(/(v=([^#\&\?]*))/)[2];
}

function videoMeta(id){
  var el = document.getElementById("rmbmeta");
  fetch(`${SERVER}/info?v=${id}`).then(function(res){
    return res.json();
  }).then(function(json){
    // sometimes the json can be empty, i really don't know why
    var a = link(json.author.name, json.author.url);

    el.appendChild(element("h1", "", json.title));
    el.appendChild(text(`Uploaded on ${new Date(json.date).toLocaleString()} by `));
    el.appendChild(a);

    if (json.views){
      a = span("", json.views);
      a.style.paddingLeft = "100px";
      el.appendChild(a);
    }
    el.appendChild(br());

    a = button("Show description.", function(){
      textarea.style.display = "block";
      this.style.display = "none";
    });
    var textarea = element("textarea", "rmbdesc");
    textarea.value = json.description;
    textarea.style.display = "none";
    textarea.setAttribute("readonly", "readonly");
    // FIXME: Size issues

    el.appendChild(a);
    el.appendChild(textarea);

  }).catch(function(err){
    el.innerHTML = "Failed to load video metadata. ";
    el.appendChild(button("Try again", function(){
      videoMeta(videoId());
    }));
    console.error(err);
  });
}

function check(){
  if (location.href.indexOf("v=") > -1){
    if (url != location.href){
      url = location.href;
      start();
    }
  }else{
    document.getElementById("page").style.display = "block";
    if (document.getElementById("rmb")) document.getElementById("rmb").style.display = "none";
  }
}

function options(){
  var el = div();
  el.appendChild(br());
  var select = document.createElement("select");

  // quality
  select.id = "a";
  select.onchange = function(){
    var value = this.value;
    quality = qualityCodes[value];
    localStorage.RMBQuality = quality;
    document.getElementById("video").src = videoUrl();
  };
  for (let value of qualities){
    var option = document.createElement("option");
    option.innerHTML = value;
    option.value = value;
    if (qualityCodes[value] === quality) option.setAttribute("selected", "selected");
    select.appendChild(option);
  }
  el.innerHTML += "Quality: ";
  el.appendChild(select);
  el.appendChild(text(" (changes will restart the video and can take a while)"));
  el.appendChild(br());

  // width
  el.appendChild(text("Player size: "));
  el.appendChild(button("Grow", function(){
    width += 10;
    document.getElementById("video").width = width;
    localStorage.RMBWidth = width;
  }));
  el.appendChild(text(" "));
  el.appendChild(button("Shrink", function(){
    if (width > 100) width -= 10;
    document.getElementById("video").width = width;
    localStorage.RMBWidth = width;
  }));
  el.appendChild(text(" "));
  el.appendChild(button("Reset", function(){
    width = 480;
    document.getElementById("video").width = width;
    localStorage.RMBWidth = width;
  }));
  return el;
}

function videoUrl(){
  return `${SERVER}/download?v=${videoId()}&quality=${quality}`;
}

var url = "";
check();
setInterval(check, 1000);
