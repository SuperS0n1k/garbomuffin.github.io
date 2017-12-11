import { Block } from "./sprites/blocks/block";
import { GrassBlock } from "./sprites/blocks/grass";
import { SpikeBlock } from "./sprites/blocks/spike";
import { CornerBlock } from "./sprites/blocks/corner";
import { TallGrassBlock } from "./sprites/blocks/tallgrass";
import { LevelUpCoinSpawnerBlock } from "./sprites/blocks/coinspawner";
import { CrumblingBlock } from "./sprites/blocks/crumble";
import { FallingBlock } from "./sprites/blocks/falling";
import { BlockSwitchSpawnerBlock } from "./sprites/blocks/blockswitchspawner";

interface IBlockMap {
  [s: string]: string | IBlockMetaData;
}

interface IBlockMetaData {
  texture: string;
  type: typeof Block;
}

function special(type: typeof Block, texture: string) {
  return {
    type, texture,
  };
}

function notsolid(texture: string) {
  return special(Block, texture);
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
  j: special(GrassBlock, "blocks/j"),
  k: special(GrassBlock, "blocks/k"),
  l: special(GrassBlock, "blocks/l"),
  m: special(CornerBlock, "blocks/m"),
  n: special(LevelUpCoinSpawnerBlock, "blocks/n"),
  o: special(SpikeBlock, "blocks/o"),
  p: special(TallGrassBlock, "blocks/p"),
  q: special(TallGrassBlock, "blocks/q"),
  r: "blocks/r",
  s: "blocks/s",
  t: special(CrumblingBlock, "blocks/crumble/1"),
  u: special(BlockSwitchSpawnerBlock, "blocks/u"),
  v: "blocks/v",
  w: special(FallingBlock, "blocks/w"),
  // x: "blocks/x",
  // y: "blocks/y",
  // z: "blocks/z",
};
