// error is handled more gracefully by the engine
// than a regular error

export class ExitError extends Error {
  constructor() {
    super("Stopping game execution");
  }
}
