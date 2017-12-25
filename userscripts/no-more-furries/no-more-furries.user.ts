// Changes in v2.1.1:
//  * Filter updates
// ============================================================================
// Changes in v2.1:
//  * Improved support for the home page
//    Sliding things no longer break
//  * Filter updates
// ============================================================================
// See this in action: https://scratch.mit.edu/search/projects?q=meme
// Or just take a long trip through the home page
// ============================================================================
// Accounts:
// https://scratch.mit.edu/users/GarboMuffin/ -- random garbage
// https://scratch.mit.edu/users/GarboMarvin/ -- ACTUAL memes
// ============================================================================
// Below this section is the source code.
// You really shouldn't edit it unless you know what you're doing.
// ============================================================================

// ==UserScript==
// @name         NO MORE FURRIES
// @version      2.1.1
// @namespace    https://garbomuffin.github.io/userscripts/no-more-furries/
// @description  FURRIES AREN'T MEMES
// @author       GarboMuffin
// @match        https://scratch.mit.edu/*
// @run-at       document-end
// @downloadURL  https://garbomuffin.github.io/userscripts/no-more-furries/no-more-furries.user.js
// @updateURL    https://garbomuffin.github.io/userscripts/no-more-furries/no-more-furries.user.js
// ==/UserScript==

const DEBUG = false;

