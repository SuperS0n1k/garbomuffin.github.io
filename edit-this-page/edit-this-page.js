(function () {
  "use strict";

  // metadata
  var VERSION = "0.2.1";

  var previouslyLoaded = !!window.__editThisPage;
  window.__editThisPage = !previouslyLoaded;

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
  main(elements, !previouslyLoaded);
}());

