"use strict";
/* === CAMPUS AUTO LOGIN v3.1 ===
 * Usage:
 * 1) Type your username/password or any other info into the usual text boxes.
 * 2) Find the "Remember Me" button.
 *    This can vary depending on the site, but its usually near the "Forgot Password" button.
 * 3) Click it.
 * 4) It will not automatically log in for all future visits.
 *    If at any point your credentials changed it will detect that and you will have to reset it.
 *
 * Supported sites:
 * TCI: https://student.teachtci.com/student/sign_in
 *  - Will not sign in if you recently signed out (by design)
 * Old Portal: https://campus.district112.org/campus/portal/isd112.jsp
 *  - Will not sign in if you recently signed out.
 *  - Credentials are shared between new and old portals.
 * New Portal: https://campus.district112.org/campus/portal/students/isd112.jsp
 *  - Credentials are shared between new and old portals.
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
////
// Below these lines is the raw source code.
// Do not change it if you do not know what you're doing, you could get your account locked out.
// Raw TypeScript: https://garbomuffin.bitbucket.io/userscripts/campus-auto-login/campus-auto-login.user.js
// Transpiled: https://garbomuffin.bitbucket.io/userscripts/campus-auto-login/campus-auto-login.user.js
////
// remove keys from older versions
GM_deleteValue("CALU"); // v3.0 username
GM_deleteValue("CALP"); // v3.0 password
// CONFIG
const SUPPORT_OLD_CAMPUS = true;
const SUPPORT_NEW_CAMPUS = true;
const SUPPORT_TCI = true;
// INTERNAL CONFIGS - DO NOT TOUCH
var KeyNames;
(function (KeyNames) {
    KeyNames["CAMPUS_USERNAME"] = "CAMPUS_USERNAME";
    KeyNames["CAMPUS_PASSWORD"] = "CAMPUS_PASSWORD";
    KeyNames["TCI_USERNAME"] = "TCI_USERNAME";
    KeyNames["TCI_PASSWORD"] = "TCI_PASSWORD";
    KeyNames["TCI_TEACHER"] = "TCI_TEACHER";
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
class Credentials {
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
class TCICredentials extends Credentials {
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
        return new Credentials(username, password);
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
        el.style.cursor = "pointer"; // tci does not give a elements a pointer so manually do it
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
        return new TCICredentials(username, password, teacher);
    }
}
// ACTUALLY RUNNING THE THING
(function () {
    const pageType = getPageType();
    // unknown page type, don't do anything
    if (pageType === null) {
        return;
    }
    var loginManager;
    if (pageType === PageType.CampusNew) {
        if (!SUPPORT_NEW_CAMPUS) {
            return;
        }
        loginManager = new NewPortalAutoLogin();
    }
    else if (pageType === PageType.CampusOld) {
        if (!SUPPORT_OLD_CAMPUS) {
            return;
        }
        loginManager = new OldPortalAutoLogin();
    }
    else if (pageType === PageType.TCI) {
        if (!SUPPORT_TCI) {
            return;
        }
        loginManager = new TCIAutoLogin();
    }
    else {
        return;
    }
    loginManager.onload();
    const state = loginManager.getState();
    if (state !== PageState.Normal) {
        if (state === PageState.Captcha) {
            loginManager.resetCredentials();
            log("CAPTCHA", LogSeverity.Warn);
            alert("A captcha has been detected.\n\nYour credentials have been reset.\n\nPlease enter your credentials AND the captcha.");
        }
        else if (state === PageState.Error) {
            loginManager.resetCredentials();
            log("ERROR", LogSeverity.Warn);
            alert("Credentials have been detected as incorrect.\n\nThey have been reset.");
        }
    }
    const credentials = loginManager.getCredentials();
    if (credentials === null) {
        // non set, don't do anything
    }
    else {
        loginManager.setDocumentCredentials(credentials);
        if (loginManager.shouldSignIn()) {
            loginManager.submit();
        }
    }
})();
// the metadata block is now down here because reasons
// ==UserScript==
// @name         Campus Auto Login
// @version      3.1
// @description  Auto log-in to campus portal and other related sites.
// @author       GarboMuffin
// @match        https://campus.district112.org/campus/portal/isd112.jsp*
// @match        https://campus.district112.org/campus/portal/students/isd112.jsp*
// @match        https://student.teachtci.com/student/sign_in
// @namespace    https://garbomuffin.bitbucket.io/userscripts/campus-auto-login/
// @downloadURL  https://garbomuffin.bitbucket.io/userscripts/campus-auto-login/campus-auto-login.user.js
// @run-at       document-idle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// ==/UserScript==
