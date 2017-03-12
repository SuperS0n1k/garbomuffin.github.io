/// BASE CLASSES
class Sprite {
    constructor(options) {
        this._x = 0;
        this._y = 0;
        this._width = 0;
        this._height = 0;
        this._visible = true;
        this._solid = true;
        this._rotation = 0;
        this._zIndex = 0;
        this.persistent = false;
        this._scale = {
            x: 1,
            y: 1,
        };
        if (typeof options.visible === "boolean")
            this.visible = options.visible;
        if (typeof options.persistent === "boolean")
            this.persistent = options.persistent;
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
        if (isNumber(options.zIndex))
            this.zIndex = options.zIndex;
        if (isNumber(options.rotation))
            this.rotation = options.rotation;
        if (options.center instanceof Sprite) {
            this.center(options.center);
        }
        else {
            if (isNumber(options.x))
                this.x = options.x;
            if (isNumber(options.y))
                this.y = options.y;
        }
        if (typeof options.frameUpdate === "function") {
            this.frameUpdate = options.frameUpdate.bind(this);
        }
        if (this.frameUpdate) {
            updatable.push(this);
        }
        sprites.push(this);
    }
    center(sprite) {
        this.x = sprite.x + (sprite.width / 2) - (this.width / 2);
        this.y = sprite.y + (sprite.height / 2) - (this.height / 2);
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
    destroy() {
        for (let container of containers) {
            var index = container.indexOf(this);
            if (index > -1) {
                container.splice(index, 1);
            }
        }
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
    get zIndex() {
        return this._zIndex;
    }
    set zIndex(zIndex) {
        if (isNumber(zIndex)) {
            this._zIndex = zIndex;
            sprites.sort(); // some zindex changed so sort the list again to update rendering order
        }
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
    get visible() {
        return this._visible;
    }
    set visible(visible) {
        if (typeof visible === "boolean")
            this._visible = visible;
    }
    get solid() {
        return this._solid;
    }
    set solid(solid) {
        if (typeof solid === "boolean")
            this._solid = solid;
    }
}
class Block extends Sprite {
    constructor(options) {
        super(options);
        blocks.push(this);
    }
}
class Enemy extends Sprite {
    constructor(options) {
        super(options);
        this.health = 0;
        this.playerDamage = 0;
        this._solid = false;
        enemies.push(this);
    }
    frameUpdate() {
        if (this.touchingPlayer()) {
            player.damage(this.playerDamage);
        }
        if (this.health <= 0) {
            this.destroy();
        }
        this.update();
    }
    update() { }
    damage(amount) {
        if (isNumber(amount)) {
            this.health -= amount;
            if (this.health > 0) {
                // todo
            }
        }
    }
}
class Particle extends Sprite {
    constructor() {
        super(...arguments);
        this.frame = 0;
    }
    frameUpdate() {
        this.frame++;
        if (this.offScreen() || this.frame > this.lifeSpan)
            this.destroy();
        this.x += this.speed * Math.cos(this.rotation);
        this.y += this.speed * -Math.sin(this.rotation);
    }
}
class Projectile extends Sprite {
    constructor(options) {
        super(options);
        this.direction = options.direction;
        projectiles.push(this);
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
                spawnParticle(BreakParticle, this, this.centerX, this.centerY);
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
        super(Object.assign({}, options, { width: 8, height: 8, solid: false, center: new Sprite({
                x: options.x,
                y: options.y,
                width: BLOCK_WIDTH,
                height: BLOCK_HEIGHT,
                visible: false,
                solid: false,
            }) }));
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
/// PARTICLES
class BreakParticle extends Particle {
    constructor(options) {
        super(Object.assign({}, options, { height: 6, width: 6 }));
        this.speed = 3;
        this.lifeSpan = 5;
    }
}
// I hope there's a better way to do this...
BreakParticle["count"] = 8;
BreakParticle["type"] = "break";
/// ENEMIES
class LargeSmiley extends Enemy {
    constructor(options) {
        super(options);
        this._width = 32;
        this._height = 32;
        this.playerDamage = 3;
        this.health = 10;
        // dirty workaround
        this.y -= BLOCK_HEIGHT;
        this.lastProjectile = Date.now();
    }
    update() {
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
/// SPRITES
class PlayerHitbox extends Sprite {
    constructor() {
        super({});
        this._yv = 0;
        this._xv = 0;
        this._lastShot = 0;
        this._direction = DIR_RIGHT;
        this._health = MAX_HEALTH;
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
            if (this.touchingSolidBlock(true, 0, 1)) {
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
        if (right && left) {
            this.direction = DIR_RIGHT;
        }
        else {
            // left
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
            this.yv = 0;
        }
        // z/shoot
        if (keys[90] && Date.now() - this.lastShot > SHOT_DELAY) {
            new PlayerProjectile({
                direction: this.direction,
                x: Math.round(this.x),
                y: Math.round(this.y),
            });
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
        while (this.touchingBlock()) {
            this.y--;
        }
    }
    damage(amount) {
        if (isNumber(amount) && amount > 0 && this.vulnerable) {
            this.health -= amount;
            this.vulnerable = false;
            playerDamage();
        }
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
}
class PlayerGraphic extends Sprite {
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
        if (!(keys[39] || keys[37])) {
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
class HealthTick extends Sprite {
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
class HitStun extends Sprite {
    constructor() {
        super({
            center: player,
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
        this.render();
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