/* === CAMPUS AUTO LOGIN v3.5 ===
 * NEW IN v3.5: added config page!, now editing the config is MUCH easier and saves between updates
 * https://garbomuffin.bitbucket.io/userscripts/campus-auto-login/config.html
 *
 * Supported sites:
 * Old Portal: https://campus.district112.org/campus/portal/isd112.jsp
 * New Portal: https://campus.district112.org/campus/portal/students/isd112.jsp
 * TCI: https://student.teachtci.com/student/sign_in
 * BIM: https://www.bigideasmath.com/BIM/login
 * Empower: https://empower.district112.org
 *
 * Config: https://garbomuffin.bitbucket.io/userscripts/campus-auto-login/config.html
 *
 * Usage depends on the site.
 * See the website for usage information.
 * https://garbomuffin.bitbucket.io/userscripts/campus-auto-login/#supported
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
// Don't touch anything below this line!
// Real source: https://bitbucket.org/GarboMuffin/garbomuffin.bitbucket.org/src/master/userscripts/campus-auto-login/src/
var DUMMY_VAR_TO_PUT_HEADER_AT_TOP_OF_FILE = "";

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
    PageType[PageType["Empower"] = 4] = "Empower";
    PageType[PageType["EmpowerLoggedIn"] = 5] = "EmpowerLoggedIn";
    PageType[PageType["GoogleChooseAccount"] = 6] = "GoogleChooseAccount";
    PageType[PageType["GoogleConsent"] = 7] = "GoogleConsent";
    PageType[PageType["Config"] = 8] = "Config";
})(PageType || (PageType = {}));
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
    else if (location.href.indexOf("empower.district112.org/default.aspx") > -1) {
        return PageType.Empower;
    }
    else if (location.href.indexOf("empower.district112.org/iFrame.aspx?iCtrl=PLAYLIST_WINDOW") > -1) {
        return PageType.EmpowerLoggedIn;
    }
    else if (location.href.indexOf("accounts.google.com/signin/oauth/consent") > -1) {
        return PageType.GoogleConsent;
    }
    else if (location.href.indexOf("accounts.google.com/signin/oauth/oauthchooseaccount") > -1) {
        return PageType.GoogleChooseAccount;
    }
    else if (location.href.indexOf("userscripts/campus-auto-login/config.html") > -1) {
        return PageType.Config;
    }
    else {
        return null;
    }
}

var LogSeverity;
(function (LogSeverity) {
    LogSeverity[LogSeverity["Info"] = 0] = "Info";
    LogSeverity[LogSeverity["Warn"] = 1] = "Warn";
    LogSeverity[LogSeverity["Err"] = 2] = "Err";
})(LogSeverity || (LogSeverity = {}));
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

function base64encode(string) {
    return btoa(string);
}
function base64decode(string) {
    return atob(string);
}

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

class TCIEncodedCredentials extends EncodedCredentials {
    constructor(username, password, teacher) {
        super(username, password);
        this._teacher = teacher;
    }
    get teacher() {
        return base64decode(this._teacher);
    }
}
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

class EmptyAutoLogin {
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
    getCredentials() {
        return null;
    }
}

const EMPOWER_CONSTS = {
    POPUP: "Please enable popups!\nSee: https://youtu.be/PdQLOfaAReQ",
};
function getPopups() {
    // temporary until i find a better way that doesn't involve actually testing it
    return true;
}
class EmpowerAutoLogin extends EmptyAutoLogin {
    onload() {
        if (getPopups()) {
            log("popups allowed");
            OpenGoogleLogin(); // global method in empower
        }
        else {
            log("popups blocked");
            alert(EMPOWER_CONSTS.POPUP);
        }
    }
}
class EmpowerLoggedInManager extends EmptyAutoLogin {
    onload() {
        if (getPopups()) {
            log("popups allowed");
            driveAPIObjectLocker._OpenLogin = driveAPIObjectLocker.OpenLogin;
            driveAPIObjectLocker.OpenLogin = function () {
                this._OpenLogin();
                document.getElementsByClassName("googleLoginModalLoginLink")[0].click();
            };
            window._alert = alert;
        }
        else {
            log("popups blocked");
            alert(EMPOWER_CONSTS.POPUP);
        }
    }
}

class GoogleChooseAccountManager extends EmptyAutoLogin {
    constructor(options) {
        super();
        this.user = options.EMPOWER.GOOGLE_USER;
    }
    onload() {
        const site = document.getElementsByClassName("uBOgn")[0].textContent;
        if (site === "district112.org") {
            const users = document.getElementsByClassName("C5uAFc w6VTHd");
            const user = users[this.user];
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
            buttons[1].click();
        }
    }
}

class ConfigManager extends EmptyAutoLogin {
    onload() {
        document.getElementById("install").style.display = "none";
        GM_config.open();
    }
}
GM_config.init({
    id: "CampusAutoLoginConfig",
    title: "Campus Auto Login Config (beta)",
    fields: {
        OldPortalSupport: {
            label: "Support old portal",
            type: "checkbox",
            title: "Should it run on the old portal?",
            section: "Site Support",
            default: true,
        },
        NewPortalSupport: {
            label: "Support new portal",
            type: "checkbox",
            title: "Should it run on the new portal?",
            default: true,
        },
        BIMSupport: {
            label: "Support BIM",
            type: "checkbox",
            title: "Should it run on BIM?",
            default: true,
        },
        TCISupport: {
            label: "Support TCI",
            type: "checkbox",
            title: "Should it run on TCI?",
            default: true,
        },
        EmpowerSupport: {
            label: "Support Empower",
            type: "checkbox",
            title: "Should it run on Empower?",
            default: true,
        },
        EmpowerDrivePopup: {
            label: "Automatically open Empower Google Drive popups",
            type: "checkbox",
            title: "Should it automatically click on buttons from empower requesting drive acess. Actually granting that is covered later.",
            section: "Empower",
            default: true,
        },
        GoogleUser: {
            label: "(only for people with multiple google accounts) Which spot are you in in your Google user list? This can click that for you. -1 to disable. The first user is 0, second is 1, third is 2 etc. https://i.imgur.com/tqafElG.png",
            type: "int",
            title: "Should it automatically click on buttons from empower requesting drive acess. Actually granting that is covered later.",
            section: "Google",
            default: -1,
        },
        GoogleGrantPermissions: {
            label: "Grant Google permissions to empower",
            type: "checkbox",
            title: "Should it automatically click on buttons from Google to give Empower drive permissions.",
            default: true,
        }
    },
});
var foundMissing = false;
const CONFIG$1 = {
    SUPPORT_OLD_CAMPUS: getOrDefault("OldPortalSupport", true),
    SUPPORT_NEW_CAMPUS: getOrDefault("NewPortalSupport", true),
    SUPPORT_TCI: getOrDefault("TCISupport", true),
    SUPPORT_BIM: getOrDefault("BIMSupport", true),
    SUPPORT_EMPOWER: getOrDefault("EmpowerSupport", true),
    EMPOWER: {
        DRIVE_ACCESS: getOrDefault("EmpowerDrivePopup", true),
        GOOGLE_USER: getOrDefault("GoogleUser", -1),
        GOOGLE_CONSENT: getOrDefault("GoogleGrantPermissions", true),
    }
};
function getOrDefault(key, def) {
    const val = GM_config.get(key);
    if (typeof val !== "undefined") {
        return val;
    }
    else {
        GM_config.set(key, def);
        foundMissing = true;
        return def;
    }
}
if (foundMissing) {
    GM_config.save();
}

DUMMY_VAR_TO_PUT_HEADER_AT_TOP_OF_FILE.toString();
const CONFIG = CONFIG$1;
(function () {
    log("loaded");
    const pageType = getPageType();
    var loginManager = null;
    switch (pageType) {
        case PageType.CampusOld:
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
            if (!CONFIG.SUPPORT_TCI) {
                return;
            }
            loginManager = new TCIAutoLogin();
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
            if (!CONFIG.EMPOWER.DRIVE_ACCESS) {
                return;
            }
            loginManager = new EmpowerLoggedInManager();
            break;
        case PageType.GoogleChooseAccount:
            if (CONFIG.EMPOWER.GOOGLE_USER === -1) {
                return;
            }
            loginManager = new GoogleChooseAccountManager(CONFIG);
            break;
        case PageType.GoogleConsent:
            if (!CONFIG.EMPOWER.GOOGLE_CONSENT) {
                return;
            }
            loginManager = new GoogleConsentManager();
            break;
        case PageType.Config:
            loginManager = new ConfigManager();
            break;
        default:
            log("unknown state", LogSeverity.Warn);
    }
    if (loginManager === null) {
        return;
    }
    loginManager.onload();
    const state = loginManager.getState();
    if (state !== PageState.Normal) {
        loginManager.resetCredentials();
        if (state === PageState.Captcha) {
            log("captcha", LogSeverity.Warn);
            alert("A captcha has been detected.\n\nYour credentials have been reset.\n\nPlease enter your credentials AND the captcha.");
        }
        else if (state === PageState.Error) {
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
        if (loginManager.shouldSignIn()) {
            loginManager.submit();
        }
        else {
            log("skipping submit");
        }
    }
})();
// ==UserScript==
// @name         Campus Auto Login
// @version      3.5.1
// @description  Auto log-in to campus portal and other related sites including TCI, BIM, Empower, and even Google (requires config)!
// @author       GarboMuffin
// @match        https://campus.district112.org/campus/portal/isd112.jsp*
// @match        https://campus.district112.org/campus/portal/students/isd112.jsp*
// @match        https://student.teachtci.com/student/sign_in
// @match        https://www.bigideasmath.com/BIM/login*
// @match        https://empower.district112.org/default.aspx*
// @match        https://empower.district112.org/iFrame.aspx?iCtrl=PLAYLIST_WINDOW*
// @match        https://accounts.google.com/signin/oauth?*
// @match        https://accounts.google.com/signin/oauth/consent?*
// @match        https://garbomuffin.github.io/userscripts/campus-auto-login/config.html
// @namespace    https://garbomuffin.github.io/userscripts/campus-auto-login/
// @downloadURL  https://garbomuffin.github.io/userscripts/campus-auto-login/campus-auto-login.user.js
// @run-at       document-idle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @require      https://openuserjs.org/src/libs/sizzle/GM_config.js
// ==/UserScript==
