// ==UserScript==
// @name         Restricted Mode Bypass
// @namespace    https://garbomuffin.bitbucket.io/userscripts/restricted-mode-bypass
// @version      1.5.3
// @description  "I like restricted mode!" -Said nobody ever.
// @author       GarboMuffin
// @match        https://www.youtube.com/watch*
// @downloadURL  https://garbomuffin.bitbucket.io/userscripts/restricted-mode-bypass/restricted-mode-bypass.user.js
// @updateURL    https://garbomuffin.bitbucket.io/userscripts/restricted-mode-bypass/restricted-mode-bypass.meta.js
// ==/UserScript==

/*
CHANGLOG:

v1.5.3:
 - I'm a stupid. (fixed some text)

v1.5.2:
 - Fix some bugs and some small changes

v1.5.1:
 - Update download location.

v1.5
 - Made it work again.

v1.4.2:
 - Fix some random bugs.
 - Make it actually work again.

v1.4.1:
 - I should actually test this on my school account.

v1.4:
 - Rewrote a lot of stuff.
 - It will fix the gray controls on it's own now!
 - URL timecodes work.
 - Some other stuff I forgot.

v1.3:
 - Fix some change introduced by YouTube.

v1.2.1:
 - 10/10 description.

v1.2:
 - No longer do you need to refresh to fix the gray controls!

v1.1.4:
 - Hopefully made it work better.

v1.0 - v1.1.3:
 - Honestly no idea.
*/

function Embed(meta){
  var el = document.createElement("span");
  el.id = "rmbvideo";
  document.getElementById("watch7-container").appendChild(el);
  
  var video = document.getElementById("rmbvideo");

  el = document.createElement("span");
  el.id = "rmbstatus";
  video.appendChild(el);
  video.appendChild(document.createElement("br"));

  el = document.createElement("span");
  el.id = "rmbholder";
  video.appendChild(el);
  video.appendChild(document.createElement("br"));

  document.getElementById("player").style.display = "none";
  var tmp = document.getElementsByClassName("player-api");
  for (i = 0; i < tmp.length; i++){
    tmp[i].style.display = "none";
  }
  
  Video(meta.hd);
  video.appendChild(document.createElement("br"));

  el = document.createElement("div");
  el.id = "rmboptions";
  video.appendChild(el);
  rmboptions.appendChild(document.createElement("br"));

  rmboptions.appendChild(TextNode("Not playing? Click "));
  addOption("here", function(){
    rmbholder.removeChild(rmbvel);
    Video(meta.hd);
  });
  rmboptions.appendChild(TextNode("."));

  rmboptions.appendChild(document.createElement("br"));

  rmboptions.appendChild(TextNode("Change player size: "));
  addOption("Grow", function(){
    rmbvel.width = rmbvel.width + 50;
    saveSettings();
  });

  rmboptions.appendChild(document.createTextNode(" - "));
  addOption("Shrink", function(){
    rmbvel.width = rmbvel.width - 50;
    saveSettings();
  });

  rmboptions.appendChild(document.createTextNode(" - "));
  addOption("Reset", function(){
    rmbvel.width = 640;
    localStorage.removeItem("RMBSavedWidth");
  });
}

function Video(hd){
  var el = document.createElement("video");
  el.id = "rmbvel";

  var videoId = "";
  var time = "";
  if (location.href.indexOf("#") == -1){
    if (location.href.indexOf("t=") > -1){
      time = "#t=" + location.href.split("t=")[1];
      videoId = location.href.split("/")[3].split("?v=")[1].split("&t=")[0];
    }else{
      videoId = location.href.split("/")[3].split("?v=")[1];
    }
  }else{
    if (location.href.indexOf("t=") > -1){
      time = "#t=" + location.href.split("t=")[1].split("#")[0];
      videoId = location.href.split("/")[3].split("?v=")[1].split("&t=")[0].split("#")[0];
    }else{
      videoId = location.href.split("/")[3].split("?v=")[1].split("#")[0];
    }
  }

  if (hd){
    el.src = "https://tranquil-scrubland-46327.herokuapp.com/http://www.youtubeinmp4.com/redirect.php?video=" + videoId + "&hd=1" + time;
  }else{
    el.src = "https://tranquil-scrubland-46327.herokuapp.com/http://www.youtubeinmp4.com/redirect.php?video=" + videoId + time;
  }

  el.setAttribute("autoplay", "autoplay");
  el.setAttribute("controls", "controls");
  var RMBSavedWidth = localStorage.RMBSavedWidth;
  if (!isFinite(RMBSavedWidth)){
    el.width = 640;
  }else{
    el.width = RMBSavedWidth;
  }

  rmbstatus.innerHTML = "Loading video... (can take some time)";
  rmbholder.appendChild(el);

  rmbvel.addEventListener("error", function(){
    console.warn("err");
    rmbholder.removeChild(rmbvel);
    Video(hd);
  });

  rmbvel.addEventListener("canplay", function(){
    rmbstatus.innerHTML = "Video playing started! If the video is more than 30 minutes long you may have to refresh to play every 30 minute segment. (untested)";
  });
}

function makeButton(meta){
  var el = document.createElement("a");
  el.appendChild(document.createTextNode(meta.text));
  el.href = "#";
  el.onclick = function(){
    Embed({
      hd: meta.hd
    });
  };
  return el;
}

function TextNode(text){
  return document.createTextNode(text);
}

function addOption(t, f){
  var el = document.createElement("a");
  el.appendChild(TextNode(t));
  el.onclick = f;
  rmboptions.appendChild(el);
}

function saveSettings(){
  localStorage.RMBSavedWidth = rmbvel.width;
}

function start(){
  "use strict";
  if (document.getElementById("unavailable-message")){
    var content = document.getElementsByClassName("content")[0];
    var player = document.getElementById("player");
    content.appendChild(document.createElement("br"));

    var el = makeButton({
      text: "Watch it anyway.",
      hd: false
    }); 
    content.appendChild(el);
    content.appendChild(TextNode(" "));

    el = document.createElement("a");
    el.appendChild(TextNode("(HD)"));
    el.href = "#";
    el.onclick = function(){
      Embed({
        hd: true
      });
    };
    content.appendChild(el);
    content.appendChild(TextNode(" [please try to minimize usage of this, thanks!]"));
  }else{
    try{
      document.getElementById("watch7-container").removeChild(document.getElementById("rmbvideo"));
    }catch(e){
      console.warn("ehh?");
    }
  }
}

// thanks youtube
var oldUrl = "";
setInterval(function(){
  if (oldUrl != location.href){
	  oldUrl = location.href;
    start();
  }
}, 1000);
