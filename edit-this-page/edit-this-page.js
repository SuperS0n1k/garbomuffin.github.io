(function () {
  "use strict";

  var VERSION = "0.3";

  var LATEST_LOADER_VERSION = 0;
  var LOADER_VERSION = window.__editThisPageLoader;
  if (LOADER_VERSION !== LATEST_LOADER_VERSION && !window.__editThisPageWarnShown) {
    alert([
      "The bookmarklet for edit-this-page has updated!",
      "Visit https://garbomuffin.github.io/edit-this-page/ to update.",
      "However this will likely continue to work."
    ].join("\n"));
    window.__editThisPageWarnShown = true;
  }

  var editThisPageLoaded = !!window.__editThisPageLoaded;
  window.__editThisPageLoaded = true;

  var editThisPageState = !window.__editThisPageState;
  window.__editThisPageState = editThisPageState;

  // utility methods
  function log() {
    if (!console || !console.log) {
      return;
    }

    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    args.unshift("[edit-this-page]");
    console.log.apply(console, args);
  }

  function main(elementList, editable) {
    if (editable) {
      log("making elements editable");
    } else {
      log("making elements uneditable");
    }

    for (var i = 0; i < elementList.length; i++) {
      var element = elementList[i];
      if (editable) {
        element.setAttribute("contenteditable", "true");
      } else {
        element.removeAttribute("contenteditable");
      }
    }
  }

  log("loaded edit-this-page v" + VERSION);

  var elements = document.getElementsByTagName("*");
  main(elements, editThisPageState);
}());

