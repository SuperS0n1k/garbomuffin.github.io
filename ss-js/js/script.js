/**
 * The loop that keeps things running.
 */
function loop(){
  try{
    requestAnimationFrame(loop);
    ++window.frames;
    if (window.frames % 60 === 0){
      var a = new Date();
      document.getElementById("fps").innerText = "Millis to render 60 fps [should be 1000]: " + (a - date);
      date = a;
    }
    state();
    renderer.render(stage);
  }catch(e){
    console.error(e);
    alert(e.toString());
  }
}

/**
 * The function that runs during gameplay.
 */
function play(){
  controls();
  physics();
  graphics();
  if (player.suit !== DEFAULT_SUIT && player.suit !== WIND_SUIT) projectileLogic();
  if (platforms.hasSwitches) switches();
}

/**
 * Handles controls
 */
function controls(){
  if (f5.isDown) location.reload(); // because reasons

  if (up.isDown || z.isDown){
    ++player.y;
    player.jumping = true;

    if (touchingSolidGround()){
      --player.y;
      if (player.suit == 2){
        player.yv = CLOUD_JUMP_HIGHT;
      }else{
        player.yv = JUMP_HEIGHT;
      }
    }
    if (JUMP_HEIGHT_DEPENDS_ON_PRESS_DURATION) player.yv += CONTINUED_JUMP;

    --player.y;
  }else{
    if (player.yv > 1 && JUMP_HEIGHT_DEPENDS_ON_PRESS_DURATION) player.yv = 1;
  }

  // right/left
  if (right.isDown){
    player.facing = FACING.right;
    player.xv += WALK_SPEED;
  }
  if (left.isDown){
    player.facing = FACING.left;
    player.xv -= WALK_SPEED;
  }

  if (level < 1) return;

  // down - suit switching
  if (downPressed && !down.isDown) downPressed = false;

  if (down.isDown && !downPressed){
    downPressed = true;
    ++player.suit;
    if (player.suit > player.unlocked){
      player.suit = 1;
    }
  }
}

/**
 * Game physics.
 */
function physics(){
  // x/horizontal
  player.xv = player.xv * FRICTION;
  player.x += player.xv;
  if (touchingSolidGround()){
    let increment = player.xv > 0 ? -1 : 1;
    while (touchingSolidGround()){
      player.x += increment;
    }
    player.xv = 0;
  }

  player.y -= player.yv;
  if (touchingSolidGround()){
    let increment = player.yv > 0 ? -1 : 1;
    while (touchingSolidGround()){
      player.y -= increment;
    }
    player.yv = player.yv > 0 ? -1 : 0;
  }else{
    player.yv -= GRAVITY;
  }

  if (player.y > HEIGHT) reset();
  if (player.x < 0) player.x = 0;
  if (player.x > WIDTH && end) player.x = 0;
  if (player.x > WIDTH && !end){
    ++level;
    reset(false);
    render();
  }

  if (touchingSolidGround(player, -1  )){
    player.jumping = false;
  }else{
    player.jumping = true;
  }

  var interactable = touchingInteractableObject();
  if (interactable){
    interactable.interact(player, interactable);
  }
}

/**
 * Update the player's location to the player.
 */
function graphics(){
  // floor fixes bobbing
  costume.x = Math.floor(player.x);
  costume.y = Math.floor(player.y);

  costume.scale.x = player.facing;

  var currentTexture;
  var updated = true;

  // runing animations
  if (player.jumping){
    costume.setTexture(textures["player/jump.png"]);
    currentTexture = "jump";
    player.run = 0;
    player.frame = 1;
  }else if (right.isDown || left.isDown){
    // it's horrible but it works, so just keep it
    ++player.frame;
    if (player.frame % FRAMES_PER_RUNNING_ANIMATION === 0){
      ++player.run;
      if (player.run > RUNNING_ANIMATION_FRAMES){
        player.run = 1;
        player.frame = 1;
      }
      currentTexture = "run" + String(player.run);
      costume.setTexture(textures["player/run" + player.run + ".png"]);
    }else{
      updated = false;
    }
    player.still = false;
  }else{
    player.run = 0;
    player.frame = 1;
    costume.setTexture(textures["player/still.png"]);
    currentTexture = "still";
  }

  // adjust the suit to display over the player properly
  if (player.suit > 0){
    suit.x = costume.x;
    suit.y = costume.y;
    suit.scale.x = costume.scale.x;
    if (!suit.visible) suit.visible = true;

    if (updated){
      if (player.suit === 1){
        suit.setTexture(textures["player/suits/fire/" + currentTexture + ".png"]);
      }else if (player.suit === 2){
        suit.setTexture(textures["player/suits/air/" + currentTexture + ".png"]);
      }else if (player.suit === 3){
        suit.setTexture(textures["player/suits/hammer/" + currentTexture + ".png"]);
      }
    }
  }else{
    if (suit.visible) suit.visible = false;
  }

  // update animated sprites and move some stuff
  for (let block of platforms.children){
    if (block.animated){
      ++block.frame;
      if (block.frame % block.framesPerAnimation === 0){
        ++block.animationFrame;
        var current = block.animationFrame;
        if (current === block.animationFrames.length){
          block.frame = 0;
          current = 0;
          block.animationFrame = current;
        }
        block.setTexture(textures[block.animationFrames[current]]);
      }
    }
    if (level === HAMMER_SUIT_LVL && block.special === SPECIALS.hammerSuit){
      if (!touchingSolidGround(block)){
        ++block.y;
      }else{
        --block.y; // just keep it still 1px above the ground
        block.special = "";
      }
    }
  }
}

