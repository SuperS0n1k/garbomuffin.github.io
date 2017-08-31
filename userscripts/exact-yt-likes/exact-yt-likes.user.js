// ==UserScript==
// @name         Exact YT Likes
// @namespace    https://garbomuffin.bitbucket.io/userscripts/exact-yt-likes
// @version      1.0
// @description  Exact likes on YouTube with the new layout
// @author       GarboMuffin
// @match        https://www.youtube.com/watch*
// @run-at       document-idle
// @downloadURL  https://garbomuffin.bitbucket.io/userscripts/exact-yt-likes/exact-yt-likes.user.js
// ==/UserScript==

(function(){
  "use strict";

  function number(i){
    return i.match(/[0123456789,]*/g)[0];
  }

  // give youtube time to load things
  // maybe i should figure out how to actually do this
  // document-idle doesn't run late enough
  setTimeout(function(){
    // the first 2 elements with tag name ytd-toggle-button-renderer are the like and dislike buttons
    var buttons = document.getElementsByTagName("ytd-toggle-button-renderer");
    var el = [buttons[0], buttons[1]];

    for (var i of el){
      var e = i.getElementsByTagName("yt-formatted-string")[0];
      e.textContent = number(e.getAttribute("aria-label"));
    }
  }, 1000);
})();
