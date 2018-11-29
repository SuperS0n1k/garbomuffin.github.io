//
// Creating the bookmarklet
//

// Creates the bookmarklet on the element with the id "install-button"

(function () {
  "use strict";

  var version = 1;
  var host = location.origin;
  var scriptSource = host + "/edit-this-page/edit-this-page.js";

  var js = [
    // define bookmark version globally
    `window.__editThisPageLoader=${version};`,

    // create a script element and try to load our script
    "var s=document.createElement('script');",
    `s.src='${scriptSource}';`,

    // in the case of an error, gracefully handle it by manually doing most of what the remote script itself does
    "s.onerror=function(){",
    "(window.__editThisPageState=!window.__editThisPageState)?document.body.setAttribute('contenteditable','true'):document.body.removeAttribute('contenteditable')",
    "};",

    // append our script to the body
    "document.body.appendChild(s)",
  ].join("");

  document.addEventListener("DOMContentLoaded", function () {
    var installButton = document.getElementById("install-button");
    installButton.href = "javascript:(function(){" + js + "}());";
  });
}());
