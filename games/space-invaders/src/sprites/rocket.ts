import { ImageSprite, IImageSpriteOptions } from "../engine/sprites/imagesprite";

export class RocketSprite extends ImageSprite {
    constructor(options: IImageSpriteOptions) {
        super(options);

        this.addTask(this.move);
    }

    private move() {
        this.x = this.runtime.mouse.position.x - (this.width / 2);
        this.y = this.runtime.canvas.height - this.height;
    }
}
