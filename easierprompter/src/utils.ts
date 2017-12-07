import { ElementIDNotFoundError } from "./error/idnotfound";

export function getElement(id: string): HTMLElement {
  const el = document.getElementById(id);
  if (el === null) {
    throw new ElementIDNotFoundError(id);
  }
  return el;
}
