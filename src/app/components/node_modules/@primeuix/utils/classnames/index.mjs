// src/classnames/index.ts
function classNames(...args) {
  if (args) {
    let classes = [];
    for (let i = 0; i < args.length; i++) {
      let className = args[i];
      if (!className) {
        continue;
      }
      const type = typeof className;
      if (type === "string" || type === "number") {
        classes.push(className);
      } else if (type === "object") {
        const _classes = Array.isArray(className) ? [classNames(...className)] : Object.entries(className).map(([key, value]) => value ? key : void 0);
        classes = _classes.length ? classes.concat(_classes.filter((c) => !!c)) : classes;
      }
    }
    return classes.join(" ").trim();
  }
  return void 0;
}
export {
  classNames
};
//# sourceMappingURL=index.mjs.map