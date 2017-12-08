(function () {
  "use strict";

  // metadata
  var VERSION = "0.3";

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

  function preventDefault(e) {
    if (!!window.__editThisPageState) {
      e.preventDefault();
      e.stopPropagation();
    }
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

      if (!editThisPageLoaded) {
        // element.addEventListener("keydown", preventDefault);
        // element.addEventListener("keypress", preventDefault);
        // element.addEventListener("keyup", preventDefault);
      }
    }
  }

  log("loaded edit-this-page v" + VERSION);

  var elements = document.getElementsByTagName("*");
  main(elements, editThisPageState);
}());

