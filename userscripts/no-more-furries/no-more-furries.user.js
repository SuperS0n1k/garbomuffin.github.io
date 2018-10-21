/*
 * v2.2.4 changelog: filter updates
 * 
 * See this in action:
 * https://scratch.mit.edu/search/projects?q=meme
 * https://scratch.mit.edu/search/projects?q=fursona
 * https://scratch.mit.edu/search/projects?q=furry
 * https://scratch.mit.edu/search/projects?q=OC
 * 
 * satire (noun): the use of irony, sarcasm, ridicule, or the like, in exposing, denouncing, or deriding vice, folly, etc.
 */

// ==UserScript==
// @name         NO MORE FURRIES
// @version      2.2.4
// @namespace    https://garbomuffin.github.io/userscripts/no-more-furries/
// @description  FURRIES AREN'T MEMES
// @author       GarboMuffin
// @match        https://scratch.mit.edu/*
// @run-at       document-end
// @downloadURL  https://garbomuffin.github.io/userscripts/no-more-furries/no-more-furries.user.js
// @updateURL    https://garbomuffin.github.io/userscripts/no-more-furries/no-more-furries.user.js
// ==/UserScript==

const DEBUG = false;

///
/// Filters
///

// In the context of Scratch, I am roughly defining a furry as anything that is related to:
// a) actual IRL furries
// b) the warrior cats series
// c) cat-like OCs
// d) just OCs in general
// e) anything I decide is a furry when I look at their projects page

// I like to imagine that someday people on this list, or people who know them, will search for their name on GitHub and find this.
// That would be quite funny.

