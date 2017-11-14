// Tasks and TaskRunners

import { TaskRunnable, Runnable } from "./types";

export interface ITask {
  run(): void;
}

export interface TaskOptions {
  run: TaskRunnable;
  delay?: number;
}

export interface RepeatingTaskOptions extends TaskOptions {
  repeatEvery: number;
}

// a task is something to be run at a certain time, maybe repeating
export class Task {
  public runnable: TaskRunnable;
  public delay: number;
  public repeatEvery: number;
  public readonly originalOptions: TaskOptions;

  constructor(options: TaskOptions)
  constructor(options: RepeatingTaskOptions)
  constructor(options: RepeatingTaskOptions) {
    this.runnable = options.run;
    this.delay = options.delay || 0;
    this.repeatEvery = typeof options.repeatEvery === "undefined" ? -1 : options.repeatEvery;
    this.originalOptions = options; // used by some difficult scaling things as a reference point
  }

  public run() {
    // pass this task to the function so that it can call things like task.stop();
    this.runnable(this);
  }

  public stop() {
    this.runnable = () => { };
    this.delay = 0;
  }
}

// the things that runs tasks
// adds everything tasks use
// most methods prefixed with _ to avoid as many collisions as possible
// almost EVERYTHING extends this (and as such can have tasks on it)
export class TaskRunner {
  private _tasks: Task[] = [];

  constructor() {

  }

  protected runTasks() {
    for (const task of this._tasks) {
      if (task.delay <= 0) {
        task.run();

        // TODO: cleaner way to do this
        if (task.repeatEvery >= 0) {
          task.delay = task.repeatEvery;
        } else {
          task.delay = -1;
        }
      } else {
        task.delay--;
      }
    }

    this._tasks = this._tasks.filter(i => i.delay !== -1);
  }

  // add a task
  // can either be a task or a function
  // if it is a task it is added as you would expect
  // if it is a function it will repeat every frame
  public addTask(task: TaskRunnable): void
  public addTask(task: Task): void
  public addTask(task: Task | TaskRunnable): void {
    if (typeof task === "function") {
      this.addTask(new Task({
        run: task as TaskRunnable,
        repeatEvery: 0,
      }));
    } else {
      task.runnable = task.runnable.bind(this);
      this._tasks.push(task);
    }
  }
}
