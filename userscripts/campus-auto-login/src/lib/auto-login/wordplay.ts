import { EncodedCredentials } from "../credentials";
import { AutoLogin } from "./auto-login";
import { KeyNames } from "../keys";
import { PageState } from "../page";
import { base64encode } from "../base64";

/// <reference path="../gm.ts" />

export class WordPlayLogin implements AutoLogin {
  private loadQueue: Array<() => void> = [];
  private loaded: boolean = false;

  constructor() {
    this.loop();
  }

  private loop() {
    const isLoaded = !!document.getElementById("username");
    if (!isLoaded) {
      requestAnimationFrame(() => this.loop());
      return;
    }
    this.loaded = true;
    for (const func of this.loadQueue) {
      func();
    }
  }

  private executeOnLoad(func: () => void) {
    this.loadQueue.push(func);
  }

  resetCredentials() {
    GM_deleteValue(KeyNames.WP_PASSWORD);
    GM_deleteValue(KeyNames.WP_USERNAME);
  }

  submit() {
    if (!this.loaded) {
      return;
    }

    var button = document.querySelector("button.btn.btn-primary.center-block");
    if (button instanceof HTMLButtonElement) {
      button.click();
    }
  }

  setDocumentCredentials(credentials: EncodedCredentials) {
    this.executeOnLoad(() => {
      const usernameInput = document.getElementById("username") as HTMLInputElement | null;
      const passwordInput = document.getElementById("password") as HTMLInputElement | null;
      if (!usernameInput || !passwordInput) {
        return;
      }

      // Wordplay uses react, so the normal set .value does not work
      var nativeInputValueSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")!.set!;
      nativeInputValueSetter.call(usernameInput, credentials.username);
      usernameInput.dispatchEvent(new Event("input", {bubbles: true}));
      nativeInputValueSetter.call(passwordInput, credentials.password);
      passwordInput.dispatchEvent(new Event("input", {bubbles: true}));

      this.submit();
    });
  }

  private setCredentials(username: string, password: string) {
    GM_setValue(KeyNames.WP_USERNAME, base64encode(username));
    GM_setValue(KeyNames.WP_PASSWORD, base64encode(password));
  }

  storeCredentials() {
    const username = (document.getElementById("username") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;
    this.setCredentials(username, password);
  }

  onload() {
    var el = document.createElement("a");
    el.textContent = "Remember Me";
    el.href = "#";
    el.className = "center sm";
    el.onclick = () => {
      this.storeCredentials();
      this.submit();
      return false;
    };

    this.executeOnLoad(() => {
      var container = document.querySelector("form div.center");
      if (container) {
        container.appendChild(document.createElement("br"));
        container.appendChild(el);
      }
    })
  }

  shouldSignIn() {
    return this.getState() === PageState.Normal;
  }

  getState() {
    return PageState.Normal;
  }

  getCredentials(): EncodedCredentials | null {
    const username = GM_getValue(KeyNames.WP_USERNAME, null) as string | null;
    const password = GM_getValue(KeyNames.WP_PASSWORD, null) as string | null;
    if (username === null || password === null) {
      return null;
    }
    return new EncodedCredentials(username, password);
  }
}
