// ==UserScript==
// @name         bring back discuss (💩 edition)
// @namespace    https://garbomuffin.bitbucket.io/userscripts/bring-back-discuss/
// @version      1.0.1
// @description  some people wanted the discuss button back or something???
// @author       GarboMuffin
// @match        https://scratch.mit.edu/*
// @run-at       document-start
// ==/UserScript==

document.addEventListener("DOMContentLoaded", function(event) {
  var tipsEl = document.getElementsByClassName("link tips")[0];
  var modernDesign = !!tipsEl;

  if (modernDesign){
    var tipsLink = tipsEl.getElementsByTagName("a")[0];
    var tipsText = tipsEl.getElementsByTagName("span")[0];

    tipsLink.href = "/discuss/";
    tipsText.textContent = "Discuss";

    tipsEl.insertAdjacentHTML("afterend", `<li class="link tips"><a href="/discuss/">Discuss</a></li>`);
  }else{
    var siteNav = document.getElementsByClassName("site-nav")[0];
    var navEntry = siteNav.getElementsByTagName("li")[2];
    var oldTipsLink = navEntry.getElementsByTagName("a")[0];

    oldTipsLink.href = "/discuss/";
    oldTipsLink.textContent = "Discuss";

    oldTipsLink.parentElement.insertAdjacentHTML("afterend", `<li><a href="/discuss/">Discuss</a></li>`);
  }
});

