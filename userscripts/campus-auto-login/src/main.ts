import { CONFIG } from "./lib/header";

import { EncodedCredentials } from "./lib/credentials";
import { PageType, PageState, getPageType } from "./lib/page";
import { KeyNames } from "./lib/keys";
import { LogSeverity, log } from "./lib/log";

import { AutoLogin } from "./lib/auto-login/auto-login";
import * as Campus from "./lib/auto-login/campus";
import * as TCI from "./lib/auto-login/tci";
import * as BIM from "./lib/auto-login/bim";
import * as Empower from "./lib/auto-login/empower";
import * as Google from "./lib/auto-login/google";

(function () {
  log("loaded");

  const pageType = getPageType();

  var loginManager: AutoLogin | null = null;

  switch (pageType) {
    case PageType.CampusOld:
      if (!CONFIG.SUPPORT_OLD_CAMPUS) {
        return;
      }
      loginManager = new Campus.OldPortalAutoLogin();
      break;

    case PageType.CampusNew:
      if (!CONFIG.SUPPORT_NEW_CAMPUS) {
        return;
      }
      loginManager = new Campus.NewPortalAutoLogin();
      break;

    case PageType.TCI:
      if (!CONFIG.SUPPORT_OLD_CAMPUS) {
        return;
      }
      loginManager = new TCI.TCIAutoLogin();
      break;

    case PageType.BIM:
      if (!CONFIG.SUPPORT_BIM) {
        return;
      }
      loginManager = new BIM.BIMAutoLogin();
      break;

    case PageType.Empower:
      if (!CONFIG.SUPPORT_EMPOWER) {
        return;
      }
      loginManager = new Empower.EmpowerAutoLogin();
      break;

    case PageType.EmpowerLoggedIn:
      if (!CONFIG.EMPOWER.DRIVE_ACCESS) {
        return;
      }
      loginManager = new Empower.EmpowerLoggedInManager();
      break;

    case PageType.GoogleChooseAccount:
      if (CONFIG.EMPOWER.GOOGLE_USER === -1) {
        return;
      }
      loginManager = new Google.GoogleChooseAccountManager(CONFIG);
      break;

    case PageType.GoogleConsent:
      if (!CONFIG.EMPOWER.GOOGLE_CONSENT) {
        return;
      }
      loginManager = new Google.GoogleConsentManager();
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
    if (loginManager.shouldSignIn()) {
      loginManager.submit();
    } else {
      log("skipping submit");
    }
  }
})();

// ==UserScript==
// @name         Campus Auto Login
// @version      3.4
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
// @namespace    https://garbomuffin.bitbucket.io/userscripts/campus-auto-login/
// @downloadURL  https://garbomuffin.bitbucket.io/userscripts/campus-auto-login/campus-auto-login.user.js
// @run-at       document-idle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// ==/UserScript==
