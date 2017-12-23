/*
 * See this in action: https://scratch.mit.edu/search/projects?q=meme or just visit top loved
 * 
 * You're welcome.
 * 
 * Accounts:
 * https://scratch.mit.edu/users/GarboMuffin/ <--- random garbage
 * https://scratch.mit.edu/users/GarboMarvin/ <--- this one is mostly ACTUAL memes
 */

// ==UserScript==
// @name         NO MORE FURRIES
// @version      2.0
// @namespace    https://garbomuffin.github.io/userscripts/no-more-furries/
// @description  FURRIES AREN'T MEMES
// @author       GarboMuffin
// @match        https://scratch.mit.edu/*
// @run-at       document-end
// @downloadURL  https://garbomuffin.github.io/userscripts/no-more-furries/no-more-furries.user.js
// @updateURL    https://garbomuffin.github.io/userscripts/no-more-furries/no-more-furries.user.js
// ==/UserScript==

// List of users that have a history of making furries and are blocked globally
// Links above user are relavent scratch projects
const BLOCKED_CREATORS: string[] = [
  // https://scratch.mit.edu/projects/124715889/
  "flirtinq",

  // https://scratch.mit.edu/projects/115337538/
  "Chewzers",

  // https://scratch.mit.edu/projects/71920034/
  "BIazeheart",

  // https://scratch.mit.edu/projects/122208737/
  "PennyQuest",

  // https://scratch.mit.edu/projects/118638398/
  "Kloudheart",

  // https://scratch.mit.edu/projects/110440079/
  "Pika-Girl03",

  // https://scratch.mit.edu/projects/126145469/
  "MapIekit_the_WC",

  // https://scratch.mit.edu/projects/116917796/
  // https://scratch.mit.edu/projects/83724614/
  "Rebeat",

  // https://scratch.mit.edu/projects/131194980/
  "FalconsandFare",

  // https://scratch.mit.edu/projects/115725045/
  "kitkatkittycat",

  // https://scratch.mit.edu/projects/92782806/
  "Moonpaw12345",

  // https://scratch.mit.edu/projects/176146975/
  "ApplePiie",

  // https://scratch.mit.edu/projects/117843402/
  "pixieblossom",

  // https://scratch.mit.edu/projects/193695254/
  "MistCat",

  // https://scratch.mit.edu/projects/155260989/
  "Xena_NightFury",

  // https://scratch.mit.edu/projects/131468328/
  "LunaShadow",

  // https://scratch.mit.edu/projects/141548517/
  "PetalCrest",

  // https://scratch.mit.edu/projects/127028614/
  "maplepancakes",

  // https://scratch.mit.edu/projects/72372280/
  "Gumdropp",

  // https://scratch.mit.edu/projects/116137203/
  "-Silverpaw-",

  // https://scratch.mit.edu/projects/172237166/
  "cupcakenoah",

  // https://scratch.mit.edu/projects/65973392/
  // https://scratch.mit.edu/projects/67035184/
  // https://scratch.mit.edu/projects/66074444/
  "Jaycat111",

  // https://scratch.mit.edu/projects/56691174/
  "Echostrike",

  // https://scratch.mit.edu/projects/165684909/
  "-Silverpaw-",

  // https://scratch.mit.edu/projects/123927840/
  "IcoQuest",

  // https://scratch.mit.edu/projects/185404494/
  "_MistyLight_",

  // https://scratch.mit.edu/projects/89430668/
  "SkySplash",

  // https://scratch.mit.edu/projects/84528338/
  "Gumdropp",

  // https://scratch.mit.edu/projects/132763343/
  "SharkyPup",

  // https://scratch.mit.edu/projects/34537852/
  "SkyleCrossi13",

  // https://scratch.mit.edu/projects/95172636/
  "XxPaintstarxX",

  // https://scratch.mit.edu/projects/117848122/
  "Inside-Out-And-Back",

  // https://scratch.mit.edu/projects/127536498/
  // https://scratch.mit.edu/projects/171406320/
  // https://scratch.mit.edu/projects/168331632/
  "maplepancakes",

  // https://scratch.mit.edu/projects/126990575/
  // https://scratch.mit.edu/projects/151723841/
  "CyberPunch",

  // https://scratch.mit.edu/projects/169635562/
  // https://scratch.mit.edu/projects/165684909/
  "-Silverpaw-",

  // https://scratch.mit.edu/projects/69807534/
  // https://scratch.mit.edu/projects/69511280/
  "-SkyStar-",

  // https://scratch.mit.edu/projects/173051302/
  // https://scratch.mit.edu/projects/152671728/
  // https://scratch.mit.edu/projects/169701283/
  "yunnie2005",

  // https://scratch.mit.edu/projects/158581475/
  "Ask_LightningStar",

  // https://scratch.mit.edu/projects/194883205/
  // https://scratch.mit.edu/projects/193695254/
  "MistCat",

  // https://scratch.mit.edu/projects/127196087/
  // https://scratch.mit.edu/projects/131833833/
  // https://scratch.mit.edu/projects/127821523/
  // https://scratch.mit.edu/projects/130483292/
  "Leafstorm42",

  // https://scratch.mit.edu/projects/127532872/
  // https://scratch.mit.edu/projects/131850481/
  "IOctoI",

  // https://scratch.mit.edu/projects/141157913/
  // https://scratch.mit.edu/projects/126385060/
  "artisticdragonpaw",

  // https://scratch.mit.edu/projects/94208336/
  // https://scratch.mit.edu/projects/99594661/
  "-Willowsplash-",

  // https://scratch.mit.edu/projects/123254587/
  // https://scratch.mit.edu/projects/122621410/
  "Orange_Cat_Hop",

  // https://scratch.mit.edu/projects/123925102/
  "magmawolfmaker42",

  // https://scratch.mit.edu/projects/136971653/
  // https://scratch.mit.edu/projects/130456177/
  "PythonKitten",

  // https://scratch.mit.edu/projects/138491469/
  // https://scratch.mit.edu/projects/138655469/
  "Raalae",

  // https://scratch.mit.edu/projects/137152968/
  // https://scratch.mit.edu/projects/124691726/
  "CatKatniss",

  // https://scratch.mit.edu/projects/158225363/
  // https://scratch.mit.edu/projects/146408639/
  "Paperclips",

  // https://scratch.mit.edu/projects/167164294/
  // https://scratch.mit.edu/projects/137100364/
  "Willowsocks",

  // https://scratch.mit.edu/projects/132126867/
  // https://scratch.mit.edu/projects/130526755/
  // https://scratch.mit.edu/projects/132309498/
  "StormySpiDragon",

  // https://scratch.mit.edu/projects/147075535/
  // https://scratch.mit.edu/projects/141875268/
  "Neko-Tiger",

  // https://scratch.mit.edu/projects/186344246/
  // https://scratch.mit.edu/projects/182727719/
  "ChelseaPup",

  // https://scratch.mit.edu/projects/152369436/
  // https://scratch.mit.edu/projects/151541511/
  "cs511598",

  // https://scratch.mit.edu/projects/175377934/
  // https://scratch.mit.edu/projects/174807403/
  "Xena_NightFury",

  // https://scratch.mit.edu/projects/171513484/
  // https://scratch.mit.edu/projects/165584967/
  "PennyQuest",

  // https://scratch.mit.edu/projects/158033983/
  // https://scratch.mit.edu/projects/150241619/
  "BK33",

  // https://scratch.mit.edu/projects/131919676/
  // https://scratch.mit.edu/projects/142431309/
  "LeopardSoul",

  // https://scratch.mit.edu/projects/190548749/
  // https://scratch.mit.edu/projects/173642336/
  "Lionclaws",

  // https://scratch.mit.edu/projects/147613965/
  // https://scratch.mit.edu/projects/146895677/
  "ScratchyT4",

  // https://scratch.mit.edu/projects/167064139/
  // https://scratch.mit.edu/projects/170061395/
  "Choco-Doggo",

  // https://scratch.mit.edu/projects/152402556/
  // https://scratch.mit.edu/projects/152665991/
  "suitcasedog",

  // https://scratch.mit.edu/projects/188246529/
  // https://scratch.mit.edu/projects/190529450/
  "MooDingo",

  // https://scratch.mit.edu/projects/189929049/
  // https://scratch.mit.edu/projects/188776589/
  // https://scratch.mit.edu/projects/195070152/
  "SaciSan",

  // https://scratch.mit.edu/projects/190637541/
  // https://scratch.mit.edu/projects/194226628/
  // https://scratch.mit.edu/projects/192406752/
  "Ninjimaro902",

  // https://scratch.mit.edu/projects/190338403/
  // https://scratch.mit.edu/projects/191960126/
  "okaei",
];

