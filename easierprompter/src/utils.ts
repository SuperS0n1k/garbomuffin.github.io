import { ElementIDNotFoundError } from "./error/idnotfound";

// Returns an element with an ID or throws ElementIDNotFoundError if it doesn't exist
export function getElement(id: string): HTMLElement {
  const el = document.getElementById(id);
  if (el === null) {
    throw new ElementIDNotFoundError(id);
  }
  return el;
}

// Changes an element's visibility
export function setDisplay(el: HTMLElement, show: boolean) {
  el.style.display = show ? "block" : "none";
}

// Removes all children of an element
export function emptyElement(el: HTMLElement) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}
