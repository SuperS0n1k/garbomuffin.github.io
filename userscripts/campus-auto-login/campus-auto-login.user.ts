/* === CAMPUS AUTO LOGIN v3.3 ===
 * NEW IN v3.3: EMPOWER SUPPORT, read the changelog on the site!
 * 
 * Usage:
 * 1) Type your username/password or any other info into the usual text boxes.
 * 2) Find the "Remember Me" button.
 *    This can vary depending on the site, but its usually near the "Forgot Password" button.
 * 3) Click it.
 * 4) It will not automatically log in for all future visits.
 *    If at any point your credentials changed it will detect that and you will have to reset it.
 * 
 * Supported sites:
 * Old Portal: https://campus.district112.org/campus/portal/isd112.jsp
 *  - Credentials are shared between new and old portals.
 * New Portal: https://campus.district112.org/campus/portal/students/isd112.jsp
 *  - Credentials are shared between new and old portals.
 * TCI: https://student.teachtci.com/student/sign_in
 * BIM: https://www.bigideasmath.com/BIM/login
 * 
 * Empower support is PLANNED.
 */

/*
Copyright (c) 2017 GarboMuffin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

// Here is the config. You can change true to false to enable/disable things.
// I'll add more documentation soon.
const CONFIG = {
  SUPPORT_OLD_CAMPUS: true,
  SUPPORT_NEW_CAMPUS: true,

  SUPPORT_TCI: true,

  SUPPORT_BIM: true,

  SUPPORT_EMPOWER: true,
  EMPOWER: {
    DRIVE_ACCESS: true,
    GOOGLE_USER: -1,
    GOOGLE_CONSENT: true,
    // ASSUME_POPUPS: false,
  },

  ALWAYS_SUBMIT: true,
};

////
// Below these lines is the raw source code.
// Do not change it if you do not know what you're doing, you could get your account locked out.
// Source TypeScript: https://garbomuffin.bitbucket.io/userscripts/campus-auto-login/campus-auto-login.user.js
// TSC Output: https://garbomuffin.bitbucket.io/userscripts/campus-auto-login/campus-auto-login.user.js
////

type GM_Value = string | number | boolean;
declare function GM_getValue<T>(key: string, def?: T): GM_Value | T;
declare function GM_setValue(key: string, value: GM_Value): void;
declare function GM_deleteValue(key: string): void;
declare function GM_addStyle(css: string): void;

// INTERNAL CONFIGS - DO NOT TOUCH
enum KeyNames {
  CAMPUS_USERNAME = "CAMPUS_USERNAME",
  CAMPUS_PASSWORD = "CAMPUS_PASSWORD",
  TCI_USERNAME = "TCI_USERNAME",
  TCI_PASSWORD = "TCI_PASSWORD",
  TCI_TEACHER = "TCI_TEACHER",
  BIM_USERNAME = "BIM_USERNAME",
  BIM_PASSWORD = "BIM_PASSWORD",
}
enum PageState { Normal, Error, Captcha }
enum PageType {
  CampusNew,
  CampusOld,
  TCI,
  BIM,
  Empower,
  EmpowerLoggedIn,
  GoogleChooseAccount,
  GoogleConsent,
}
enum LogSeverity { Info, Warn, Err }

// GLOBAL METHODS

function base64encode(string: string) {
  return btoa(string);
}

function base64decode(string: string) {
  return atob(string);
}

function getPageType(): PageType | null {
  if (location.href.indexOf("student.teachtci.com/student/sign_in") > -1) {
    return PageType.TCI;
  } else if (location.href.indexOf("campus.district112.org/campus/portal/isd112.jsp") > -1) {
    return PageType.CampusOld;
  } else if (location.href.indexOf("campus.district112.org/campus/portal/students/isd112") > -1) {
    return PageType.CampusNew;
  } else if (location.href.indexOf("bigideasmath.com/BIM/login") > -1) {
    return PageType.BIM;
  } else if (location.href.indexOf("empower.district112.org/default.aspx") > -1) {
    return PageType.Empower;
  } else if (location.href.indexOf("empower.district112.org/iFrame.aspx?iCtrl=PLAYLIST_WINDOW") > -1) {
    return PageType.EmpowerLoggedIn;
  } else if (location.href.indexOf("accounts.google.com/signin/oauth/consent") > -1) {
    return PageType.GoogleConsent;
  } else if (location.href.indexOf("accounts.google.com/signin/oauth/oauthchooseaccount") > -1) {
    return PageType.GoogleChooseAccount;
  } else {
    return null;
  }
}

function log(msg: any, severity: LogSeverity = LogSeverity.Info) {
  const LOG_PREFIX = "[Campus Auto Login]";
  if (severity === LogSeverity.Info) {
    console.info(LOG_PREFIX, msg);
  } else if (severity === LogSeverity.Warn) {
    console.warn(LOG_PREFIX, msg);
  } else if (severity === LogSeverity.Err) {
    console.error(LOG_PREFIX, msg);
  }
}

function arePopupsEnabled() {
  // TODO: better way of testing for popups
  // this method here has the problem of causing annoying popups

  // we just ask the user to enable popups.

  return true;

  // if (CONFIG.EMPOWER.ASSUME_POPUPS) {
  //   return true;
  // }

  // const w = window.open("");
  // if (w) {
  //   w.close();
  //   return true;
  // } else {
  //   return false;
  // }
}

// IMPLEMENTING AUTO LOGIN

class EncodedCredentials {
  constructor(username: string, password: string) {
    this._username = username;
    this._password = password;
  }

  private _username: string;
  private _password: string;
  get username() {
    return base64decode(this._username);
  };
  get password() {
    return base64decode(this._password);
  };
}

class TCIEncodedCredentials extends EncodedCredentials {
  constructor(username: string, password: string, teacher: string) {
    super(username, password);
    this._teacher = teacher;
  }

  private _teacher: string;
  get teacher() {
    return base64decode(this._teacher);
  }
}

interface AutoLogin {
  // HANDLERS
  resetCredentials(): void;
  submit(): void;
  setDocumentCredentials(credentials: EncodedCredentials): void;

  onload(): void;

  // GETTERS
  // areCredentialsValid(): boolean;
  shouldSignIn(): boolean;
  getState(): PageState;
  getCredentials(): EncodedCredentials | null;
}

class EmptyAutoLogin implements AutoLogin {
  resetCredentials() {
    // do nothing
  }

  submit() {
    // do nothing
  }

  setDocumentCredentials() {
    // do nothing
  }

  storeCredentials() {
    // do nothing
  }

  onload() {
    // do nothing
  }

  shouldSignIn() {
    return false;
  }

  getState() {
    return PageState.Normal;
  }

  getCredentials(): null {
    return null;
  }

}

// PORTAL
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

class OldPortalAutoLogin extends BasePortalAutoLogin {
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

class NewPortalAutoLogin extends BasePortalAutoLogin {
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

// TCI
class TCIAutoLogin implements AutoLogin {
  resetCredentials() {
    GM_deleteValue(KeyNames.TCI_USERNAME);
    GM_deleteValue(KeyNames.TCI_PASSWORD);
    GM_deleteValue(KeyNames.TCI_TEACHER);
  }

  submit() {
    (document.querySelector("input[name=commit]") as HTMLLinkElement).click();
  }

  setDocumentCredentials(credentials: TCIEncodedCredentials) {
    (document.getElementById("student_username") as HTMLInputElement).value = credentials.username;
    (document.getElementById("student_password") as HTMLInputElement).value = credentials.password;
    (document.getElementById("student_teacher_email") as HTMLInputElement).value = credentials.teacher;
  }

  private setCredentials(username: string, password: string, teacher: string) {
    GM_setValue(KeyNames.TCI_USERNAME, base64encode(username));
    GM_setValue(KeyNames.TCI_PASSWORD, base64encode(password));
    GM_setValue(KeyNames.TCI_TEACHER, base64encode(teacher));
  }

  storeCredentials() {
    const username = (document.getElementById("student_username") as HTMLInputElement).value;
    const password = (document.getElementById("student_password") as HTMLInputElement).value;
    const teacher = (document.getElementById("student_teacher_email") as HTMLInputElement).value;
    this.setCredentials(username, password, teacher);
  }

  onload() {
    var el = document.createElement("a");
    el.textContent = "Remember Me";
    el.href = "#";
    el.onclick = () => {
      this.storeCredentials();
      this.submit();

      return false;
    }

    var container = document.createElement("p");
    container.appendChild(el);

    document.getElementsByClassName("pos_fl")[0].appendChild(container);
  }

  shouldSignIn() {
    return this.getState() === PageState.Normal && !this.hasRecentlySignedOut();
  }

  getState() {
    const el = document.getElementById("flash");
    if (el && el.innerHTML.indexOf("Incorrect username or password") > -1) {
      return PageState.Error;
    } else {
      return PageState.Normal;
    }
  }

  hasRecentlySignedOut() {
    const el = document.getElementById("flash");
    if (el && el.innerHTML.indexOf("Signed out successfully") > -1) {
      return true;
    } else {
      return false;
    }
  }

  getCredentials(): TCIEncodedCredentials | null {
    const username = GM_getValue(KeyNames.TCI_USERNAME, null) as string | null;
    const password = GM_getValue(KeyNames.TCI_PASSWORD, null) as string | null;
    const teacher = GM_getValue(KeyNames.TCI_TEACHER, null) as string | null;
    if (username === null || password === null || teacher === null) {
      return null;
    }
    return new TCIEncodedCredentials(username, password, teacher);
  }
}

// BIM
class BIMAutoLogin implements AutoLogin {
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

// EMPOWER, oh dear god this is a mess
// because empower is a special snowflake none of the normal methods do anything
// its all in onload

class EmpowerConsts {
  static POPUP: string = `YOU NEED TO ALLOW POPUPS.\n\nSee: https://youtu.be/PdQLOfaAReQ\n\n(copy+paste the link)`;
}

declare function OpenGoogleLogin(): void;
class EmpowerAutoLogin extends EmptyAutoLogin {
  onload() {
    if (arePopupsEnabled()) {
      log("popups allowed");
      OpenGoogleLogin(); // global method in empower
    } else {
      log("popups blocked");
      alert(EmpowerConsts.POPUP);
    }
  }
}

// when logged into empower there's some stuff we can do
interface EmpowerDriveLockerAPI {
  OpenLogin(): void;
  _OpenLogin(): void; // something we create
  LoadDriveItems(): void;

  // make typescript stop complaining about proxies
  [s: string]: any;
}
declare let driveAPIObjectLocker: EmpowerDriveLockerAPI;

class EmpowerLoggedInManager extends EmptyAutoLogin {
  onload() {
    if (!CONFIG.EMPOWER.DRIVE_ACCESS) {
      return;
    }

    if (arePopupsEnabled()) {
      log("popups allowed");

      driveAPIObjectLocker._OpenLogin = driveAPIObjectLocker.OpenLogin;
      driveAPIObjectLocker.OpenLogin = function () {
        this._OpenLogin();
        (document.getElementsByClassName("googleLoginModalLoginLink")[0] as HTMLLinkElement).click();
      };

      (window as any)._alert = alert;

    } else {
      log("popups blocked");
      alert(EmpowerConsts.POPUP);
    }
  }
}

class GoogleChooseAccountManager extends EmptyAutoLogin {
  onload() {
    const site = document.getElementsByClassName("uBOgn")[0].textContent;
    if (site === "district112.org") {
      const users = document.getElementsByClassName("C5uAFc w6VTHd");
      const user = users[CONFIG.EMPOWER.GOOGLE_USER];
      const button = user.getElementsByTagName("div")[0];
      button.click();
    }
  }
}

class GoogleConsentManager extends EmptyAutoLogin {
  onload() {
    const site = document.getElementsByClassName("uBOgn")[0].textContent;
    if (site === "district112.org") {
      const buttons = document.getElementsByClassName("RveJvd snByac");
      (buttons[1] as HTMLSpanElement).click()
    }
  }
}

// ACTUALLY RUNNING THE THING
(function () {
  log("loaded");

  const pageType = getPageType();

  var loginManager: AutoLogin;
  switch (pageType) {
    case PageType.CampusOld:
      // remove old cookie based storage method from v1 campus-auto-login
      // just overwrite the cookies with things that expired a long time ago
      document.cookie = "cid=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      document.cookie = "pid=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

      if (!CONFIG.SUPPORT_OLD_CAMPUS) {
        return;
      }
      loginManager = new OldPortalAutoLogin();
      break;

    case PageType.CampusNew:
      if (!CONFIG.SUPPORT_NEW_CAMPUS) {
        return;
      }
      loginManager = new NewPortalAutoLogin();
      break;

    case PageType.TCI:
      if (!CONFIG.SUPPORT_OLD_CAMPUS) {
        return;
      }
      loginManager = new OldPortalAutoLogin();
      break;

    case PageType.BIM:
      if (!CONFIG.SUPPORT_BIM) {
        return;
      }
      loginManager = new BIMAutoLogin();
      break;

    case PageType.Empower:
      if (!CONFIG.SUPPORT_EMPOWER) {
        return;
      }
      loginManager = new EmpowerAutoLogin();
      break;


    case PageType.EmpowerLoggedIn:
      if (!CONFIG.SUPPORT_EMPOWER) {
        return;
      }
      loginManager = new EmpowerLoggedInManager();
      break;

    case PageType.GoogleChooseAccount:
      if (CONFIG.EMPOWER.GOOGLE_USER === -1) {
        return;
      }
      loginManager = new GoogleChooseAccountManager();
      break;

    case PageType.GoogleConsent:
      if (!CONFIG.EMPOWER.GOOGLE_CONSENT) {
        return;
      }
      loginManager = new GoogleConsentManager();
      break;

    default:
      log("unknown state", LogSeverity.Warn);
      return;
  }

  loginManager.onload();

  const state = loginManager.getState();
  if (state !== PageState.Normal) {
    loginManager.resetCredentials();
    if (state === PageState.Captcha) {
      log("captcha", LogSeverity.Warn);
      alert("A captcha has been detected.\n\nYour credentials have been reset.\n\nPlease enter your credentials AND the captcha.");
    } else if (state === PageState.Error) {
      log("credential error", LogSeverity.Warn);
      alert("Credentials have been detected as incorrect.\n\nThey have been reset.");
    }
  }

  const credentials: EncodedCredentials | null = loginManager.getCredentials();
  if (credentials === null) {
    // non set, don't do anything
  } else {
    loginManager.setDocumentCredentials(credentials);

    // if the user just signed out and we can detect that easily don't sign in again
    // might add some more conditions, but this works good for now
    if (CONFIG.ALWAYS_SUBMIT || loginManager.shouldSignIn()) {
      loginManager.submit();
    } else {
      log("skipping submit");
    }
  }
})();

// ==UserScript==
// @name         Campus Auto Login
// @version      3.3
// @description  Auto log-in to campus portal and other related sites including TCI and BIM.
// @author       GarboMuffin
// @match        https://campus.district112.org/campus/portal/isd112.jsp*
// @match        https://campus.district112.org/campus/portal/students/isd112.jsp*
// @match        https://student.teachtci.com/student/sign_in
// @match        https://www.bigideasmath.com/BIM/login*
// @match        https://empower.district112.org/default.aspx*
// @match        https://empower.district112.org/iFrame.aspx?iCtrl=PLAYLIST_WINDOW*
// @match        https://accounts.google.com/signin/oauth?*
// @match        https://accounts.google.com/signin/oauth/consent?*
// @namespace    https://garbomuffin.bitbucket.io/userscripts/campus-auto-login/
// @downloadURL  https://garbomuffin.bitbucket.io/userscripts/campus-auto-login/campus-auto-login.user.js
// @run-at       document-idle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// ==/UserScript==
