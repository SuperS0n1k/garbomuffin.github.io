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
  persistent?: boolean
  zIndex?: number
}

interface SpriteScale {
  x: number
  y: number
}

interface ProjectileOptions extends SpriteOptions {
  direction?: number
}

interface HealthTickOptions extends SpriteOptions {
  id: number
}

/// BASE CLASSES

class Sprite {
  public constructor(options?: SpriteOptions){
    if (typeof options.visible === "boolean") this.visible = options.visible;
    if (typeof options.persistent === "boolean") this.persistent = options.persistent;
    if (typeof options.solid === "boolean") this.solid = options.solid;

    if (options.texture instanceof HTMLImageElement) this.texture = options.texture;

    if (isNumber(options.width) && options.width > 0) this.width = options.width;
    else if (this.texture) this.width = this.texture.width;
    
    if (isNumber(options.height) && options.height > 0) this.height = options.height;
    else if (this.texture) this.height = this.texture.height;
    if (isNumber(options.zIndex)) this.zIndex = options.zIndex;
    if (isNumber(options.rotation)) this.rotation = options.rotation

    if (options.center instanceof Sprite){
      this.center(options.center);
      if (isNumber(options.x)) this.x += options.x;
      if (isNumber(options.y)) this.y += options.y;
    }else{
      if (isNumber(options.x)) this.x = options.x;
      if (isNumber(options.y)) this.y = options.y;
    }

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
  protected _zIndex: number = 0
  public readonly persistent: boolean = false
  protected _scale: SpriteScale = {
    x: 1,
    y: 1,
  }

  public frameUpdate?(): void

  public center(sprite: Sprite){
    this.x = sprite.x + (sprite.width / 2) - (this.width / 2);
    this.y = sprite.y + (sprite.height / 2) - (this.height / 2);
  }
  public render(){
    if (!this.visible) return;
    var scale = this.scale.x !== 1 || this.scale.y !== 1;
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
  public touchingContainer(returnBoolean = true, container: Container, requiredType = Sprite, xOffset = 0, yOffset = 0): boolean|Sprite{
    for (let sprite of container){
      if (this.intersects(sprite, xOffset, yOffset) && sprite instanceof requiredType) return returnBoolean ? true : sprite;
    }
    return false;
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
  public touchingPlayer(){
    return this.intersects(player);
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
  public get centerY(){
    return this.y + (this.height / 2);
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
  public get zIndex(){
    return this._zIndex;
  }
  public set zIndex(zIndex){
    if (isNumber(zIndex)){
      this._zIndex = zIndex;
      sprites.sort(); // some zindex changed so sort the list again to update rendering order
    }
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
  public constructor(options: SpriteOptions){
    super(options);
    enemies.push(this);
  }

  public frameUpdate(){
    if (this.touchingPlayer()){
      player.damage(this.playerDamage);
    }
    this.update();
  }
  protected update?()

  public damage(amount){
    if (isNumber(amount)){
      this.health -= amount;
      if (this.health < 0){
        this.kill();
      }
    }
  }
  public kill(){
    spawnParticle(BreakParticle, this);
    this.destroy();
  }

  protected abstract health:number;
  protected abstract readonly playerDamage:number;
  protected readonly _solid:boolean = false;
  public static particle;
}

abstract class Particle extends Sprite {
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
    super(options);
    this.direction = options.direction;
    projectiles.push(this);
    this.y = Math.floor(this.y);
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
  public frameUpdate(){
    var touching = <PlayerProjectile> this.touchingContainer(false, projectiles, PlayerProjectile);
    if (touching){
      touching.destroy();
      this.state++;
      if (this.state > 3){
        spawnParticle(BreakParticle, this);
        this.destroy();
      }else{
        this.texture = loadImage(`tiles/box/${this.state}.png`);
      }
    }
  }

  private state = 1;
}

class ArrowTile extends Block {
  public constructor(options: SpriteOptions){
    // oh my god
    // how does this work
    super({
      ...options,
      width: 8,
      height: 8,
      solid: false,
      center: new Sprite({
        x: options.x,
        y: options.y,
        width: BLOCK_WIDTH,
        height: BLOCK_HEIGHT,
        visible: false,
        solid: false,
      })
    });
  }
}

class UpgradeTile extends Block {
  public frameUpdate(){
    if (this.touchingPlayer()){
      maxSpeed *= 1.5;
      this.destroy();
    }
  }
}

class HiddenBrickTile extends Block {
  public frameUpdate(){
    if (remainingEnemies === 0){
      this.solid = true;
      this.visible = true;
    }
  }
}

/// PARTICLES

class BreakParticle extends Particle {
  public constructor(options: SpriteOptions){
    super({
      ...options,
      height: 5,
      width: 5,
    });
  }

  protected readonly speed = 3;
  protected readonly lifeSpan = 5;

  public static count = 8;
  public static type = "break";
}

class BossParticle extends Particle {
  public constructor(options: SpriteOptions){
    super({
      ...options,
      height: 12,
      width: 12,
    });
  }

  protected readonly speed = 3;
  protected readonly lifeSpan = Infinity;
  public static count = 16;
  public static type = "boss";
}

/// ENEMIES

class LargeSmiley extends Enemy {
  public constructor(options: SpriteOptions){
    super(options);
    // dirty workaround
    this.y -= BLOCK_HEIGHT;
    this.lastProjectile = Date.now();
    remainingEnemies++;
  }

  public update(){
    if (this.dead){
      if (this.deadState === 0){
        this.y -= 3;
        this.deadStateProgress++;
        if (this.deadStateProgress > 3){
          this.deadState = 1;
        }
      }else if (this.deadState === 1){
        this.y += 3;
      }
      if (this.offScreen()){
        this.destroy();
      }
    }else{
      var curDate = Date.now();
      if (curDate - this.lastProjectile > SMILEY_SHOOT_DELAY){
        this.lastProjectile = curDate;
        new SmileyProjectile({
          x: this.x,
          y: this.y,
        });
      }
    }
  }

  public kill(){
    if (this.dead) return;
    this.dead = true;
    remainingEnemies--;
  }

  private deadState = 0;
  private deadStateProgress = 0;
  private dead = false;
  protected lastProjectile: number;
  protected readonly _width = 32;
  protected readonly _height = 32;
  protected readonly playerDamage = 6;
  protected health = 10;
}

class SmileyProjectile extends Enemy {
  public constructor(options: SpriteOptions){
    super(options);
    this.texture = loadImage("enemy/faceproj.png");
  }

  protected health = 2;
  protected playerDamage = 3;
  protected yv = 0;
  protected _width = 16;
  protected _height = 16;

  protected update(){
    this.x -= SMILEY_PROJECTILE_SPEED;
    this.y -= this.yv;

    this.yv -= GRAVITY;
    if (this.touchingSolidBlock()){
      this.yv = SMILEY_JUMP_HEIGHT;
    }
  }
}

class Pokerface extends Enemy {
  public update(){
    this.x += POKERFACE_SPEED * this.scale.x;
    if (this.touchingSolidBlock() || !this.touchingSolidBlock(true, BLOCK_WIDTH / 2 * this.scale.x, BLOCK_HEIGHT)){
      this.scale.x = -this.scale.x;
    }
  }

  protected health = 3;
  protected playerDamage = 2;
}

class ShootingFace extends Enemy {
  public update(){
    var date = Date.now();
    var diff = date - this.lastState;
    if (this.state === 0){
      if (diff > SHOOTING_FACE_DELAY_A){
        this.state = 1;
      }
    }else if (this.state === 1){
      if (diff > SHOOTING_FACE_DELAY_B){
        new ShootingFaceProjectile({
          center: this,
          texture: loadImage("enemy/face3proj.png"),
        });
        this.projectiles++;
        this.lastState = date;
      }
      if (this.projectiles === SHOOTING_FACE_SHOTS){
        this.state = 0;
        this.projectiles = 0;
      }
    }
  }

  // 0 = waiting
  // 1 = shooting
  private state = 1;
  private projectiles = 0;
  private lastState = 0;
  protected health = 3;
  protected playerDamage = 3;
}

/// BOSSES

abstract class Boss extends Enemy {
  protected health = 20; // or something
  protected playerDamage = 5; // or something
  public static particle = BossParticle;
}

class TrollBoss extends Boss {}

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

  protected static damage = 3;
  private destroyAfter = false;

  protected check(){
    var touching = <Enemy> this.touchingContainer(false, enemies)
    if (touching && !this.destroyAfter){
      touching.damage(1);
      this.destroyAfter = true;
    }else if (this.destroyAfter){
      this.destroy();
    }
  }
}

class ShootingFaceProjectile extends Projectile {
  public constructor(options: SpriteOptions){
    super({
      ...options,
      width: 8,
      height: 8,
    });
  }

  protected check(){
    if (this.touchingPlayer()){
      player.damage(3);
    }
  }

  protected readonly direction = DIR_LEFT;
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
  private _lastZ = false;
  protected readonly _height = PLAYER_HEIGHT;
  protected readonly _width = PLAYER_WIDTH;
  protected readonly _visible = false;
  protected readonly _solid = false;
  public readonly persistent = true;
  public frame = 0;
  public _vulnerable = true

  public frameUpdate(){
    // up
    if (keys[38] || keys[32]){
      if (this.touchingSolidBlock(true)){
        this.yv = JUMP_HEIGHT;
      }
    }else{
      if (this.yv > 1){
        this.yv = 1;
      }
    }

    var right = keys[39];
    var left = keys[37];

    // right/left
    if (right && left){
      this.direction = DIR_RIGHT;
    }else{
      if (left){
        this.xv -= WALK_SPEED;
        if (this.xv < -maxSpeed){
          this.xv = -maxSpeed;
        }
        this.direction = DIR_LEFT;
        this.frame++;
      }else if (right){
        this.xv += WALK_SPEED;
        if (this.xv > maxSpeed){
          this.xv = maxSpeed;
        }
        this.direction = DIR_RIGHT;
        this.frame++;
      }else{
        this.frame = 1;
        if (this.xv > 0){
          this.xv -= FRICTION;
          if (this.xv < 0) this.xv = 0;
        }else if (this.xv < 0){
          this.xv += FRICTION;
          if (this.xv > 0) this.xv = 0;
        }
      }
    }

    // x physics
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
      // dirty workarounds are the best workarounds
      if (this.yv > 0){
        this.y++;
      }
      this.yv = 0;
    }

    // z/shoot
    if (keys[90] && !this.lastZ && playerProjectiles() < MAX_PROJECTILES){
      this.shoot();
    }
    this.lastZ = keys[90];

    // a/rapid shoot
    if (keys[65] && Date.now() - this.lastShot > RAPID_SHOT_DELAY && playerProjectiles() < MAX_PROJECTILES){
      this.shoot();
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
    this.vulnerable = true;
    while (this.touchingBlock()){
      this.y--;
    }
  }
  private shoot(){
    new PlayerProjectile({
      direction: this.direction,
      center: this,
      y: -3,
    });
  }
  public damage(amount){
    if (isNumber(amount) && amount > 0 && this.vulnerable){
      this.health -= amount;
      this.vulnerable = false;
      playerDamage();
    }
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
  public get vulnerable(){
    return this._vulnerable;
  }
  public set vulnerable(vulnerable){
    if (typeof vulnerable === "boolean") this._vulnerable = vulnerable;
  }
  private get lastZ(){
    return this._lastZ;
  }
  private set lastZ(lastZ){
    if (typeof lastZ === "boolean") this._lastZ = lastZ;
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

    if (!player.touchingSolidBlock()){
      this.texture = loadImage("player/still.png");
      player.frame = 1;
    }else if (!(keys[39] || keys[37])){
      this.texture = loadImage("player/still.png");
      this.height = 16;
      this.walkFrame = false;
    }else{
      if (player.frame % WALK_ANIMATION_SPEED === 0){
        player.frame = 1;
        this.walkFrame = !this.walkFrame;
      }
      if (this.walkFrame){
        this.texture = loadImage("player/move.png");
        this.height = 15;
        this.y++;
      }else{
        this.texture = loadImage("player/still.png");
        this.height = 16;
      }
    }
  }

  protected readonly _height = PLAYER_HEIGHT;
  protected readonly _width = PLAYER_WIDTH;
  protected readonly _solid = false;
  protected readonly _zIndex = 10;
  public readonly persistent = true;
  private walkFrame = false; // there's only 2 frames in the walking animation so this is easiest
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

  private readonly id: number;
  protected readonly _x = 28;
  protected readonly _width = 8;
  protected readonly _height = 2;
  protected readonly _zIndex = 10;
  public readonly persistent = true;
}

class HitStun extends Sprite {
  public constructor(){
    super({
      center: player,
      texture: loadImage("player/stun.png")
    });
  }

  public frameUpdate(){
    this.render();
    this.frame++;
    this.center(player);
    if (this.frame == 3){
      this.visible = false;
    }else if (this.frame == 6){
      this.frame = 0;
      this.repititions++;
      this.visible = true;
    }
    if (this.repititions > 10){
      player.vulnerable = true;
      this.destroy();
    }
  }

  protected _zIndex = 20;
  protected _visible = true;
  private repititions = 0;
  private frame = 0;
  protected _width = 12;
  protected _height = 12;
}
