/*
 * Maximum height of each level is 30.
 * Maximum width of each level is 23.
 * 
 * The LEVELS array contains arrays which contain strings.
 * Each string is one layer of level.
 * Use keys to mark different blocks.
 * You do not need to include all 30 layers of height. Only what you need.
 * Same goes for width.
 * 
 * You can use the . character to fill the entire layer with the previous block.
 * 
 * Cases do not matter.
 * 
 * Keys and their block:
 * a - grass
 * b - dirt
 * s - stone
 * i - ice
 * 
 * @ - coin
 */
const HEIGHT = 23;
const WIDTH = 30;

var LEVELS = [
  [
    "                            AA",
    "              A    AAAAA    BB",
    "          A   B     BBBB    BB",
    "        AAB   B             BB",
    "       ABBB   BA          @ BB",
    "AAAAAAABBBBAAABBAAAAAAAAAAAABB",
    "B.",
    "B.",
    "B.",
    "B.",
  ],
  [
    "AA            AAA              ",
    "BBA          ABBBA             ",
    "BBBA        ABBBBBA            ",
    "BBBB        BBBBBBB            ",
    "BBBBA      ABBBBBBBA           ",
    "BBBBBAAAAAABBBBBBBBBAAAAAAAAAAA",
    "B.",
    "B.",
    "B.",
    "B.",
  ],
];

// reverse the list so we can just display the stuff easier
for (var i of LEVELS){
  i.reverse();
}
