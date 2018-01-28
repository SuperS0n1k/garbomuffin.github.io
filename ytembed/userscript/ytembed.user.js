(function() {
  const YTEMBED_CONTAINER_ID = "_ytembed_container";

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
    return el;
  }

  class Handler {
    isVideoBlocked() {
      return false;
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

    getYtembedUrl() {
      return "https://garbomuffin.github.io/ytembed#" + window.location.href;
    }

    canRun() {
      return !document.getElementById(YTEMBED_CONTAINER_ID);
    }

    addBlockedLink() {
      console.warn("no defined addBlockedLink()");
    }

    addVideoLink() {
      console.warn("no defined addVideoLink()");
    }
  }

  class ClassicHandler extends Handler {
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
        href: this.getYtembedUrl(),
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
        href: this.getYtembedUrl(),
      }));
      overflowMenu.appendChild(container);
    }
  }

  class MaterialHandler extends Handler {
    isVideoBlocked() {
      const el = document.getElementsByTagName("ytd-playability-error-supported-renderers")[0];
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
        href: this.getYtembedUrl(),
      }));
      warning.appendChild(container);
    }

    addVideoLink() {
      const overflowMenu = document.getElementsByClassName("selectable-content style-scope paper-menu")[0];
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
        href: this.getYtembedUrl(),
      }));
      overflowMenu.appendChild(container);
    }
  }

  function getHandlerClass() {
    const usingMaterial = !!document.getElementById("polymer-app");
    if (usingMaterial) {
      return MaterialHandler;
    } else {
      return ClassicHandler;
    }
  }

  const handlerClass = getHandlerClass();
  if (!handlerClass) {
    return;
  }
  const handler = new handlerClass();

  const runningInterval = setInterval(function() {
    if (handler.canRun()) {
      handler.run();
    }
  }, 100);
}());

// ==UserScript==
// @name         ytembed
// @namespace    https://garbomuffin.github.io/ytembed/
// @version      0.0.1
// @author       GarboMuffin
// @match        https://www.youtube.com/*
// @downloadURL  https://garbomuffin.github.io/ytembed/userscript/ytembed.user.js
// @run-at       document-idle
// ==/UserScript==
