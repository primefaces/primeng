var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};

// src/object/methods/isEmpty.ts
function isEmpty(value) {
  return value === null || value === void 0 || value === "" || Array.isArray(value) && value.length === 0 || !(value instanceof Date) && typeof value === "object" && Object.keys(value).length === 0;
}

// src/object/methods/compare.ts
function compare(value1, value2, comparator, order = 1) {
  let result = -1;
  const emptyValue1 = isEmpty(value1);
  const emptyValue2 = isEmpty(value2);
  if (emptyValue1 && emptyValue2) result = 0;
  else if (emptyValue1) result = order;
  else if (emptyValue2) result = -order;
  else if (typeof value1 === "string" && typeof value2 === "string") result = comparator(value1, value2);
  else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
  return result;
}

// src/object/methods/deepEquals.ts
function _deepEquals(obj1, obj2, visited = /* @__PURE__ */ new WeakSet()) {
  if (obj1 === obj2) return true;
  if (!obj1 || !obj2 || typeof obj1 !== "object" || typeof obj2 !== "object") return false;
  if (visited.has(obj1) || visited.has(obj2)) return false;
  visited.add(obj1).add(obj2);
  let arrObj1 = Array.isArray(obj1), arrObj2 = Array.isArray(obj2), i, length, key;
  if (arrObj1 && arrObj2) {
    length = obj1.length;
    if (length != obj2.length) return false;
    for (i = length; i-- !== 0; ) if (!_deepEquals(obj1[i], obj2[i], visited)) return false;
    return true;
  }
  if (arrObj1 != arrObj2) return false;
  let dateObj1 = obj1 instanceof Date, dateObj2 = obj2 instanceof Date;
  if (dateObj1 != dateObj2) return false;
  if (dateObj1 && dateObj2) return obj1.getTime() == obj2.getTime();
  let regexpObj1 = obj1 instanceof RegExp, regexpObj2 = obj2 instanceof RegExp;
  if (regexpObj1 != regexpObj2) return false;
  if (regexpObj1 && regexpObj2) return obj1.toString() == obj2.toString();
  let keys = Object.keys(obj1);
  length = keys.length;
  if (length !== Object.keys(obj2).length) return false;
  for (i = length; i-- !== 0; ) if (!Object.prototype.hasOwnProperty.call(obj2, keys[i])) return false;
  for (i = length; i-- !== 0; ) {
    key = keys[i];
    if (!_deepEquals(obj1[key], obj2[key], visited)) return false;
  }
  return true;
}
function deepEquals(obj1, obj2) {
  return _deepEquals(obj1, obj2);
}

// src/object/methods/isFunction.ts
function isFunction(value) {
  return !!(value && value.constructor && value.call && value.apply);
}

// src/object/methods/isNotEmpty.ts
function isNotEmpty(value) {
  return !isEmpty(value);
}

// src/object/methods/resolveFieldData.ts
function resolveFieldData(data, field) {
  if (!data || !field) {
    return null;
  }
  try {
    const value = data[field];
    if (isNotEmpty(value)) return value;
  } catch (e) {
  }
  if (Object.keys(data).length) {
    if (isFunction(field)) {
      return field(data);
    } else if (field.indexOf(".") === -1) {
      return data[field];
    } else {
      let fields = field.split(".");
      let value = data;
      for (let i = 0, len = fields.length; i < len; ++i) {
        if (value == null) {
          return null;
        }
        value = value[fields[i]];
      }
      return value;
    }
  }
  return null;
}

// src/object/methods/equals.ts
function equals(obj1, obj2, field) {
  if (field) return resolveFieldData(obj1, field) === resolveFieldData(obj2, field);
  else return deepEquals(obj1, obj2);
}

// src/object/methods/contains.ts
function contains(value, list) {
  if (value != null && list && list.length) {
    for (let val of list) {
      if (equals(value, val)) return true;
    }
  }
  return false;
}

