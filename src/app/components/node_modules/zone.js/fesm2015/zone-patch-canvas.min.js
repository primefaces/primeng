"use strict";
/**
 * @license Angular v<unknown>
 * (c) 2010-2024 Google LLC. https://angular.io/
 * License: MIT
 */function patchCanvas(t){t.__load_patch("canvas",((t,a,o)=>{const n=t.HTMLCanvasElement;void 0!==n&&n.prototype&&n.prototype.toBlob&&o.patchMacroTask(n.prototype,"toBlob",((t,a)=>({name:"HTMLCanvasElement.toBlob",target:t,cbIdx:0,args:a})))}))}patchCanvas(Zone);