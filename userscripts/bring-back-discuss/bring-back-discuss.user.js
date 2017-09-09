// ==UserScript==
// @name         bring back discuss
// @namespace    https://garbomuffin.bitbucket.io/userscripts/bring-back-discuss/
// @version      1.0
// @description  some people wanted the discuss button back or something???
// @author       GarboMuffin
// @match        https://scratch.mit.edu/*
// @updateURL    https://garbomuffin.bitbucket.io/userscripts/bring-back-discuss/bring-back-discuss.user.js
// ==/UserScript==

(function(){
  "use strict";

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
})();
