"use strict";
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
// Below this section is code.
// You really shouldn't edit it unless you know what you're doing.
// ============================================================================
// List of users that have a history of making furries and are blocked globally
// Links above user are relavent scratch projects
var BLOCKED_CREATORS = [
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
];
// Strings that can't be in titles or else the project is hidden
// TODO: examples
var BLOCKED_TITLE_PARTS = [
    // I don't know why but "meme" creators like to declare that their furry is a meme
    "[meme]",
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
var BLOCKED_TITLE_PARTS_SENSITIVE = [
    // Weird variations of words
    "mEmE",
    "MeMe",
];
// TODO: use regex to be more accurate with blocking based on titles
var BLOCKED_TITLE_REGEX = [];
// Returns if an HTMLElement is a project
function isProject(el) {
    return el.classList && el.classList.contains("project");
}
// Returns the title of a project given its element in the DOM
function getProjectTitle(el) {
    var titleContainer = el.getElementsByClassName("thumbnail-title")[0];
    if (!titleContainer) {
        return "";
    }
    var titleElement = titleContainer.getElementsByTagName("a")[0];
    if (!titleElement) {
        return "";
    }
    return titleElement.innerHTML;
}
// Returns the creator of a project given its element in the DOM
function getProjectCreator(el) {
    var creatorElement = el.getElementsByClassName("thumbnail-creator")[0];
    if (creatorElement) {
        return creatorElement.innerText;
    }
    else {
        return "";
    }
}
function blockProject(project) {
    // When a project is on a slider on the home page treat it specially so that it doesn't break the sliding
    // Setting `display: none;` really breaks them
    // This instead will cover them up so you can't see it and scrolling doesn't break.
    if (project.classList.contains("slick-slide")) {
        project.style.position = "relative";
        // Create a div that will cover up the element
        var overlay = document.createElement("div");
        overlay.style.position = "absolute";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.zIndex = "9999";
        overlay.style.backgroundColor = "white";
        // And append it
        project.appendChild(overlay);
    }
    else {
        // Otherwise we should hide them the normal way
        project.style.display = "none";
    }
}
var NoMoreFurries = /** @class */ (function () {
    function NoMoreFurries() {
        this.projects = [];
        this.filters = [];
        this.blockedFurries = 0;
        // Project list calls this.handlePush() when .push() is called
        var self = this;
        this.projects.push = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
                var thing = args_1[_a];
                self.handlePush(thing);
            }
            return (_b = Array.prototype.push).apply.apply(_b, [this].concat(args));
            var _b;
        };
        // Add in our filters
        this.addFilters();
        // Create the observer
        var observer = new MutationObserver(this.handleMutation.bind(this));
        observer.observe(document.body, {
            // Look for any DOM changes
            childList: true,
            subtree: true
        });
    }
    //
    // HANDLING THINGS
    //
    NoMoreFurries.prototype.handleMutation = function (mutationList) {
        for (var _i = 0, mutationList_1 = mutationList; _i < mutationList_1.length; _i++) {
            var mutation = mutationList_1[_i];
            for (var i = 0; i < mutation.addedNodes.length; i++) {
                var el = mutation.addedNodes[i];
                if (isProject(el)) {
                    this.projects.push(el);
                }
            }
        }
    };
    NoMoreFurries.prototype.handlePush = function (project) {
        var title = getProjectTitle(project);
        var creator = getProjectCreator(project);
        for (var _i = 0, _a = this.filters; _i < _a.length; _i++) {
            var filter = _a[_i];
            var result = filter(title, creator);
            if (result) {
                console.log("blocked '" + title + "' by " + creator);
                blockProject(project);
                this.blockedFurries++;
            }
        }
    };
    //
    // FILTERS
    //
    NoMoreFurries.prototype.addFilter = function (filter) {
        this.filters.push(filter);
    };
    NoMoreFurries.prototype.addFilters = function () {
        this.addFilter(this.creatorFilter);
        this.addFilter(this.titleFilter);
        this.addFilter(this.caseSensitiveTitleFilter);
        this.addFilter(this.regexTitleFilter);
    };
    NoMoreFurries.prototype.creatorFilter = function (title, creator) {
        return BLOCKED_CREATORS.indexOf(creator) > -1;
    };
    NoMoreFurries.prototype.titleFilter = function (title, creator) {
        // Convert everything to lower case to avoid case sensitivity
        title = title.toLowerCase();
        for (var _i = 0, BLOCKED_TITLE_PARTS_1 = BLOCKED_TITLE_PARTS; _i < BLOCKED_TITLE_PARTS_1.length; _i++) {
            var i = BLOCKED_TITLE_PARTS_1[_i];
            if (title.indexOf(i.toLowerCase()) > -1) {
                return true;
            }
        }
        return false;
    };
    NoMoreFurries.prototype.caseSensitiveTitleFilter = function (title, creator) {
        // Pretty much #titleFilter()
        for (var _i = 0, BLOCKED_TITLE_PARTS_SENSITIVE_1 = BLOCKED_TITLE_PARTS_SENSITIVE; _i < BLOCKED_TITLE_PARTS_SENSITIVE_1.length; _i++) {
            var i = BLOCKED_TITLE_PARTS_SENSITIVE_1[_i];
            if (title.indexOf(i) > -1) {
                return true;
            }
        }
        return false;
    };
    NoMoreFurries.prototype.regexTitleFilter = function (title, creator) {
        for (var _i = 0, BLOCKED_TITLE_REGEX_1 = BLOCKED_TITLE_REGEX; _i < BLOCKED_TITLE_REGEX_1.length; _i++) {
            var i = BLOCKED_TITLE_REGEX_1[_i];
            if (i.test(title)) {
                return true;
            }
        }
        return false;
    };
    return NoMoreFurries;
}());
new NoMoreFurries();
// You can move this wherever you want so I put at the bottom
// It just looks cleaner
// ==UserScript==
// @name         NO MORE FURRIES
// @version      2.1
// @namespace    https://garbomuffin.github.io/userscripts/no-more-furries/
// @description  FURRIES AREN'T MEMES
// @author       GarboMuffin
// @match        https://scratch.mit.edu/*
// @run-at       document-end
// @downloadURL  https://garbomuffin.github.io/userscripts/no-more-furries/no-more-furries.user.js
// @updateURL    https://garbomuffin.github.io/userscripts/no-more-furries/no-more-furries.user.js
// ==/UserScript==
