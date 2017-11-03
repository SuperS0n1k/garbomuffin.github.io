// ==UserScript==
// @name         NO MORE FURRIES
// @version      1.1.7
// @namespace    https://garbomuffin.github.io/userscripts/no-more-furries/
// @description  FURRIES ARENT MEMES GOD DAMMIT
// @author       GarboMuffin
// @match        https://scratch.mit.edu/*
// @run-at       document-idle
// @downloadURL  https://garbomuffin.github.io/userscripts/no-more-furries/no-more-furries.user.js
// @updateURL    https://garbomuffin.github.io/userscripts/no-more-furries/no-more-furries.user.js
// ==/UserScript==

/*
 * See this in action: https://scratch.mit.edu/search/projects?q=meme or just visit top loved
 * Scroll down for the furries eradicated number. (below the footer)
 *
 * Note that this isn't perfect and the furthur your scroll the more inaccurate
 * this gets. This is because I have to manually input all the filters, but it
 * seems to work pretty well actually.
 *
 * Please don't actually use this.
 */

var debug = false;
//debug = true;

var count = 0;

// people that are well known to make furries
const people = [
  "Rebeat",
  "Chewzers",
  "flirtinq",
  "BIazeheart",
  "Pika-Girl03",
  "Kloudheart",
  "kitkatkittycat",
  "Moonpaw12345",
  "pixieblossom",
  "-magpie-",
  "SketchMaster11",
  "Jaycat111",
  "MapIekit_the_WC",
  "Kittizu-",
  "LunaShadow",
  "Echostrike",
  "Kawaiilesscatz",
  "-Silverpaw-",
  "IcoQuest",
  "_MistyLight_",
  "SkySplash",
  "Gumdropp",
  "SharkyPup",
  "SkyleCrossi13",
  "XxPaintstarxX",
  "Inside-Out-And-Back",
  "maplepancakes",
  "CyberPunch",
  "-Silverpaw-",
  "-SkyStar-",
  "yunnie2005",
  "Ask_LightningStar",
  "MistCat",
  "Leafstorm42",
  "IOctoI",
  "artisticdragonpaw",
  "-Willowsplash-",
  "Orange_Cat_Hop",
  "magmawolfmaker42",
  "PythonKitten",
  "Raalae",
  "CatKatniss",
  "Paperclips",
  "Willowsocks",
  "Convexity",
  "wolfie_loves",
  "StormySpiDragon",
  "Neko-Tiger",
  "ChelseaPup",
  "cs511598",
  "Xena_NightFury",
  "PennyQuest",
  "BK33",
  "LeopardSoul",
  "Lionclaws",
  "ScratchyT4",
  "Choco-Doggo",
  "cupcakenoah",
  "suitcasedog",
  "MooDingo",
  // "ceebee", // haha no but the temptation is certainly there
];

// titles that are often associated with furries
const titles = [
  // project titles or patterns and stuff
  "give me your oc", // fite me
  "add your oc",
  "[original]", // because aparently saying your the original is very important for people these days
  "{original}", // i mean it's not like someone is going to remix it and keep the "[original]" part, right?
  "(original)",
  "{meme}",
  "[meme]", // well at least they make blocking these things easier
  "(meme)",
  "original meme",
  "- meme",
  "-meme",
  "||",
  "animation dump",
  "art dump",
  // fancy letters and characters
  // LOTS OF THEM
  "◊",
  "▬",
  "✨",
  "ɛ",
  "ɠ",
  "н",
  "σ",
  "ѕ",
  "т",
  "Я",
  "Ө",
  "Ї",
  "Ƨ",
  "ᗰ",
  "ᕮ",
  "Ꮗ",
  "Ꭵ",
  "Ꮑ",
  "Ꮦ",
  "Ꮛ",
  "Ꮢ",
  "Ꮒ",
  "Ꮆ",
  "Ꮥ",
  "Я",
  "Ї",
  "ｇ",
  "ｒ",
  "ａ",
  "ｖ",
  "ｉ",
  "ｔ",
  "ｙ",
  "ᴏ",
  "ɴ",
  "ᴇ",
  "ᴡ",
  "ᴋ",
  "ᴍ",
  "ᴀ",
  "ᴘ",
  // specific memes
  "MIЯЯӨЯƧ",
  "numa numa",
];

// case sensitive stuff
const moreTitles = [
  "mEmE",
  "MeMe",
];

console.log("Blocked users: " + people.length);
console.log("Blocked titles/patterns: " + (titles.length + moreTitles.length));

var el = document.createElement("div");
el.id = "johncenaforpresident2020";
el.style.textAlign = "center";
document.getElementById("footer").appendChild(el);

// thanks react
if (location.pathname != "/") doStuff();

var theIntervalThingyYaKnow = setInterval(doStuff, 1000);

function doStuff(){
  var projects;
  try{
  projects = Array.from(document.getElementsByClassName("project"));
  }catch(e){
  console.log("Seems not to contain projects that can be blocked.");
  clearInterval(theIntervalThingyYaKnow);
  return;
  }

  for (var i of projects){
  var text = i.getElementsByClassName("thumbnail-creator")[0];
  if (!text) continue; // for some reason bad stuff can happen and yeah
  var origTitle = text.parentNode.getElementsByTagName("a")[0].innerText;
  var title = origTitle.toLowerCase();

  var isPerson = people.includes(text.innerText);
  var isText = false;

  if (!isPerson){ // don't waste time checking for things we already know
    for (var n of titles){
    if (title.indexOf(n) > -1){
      isText = true;
      break;
    }
    }
  }

  if (!isText && !isPerson){ // maybe it contains some of the other string we know of that are case sensitive
    for (var b of moreTitles){
    if (origTitle.includes(b)){
      isText = true;
      break;
    }
    }
  }

  if (isPerson || isText){
    console.log((isPerson ? "User Block: " : "Title Block: ") + text.innerText + " - " + title +
          (debug ? " (https://scratch.mit.edu/users/" +text.innerText + "/ https://scratch.mit.edu/projects/" +
           text.parentNode.parentNode.parentNode.getElementsByTagName("a")[0].href : ""));
    i.parentNode.removeChild(i);
    count++;
  }
  }

  el.innerHTML = count + " (likely) furries eradicated.";
}
