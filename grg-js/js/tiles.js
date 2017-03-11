// normal blocks
const GRASS_TILE = { texture: "tiles/grass.png" };
const DIRT_TILE = { texture: "tiles/dirt.png" };
const ARROW_TILE = { texture: "tiles/arrow.png", solid: false };
// non solid variants
const NONSOLID_DIRT_TILE = Object.assign({}, DIRT_TILE, { solid: false });
// things that are interactable or whatever
const BOX_TILE = { texture: "tiles/box/1.png", type: BoxTile };
// enemies
const LARGE_SMILEY = { texture: "enemy/face.png", type: LargeSmiley };
const TILES = {
    "a": GRASS_TILE,
    "b": DIRT_TILE,
    "c": NONSOLID_DIRT_TILE,
    "d": BOX_TILE,
    "e": LARGE_SMILEY,
    "h": ARROW_TILE,
};
