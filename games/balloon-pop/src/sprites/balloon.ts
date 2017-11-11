import { ISpriteOptions, Sprite } from "../engine/sprite";
import { Task } from "../engine/task";

export class BalloonSprite extends Sprite {
  constructor(options: ISpriteOptions){
    super(options);

    this.addTask(new Task({
      run: this.updateBalloon,
      repeatEvery: 0,
    }));
  }

  private updateBalloon(){
    this.y += 3;

    if (this.y >= this.runtime.canvas.height){
      this.gameover();
      return;
    }

    const containsMouse = this.containsPoint(this.runtime.mouse);
    if (containsMouse && this.runtime.mouse.isClicking){
      console.log("click");
      this.score();
    }
  }

  private score(){
    this.destroy();
    this.runtime.score++;
  }

  private gameover(){
    this.runtime.gameover();
  }
}
