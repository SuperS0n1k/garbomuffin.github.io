/// BASE CLASSES
class Sprite {
    constructor(options) {
        this._x = 0;
        this._y = 0;
        this._width = 0;
        this._height = 0;
        this._solid = true;
        this._rotation = 0;
        this._scale = {
            x: 1,
            y: 1,
        };
        if (typeof options.solid === "boolean")
            this.solid = options.solid;
        if (options.texture instanceof HTMLImageElement)
            this.texture = options.texture;
        if (isNumber(options.width) && options.width > 0)
            this.width = options.width;
        else if (this.texture)
            this.width = this.texture.width;
        if (isNumber(options.height) && options.height > 0)
            this.height = options.height;
        else if (this.texture)
            this.height = this.texture.height;
        if (isNumber(options.rotation))
            this.rotation = options.rotation;
        if (options.center) {
            this.center(options.center);
        }
        else {
            if (isNumber(options.x))
                this.x = options.x;
            if (isNumber(options.y))
                this.y = options.y;
        }
    }
    center(sprite) {
        this.x = sprite.x + (isNumber(sprite.width) ? sprite.width / 2 : 0) - (this.width / 2);
        this.y = sprite.y + (isNumber(sprite.height) ? sprite.height / 2 : 0) - (this.height / 2);
    }
    intersects(sprite, xOffset = 0, yOffset = 0) {
        return this.x + xOffset < sprite.x + sprite.width &&
            this.x + this.width + xOffset > sprite.x &&
            this.y < sprite.y + sprite.height + yOffset &&
            this.y + this.height + yOffset > sprite.y;
    }
    touchingContainer(returnBoolean = true, container, requiredType = Sprite, xOffset = 0, yOffset = 0) {
        for (let sprite of container) {
            if (this.intersects(sprite, xOffset, yOffset) && sprite instanceof requiredType)
                return returnBoolean ? true : sprite;
        }
        return false;
    }
    touchingSolidBlock(returnBoolean = true, xOffset = 0, yOffset = 0) {
        for (let sprite of blocks) {
            if (sprite.solid && this.intersects(sprite, xOffset, yOffset))
                return returnBoolean ? true : sprite;
        }
        return false;
    }
    touchingBlock(returnBoolean = true, xOffset = 0, yOffset = 0) {
        for (let sprite of blocks) {
            if (this.intersects(sprite, xOffset, yOffset))
                return returnBoolean ? true : sprite;
        }
        return false;
    }
    touchingPlayer() {
        return this.intersects(player);
    }
    offScreen() {
        return this.x + this.width < 0 || this.x > WIDTH || this.y > HEIGHT || this.y + this.height < 0;
    }
    get x() {
        return this._x;
    }
    set x(x) {
        if (isNumber(x))
            this._x = x;
    }
    get y() {
        return this._y;
    }
    set y(y) {
        if (isNumber(y))
            this._y = y;
    }
    get centerX() {
        return this.x + (this.width / 2);
    }
    get centerY() {
        return this.y + (this.height / 2);
    }
    get width() {
        return this._width;
    }
    set width(width) {
        if (isNumber(width) && width > 0)
            this._width = width;
    }
    get height() {
        return this._height;
    }
    set height(height) {
        if (isNumber(height) && height > 0)
            this._height = height;
    }
    get rotation() {
        return this._rotation;
    }
    set rotation(rotation) {
        if (isNumber(rotation))
            this._rotation = rotation;
    }
    get scale() {
        return this._scale;
    }
    set scale(scale) {
        if (isNumber(scale.x) && isNumber(scale.y))
            this._scale = scale;
    }
    get texture() {
        return this._texture;
    }
    set texture(texture) {
        if (texture instanceof HTMLImageElement)
            this._texture = texture;
    }
    get solid() {
        return this._solid;
    }
    set solid(solid) {
        if (typeof solid === "boolean")
            this._solid = solid;
    }
}
class RenderedSprite extends Sprite {
    constructor(options) {
        super(options);
        this._visible = true;
        this._zIndex = 0;
        this.persistent = false;
        if (typeof options.persistent === "boolean")
            this.persistent = options.persistent;
        if (typeof options.visible === "boolean")
            this.visible = options.visible;
        if (isNumber(options.zIndex))
            this.zIndex = options.zIndex;
        if (typeof options.frameUpdate === "function") {
            this.frameUpdate = options.frameUpdate.bind(this);
        }
        if (this.frameUpdate) {
            updatable.push(this);
        }
        sprites.push(this);
    }
    render() {
        if (!this.visible)
            return;
        var scale = this.scale.x !== 1 || this.scale.y !== 1;
        var rotation = this.rotation;
        if (scale || rotation) {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.translate(this.width / 2, this.height / 2);
            if (rotation) {
                ctx.rotate(this.rotation);
            }
            else if (scale) {
                ctx.scale(this.scale.x, this.scale.y);
            }
            ctx.drawImage(this.texture, -this.width / 2, -this.height / 2, this.width, this.height);
            ctx.restore();
        }
        else {
            ctx.drawImage(this.texture, this.x, this.y, this.width, this.height);
        }
    }
    destroy() {
        for (let container of containers) {
            var index = container.indexOf(this);
            if (index > -1) {
                container.splice(index, 1);
            }
        }
    }
    get visible() {
        return this._visible;
    }
    set visible(visible) {
        if (typeof visible === "boolean")
            this._visible = visible;
    }
    get zIndex() {
        return this._zIndex;
    }
    set zIndex(zIndex) {
        if (isNumber(zIndex)) {
            this._zIndex = zIndex;
            sprites.sort(); // some zindex changed so sort the list again to update rendering order
        }
    }
}
class Block extends RenderedSprite {
    constructor(options) {
        super(options);
        blocks.push(this);
    }
}
class Enemy extends RenderedSprite {
    constructor(options) {
        super(options);
        this._solid = false;
        enemies.push(this);
    }
    frameUpdate() {
        if (this.touchingPlayer()) {
            player.damage(this.playerDamage);
        }
        this.update();
    }
    damage(amount) {
        if (isNumber(amount)) {
            this.health -= amount;
            if (this.health < 0) {
                this.kill();
            }
        }
    }
    kill() {
        spawnParticle(BreakParticle, this);
        this.destroy();
    }
}
class Particle extends RenderedSprite {
    constructor() {
        super(...arguments);
        this.frame = 0;
        this.lifeSpan = 30;
        this.speed = 30;
    }
    frameUpdate() {
        this.frame++;
        if (this.offScreen() || this.frame > this.lifeSpan)
            this.destroy();
        this.x += this.speed * Math.cos(this.rotation);
        this.y += this.speed * -Math.sin(this.rotation);
    }
}
// protected readonly speed: number = 3;
// protected readonly lifeSpan: number = 30;
Particle.count = 8;
Particle.angleIncrement = 360 / Particle.count;
class Projectile extends RenderedSprite {
    constructor(options) {
        super(options);
        this.direction = options.direction;
        projectiles.push(this);
        this.y = Math.floor(this.y);
    }
    frameUpdate() {
        this.x += this.direction * PROJECTILE_SPEED;
        this.check();
        if (this.offScreen())
            this.destroy();
    }
    check() { }
}
/// SPECIAL BLOCKS
class BoxTile extends Block {
    constructor() {
        super(...arguments);
        this.state = 1;
    }
    frameUpdate() {
        var touching = this.touchingContainer(false, projectiles, PlayerProjectile);
        if (touching) {
            touching.destroy();
            this.state++;
            if (this.state > 3) {
                spawnParticle(BreakParticle, this);
                this.destroy();
            }
            else {
                this.texture = loadImage(`tiles/box/${this.state}.png`);
            }
        }
    }
}
class ArrowTile extends Block {
    constructor(options) {
        // oh my god
        // how does this work
        super(Object.assign({}, options, { width: 8, height: 8, solid: false, center: {
                x: options.x,
                y: options.y,
                width: BLOCK_WIDTH,
                height: BLOCK_HEIGHT,
            } }));
    }
}
class UpgradeTile extends Block {
    frameUpdate() {
        if (this.touchingPlayer()) {
            maxSpeed *= 1.5;
            this.destroy();
        }
    }
}
class HiddenBrickTile extends Block {
    frameUpdate() {
        if (remainingEnemies === 0) {
            this.solid = true;
            this.visible = true;
        }
    }
}
/// PARTICLES
class BreakParticle extends Particle {
    constructor(options) {
        super(Object.assign({}, options, { height: 5, width: 5 }));
        this.speed = 3;
        this.lifeSpan = 5;
    }
}
BreakParticle.count = 8;
BreakParticle.type = "break";
// class BossParticle extends Particle {
//   public constructor(options: SpriteOptions){
//     super({
//       ...options,
//       height: 12,
//       width: 12,
//     });
//   }
//   public static count = 16;
//   public static type = "boss";
// }
class PlayerDeathParticle extends Particle {
    constructor() {
        super(...arguments);
        this.yv = 5 / 2;
    }
    frameUpdate() {
        this.y -= this.yv;
        this.yv -= GRAVITY;
        this.x += 1;
    }
}
PlayerDeathParticle.count = 9;
PlayerDeathParticle.angleIncrement = 22.5;
PlayerDeathParticle.type = "grahm";
/// ENEMIES
class LargeSmiley extends Enemy {
    constructor(options) {
        super(options);
        this.dead = false;
        this.yv = 0;
        this._width = 32;
        this._height = 32;
        this.playerDamage = 6;
        this.health = 10;
        // dirty workaround
        this.y -= BLOCK_HEIGHT;
        this.lastProjectile = Date.now();
        remainingEnemies++;
    }
    update() {
        if (this.dead) {
            this.yv -= GRAVITY;
            this.y -= this.yv;
        }
        else {
            var curDate = Date.now();
            if (curDate - this.lastProjectile > SMILEY_SHOOT_DELAY) {
                this.lastProjectile = curDate;
                new SmileyProjectile({
                    x: this.x,
                    y: this.y,
                });
            }
        }
    }
    kill() {
        if (this.dead)
            return;
        this.dead = true;
        this.yv = 2;
        remainingEnemies--;
    }
}
class SmileyProjectile extends Enemy {
    constructor(options) {
        super(options);
        this.health = 2;
        this.playerDamage = 3;
        this.yv = 0;
        this._width = 16;
        this._height = 16;
        this.texture = loadImage("enemy/faceproj.png");
    }
    update() {
        this.x -= SMILEY_PROJECTILE_SPEED;
        this.y -= this.yv;
        this.yv -= GRAVITY;
        if (this.touchingSolidBlock()) {
            this.yv = SMILEY_JUMP_HEIGHT;
        }
    }
}
class Pokerface extends Enemy {
    constructor() {
        super(...arguments);
        this.health = 3;
        this.playerDamage = 2;
    }
    update() {
        this.x += POKERFACE_SPEED * this.scale.x;
        if (this.touchingSolidBlock() || !this.touchingSolidBlock(true, BLOCK_WIDTH / 2 * this.scale.x, BLOCK_HEIGHT)) {
            this.scale.x = -this.scale.x;
        }
    }
}
class ShootingFace extends Enemy {
    constructor() {
        super(...arguments);
        // 0 = waiting
        // 1 = shooting
        this.state = 1;
        this.projectiles = 0;
        this.lastState = 0;
        this.health = 3;
        this.playerDamage = 3;
    }
    update() {
        var date = Date.now();
        var diff = date - this.lastState;
        if (this.state === 0) {
            if (diff > SHOOTING_FACE_DELAY_A) {
                this.state = 1;
            }
        }
        else if (this.state === 1) {
            if (diff > SHOOTING_FACE_DELAY_B) {
                new ShootingFaceProjectile({
                    center: this,
                    texture: loadImage("enemy/face3proj.png"),
                });
                this.projectiles++;
                this.lastState = date;
            }
            if (this.projectiles === SHOOTING_FACE_SHOTS) {
                this.state = 0;
                this.projectiles = 0;
            }
        }
    }
}
/// BOSSES
class BossRoutine {
    constructor(options) {
        this.update = options.update;
        if (typeof options.init === "function")
            this.init = options.init;
        if (typeof options.onend === "function")
            this.onend = options.onend;
    }
}
class Boss extends Enemy {
    constructor() {
        super(...arguments);
        this.routines = [];
        this.currentRoutine = null;
        this.health = 10; // or something
        this.playerDamage = 5; // or something
        this.state = 0;
        this.yv = 0;
        // public static particle = BossParticle;
    }
    update() {
        if (this.state === 0) {
            if (this.health < 20) {
                this.health++;
            }
            else {
                console.log("[boss] health increase finished...");
                this.state = 1;
            }
        }
        else {
            if (this.bossUpdate)
                this.bossUpdate();
            // routines
            if (!this.currentRoutine && getRandomInt(1, BOSS_ROUTINE_CHANCE) === 1) {
                var random = getRandomInt(0, this.routines.length - 1);
                var routine = this.routines[random];
                this.startRoutine(routine);
            }
        }
    }
    _yvelocity() {
        this.y -= this.yv;
        this.yv -= GRAVITY;
        if (this.touchingSolidBlock()) {
            var increment = this.yv > 0 ? -1 : 1;
            while (this.touchingSolidBlock()) {
                this.y -= increment;
            }
            return true;
        }
        return false;
    }
    // just resets variables
    resetRoutine() {
        this.yv = 0;
    }
    startRoutine(routine) {
        this.bossUpdate = routine.update;
        this.resetRoutine();
        if (routine.init)
            routine.init(this);
        this.currentRoutine = routine;
    }
    endRoutine() {
        if (typeof this.currentRoutine.onend === "function") {
            this.currentRoutine.onend.call(this);
        }
        this.currentRoutine = null;
        this.bossUpdate = null;
    }
}
class TrollBoss extends Boss {
    constructor() {
        super(...arguments);
        this.routines = [
            new BossRoutine({
                init: function (sprite) {
                    sprite.yv = 13.35 / 2;
                },
                update: this._jump,
                onend: this._end,
            }),
            new BossRoutine({
                update: this._dash,
                onend: this._end,
            }),
        ];
        this.velocity = false;
        this.direction = true;
        // public static readonly x1 = 0
        // public static readonly x2 = 314
        // protected _x = TrollBoss.x2;
        // protected _y = 172;
    }
    _jump() {
        if (this._yvelocity()) {
            return this.endRoutine();
        }
        if (this.direction)
            this.x -= 4;
        else
            this.x += 4;
    }
    _dash() {
        if ((this.direction && this.x <= 44) || (!this.direction && this.x >= 400)) {
            return this.endRoutine();
        }
        if (this.direction)
            this.x -= 4;
        else
            this.x += 4;
    }
    _end() {
        this.direction = !this.direction;
    }
}
/// PROJECTILES
class PlayerProjectile extends Projectile {
    constructor(options) {
        super(Object.assign({}, options, { texture: loadImage("bullet/bullet.png"), width: 6, height: 6 }));
        this.destroyAfter = false;
    }
    check() {
        var touching = this.touchingContainer(false, enemies);
        if (touching && !this.destroyAfter) {
            touching.damage(1);
            this.destroyAfter = true;
        }
        else if (this.destroyAfter) {
            this.destroy();
        }
    }
}
PlayerProjectile.damage = 3;
class ShootingFaceProjectile extends Projectile {
    constructor(options) {
        super(Object.assign({}, options, { width: 8, height: 8 }));
        this.direction = DIR_LEFT;
    }
    check() {
        if (this.touchingPlayer()) {
            player.damage(3);
        }
    }
}
/// SPRITES
class PlayerHitbox extends RenderedSprite {
    constructor() {
        super({});
        this._yv = 0;
        this._xv = 0;
        this._lastShot = 0;
        this._direction = DIR_RIGHT;
        this._health = MAX_HEALTH;
        this._lastZ = false;
        this._height = PLAYER_HEIGHT;
        this._width = PLAYER_WIDTH;
        this._visible = false;
        this._solid = false;
        this.persistent = true;
        this.frame = 0;
        this._vulnerable = true;
        this.reset();
    }
    frameUpdate() {
        // up
        if (keys[38] || keys[32]) {
            if (this.touchingSolidBlock(true)) {
                this.yv = JUMP_HEIGHT;
            }
        }
        else {
            if (this.yv > 1) {
                this.yv = 1;
            }
        }
        var right = keys[39];
        var left = keys[37];
        // right/left
        if (right && left) {
            this.direction = DIR_RIGHT;
        }
        else {
            if (left) {
                this.xv -= WALK_SPEED;
                if (this.xv < -maxSpeed) {
                    this.xv = -maxSpeed;
                }
                this.direction = DIR_LEFT;
                this.frame++;
            }
            else if (right) {
                this.xv += WALK_SPEED;
                if (this.xv > maxSpeed) {
                    this.xv = maxSpeed;
                }
                this.direction = DIR_RIGHT;
                this.frame++;
            }
            else {
                this.frame = 1;
                if (this.xv > 0) {
                    this.xv -= FRICTION;
                    if (this.xv < 0)
                        this.xv = 0;
                }
                else if (this.xv < 0) {
                    this.xv += FRICTION;
                    if (this.xv > 0)
                        this.xv = 0;
                }
            }
        }
        // x physics
        this.x += this.xv;
        this.x = Math.round(this.x);
        var block = this.touchingSolidBlock(false, 0, -1);
        if (block) {
            let increment = this.xv > 0 ? -1 : 1;
            while (this.intersects(block, 0, -1)) {
                this.x += increment;
            }
            this.xv = 0;
        }
        // y physics
        this.yv -= GRAVITY;
        this.y -= this.yv;
        var block = this.touchingSolidBlock(false, 0, -1);
        if (block) {
            let increment = this.yv < 0 ? -1 : 1;
            while (this.intersects(block, 0, -1)) {
                this.y += increment;
            }
            // dirty workarounds are the best workarounds
            if (this.yv > 0) {
                this.y++;
            }
            this.yv = 0;
        }
        // z/shoot
        if (keys[90] && !this.lastZ && playerProjectiles() < MAX_PROJECTILES) {
            this.shoot();
        }
        this.lastZ = keys[90];
        // a/rapid shoot
        if (keys[65] && Date.now() - this.lastShot > RAPID_SHOT_DELAY && playerProjectiles() < MAX_PROJECTILES) {
            this.shoot();
            this.lastShot = Date.now();
        }
        if (this.x + this.width >= WIDTH) {
            nextLevel();
        }
        if (this.x <= 0) {
            this.x = 0;
        }
        if (this.y > HEIGHT) {
            this.reset();
        }
    }
    reset() {
        this.x = PLAYER_STARTING_X;
        this.y = HEIGHT - 1;
        this.yv = 0;
        this.xv = 0;
        this.vulnerable = true;
        playerGraphic.visible = true;
        while (this.touchingBlock()) {
            this.y--;
        }
    }
    shoot() {
        new PlayerProjectile({
            direction: this.direction,
            center: this,
        });
    }
    damage(amount) {
        if (isNumber(amount) && amount > 0 && this.vulnerable) {
            this.health -= amount;
            this.vulnerable = false;
            playerDamage();
        }
    }
    kill() {
        this.visible = false;
        new PlayerDeathParticle({
            x: this.x,
            y: this.y,
        });
    }
    get yv() {
        return this._yv;
    }
    set yv(yv) {
        if (isNumber(yv))
            this._yv = yv;
    }
    get xv() {
        return this._xv;
    }
    set xv(xv) {
        if (isNumber(xv))
            this._xv = xv;
    }
    get direction() {
        return this._direction;
    }
    set direction(direction) {
        if (direction === DIR_RIGHT || direction === DIR_LEFT) {
            this._direction = direction;
            this.scale.x = direction;
        }
    }
    get lastShot() {
        return this._lastShot;
    }
    set lastShot(lastShot) {
        if (isFinite(lastShot))
            this._lastShot = lastShot;
    }
    get health() {
        return this._health;
    }
    set health(health) {
        if (isNumber(health))
            this._health = health;
    }
    get vulnerable() {
        return this._vulnerable;
    }
    set vulnerable(vulnerable) {
        if (typeof vulnerable === "boolean")
            this._vulnerable = vulnerable;
    }
    get lastZ() {
        return this._lastZ;
    }
    set lastZ(lastZ) {
        if (typeof lastZ === "boolean")
            this._lastZ = lastZ;
    }
}
class PlayerGraphic extends RenderedSprite {
    constructor() {
        super({
            width: PLAYER_HEIGHT,
            height: PLAYER_HEIGHT,
            texture: loadImage("player/still.png")
        });
        this._height = PLAYER_HEIGHT;
        this._width = PLAYER_WIDTH;
        this._solid = false;
        this._zIndex = 10;
        this.persistent = true;
        this.walkFrame = false; // there's only 2 frames in the walking animation so this is easiest
    }
    frameUpdate() {
        this.x = player.x;
        this.y = player.y | 0;
        this.rotation = player.rotation;
        this.scale = player.scale;
        if (!player.touchingSolidBlock()) {
            this.texture = loadImage("player/still.png");
            player.frame = 1;
        }
        else if (!(keys[39] || keys[37])) {
            this.texture = loadImage("player/still.png");
            this.height = 16;
            this.walkFrame = false;
        }
        else {
            if (player.frame % WALK_ANIMATION_SPEED === 0) {
                player.frame = 1;
                this.walkFrame = !this.walkFrame;
            }
            if (this.walkFrame) {
                this.texture = loadImage("player/move.png");
                this.height = 15;
                this.y++;
            }
            else {
                this.texture = loadImage("player/still.png");
                this.height = 16;
            }
        }
    }
}
class HealthTick extends RenderedSprite {
    constructor(options) {
        super(options);
        this._x = 28;
        this._width = 8;
        this._height = 2;
        this._zIndex = 10;
        this.persistent = true;
        this.id = options.id;
    }
    frameUpdate() {
        if (this.id < player.health) {
            this.texture = loadImage("health/bar.png");
        }
        else {
            this.texture = loadImage("health/empty.png");
        }
    }
}
class HitStun extends RenderedSprite {
    constructor() {
        super({
            center: player,
            width: 16,
            height: 16,
            texture: loadImage("player/stun.png")
        });
        this._zIndex = 20;
        this._visible = true;
        this.repititions = 0;
        this.frame = 0;
        this._width = 12;
        this._height = 12;
    }
    frameUpdate() {
        this.frame++;
        this.center(player);
        if (this.frame == 3) {
            this.visible = false;
        }
        else if (this.frame == 6) {
            this.frame = 0;
            this.repititions++;
            this.visible = true;
        }
        if (this.repititions > 10) {
            player.vulnerable = true;
            this.destroy();
        }
    }
}
