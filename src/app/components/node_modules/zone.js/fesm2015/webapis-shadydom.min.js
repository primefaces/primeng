"use strict";
/**
 * @license Angular v<unknown>
 * (c) 2010-2024 Google LLC. https://angular.io/
 * License: MIT
 */function patchShadyDom(t){t.__load_patch("shadydom",((t,e,o)=>{const n=t.HTMLSlotElement;[Object.getPrototypeOf(window),Node.prototype,Text.prototype,Element.prototype,HTMLElement.prototype,n&&n.prototype,DocumentFragment.prototype,Document.prototype].forEach((function(n){n&&n.hasOwnProperty("addEventListener")&&(n[e.__symbol__("addEventListener")]=null,n[e.__symbol__("removeEventListener")]=null,o.patchEventTarget(t,o,[n]))}))}))}patchShadyDom(Zone);