/**
 * Move projectiles and such.
 * @returns
 */
function projectileLogic(){
  var projectile;
  var date = new Date();
  var suit = player.suit;
  if (PROJECTILE_SUITS.indexOf(suit) > -1 &&
      date - lastProjectile > PROJECTILE_DELAY &&
      projectiles.children.length < MAX_PROJECTILES &&
      x.isDown){

    lastProjectile = date;
    playSound(ALIASES.projectile);
  
    if (suit === SUITS.fire){
      projectile = new Sprite(textures["projectiles/fireball.png"]);
      projectile.height = FIREBALL_HEIGHT;
      projectile.width = FIREBALL_WIDTH;
    }else if (suit === SUITS.hammer){
      projectile = new Sprite(textures["projectiles/hammer.png"]);
      projectile.height = HAMMER_HEIGHT;
      projectile.width = HAMMER_WIDTH;
    }

    projectile.type = suit;
    projectile.x = player.x;
    projectile.y = player.y;
    projectile.direction = player.facing;
    projectile.yv = suit === SUITS.hammer ? HAMMER_STARTING_VELOCITY : 0;
    projectile.frames = 0;
    projectile.anchor.set(0.5, 0.5);
  }
  if (projectile) projectiles.addChild(projectile);

  for (let projectile of projectiles.children){
    ++projectile.frames;

    if (projectile.type === SUITS.fire){
      fireball(projectile);
    }else if (projectile.type === SUITS.hammer){
      hammer(projectile);
    }
  }
}

/**
 * The logic that controls a fireball projectile.
 * @param {Sprite} projectile
 * @returns
 */
function fireball(projectile){
  if (projectile.direction === FACING.right){
    projectile.x += FIREBALL_SPEED;
  }else{
    projectile.x -= FIREBALL_SPEED;
  }

  if (touchingSolidGround(projectile)){
    projectile.yv = FIREBALL_BOOST_HEIGHT;
  }else{
    projectile.yv -= FIREBALL_GRAVITY;
  }

  projectile.y -= projectile.yv;
  projectile.rotation += FIREBALL_ROTATION;
  if (projectile.rotation > 360){
    projectile.rotation -= 360;
  }

  if (touchingSpecial(projectile, SPECIALS.ice)){
    if (!iceInterval){
      clearIce(); // just start one layer right away
      iceInterval = setInterval(clearIce, ICE_LIFE_SPAN);
      return;
    }
  }

  if (projectile.frames > FIREBALL_LIFETIME ||
      projectile.x < 0 ||
      projectile.x > WIDTH ||
      projectile.y > HEIGHT){

    projectile.destroy();
  }
}

/**
 * Logic that controls a fireball projectile.
 * @param {Sprite} projectile
 */
function hammer(projectile){
  if (projectile.direction === FACING.right){
    projectile.x += FIREBALL_SPEED;
    projectile.rotation += HAMMER_ROTATION;
  }else{
    projectile.x -= FIREBALL_SPEED;
    projectile.rotation -= HAMMER_ROTATION;
  }
  projectile.yv -= HAMMER_GRAVITY;
  projectile.y -= projectile.yv;

  if (projectile.x < 0 ||
      projectile.x > WIDTH ||
      projectile.y > HEIGHT){

    projectile.destroy();
    return;
  }

  var hswitch = touchingSpecial(projectile, SPECIALS.hammerSwitch);
  if (hswitch){
    hswitch.setTexture(textures["tiles/hswitch/Bd.png"]);
    blockBreak();
    setTimeout(function(){
      hswitch.destroy();
    }, HSWITCH_TIMEOUT);
  }
}

/**
 * Clear the highest row of ice.
 */
