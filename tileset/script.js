'use strict';

function newCanvas(w, h) {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  return canvas;
}

class Tile {
  constructor(im, id) {
    this.img = im;
    this.width = im.width;
    this.height = im.height;
    this.id = id;
  }
}

class Tileset {
  constructor(image, size) {
    const baseCanvas = newCanvas(image.width, image.height);
    const baseCtx = baseCanvas.getContext("2d");
    baseCtx.drawImage(image, 0, 0);

    const tiles = [];

    this.tileWidth = size;
    this.tileHeight = size;

    const height = Math.ceil(image.height / size);
    const width = Math.ceil(image.width / size);
    for (let y = 0; y < height; y++) {
      const row = [];
      for (let x = 0; x < width; x++) {
        const canvas = newCanvas(size, size);
        const ctx = canvas.getContext("2d");
        ctx.translate(-x * size, -y * size);
        ctx.drawImage(baseCanvas, 0, 0);
        const tile = new Tile(canvas, y * width + x);
        row.push(tile);
      }
      tiles.push(row);
    }

    this.tiles = tiles;
  }

  get(n) {
    const tilesPer = this.tiles[0].length;
    const per = Math.floor(n / tilesPer);
    const off = n % tilesPer;
    const group = this.tiles[per];
    if (!group) {
      return;
    }
    return group[off];
  }
}

var tileset = null;
var activeTile = 0;
var map = [[0,1,2]];
var mouseX = 0;
var mouseY = 0;
var mouseDown = [];

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function displayTileset() {
  const tileList = document.getElementById("tilelist");
  while (tileList.firstChild) {
    tileList.removeChild(tileList.firstChild);
  }

  for (const gr of tileset.tiles) {
    const tr = document.createElement("tr");

    for (const ti of gr) {
      const td = document.createElement("td");
      td.appendChild(ti.img);
      td.dataset.id = ti.id;
      td.onclick = function() {
        const previous = tileList.querySelector("[data-id=\"" + activeTile + "\"]");
        if (previous) {
          previous.classList.remove("active");
        }
        activeTile = ti.id;
        td.classList.add("active");
      };
      tr.appendChild(td);
    }

    tileList.appendChild(tr);
  }
}

function loadTileset() {
  const f = document.getElementById("tilesetinput").files[0];
  const fr = new FileReader();
  fr.onload = function() {
    const result = fr.result;
    const img = new Image();
    img.onload = function() {
      tileset = new Tileset(img, 16);
      displayTileset();
    };
    img.src = result;
  };
  fr.readAsDataURL(f);
}
if (document.getElementById("tilesetinput").files.length > 0) {
  loadTileset();
}

function getMouseMapPosition() {
  const mx = Math.floor(mouseX / tileset.tileWidth);
  const my = Math.floor(mouseY / tileset.tileHeight);
  return {x: mx, y: my};
}

function render() {
  requestAnimationFrame(render);

  if (!tileset) {
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let y = 0; y < map.length; y++) {
    const row = map[y];
    for (let x = 0; x < row.length; x++) {
      const tile = tileset.get(row[x]);
      if (!tile) {
        continue;
      }
      ctx.drawImage(tile.img, x * tileset.tileWidth, y * tileset.tileHeight);
    }
  }

  const mousePosition = getMouseMapPosition();
  ctx.strokeRect(mousePosition.x * tileset.tileWidth, mousePosition.y * tileset.tileHeight, tileset.tileWidth, tileset.tileHeight);
}

requestAnimationFrame(render);

function placeBlock() {
  const position = getMouseMapPosition();
  while (map.length <= position.y) {
    map.push([]);
  }
  map[position.y][position.x] = activeTile;
}

function deleteBlock() {
  const position = getMouseMapPosition();
  while (map.length <= position.y) {
    map.push([]);
  }
  map[position.y][position.x] = undefined;
}

canvas.addEventListener('mousemove', (e) => {
  const crect = canvas.getBoundingClientRect();
  mouseX = e.x - crect.left;
  mouseY = e.y - crect.top;

  const position = getMouseMapPosition();

  if (mouseDown[0]) {
    placeBlock();
  }
  if (mouseDown[2]) {
    deleteBlock();
  }
});

canvas.addEventListener('contextmenu', (e) => e.preventDefault());

canvas.addEventListener('mousedown', (e) => {
  mouseDown[e.button] = true;
  if (e.button === 0) {
    placeBlock();
  } else if (e.button === 2) {
    deleteBlock();
  }
});
canvas.addEventListener('mouseup', (e) => {
  mouseDown[e.button] = false;
});

function saveAsImage() {
  const data = canvas.toDataURL();
  window.open(data);
}
