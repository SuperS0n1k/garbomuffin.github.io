(function() {
  "use strict";

  // load metadata
  var VERSION = "0.1";

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

  log("loaded edit-this-page v" + VERSION);

  // set the contenteditable attribute to true
  var elements = document.getElementsByTagName("*");
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    element.setAttribute("contenteditable", "true");
  }
}());

