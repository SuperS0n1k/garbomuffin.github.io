//
// Creating the bookmarklet
//

// Creates the bookmarklet on the element with the id "install-button"

(function () {
  "use strict";

  var dev = location.href === "http://localhost:8080/edit-this-page/";
  var host = dev ? "http://localhost:8080" : "//garbomuffin.github.io";
  var scriptSource = host + "/edit-this-page/edit-this-page.js";

  // Golfed because bookmarks function terribly with long amounts of code
  var js = [
    // define bookmark version globally
    "window.__editThisPageLoader=1;",

    // create a script element and try to load our script
    "var s=document.createElement('script');",
    "s.src='" + scriptSource + "';",

    // some sites block this using the Content Security Policy script-src directive (see: github)
    // so the bookmark uses onerror to detect loading failure and use a basic fallback
    "s.onerror=function(){",
    "window.__editThisPageState=!window.__editThisPageState;",
    // set 'contenteditable' to 'true' for all elements
    "var e=document.getElementsByTagName('*');",

    /*
    for (var i = 0; i < e.length; i++) {
      if (__editThisPageState) {
        e[i].setAttribute("contenteditable", "true");
      } else {
        e[i].removeAttribute("contenteditable");
      }
    }
    */
    "for(var i=0;i<e.length;i++)",
    "window.__editThisPageState?e[i].setAttribute('contenteditable','true'):e[i].removeAttribute('contenteditable');",
    "};",

    // append our script to the body
    "document.body.appendChild(s)",
  ].join("");

  document.addEventListener("DOMContentLoaded", function () {
    var installButton = document.getElementById("install-button");
    installButton.href = "javascript:(function(){" + js + "}());";
  });
}());
