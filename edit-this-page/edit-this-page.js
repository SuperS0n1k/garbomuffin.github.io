(function () {
  "use strict";

  // metadata constants
  var VERSION = "0.3.1";

  // detect if the bookmark version is out of date
  var LATEST_LOADER_VERSION = 0;

  // window.__editThisPageLoader is defined by the bookmark
  var LOADER_VERSION = window.__editThisPageLoader;
  if (LOADER_VERSION !== LATEST_LOADER_VERSION && !window.__editThisPageWarnShown) {
    alert([
      "The bookmarklet for edit-this-page has updated!",
      "Visit https://garbomuffin.github.io/edit-this-page/ to update.",
      "However this will likely continue to work."
    ].join("\n"));

    // only the show update warning once per site
    window.__editThisPageWarnShown = true;
  }

  // support toggling between editable/not editable
  var editThisPageState = !window.__editThisPageState;
  window.__editThisPageState = editThisPageState;

  // log into the console
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

  // the main function, sets an element's 'contenteditable' tag
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

  // call the main function with all elements as targets
  var elements = document.getElementsByTagName("*");
  main(elements, editThisPageState);
}());