// List of users that have a history of making or remixing furries
// Note: for the projects listed I went to their project list and picked a few projects with thumbnails of furries
const BLOCKED_CREATORS = [
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

  // https://scratch.mit.edu/projects/194837420/
  // https://scratch.mit.edu/projects/195023355/
  "gulug",

  // https://scratch.mit.edu/projects/190498658/
  // https://scratch.mit.edu/projects/194378828/
  "Wolf2ooAlt",

  // https://scratch.mit.edu/projects/195268878/
  // https://scratch.mit.edu/projects/194814866/
  "BrightShine",

  // https://scratch.mit.edu/projects/206127830/
  // https://scratch.mit.edu/projects/206662030/
  // https://scratch.mit.edu/projects/205686276/
  // https://scratch.mit.edu/projects/205212008/
  "Lil_Art",

  // https://scratch.mit.edu/projects/142359902/
  // moved to https://scratch.mit.edu/users/scentedsope/, no furries yet on that account (as of now)
  "NyanSpells",

  // https://scratch.mit.edu/projects/235763172/
  // https://scratch.mit.edu/projects/228284052/
  "TheGamingKitten",

  // https://scratch.mit.edu/projects/132800012/
  // https://scratch.mit.edu/projects/171754876/
  "-magpie-",

  // https://scratch.mit.edu/projects/234775554/
  // https://scratch.mit.edu/projects/228279171/
  "Starri_Dragoonie",

  // https://scratch.mit.edu/projects/164197018/
  // https://scratch.mit.edu/projects/201306756/
  "Kittydog098",

  // https://scratch.mit.edu/projects/230192353/
  // https://scratch.mit.edu/projects/224267099/
  "firepaw_rusty",

  // https://scratch.mit.edu/projects/167027025/
  // https://scratch.mit.edu/projects/170272284/
  "chai_tea",

  // https://scratch.mit.edu/projects/201041708/
  // https://scratch.mit.edu/projects/218241595/
  "Greninja714",

  // https://scratch.mit.edu/projects/181410477/
  // https://scratch.mit.edu/projects/196706671/
  "hashtagPROSKILLZ21",

  // https://scratch.mit.edu/projects/208496836/
  // https://scratch.mit.edu/projects/217515361/
  "Chociily",

  // https://scratch.mit.edu/projects/225879169/
  // https://scratch.mit.edu/projects/216229529/
  "diinosaurr",

  // https://scratch.mit.edu/projects/173602233/
  // https://scratch.mit.edu/projects/174252194/
  "mint_soap",

  // https://scratch.mit.edu/projects/86124700/
  // https://scratch.mit.edu/projects/86129074/
  "Flowerfang",

  // https://scratch.mit.edu/projects/51357582/
  // https://scratch.mit.edu/projects/30600180/
  "Foxgirlgamer",

  // https://scratch.mit.edu/projects/25082008/
  // https://scratch.mit.edu/projects/23551330/
  "Evroshka",

  // https://scratch.mit.edu/projects/1755264/
  // https://scratch.mit.edu/projects/1624228/
  "hollyice14",

  // https://scratch.mit.edu/projects/230443955/
  // https://scratch.mit.edu/projects/235239361/
  "-CloudJump-",

  // https://scratch.mit.edu/projects/188288906/
  // https://scratch.mit.edu/projects/197648526/
  "ashlynsh88",

  // https://scratch.mit.edu/projects/124088158/
  // https://scratch.mit.edu/projects/144732703/
  "starcub",

  // https://scratch.mit.edu/projects/235643589/
  // https://scratch.mit.edu/projects/235779436/
  "munny766",

  // this guy shows up in the search results for "furry" like 20 times in a row
  // https://scratch.mit.edu/projects/160789963/
  // https://scratch.mit.edu/projects/165543398/
  // https://scratch.mit.edu/projects/177736682/
  // https://scratch.mit.edu/projects/210914547/
  // https://scratch.mit.edu/projects/166175509/
  // https://scratch.mit.edu/projects/171549402/
  // https://scratch.mit.edu/projects/167745934/
  // https://scratch.mit.edu/projects/214510519/
  "kirtmew",

  // https://scratch.mit.edu/projects/224941038/
  // https://scratch.mit.edu/projects/219112535/
  "bluemoonfishy",

  // https://scratch.mit.edu/projects/24546482/
  // https://scratch.mit.edu/projects/26013777/
  "kaotheroogoncreator",

  // https://scratch.mit.edu/projects/187740881/
  // https://scratch.mit.edu/projects/186492965/
  "ll_turtledove_ll",

  // https://scratch.mit.edu/projects/173182897/
  // https://scratch.mit.edu/projects/172794424/
  "chiimera",

  // https://scratch.mit.edu/projects/238961319/
  // https://scratch.mit.edu/projects/238466044/
  "pixeIi",

  // https://scratch.mit.edu/projects/240514793/
  // https://scratch.mit.edu/projects/239402803/
  "mystical_poodle",

  // https://scratch.mit.edu/projects/241953547/
  // https://scratch.mit.edu/projects/240906525/
  "zenzilla",

  // https://scratch.mit.edu/projects/243766224/
  // https://scratch.mit.edu/projects/237608063/
  "Jilly65",

  // https://scratch.mit.edu/projects/239686555/
  // https://scratch.mit.edu/projects/237637465/
  "AngerRockz",

  // https://scratch.mit.edu/projects/195311405/
  // https://scratch.mit.edu/projects/239405972/
  "-AmberKitti-",

  // https://scratch.mit.edu/projects/242092874/
  // https://scratch.mit.edu/projects/240632157/
  "GryffindorOwlie",

  // how does this person have 400 followers with 2 projects? unshared projects?
  // https://scratch.mit.edu/projects/109800398/
  // https://scratch.mit.edu/projects/112823240/
  "-Rainbow-345",

  // https://scratch.mit.edu/projects/241335602/
  // https://scratch.mit.edu/projects/229521802/
  "CocoChco",

  // contributed to https://scratch.mit.edu/projects/241335602/: https://scratch.mit.edu/projects/230517653/
  // https://scratch.mit.edu/projects/239295165/
  // https://scratch.mit.edu/projects/245942753/
  "Doodle-Chan",

  // contributed to https://scratch.mit.edu/projects/241335602/: https://scratch.mit.edu/projects/235682581/
  // https://scratch.mit.edu/projects/238861101/
  // https://scratch.mit.edu/projects/239555587/
  "-CinnamonSticks-",

  // contributed to https://scratch.mit.edu/projects/241335602/: https://scratch.mit.edu/projects/230514697/
  // https://scratch.mit.edu/projects/228643485/
  // https://scratch.mit.edu/projects/226519095/
  "Heuky",

  // contributed to https://scratch.mit.edu/projects/241335602/
  // https://scratch.mit.edu/projects/244292053/
  // https://scratch.mit.edu/projects/239459982/
  "FlookBunn",

  // contributed to https://scratch.mit.edu/projects/241335602/: https://scratch.mit.edu/projects/230797447/
  // https://scratch.mit.edu/projects/236064348/
  // https://scratch.mit.edu/projects/206706659/
  "Sophie-o-",

  // contributed to https://scratch.mit.edu/projects/241335602/ - https://scratch.mit.edu/projects/236876388/
  // https://scratch.mit.edu/projects/235945383/
  // https://scratch.mit.edu/projects/239890847/
  "3Dmension",

  // contributed to https://scratch.mit.edu/projects/241335602/ - https://scratch.mit.edu/projects/236351644/
  // https://scratch.mit.edu/projects/236429146/
  // https://scratch.mit.edu/projects/230411202/
  "TheMustachePony2",

  // contributed to https://scratch.mit.edu/projects/241335602/ - https://scratch.mit.edu/projects/230691517/
  // https://scratch.mit.edu/projects/246619359/
  // https://scratch.mit.edu/projects/246818412/
  "circolair",

  // contributed to https://scratch.mit.edu/projects/241335602/ - https://scratch.mit.edu/projects/236302245/
  // https://scratch.mit.edu/projects/223938544/
  // https://scratch.mit.edu/projects/223353230/
  "ECLYPSA",

  // contributed to https://scratch.mit.edu/projects/241335602/ - https://scratch.mit.edu/projects/244086608/
  // https://scratch.mit.edu/projects/229033770/
  // https://scratch.mit.edu/projects/229509272/
  "-_happiness_-",

  // contributed to https://scratch.mit.edu/projects/241335602/ - https://scratch.mit.edu/projects/245191235/
  // https://scratch.mit.edu/projects/238407547/
  // https://scratch.mit.edu/projects/238233844/
  "Olivegreensky",

  // https://scratch.mit.edu/projects/229834583/
  // https://scratch.mit.edu/projects/235972666/
  "kittencat15",

  // https://scratch.mit.edu/projects/247833571/
  // https://scratch.mit.edu/projects/252269238/
  "-JaelynDraws-",

  // https://scratch.mit.edu/projects/250800272/
  // https://scratch.mit.edu/projects/252440126/
  "-StarrySkies-",

  // https://scratch.mit.edu/projects/251629336/
  // https://scratch.mit.edu/projects/252289625/
  "-Minascal-",

  // https://scratch.mit.edu/projects/249394322/
  // https://scratch.mit.edu/projects/252464785/
  "-Trash_Cat-",

  // https://scratch.mit.edu/projects/240966009/
  // https://scratch.mit.edu/projects/239397729/
  "Animal_360",

  // https://scratch.mit.edu/projects/250122751/
  // https://scratch.mit.edu/projects/249817154/
  "Akiko_Takayuki",

  // https://scratch.mit.edu/projects/235604220/
  // https://scratch.mit.edu/projects/230414818/
  "-No-Face-",

  // https://scratch.mit.edu/projects/251365513/
  // https://scratch.mit.edu/projects/251972714/
  "kittenkid",

  // https://scratch.mit.edu/projects/189144969/
  // https://scratch.mit.edu/projects/181492339/
  "Dellora",

  // https://scratch.mit.edu/projects/239670147/
  // https://scratch.mit.edu/projects/226917760/
  "tailsthefox3gt",

  // https://scratch.mit.edu/projects/224157452/
  // https://scratch.mit.edu/projects/207569898/
  "redtrueblue",

  // https://scratch.mit.edu/projects/253126482/
  // https://scratch.mit.edu/projects/230353468/
  "ItsMrFloof",

  // https://scratch.mit.edu/projects/225158324/
  // https://scratch.mit.edu/projects/224601036/
  "Artemis_quail",

  // https://scratch.mit.edu/projects/177468039/
  // https://scratch.mit.edu/projects/174118007/
  "firefang16",

  // https://scratch.mit.edu/projects/228667347/
  // https://scratch.mit.edu/projects/238024835/
  "Derpspace5",

  // https://scratch.mit.edu/projects/238967981/
  // https://scratch.mit.edu/projects/229436617/
  "-sobbinqq-",

  // https://scratch.mit.edu/projects/224553151/
  // https://scratch.mit.edu/projects/225676859/
  "queen-crowley",

  // https://scratch.mit.edu/projects/229701098/
  // https://scratch.mit.edu/projects/224375383/
  "MlpSunnySprinkles",

  // https://scratch.mit.edu/projects/206981864/
  // https://scratch.mit.edu/projects/200830323/
  "SmokeBlaze",

  // https://scratch.mit.edu/projects/180457410/
  // https://scratch.mit.edu/projects/116321894/
  "FastFelly",

  // https://scratch.mit.edu/projects/251973891/
  // https://scratch.mit.edu/projects/253878780/
  "WinterFern",

  // https://scratch.mit.edu/projects/237964472/
  // https://scratch.mit.edu/projects/245179339/
  "Nightstarwarriorcat",

  // https://scratch.mit.edu/projects/226544848/
  // https://scratch.mit.edu/projects/226751452/
  "-BrokenArrows-",

  // https://scratch.mit.edu/projects/246446786/
  // https://scratch.mit.edu/projects/248445214/
  "Faststar712225",

  // https://scratch.mit.edu/projects/235608333/
  // https://scratch.mit.edu/projects/235614488/
  "-snoweii-",

  // https://scratch.mit.edu/projects/238358407/
  // https://scratch.mit.edu/projects/235481210/
  "Stormhunters_the_OC",

  // https://scratch.mit.edu/projects/201735615/
  // https://scratch.mit.edu/projects/213304927/
  "ThunderPaw123",

  // https://scratch.mit.edu/projects/253112453/
  // https://scratch.mit.edu/projects/252313552/
  "RoboDog31",

  // https://scratch.mit.edu/projects/252251706/
  // https://scratch.mit.edu/projects/247304305/
  "PrincessLunaTheFox",

  // https://scratch.mit.edu/projects/247922150/
  // https://scratch.mit.edu/projects/247919157/
  "Eeveenorsylveon",

  // https://scratch.mit.edu/projects/250893574/
  // https://scratch.mit.edu/projects/249894082/
  "UndertalCupheadK-DOG",

  // https://scratch.mit.edu/projects/252714943/
  // https://scratch.mit.edu/projects/252698142/
  "Aquaraqueen",

  // https://scratch.mit.edu/projects/250423853/
  // https://scratch.mit.edu/projects/252249376/
  "t0oth1e5s",

  // https://scratch.mit.edu/projects/252213752/
  // https://scratch.mit.edu/projects/252323951/
  "kirah201",

  // https://scratch.mit.edu/projects/252426269/
  // https://scratch.mit.edu/projects/253108181/
  "eboha9824",

  // https://scratch.mit.edu/projects/237419168/
  // https://scratch.mit.edu/projects/237703344/
  "Bandit_Da_Demon-Wolf",

  // https://scratch.mit.edu/projects/207639679/
  // https://scratch.mit.edu/projects/207079864/
  "LeoGoatLeopard",

  // https://scratch.mit.edu/projects/237778903/
  // https://scratch.mit.edu/projects/140079973/
  "Rookka",

  // https://scratch.mit.edu/projects/127303674/
  // https://scratch.mit.edu/projects/116339264/
  "55fingers",

  // https://scratch.mit.edu/projects/254276927/
  // https://scratch.mit.edu/projects/251690102/
  "Wildyuri",

  // https://scratch.mit.edu/projects/251898270/
  // https://scratch.mit.edu/projects/248228793/
  "Red_of_Life",

  // https://scratch.mit.edu/projects/159976354/
  // https://scratch.mit.edu/projects/164496520/
  "qolden",

  // https://scratch.mit.edu/projects/253567951/
  // https://scratch.mit.edu/projects/254133298/
  "Monstrous_Legos",

  // https://scratch.mit.edu/projects/195925290/
  // https://scratch.mit.edu/projects/197664224/
  "hazelkittens",

  // https://scratch.mit.edu/projects/246482201/
  // https://scratch.mit.edu/projects/245222794/
  "TheSwagCake",

  // https://scratch.mit.edu/projects/252425563/
  // https://scratch.mit.edu/projects/245108694/
  "FluffyMiuku",

  // https://scratch.mit.edu/projects/249226047/
  // https://scratch.mit.edu/projects/242552805/
  "-sharqbiirb-",

  // https://scratch.mit.edu/projects/251797383/
  // https://scratch.mit.edu/projects/251644553/
  "jelcow5",

  // https://scratch.mit.edu/projects/247908559/
  // https://scratch.mit.edu/projects/244916317/
  "White-Tea",

  // https://scratch.mit.edu/projects/246790419/
  // https://scratch.mit.edu/projects/247087893/
  "Tickinq",

  // https://scratch.mit.edu/projects/183431337/
  // https://scratch.mit.edu/projects/145306324/
  "PetalsSilversteam",

  // https://scratch.mit.edu/projects/251828013/
  // https://scratch.mit.edu/projects/251343211/
  "totallynotcake",

  // https://scratch.mit.edu/projects/247973835/
  // https://scratch.mit.edu/projects/253512441/
  "Taffluffy",

  // https://scratch.mit.edu/projects/251969620/
  // https://scratch.mit.edu/projects/239736179/
  "bandaiid",

  // https://scratch.mit.edu/projects/250861025/
  // https://scratch.mit.edu/projects/253132276/
  "Dogcatgaming",

  // https://scratch.mit.edu/projects/164866669/
  // https://scratch.mit.edu/projects/250867086/
  "-Pupsi-",

  // https://scratch.mit.edu/projects/249465650/
  // https://scratch.mit.edu/projects/252402821/
  "munge7-",

  // https://scratch.mit.edu/projects/250792789/
  // https://scratch.mit.edu/projects/235508674/
  "-StarryyEyed-",

  // https://scratch.mit.edu/projects/251988091/
  // https://scratch.mit.edu/projects/250858099/
  "Whitepiine",

  // https://scratch.mit.edu/projects/247126870/
  // https://scratch.mit.edu/projects/247369798/
  "CorgiNerd",

  // https://scratch.mit.edu/projects/252199728/
  // https://scratch.mit.edu/projects/226473932/
  "DitzyTDD",

  // https://scratch.mit.edu/projects/254126458/
  // https://scratch.mit.edu/projects/254255474/
  "Crystal435",

  // https://scratch.mit.edu/projects/250842707/
  // https://scratch.mit.edu/projects/251296749/
  "123scratchmo456",

  // https://scratch.mit.edu/projects/254081259/
  // https://scratch.mit.edu/projects/254223852/
  "Meow_kittycat_Meow",

  // https://scratch.mit.edu/projects/246421505/
  // https://scratch.mit.edu/projects/253835341/
  "petcool13",
];

