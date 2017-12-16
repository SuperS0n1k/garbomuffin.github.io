// defines a few reusable types
// removes duplication

import { Nightlight } from "../game";
import { AbstractSprite } from "./sprite";
import { Task } from "./task";

export type TImage = HTMLImageElement;
export type Runnable = () => void;
export type TaskRunnable = (task: Task) => void;

export type TGame = Nightlight;

export type Sprite = AbstractSprite;

export type TBackground = string | CanvasGradient | CanvasPattern;
