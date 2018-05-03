import { BlackBlock } from "./game/sprites/blocks/black";
import { Block, PseudoSolidBlock, StaticSolidBlock } from "./game/sprites/blocks/block";
import { BlockSwitchSpawnerBlock } from "./game/sprites/blocks/blockswitchspawner";
import { AboveLevelUpCoinSpawnerBlock, BelowLevelUpCoinSpawnerBlock } from "./game/sprites/blocks/coinspawner";
import { CastleCornerBlock, RotatedCornerBlock } from "./game/sprites/blocks/corner";
import { CrumblingBlock } from "./game/sprites/blocks/crumble";
import { InstantFallingBlock, VibratingFallingBlock } from "./game/sprites/blocks/falling";
import { GrassBlock } from "./game/sprites/blocks/grass";
import { DisabledLightBlock, EnabledLightBlock } from "./game/sprites/blocks/lightblock";
import { LightSwitchBlock } from "./game/sprites/blocks/lightswitch";
import { OneWayBlock } from "./game/sprites/blocks/oneway";
import { DownSpikeBlock, LeftSpikeBlock, RightSpikeBlock, UpSpikeBlock } from "./game/sprites/blocks/spike";
import { TallGrassBlock } from "./game/sprites/blocks/tallgrass";

/*
 * A map of characters and the texture and class
 * they correspond to
 */

interface IBlockMap {
  [s: string]: IBlockMetaData;
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

function solid(texture: string) {
  return {
    type: StaticSolidBlock,
    texture,
  };
}

export const blockMap: IBlockMap = {
  "a": special(BlackBlock, "blocks/a"),
  "b": solid("blocks/b"),
  "c": solid("blocks/c"),
  "d": solid("blocks/d"),
  "e": solid("blocks/e"),
  "f": solid("blocks/f"),
  "g": solid("blocks/g"),
  "h": solid("blocks/h"),
  "i": solid("blocks/i"),
  "j": special(GrassBlock, "blocks/j"),
  "k": special(GrassBlock, "blocks/k"),
  "l": special(GrassBlock, "blocks/l"),
  "m": special(RotatedCornerBlock, "blocks/m"),
  "n": special(AboveLevelUpCoinSpawnerBlock, "blocks/n"),
  "o": special(UpSpikeBlock, "blocks/spikes/up"),
  "p": special(TallGrassBlock, "blocks/p"),
  "q": special(TallGrassBlock, "blocks/q"),
  "r": solid("blocks/r"),
  "s": solid("blocks/s"),
  "t": special(CrumblingBlock, "blocks/crumble/1"),
  "u": special(BlockSwitchSpawnerBlock, "blocks/u"),
  "v": solid("blocks/v"),
  "w": special(VibratingFallingBlock, "blocks/w"),
  "[": special(InstantFallingBlock, "blocks/w"),
  "x": special(LightSwitchBlock, "blocks/lightbutton/1"),
  "y": special(DisabledLightBlock, "blocks/y"),
  "z": special(EnabledLightBlock, "blocks/z"),

  // Post sword
  "1": solid("blocks/1"),
  "2": solid("blocks/2"),
  "3": solid("blocks/3"),
  "4": solid("blocks/4"),
  "5": solid("blocks/5"),
  "6": solid("blocks/6"),
  "7": solid("blocks/7"),
  "8": solid("blocks/8"),
  "9": special(RotatedCornerBlock, "blocks/9"),
  "@": special(BelowLevelUpCoinSpawnerBlock, "blocks/n"),
  "!": special(OneWayBlock, "blocks/!"),
  "#": special(LeftSpikeBlock, "blocks/spikes/left"),
  "$": special(RightSpikeBlock, "blocks/spikes/right"),
  "%": special(DownSpikeBlock, "blocks/spikes/down"),

  // Castle
  "^": special(PseudoSolidBlock, "blocks/caret"),
  "&": solid("blocks/ampersand"),
  "*": solid("blocks/asterisk"),
  "(": solid("blocks/("),
  ")": solid("blocks/)"),
  "-": solid("blocks/-"),
  "_": solid("blocks/underscore"),
  "=": solid("blocks/="),
  "+": solid("blocks/+"),
  "`": special(CastleCornerBlock, "blocks/grave"),
};
