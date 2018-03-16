import { Prompter } from "./prompter";

const QUOTES = [
  /«/ig,
  /‹/ig,
  /»/ig,
  /›/ig,
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
  /❮/ig,
  /❯/ig,
  /⹂/ig,
  /〝/ig,
  /〞/ig,
  /〟/ig,
  /＂/ig,
];

export class ReillyPrompter extends Prompter {
  private unquote(input: string) {
    for (const c of QUOTES) {
      input = input.replace(c, "");
    }
    return input;
  }

  private comma(input: string) {
    const s = input.split(" ");
    const length = s.length;
    let res = "";
    for (let i = 0; i < length; i++) {
      const text = s[i];
      const progress = i / length;
      res += text;
      if (Math.random() < (progress / 2)) {
        res += ", ";
      } else {
        res += " ";
      }
    }
    return res;
  }

  protected getScript() {
    const input = super.getScript();
    return this.comma(this.unquote(input));
  }
}