// src/object/methods/filter.ts
function filter(value, fields, filterValue) {
  let filteredItems = [];
  if (value) {
    for (let item of value) {
      for (let field of fields) {
        if (String(resolveFieldData(item, field)).toLowerCase().indexOf(filterValue.toLowerCase()) > -1) {
          filteredItems.push(item);
          break;
        }
      }
    }
  }
  return filteredItems;
}

// src/object/methods/findIndexInList.ts
function findIndexInList(value, list) {
  let index = -1;
  if (list) {
    for (let i = 0; i < list.length; i++) {
      if (list[i] === value) {
        index = i;
        break;
      }
    }
  }
  return index;
}

// src/object/methods/findLast.ts
function findLast(arr, callback) {
  let item;
  if (isNotEmpty(arr)) {
    try {
      item = arr.findLast(callback);
    } catch (e) {
      item = [...arr].reverse().find(callback);
    }
  }
  return item;
}

// src/object/methods/findLastIndex.ts
function findLastIndex(arr, callback) {
  let index = -1;
  if (isNotEmpty(arr)) {
    try {
      index = arr.findLastIndex(callback);
    } catch (e) {
      index = arr.lastIndexOf([...arr].reverse().find(callback));
    }
  }
  return index;
}

// src/object/methods/isObject.ts
function isObject(value, empty = true) {
  return value instanceof Object && value.constructor === Object && (empty || Object.keys(value).length !== 0);
}

// src/object/methods/resolve.ts
function resolve(obj, ...params) {
  return isFunction(obj) ? obj(...params) : obj;
}

// src/object/methods/isString.ts
function isString(value, empty = true) {
  return typeof value === "string" && (empty || value !== "");
}

// src/object/methods/toFlatCase.ts
function toFlatCase(str) {
  return isString(str) ? str.replace(/(-|_)/g, "").toLowerCase() : str;
}

// src/object/methods/getKeyValue.ts
function getKeyValue(obj, key = "", params = {}) {
  const fKeys = toFlatCase(key).split(".");
  const fKey = fKeys.shift();
  return fKey ? isObject(obj) ? getKeyValue(resolve(obj[Object.keys(obj).find((k) => toFlatCase(k) === fKey) || ""], params), fKeys.join("."), params) : void 0 : resolve(obj, params);
}

// src/object/methods/insertIntoOrderedArray.ts
function insertIntoOrderedArray(item, index, arr, sourceArr) {
  if (arr.length > 0) {
    let injected = false;
    for (let i = 0; i < arr.length; i++) {
      let currentItemIndex = findIndexInList(arr[i], sourceArr);
      if (currentItemIndex > index) {
        arr.splice(i, 0, item);
        injected = true;
        break;
      }
    }
    if (!injected) {
      arr.push(item);
    }
  } else {
    arr.push(item);
  }
}

// src/object/methods/isArray.ts
function isArray(value, empty = true) {
  return Array.isArray(value) && (empty || value.length !== 0);
}

// src/object/methods/isDate.ts
function isDate(value) {
  return value instanceof Date && value.constructor === Date;
}

// src/object/methods/isLetter.ts
function isLetter(char) {
  return /^[a-zA-Z\u00C0-\u017F]$/.test(char);
}

// src/object/methods/isNumber.ts
function isNumber(value) {
  return isNotEmpty(value) && !isNaN(value);
}

// src/object/methods/isPrintableCharacter.ts
function isPrintableCharacter(char = "") {
  return isNotEmpty(char) && char.length === 1 && !!char.match(/\S| /);
}

// src/object/methods/isScalar.ts
function isScalar(value) {
  return value != null && (typeof value === "string" || typeof value === "number" || typeof value === "bigint" || typeof value === "boolean");
}

// src/object/methods/localeComparator.ts
function localeComparator() {
  return new Intl.Collator(void 0, { numeric: true }).compare;
}

// src/object/methods/matchRegex.ts
function matchRegex(str, regex) {
  if (regex) {
    const match = regex.test(str);
    regex.lastIndex = 0;
    return match;
  }
  return false;
}

