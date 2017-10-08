import { EncodedCredentials } from "../credentials";
import { PageState } from "../page";

export interface AutoLogin {
  // HANDLERS
  resetCredentials(): void;
  submit(): void;
  setDocumentCredentials(credentials: EncodedCredentials): void;

  onload(): void;

  // GETTERS
  // areCredentialsValid(): boolean;
  shouldSignIn(): boolean;
  getState(): PageState;
  getCredentials(): EncodedCredentials | null;
}

export class EmptyAutoLogin implements AutoLogin {
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
