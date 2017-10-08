import { EncodedCredentials } from "../credentials";
import { AutoLogin, EmptyAutoLogin } from "./auto-login";
import { KeyNames } from "../keys";
import { PageState } from "../page";
import { base64encode } from "../base64";
import { log, LogSeverity } from "../log";

/// <reference path="../gm.ts" />

const EMPOWER_CONSTS = {
  POPUP: "Please enable popups!\nSee: https://youtu.be/PdQLOfaAReQ",
}

function getPopups() {
  // temporary until i find a better way that doesn't involve actually testing it
  return true;
}

declare function OpenGoogleLogin(): void;
export class EmpowerAutoLogin extends EmptyAutoLogin {
  onload() {
    if (getPopups()) {
      log("popups allowed");
      OpenGoogleLogin(); // global method in empower
    } else {
      log("popups blocked");
      alert(EMPOWER_CONSTS.POPUP);
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
declare var driveAPIObjectLocker: EmpowerDriveLockerAPI;

export class EmpowerLoggedInManager extends EmptyAutoLogin {
  onload() {
    if (getPopups()) {
      log("popups allowed");

      driveAPIObjectLocker._OpenLogin = driveAPIObjectLocker.OpenLogin;
      driveAPIObjectLocker.OpenLogin = function () {
        this._OpenLogin();
        (document.getElementsByClassName("googleLoginModalLoginLink")[0] as HTMLLinkElement).click();
      };

      (window as any)._alert = alert;

    } else {
      log("popups blocked");
      alert(EMPOWER_CONSTS.POPUP);
    }
  }
}