// src/object/methods/mergeKeys.ts
function mergeKeys(...args) {
  const _mergeKeys = (target = {}, source = {}) => {
    const mergedObj = __spreadValues({}, target);
    Object.keys(source).forEach((key) => {
      if (isObject(source[key]) && key in target && isObject(target[key])) {
        mergedObj[key] = _mergeKeys(target[key], source[key]);
      } else {
        mergedObj[key] = source[key];
      }
    });
    return mergedObj;
  };
  return args.reduce((acc, obj, i) => i === 0 ? obj : _mergeKeys(acc, obj), {});
}

// src/object/methods/minifyCSS.ts
function minifyCSS(css) {
  return css ? css.replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, "").replace(/ {2,}/g, " ").replace(/ ([{:}]) /g, "$1").replace(/([;,]) /g, "$1").replace(/ !/g, "!").replace(/: /g, ":") : css;
}

// src/object/methods/nestedKeys.ts
function nestedKeys(obj = {}, parentKey = "") {
  return Object.entries(obj).reduce((o, [key, value]) => {
    const currentKey = parentKey ? `${parentKey}.${key}` : key;
    isObject(value) ? o = o.concat(nestedKeys(value, currentKey)) : o.push(currentKey);
    return o;
  }, []);
}

// src/object/methods/omit.ts
function omit(obj, ...keys) {
  if (!isObject(obj)) return obj;
  const copy = __spreadValues({}, obj);
  keys == null ? void 0 : keys.flat().forEach((key) => delete copy[key]);
  return copy;
}

// src/object/methods/removeAccents.ts
function removeAccents(str) {
  const accentCheckRegex = /[\xC0-\xFF\u0100-\u017E]/;
  if (str && accentCheckRegex.test(str)) {
    const accentsMap = {
      A: /[\xC0-\xC5\u0100\u0102\u0104]/g,
      AE: /[\xC6]/g,
      C: /[\xC7\u0106\u0108\u010A\u010C]/g,
      D: /[\xD0\u010E\u0110]/g,
      E: /[\xC8-\xCB\u0112\u0114\u0116\u0118\u011A]/g,
      G: /[\u011C\u011E\u0120\u0122]/g,
      H: /[\u0124\u0126]/g,
      I: /[\xCC-\xCF\u0128\u012A\u012C\u012E\u0130]/g,
      IJ: /[\u0132]/g,
      J: /[\u0134]/g,
      K: /[\u0136]/g,
      L: /[\u0139\u013B\u013D\u013F\u0141]/g,
      N: /[\xD1\u0143\u0145\u0147\u014A]/g,
      O: /[\xD2-\xD6\xD8\u014C\u014E\u0150]/g,
      OE: /[\u0152]/g,
      R: /[\u0154\u0156\u0158]/g,
      S: /[\u015A\u015C\u015E\u0160]/g,
      T: /[\u0162\u0164\u0166]/g,
      U: /[\xD9-\xDC\u0168\u016A\u016C\u016E\u0170\u0172]/g,
      W: /[\u0174]/g,
      Y: /[\xDD\u0176\u0178]/g,
      Z: /[\u0179\u017B\u017D]/g,
      a: /[\xE0-\xE5\u0101\u0103\u0105]/g,
      ae: /[\xE6]/g,
      c: /[\xE7\u0107\u0109\u010B\u010D]/g,
      d: /[\u010F\u0111]/g,
      e: /[\xE8-\xEB\u0113\u0115\u0117\u0119\u011B]/g,
      g: /[\u011D\u011F\u0121\u0123]/g,
      i: /[\xEC-\xEF\u0129\u012B\u012D\u012F\u0131]/g,
      ij: /[\u0133]/g,
      j: /[\u0135]/g,
      k: /[\u0137,\u0138]/g,
      l: /[\u013A\u013C\u013E\u0140\u0142]/g,
      n: /[\xF1\u0144\u0146\u0148\u014B]/g,
      p: /[\xFE]/g,
      o: /[\xF2-\xF6\xF8\u014D\u014F\u0151]/g,
      oe: /[\u0153]/g,
      r: /[\u0155\u0157\u0159]/g,
      s: /[\u015B\u015D\u015F\u0161]/g,
      t: /[\u0163\u0165\u0167]/g,
      u: /[\xF9-\xFC\u0169\u016B\u016D\u016F\u0171\u0173]/g,
      w: /[\u0175]/g,
      y: /[\xFD\xFF\u0177]/g,
      z: /[\u017A\u017C\u017E]/g
    };
    for (let key in accentsMap) {
      str = str.replace(accentsMap[key], key);
    }
  }
  return str;
}

