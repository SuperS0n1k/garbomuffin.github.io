import { Prompter } from "./prompter";

const QUOTES = [
  /„/ig,
  /‚/ig,
  /“/ig,
  /‟/ig,
  /‘/ig,
  /‛/ig,
  /”/ig,
  /’/ig,
  /\"/ig,
  /❛/ig,
  /❜/ig,
  /❟/ig,
  /❝/ig,
  /❞/ig,
  /⹂/ig,
  /〝/ig,
  /〞/ig,
  /〟/ig,
  /＂/ig,
];

function unquote(input: string) {
  for (const c of QUOTES) {
    input = input.replace(c, "");
  }
  return input;
}

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

function replacePeriods(input: string) {
  const REPLACEMENTS = ["!", "?", "."];
  const s = input.split(/!|\?|\./ig);
  const length = s.length - 1;
  let res = "";
  for (let i = 0; i < length; i++) {
    const text = s[i];
    const progress = i / length;
    res += text;
    if (Math.random() < progress / 10) {
      res += REPLACEMENTS[Math.floor(Math.random() * (REPLACEMENTS.length - 1))];
    } else {
      res += ".";
    }
  }
  return res;
}

export class ReillyPrompter extends Prompter {
  protected getScript() {
    let input = super.getScript();
    input = unquote(input);
    input = comma(input);
    input = replacePeriods(input);
    return input;
  }
}
