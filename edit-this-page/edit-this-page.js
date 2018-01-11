// Edit This Page script.
// This is loaded by the bookmarklet on most sites.

// It is designed to (hopefully) work in almost any browser.

/* jshint esversion: 3 */
(function () {
  "use strict";

  // metadata constants
  var VERSION = "0.8";

  // detect if the bookmark version is out of date
  var LATEST_LOADER_VERSION = 1;

  // window.__editThisPageLoader is defined by the bookmark
  var LOADER_VERSION = window.__editThisPageLoader;
  if (LOADER_VERSION !== LATEST_LOADER_VERSION && !window.__editThisPageWarnShown) {
    window.open("https://garbomuffin.github.io/edit-this-page/update.html?version=" + LOADER_VERSION);

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

  function stopPropagation(e) {
    if (window.__editThisPageState) {
      e.stopPropagation();
    }
  }

  function makeEditable(el) {
    el.setAttribute("contenteditable", "true");
  }

  function makeUneditable(el) {
    el.removeAttribute("contenteditable");
  }

  // callback for the mutation observer
  function mutationCallback(mutations) {
    if (!window.__editThisPageState) {
      return;
    }

    for (var i = 0; i < mutations.length; i++) {
      var mutation = mutations[i];
      var addedNodes = mutation.addedNodes;
      for (var j = 0; j < addedNodes.length; j++) {
        var node = addedNodes[j];
        console.log(node);
        makeEditable(node);
      }
    }
  }

  // the main function, sets an element's 'contenteditable' tag
  // recurses into iframes
  function main(body, editable) {
    // create a mutation observer
    // observes changes and will apply contenteditable to new elements as they are made
    if (!editThisPageAlreadyLoaded && window.MutationObserver) {
      var observer = new MutationObserver(mutationCallback);
      observer.observe(body, {
        childList: true,
        subtree: true
      });
    }

    // add the event listeners to stop stopPropogation
    // but only on the first run
    if (!editThisPageAlreadyLoaded) {
      document.addEventListener("keypress", stopPropagation, true);
      document.addEventListener("keyup", stopPropagation, true);
      document.addEventListener("keydown", stopPropagation, true);
      // TODO: cancel mouse events
      // document.addEventListener("mousedown", stopPropagation, true);
      // document.addEventListener("mouseup", stopPropagation, true);
      // document.addEventListener("mousemove", stopPropagation, true);
    }

    var elements = body.getElementsByTagName("*");
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];

      // recursively run on iframes
      if (element.tagName === "IFRAME") {
        try {
          main(element.contentDocument, editable);
        } catch (e) {
          // sometimes things could break, idk
          // frames might be able to do some weird stuff and deny access to the document
          // (google does this)
          // haven't tested it so this is just a temp workaround
          // FIXME: do something cleaner before v1.0
          log("error recursing iframe");
        }
      }

      // the actual toggling on/off of editability
      if (editable) {
        makeEditable(element);
      } else {
        makeUneditable(element);
      }
    }
  }

  log("loaded edit-this-page v" + VERSION);

  // call the main function on the document
  main(document, editThisPageState);
}());