// Strings that can't be in titles or else the project is blocked
const BLOCKED_TITLE_PARTS = [
  // I don't know why but "meme" creators like to declare that their furry is a meme
  // TODO: examples
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

  // https://scratch.mit.edu/projects/78985318/
  // https://scratch.mit.edu/projects/83195632/
  // https://scratch.mit.edu/projects/26140290/
  // https://scratch.mit.edu/projects/15190786/
  // https://scratch.mit.edu/projects/44354200/
  // https://scratch.mit.edu/projects/148398500/
  // https://scratch.mit.edu/projects/2338008/
  // https://scratch.mit.edu/projects/29214560/
  // https://scratch.mit.edu/projects/768502/
  // https://scratch.mit.edu/projects/41985086/
  // https://scratch.mit.edu/projects/57097926/
  // https://scratch.mit.edu/search/projects?q=warrior%20cats
  "warrior cat",

  // names of clans/cats from the warrior cats serious
  // very incomprehensive, doesn't seem to do very much
  "tigerclaw",
  "thunderclan",
];

// Regular expressions that will block projects whose titles it matches
const BLOCKED_TITLE_REGEX = [
  // https://scratch.mit.edu/search/projects?q=OC
  // https://scratch.mit.edu/projects/139255469/
  // https://scratch.mit.edu/projects/159107612/
  // some amount of false positives can be accepted
  /\bOC\b/i,

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
  /original[^a-zA-Z]meme/i,

  // https://scratch.mit.edu/projects/2452235/
  // https://scratch.mit.edu/projects/14903220/
  // https://scratch.mit.edu/projects/117850621/
  // https://scratch.mit.edu/projects/197761706/
  // https://scratch.mit.edu/projects/156887428/
  // https://scratch.mit.edu/projects/73857810/
  // https://scratch.mit.edu/projects/80057540/
  // https://scratch.mit.edu/projects/117431969/
  // https://scratch.mit.edu/projects/1169042/
  // https://scratch.mit.edu/projects/117255678/
  // https://scratch.mit.edu/projects/69244012/
  // https://scratch.mit.edu/projects/196710485/
  // https://scratch.mit.edu/projects/87337446/
  // https://scratch.mit.edu/projects/114632998/
  // https://scratch.mit.edu/search/projects?q=fursona
  /\bfursona\b/i,

  // https://scratch.mit.edu/projects/99524301/
  // https://scratch.mit.edu/projects/92689750/
  // https://scratch.mit.edu/projects/68005926/
  // https://scratch.mit.edu/projects/160789963/
  // https://scratch.mit.edu/search/projects?q=furry
  /\bfurry\b/i,
];

