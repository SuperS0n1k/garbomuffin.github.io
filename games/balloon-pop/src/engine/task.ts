import { Runnable } from "./types";

export interface ITask {
  run(): void;
}

export interface TaskOptions {
  run: Runnable;
  delay?: number;
}

export interface RepeatingTaskOptions extends TaskOptions {
  repeatEvery: number;
}

export class Task {
  constructor(options: TaskOptions)
  constructor(options: RepeatingTaskOptions)
  constructor(options: RepeatingTaskOptions){
    this.runnable = options.run;
    this.delay = options.delay || 0;
    this.repeatEvery = typeof options.repeatEvery === "undefined" ? -1 : options.repeatEvery;
  }

  public run(){
    this.runnable();
  }

  public runnable: Runnable;
  public delay: number;
  public readonly repeatEvery: number;
}

export class TaskRunner {
  constructor(){

  }

  private _tasks: Task[] = [];

  protected runTasks(){
    for (const task of this._tasks){
      if (task.delay === 0){
        task.run();
        if (task.repeatEvery === -1){
          task.delay = -1;
        }else{
          task.delay = task.repeatEvery;
        }
      }else{
        task.delay--;
      }
    }

    this._tasks = this._tasks.filter(i => i.delay >= 0);
  }

  private _removeTask(task: Task){
    var index = this._tasks.indexOf(task);
  }

  public addTask(task: Task){
    task.runnable = task.runnable.bind(this);
    this._tasks.push(task);
  }
}
