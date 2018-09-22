import { EncodedCredentials } from "../credentials";
import { AutoLogin } from "./auto-login";
import { KeyNames } from "../keys";
import { PageState } from "../page";
import { base64encode } from "../base64";
import { CONFIG } from "../config";

/// <reference path="../gm.ts" />

export class VHLLogin implements AutoLogin {
  resetCredentials() {
    GM_deleteValue(KeyNames.VHL_USERNAME);
    GM_deleteValue(KeyNames.VHL_PASSWORD);
  }

  submit() {
    (document.querySelector("input[type=submit]") as HTMLInputElement).click();
  }

  setDocumentCredentials(credentials: EncodedCredentials) {
    (document.getElementById("user_session_username") as HTMLInputElement).value = credentials.username;
    (document.getElementById("user_session_password") as HTMLInputElement).value = credentials.password;
  }

  private setCredentials(username: string, password: string) {
    GM_setValue(KeyNames.VHL_USERNAME, base64encode(username));
    GM_setValue(KeyNames.VHL_PASSWORD, base64encode(password));
  }

  storeCredentials() {
    const username = (document.getElementById("user_session_username") as HTMLInputElement).value;
    const password = (document.getElementById("user_session_password") as HTMLInputElement).value;
    this.setCredentials(username, password);
  }

  onload() {
    const el = document.createElement("a");
    el.textContent = "Remember Me";
    el.href = "#";
    el.onclick = () => {
      this.storeCredentials();
      this.submit();
      return false;
    };
    document.querySelector("section[aria-labelledby=login-head]")!.appendChild(el);
  }

  shouldSignIn() {
    return this.getState() === PageState.Normal && !this.recentlyLoggedOut();
  }

  recentlyLoggedOut() {
    const el = document.getElementById("flash_notice");
    return el && el.innerText.toLowerCase().trim().indexOf("logout successful") > -1;
  }

  getState() {
    const el = document.getElementById("flash_error");
    if (el) {
      if (el.innerText.toLowerCase().trim().indexOf("login is not valid") > -1) {
        return PageState.Error;
      }
    }
    return PageState.Normal;
  }

  getCredentials(): EncodedCredentials | null {
    const username = GM_getValue(KeyNames.VHL_USERNAME, null) as string | null;
    const password = GM_getValue(KeyNames.VHL_PASSWORD, null) as string | null;
    if (username === null || password === null) {
      return null;
    }
    return new EncodedCredentials(username, password);
  }
}
