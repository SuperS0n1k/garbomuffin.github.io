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
 * p - purple stone (darkstone)
 * i - ice ///
 * 
 * @ - coin
 * 1 - fire suit
 * 2 - wind suit
 * 3 - hammer suit
 * 
 * # - switch [makes switch above block]
 * 
 * * - hammer toggled block
 * $ - switch toggled block
 * 
 * ^ - spike facing up
 * V - spike facing down
 */

const LEVELS = [
  [
    "                            AA",
    "              A    AAAAA    BB",
    "          A   B     BBBB    BB",
    "    A   AAB   B             BB",
    "       ABBB   BA          @ BB",
    "AA^A#AABBBBAAABBAAAAAAAAAAAABB",
    "B.",
    "B.",
    "B.",
    "B.",
  ],
  [ 
    "               1",
    "AA            AAA",
    "BBA          ABBBA         II",
    "BBBA        ABBBBBA        II",
    "BBBB        BBBBBBB        II",
    "BBBBA      ABBBBBBBA       II",
    "BBBBBAAAAAABBBBBBBBBA.",
    "B.",
    "B.",
    "B.",
    "B.",
  ],
  [
    "",
    "                        A.",
    "                             B",
    "                             B",
    "                             B",
    "                             B",
    "                             B",
    "                             B",
    "                             B",
    "                    AAAA     B",
    "                   ABBBB     B",
    "                   BBBBB     B",
    "                  ABBBBB     B",
    "                 ABBBBBB     B",
    "               AABBB BBB  AAAB",
    "             AABBBB  BBB    II",
    "       AAA   BBBB    BBB    II",
    "      ABBBA  BB       BB    II",
    "      BBBBB        @  BB    II",
    "AAAAAABBBBBAAAAAAAAAAABBA.",
    "B.",
    "B.",
    "B.",
    "B.",
  ],
  [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "A",
    "B",
    "B",
    "B",
    "B",
    "B",
    "B",
    "B",
    "B",
    "B",
    "B",
    "B               SS",
    "B               SS    SSS",
    "B                     SSS",
    "B              S",
    "",
    "",
    "             S",
    "AAAAA    SS",
    "BBBBB    SS",
    "SBSBB",
    "SSSSB",
    "SSSSS",
  ],
  [
    "                             C",
    "                             C",
    "                             C",
    "                             C",
    "                             C",
    "                             C",
    "                             C",
    "                         C   C",
    "                             C",
    "                             C",
    "                             C",
    "                             C",
    "                       2     C",
    "                      CCC    C",
    "                             C",
    "                             C",
    "                           C C",
    "      C                      C",
    "                             C",
    "                            C",
    "CCCC     CCCC   C   CCC    C  ",
  ],
  [
    "C",
    "C",
    "C",
    "C",
    "C",
    "C",
    "C",
    "C",
    "C",
    "C",
    "C",
    "C",
    "C",
    "C             CC",
    "C             CC",
    "C             CC",
    "C             CC",
    "C             CC",
    "C             CC           C",
    "C             CC           C",
    "C             CC           C",
    "C             II           C",
    "C             II           C",
    "C             II           C",
    "C             II           C",
    "C     C      AAAA    CCCC",
    "",
    "",
    "CCCC",
  ],
  [
    "          @                  A",
    "        AAAAAA               B",
    "        BBII                AB",
    "        BBII                B.",
    "        BBII                B.",
    "        BBII               AB.",
    "        BBB AA             B.",
    "        BB  BB            AB.",
    "        BB  BB          AAB.",
    "         B  BB       AAAB.",
    "            BB    AAAB.",
    "            BB    B.",
    "            BB    B.",
    "            BB    B.",
    "CCCCCCCCCCC BB    B.",
  ],
  [
    "                             $",
    "                             $",
    "                             $",
    "                             $",
    "                             $",
    "                             $",
    "                             $",
    "A                            $",
    "BAA                          $",
    "BBBA                         $",
    "BBBB                         $",
    "BBBB                         $",
    "B*BB      A#                 $",
    "BABB     ABB           A     $",
    "BBBB     BBS           B     $",
    "BBB       SS          BB     $",
    "BB        S            BB    $",
    "BS                     BB    $",
    "SS#                    B     $",
    "SSS             C#C          $",
    "SSSS                         $",
    "SSSS     CCC           #S    $",
  ],
  [
    "",
    "",
    "",
    "                         *AA",
    "                       SSABSSS",
    "                      S.",
    "                      S.",
    "                      SSS",
    "                      SSS",
    "                      SSS",
    "                      $$$",
    "                      $$$",
    "                      $$$",
    "          P.",
    "      P.",
    "   P.",
    " P.",
    "P.",
  ]
];

const END_LEVEL = [
  "A.",
];

// reverse the list so it can just display the stuff easier
for (var i of LEVELS){
  i.reverse();
}
