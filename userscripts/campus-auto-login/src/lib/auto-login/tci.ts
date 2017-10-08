import { EncodedCredentials } from "../credentials";
import { AutoLogin } from "./auto-login";
import { KeyNames } from "../keys";
import { PageState } from "../page";
import { base64encode, base64decode } from "../base64";

/// <reference path="../gm.ts" />

class TCIEncodedCredentials extends EncodedCredentials {
  constructor(username: string, password: string, teacher: string) {
    super(username, password);
    this._teacher = teacher;
  }

  private _teacher: string;
  get teacher() {
    return base64decode(this._teacher);
  }
}

export class TCIAutoLogin implements AutoLogin {
  resetCredentials() {
    GM_deleteValue(KeyNames.TCI_USERNAME);
    GM_deleteValue(KeyNames.TCI_PASSWORD);
    GM_deleteValue(KeyNames.TCI_TEACHER);
  }

  submit() {
    (document.querySelector("input[name=commit]") as HTMLLinkElement).click();
  }

  setDocumentCredentials(credentials: TCIEncodedCredentials) {
    (document.getElementById("student_username") as HTMLInputElement).value = credentials.username;
    (document.getElementById("student_password") as HTMLInputElement).value = credentials.password;
    (document.getElementById("student_teacher_email") as HTMLInputElement).value = credentials.teacher;
  }

  private setCredentials(username: string, password: string, teacher: string) {
    GM_setValue(KeyNames.TCI_USERNAME, base64encode(username));
    GM_setValue(KeyNames.TCI_PASSWORD, base64encode(password));
    GM_setValue(KeyNames.TCI_TEACHER, base64encode(teacher));
  }

  storeCredentials() {
    const username = (document.getElementById("student_username") as HTMLInputElement).value;
    const password = (document.getElementById("student_password") as HTMLInputElement).value;
    const teacher = (document.getElementById("student_teacher_email") as HTMLInputElement).value;
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
    }

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
    } else {
      return PageState.Normal;
    }
  }

  hasRecentlySignedOut() {
    const el = document.getElementById("flash");
    if (el && el.innerHTML.indexOf("Signed out successfully") > -1) {
      return true;
    } else {
      return false;
    }
  }

  getCredentials(): TCIEncodedCredentials | null {
    const username = GM_getValue(KeyNames.TCI_USERNAME, null) as string | null;
    const password = GM_getValue(KeyNames.TCI_PASSWORD, null) as string | null;
    const teacher = GM_getValue(KeyNames.TCI_TEACHER, null) as string | null;
    if (username === null || password === null || teacher === null) {
      return null;
    }
    return new TCIEncodedCredentials(username, password, teacher);
  }
}
