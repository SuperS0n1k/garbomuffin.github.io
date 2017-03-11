interface Tile{
  texture?: HTMLImageElement|string
  solid?: boolean
  visible?: boolean
  type?: any//...thing that extends Sprite
}

// normal blocks
const GRASS_TILE:Tile = {texture: "tiles/grass.png"}
const DIRT_TILE:Tile = {texture: "tiles/dirt.png"}
const ARROW_TILE:Tile = {texture: "tiles/arrow.png", solid: false}

// non solid variants
const NONSOLID_DIRT_TILE:Tile = {...DIRT_TILE, solid: false}

// things that are interactable or whatever
const BOX_TILE:Tile = {texture: "tiles/box/1.png", type: BoxTile}

// enemies
const LARGE_SMILEY:Tile = {texture: "enemy/face.png", type: LargeSmiley}

const TILES = {
  "a": GRASS_TILE,
  "b": DIRT_TILE,
  "c": NONSOLID_DIRT_TILE,
  "d": BOX_TILE,
  "e": LARGE_SMILEY,
  "h": ARROW_TILE,
}