function clearIce(){
  var ice = false;
  var highestBlocks = [];
  var highest = HEIGHT;
  for (let block of platforms.children){
    if (block.y <= highest && block.special === SPECIALS.ice){
      ice = true;
      if (block.y === highest){
        // it's in the same row
        highestBlocks.push(block);
      }else{
        // whole new row, so new array to go with it
        highestBlocks = [block];
      }
      highest = block.y;
    }
  }
  if (ice){
    // ok great, there's still more ice
    // so let's remove the highest row
    playSound(ALIASES.ice); // play the sound only once for the row
    for (let block of highestBlocks){
      block.destroy();
    }
  }else{
    // no more ice, it's done
    clearInterval(iceInterval);
    iceInterval = null;
  }
}

/**
 * Logic for switches.
 */
function switches(){
  if (platforms.allSwitchesActivated) return; 
  if (platforms.totalSwitches === platforms.switchesActivated){
    // all of them are activated!
    if (!platforms.allSwitchesActivated) platforms.allSwitchesActivated = true;
    
    if (level === HAMMER_SUIT_LVL){
      var sprite = new Sprite(textures["suits/hammer.png"]);
      var meta = TILES[HAMMER_SUIT];
      setMeta(sprite, meta);
      sprite.width = BLOCK_WIDTH;
      sprite.height = BLOCK_HEIGHT;

      sprite.x = HAMMER_SUIT_SPAWN_X;
      sprite.y = HAMMER_SUIT_SPAWN_Y;

      platforms.addChild(sprite);
    }
  }
}

/**
 * Break the blocks!
 */
function blockBreak(){
  // temporairy until i can figure out something better
  playSound(ALIASES.blockBreak);
  for (let block of platforms.children){
    if (block.special === SPECIALS.blockBreak){
      block.destroy();
    }
  }
}

/**
 * Test if the player is touching solid ground.
 * @param {Sprite} [sprite=player] Sprite to test on.
 * @param {number} [yOffset=1] Y Offset
 * @param {number} [xOffset=0] X Offset
 * @returns
 */
function touchingSolidGround(sprite = player, yOffset = 1, xOffset = 0){
  var length = platforms.children.length;
  for (let i = 0; i < length; i++){
    let block = platforms.children[i];
    if (!block.solid) continue; // no point in checking things not solid
    if (block.y < sprite.y - (sprite.height * 1.5) + yOffset) break; // no point in checking stuff above the sprite.
    if (block.y > sprite.y + (sprite.height) + yOffset) continue; // no point in checking stuff below the sprite
    if (block.x + (sprite.width * 2.5) < sprite.x) continue; // no point in checking stuff to the left of the sprite
    if (block.x - (sprite.width * 0.5) > sprite.x) continue;  // no point in checking stuff to the right of the sprite
    if (boxesIntersect(block, sprite, yOffset, xOffset)) return true;
  }
  return false;
}

/**
 * Touching any interactable objects.
 * @returns {object|bool} The thing it's touching or false.
 */
function touchingInteractableObject(sprite = player, yOffset = 1, xOffset = 0){
  var length = platforms.children.length;
  for (let i = 0; i < length; i++){
    let block = platforms.children[i];
    if (!block.interactable) continue; // no point in checking things not solid
    if (block.y < sprite.y - (sprite.height * 1.5) + yOffset) break; // no point in checking stuff above the sprite.
    if (block.y > sprite.y + (sprite.height) + yOffset) continue; // no point in checking stuff below the sprite
    if (block.x + (sprite.width * 2.5) < sprite.x) continue; // no point in checking stuff to the left of the sprite
    if (block.x - (sprite.width * 0.5) > sprite.x) continue;  // no point in checking stuff to the right of the sprite
    if (boxesIntersect(block, sprite, yOffset, xOffset)) return block;
  }
  return false;
}

/**
 * Test if sprite is touching a special block.
 * (like ice)
 * @param {Sprite} sprite The sprite to test.
 * @param {string} special The special block to look for.
 * @returns
 */
function touchingSpecial(sprite, special, yOffset = 0, xOffset = 0){
  var length = platforms.children.length;
  for (let i = 0; i < length; i++){
    let block = platforms.children[i];
    if (block.special !== special) continue; // no point in checking things not solid
    if (block.y < sprite.y - (sprite.height * 1.5) + yOffset) break; // no point in checking stuff above the sprite.
    if (block.y > sprite.y + (sprite.height) + yOffset) continue; // no point in checking stuff below the sprite
    if (block.x + (sprite.width * 2.5) < sprite.x) continue; // no point in checking stuff to the left of the sprite
    if (block.x - (sprite.width * 0.5) > sprite.x) continue;  // no point in checking stuff to the right of the sprite
    if (boxesIntersect(block, sprite, yOffset, xOffset)) return block;
  }
  return false;
}

