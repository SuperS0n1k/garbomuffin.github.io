import { ConfigSetter, ConfigGetter } from "./option";

export type GetterType = "number" | "text" | "checkbox";
export function getterFrom(el: HTMLElement, type: "text"): ConfigGetter<string>;
export function getterFrom(el: HTMLElement, type: "number"): ConfigGetter<number>;
export function getterFrom(el: HTMLElement, type: "checkbox"): ConfigGetter<boolean>;
export function getterFrom(el: HTMLElement, type: GetterType = "text"): ConfigGetter<string | number | boolean> {
  let getter: ConfigGetter<any> = () => el.textContent || "";

  if (el instanceof HTMLTextAreaElement) {
    getter = () => el.value;
  }

  if (el instanceof HTMLInputElement) {
    if (el.type === "checkbox") {
      getter = () => el.checked;
    } else {
      getter = () => el.value;
    }
  }

  if (type === "number") {
    return () => {
      const val = getter().trim();

      if (val === "") {
        return 0;
      } else {
        return Number(val);
      }
    };
  }

  return getter;
}

export interface ISetterFromOptions<T = any> {
  transform?: (value: T) => T | any;
  callback?: (value: T) => void;
  onchange?: boolean;
}
export function setterFrom(el: HTMLElement, opts: ISetterFromOptions = {}): ConfigSetter<string> {
  function _getSetterFunction<T = any>(): ConfigSetter<T> {
    if (el instanceof HTMLTextAreaElement) {
      return (value: any) => el.value = value;
    }

    if (el instanceof HTMLInputElement) {
      const type = el.type;
      if (type === "text") {
        return (value: any) => el.value = value;
      } else if (type === "number") {
        return (value: any) => el.value = value.toString();
      } else if (type === "checkbox") {
        return (value: any) => el.checked = value;
      } else {
        console.warn(`Unsupported input type: ${type}`);
      }
    }

    return (value: any) => el.textContent = value;
  }

  const setter = _getSetterFunction();

  const stack: Func[] = [];
  if (opts.transform) {
    stack.push(opts.transform);
  }
  stack.push(setter);
  if (opts.callback) {
    stack.push(opts.callback);
  }

  const functionStack = generateFunctionStack(stack);
  if (opts.onchange) {
    el.onchange = () => {
      functionStack(getterFrom(el)());
    };
  }

  return functionStack;
}

type Func = (...args: any[]) => any;
function generateFunctionStack(functions: Func[]) {
  return (value: any) => {
    for (const func of functions) {
      value = func(value);
    }
    return value;
  };
}