// src/object/methods/reorderArray.ts
function reorderArray(value, from, to) {
  if (value && from !== to) {
    if (to >= value.length) {
      to %= value.length;
      from %= value.length;
    }
    value.splice(to, 0, value.splice(from, 1)[0]);
  }
}

// src/object/methods/sort.ts
function sort(value1, value2, order = 1, comparator, nullSortOrder = 1) {
  const result = compare(value1, value2, comparator, order);
  let finalSortOrder = order;
  if (isEmpty(value1) || isEmpty(value2)) {
    finalSortOrder = nullSortOrder === 1 ? order : nullSortOrder;
  }
  return finalSortOrder * result;
}

// src/object/methods/stringify.ts
function stringify(value, indent = 2, currentIndent = 0) {
  const currentIndentStr = " ".repeat(currentIndent);
  const nextIndentStr = " ".repeat(currentIndent + indent);
  if (isArray(value)) {
    return "[" + value.map((v) => stringify(v, indent, currentIndent + indent)).join(", ") + "]";
  } else if (isDate(value)) {
    return value.toISOString();
  } else if (isFunction(value)) {
    return value.toString();
  } else if (isObject(value)) {
    return "{\n" + Object.entries(value).map(([k, v]) => `${nextIndentStr}${k}: ${stringify(v, indent, currentIndent + indent)}`).join(",\n") + `
${currentIndentStr}}`;
  } else {
    return JSON.stringify(value);
  }
}

// src/object/methods/toCapitalCase.ts
function toCapitalCase(str) {
  return isString(str, false) ? str[0].toUpperCase() + str.slice(1) : str;
}

// src/object/methods/toKebabCase.ts
function toKebabCase(str) {
  return isString(str) ? str.replace(/(_)/g, "-").replace(/[A-Z]/g, (c, i) => i === 0 ? c : "-" + c.toLowerCase()).toLowerCase() : str;
}

// src/object/methods/toTokenKey.ts
function toTokenKey(str) {
  return isString(str) ? str.replace(/[A-Z]/g, (c, i) => i === 0 ? c : "." + c.toLowerCase()).toLowerCase() : str;
}

// src/object/methods/toValue.ts
function toValue(value) {
  if (value && typeof value === "object") {
    if (value.hasOwnProperty("current")) {
      return value.current;
    } else if (value.hasOwnProperty("value")) {
      return value.value;
    }
  }
  return resolve(value);
}
export {
  compare,
  contains,
  deepEquals,
  equals,
  filter,
  findIndexInList,
  findLast,
  findLastIndex,
  getKeyValue,
  insertIntoOrderedArray,
  isArray,
  isDate,
  isEmpty,
  isFunction,
  isLetter,
  isNotEmpty,
  isNumber,
  isObject,
  isPrintableCharacter,
  isScalar,
  isString,
  localeComparator,
  matchRegex,
  mergeKeys,
  minifyCSS,
  nestedKeys,
  omit,
  removeAccents,
  reorderArray,
  resolve,
  resolveFieldData,
  sort,
  stringify,
  toCapitalCase,
  toFlatCase,
  toKebabCase,
  toTokenKey,
  toValue
};
//# sourceMappingURL=index.mjs.map