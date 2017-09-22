"use strict";
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

// This is the transpiled TypeScript.
// You can find the source TypeScript @ https://garbomuffin.bitbucket.io/userscripts/campus-auto-login/campus-auto-login.user.ts

// CONFIG
const SUPPORT_OLD_CAMPUS = true;
const SUPPORT_NEW_CAMPUS = true;
// INTERNAL CONFIGS - DO NOT TOUCH
const INTERNAL_ID = "CAL";
const INTERNAL_UID = INTERNAL_ID + "U";
const INTERNAL_PID = INTERNAL_ID + "P";
var PageState;
(function (PageState) {
    PageState[PageState["Normal"] = 0] = "Normal";
    PageState[PageState["Error"] = 1] = "Error";
    PageState[PageState["Captcha"] = 2] = "Captcha";
})(PageState || (PageState = {}));
// GLOBAL METHODS
// base64 encode
function b64e(string) {
    return btoa(string);
}
// base64 decode
function b64d(string) {
    return atob(string);
}
// IMPLEMENTING AUTO LOGIN
class Credentials {
    constructor(username, password) {
        // NOTE: username and password are base64 encoded
        this._username = username;
        this._password = password;
    }
    get username() {
        return atob(this._username);
    }
    ;
    get password() {
        return atob(this._password);
    }
    ;
}
class BaseAutoLogin {
    resetCredentials() {
        GM_deleteValue(INTERNAL_UID);
        GM_deleteValue(INTERNAL_PID);
    }
    getCredentials() {
        const username = GM_getValue(INTERNAL_UID, null);
        const password = GM_getValue(INTERNAL_PID, null);
        if (username === null || password === null) {
            return null;
        }
        return new Credentials(username, password);
    }
    setCredentials(username, password) {
        try {
            GM_setValue(INTERNAL_UID, b64e(username));
            GM_setValue(INTERNAL_PID, b64e(password));
        }
        catch (e) {
            alert("COULDN'T STORE CREDENTIALS, ABORTING");
            throw e;
        }
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
class OldPortalAutoLogin extends BaseAutoLogin {
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
class NewPortalAutoLogin extends BaseAutoLogin {
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
        container.insertAdjacentElement("beforeend", el);
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
// ACTUALLY RUNNING THE THING
(function () {
    const usingNewSite = location.href.indexOf("students") > -1;
    var loginManager;
    if (usingNewSite) {
        loginManager = new NewPortalAutoLogin();
    }
    else {
        loginManager = new OldPortalAutoLogin();
    }
    loginManager.onload();
    const state = loginManager.getState();
    if (state !== PageState.Normal) {
        if (state === PageState.Captcha) {
            loginManager.resetCredentials();
            console.warn("CAPTCHA");
            alert("A captcha has been detected.\n\nYour credentials have been reset.\n\nPlease enter your credentials AND the captcha.");
        }
        else if (state === PageState.Error) {
            loginManager.resetCredentials();
            console.warn("ERROR");
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
