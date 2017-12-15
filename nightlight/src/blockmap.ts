import { Block, PseudoSolidBlock } from "./sprites/blocks/block";
import { GrassBlock } from "./sprites/blocks/grass";
import { UpSpikeBlock, LeftSpikeBlock, RightSpikeBlock, DownSpikeBlock } from "./sprites/blocks/spike";
import { CornerBlock } from "./sprites/blocks/corner";
import { TallGrassBlock } from "./sprites/blocks/tallgrass";
import { CrumblingBlock } from "./sprites/blocks/crumble";
import { FallingBlock } from "./sprites/blocks/falling";
import { BlockSwitchSpawnerBlock } from "./sprites/blocks/blockswitchspawner";
import { DisabledLightBlock, EnabledLightBlock } from "./sprites/blocks/lightblock";
import { LightSwitchBlock } from "./sprites/blocks/lightswitch";
import { AboveLevelUpCoinSpawnerBlock, BelowLevelUpCoinSpawnerBlock } from "./sprites/blocks/coinspawner";
import { OneWayBlock } from "./sprites/blocks/oneway";

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
  "a": special(PseudoSolidBlock, "blocks/a"),
  "b": "blocks/b",
  "c": "blocks/c",
  "d": "blocks/d",
  "e": "blocks/e",
  "f": "blocks/f",
  "g": "blocks/g",
  "h": "blocks/h",
  "i": "blocks/i",
  "j": special(GrassBlock, "blocks/j"),
  "k": special(GrassBlock, "blocks/k"),
  "l": special(GrassBlock, "blocks/l"),
  "m": special(CornerBlock, "blocks/m"),
  "n": special(AboveLevelUpCoinSpawnerBlock, "blocks/n"),
  "o": special(UpSpikeBlock, "blocks/spikes/up"),
  "p": special(TallGrassBlock, "blocks/p"),
  "q": special(TallGrassBlock, "blocks/q"),
  "r": "blocks/r",
  "s": "blocks/s",
  "t": special(CrumblingBlock, "blocks/crumble/1"),
  "u": special(BlockSwitchSpawnerBlock, "blocks/u"),
  "v": "blocks/v",
  "w": special(FallingBlock, "blocks/w"),
  "x": special(LightSwitchBlock, "blocks/lightbutton/1"),
  "y": special(DisabledLightBlock, "blocks/y"),
  "z": special(EnabledLightBlock, "blocks/z"),

  // Post sword
  "1": "blocks/1",
  "2": "blocks/2",
  "3": "blocks/3",
  "4": "blocks/4",
  "5": "blocks/5",
  "6": "blocks/6",
  "7": "blocks/7",
  "8": "blocks/8",
  "9": special(CornerBlock, "blocks/9"),
  "@": special(BelowLevelUpCoinSpawnerBlock, "blocks/n"),
  "!": special(OneWayBlock, "blocks/!"),
  "#": special(LeftSpikeBlock, "blocks/spikes/left"),
  "$": special(RightSpikeBlock, "blocks/spikes/right"),
  "%": special(DownSpikeBlock, "blocks/spikes/down"),

  // Castle
  "^": special(PseudoSolidBlock, "blocks/^"), // not solid
  "&": "blocks/&",
  "*": "blocks/asterik",
  "(": "blocks/(",
  ")": "blocks/)",
  "-": "blocks/-",
  "_": "blocks/_",
  "=": "blocks/=",
  "+": "blocks/+",
  "`": "blocks/`",
};
