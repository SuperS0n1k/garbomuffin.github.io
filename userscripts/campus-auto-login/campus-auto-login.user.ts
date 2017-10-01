"use strict";
/* === CAMPUS AUTO LOGIN v3.2 ===
 * NEW IN v3.2: BIM SUPPORT
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
// CONFIG
const SUPPORT_OLD_CAMPUS = true;
const SUPPORT_NEW_CAMPUS = true;
const SUPPORT_TCI = true;
const SUPPORT_BIM = true;
// when you just sign out of a site it won't click submit (on most sites), set this to true to always submit
const ALWAYS_SUBMIT = false;
// INTERNAL CONFIGS - DO NOT TOUCH
var KeyNames;
(function (KeyNames) {
    KeyNames["CAMPUS_USERNAME"] = "CAMPUS_USERNAME";
    KeyNames["CAMPUS_PASSWORD"] = "CAMPUS_PASSWORD";
    KeyNames["TCI_USERNAME"] = "TCI_USERNAME";
    KeyNames["TCI_PASSWORD"] = "TCI_PASSWORD";
    KeyNames["TCI_TEACHER"] = "TCI_TEACHER";
    KeyNames["BIM_USERNAME"] = "BIM_USERNAME";
    KeyNames["BIM_PASSWORD"] = "BIM_PASSWORD";
})(KeyNames || (KeyNames = {}));
var PageState;
(function (PageState) {
    PageState[PageState["Normal"] = 0] = "Normal";
    PageState[PageState["Error"] = 1] = "Error";
    PageState[PageState["Captcha"] = 2] = "Captcha";
})(PageState || (PageState = {}));
var PageType;
(function (PageType) {
    PageType[PageType["CampusNew"] = 0] = "CampusNew";
    PageType[PageType["CampusOld"] = 1] = "CampusOld";
    PageType[PageType["TCI"] = 2] = "TCI";
    PageType[PageType["BIM"] = 3] = "BIM";
})(PageType || (PageType = {}));
var LogSeverity;
(function (LogSeverity) {
    LogSeverity[LogSeverity["Info"] = 0] = "Info";
    LogSeverity[LogSeverity["Warn"] = 1] = "Warn";
    LogSeverity[LogSeverity["Err"] = 2] = "Err";
})(LogSeverity || (LogSeverity = {}));
// GLOBAL METHODS
function base64encode(string) {
    return btoa(string);
}
function base64decode(string) {
    return atob(string);
}
function getPageType() {
    if (location.href.indexOf("student.teachtci.com/student/sign_in") > -1) {
        return PageType.TCI;
    }
    else if (location.href.indexOf("campus.district112.org/campus/portal/isd112.jsp") > -1) {
        return PageType.CampusOld;
    }
    else if (location.href.indexOf("campus.district112.org/campus/portal/students/isd112") > -1) {
        return PageType.CampusNew;
    }
    else if (location.href.indexOf("bigideasmath.com/BIM/login") > -1) {
        return PageType.BIM;
    }
    else {
        return null;
    }
}
function log(msg, severity = LogSeverity.Info) {
    const LOG_PREFIX = "[Campus Auto Login]";
    if (severity === LogSeverity.Info) {
        console.info(LOG_PREFIX, msg);
    }
    else if (severity === LogSeverity.Warn) {
        console.warn(LOG_PREFIX, msg);
    }
    else if (severity === LogSeverity.Err) {
        console.error(LOG_PREFIX, msg);
    }
}
// IMPLEMENTING AUTO LOGIN
class EncodedCredentials {
    constructor(username, password) {
        this._username = username;
        this._password = password;
    }
    get username() {
        return base64decode(this._username);
    }
    ;
    get password() {
        return base64decode(this._password);
    }
    ;
}
class TCIEncodedCredentials extends EncodedCredentials {
    constructor(username, password, teacher) {
        super(username, password);
        this._teacher = teacher;
    }
    get teacher() {
        return base64decode(this._teacher);
    }
}
// PORTAL
class BasePortalAutoLogin {
    resetCredentials() {
        GM_deleteValue(KeyNames.CAMPUS_USERNAME);
        GM_deleteValue(KeyNames.CAMPUS_PASSWORD);
    }
    getCredentials() {
        const username = GM_getValue(KeyNames.CAMPUS_USERNAME, null);
        const password = GM_getValue(KeyNames.CAMPUS_PASSWORD, null);
        if (username === null || password === null) {
            return null;
        }
        return new EncodedCredentials(username, password);
    }
    setCredentials(username, password) {
        GM_setValue(KeyNames.CAMPUS_USERNAME, base64encode(username));
        GM_setValue(KeyNames.CAMPUS_PASSWORD, base64encode(password));
    }
    getState() {
        if (document.location.href.indexOf("status=captcha") > -1) {
            return PageState.Captcha;
        }
        else if (document.location.href.indexOf("error") > -1) {
            return PageState.Error;
        }
        else {
            return PageState.Normal;
        }
    }
}
class OldPortalAutoLogin extends BasePortalAutoLogin {
    submit() {
        document.getElementById("signinbtn").click();
    }
    onload() {
        const el = document.getElementsByClassName("forgotpasswd")[0];
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
    setDocumentCredentials(credentials) {
        document.getElementById("username").value = credentials.username;
        document.getElementById("password").value = credentials.password;
    }
    areCredentialsValid() {
        return document.location.href.indexOf("status=password-error") === -1;
    }
    shouldSignIn() {
        return this.areCredentialsValid() && document.location.href.indexOf("status=captcha") === -1 && document.location.href.indexOf("status=portalLogoff") === -1;
    }
    storeCredentials() {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        this.setCredentials(username, password);
    }
}
class NewPortalAutoLogin extends BasePortalAutoLogin {
    submit() {
        document.getElementsByClassName("success block")[0].click();
    }
    onload() {
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
    setDocumentCredentials(credentials) {
        document.getElementById("username").value = credentials.username;
        document.getElementById("password").value = credentials.password;
    }
    storeCredentials() {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        this.setCredentials(username, password);
    }
}
// TCI
class TCIAutoLogin {
    resetCredentials() {
        GM_deleteValue(KeyNames.TCI_USERNAME);
        GM_deleteValue(KeyNames.TCI_PASSWORD);
        GM_deleteValue(KeyNames.TCI_TEACHER);
    }
    submit() {
        document.querySelector("input[name=commit]").click();
    }
    setDocumentCredentials(credentials) {
        document.getElementById("student_username").value = credentials.username;
        document.getElementById("student_password").value = credentials.password;
        document.getElementById("student_teacher_email").value = credentials.teacher;
    }
    setCredentials(username, password, teacher) {
        GM_setValue(KeyNames.TCI_USERNAME, base64encode(username));
        GM_setValue(KeyNames.TCI_PASSWORD, base64encode(password));
        GM_setValue(KeyNames.TCI_TEACHER, base64encode(teacher));
    }
    storeCredentials() {
        const username = document.getElementById("student_username").value;
        const password = document.getElementById("student_password").value;
        const teacher = document.getElementById("student_teacher_email").value;
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
        };
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
        }
        else {
            return PageState.Normal;
        }
    }
    hasRecentlySignedOut() {
        const el = document.getElementById("flash");
        if (el && el.innerHTML.indexOf("Signed out successfully") > -1) {
            return true;
        }
        else {
            return false;
        }
    }
    getCredentials() {
        const username = GM_getValue(KeyNames.TCI_USERNAME, null);
        const password = GM_getValue(KeyNames.TCI_PASSWORD, null);
        const teacher = GM_getValue(KeyNames.TCI_TEACHER, null);
        if (username === null || password === null || teacher === null) {
            return null;
        }
        return new TCIEncodedCredentials(username, password, teacher);
    }
}
// BIM
class BIMAutoLogin {
    resetCredentials() {
        GM_deleteValue(KeyNames.BIM_USERNAME);
        GM_deleteValue(KeyNames.BIM_PASSWORD);
    }
    submit() {
        document.getElementById("loginSubmit").click();
    }
    setDocumentCredentials(credentials) {
        document.querySelector("input[name=username]").value = credentials.username;
        document.querySelector("input[name=password]").value = credentials.password;
    }
    setCredentials(username, password) {
        GM_setValue(KeyNames.BIM_USERNAME, base64encode(username));
        GM_setValue(KeyNames.BIM_PASSWORD, base64encode(password));
    }
    storeCredentials() {
        const username = document.querySelector("input[name=username]").value;
        const password = document.querySelector("input[name=password]").value;
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
        };
        var container = document.createElement("p");
        container.appendChild(el);
        document.getElementById("loginForm").appendChild(container);
    }
    shouldSignIn() {
        return this.getState() === PageState.Normal && !this.hasRecentlySignedOut();
    }
    getState() {
        if (location.href.indexOf("?error") > -1) {
            return PageState.Error;
        }
        else {
            return PageState.Normal;
        }
    }
    hasRecentlySignedOut() {
        return location.href.indexOf("?logout") > -1;
    }
    getCredentials() {
        const username = GM_getValue(KeyNames.BIM_USERNAME, null);
        const password = GM_getValue(KeyNames.BIM_PASSWORD, null);
        if (username === null || password === null) {
            return null;
        }
        return new EncodedCredentials(username, password);
    }
}
// ACTUALLY RUNNING THE THING
(function () {
    const pageType = getPageType();
    // unknown page type, don't do anything
    if (pageType === null) {
        return;
    }
    // remove keys from older versions
    GM_deleteValue("CALU"); // v3.0 username
    GM_deleteValue("CALP"); // v3.0 password
    var loginManager;
    switch (pageType) {
        case PageType.CampusOld:
            // remove old cookie based storage method from v1 campus-auto-login
            // just overwrite the cookies with things that expired a long time ago
            document.cookie = "cid=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
            document.cookie = "pid=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
            if (!SUPPORT_OLD_CAMPUS) {
                return;
            }
            loginManager = new OldPortalAutoLogin();
            break;
        case PageType.CampusNew:
            if (!SUPPORT_NEW_CAMPUS) {
                return;
            }
            loginManager = new NewPortalAutoLogin();
            break;
        case PageType.TCI:
            if (!SUPPORT_OLD_CAMPUS) {
                return;
            }
            loginManager = new OldPortalAutoLogin();
            break;
        case PageType.BIM:
            // remove old localstorage based storage method from my old bim-auto-login
            localStorage.removeItem("uid");
            localStorage.removeItem("pid");
            if (!SUPPORT_BIM) {
                return;
            }
            loginManager = new BIMAutoLogin();
            break;
        default:
            log("unknown state", LogSeverity.Warn);
            return;
    }
    loginManager.onload();
    const state = loginManager.getState();
    if (state !== PageState.Normal) {
        if (state === PageState.Captcha) {
            loginManager.resetCredentials();
            log("captcha", LogSeverity.Warn);
            alert("A captcha has been detected.\n\nYour credentials have been reset.\n\nPlease enter your credentials AND the captcha.");
        }
        else if (state === PageState.Error) {
            loginManager.resetCredentials();
            log("credential error", LogSeverity.Warn);
            alert("Credentials have been detected as incorrect.\n\nThey have been reset.");
        }
    }
    const credentials = loginManager.getCredentials();
    if (credentials === null) {
        // non set, don't do anything
    }
    else {
        loginManager.setDocumentCredentials(credentials);
        // if the user just signed out and we can detect that easily don't sign in again
        // might add some more conditions, but this works good for now
        if (ALWAYS_SUBMIT || loginManager.shouldSignIn()) {
            loginManager.submit();
        }
        else {
            log("skipping submit");
        }
    }
})();
// ==UserScript==
// @name         Campus Auto Login
// @version      3.2
// @description  Auto log-in to campus portal and other related sites including TCI and BIM.
// @author       GarboMuffin
// @match        https://campus.district112.org/campus/portal/isd112.jsp*
// @match        https://campus.district112.org/campus/portal/students/isd112.jsp*
// @match        https://student.teachtci.com/student/sign_in
// @match        https://www.bigideasmath.com/BIM/login*
// @namespace    https://garbomuffin.bitbucket.io/userscripts/campus-auto-login/
// @downloadURL  https://garbomuffin.bitbucket.io/userscripts/campus-auto-login/campus-auto-login.user.js
// @run-at       document-idle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// ==/UserScript==
