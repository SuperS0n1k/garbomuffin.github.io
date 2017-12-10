import { Block } from "./sprites/blocks/block";
import { GrassBlock } from "./sprites/blocks/grass";
import { GroundedCenteredBlock } from "./sprites/blocks/center";

interface IBlockMap {
  [s: string]: string | IBlockMetaData;
}

interface IBlockMetaData {
  texture: string;
  type: typeof Block;
}

function meta(type: typeof Block, texture: string) {
  return {
    type, texture,
  };
}

export const blockMap: IBlockMap = {
  a: "blocks/a",
  b: "blocks/b",
  c: "blocks/c",
  d: "blocks/d",
  e: "blocks/e",
  f: "blocks/f",
  g: "blocks/g",
  h: "blocks/h",
  i: "blocks/i",
  j: meta(GrassBlock, "blocks/j"),
  k: meta(GrassBlock, "blocks/k"),
  l: meta(GrassBlock, "blocks/l"),
  m: "blocks/m", // TODO: special: corner
  n: "blocks/n", // TODO: special: next level
  o: "blocks/o", // TODO: special: spike
  p: meta(GroundedCenteredBlock, "blocks/p"),
  q: meta(GroundedCenteredBlock, "blocks/q"),
  // r: "blocks/r",
  // s: "blocks/s",
  // t: "blocks/t",
  // u: "blocks/u",
  // v: "blocks/v",
  // w: "blocks/w",
  // x: "blocks/x",
  // y: "blocks/y",
  // z: "blocks/z",
};
