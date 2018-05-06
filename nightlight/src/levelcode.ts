import { LEVEL_HEIGHT, LEVEL_WIDTH } from "./config";
import { Level } from "./game/levels";
import { getRandomInt } from "./utils";

export const LEVEL_CODE_LENGTH = LEVEL_HEIGHT * LEVEL_WIDTH;

export function getLevelForCode(str: string): Level {
  const isJson = str.startsWith("{");
  if (isJson) {
    return getJsonLevel(JSON.parse(str));
  } else {
    return getStringLevel(str);
  }
}

function getJsonLevel(json: any): Level {
  if (typeof json.dark === "undefined") {
    json.dark = false;
  }
  if (typeof json.stars === "undefined") {
    json.stars = true;
  }
  if (typeof json.background === "undefined") {
    json.background = "black";
  }
  return json;
}

function getStringLevel(str: string): Level {
  return {
    levelData: str,
    stars: true,
    dark: false,
    background: "black",
  };
}

export function getLevelForContinueCode(code: string): number | null {
  if (code.length !== 8) {
    return null;
  }
  if (Math.floor(+code) !== +code) {
    return null;
  }
  const level = +(code[1] + code[4]);
  if (level < 0) {
    return null;
  }
  if (!isFinite(level)) {
    return null;
  }
  return level;
}

export function getContinueCodeForLevel(nlevel: number) {
  let level = nlevel.toString();
  if (level.length === 1) {
    level = "0" + level;
  }
  let result = "";
  result += getRandomInt(0, 9);
  result += level[0];
  result += getRandomInt(0, 9);
  result += getRandomInt(0, 9);
  result += level[1];
  result += getRandomInt(0, 9);
  result += getRandomInt(0, 9);
  result += getRandomInt(0, 9);
  return result;
}
