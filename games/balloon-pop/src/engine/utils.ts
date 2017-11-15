// https://stackoverflow.com/a/3540295
// tests if the device is probably a mobile phone
export function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// if obj is defined, return obj
// else return def
// used as less verbose option defaulting without neglecting falsy values (|| does that)
export function getOrDefault(obj: any, def: any) {
  if (typeof obj === "undefined") {
    return def;
  } else {
    return obj;
  }
}

// https://stackoverflow.com/a/697841
export function decimalToHex(number: number) {
  if (number < 0) {
    number = 0xFFFFFFFF + number + 1;
  }

  return number.toString(16).toUpperCase();
}
