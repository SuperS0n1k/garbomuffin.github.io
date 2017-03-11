interface SpriteOptions {
  x?: number
  y?: number
  center?: Sprite // needed for centerx and centery
  texture?: HTMLImageElement
  width?: number
  height?: number
  visible?: boolean
  solid?: boolean
  frameUpdate?: () => void
  rotation?: number
}

interface SpriteScale {
  x: number
  y: number
}

interface ProjectileOptions extends SpriteOptions {
  direction: number
}

interface EnemyOptions extends SpriteOptions {
  damage: number
}

interface HealthTickOptions extends SpriteOptions {
  id: number
}

/// BASE CLASSES

class Sprite {
  public constructor(options?: SpriteOptions){
    if (typeof options.visible === "boolean") this.visible = options.visible;
    if (typeof options.solid === "boolean") this.solid = options.solid;
    if (this.visible){
      this.texture = options.texture;
    }

    if (isNumber(options.width) && options.width > 0) this.width = options.width;
    else if (this.texture) this.width = this.texture.width;
    if (isNumber(options.height) && options.height > 0) this.height = options.height;
    else if (this.texture) this.height = this.texture.height;

    if (options.center instanceof Sprite){
      var center = options.center;
      this.x = center.x + (center.width / 2) - (this.width / 2);
      this.y = center.y + (center.height / 2) - (this.height / 2);
    }else{
      if (isNumber(options.x)) this.x = options.x;
      if (isNumber(options.y)) this.y = options.y;
    }
    
    if (isNumber(options.rotation)) this.rotation = options.rotation

    if (typeof options.frameUpdate === "function"){
      this.frameUpdate = options.frameUpdate.bind(this);
    }
    if (this.frameUpdate){
      updatable.push(this);
    }

    sprites.push(this);
  }

  protected _x: number = 0
  protected _y: number = 0
  protected _texture: HTMLImageElement
  protected _width: number = 0
  protected _height: number = 0
  protected _visible: boolean = true
  protected _solid: boolean = true
  protected _rotation: number = 0
  protected _scale: SpriteScale = {
    x: 1,
    y: 1,
  }

  public frameUpdate?(): void

  public render(){
    if (!this.visible) return;
    var scale = this.scale.x || this.scale.y;
    var rotation = this.rotation;
    if (scale || rotation){
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.translate(this.width / 2, this.height / 2);
      if (rotation){
        ctx.rotate(this.rotation);
      }else if (scale){
        ctx.scale(this.scale.x, this.scale.y);
      }
      ctx.drawImage(this.texture, -this.width / 2, -this.height / 2, this.width, this.height);
      ctx.restore();
    }else{
      ctx.drawImage(this.texture, this.x, this.y, this.width, this.height);
    }
  }
  public intersects(sprite: Sprite, xOffset = 0, yOffset = 0): boolean {
    return this.x + xOffset < sprite.x + sprite.width &&
      this.x + this.width + xOffset > sprite.x &&
      this.y < sprite.y + sprite.height + yOffset &&
      this.y + this.height + yOffset > sprite.y;
  }
  public touchesContainer(returnBoolean = true, container: Container, requiredType = Sprite, xOffset = 0, yOffset = 0): boolean|Sprite{
    for (let sprite of container){
      if (this.intersects(sprite, xOffset, yOffset) && sprite instanceof requiredType) return returnBoolean ? true : sprite;
    }
    return false;
  }
  protected offScreen(): boolean{
    return this.x + this.width < 0 || this.x > WIDTH || this.y > HEIGHT || this.y + this.height < 0
  }
  public destroy(){
    for (let container of containers){
      var index = container.indexOf(this);
      if (index > -1){
        container.splice(index, 1);
      }
    }
  }

  public get x(){
    return this._x;
  }
  public set x(x: number){
    if (isNumber(x)) this._x = x;
  }
  public get y(){
    return this._y;
  }
  public set y(y: number){
    if (isNumber(y)) this._y = y;
  }
  public get centerX(){
    return this.x + (this.width / 2);
  }
  public set centerX(centerX){
    if (isNumber(centerX)) this._x = centerX + (this.width / 2)
  }
  public get centerY(){
    return this.y + (this.height / 2);
  }
  public set centerY(centerY){
    if (isNumber(centerY)) this._y = centerY + (this.height / 2)
  }
  public get width(){
    return this._width;
  }
  public set width(width: number){
    if (isNumber(width) && width > 0) this._width = width;
  }
  public get height(){
    return this._height;
  }
  public set height(height: number){
    if (isNumber(height) && height > 0) this._height = height;
  }
  public get rotation(){
    return this._rotation;
  }
  public set rotation(rotation: number){
    if (isNumber(rotation)) this._rotation = rotation;
  }
  public get scale(){
    return this._scale;
  }
  public set scale(scale){
    if (isNumber(scale.x) && isNumber(scale.y)) this._scale = scale;
  }

