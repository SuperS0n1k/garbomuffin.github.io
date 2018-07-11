// ==UserScript==
// @name         ytembed
// @namespace    https://garbomuffin.github.io/ytembed/
// @version      0.0.4
// @author       GarboMuffin
// @match        https://www.youtube.com/*
// @match        https://garbomuffin.github.io/ytembed/userscript/config.html
// @downloadURL  https://garbomuffin.github.io/ytembed/userscript/ytembed.user.js
// @run-at       document-idle
// @require      https://openuserjs.org/src/libs/sizzle/GM_config.js
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle
// ==/UserScript==

(function() {
  "use strict";
  const YTEMBED_CONTAINER_ID = "_ytembed_container";

  //
  // INIT CONFIG
  //

  GM_config.init({
    id: "YTEmbedConfig",
    title: "Settings",
    fields: {
      // Main
      classicSupport: {
        label: "Support classic YouTube design",
        type: "checkbox",
        default: true,
        section: ["Main", "These are the only things you should change if you want to."],
      },
      materialSupport: {
        label: "Support new(ish) YouTube design",
        type: "checkbox",
        default: true,
      },
      linkDestination: {
        label: "Link Destination",
        type: "select",
        options: ["garbomuffin.github.io/ytembed", "youtube.com/embed"],
        default: "garbomuffin.github.io/ytembed",
      },

      // Experimental
      hideLinks: {
        label: "Hide Links (please ignore this setting)",
        type: "checkbox",
        default: false,
        section: ["Experimental", "Please ignore all of these."],
      },
      checkInterval: {
        label: "Interval time (ms)",
        type: "int",
        default: 100,
      },
    },
  });
  
  //
  // UTIL METHODS
  //

  function getElementById(id) {
    const el = document.getElementById(id);
    if (!el) {
      throw new Error("Cannot find element with id " + id);
    }
    return el;
  }

  function createElement(type, opts = {}) {
    const el = document.createElement(type);
    for (const key of Object.keys(opts)) {
      const val = opts[key];
      el[key] = val;
    }
    el.classList.add("ytembed");
    return el;
  }

  function getVideoId() {
    // https://stackoverflow.com/a/8260383
    const url = window.location.href;
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : false;
  }

  function getBypassLink() {
    const linkDestination = GM_config.get("linkDestination");
    if (linkDestination === "garbomuffin.github.io/ytembed") {
      return "https://garbomuffin.github.io/ytembed#" + window.location.href;
    } else if (linkDestination === "youtube.com/embed") {
      return "https://youtube.com/embed/" + getVideoId();
    }
  }

  //
  // HANDLERS
  //

  // https://garbomuffin.github.io/ytembed/userscript/config.html
  class ConfigHandler {
    run() {
      GM_config.open();
    }
  }

  // base handler for youtube watch pages
  class VideoHandler {
    // must be implemented when extended
    isVideoBlocked() {
      console.warn("ytembed: unimplemented isVideoBlocked()");
      return false;
    }

    // must be implemented when extended
    addBlockedLink() {
      console.warn("ytembed: unimplemented addBlockedLink()");
    }

    // must be implemented when extended
    addVideoLink() {
      console.warn("ytembed: unimplemented addVideoLink()");
    }

    run() {
      if (this.errored) {
        return;
      }

      try {
        if (this.isVideoBlocked()) {
          this.addBlockedLink();
        } else {
          this.addVideoLink();
        }
      } catch (err) {
        console.error(" > ytembed userscript FATAL error:");
        console.error(err.stack);
        this.errored = true;
      }
    }

    canRun() {
      return !document.getElementById(YTEMBED_CONTAINER_ID);
    }
  }

  // supports the "classic" youtube design
  class ClassicHandler extends VideoHandler {
    isVideoBlocked() {
      const el = document.getElementById("unavailable-message");
      if (!el) {
        return false;
      }
      const rect = el.getBoundingClientRect();
      return rect.width !== 0;
    }

    addBlockedLink() {
      const submessage = getElementById("unavailable-submessage");
      const container = createElement("div", {
        id: YTEMBED_CONTAINER_ID,
      });
      container.appendChild(createElement("a", {
        textContent: "View it on ytembed!",
        href: getBypassLink(),
      }));
      submessage.appendChild(container);
    }

    addVideoLink() {
      const overflowMenu = getElementById("action-panel-overflow-menu");
      const container = createElement("li", {
        id: YTEMBED_CONTAINER_ID
      });
      container.appendChild(createElement("a", {
        textContent: "ytembed",
        className: "yt-ui-menu-item has-icon yt-uix-menu-close-on-select action-panel-trigger",
        href: getBypassLink(),
      }));
      overflowMenu.appendChild(container);
    }
  }

  // supports the "material" youtube design
  class MaterialHandler extends VideoHandler {
    isVideoBlocked() {
      const el = document.getElementsByTagName("yt-player-error-message-renderer")[0];
      if (!el) {
        return false;
      }
      const rect = el.getBoundingClientRect();
      return rect.width !== 0;
    }

    addBlockedLink() {
      const warning = getElementById("info");
      const container = createElement("div", {
        id: YTEMBED_CONTAINER_ID,
      });
      container.appendChild(createElement("a", {
        textContent: "View it on ytembed!",
        href: getBypassLink(),
      }));
      warning.appendChild(container);
    }

    addVideoLink() {
      const overflowMenu = document.getElementsByTagName("paper-listbox")[0];
      if (!overflowMenu) {
        return;
      }
      const container = createElement("ytd-menu-navigation-item-renderer", {
        className: "style-scope ytd-menu-popup-renderer",
        id: YTEMBED_CONTAINER_ID
      });
      container.appendChild(createElement("a", {
        textContent: "ytembed",
        className: "style-scope ytd-menu-navigation-item-renderer",
        href: getBypassLink(),
      }));
      overflowMenu.appendChild(container);
    }
  }

  function getHandler() {
    const onConfigPage = location.href.indexOf("/ytembed/userscript/config.html") > -1;
    const isUsingMaterial = document.getElementsByTagName("ytd-app").length > 0;
    if (onConfigPage) {
      return new ConfigHandler();
    } else if (isUsingMaterial && GM_config.get("materialSupport")) {
      return new MaterialHandler();
    } else if (GM_config.get("classicSupport")) {
      return new ClassicHandler();
    }
    return null;
  }

  const handler = getHandler();
  if (!handler) {
    return;
  }

  // experimental: hide links option
  // makes them invisible however functionally the same if you know where to click
  if (GM_config.get("hideLinks")) {
    // opacity: 0 makes it hidden but still functional and take up space
    GM_addStyle("a.ytembed{opacity: 0;}");
    // when hovered show
    GM_addStyle("a.ytembed:hover{opacity: 1;}");
  }

  // VideoHandlers are special in that they constantly need to be running
  if (handler instanceof VideoHandler) {
    setInterval(function() {
      if (handler.canRun()) {
        handler.run();
      }
    }, GM_config.get("checkInterval"));
  } else {
    handler.run();
  }
}());
