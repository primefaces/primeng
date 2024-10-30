"use strict";
/**
 * @license Angular v<unknown>
 * (c) 2010-2024 Google LLC. https://angular.io/
 * License: MIT
 */!function(e){"function"==typeof define&&define.amd?define(e):e()}((function(){!function e(o){o.__load_patch("promisefortest",(function(e,o,n){var s=n.symbol("state"),t=n.symbol("parentUnresolved");Promise[n.symbol("patchPromiseForTest")]=function e(){var n=Promise[o.__symbol__("ZonePromiseThen")];n||(n=Promise[o.__symbol__("ZonePromiseThen")]=Promise.prototype.then,Promise.prototype.then=function(){var e=n.apply(this,arguments);if(null===this[s]){var r=o.current.get("AsyncTestZoneSpec");r&&(r.unresolvedChainedPromiseCount++,e[t]=!0)}return e})},Promise[n.symbol("unPatchPromiseForTest")]=function e(){var n=Promise[o.__symbol__("ZonePromiseThen")];n&&(Promise.prototype.then=n,Promise[o.__symbol__("ZonePromiseThen")]=void 0)}}))}(Zone)}));