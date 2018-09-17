import { EmptyAutoLogin } from "./auto-login";

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
    const el = document.querySelector("#headingSubtext > content:nth-child(1) > a:nth-child(1)");
    const site = el && el.textContent;
    if (site === "Empower") {
      const users = document.getElementsByClassName("M8HEDc cd29Sd bxPAYd W7Aapd znIWoc");
      const user = users[this.user];
      const button = user.getElementsByTagName("div")[0];
      window.addEventListener("load", () => {
        const interval = setInterval(() => {
          if (location.href.indexOf("oauthchooseaccount") > -1) {
            clearInterval(interval);
            button.click();
          }
        }, 50);
      })
    }
  }
}

export class GoogleConsentManager extends EmptyAutoLogin {
  onload() {
    const developer = document.getElementById("developer_info_glif");
    const site = developer && developer.textContent;
    if (site === "Empower") {
      const buttons = document.getElementsByClassName("RveJvd snByac");
      window.addEventListener("load", () => {
        (buttons[0] as HTMLSpanElement).click();
      });
    }
  }
}
