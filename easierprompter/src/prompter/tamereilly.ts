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

function unquote(input: string) {
  for (const c of QUOTES) {
    input = input.replace(c, "");
  }
  return input;
}

export class TameReillyPrompter extends Prompter {
  protected getScript() {
    const input = super.getScript();
    return unquote(input);
  }
}
