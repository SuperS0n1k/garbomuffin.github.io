(function () {
  "use strict";

  // metadata constants
  var VERSION = "0.6";

  // detect if the bookmark version is out of date
  var LATEST_LOADER_VERSION = 0;

  // window.__editThisPageLoader is defined by the bookmark
  var LOADER_VERSION = window.__editThisPageLoader;
  if (LOADER_VERSION !== LATEST_LOADER_VERSION && !window.__editThisPageWarnShown) {
    var message = "The bookmarklet for edit-this-page has updated!\n";
    message += "Visit https://garbomuffin.github.io/edit-this-page/ to update.\n";
    message += "It may continue to work but no promises!";
    alert(message);

    // only the show update warning once per site
    window.__editThisPageWarnShown = true;
  }

  var editThisPageAlreadyLoaded = !!window.__editThisPageAlreadyLoaded;
  window.__editThisPageAlreadyLoaded = true;

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
  // recurses into iframes
  function main(body, editable) {
    var elements = body.getElementsByTagName("*");

    // add the event listeners to stop stopPropogation
    // but only on the first run
    if (!editThisPageAlreadyLoaded) {
      document.addEventListener("keypress", stopPropagation, true);
      document.addEventListener("keyup", stopPropagation, true);
      document.addEventListener("keydown", stopPropagation, true);
    }

    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];

      // recursively run on iframes
      if (element.tagName === "IFRAME") {
        try {
          main(element.contentDocument, editable);
        } catch (e) {
          // sometimes things could break, idk
        }
      }

      // the actual toggling on/off of editability
      if (editable) {
        element.setAttribute("contenteditable", "true");
      } else {
        element.removeAttribute("contenteditable");
      }
    }
  }

  function stopPropagation(e) {
    if (window.__editThisPageState) {
      e.stopPropagation();
    }
  }

  log("loaded edit-this-page v" + VERSION);

  // call the main function on the document
  main(document, editThisPageState);
}());
