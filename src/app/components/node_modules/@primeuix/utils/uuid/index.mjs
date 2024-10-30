// src/uuid/index.ts
var lastIds = {};
function uuid(prefix = "pui_id_") {
  if (!lastIds.hasOwnProperty(prefix)) {
    lastIds[prefix] = 0;
  }
  lastIds[prefix]++;
  return `${prefix}${lastIds[prefix]}`;
}
export {
  uuid
};
//# sourceMappingURL=index.mjs.map