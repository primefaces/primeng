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

// src/object/methods/isFunction.ts
function isFunction(value) {
  return !!(value && value.constructor && value.call && value.apply);
}

// src/mergeprops/index.ts
function mergeProps(...props) {
  return props == null ? void 0 : props.reduce((merged, ps = {}) => {
    for (const key in ps) {
      const value = ps[key];
      if (key === "style") {
        merged["style"] = __spreadValues(__spreadValues({}, merged["style"]), ps["style"]);
      } else if (key === "class") {
        merged["class"] = [merged["class"], ps["class"]].join(" ").trim() || void 0;
      } else if (key === "className") {
        merged["className"] = [merged["className"], ps["className"]].join(" ").trim() || void 0;
      } else if (isFunction(value)) {
        const fn = merged[key];
        merged[key] = fn ? (...args) => {
          fn(...args);
          value(...args);
        } : value;
      } else {
        merged[key] = value;
      }
    }
    return merged;
  }, {});
}
export {
  mergeProps
};
//# sourceMappingURL=index.mjs.map