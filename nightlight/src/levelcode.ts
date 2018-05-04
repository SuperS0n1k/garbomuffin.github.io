import { LEVEL_HEIGHT, LEVEL_WIDTH } from "./config";
import { Level } from "./game/levels";

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
