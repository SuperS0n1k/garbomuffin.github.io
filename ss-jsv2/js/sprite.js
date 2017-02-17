/**
 * Create a sprite.
 * @param {Object} options The options
 * @param {string|HTMLImageElement} options.texture The texture to use
 * @param {number} options.x The sprite's starting X coordinate
 * @param {number} options.y The sprite's starting Y coordinate
 * @param {strubg} [options.type] The sprite's type (fireball, block, etc)
 * @param {number} [options.height] The sprite's height
 * @param {number} [options.width] The sprite's width
 * @param {number} [options.rotation] The sprite's rotation in radians
 * @param {function} [options.render=false] If present, this will be used instead of the builtin rendering function
 * @param {boolean} [options.visible=true] The sprite's visiblity
 * @param {boolean} [options.solid=true] Whether or not this sprite should be included in touching solid block tests
 * @param {boolean} [options.block=false] Whether or not this is a block. (optimization can be done to blocks)
 * @param {function} [options.tick] A function to run everyframe intended to provide interactive blocks easier. If the sprite is deleted from here, RETURN FALSE!
 * @param {Object} [options.animation] Animation config.
 * @param {boolean} [options.animation.adjustSize=true] Whether or not to automatically adjust the size of the sprite on a new animation frame.
 * @param {number} options.animation.length Length (in frames) of each animation
 * @param {Object} [options.additional] Any additional flags/parameters to be added to the sprite.
 * @param {string[]|HTMLImageElement[]} options.animation.frames List of frames
 * @see Container
 * @constructor
 */
function Sprite(options){
  this.texture = load(options.texture);
  // if (!this.texture) return;
  this.x = options.x;
  this.y = options.y;

  if (typeof options.width !== "undefined"){
    this.width = options.width;
  }else{
    this.width = this.texture.width;
  }

  if (typeof options.height !== "undefined"){
    this.height = options.height;
  }else{
    this.height = this.texture.height;
  }

  if (typeof options.visible !== "undefined"){
    this.visible = options.visible;
  }else{
    this.visible = true;
  }

  if (typeof options.solid !== "undefined"){
    this.solid = options.solid;
  }else{
    this.solid = true;
  }

  if (options.tick){
    this.tick = options.tick;
    this.tickable = true;
    tickable.push(this);
  }

  if (options.animation){
    this.animated = true;
    this.animation = options.animation;
    this.frame = 0;
    this.animationFrame = 0;
    if (typeof this.animation.adjustSize === "undefined"){
      this.animation.adjustSize = true;
    }
    animated.push(this);
  }

  if (typeof options.render !== "undefined"){
    this.render = options.render;
  }

  if (typeof options.rotation !== "undefined"){
    this.rotation = options.rotation;
  }else{
    this.rotation = 0;
  }

  if (options.additional){
    for (let i in options.additional){
      if (options.additional.hasOwnProperty(i)) this[i] = options.additional[i];
    }
  }

  // if it's in it's own special class we add it to that group
  if (options.type === "fireball"){
    fireballs.push(this);
  }else if (options.type === "ice"){
    ice.push(this);
  }

  this.render();

  sprites.push(this);
}
/**
 * Get X position of sprite.
 * @returns {number}
 */
Sprite.prototype.getX = function(){
  return this.x;
};
/**
 * Get Y position of sprite.
 * @returns {number}
 */
Sprite.prototype.getY = function(){
  return this.y;
};
/**
 * Set the X position of a sprite.
 * @param {number} x
 */
Sprite.prototype.setX = function(x){
  this.x = x;
};
/**
 * Set the Y position of a sprite.
 * @param {number} y
 */
Sprite.prototype.setY = function(y){
  this.y = y;
};
/**
 * Set the position of the sprite
 * @param {number} x
 * @param {number} y
 */
Sprite.prototype.setPosition = function(x, y){
  this.setX(x);
  this.setY(y);
};
/**
 * Get the width of a sprite.
 * @returns {number}
 */
Sprite.prototype.getWidth = function(){
  return this.width;
};
/**
 * Get the height of a sprite.
 * @returns {number}
 */
Sprite.prototype.getHeight = function(){
  return this.height;
};
/**
 * Set the width of a sprite
 * @param {number} width
 */
