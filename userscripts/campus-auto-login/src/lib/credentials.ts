import { base64encode, base64decode } from "./base64";

export class EncodedCredentials {
  constructor(username: string, password: string) {
    this._username = username;
    this._password = password;
  }

  private _username: string;
  private _password: string;
  get username() {
    return base64decode(this._username);
  };
  get password() {
    return base64decode(this._password);
  };
}