// Strings that can't be in titles or else the project is hidden
const BLOCKED_TITLE_PARTS: string[] = [
  // I don't know why but "meme" creators like to declare that their furry is a meme
  "[meme]", // https://scratch.mit.edu/projects/193695254/
  "{meme}",
  "(meme)",
  "- meme",
  "-meme",

  // Declaring that you made the "original" meme is aparently very important
  "original meme",
  "[original]",
  "{original}",
  "(original)",

  // Special characters
  // "memes" love these
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
];

// BLOCKED_TITLE_PARTS but for things that are case sensitive
const BLOCKED_TITLE_PARTS_SENSITIVE: string[] = [
  // Weird variations of words
  "mEmE",
  "MeMe",
];

// TODO: use regex to be more accurate with blocking based on titles
const BLOCKED_TITLE_REGEX: RegExp[] = [

];

// Returns if an HTMLElement is a project
function isProject(el: HTMLElement): boolean {
  return el.classList && el.classList.contains("project");
}

// Returns the title of a project given its element in the DOM
function getProjectTitle(el: HTMLElement): string {
  const titleContainer = el.getElementsByClassName("thumbnail-title")[0];
  if (!titleContainer) {
    return "";
  }
  const titleElement = titleContainer.getElementsByTagName("a")[0];
  if (!titleElement) {
    return "";
  }
  return titleElement.innerHTML;
}

