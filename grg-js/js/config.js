const WIDTH = 480;
const HEIGHT = 360;
const LEVEL_LENGTH = 30;
const BLOCK_HEIGHT = 16;
const BLOCK_WIDTH = BLOCK_HEIGHT;
const PLAYER_HEIGHT = 16;
const PLAYER_WIDTH = BLOCK_HEIGHT;
const BLOCKED_INPUTS = [32, 37, 38, 39, 40];
const FRICTION = 0.8 / 3;
const GRAVITY = 0.15;
const WALK_SPEED = 0.5 / 1.75;
const MAX_SPEED = 4 / 2;
const WALK_ANIMATION_SPEED = 6; // frames
const JUMP_HEIGHT = 3.5;
const PLAYER_STARTING_X = 2 * BLOCK_WIDTH;
const DIR_RIGHT = 1;
const DIR_LEFT = -1;
const PROJECTILE_SPEED = MAX_SPEED * 2;
const MAX_HEALTH = 28;
const SHOT_DELAY = 250;
const BOX_DESTRUCTION_DELAY = 250;
const PI = Math.PI;
const DEGREE = PI / 180;
const ROT_RIGHT = 1;
const ROT_LEFT = -1;
const FULL_ROT = 2 * PI;
const DAMAGE_DELAY = 250;
const SMILEY_PROJECTILE_SPEED = PROJECTILE_SPEED;
const SMILEY_JUMP_HEIGHT = JUMP_HEIGHT;
const SMILEY_SHOOT_DELAY = 1000;
const POKERFACE_SPEED = 1;