/**
 * Render the current level and set up some variables.
 * @param {boolean} [next=true]
 * @returns
 */
function render(next = true){
  platforms.destroy();
  platforms = new Container();
  platforms.name = "platforms";
  platforms.zIndex = ZINDEX.platforms;
  platforms.totalSwitches = 0;
  platforms.switchesActivated = 0;
  platforms.allSwitchesActivated = false;
  platforms.hasSwitches = false;
  platforms.switchFrames = 0;
  platforms.blockBreakFrame = 0;

  lvl = LEVELS[level];

  if (!lvl){
    lvl = END_LEVEL;
    end = true;
  }

  for (var y = 0; y < lvl.length; y++){ // for each horizontal strip [string]
    var blocks = lvl[y];

    for (var x = 0; x < blocks.length; x++){ // for each block [char]
      var char = blocks.charAt(x);

      if (char == "."){
        // if the char is .
        for (let i = x; i <= WIDTH; i++){
          // just fill the entire row
          var previous = platforms.children[platforms.children.length - 1];
          var sp = new Sprite(previous.texture); // with the previous texture
          // (note that this does not save meta data)

          setMeta(sp, {});

          platforms.addChild(sp);
          sp.x = i * BLOCK_WIDTH;
          sp.y = 360 - ((y + 1) * BLOCK_HEIGHT);
          sp.height = BLOCK_HEIGHT;
          sp.width = BLOCK_WIDTH;
        }
      }else if (char != " "){ // blank is air, so do nothing
        // otherwise just find the texture and place the sprite
        var meta = TILES[char.toLowerCase()];
        var sprite = new Sprite(textures[meta.texture]);
        sprite.textureName = meta.texture;

        setMeta(sprite, meta);

        sprite.x = x * BLOCK_HEIGHT;
        sprite.y = HEIGHT - ((y + 1) * BLOCK_HEIGHT);
        sprite.height = BLOCK_HEIGHT;
        sprite.width = BLOCK_WIDTH;

        platforms.addChild(sprite);

        if (sprite.special === SPECIALS.switch){
          ++platforms.totalSwitches;
          platforms.hasSwitches = true;
          // place a switch above a switch control
          meta = TILES[SWITCH];
          var spri = new Sprite(textures[meta.texture]);
          setMeta(spri, meta);
          spri.x = sprite.x;
          spri.y = sprite.y - BLOCK_HEIGHT;
          spri.width = BLOCK_WIDTH;
          spri.height = BLOCK_HEIGHT;
          spri.controller = sprite;
          platforms.addChild(spri);
        }
      }
    }
  }
  stage.addChild(platforms);
  stage.updateLayersOrder(); // ONIONS
  
  if (!next) return;
  state = reset;
  state();
}

/**
 * Set the meta of a block.
 * @param {Sprite} sprite
 * @param {object} meta
 */
function setMeta(sprite, meta){
  for (let i in DEFAULTS){
    if (typeof meta[i] != "undefined"){
      // it has something custom set
      sprite[i] = meta[i];
    }else{
      // just use the default
      sprite[i] = DEFAULTS[i];
    }
  }
}

/**
 * Reset the player.
 * @param {boolean} [next=true]
 * @returns
 */
function reset(next = true){
  player.x = STARTING_X;
  player.y = STARTING_Y;
  player.xv = 0;
  player.yv = 0;

  // it's faster to do this, ok?
  while (touchingSolidGround()){
    player.y -= BLOCK_HEIGHT; // go up until we are no longer touching ground in increments of 1 block
  }
  while (!touchingSolidGround()){
    ++player.y; // go down until we are touching it again in increments of 1
  }
  --player.y; // go up 1 to make sure we're not touching it now

  lastProjectile = null;
  iceInterval = clearInterval(iceInterval);
  iceInterval = null;

  for (let projectile of projectiles.children){
    projectile.destroy();
  }

  if (!next) return;
  state = play;
  state();
}

/**
 * Test if some sprites intersect.
 * @param {Sprite} a
 * @param {Sprite} b
 * @param {number} [yOffset=0] Y Offset
 * @param {number} [xOffset=0] X Offset
 * @returns {boolean} If they intersect.
 */
function boxesIntersect(a, b, yOffset = 0, xOffset = 0){
  var ab = a.getBounds();
  var bb = b.getBounds();
  return ab.x + ab.width + xOffset > bb.x &&
    ab.x + xOffset < bb.x + bb.width &&
    ab.y + ab.height + yOffset > bb.height &&
    ab.y + yOffset < bb.y + bb.height;
}
