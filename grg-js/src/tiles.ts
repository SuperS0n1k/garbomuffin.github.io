interface Tile{
  texture?: HTMLImageElement|string
  solid?: boolean
  visible?: boolean
  type?: any//...thing that extends Sprite
}

// normal blocks
const GRASS_TILE:Tile = {texture: "tiles/grass.png"}
const DIRT_TILE:Tile = {texture: "tiles/dirt.png"}

const UNKNOWN_TILE:Tile = {texture: "tiles/unknown.png"}

// non solid variants
const NONSOLID_DIRT_TILE:Tile = {...DIRT_TILE, solid: false}
const ARROW_TILE:Tile = {texture: "tiles/arrow.png", type: ArrowTile}

// things that are interactable or whatever
const BOX_TILE:Tile = {texture: "tiles/box/1.png", type: BoxTile}
const UPGRADE_TILE:Tile = {texture: "tiles/upgrade.png", solid: false, type: UpgradeTile}

// enemies
const LARGE_SMILEY:Tile = {texture: "enemy/face.png", type: LargeSmiley}
const POKERFACE:Tile = {texture: "enemy/face2.png", type: Pokerface}

const TILES = {
  a: GRASS_TILE,
  b: DIRT_TILE,
  c: NONSOLID_DIRT_TILE,
  d: BOX_TILE,
  e: LARGE_SMILEY,
  g: UPGRADE_TILE,
  f: POKERFACE,
  i: UNKNOWN_TILE, // TODO
  j: UNKNOWN_TILE, // TODO
  h: ARROW_TILE,
}
