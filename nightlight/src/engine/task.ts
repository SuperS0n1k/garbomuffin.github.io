/*
 * Tasks and TaskRunners are a very core part of the engine
 *
 * Handles what to run, when to run it, to repeat it, and removal.
 */

import { Runnable, TaskRunnable } from "./types";
import { getOrDefault } from "./utils";

export interface ITask {
  run(): void;
}

export interface ITaskOptions {
  run: TaskRunnable;
  delay?: number;
}

export interface IRepeatingTaskOptions extends ITaskOptions {
  repeatEvery: number;
  repeatMax?: number;
}

export type TaskOptions = ITaskOptions | IRepeatingTaskOptions;

// a task is something to be run at a certain time, maybe repeating
export class Task {
  public runnable: TaskRunnable;
  public delay: number;
  public repeatEvery: number;
  public repeatCount: number = 0;
  public repeatMax: number;
  public readonly originalOptions: ITaskOptions;

  constructor(options: TaskOptions) {
    const runnable = options.run;
    const delay = getOrDefault(options.delay, 0);
    const repeatEvery = getOrDefault((options as IRepeatingTaskOptions).repeatEvery, -1);
    const repeatMax = getOrDefault((options as IRepeatingTaskOptions).repeatMax, Infinity);

    this.originalOptions = options;

    this.runnable = runnable;
    this.delay = delay;
    this.repeatEvery = repeatEvery;
    this.repeatMax = repeatMax;
  }

  public run() {
    // pass this task to the function so that it can call things like task.stop();
    this.runnable(this);
  }

  public stop() {
    this.delay = -1;
  }
}

// the things that runs tasks
// adds everything tasks use
// most methods prefixed with _ to avoid as many collisions as possible
// almost EVERYTHING extends this (and as such can have tasks on it)
export class TaskRunner {
  private _tasks: Task[] = [];

  protected runTasks() {
    for (const task of this._tasks) {
      if (task.delay <= 0) {
        task.run();
        task.repeatCount++;

        if (task.delay === -1) {
          // called task.stop();
        } else if (task.repeatEvery >= 0 && task.repeatCount < task.repeatMax) {
          task.delay = task.repeatEvery;
        } else {
          task.delay = -1;
        }
      } else {
        task.delay--;
      }
    }

    this._tasks = this._tasks.filter((task) => task.delay !== -1);
  }

  public resetTasks() {
    this._tasks = [];
  }

  // add a task
  // can either be a task or a function
  // if it is a task it is added as you would expect
  // if it is a function it will repeat every frame
  public addTask(task: Task | TaskRunnable): Task {
    if (typeof task === "function") {
      return this.addTask(new Task({
        run: task as TaskRunnable,
        repeatEvery: 0,
      }));
    } else {
      task.runnable = task.runnable.bind(this);
      this._tasks.push(task);
      return task;
    }
  }
}
