export enum LogSeverity { Info, Warn, Err }

export function log(msg: any, severity: LogSeverity = LogSeverity.Info) {
  const LOG_PREFIX = "[Campus Auto Login]";
  if (severity === LogSeverity.Info) {
    console.info(LOG_PREFIX, msg);
  } else if (severity === LogSeverity.Warn) {
    console.warn(LOG_PREFIX, msg);
  } else if (severity === LogSeverity.Err) {
    console.error(LOG_PREFIX, msg);
  }
}
