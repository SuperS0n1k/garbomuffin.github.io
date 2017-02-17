// it works so leave me alone
const ASSETS = [
  "tiles/cloud.png",
  "tiles/DarkStone.png",
  "tiles/dirt.png",
  "tiles/grass.png",
  "tiles/ice.png",
  "tiles/stone.png",
  "tiles/switch.png",
  "tiles/switch/off.png",
  "tiles/switch/on.png",
  "tiles/switch/switch.png",
  "tiles/switch/block/BB1.png",
  "tiles/switch/block/BB2.png",
  "tiles/switch/block/BB3.png",
  "tiles/switch/block/BB4.png",
  "tiles/switch/block/BB5.png",
  "tiles/switch/block/BB6.png",
  "tiles/switch/block/BB7.png",
  "tiles/switch/block/BB8.png",
  "tiles/switch/block/BB9.png",
  "tiles/switch/block/block.png",
  "tiles/spikes/Spikes.png",
  "tiles/spikes/Spikesd.png",
  "tiles/hswitch/B.png",
  "tiles/hswitch/Bd.png",
  "tiles/hswitch/Bs.png",
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
  "tiles/suits/fire.png",
  "tiles/suits/hammer.png",
  "tiles/suits/wind.png",
  "projectiles/fireball.png",
  "projectiles/hammer.png",
  "player/hitbox.png",
  "player/jump.png",
  "player/run1.png",
  "player/run2.png",
  "player/run3.png",
  "player/run4.png",
  "player/still.png",
  "player/suits/air/jump.png",
  "player/suits/air/run1.png",
  "player/suits/air/run2.png",
  "player/suits/air/run3.png",
  "player/suits/air/run4.png",
  "player/suits/air/still.png",
  "player/suits/fire/jump.png",
  "player/suits/fire/run1.png",
  "player/suits/fire/run2.png",
  "player/suits/fire/run3.png",
  "player/suits/fire/run4.png",
  "player/suits/fire/still.png",
  "player/suits/hammer/jump.png",
  "player/suits/hammer/run1.png",
  "player/suits/hammer/run2.png",
  "player/suits/hammer/run3.png",
  "player/suits/hammer/run4.png",
  "player/suits/hammer/still.png",
  // "audio/click.ogg",
  // "audio/ice.ogg",
];

/**
 * Load an image.
 * @param {string|HTMLImageElement|HTMLAudioElement} src
 * @returns {HTMLImageElement|HTMLAudioElement}
 */
function load(src){
  // if it's already a loaded file return it
  if (src instanceof HTMLImageElement || src instanceof HTMLAudioElement){
    return src;
  }
  // if it doesn't already start with assets/ make it start with it
  if (!src.startsWith("/ss-js/assets/")){
    src = "/ss-js/assets/" + src;
  }
  // if it's cached then return it
  if (src in LOADED_ASSETS){
    // load it from the cache if it's saved
    // console.log("Loaded from cache: " + src);
    return LOADED_ASSETS[src];
  }

  // otherwise download it
  console.log("Downloading: " + src);
  let asset;
  if (src.indexOf(".png") > -1){
    asset = new Image();
    asset.onload = function(){
      loadedAssets++;
      if (!loaded){
        document.getElementById("progress").value = loadedAssets / totalAssets;
      }
      console.log("Loaded: " + src);
    };
    asset.src = src;
  }else{
    asset = new Audio(src);
    asset.oncanplay = function(){
      loadedAssets++;
      if (!loaded){
        document.getElementById("progress").value = loadedAssets / totalAssets;
      }
      console.log("Loaded: " + src);
      asset.oncanplay = null;
    };
  }
  
  // asset.src = src;
  LOADED_ASSETS[src] = asset; // cache it
  return asset;
}

/**
 * Play a sound
 * @param {string} sound
 */
function playSound(sound){
  return;
  if (!sound.startsWith("audio/")){
    sound = "audio/" + sound;
  }
  if (!sound.endsWith(".ogg")){
    sound = sound + ".ogg";
  }
  console.log("Playing sound: " + sound);
  var audio = load(sound);
  if (audio.ended || audio.currentTime === 0){
    audio.play();
  }else{
    audio.currentTime = 0;
  }
  audio.play();
  return audio;
}
