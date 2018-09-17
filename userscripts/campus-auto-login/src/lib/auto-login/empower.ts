import { EmptyAutoLogin } from "./auto-login";
import { log } from "../log";

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
