// ==UserScript==
// @name         bring back discuss
// @namespace    https://garbomuffin.github.io/userscripts/bring-back-discuss/
// @version      1.1.1
// @description  some people wanted the discuss button back or something???
// @author       GarboMuffin
// @match        https://scratch.mit.edu/*
// @run-at       document-start
// ==/UserScript==

/*
 * Changelog:
 * v1.1:
 *  - Use DOMContentLoaded event instead of @run-at document-end
 *    This helps prevent seeing the Tips button for a second.
 */

document.addEventListener("DOMContentLoaded", function(event) {
  var tipsEl = document.getElementsByClassName("link tips")[0];
  var modernDesign = !!tipsEl;

  if (modernDesign){
    var tipsLink = tipsEl.getElementsByTagName("a")[0];
    var tipsText = tipsEl.getElementsByTagName("span")[0];

    tipsLink.href = "/discuss/";
    tipsText.textContent = "Discuss";
  }else{
    var siteNav = document.getElementsByClassName("site-nav")[0];
    var navEntry = siteNav.getElementsByTagName("li")[2];
    var oldTipsLink = navEntry.getElementsByTagName("a")[0];

    oldTipsLink.href = "/discuss/";
    oldTipsLink.textContent = "Discuss";
  }
});

