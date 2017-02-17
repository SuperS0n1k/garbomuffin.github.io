function playerUpdate(diff){
  player.frame++;
  this.updated = false;

  // up
  if (keys[38] || keys[32] || keys[87] || keys[90]){
    if (this.touchingGround(0, 1)){
      this.jumping = true;
      if (currentSuit === WIND_SUIT){
        this.yv = CLOUD_JUMP;
      }else{
        this.yv = JUMP;
      }
    }
  }else{
    if (this.yv > 3){
      this.yv = 1;
    }
  }

  // right
  if (keys[39] || keys[68]){
    if (this.xv < RUN_SPEED){
      this.xv += RUN_SPEED;
    }
    this.dir = DIR_RIGHT;
    if (player.frame % RUNNING_ANIMATION_LENGTH === 0){
      this.run++;
      this.updated = true;
    }
  }else if (keys[37] || keys[65]){ // left
    if (this.xv > -RUN_SPEED){
      this.xv -= RUN_SPEED;
    }
    this.dir = DIR_LEFT;
    if (player.frame % RUNNING_ANIMATION_LENGTH === 0){
      this.run++;
      this.updated = true;
    }
  }else{
    this.run = 0;
  }

  if (this.run > RUNNING_FRAMES.length){
    this.run = 1;
  }

  // down/suit change
  if (keys[40] || keys[83]){
    currentSuit++;
    if (currentSuit > unlockedSuits){
      currentSuit = unlockedSuits;
    }
  }

  // x/projectile
  if (currentSuit > 0 && keys[88]){
    if (Date.now() - this.lastProjectile > 1000 && PROJECTILE_SUITS.includes(currentSuit) && this.projectiles < MAX_PROJECTILES){
      player.projectiles++;
      var sprite;
      if (currentSuit === FIRE_SUIT){
        sprite = new Sprite({
          texture: "projectiles/fireball.png",
          width: FIREBALL_WIDTH,
          height: FIREBALL_HEIGHT,
          x: this.x,
          y: this.y,
          rotation: 0,
          solid: false,
          tick: fireball,
          type: "fireball",
        });
      }else if (currentSuit === HAMMER_SUIT){

      }
      sprite.yv = 0;
      sprite.dir = this.dir;
      this.lastProjectile = Date.now();
    }
  }

  this.xv *= FRICTION;
  this.x += this.xv;

  if (this.touchingGround(0, -1)){
    let increment = this.xv > 0 ? -1 : 1;
    while (this.touchingGround(0, -1)){
      this.x += increment;
    }
    player.xv = 0;
  }

  this.yv -= GRAVITY;
  this.y -= this.yv;

  if (this.touchingGround(0, -1)){
    let increment = this.yv > 0 ? -1 : 1;
    while (this.touchingGround(0, -1)){
      this.y -= increment;
    }
    if (this.yv > 0){
      this.yv = -1;
    }else{
      this.jumping = false;
      this.yv = 0;
    }
  }

  if (this.x < 0){
    this.x = 0;
  }

  if (this.y > HEIGHT){
    renderLevel();
  }

  if (this.x > WIDTH){
    level++;
    renderLevel();
  }
}

function resetPlayer(){
  while (this.touchingGround()){
    this.y--;
  }
}

function showPlayer(){
  this.x = Math.floor(player.x);
  this.y = Math.floor(player.y);
  var texture;
  if (player.touchingGround(0, 0)){
    if (player.run > 0){
      texture = "player/run" + player.run + ".png";
    }else{
      texture = "player/still.png";
    }
  }else{
    texture = "player/jump.png";
  }
  this.costume = texture;
  texture = load(texture);
  ctx.save();
  ctx.translate(this.x + (PLAYER_WIDTH / 2), this.y + (PLAYER_HEIGHT / 2));
  ctx.scale(player.dir, 1);
  ctx.drawImage(texture, -PLAYER_WIDTH / 2, -PLAYER_HEIGHT / 2, texture.width / 2, texture.height / 2);
  ctx.restore();
}

function showSuit(){
  this.x = graphic.x;
  this.y = graphic.y;
  var suitName = SUIT_NAMES[currentSuit];
  var costume = graphic.costume.split("/")[1];
  if (suitName === "default") return;

  var texture = "player/suits/" + suitName + "/" + costume;
  texture = load(texture);
  ctx.save();
  ctx.translate(this.x + (PLAYER_WIDTH / 2), this.y + (PLAYER_HEIGHT / 2));
  ctx.scale(player.dir, 1);
  ctx.drawImage(texture, -PLAYER_WIDTH / 2, -PLAYER_HEIGHT / 2, texture.width / 2, texture.height / 2);
  ctx.restore();
}

function coinTick(){
  if (this.touchingPlayer()){
    this.delete();
    playSound("click");
  }
}

function suitTick(suit){
  if (this.touchingPlayer()){
    this.delete();
    currentSuit = suit;
    unlockedSuits = currentSuit;
  }
}

function fireball(){
  this.yv -= FIREBALL_GRAVITY;
  this.y -= this.yv;
  this.x += this.dir * FIREBALL_SPEED;

  if (this.onEdge()){
    player.projectiles--;
    this.delete();
    return false;
  }

  if (this.touchingGround()){
    this.yv = FIREBALL_VELOCITY;
  }

  this.rotation += FIREBALL_ROTATION;
}

function iceTick(){
  if (this.touchingGroup(fireballs)){
    if (!iceInterval){
      clearIce();
      iceInterval = setInterval(clearIce, ICE_DELAY);
    }
  }
}

function clearIce(){
  var top = HEIGHT;
  var highest = [];
  for (let block of ice){
    if (block.y < top){
      top = block.y;
      highest = [block];
    }else if (block.y === top){
      highest.push(block);
    }
  }

  if (highest.length > 0){
    playSound("ice");
    for (let block of highest){
      block.delete();
    }
  }else{
    clearInterval(iceInterval);
  }
}

/**
 * Test if boxes intersect each other
 * @param {Sprite|object} a
 * @param {Sprite|object} b
 * @returns {boolean}
 */
function boxesIntersect(a, b){
  return a.x <= b.x + b.width &&
    a.x + a.width >= b.x &&
    a.y <= b.y + b.height &&
    a.y + a.height >= b.y;
}
