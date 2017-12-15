// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function clone<T>(array: T[]): T[] {
  let i = array.length;
  const result = [];
  while (i--) {
    result[i] = array[i];
  }
  return result;
}
