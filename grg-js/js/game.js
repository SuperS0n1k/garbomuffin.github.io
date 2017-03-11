function loop() {
    if (state === null) {
        return;
    }
    stats.begin();
    state();
    render();
    stats.end();
    requestAnimationFrame(loop);
}
function render() {
    ctx.drawImage(gradientCanvas, 0, 0);
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    for (let sprite of sprites) {
        sprite.render();
    }
}
function reset() {
    sprites = new Container();
    updatable = new Container();
    blocks = new Container();
    projectiles = new Container();
    renderLevel();
    player = new PlayerHitbox();
    new PlayerGraphic();
    createHealthBar();
}
function createHealthBar() {
    var id = 0;
    var y = 65;
    while (id < MAX_HEALTH) {
        id++;
        new HealthTick({
            texture: loadImage("health/bar.png"),
            id: id,
            y: y
        });
        y -= 2;
    }
}
function nextLevel() {
    level++;
    reset();
}
function renderLevel() {
    var levelData = LEVELS[level];
    var x = 0;
    var y = HEIGHT - BLOCK_HEIGHT;
    for (let char of levelData) {
        if (char !== ".") {
            var meta = TILES[char];
            if (!meta)
                console.warn(`UNRECOGNIZED CHAR: ${char}`);
            spawnTile(meta, meta.texture, x, y);
        }
        x += BLOCK_WIDTH;
        if (x >= WIDTH) {
            x = 0;
            y -= BLOCK_HEIGHT;
        }
    }
}
function spawnTile(meta, texture, x, y) {
    var options = Object.assign({}, meta, { texture: loadImage(texture), x: x, y: y, width: BLOCK_WIDTH, height: BLOCK_HEIGHT });
    var sprite;
    if (meta.type) {
        sprite = new options.type(options);
    }
    else {
        sprite = new Block(options);
    }
    return sprite;
}
/**
 * @param {*} particle The particle object itself, not an instance of it!
 */
function spawnParticle(particle, center, x, y) {
    var texture = loadImage(`particle/${particle.type}.png`);
    var count = particle.count;
    var angle = FULL_ROT / count;
    for (let i = 1; i <= count; i++) {
        new particle({
            x: x,
            y: y,
            center: center,
            texture: texture,
            rotation: angle * i,
        });
    }
}
function start() {
    reset();
    state = play;
    loop();
}
function play() {
    for (let sprite of updatable) {
        sprite.frameUpdate();
    }
}
function isNumber(number) {
    return typeof number === "number" && isFinite(number);
}
