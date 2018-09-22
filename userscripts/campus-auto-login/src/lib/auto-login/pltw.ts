import { EncodedCredentials } from "../credentials";
import { AutoLogin } from "./auto-login";
import { KeyNames } from "../keys";
import { PageState } from "../page";
import { base64encode } from "../base64";
import { CONFIG } from "../config";

/// <reference path="../gm.ts" />

export class PLTWLogin implements AutoLogin {
  resetCredentials() {
    GM_deleteValue(KeyNames.PLTW_PASSWORD);
    GM_deleteValue(KeyNames.PLTW_USERNAME);
  }

  submit() {
    (document.querySelector("button[type=submit]") as HTMLButtonElement).click();
  }

  setDocumentCredentials(credentials: EncodedCredentials) {
    (document.getElementById("login_username") as HTMLInputElement).value = credentials.username;
    (document.getElementById("login_password") as HTMLInputElement).value = credentials.password;
  }

  private setCredentials(username: string, password: string) {
    GM_setValue(KeyNames.PLTW_USERNAME, base64encode(username));
    GM_setValue(KeyNames.PLTW_PASSWORD, base64encode(password));
  }

  storeCredentials() {
    const username = (document.getElementById("login_username") as HTMLInputElement).value;
    const password = (document.getElementById("login_password") as HTMLInputElement).value;
    this.setCredentials(username, password);
  }

  private isStudentLogin(): boolean {
    const el = document.getElementsByClassName("student-header")[0];
    if (el) {
      return (el as HTMLElement).style.display !== "none";
    } else {
      return false;
    }
  }

  private gotoStudentLogin() {
    document.getElementById("student-login")!.click();
  }

  onload() {
    if (this.isStudentLogin()) {
      const el = document.createElement("a");
      el.textContent = "Remember Me";
      el.href = "#";
      el.onclick = () => {
        this.storeCredentials();
        this.submit();
        return false;
      };
      document.querySelectorAll(".buttonRow")[1]!.appendChild(el);
    } else {
      if (CONFIG.SUPPORT_PLTW_AUTO_STUDENT) {
        this.gotoStudentLogin();
      } else {
        const el = document.createElement("div");
        el.style.cssText = "background-color: yellow; border-left: 10px solid orange; padding-left: 10px;";
        el.innerHTML = `
        <h2 style="margin-bottom: 0;">Did you mean to go to the student login?</h2>
        <p>Campus Auto Login can be <a href="https://garbomuffin.github.io/userscripts/campus-auto-login/config.html">configured</a> to do this automatically.</p>
        `;
        document.querySelector(".authCenter")!.insertAdjacentElement("afterbegin", el);
      }
    }
  }

  shouldSignIn() {
    return this.getState() === PageState.Normal;
  }

  getState() {
    return PageState.Normal;
  }

  getCredentials(): EncodedCredentials | null {
    const username = GM_getValue(KeyNames.PLTW_USERNAME, null) as string | null;
    const password = GM_getValue(KeyNames.PLTW_PASSWORD, null) as string | null;
    if (username === null || password === null) {
      return null;
    }
    return new EncodedCredentials(username, password);
  }
}