  public get texture(){
    return this._texture;
  }
  public set texture(texture: HTMLImageElement){
    if (texture instanceof HTMLImageElement) this._texture = texture;
  }

  public get visible(){
    return this._visible;
  }
  public set visible(visible: boolean){
    if (typeof visible === "boolean") this._visible = visible;
  }
  public get solid(){
    return this._solid;
  }
  public set solid(solid: boolean){
    if (typeof solid === "boolean") this._solid = solid;
  }
}

class Block extends Sprite {
  public constructor(options: SpriteOptions){
    super(options);
    blocks.push(this);
  }
}

abstract class Enemy extends Sprite {
  public constructor(options: EnemyOptions){
    super(options);
    if (isNumber(options.damage) && options.damage > 0) this.damage = options.damage; 
  }

  public frameUpdate(){
    if (this.touchesPlayer()){
      player.health -= this.damage;
    }
  }

  public touchesPlayer(){
    return this.intersects(player);
  }

  protected abstract readonly damage:number = 0;
  protected readonly _solid = false;
}

abstract class Particle extends Sprite {
  public constructor(options: SpriteOptions){
    super(options);
  }

  public frameUpdate(){
    this.frame++;
    if (this.offScreen() || this.frame > this.lifeSpan) this.destroy();

    this.x += this.speed * Math.cos(this.rotation);
    this.y += this.speed * -Math.sin(this.rotation);

  }

  protected frame: number = 0;
  protected abstract readonly speed: number;
  protected abstract readonly lifeSpan: number;
}

class Projectile extends Sprite {
  public constructor(options: ProjectileOptions){
    super({
      ...options,
    });
    this.direction = options.direction;
    projectiles.push(this);
  }

  protected touchingPlayer(): boolean{
    return this.intersects(player);
  }
  public frameUpdate(){
    this.x += this.direction * PROJECTILE_SPEED;
    this.check();
    if (this.offScreen()) this.destroy();
  }
  
  protected check(){}

  protected readonly direction: number
}

/// SPECIAL BLOCKS

class BoxTile extends Block {
  public constructor(options: SpriteOptions){
    super(options);
  }

  public frameUpdate(){
    var touching = <PlayerProjectile> this.touchesContainer(false, projectiles, PlayerProjectile);
    if (touching && !touching.boxDestroy){
      touching.boxDestroy = true;
      this.state++;
      if (this.state > 3){
        spawnParticle(BreakParticle, this, this.centerX, this.centerY);
        this.destroy();
      }else{
        this.texture = loadImage(`tiles/box/${this.state}.png`);
      }
    }
  }

  private state = 1;
}

/// PARTICLES

class BreakParticle extends Particle {
  public constructor(options: SpriteOptions){
    super({
      ...options,
      height: 6,
      width: 6,
    });
  }

  protected readonly speed = 3;
  protected readonly lifeSpan = 5;
}
// I hope there's a better way to do this...
BreakParticle["count"] = 8;
BreakParticle["type"] = "break";

/// ENEMIES

class LargeSmiley extends Enemy {
  protected damage: number = 3;
}

/// PROJECTILES

class PlayerProjectile extends Projectile {
  public constructor(options: ProjectileOptions){
    super({
      ...options,
      texture: loadImage("bullet/bullet.png"),
      width: 6,
      height: 6,
    });
  }

  protected check(){}

  public boxDestroy: boolean
}

/// SPRITES

class PlayerHitbox extends Sprite {
  public constructor(){
    super({});
    this.reset();
  }

  private _yv = 0;
  private _xv = 0;
  private _lastShot = 0;
  private _direction = DIR_RIGHT;
  private _health = MAX_HEALTH;
  protected readonly _height = PLAYER_HEIGHT;
  protected readonly _width = PLAYER_WIDTH;
  protected readonly _visible = false;
  protected readonly _solid = false;

