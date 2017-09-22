/* !!! IMPORTANT - PLEASE READ !!!
 * This script can do a couple things:
 * 1) Automatically choosing a google account on the account choosing page.
 *    (auto selection)
 * 2) Automatically accepting permissions for certain sites.
 *    (auto accepting)
 *
 * BOTH OF THESE MUST BE CONFIGURED OR YOU COULD BREAK THINGS
 * The things to be configured are located directly below this block.
 * */

/// AUTO SELECTION ///

// This is the account you want to be automatically selected.
// Set to -1 to disable.
// This is 0 indexed. This means that the first account is #0, the second account is #1 (no not the memes), etc.
const USER_ACCOUNT = -1;

// If any more delay is required before clicking then increase this.
// in ms, may not be 100% accurate
const DELAY = 0;

/// AUTO ACCEPTING ///

// add domains to this list for permissions to be auto accepted
const WHITELIST = [
  "example.org",
];

// Below this line is code and userscript metadata. It does not need to be touched.

// ==UserScript==
// @name         Google Auto Select
// @version      0.1
// @description  Auto log-in to campus portal.
// @author       GarboMuffin
// @match        https://accounts.google.com/signin/oauth?*
// @match        https://accounts.google.com/signin/oauth/consent?*
// @namespace    https://garbomuffin.bitbucket.io/userscripts/google-auto-select/
// @downloadURL  https://garbomuffin.bitbucket.io/userscripts/google-auto-select/google-auto-select.user.js
// @run-at       document-idle
// ==/UserScript==

const PAGES = {
  consent: 0, choose: 1,
};
var PAGE;
if (location.href.indexOf("consent") > -1){
  PAGE = PAGES.consent;
}else{
  PAGE = PAGES.choose;
}

if (USER_ACCOUNT >= 0 && PAGE === PAGES.choose){
  setTimeout(function(){
    // what the fuck google?
    document.getElementsByClassName("TnvOCe k6Zj8d XraQ3b")[USER_ACCOUNT].click();
  }, DELAY);
}

if (WHITELIST.length > 0 && PAGE === PAGES.consent){
  const interval = setInterval(function(){
    const el = document.getElementById("developer_info_glif");
    if (el === null){
      return;
    }
    clearInterval(interval);

    const SITE = el.textContent;
    if (WHITELIST.indexOf(SITE) > -1){
      document.getElementById("submit_approve_access").click();
    }
  }, 0);
}
