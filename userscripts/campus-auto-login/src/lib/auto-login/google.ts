import { EncodedCredentials } from "../credentials";
import { AutoLogin, EmptyAutoLogin } from "./auto-login";
import { KeyNames } from "../keys";
import { PageState } from "../page";

/// <reference path="../gm.ts" />

interface GoogleAccountConfig {
  GOOGLE: {
    USER: number
  }
}
export class GoogleChooseAccountManager extends EmptyAutoLogin {
  constructor(options: GoogleAccountConfig) {
    super();
    this.user = options.GOOGLE.USER;
  }

  private user: number;

  onload() {
    const site = document.getElementsByClassName("uBOgn")[0].textContent;
    if (site === "Empower") {
      const users = document.getElementsByClassName("C5uAFc w6VTHd");
      const user = users[this.user];
      const button = user.getElementsByTagName("div")[0];
      button.click();
    }
  }
}

export class GoogleConsentManager extends EmptyAutoLogin {
  onload() {
    const site = document.getElementsByClassName("uBOgn")[0].textContent;
    if (site === "Empower") {
      const buttons = document.getElementsByClassName("RveJvd snByac");
      (buttons[1] as HTMLSpanElement).click()
    }
  }
}
