const DEFAULTS = {
  solid: true,
  interactable: false,
  interact: 0,
  animated: false,
  framesPerAnimation: 0,
  animationFrames: 0,
  animationFrame: 0,
  frame: 0,
  special: "",
};

const SPECIALS = {
  ice: "ice",
  switch: "switch",
  blockBreak: "blockBreak",
  hammerSuit: "suitHammer",
  hammerSwitch: "hammerToggledSwitch",
};

const SWITCH = "+";
const HAMMER_SUIT = "3";

const TILES = {
  // grass
  a: {
    texture: "tiles/grass.png"
  },
  // dirt
  b: {
    texture: "tiles/dirt.png"
  },
  // clouds
  c: {
    texture: "tiles/cloud.png"
  },
  // ice
  i: {
    texture: "tiles/ice.png",
    special: SPECIALS.ice
  },
  // stone
  s: {
    texture: "tiles/stone.png"
  },
  // purple stone (darkstone)
  p: {
    texture: "tiles/DarkStone.png",
  },
  // fire suit
  "1": {
    texture: "suits/fire.png",
    solid: false,
    interactable: true,
    interact: function(player, tile){
      player.suit = SUITS.fire;
      player.unlocked = player.suit;
      tile.destroy();
    }
  },
  // air suit
  "2": {
    texture: "suits/wind.png",
    solid: false,
    interactable: true,
    interact: function(player, tile){
      player.suit = SUITS.wind;
      player.unlocked = player.suit;
      tile.destroy();
    }
  },
  // hammer suit
  "3": {
    texture: "suits/hammer.png",
    solid: false,
    interactable: true,
    interact: function(player, tile){
      player.suit = SUITS.hammer;
      player.unlocked = player.suit;
      tile.destroy();
    },
    special: SPECIALS.hammerSuit,
  },
  // coin
  "@": {
    texture: "tiles/coin/1.png",
    solid: false,
    animated: true,
    framesPerAnimation: 4,
    animationFrames: [
      "tiles/coin/1.png",
      "tiles/coin/2.png",
      "tiles/coin/3.png",
      "tiles/coin/4.png",
      "tiles/coin/5.png",
      "tiles/coin/6.png",
      "tiles/coin/7.png",
      "tiles/coin/8.png",
      "tiles/coin/9.png",
      "tiles/coin/10.png",
      "tiles/coin/11.png",
    ],
    interactable: true,
    interact: function(player, tile){
      playSound(ALIASES.coin);
      platforms.removeChild(tile);
      player.coins[COINS.indexOf(level + 1)] = true;
      tile.destroy();
    },
  },
  // switch controller
  "#": {
    texture: "tiles/switch.png",
    special: SPECIALS.switch
  },
  // unactivated switch -- do not use!
  "+": {
    texture: "tiles/switch/off.png",
    solid: false,
    interactable: true,
    interact: function(player, sprite){
      if (!sprite.used){
        sprite.used = true;
        sprite.setTexture(textures["tiles/switch/on.png"]);
        sprite.controller.setTexture(textures["tiles/switch/switch.png"]);
        playSound(ALIASES.switch);
        ++platforms.switchesActivated;
        setTimeout(function(){
          sprite.destroy();
          playSound(ALIASES.switch2);
        }, SWITCH_TIMEOUT);
      }
    },
  },
  // switch toggleable block
  "$": {
    texture: "tiles/switch/block/block.png",
    special: SPECIALS.blockBreak,
  },
  // hammer toggled switch
  "*": {
    texture: "tiles/hswitch/B.png",
    animated: true,
    framesPerAnimation: 10,
    animationFrames: [
      "tiles/hswitch/B.png",
      "tiles/hswitch/Bs.png",
    ],
    special: SPECIALS.hammerSwitch,
  },
  // down spike
  "V": {
    texture: "tiles/spikes/Spikesd.png",
    solid: false,
    interactable: true,
    interact: function(player, block){
      reset();
    }
  },
  // up spike
  "^": {
    solid: false,
    texture: "tiles/spikes/Spikes.png",
    interactable: true,
    interact: function(player, block){
      reset();
    }
  }
};