  public frameUpdate(){
    // up
    if (keys[38] || keys[32] || keys[87]){
      if (this.touchingSolidBlock(true, 0, 1)){
        this.yv = JUMP_HEIGHT;
      }
    }else{
      if (this.yv > 1){
        this.yv = 1;
      }
    }

    // right
    if (keys[39] || keys[68]){
      if (this.xv < WALK_SPEED){
        this.xv += WALK_SPEED;
      }
      this.direction = DIR_RIGHT;
    }
    // left
    if (keys[37] || keys[65]){
      if (this.xv > -WALK_SPEED){
        this.xv -= WALK_SPEED;
      }
      this.direction = DIR_LEFT;
    }

    // x physics
    this.xv *= FRICTION;
    this.x += this.xv;
    this.x = Math.round(this.x);
    var block = <Sprite> this.touchingSolidBlock(false, 0, -1);
    if (block){
      let increment = this.xv > 0 ? -1 : 1;
      while (this.intersects(block, 0, -1)){
        this.x += increment;
      }
      this.xv = 0;
    }

    // y physics
    this.yv -= GRAVITY;
    this.y -= this.yv;
    var block = <Sprite> this.touchingSolidBlock(false, 0, -1);
    if (block){
      let increment = this.yv < 0 ? -1 : 1;
      while (this.intersects(block, 0, -1)){
        this.y += increment;
      }
      this.yv = 0;
    }

    // z/shoot
    if (keys[90] && Date.now() - this.lastShot > SHOT_DELAY){
      new PlayerProjectile({
        direction: this.direction,
        x: Math.round(this.x),
        y: Math.round(this.y),
      });
      this.lastShot = Date.now();
    }

    if (this.x + this.width >= WIDTH){
      nextLevel();
    }

    if (this.x <= 0){
      this.x = 0;
    }

    if (this.y > HEIGHT){
      this.reset();
    }
  }
  public reset(){
    this.x = PLAYER_STARTING_X;
    this.y = HEIGHT - 1;
    this.yv = 0;
    this.xv = 0;
    while (this.touchingBlock()){
      this.y--;
    }
  }

  public touchingSolidBlock(returnBoolean = true, xOffset = 0, yOffset = 0): boolean|Sprite {
    for (let sprite of blocks){
      if (sprite.solid && this.intersects(sprite, xOffset, yOffset)) return returnBoolean ? true : sprite;
    }
    return false;
  }
  public touchingBlock(returnBoolean = true, xOffset = 0, yOffset = 0): boolean|Sprite {
    for (let sprite of blocks){
      if (this.intersects(sprite, xOffset, yOffset)) return returnBoolean ? true : sprite;
    }
    return false;
  }

  protected get yv(){
    return this._yv;
  }
  protected set yv(yv){
    if (isNumber(yv)) this._yv = yv;
  }
  protected get xv(){
    return this._xv;
  }
  protected set xv(xv){
    if (isNumber(xv)) this._xv = xv;
  }
  protected get direction(){
    return this._direction;
  }
  protected set direction(direction){
    if (direction === DIR_RIGHT || direction === DIR_LEFT){
      this._direction = direction;
      this.scale.x = direction;
    }
  }
  protected get lastShot(){
    return this._lastShot;
  }
  protected set lastShot(lastShot){
    if (isFinite(lastShot)) this._lastShot = lastShot;
  }
  public get health(){
    return this._health;
  }
  public set health(health){
    if (isNumber(health)) this._health = health;
  }
}

class PlayerGraphic extends Sprite {
  public constructor(){
    super({
      width: PLAYER_HEIGHT,
      height: PLAYER_HEIGHT,
      texture: loadImage("player/still.png")
    });
  }

  public frameUpdate(){
    this.x = player.x;
    this.y = player.y|0;

    this.rotation = player.rotation;

    this.scale = player.scale;
  }

  protected readonly _height = PLAYER_HEIGHT;
  protected readonly _width = PLAYER_WIDTH;
  protected readonly _solid = false;
}

class HealthTick extends Sprite {
  public constructor(options: HealthTickOptions){
    super(options);
    this.id = options.id;
  }

  public frameUpdate(){
    if (this.id < player.health){
      this.texture = loadImage("health/bar.png");
    }else{
      this.texture = loadImage("health/empty.png");
    }
  }

  protected readonly _x = 28;
  protected readonly _width = 8;
  protected readonly _height = 2;
  private readonly id: number
}