// Returns the creator of a project given its element in the DOM
function getProjectCreator(el: HTMLElement): string {
  const creatorElement = el.getElementsByClassName("thumbnail-creator")[0];
  if (creatorElement) {
    return (creatorElement as HTMLElement).innerText;
  } else {
    return "";
  }
}

function blockProject(project: HTMLElement) {
  project.style.display = "none";
  // (project.parentElement as HTMLElement).removeChild(project);
}

type TFilter = (title: string, creator: string) => boolean;

class NoMoreFurries {
  private projects: HTMLElement[] = [];
  private filters: TFilter[] = [];
  private blockedFurries: number = 0;

  constructor() {
    // Project list calls this.handlePush() when .push() is called
    const self = this;
    this.projects.push = function(...args) {
      for (const thing of args) {
        self.handlePush(thing);
      }
      return Array.prototype.push.apply(this, ...args);
    };

    // Add in our filters
    this.addFilters();

    // Create the observer
    const observer = new MutationObserver(this.handleMutation.bind(this));
    observer.observe(document.body, {
      // Look for any DOM changes
      childList: true,
      subtree: true,
    });
  }

  //
  // HANDLING THINGS
  //

  private handleMutation(mutationList: MutationRecord[]) {
    for (const mutation of mutationList) {
      for (let i = 0; i < mutation.addedNodes.length; i++) {
        const el = mutation.addedNodes[i];
        if (isProject(el as HTMLElement)) {
          this.projects.push(el as HTMLElement);
        }
      }
    }
  }

  private handlePush(project: HTMLElement) {
    const title = getProjectTitle(project);
    const creator = getProjectCreator(project);

    for (const filter of this.filters) {
      const result = filter(title, creator);
      if (result) {
        console.log(`blocked '${title}' by ${creator}`);
        blockProject(project);

        this.blockedFurries++;
      }
    }
  }

  //
  // FILTERS
  //

  private addFilter(filter: TFilter) {
    this.filters.push(filter);
  }

  private addFilters() {
    this.addFilter(this.creatorFilter);
    this.addFilter(this.titleFilter);
    this.addFilter(this.caseSensitiveTitleFilter);
    this.addFilter(this.regexTitleFilter);
  }

  private creatorFilter(title: string, creator: string): boolean {
    return BLOCKED_CREATORS.indexOf(creator) > -1;
  }

  private titleFilter(title: string, creator: string): boolean {
    title = title.toLowerCase();
    for (const i of BLOCKED_TITLE_PARTS) {
      if (title.indexOf(i.toLowerCase()) > -1) {
        return true;
      }
    }

    // make typescript stop complaining
    // this code is never reached
    return false;
  }

  private caseSensitiveTitleFilter(title: string, creator: string): boolean {
    // Pretty much #titleFilter()
    for (const i of BLOCKED_TITLE_PARTS_SENSITIVE) {
      if (title.indexOf(i) > -1) {
        return true;
      }
    }
    return false;
  }

  private regexTitleFilter(title: string, creator: string): boolean {
    for (const i of BLOCKED_TITLE_REGEX) {
      if (i.test(title)) {
        return true;
      }
    }
    return false;
  }
}

new NoMoreFurries();
