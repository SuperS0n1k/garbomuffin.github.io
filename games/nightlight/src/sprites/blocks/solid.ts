import { Block } from "./block";
import { Sprite } from "../../engine/types";
import { AbstractSprite } from "../../engine/sprite";

export class SolidBlock extends Block {
  public solid: boolean = true;
}
