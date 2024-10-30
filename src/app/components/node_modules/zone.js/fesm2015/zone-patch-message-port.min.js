"use strict";
/**
 * @license Angular v<unknown>
 * (c) 2010-2024 Google LLC. https://angular.io/
 * License: MIT
 */function patchMessagePort(e){e.__load_patch("MessagePort",((e,t,s)=>{const o=e.MessagePort;void 0!==o&&o.prototype&&s.patchOnProperties(o.prototype,["message","messageerror"])}))}patchMessagePort(Zone);