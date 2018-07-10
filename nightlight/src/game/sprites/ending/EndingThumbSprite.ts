import { IImageSpriteOptions, ImageSprite } from "../../../engine/sprites/imagesprite";
import { Task } from "../../../engine/task";
import { StaticNightlightTextSprite } from "../text/StaticNightlightTextSprite";
import { EndingSprite } from "./EndingSprite";
import { NightlightTextSprite, INightlightTextSpriteOptions } from "../text/NightlightTextSprite";
import { scratchCoordinate } from "../../../utils";
import { ZIndexes } from "../zindex";

const FADE_LENGTH = 100;

const TEXT_DELAY = 120;
const TEXT: INightlightTextSpriteOptions[] = [
  {
    text: "one last surprise awaits you",
    position: scratchCoordinate(-112, 164),
  },
  {
    text: "what will it be?",
    position: scratchCoordinate(-64, 140),
  },
  {
    text: "there's just one way to find out",
    position: scratchCoordinate(-128, 116),
  },
  {
    text: "click to continue...",
    position: scratchCoordinate(-80, 92),
  },
];

export class EndingThumbSprite extends ImageSprite {
  private parent: EndingSprite;

  constructor(parent: EndingSprite, options: IImageSpriteOptions) {
    super(options);

    this.parent = parent;
    this.opacity = 0;
    this.fadeIn();

    this.addTask(new Task({
      run: (task) => this.testLevelEditor(task),
      repeatEvery: 0,
      delay: FADE_LENGTH,
    }));
  }

  private fadeIn() {
    return new Promise((resolve) => {
      this.addTask(new Task({
        run: () => this.opacity += 1 / FADE_LENGTH,
        repeatEvery: 0,
        repeatMax: FADE_LENGTH,
        onend: () => {
          this.opacity = 1;
          resolve();
        },
      }));
    })
  }

  private fadeOut(amount: number = 1) {
    return new Promise((resolve) => {
      this.addTask(new Task({
        run: () => this.opacity -= 1 / FADE_LENGTH,
        repeatEvery: 0,
        repeatMax: FADE_LENGTH * amount,
        onend: () => {
          this.opacity = 1 - amount;
          resolve();
        },
      }));
    });
  }

  private testLevelEditor(task: Task) {
    if (this.runtime.mouse.isClick) {
      this.startLevelEditor();
      task.stop();
    }
  }

  private startLevelEditor() {
    // kill our sibling and parent
    // haha yes
    this.parent.endingScene.destroy();
    this.parent.destroy();
    this.runtime.sprites.filter((i) => i instanceof NightlightTextSprite).forEach((i) => i.destroy());
    this.runtime.updateStatic();
    this.runtime.background = "black";

    this.z = -2; // static renders at -1, we want to be below it

    // these are probably one of 3 promises used in the entire program
    // really tho these are pretty dope and i shouldve used them more often
    this.fadeOut(0.75)
      .then(() => this.lastSurpriseText())
      .then(() => this.loadLevelEditor());
  }

  private lastSurpriseText() {
    return new Promise((resolve) => {
      for (let i = 0; i < TEXT.length; i++) {
        const delay = (i + 1) * TEXT_DELAY;
        const opts = TEXT[i];
        this.addTask(new Task({
          run: () => this.displayText(opts),
          delay,
        }));
      }

      this.addTask(new Task({
        run: () => resolve(),
        delay: (TEXT.length + 1) * TEXT_DELAY,
      }));
    })
  }

  private displayText(opts: INightlightTextSpriteOptions) {
    new StaticNightlightTextSprite(opts);
    this.runtime.updateStatic();
  }

  private loadLevelEditor() {
    this.addTask((task) => {
      if (this.runtime.mouse.isClick) {
        task.stop();
        this.z = 0;
        this.fadeIn().then(() => {
          location.search = "?m=leveleditor";
        });
      }
    });
  }
}
