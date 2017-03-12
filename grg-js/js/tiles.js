// normal blocks
const GRASS_TILE = { texture: "tiles/grass.png" };
const DIRT_TILE = { texture: "tiles/dirt.png" };
const UNKNOWN_TILE = { texture: "tiles/unknown.png" };
// non solid variants
const NONSOLID_DIRT_TILE = Object.assign({}, DIRT_TILE, { solid: false });
const ARROW_TILE = { texture: "tiles/arrow.png", type: ArrowTile };
// things that are interactable or whatever
const BOX_TILE = { texture: "tiles/box/1.png", type: BoxTile };
const UPGRADE_TILE = { texture: "tiles/upgrade.png", solid: false, type: UpgradeTile };
// enemies
const LARGE_SMILEY = { texture: "enemy/face.png", type: LargeSmiley };
const POKERFACE = { texture: "enemy/face2.png", type: Pokerface };
const TILES = {
    a: GRASS_TILE,
    b: DIRT_TILE,
    c: NONSOLID_DIRT_TILE,
    d: BOX_TILE,
    e: LARGE_SMILEY,
    g: UPGRADE_TILE,
    f: POKERFACE,
    i: UNKNOWN_TILE,
    j: UNKNOWN_TILE,
    h: ARROW_TILE,
};