// List of users that have a history of making furries and are blocked globally
// Links above user are relevant scratch projects
const BLOCKED_CREATORS: string[] = [
  // https://scratch.mit.edu/projects/123751084/
  // https://scratch.mit.edu/projects/124715889/
  "flirtinq",

  // https://scratch.mit.edu/projects/115257363/
  // https://scratch.mit.edu/projects/115337538/
  "Chewzers",

  // https://scratch.mit.edu/projects/180038821/
  // https://scratch.mit.edu/projects/71920034/
  "BIazeheart",

  // https://scratch.mit.edu/projects/165584967/
  // https://scratch.mit.edu/projects/122208737/
  "PennyQuest",

  // https://scratch.mit.edu/projects/130220150/
  // https://scratch.mit.edu/projects/118638398/
  "Kloudheart",

  // https://scratch.mit.edu/projects/119359869/
  // https://scratch.mit.edu/projects/118638398/
  // https://scratch.mit.edu/projects/110440079/
  "Pika-Girl03",

  // https://scratch.mit.edu/projects/137517193/
  // https://scratch.mit.edu/projects/134604937/
  // https://scratch.mit.edu/projects/126145469/
  "MapIekit_the_WC",

  // https://scratch.mit.edu/projects/116917796/
  // https://scratch.mit.edu/projects/83724614/
  "Rebeat",

  // https://scratch.mit.edu/projects/131194980/
  // https://scratch.mit.edu/projects/158152366/
  "FalconsandFare",

  // https://scratch.mit.edu/projects/103551967/
  // https://scratch.mit.edu/projects/115725045/
  "kitkatkittycat",

  // https://scratch.mit.edu/projects/92782806/
  // https://scratch.mit.edu/projects/116272599/
  "Moonpaw12345",

  // https://scratch.mit.edu/projects/176146975/
  // https://scratch.mit.edu/projects/176146975/
  "ApplePiie",

  // https://scratch.mit.edu/projects/123599441/
  // https://scratch.mit.edu/projects/117843402/
  "pixieblossom",

  // https://scratch.mit.edu/projects/193695254/
  // https://scratch.mit.edu/projects/190966062/
  "MistCat",

  // https://scratch.mit.edu/projects/185796792/
  // https://scratch.mit.edu/projects/131468328/
  "LunaShadow",

  // https://scratch.mit.edu/projects/163830835/
  // https://scratch.mit.edu/projects/141548517/
  "PetalCrest",

  // https://scratch.mit.edu/projects/72372280/
  // https://scratch.mit.edu/projects/75380290/
  // https://scratch.mit.edu/projects/86009406/
  "Gumdropp",

  // https://scratch.mit.edu/projects/116137203/
  // https://scratch.mit.edu/projects/168240828/
  // https://scratch.mit.edu/projects/167364214/
  "-Silverpaw-",

  // https://scratch.mit.edu/projects/65973392/
  // https://scratch.mit.edu/projects/67035184/
  // https://scratch.mit.edu/projects/66074444/
  "Jaycat111",

  // https://scratch.mit.edu/projects/73121790/
  // https://scratch.mit.edu/projects/56691174/
  "Echostrike",

  // https://scratch.mit.edu/projects/145564077/
  // https://scratch.mit.edu/projects/123927840/
  "IcoQuest",

  // https://scratch.mit.edu/projects/190375395/
  // https://scratch.mit.edu/projects/185404494/
  "_MistyLight_",

  // https://scratch.mit.edu/projects/83219622/
  // https://scratch.mit.edu/projects/89430668/
  "SkySplash",

  // https://scratch.mit.edu/projects/166847248/
  // https://scratch.mit.edu/projects/132763343/
  "SharkyPup",

  // https://scratch.mit.edu/projects/77757920/
  // https://scratch.mit.edu/projects/34537852/
  "SkyleCrossi13",

  // https://scratch.mit.edu/projects/95758146/
  // https://scratch.mit.edu/projects/95172636/
  "XxPaintstarxX",

  // https://scratch.mit.edu/projects/117848122/
  // https://scratch.mit.edu/projects/171321556/
  "Inside-Out-And-Back",

  // https://scratch.mit.edu/projects/127536498/
  // https://scratch.mit.edu/projects/171406320/
  // https://scratch.mit.edu/projects/168331632/
  "maplepancakes",

  // https://scratch.mit.edu/projects/126990575/
  // https://scratch.mit.edu/projects/151723841/
  "CyberPunch",

  // https://scratch.mit.edu/projects/69807534/
  // https://scratch.mit.edu/projects/69511280/
  "-SkyStar-",

  // https://scratch.mit.edu/projects/173051302/
  // https://scratch.mit.edu/projects/152671728/
  // https://scratch.mit.edu/projects/169701283/
  "yunnie2005",

  // https://scratch.mit.edu/projects/158581475/
  // https://scratch.mit.edu/projects/144550080/
  // https://scratch.mit.edu/projects/124835894/
  // https://scratch.mit.edu/projects/123262948/
  "Ask_LightningStar",

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

  // https://scratch.mit.edu/projects/125525203/
  // https://scratch.mit.edu/projects/124740625/
  "hopkitten",

  // https://scratch.mit.edu/projects/166470049/
  // https://scratch.mit.edu/projects/161400162/
  "Dis_Gurrrl",

  // https://scratch.mit.edu/projects/192556271/
  // https://scratch.mit.edu/projects/189734205/
  "ChocciChip",

  // https://scratch.mit.edu/projects/194966772/
  // https://scratch.mit.edu/projects/181297092/
  "TheGamingArcher",

  // https://scratch.mit.edu/projects/139641550/
  // https://scratch.mit.edu/projects/141282783/
  // https://scratch.mit.edu/projects/151096802/
  // https://scratch.mit.edu/projects/138295753/
  "PretzelFlavour",

  // https://scratch.mit.edu/projects/180223689/
  // https://scratch.mit.edu/projects/178713577/
  "Aqua-Kitty",

  // https://scratch.mit.edu/projects/149463841/
  // https://scratch.mit.edu/projects/194128628/
  "wolfypup9990",

  // https://scratch.mit.edu/projects/172237166/
  // https://scratch.mit.edu/projects/182774608/
  "cupcakenoah",

  // https://scratch.mit.edu/projects/167347915/
  // https://scratch.mit.edu/projects/125925425/
  "MagicaJaphet",

  // https://scratch.mit.edu/projects/170532778/
  // https://scratch.mit.edu/projects/172288870/
  "Russel_the_Pirate",

  // https://scratch.mit.edu/projects/129046287/
  // https://scratch.mit.edu/projects/130229716/
  "togegirl",

  // https://scratch.mit.edu/projects/173461146/
  // https://scratch.mit.edu/projects/185790597/
  "CocoaTwist",

  // https://scratch.mit.edu/projects/113900222/
  // https://scratch.mit.edu/projects/113760070/
  "Pudding_the_cat",

  // https://scratch.mit.edu/projects/149785165/
  // https://scratch.mit.edu/projects/140161180/
  "rocer77712",

  // https://scratch.mit.edu/projects/165437630/
  // https://scratch.mit.edu/projects/165428352/
  "-LilacWishes-",

  // https://scratch.mit.edu/projects/168239277/
  // https://scratch.mit.edu/projects/169999607/
  "riverdaIe",

  // https://scratch.mit.edu/projects/194817292/
  // https://scratch.mit.edu/projects/195004634/
  "RedCuzImAwesome",

  // https://scratch.mit.edu/projects/129806946/
  // https://scratch.mit.edu/projects/145749558/
  "Flannel_shirt",

  // https://scratch.mit.edu/projects/153654091/
  // https://scratch.mit.edu/projects/150267665/
  "CocoaKey",

  // https://scratch.mit.edu/projects/188247824/
  // https://scratch.mit.edu/projects/187032928/
  "KichiChan",

  // https://scratch.mit.edu/projects/124419533/
  // https://scratch.mit.edu/projects/176243157/
  "nednilclan",

  // https://scratch.mit.edu/projects/179884900/
  // https://scratch.mit.edu/projects/169015095/
  "softea",

  // https://scratch.mit.edu/projects/149218788/
  // https://scratch.mit.edu/projects/149834014/
  "Blackie-",

  // https://scratch.mit.edu/projects/148381774/
  // https://scratch.mit.edu/projects/179121323/
  "bendyfox",

  // https://scratch.mit.edu/projects/189702291/
  // https://scratch.mit.edu/projects/190865189/
  "TapiocaTail",

  // https://scratch.mit.edu/projects/115346965/
  // (account 404s)
  "Convexity",
];

