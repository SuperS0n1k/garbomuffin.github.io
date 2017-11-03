// ==UserScript==
// @name         Exact YT Likes
// @namespace    https://garbomuffin.bitbucket.io/userscripts/exact-yt-likes
// @version      1.1.1
// @description  Exact likes on YouTube with the new layout
// @author       GarboMuffin
// @match        https://www.youtube.com/watch*
// @run-at       document-idle
// @downloadURL  https://garbomuffin.github.io/userscripts/exact-yt-likes/exact-yt-likes.user.js
// ==/UserScript==

(function(){
  "use strict";

  function number(i){
    return i.match(/[0123456789,]*/g)[0];
  }

  function fix(){
    // the first 2 elements with tag name ytd-toggle-button-renderer are the like and dislike buttons
    var buttons = document.getElementsByTagName("ytd-toggle-button-renderer");
    if (buttons.length === 0){
      return false;
    }

    var el = [buttons[0], buttons[1]];

    for (var i of el){
      var e = i.getElementsByTagName("yt-formatted-string")[0];
      e.textContent = number(e.getAttribute("aria-label"));
    }

    return true;
  }

  // give youtube time to load things
  // document-idle doesn't run late enough
  var interval = setInterval(function(){
    if (fix()){
      clearInterval(interval);
    }
  });
})();
