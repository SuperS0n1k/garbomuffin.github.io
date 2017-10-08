import { EncodedCredentials } from "../credentials";
import { AutoLogin } from "./auto-login";
import { KeyNames } from "../keys";
import { PageState } from "../page";
import { base64encode } from "../base64";

/// <reference path="../gm.ts" />

export class BIMAutoLogin implements AutoLogin {
  resetCredentials() {
    GM_deleteValue(KeyNames.BIM_USERNAME);
    GM_deleteValue(KeyNames.BIM_PASSWORD);
  }

  submit() {
    (document.getElementById("loginSubmit") as HTMLButtonElement).click();
  }

  setDocumentCredentials(credentials: EncodedCredentials) {
    (document.querySelector("input[name=username]") as HTMLInputElement).value = credentials.username;
    (document.querySelector("input[name=password]") as HTMLInputElement).value = credentials.password;
  }

  private setCredentials(username: string, password: string) {
    GM_setValue(KeyNames.BIM_USERNAME, base64encode(username));
    GM_setValue(KeyNames.BIM_PASSWORD, base64encode(password));
  }

  storeCredentials() {
    const username = (document.querySelector("input[name=username]") as HTMLInputElement).value
    const password = (document.querySelector("input[name=password]") as HTMLInputElement).value;
    this.setCredentials(username, password);
  }

  onload() {
    var el = document.createElement("a");
    el.textContent = "Remember Me";
    el.className = "forgot-password"; // bim does some styling off of this
    el.href = "#";
    el.onclick = () => {
      this.storeCredentials();
      this.submit();

      return false;
    }

    var container = document.createElement("p");
    container.appendChild(el);

    (document.getElementById("loginForm") as HTMLFormElement).appendChild(container);
  }

  shouldSignIn() {
    return this.getState() === PageState.Normal && !this.hasRecentlySignedOut();
  }

  getState() {
    if (location.href.indexOf("?error") > -1) {
      return PageState.Error;
    } else {
      return PageState.Normal;
    }
  }

  hasRecentlySignedOut() {
    return location.href.indexOf("?logout") > -1;
  }

  getCredentials(): EncodedCredentials | null {
    const username = GM_getValue(KeyNames.BIM_USERNAME, null) as string | null;
    const password = GM_getValue(KeyNames.BIM_PASSWORD, null) as string | null;
    if (username === null || password === null) {
      return null;
    }
    return new EncodedCredentials(username, password);
  }
}
