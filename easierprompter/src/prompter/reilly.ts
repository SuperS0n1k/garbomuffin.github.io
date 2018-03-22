import { TameReillyPrompter } from "./tamereilly";

function comma(input: string) {
  const s = input.split(" ");
  const length = s.length;
  let res = "";
  for (let i = 0; i < length; i++) {
    const text = s[i];
    const progress = i / length;
    res += text;
    if (Math.random() < progress / 10 && /(?:\w|\d)$/.test(text)) {
      res += ", ";
    } else {
      res += " ";
    }
  }
  return res;
}

function replaceName(input: string) {
  const NAMES = ["Riley", "Reily", "Rilly"];
  const s = input.split("Reilly");
  const length = s.length;
  let res = "";
  for (let i = 0; i < length; i++) {
    const text = s[i];
    const progress = i / length;
    res += text;
    if (Math.random() < progress / 10) {
      res += NAMES[Math.floor(Math.random())];
    } else {
      res += "Reilly";
    }
  }
  return res;
}

export class ReillyPrompter extends TameReillyPrompter {
  protected getScript() {
    let input = super.getScript();
    input = comma(input);
    input = replaceName(input);
    return input;
  }
}
