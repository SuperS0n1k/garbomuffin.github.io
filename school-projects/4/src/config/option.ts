import { getterFrom, setterFrom, ISetterFromOptions, GetterType } from "./utils";

export type ConfigSetter<T> = (val: T) => void;
export type ConfigGetter<T> = () => T;

// naming is wat
export interface IConfigOptionOptions<T> {
  default: T;
  el: HTMLElement;
  type?: GetterType;
  setterOpts?: ISetterFromOptions;
}

export class ConfigOption<T = any> {
  public get: ConfigGetter<T>;
  public set: ConfigSetter<T>;

  // constructor(def: T, el: HTMLElement, get: ConfigGetter<T>, set: ConfigSetter<T>) {
  constructor(options: IConfigOptionOptions<T>) {
    this.get = getterFrom(options.el, options.type) as any;
    this.set = setterFrom(options.el, options.setterOpts) as any;

    this.set(options.default);
  }
}
