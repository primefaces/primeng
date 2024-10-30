declare function compare<T = any>(value1: T, value2: T, comparator: (val1: T, val2: T) => number, order?: number): number;

declare function contains<T = any>(value: T, list: T[]): boolean;

declare function deepEquals(obj1: any, obj2: any): boolean;

declare function equals(obj1: any, obj2: any, field?: string): boolean;

declare function filter<T = any>(value: T[], fields: string[], filterValue: string): T[];

declare function findIndexInList<T = any>(value: T, list: T[]): number;

/**
 * Firefox-v103 does not currently support the "findLast" method. It is stated that this method will be supported with Firefox-v104.
 * https://caniuse.com/mdn-javascript_builtins_array_findlast
 */
declare function findLast<T = any>(arr: T[], callback: (value: T, index: number, array: T[]) => boolean): T | undefined;

/**
 * Firefox-v103 does not currently support the "findLastIndex" method. It is stated that this method will be supported with Firefox-v104.
 * https://caniuse.com/mdn-javascript_builtins_array_findlastindex
 */
declare function findLastIndex<T = any>(arr: T[], callback: (value: T, index: number, array: T[]) => boolean): number;

declare function getKeyValue(obj: any, key?: string, params?: any): any;

declare function insertIntoOrderedArray<T>(item: T, index: number, arr: T[], sourceArr: any[]): void;

declare function isArray(value: any, empty?: boolean): boolean;

declare function isDate(value: any): boolean;

declare function isEmpty(value: any): boolean;

declare function isFunction(value: any): value is Function;

declare function isLetter(char: string): boolean;

declare function isNotEmpty(value: any): boolean;

declare function isNumber(value: any): boolean;

declare function isObject(value: any, empty?: boolean): boolean;

declare function isPrintableCharacter(char?: string): boolean;

declare function isScalar(value: any): boolean;

declare function isString(value: any, empty?: boolean): boolean;

declare function localeComparator(): (val1: string, val2: string) => number;

declare function matchRegex(str: string, regex?: RegExp): boolean;

declare function mergeKeys(...args: Record<string, any>[]): Record<string, any>;

declare function minifyCSS(css?: string): string | undefined;

declare function nestedKeys(obj?: Record<string, any>, parentKey?: string): string[];

declare function omit(obj: any, ...keys: any[]): any;

declare function removeAccents(str: string): string;

declare function reorderArray<T>(value: T[], from: number, to: number): void;

declare function resolve<T>(obj: T | ((...params: any[]) => T), ...params: any[]): T;

declare function resolveFieldData(data: any, field: any): any;

declare function sort<T>(value1: T, value2: T, order: number | undefined, comparator: (val1: T, val2: T) => number, nullSortOrder?: number): number;

declare function stringify(value: any, indent?: number, currentIndent?: number): string;

declare function toCapitalCase(str: string): string;

declare function toFlatCase(str: string): string;

declare function toKebabCase(str: string): string;

declare function toTokenKey(str: string): string;

declare function toValue(value: any): any;

export { compare, contains, deepEquals, equals, filter, findIndexInList, findLast, findLastIndex, getKeyValue, insertIntoOrderedArray, isArray, isDate, isEmpty, isFunction, isLetter, isNotEmpty, isNumber, isObject, isPrintableCharacter, isScalar, isString, localeComparator, matchRegex, mergeKeys, minifyCSS, nestedKeys, omit, removeAccents, reorderArray, resolve, resolveFieldData, sort, stringify, toCapitalCase, toFlatCase, toKebabCase, toTokenKey, toValue };
