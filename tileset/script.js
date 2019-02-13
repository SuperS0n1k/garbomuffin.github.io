(function() {
  'use strict';

  function newCanvas(w, h) {
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    return canvas;
  }

  function getElementById(id) {
    const el = document.getElementById(id);
    if (!el) {
      throw new Error("No element with id " + id);
    }
    return el;
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
    constructor(baseImage) {
      this.baseCanvas = newCanvas(baseImage.width, baseImage.height);
      this.baseCtx = this.baseCanvas.getContext("2d");
      this.baseCtx.drawImage(baseImage, 0, 0);

      this.tileWidth = 16;
      this.tileHeight = 16;
      this.tileHorizontalOffset = 0;
      this.tileVerticalOffset = 0;
    }

    update() {
      this.tileRows = [];
      this.tileMap = {};
      const height = Math.ceil(this.baseCanvas.height / this.tileHeight);
      const width = Math.ceil(this.baseCanvas.width / this.tileWidth);

      const tileHorizontalOffset = this.tileWidth + this.tileHorizontalOffset;
      const tileVerticalOffset = this.tileHeight + this.tileVerticalOffset;

      for (let y = 0; y < height; y++) {
        const row = [];

        for (let x = 0; x < width; x++) {
          const canvas = newCanvas(this.tileWidth, this.tileHeight);
          const ctx = canvas.getContext("2d");
          ctx.translate(-x * tileHorizontalOffset, -y * tileVerticalOffset);
          ctx.drawImage(this.baseCanvas, 0, 0);

          const id = y + "/" + x;
          const tile = new Tile(canvas, id);
          this.tileMap[id] = tile;
          row.push(tile);
        }

        this.tileRows.push(row);
      }
    }

    get(id) {
      return this.tileMap[id];
    }
  }

  class Map {
    constructor() {
      this.data = [];
    }

    get(row, col) {
      return this.getRow(row)[col];
    }

    set(row, col, tile) {
      this.getRow(row)[col] = tile;
    }

    delete(row, col) {
      delete this.getRow(row)[col];
    }

    getRow(row) {
      while (this.data.length <= row) {
        this.data.push([]);
      }
      return this.data[row];
    }

    get rows() {
      return this.data.length;
    }
  }

  class Editor {
    constructor() {
      this.tileset = null;
      this.activeTile = "0/0";
      this.map = new Map();
      this.mouseX = 0;
      this.mouseY = 0;
      this.mouseActive = false;
      this.mouseButtons = [];

      this.canvas = getElementById("canvas");
      this.ctx = this.canvas.getContext("2d");
      this.canvas.addEventListener("contextmenu", (e) => e.preventDefault());
      this.canvas.addEventListener("mousemove", (e) => this.mousemove(e));
      this.canvas.addEventListener("mousedown", (e) => this.mousedown(e));
      this.canvas.addEventListener("mouseup", (e) => this.mouseup(e));
      this.canvas.addEventListener("mouseleave", (e) => this.mouseleave(e));
    }

    render() {
      requestAnimationFrame(() => this.render());

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      if (!this.tileset) {
        return;
      }

      const tileHeight = this.tileset.tileHeight;
      const tileWidth = this.tileset.tileWidth;

      for (let y = 0; y < this.map.rows; y++) {
        const row = this.map.getRow(y);
        for (let x = 0; x < row.length; x++) {
          const tile = this.tileset.get(row[x]);
          if (tile) {
            this.ctx.drawImage(tile.img, x * tileWidth, y * tileHeight);
          }
        }
      }

      if (this.mouseActive) {
        this.ctx.strokeStyle = "#555";
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(this.mapCol * tileWidth, this.mapRow * tileHeight, tileWidth, tileHeight);
      }
    }

    mousemove(e) {
      this.mouseActive = true;

      const crect = this.canvas.getBoundingClientRect();
      this.mouseX = e.clientX - crect.left;
      this.mouseY = e.clientY - crect.top;

      if (this.mouseButtons[0]) {
        this.placeBlock();
      }
      if (this.mouseButtons[2]) {
        this.deleteBlock();
      }
    }
    mousedown(e) {
      this.mouseButtons[e.button] = true;
      if (e.button === 0) {
        this.placeBlock();
      } else if (e.button === 2) {
        this.deleteBlock();
      }
    }
    mouseup(e) {
      this.mouseButtons[e.button] = false;
    }
    mouseleave(e) {
      this.mouseActive = false;
    }

    placeBlock() {
      this.map.set(this.mapRow, this.mapCol, this.activeTile);
    }
    deleteBlock() {
      this.map.delete(this.mapRow, this.mapCol);
    }

    loadTileset(file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const result = fileReader.result;
        const image = new Image();
        image.onload = () => {
          this.tileset = new Tileset(image, 16);
          this.tileset.update();
          this.displayTileset();
        };
        image.src = result;
      };
      fileReader.readAsDataURL(file);
    }
    displayTileset() {
      while (tilesTable.firstChild) {
        tilesTable.removeChild(tilesTable.firstChild);
      }

      for (const row of this.tileset.tileRows) {
        const tr = document.createElement("tr");

        for (const tile of row) {
          const td = document.createElement("td");
          td.dataset.id = tile.id;

          const canvas = newCanvas(tile.width, tile.height);
          const ctx = canvas.getContext("2d");
          ctx.drawImage(tile.img, 0, 0);

          td.appendChild(canvas);
          tr.appendChild(td);
        }

        tilesTable.appendChild(tr);
      }
    }

    openImage() {
      const data = this.canvas.toDataURL();
      window.open(data);
    }

    get mapCol() {
      return Math.floor(this.mouseX / this.tileset.tileWidth);
    }
    get mapRow() {
      return Math.floor(this.mouseY / this.tileset.tileHeight);
    }
  }

  const editor = new Editor();

  const tileSetInput = getElementById("tileSetInput");
  const saveAsImageButton = getElementById("saveAsImageButton");
  const tilesTable = getElementById("tilesTable");
  const widthInput = getElementById("widthInput");
  const heightInput = getElementById("heightInput");

  if (tileSetInput.files.length > 0) {
    editor.loadTileset(tileSetInput.files[0]);
  }
  tileSetInput.addEventListener("change", (e) => editor.loadTileset(tileSetInput.files[0]));
  saveAsImageButton.addEventListener("click", (e) => editor.openImage());

  tilesTable.addEventListener("click", (e) => {
    const target = e.target.closest("td");
    if (target) {
      const previousTarget = tilesTable.querySelector("td[data-id='" + editor.activeTile + "']");
      if (previousTarget) {
        previousTarget.classList.remove("active");
      }
      target.classList.add("active");
      const id = target.dataset.id;
      editor.activeTile = id;
    }
  });

  widthInput.value = editor.canvas.width;
  heightInput.value = editor.canvas.height;
  widthInput.addEventListener("input", () => editor.canvas.width = +widthInput.value);
  heightInput.addEventListener("input", () => editor.canvas.height = +heightInput.value);

  requestAnimationFrame(() => editor.render());
}());