Sprite.prototype.setWidth = function(width){
  this.width = width;
};
/**
 * Set the height of a sprite.
 * 
 * @param {number} height
 */
Sprite.prototype.setHeight = function(height){
  this.height = height;
};
/**
 * Set the texture of a sprite.
 * @param {string|HTMLImageElement} texture
 */
Sprite.prototype.setTexture = function(texture){
  this.texture = load(texture);
};
/**
 * Returns the Sprite's roation in radians
 * @returns {number}
 */
Sprite.prototype.getRotation = function(){
  return this.rotation;
};
/**
 * Returns the Sprite's roation in degrees
 * @returns {number}
 */
Sprite.prototype.getRotationDegrees = function(){
  return this.rotation / DEGREE;
};
/**
 * Set the Sprite's rotation in radians
 * @param {number} rad
 */
Sprite.prototype.setRotation = function(rad){
  this.rotation = rad;
};
/**
 * Set the Sprite's rotation in degrees
 * @param {number} deg
 */
Sprite.prototype.setRotationDegrees = function(deg){
  this.rotation = DEGREE * deg;
};
/**
 * Test if this sprite is touching another.
 * @param {Sprite} sprite
 * @returns {boolean}
 */
Sprite.prototype.intersects = function(sprite, xOffset = 0, yOffset = 0){
  return this.x + xOffset <= sprite.x + sprite.width &&
    this.x + this.width + xOffset >= sprite.x &&
    this.y + yOffset <= sprite.y + sprite.height &&
    this.y + this.height + yOffset >= sprite.y;
};
/**
 * Test if this sprite is touching the ground.
 * @returns {boolean}
 */
Sprite.prototype.touchingGround = function(xOffset = 0, yOffset = 0){
  for (let block of sprites){
    if (block.solid && this.intersects(block, xOffset, yOffset)) return true;
  }
  return false;
};
/**
 * Test if this sprite is touching the player.
 * @returns {boolean}
 */
Sprite.prototype.touchingPlayer = function(xOffset = 0, yOffset = 0){
  return this.intersects(player, xOffset, yOffset);
};
/**
 * Check if the sprite is touching a group or not.
 * @param {Sprite[]} group
 * @param {number} [xOffset=0]
 * @param {number} [yOffset=0]
 * @returns
 */
Sprite.prototype.touchingGroup = function(group, xOffset = 0, yOffset = 0){
  for (let sprite of group){
    if (this.intersects(sprite, xOffset, yOffset)) return true;
  }
  return false;
};
/**
 * Delete this sprite.
 */
Sprite.prototype.delete = function(){
  sprites.splice(sprites.indexOf(this), 1);
  if (this.animated){
    animated.splice(animated.indexOf(this), 1);
  }
  if (this.tickable){
    tickable.splice(tickable.indexOf(this), 1);
  }
  for (let container of containers){
    let index = container.indexOf(this);
    if (index > -1) container.splice(index, 1);
  }
};
/**
 * Check if the sprite is touching the edge.
 * @returns {boolean}
 */
Sprite.prototype.onEdge = function(){
  return this.x < 0 || this.x > WIDTH || this.y < 0 || this.y > HEIGHT;
};
/**
 * Check if the sprite is off screen.
 * @returns {boolean}
 */
Sprite.prototype.offScreen = function(){
  return this.x + this.width < 0 || this.x > WIDTH || this.y + this.height < 0 || this.y > HEIGHT;
};
Sprite.prototype.offView = Sprite.prototype.offScreen;
/**
 * Actually render a sprite and apply animations.
 */
Sprite.prototype.render = function(){
  if (this.animated){
    this.frame++;
    if (this.frame % this.animation.length === 0){
      ++this.animationFrame;
      if (this.animationFrame === this.animation.frames.length){
        this.animationFrame = 0;
      }
      this.setTexture(this.animation.frames[this.animationFrame]);
      // if (this.animation.adjustSize){
      //   this.width = this.texture.width;
      //   this.height = this.texture.height;
      // }
    }
  }
  if (this.visible){
    if (this.rotation){
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.translate(this.width / 2, this.height / 2);
      ctx.rotate(this.rotation);
      ctx.drawImage(this.texture, -this.width / 2, -this.height / 2, this.width, this.height);
      ctx.restore();
    }else{
      ctx.drawImage(this.texture, this.x, this.y, this.width, this.height);
    }
  }
};