// debug: warn about potentially bad entries in the filters
if (DEBUG) {
  BLOCKED_CREATORS.forEach((value, index) => {
    // if the first occurence of this name in the list is not this occurence, then it appears more than once
    const firstIndex = BLOCKED_CREATORS.indexOf(value)
    if (firstIndex !== index) {
      console.warn(`Found duplicate: '${value}' @ index ${index} but first occurence @ index ${firstIndex}`);
    }
    // AFAIK usernames can only contain a-z (case insensitive), _, -, and numbers.
    if (!/^[a-zA-z_\-0-9]+$/.test(value)) {
      console.warn(`Found possible invalid username: '${value}' @ index ${index}`);
    }
  });
}

///
/// Functions
///

// Returns if an HTMLElement is a project
function isProject(el) {
  // If an element has the "project" class they are a project
  return el.classList && el.classList.contains("project");
}

// Returns the title of a project given its element in the DOM
function getProjectTitle(el) {
  // Get the thumbnail and title container
  // Will contain the thumbnail image and title
  const titleContainer = el.getElementsByClassName("thumbnail-title")[0];
  // Safety check
  if (!titleContainer) {
    return "";
  }

  // Get the first link in the container
  // This is the title
  const titleElement = titleContainer.getElementsByTagName("a")[0];
  // Safety check
  if (!titleElement) {
    return "";
  }
  // Return the contents
  return titleElement.innerHTML;
}

