const TILES = {
  "A": {texture: "tiles/grass.png"},
  "B": {texture: "tiles/dirt.png"},
  "C": {texture: "tiles/cloud.png"},
  "S": {texture: "tiles/stone.png"},
  "I": {
    texture: "tiles/ice.png",
    tick: iceTick,
    type: "ice",
  },
  "@": {
    texture: "tiles/coin/1.png",
    animation: {
      length: 5,
      frames: [
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
      ]
    },
    solid: false,
    tick: coinTick,
    class: "fireball",
  },
  "1": {
    texture: "tiles/suits/fire.png",
    solid: false,
    tick: function(){
      return suitTick.call(this, FIRE_SUIT);
    },
  },
  "2": {
    texture: "tiles/suits/wind.png",
    solid: false,
    tick: function(){
      return suitTick.call(this, WIND_SUIT);
    },
  },
  "3": {
    texture: "tiles/suits/wind.png",
    solid: false,
    tick: function(){
      return suitTick.call(this, HAMMER_SUIT);
    },
  },
};
