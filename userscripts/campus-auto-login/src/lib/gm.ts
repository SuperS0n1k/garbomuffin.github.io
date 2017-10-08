// this is not a module to be imported, but rather something to be triple slash referenced
// because typescript or maybe rollup complains if this is a normal module that exports things

type GM_Value = string | number | boolean;
declare function GM_getValue<T>(key: string, def?: T): GM_Value | T;
declare function GM_setValue(key: string, value: GM_Value): void;
declare function GM_deleteValue(key: string): void;
declare function GM_addStyle(css: string): void;