// Returns the creator of a project given its element in the DOM
function getProjectCreator(el) {
  const creatorElement = el.getElementsByClassName("thumbnail-creator")[0];
  if (!creatorElement) {
    return "";
  }
  return creatorElement.innerText;
}

// Returns the link to a project given its element in the DOM
function getProjectLink(el) {
  const links = el.getElementsByTagName("a");
  if (links.length >= 1) {
    return links[0].href;
  }
  return "";
}

// Blocks a project in the DOM
function blockProject(project) {
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

  // Change the "src" attributes to of images to prevent them from loading
  // The image is invisible but browsers will still download the thumbnail slowing down the rest of the page
  const images = project.getElementsByTagName("img");
  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    image.src = "";
  }
}

// Given a title and an author it determines if that project is filtered
// Uses the filter definitions at the top
function isFiltered(title, creator) {
  function creatorFilter(creator) {
    // If the BLOCKED_CREATORS list contains the creator's name they are blocked
    return BLOCKED_CREATORS.indexOf(creator) > -1;
  }

  function titleFilter(title) {
    // Convert everything to lower case to avoid case sensitivity
    title = title.toLowerCase();
    for (const i of BLOCKED_TITLE_PARTS) {
      // If the title contains any of the things in the BLOCKED_TITLE_PARTS then it is blocked
      // This filter is case insensitive due to the toLowerCase()
      if (title.indexOf(i.toLowerCase()) > -1) {
        return true;
      }
    }
    return false;
  }

  function regexTitleFilter(title) {
    // titleFilter() but for regular expressions
    for (const i of BLOCKED_TITLE_REGEX) {
      if (i.test(title)) {
        return true;
      }
    }
    return false;
  }

  return creatorFilter(creator) ||
    titleFilter(title) ||
    regexTitleFilter(title);
}

// Called when the MutationObserver observes a mutation
function handleMutation(mutationList) {
  for (const mutation of mutationList) {
    // Loop over any added nodes
    // Any projects are added to the DOM and will be in addedNodes
    for (const el of mutation.addedNodes) {
      // If it is a project then run the filtering on it
      if (isProject(el)) {
        handleProject(el);
      }
    }
  }
}

// Called if handleMutation detects a new project being added to the DOM
function handleProject(project) {
  // Get metadata
  const title = getProjectTitle(project);
  const creator = getProjectCreator(project);

  // Is it blocked?
  const blocked = isFiltered(title, creator);

  if (blocked) {
    // debug: log blocked projects
    if (DEBUG) {
      console.log(`Blocked '${title}' by ${creator}: ${getProjectLink(project)}`);
    }

    blockProject(project);
  }
}

// Observe DOM changes
// As projects get added to the page they trigger this observer and allow us to block it instantly
const observer = new MutationObserver(handleMutation);
observer.observe(document.body, {
  // Look for any DOM changes, anywhere
  childList: true,
  subtree: true,
});
