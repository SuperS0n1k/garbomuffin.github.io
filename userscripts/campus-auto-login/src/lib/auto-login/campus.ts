import { EncodedCredentials } from "../credentials";
import { AutoLogin } from "./auto-login";
import { KeyNames } from "../keys";
import { PageState } from "../page";
import { base64encode } from "../base64";

/// <reference path="../gm.ts" />

abstract class BasePortalAutoLogin implements AutoLogin {
  resetCredentials(): void {
    GM_deleteValue(KeyNames.CAMPUS_USERNAME);
    GM_deleteValue(KeyNames.CAMPUS_PASSWORD);
  }

  getCredentials(): EncodedCredentials | null {
    const username = GM_getValue(KeyNames.CAMPUS_USERNAME, null) as string | null;
    const password = GM_getValue(KeyNames.CAMPUS_PASSWORD, null) as string | null;
    if (username === null || password === null) {
      return null;
    }
    return new EncodedCredentials(username, password);
  }

  protected setCredentials(username: string, password: string): void {
    GM_setValue(KeyNames.CAMPUS_USERNAME, base64encode(username));
    GM_setValue(KeyNames.CAMPUS_PASSWORD, base64encode(password));
  }

  getState() {
    if (document.location.href.indexOf("status=captcha") > -1) {
      return PageState.Captcha;
    } else if (document.location.href.indexOf("error") > -1) {
      return PageState.Error;
    } else {
      return PageState.Normal;
    }
  }

  abstract submit(): void;
  abstract setDocumentCredentials(credentials: EncodedCredentials): void;
  abstract onload(): void;
  abstract areCredentialsValid(): boolean;
  abstract shouldSignIn(): boolean;
}

export class OldPortalAutoLogin extends BasePortalAutoLogin {
  submit(): void {
    (document.getElementById("signinbtn") as HTMLButtonElement).click();
  }
  onload(): void {
    const el = document.getElementsByClassName("forgotpasswd")[0] as HTMLDivElement;

    const divider = "&nbsp;".repeat(3);
    el.insertAdjacentHTML("beforeend", `${divider}<span class="contacttext">|</span>${divider}`);

    const button = document.createElement("a");
    button.textContent = "Remember me";
    button.onclick = () => {
      this.storeCredentials();
      this.submit();

      return false;
    };

    el.insertAdjacentElement("beforeend", button);
  }
  setDocumentCredentials(credentials: EncodedCredentials) {
    (document.getElementById("username") as HTMLInputElement).value = credentials.username;
    (document.getElementById("password") as HTMLInputElement).value = credentials.password;
  }

  areCredentialsValid(): boolean {
    return document.location.href.indexOf("status=password-error") === -1;
  }
  shouldSignIn(): boolean {
    return this.areCredentialsValid() && document.location.href.indexOf("status=captcha") === -1 && document.location.href.indexOf("status=portalLogoff") === -1;
  }

  private storeCredentials() {
    const username = (document.getElementById("username") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;
    this.setCredentials(username, password);
  }
}

export class NewPortalAutoLogin extends BasePortalAutoLogin {
  submit(): void {
    (document.getElementsByClassName("success block")[0] as HTMLButtonElement).click();
  }

  onload(): void {
    const container = document.getElementsByClassName("help-container")[0];
    const el = document.createElement("a");
    el.className = "help";
    el.href = "#";
    el.textContent = "Remember Me";
    el.onclick = () => {
      this.storeCredentials();
      this.submit();

      return false;
    };

    container.appendChild(el);
  }

  areCredentialsValid() {
    return document.location.href.indexOf("status=error") === -1;
  }

  shouldSignIn() {
    return this.areCredentialsValid();
  }

  setDocumentCredentials(credentials: EncodedCredentials) {
    (document.getElementById("username") as HTMLInputElement).value = credentials.username;
    (document.getElementById("password") as HTMLInputElement).value = credentials.password;
  }

  private storeCredentials() {
    const username = (document.getElementById("username") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;
    this.setCredentials(username, password);
  }
}
