/**
 * Create a container
 * @param {Object} [options]
 * @see Sprite
 * @constructor
 */
function Container(options){
  this.children = [];
  containers.push(this);
}
Container.prototype = {
  get length(){
    return this.children.length;
  },
  get sprites(){
    return this.children;
  }
};
Container.prototype.append = function(sprite){
  this.children.push(sprite);
};
Container.prototype.push = function(sprite){
  return this.children.push(sprite);
};
Container.prototype.splice = function(start, length){
  return this.children.splice(start, length);
};
Container.prototype.indexOf = function(item){
  return this.children.indexOf(item);
};
/**
 * Delete the container and it's sprites.
 */
Container.prototype.delete = function(){
  for (let sprite of this.children){
    sprite.delete();
  }
  containers.splice([containers.indexOf(this)], 1); // and remove it from the array
};
/**
 * Less writing = win
 */
Container.prototype[Symbol.iterator] = function*(){
  for (let sprite of this.children){
    yield sprite;
  }
};
