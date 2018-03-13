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
  protected getScript() {
    let input = super.getScript();
    for (const c of QUOTES) {
      input = input.replace(c, "");
    }
    return input;
  }
}
