// directly copy+pasted from the original
const LEVELS:string[] = [
  "bbbbbbcbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbbbcbbbbbbbbcbbbbbbcbbcbbcbbbbbbbbbbbbbcbbbbbbbbccbbbbbbbbaaaaaaaaaaaaaaaabbcccbbbbabbb.................cccbbbbaa.bb..................abbbcba...bb...................bbbba....bbb..................aaaa.....bbc...........................bbb...........................bbb...........................bbbb..........................bbbb..........................cbbb..........................bbbb..........................bbbbb.........................bcbbb.........................bbbbbb........................bbbbcbb.......................bbbbbbbb..b...................cbbbbbbbbbb...................aaaaaaaaaaa.................................................",
  "bbbbbbcbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbbccccccccbbcbbbbbbbbbcbbcbccccccbbbbbbcccbbbbbbcbbbbbaabcbbbaaaaaaaaabcccbbbbbaaaaa..acccc.........bbbccbbba........aaaa.........abbbccbb......................dabbbccb........................abbbcc.........................aabba...........................aa.............................................................................................................................................................................................................................................................................................................................................................................................................",
  "bbbbbbbbbbbbcbbbbbbcbbbbbbbbbbbbbbbbbbbbccbbbbbccbbbbbbbbbbbbcbcbcbcbbcbbbbbcbbbbbbbbbbbbbaaaaaaaabbbbbbbbbbbbbbbccbbbbb........bbbbaaacbbbbbbcbbbbbbc.......hcccc...abbbbbbbbbbcbbb........aaaa....bbbbbbbbbbbbbb................abccbbbbbbbbbb.................abbbcbbbbcbbb..................aaaaabbbbcbb.......................abbbbbb........................aabbbb..........................bbbb..........................aaaa...........................e..................................................................................................................................................................................................................................................",
  "cccccccccccccccccccccccccbbcbbcccccccccccccccccccccccccbbcbbcccccccccccccccccccccccccbbccbcccccccccccccccccccccccccbbcbbcccccccccccccccccccccccccbbcbbcccccccccccccccccccccccccbbcbbcccccccccccccccccccccccccbbcbbcccccccccccccccccccccccccbbcbbcccccccccccccccccccccccccbbcbbaaaacccccccccccccccccccccbbcbb....aaaaaaccaaaacccccccccbbcbb..........aa....aacccccccbbcbb...........f......aaaaaccbbcbb...................f...aabbcbb.......................f.accbb..........................acbb...........................cbb...........................abb............................aa........................................................................................................................",
  "ccccccccccccccccbcccccccccccccccccccccccbbcccccccccccccccaaaccccbbbcccccccccccccbaaaaaa...cccccccccccccccccccbg.d.......ccccccccccccccccccccbcc.......ccccccccccccaaaacccccccb......cccccccccccb....aaacccccbb....ccccccccccccb......aaaccccb...ccccccccaacccb.......faacccb..ccccccca..aacb..........acca..ccccccb...f.aa...........aa...cccccccb......................cccaacccbbb...................ccb..accccca..................ccb...accaa...................ccbb...aa.f...................ccba..........................cca...........................aa....................................................................................................................................................",
  "aaaaaaaccccccccccccaaaaabbbbbb.......bcaaaaaaaaaa.....c..e.b.......aa...............c....b..................i.....cccbbb........................c..e.b.....................i..c....b........................cccccb.......................icccccb........................bbbbbb........................aaaacc............................aa........................................................................................................................................................................................................................................................................................................................................................................",
  "cccccccccccbbbbbbcccccccccccccccccccccccbccccccbbbbbbccccccccccccccccbccbbbbcccccccbccccccccccccccbccbccccbbbbbbccbcccccccccccccbcbccccbccccccbccbccccccccccccbcbccccbcbbbbccbccbcccccccccccbccbcccbcbcccbcbbcbcccccccccccbcccbbbccbcccbcbcccccccccccccccbbcccccbccaabbcccccccccccccaaaccbbcbaaaa..bbccaaaccaaaaaa...accbcb..f...bbcb...aa.........faaaaa......bbbb..........................aaaa.............................f...................................................................................................................................................................................................................................................................................",
  "ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccaaaaaaaaaaaccccccccccccccccccb...........bccaaaaaacccccccccb...........aaa......bccccccccb............j.......aaaccccccb.....................j.aaaccaa........................j.aa........................................................................................................................................................................................................................................................................................................................................................................",
  "cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccaaaaaaaaaaaaccccccccccccccaaaa..........k.aaaacccccccaaa....................aaaccaa..........................aa........................................................................................................................................................................................................................................................................................................................................................................",
  "cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbccccccccccccbbbbccccccccccb..bccccccccccccb..bcccccaaabab..aabbbbbbbbbbab..bbabbb............................bb............................bb............................bb............................bb............................bb............................bb............................bb............................bb............................bb............................bb............................aa..............................",
  "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbaababaaaaababbaaababaabababaaa.........................mmmmm.........................lllll.........................lllll.........................lllll.........................lllll.........................lllll.........................lllll........................mmmmmm.........................mmmmm..............................................................................................................................................................................................................................................................................",
  "ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooppppppoooooooooooooooooooooooo......oooooooooooo.........q.................ooo...........................ooo.lll.lll.lll.l..l.lll.lll.looo.lll.lll.lll.l..l.lll.lll.looo.lll.lll.lll.l..l.lll.lll.looo.lll.lll.lll.l..l.lll.lll.looo.lll.lll.lll.l..l.lll.lll.lll..lll.lll.lll.l..l.lll.lll.lll..lll.lll.lll.l..l.lll.lll.lll..lll.lll.lll.l..l.lll.lll.lll..lll.lll.lll.l..l.lll.lll.lll..lll.lll.lll.l..l.lll.lll.lll..lll.lll.lll.l..l.lll.lll.lll.............................................................mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm",
];

const TEXTS:TextOptions[][] = Array(LEVELS.length);
// TEXTS[0] = [{
//   text: "GROUNDROLL GRAHM",
//   y: 88,
//   size: 32,
//   center: true,
// }, {
//   text: "And the stale memes.",
//   y: 104,
//   center: true,
// }];
