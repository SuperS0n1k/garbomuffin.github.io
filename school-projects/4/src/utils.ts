import { ElementIDNotFoundError } from "./error/idnotfound";

export function getElement(id: string): HTMLElement {
  const el = document.getElementById(id);
  if (el === null) {
    throw new ElementIDNotFoundError(id);
  }
  return el;
}

export function sanitize(str: string): string {
  str = str.replace(/&/g, "&amp;");

  // several spaces in a row will look like several spaces
  str = str.replace(/ /g, "&nbsp;");

  // prevent xss
  str = str.replace(/>/g, "&gt;");
  str = str.replace(/</g, "&lt;");

  return str;
}