// Strings that can't be in titles or else the project is hidden
// TODO: examples
const BLOCKED_TITLE_PARTS: string[] = [
  // I don't know why but "meme" creators like to declare that their furry is a meme

  // https://scratch.mit.edu/projects/110440079/
  // https://scratch.mit.edu/projects/92782806/
  // https://scratch.mit.edu/projects/105717454/
  "[meme]",
  // https://scratch.mit.edu/projects/108494123/ (almost)
  "{meme}",
  // https://scratch.mit.edu/projects/115725045/
  "(meme)",
  "- meme",
  "-meme",

  // Declaring that you made the "original" meme is aparently very important
  // https://scratch.mit.edu/projects/117843402/
  // https://scratch.mit.edu/projects/158072213/
  // https://scratch.mit.edu/projects/131468328/
  // https://scratch.mit.edu/projects/141548517/
  // https://scratch.mit.edu/projects/174360806/
  // https://scratch.mit.edu/projects/127028614/
  // https://scratch.mit.edu/projects/157337470/
  // https://scratch.mit.edu/projects/125591212/
  // https://scratch.mit.edu/projects/117224374/
  // https://scratch.mit.edu/projects/168331632/
  // https://scratch.mit.edu/projects/164504639/
  // https://scratch.mit.edu/projects/113394588/
  // https://scratch.mit.edu/projects/169501759/
  // https://scratch.mit.edu/projects/117552646/
  // https://scratch.mit.edu/projects/116075128/
  "original meme",
  // TODO: consider some filters such as "[original]"
  // can't find enough examples to justify being in the filter list

  // Very special characters
  // TODO: consider adding these back in
  // can't find enough examples to justify being in the filter list + there are some ok uses of these characters
  // "◊",
  // "▬",
  // "ɛ",
  // "ɠ",
  // "н",
  // "σ",
  // "ѕ",
  // "т",
  // "Я",
  // "Ө",
  // "Ї",
  // "Ƨ",
  // "ᗰ",
  // "ᕮ",
  // "Ꮗ",
  // "Ꭵ",
  // "Ꮑ",
  // "Ꮦ",
  // "Ꮛ",
  // "Ꮢ",
  // "Ꮒ",
  // "Ꮆ",
  // "Ꮥ",
  // "Я",
  // "Ї",
  // "ｇ",
  // "ｒ",
  // "ａ",
  // "ｖ",
  // "ｉ",
  // "ｔ",
  // "ｙ",
  // "ᴏ",
  // "ɴ",
  // "ᴇ",
  // "ᴡ",
  // "ᴋ",
  // "ᴍ",
  // "ᴀ",
  // "ᴘ",
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

function getProjectLink(el: HTMLElement): string {
  const links = el.getElementsByTagName("a");
  if (links.length >= 1) {
    return links[0].href;
  }
  return "";
}

function blockProject(project: HTMLElement) {
  // When a project is on a slider on the home page treat it specially so that it doesn't break the sliding
  // Setting `display: none;` really breaks them
  // This instead will cover them up so you can't see it and scrolling doesn't break.
  if (project.classList.contains("slick-slide")) {
    // Changes how position: absolute will work in child elements
    project.style.position = "relative";

    // Create a div that will cover up the element
    const overlay = document.createElement("div");
    // Allow us to position it on top
    overlay.style.position = "absolute";
    // Move it to the upper left corner
    overlay.style.top = "0";
    overlay.style.left = "0";
    // Cover the entire element
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    // Make sure it goes on top of the existing element
    overlay.style.zIndex = "9999";
    // Cover it up using background color
    overlay.style.backgroundColor = "white";

    // And append it
    project.appendChild(overlay);
  } else {
    // Otherwise we should hide them the normal way
    project.style.display = "none";
  }
}

type TFilter = (title: string, creator: string) => boolean;

class NoMoreFurries {
  private filters: TFilter[] = [];
  // TODO: consider a "furries eradicated" number like in the old pre v2.0 versions
  private blockedFurries: number = 0;

  constructor() {
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
          this.handleProject(el as HTMLElement);
        }
      }
    }
  }

  private handleProject(project: HTMLElement) {
    const title = getProjectTitle(project);
    const creator = getProjectCreator(project);

    for (const filter of this.filters) {
      const result = filter(title, creator);
      if (result) {
        let message = `blocked '${title}' by ${creator}`;
        if (DEBUG) {
          message += ` (${getProjectLink(project)})`;
        }
        console.log(message);
        blockProject(project);
        this.blockedFurries++;
      }
    }
  }

  //
  // FILTERING
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

  //
  // FILTERS
  //

  private creatorFilter(title: string, creator: string): boolean {
    return BLOCKED_CREATORS.indexOf(creator) > -1;
  }

  private titleFilter(title: string, creator: string): boolean {
    // Convert everything to lower case to avoid case sensitivity
    title = title.toLowerCase();
    for (const i of BLOCKED_TITLE_PARTS) {
      if (title.indexOf(i.toLowerCase()) > -1) {
        return true;
      }
    }
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
