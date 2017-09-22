// ==UserScript==
// @name         Campus Auto Login
// @version      3.0
// @description  Auto log-in to campus portal.
// @author       GarboMuffin
// @match        https://campus.district112.org/campus/portal/isd112.jsp*
// @match        https://campus.district112.org/campus/portal/students/isd112.jsp*
// @namespace    https://garbomuffin.bitbucket.io/userscripts/campus-auto-login/
// @downloadURL  https://garbomuffin.bitbucket.io/userscripts/campus-auto-login/campus-auto-login.user.js
// @run-at       document-idle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// ==/UserScript==

// This is the pre-transpiled TypeScript.
// You can find the transpiled TypeScript @ https://garbomuffin.bitbucket.io/userscripts/campus-auto-login/campus-auto-login.user.js

// Tampermonkey
type GM_Value = string | number | boolean;
declare function GM_getValue<T>(key: string, def?: T): GM_Value | T;
declare function GM_setValue(key: string, value: GM_Value): void;
declare function GM_deleteValue(key: string): void;

// CONFIG
const SUPPORT_OLD_CAMPUS = true;
const SUPPORT_NEW_CAMPUS = true;

// INTERNAL CONFIGS - DO NOT TOUCH
const INTERNAL_ID = "CAL";
const INTERNAL_UID = INTERNAL_ID + "U";
const INTERNAL_PID = INTERNAL_ID + "P";

enum PageState { Normal, Error, Captcha }

// GLOBAL METHODS

// base64 encode
function b64e(string: string) {
  return btoa(string);
}

// base64 decode
function b64d(string: string) {
  return atob(string);
}

// IMPLEMENTING AUTO LOGIN

class Credentials {
  constructor(username: string, password: string) {
    // NOTE: username and password are base64 encoded
    this._username = username;
    this._password = password;
  }

  private _username: string;
  private _password: string;
  get username() {
    return atob(this._username);
  };
  get password() {
    return atob(this._password);
  };
}

interface AutoLogin {
  // HANDLERS
  resetCredentials(): void;
  submit(): void;
  setDocumentCredentials(credentials: Credentials): void;

  onload(): void;

  // GETTERS
  // areCredentialsValid(): boolean;
  shouldSignIn(): boolean;
  getState(): PageState;
  getCredentials(): Credentials | null;
}

abstract class BaseAutoLogin implements AutoLogin {
  resetCredentials(): void {
    GM_deleteValue(INTERNAL_UID);
    GM_deleteValue(INTERNAL_PID);
  }

  getCredentials(): Credentials | null {
    const username = GM_getValue(INTERNAL_UID, null) as string | null;
    const password = GM_getValue(INTERNAL_PID, null) as string | null;
    if (username === null || password === null) {
      return null;
    }
    return new Credentials(username, password);
  }

  protected setCredentials(username: string, password: string): void {
    try {
      GM_setValue(INTERNAL_UID, b64e(username));
      GM_setValue(INTERNAL_PID, b64e(password));
    } catch (e) {
      alert("COULDN'T STORE CREDENTIALS, ABORTING");
      throw e;
    }
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
  abstract setDocumentCredentials(credentials: Credentials): void;
  abstract onload(): void;
  abstract areCredentialsValid(): boolean;
  abstract shouldSignIn(): boolean;
}

class OldPortalAutoLogin extends BaseAutoLogin {
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
  setDocumentCredentials(credentials: Credentials) {
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

class NewPortalAutoLogin extends BaseAutoLogin {
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

    container.insertAdjacentElement("beforeend", el);
  }

  areCredentialsValid() {
    return document.location.href.indexOf("status=error") === -1;
  }

  shouldSignIn() {
    return this.areCredentialsValid();
  }

  setDocumentCredentials(credentials: Credentials) {
    (document.getElementById("username") as HTMLInputElement).value = credentials.username;
    (document.getElementById("password") as HTMLInputElement).value = credentials.password;
  }

  private storeCredentials() {
    const username = (document.getElementById("username") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;
    this.setCredentials(username, password);
  }
}


// ACTUALLY RUNNING THE THING

(function () {
  const usingNewSite = location.href.indexOf("students") > -1;

  var loginManager: AutoLogin;
  if (usingNewSite) {
    loginManager = new NewPortalAutoLogin();
  } else {
    loginManager = new OldPortalAutoLogin();
  }

  loginManager.onload();

  const state = loginManager.getState();
  if (state !== PageState.Normal) {
    if (state === PageState.Captcha) {
      loginManager.resetCredentials();
      console.warn("CAPTCHA");
      alert("A captcha has been detected.\n\nYour credentials have been reset.\n\nPlease enter your credentials AND the captcha.");
    } else if (state === PageState.Error) {
      loginManager.resetCredentials();
      console.warn("ERROR");
      alert("Credentials have been detected as incorrect.\n\nThey have been reset.");
    }
  }

  const credentials: Credentials | null = loginManager.getCredentials();
  if (credentials === null) {
    // non set, don't do anything
  } else {
    loginManager.setDocumentCredentials(credentials);

    if (loginManager.shouldSignIn()) {
      loginManager.submit();
    }
  }
})();
