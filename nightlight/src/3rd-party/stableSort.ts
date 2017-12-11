// https://gist.github.com/fsufitch/18bb4692d5f46b649890f8fd58765fbc

type Comparator<T> = (a: T, b: T) => number;

interface Array<T> {
  stableSort(cmp?: Comparator<T>): T[];
}

let defaultCmp: Comparator<any> = (a, b) => {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  } else {
    return 0;
  }
};

Array.prototype.stableSort = function<T>(cmp: Comparator<T> = defaultCmp): T[] {
  const self: T[] = this; // for typing
  const stabilized = self.map((el, index) => (([el, index]) as [T, number]));

  const stableCmp: Comparator<[T, number]> = (a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  };

  stabilized.sort(stableCmp);
  for (let i = 0; i < self.length; i++) {
    self[i] = stabilized[i][0];
  }

  return self;
};
