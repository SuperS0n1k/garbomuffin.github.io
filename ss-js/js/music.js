const AUDIO = [
  ["Recollection", "background"],
  ["click", "collect"],
  ["projectile", "projectile"],
  ["ice", "iceBreak"],
  ["smb_bump", "switchTimeout"],
  ["block-break", "blockBreak"],
];

const ALIASES = {
  background: "background",
  coin: "collect",
  switch: "collect",
  switch2: "switchTimeout",
  blockBreak: "blockBreak",
  projectile: "projectile",
  ice: "iceBreak",
};

createjs.Sound.alternateExtensions = ["mp3"];
createjs.Sound.on("fileload", audioLoadHandler);
for (let audio of AUDIO){
  audioLoadHandler({
    src: "audio",
  });
  // createjs.Sound.registerSound("audio/" + audio[0] + ".ogg", audio[1]);
}

/**
 * Audio loading handler.
 * @param {object} event
 */
function audioLoadHandler(event){
  ++loadedSongs;
  console.log(event.src + " loaded...");
}

/**
 * Play a sound
 * @param {string} sound The sound to be played.
 * @returns {createjs.AbstractSoundInstance} The sound instance.
 */
function playSound(sound){
  // var instance = createjs.Sound.play(sound);
  // instance.volume = VOLUME;
  // return instance;
  return {
    on: function(){}
  };
}

/**
 * Play the background music forever.
 */
function playBackgroundMusic(){
  var instance = playSound(ALIASES.background);
  instance.on("complete", playBackgroundMusic);
}
