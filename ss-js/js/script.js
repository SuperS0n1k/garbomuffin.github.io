function loop(){
  requestAnimationFrame(loop);
  state();
  renderer.render(stage);
}

function play(){
  controlls();
  physics();
  graphics();
}

/**
 * Reading the key inputs and doing stuff with them!
 */
function controlls(){
  // up
  if ((up.isDown || z.isDown) && hitbox.yv > -0.1){
    if (hitbox.jump == 16){
      if (hitbox.suit == 2){
        hitbox.yv = CLOUD_JUMP_HIGHT;
      }else{
        hitbox.yv = JUMP_HEIGHT;
      }
    }
    hitbox.jump--;
    hitbox.yv += 0.05 / 4;
  }else{
    hitbox.jump = 0;
    if (hitbox.yv > 1){
      hitbox.yv = 1;
    }
  }
  // right/left
  if (right.isDown){
    hitbox.facing = 0.5;
    hitbox.xv -= WALK_SPEED;
  }
  if (left.isDown){
    hitbox.facing = -0.5;
    hitbox.xv += WALK_SPEED;
  }
}

/**
 * Jumping, moving, almost everything.
 */
function physics(){
  hitbox.y += -hitbox.yv;

  if (touchingGround()){
    // well we're either hiting our head or on the ground
    if (hitbox.yv < 0.1){
      // on the ground!
      while(touchingGround()){
        hitbox.y--;
      }
      hitbox.yv = 0;
      hitbox.jump = 16;
    }else{
      // hiting our head
      while(touchingGround(false)){
        hitbox.y++;
      }
      hitbox.yv = -1;
      hitbox.jump = 0;
    }
  }else{
    hitbox.yv -= GRAVITY;
  }

  hitbox.xv = hitbox.xv * 0.5;
  hitbox.x += -hitbox.xv;
  if (touchingGround()){
    // well i mean we're in the ground so...
    var xInterval = hitbox.xv > 0 ? 1 : -1; // variables naming pls
    while (touchingGround()){
      hitbox.x += xInterval;
    }
  }

  if (hitbox.x < 0) hitbox.x = 0;
  if (hitbox.x > 470) nextLevel();
}

/**
 * Test if the player is touching the ground.
 * @returns
 */
function touchingGround(){
  var touching = false;
  for (let i of platforms.children){
    if (i.y < hitbox.y - 16) break;

    if (boxesIntersect(i, hitbox)){
      touching = true;
      break;
    }
  }
  return touching;
}

/**
 * Update the visuals of the player sprite to reflect the hitbox and inputs.
 */
function graphics(){
  player.x = hitbox.x;
  player.y = floor(hitbox.y);
  player.scale.x = hitbox.facing;
}

/**
 * Render the current level.
 * @param {boolean} [next=true]
 * @returns
 */
function render(next = true){
  platforms.destroy();
  platforms = new Container();

  lvl = LEVELS[level];
  for (var y = 0; y < lvl.length; y++){
    var blocks = lvl[y];

    for (var x = 0; x < blocks.length; x++){
      var char = blocks.charAt(x);

      if (char == "."){
        for (let i = x; i <= WIDTH; i++){
          var sp = new Sprite(platforms.children[platforms.children.length - 1].texture);

          platforms.addChild(sp);
          sp.x = i * 16;
          sp.y = 360 - ((y + 1) * 16);
          sp.height = 16;
          sp.width = 16;
        }
      }else if (char != " "){
        var sprite = new Sprite(textures[TILES[char.toLowerCase()].texture]);

        platforms.addChild(sprite);
        sprite.x = x * 16;
        sprite.y = 360 - ((y + 1) * 16);
        sprite.height = 16;
        sprite.width = 16;
      }
    }
  }
  stage.addChild(platforms);
  
  if (!next) return;
  state = reset;
  state();
}

/**
 * Reset the player.
 * @param {boolean} [next=true]
 * @returns
 */
function reset(next = true){
  hitbox.x = STARTING_X;
  hitbox.y = STARTING_Y;
  while (touchingGround()){
    hitbox.y--;
  }

  if (!next) return;
  state = play;
  state();
}

/**
 * Next level!
 * @param {boolean} [next=true]
 */
function nextLevel(next = true){
  level++;
  reset(false);
  render(false);

  if (!next) return;
  state = play;
  state();
}

// http://www.html5gamedevs.com/topic/24408-collision-detection/
/**
 * Test if some sprites intersect.
 * @param {any} a
 * @param {any} b
 * @returns If they intersect.
 */
function boxesIntersect(a, b){
  var ab = a.getBounds();
  var bb = b.getBounds();
  return ab.x + ab.width > bb.x &&
    ab.x < bb.x + bb.width &&
    ab.y + ab.height > bb.height &&
    ab.y < bb.y + bb.height;
}

/**
 * Get the floor of a number.
 * Faster than Math.floor
 * @param {number} n The number.
 * @returns The floor of the number.
 */
function floor(n){
  return n|0;
}
