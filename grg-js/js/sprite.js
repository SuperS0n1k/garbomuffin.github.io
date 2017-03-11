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
        this._scale = {
            x: 1,
            y: 1,
        };
        if (typeof options.visible === "boolean")
            this.visible = options.visible;
        if (typeof options.solid === "boolean")
            this.solid = options.solid;
        if (this.visible) {
            this.texture = options.texture;
        }
        if (isNumber(options.width) && options.width > 0)
            this.width = options.width;
        else if (this.texture)
            this.width = this.texture.width;
        if (isNumber(options.height) && options.height > 0)
            this.height = options.height;
        else if (this.texture)
            this.height = this.texture.height;
        if (options.center instanceof Sprite) {
            var center = options.center;
            this.x = center.x + (center.width / 2) - (this.width / 2);
            this.y = center.y + (center.height / 2) - (this.height / 2);
        }
        else {
            if (isNumber(options.x))
                this.x = options.x;
            if (isNumber(options.y))
                this.y = options.y;
        }
        if (isNumber(options.rotation))
            this.rotation = options.rotation;
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
        var scale = this.scale.x || this.scale.y;
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
    touchesContainer(returnBoolean = true, container, requiredType = Sprite, xOffset = 0, yOffset = 0) {
        for (let sprite of container) {
            if (this.intersects(sprite, xOffset, yOffset) && sprite instanceof requiredType)
                return returnBoolean ? true : sprite;
        }
        return false;
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
    set centerX(centerX) {
        if (isNumber(centerX))
            this._x = centerX + (this.width / 2);
    }
    get centerY() {
        return this.y + (this.height / 2);
    }
    set centerY(centerY) {
        if (isNumber(centerY))
            this._y = centerY + (this.height / 2);
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
        this.damage = 0;
        this._solid = false;
        if (isNumber(options.damage) && options.damage > 0)
            this.damage = options.damage;
    }
    frameUpdate() {
        if (this.touchesPlayer()) {
            player.health -= this.damage;
        }
    }
    touchesPlayer() {
        return this.intersects(player);
    }
}
class Particle extends Sprite {
    constructor(options) {
        super(options);
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
        super(Object.assign({}, options));
        this.direction = options.direction;
        projectiles.push(this);
    }
    touchingPlayer() {
        return this.intersects(player);
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
    constructor(options) {
        super(options);
        this.state = 1;
    }
    frameUpdate() {
        var touching = this.touchesContainer(false, projectiles, PlayerProjectile);
        if (touching && !touching.boxDestroy) {
            touching.boxDestroy = true;
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
    constructor() {
        super(...arguments);
        this.damage = 3;
    }
}
/// PROJECTILES
class PlayerProjectile extends Projectile {
    constructor(options) {
        super(Object.assign({}, options, { texture: loadImage("bullet/bullet.png"), width: 6, height: 6 }));
    }
    check() { }
}
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
        this.reset();
    }
    frameUpdate() {
        // up
        if (keys[38] || keys[32] || keys[87]) {
            if (this.touchingSolidBlock(true, 0, 1)) {
                this.yv = JUMP_HEIGHT;
            }
        }
        else {
            if (this.yv > 1) {
                this.yv = 1;
            }
        }
        // right
        if (keys[39] || keys[68]) {
            if (this.xv < WALK_SPEED) {
                this.xv += WALK_SPEED;
            }
            this.direction = DIR_RIGHT;
        }
        // left
        if (keys[37] || keys[65]) {
            if (this.xv > -WALK_SPEED) {
                this.xv -= WALK_SPEED;
            }
            this.direction = DIR_LEFT;
        }
        // x physics
        this.xv *= FRICTION;
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
        while (this.touchingBlock()) {
            this.y--;
        }
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
    }
    frameUpdate() {
        this.x = player.x;
        this.y = player.y | 0;
        this.rotation = player.rotation;
        this.scale = player.scale;
    }
}
class HealthTick extends Sprite {
    constructor(options) {
        super(options);
        this._x = 28;
        this._width = 8;
        this._height = 2;
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
