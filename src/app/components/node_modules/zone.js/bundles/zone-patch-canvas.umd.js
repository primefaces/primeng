'use strict';
/**
 * @license Angular v<unknown>
 * (c) 2010-2024 Google LLC. https://angular.io/
 * License: MIT
 */
(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
        factory();
})((function () {
    'use strict';
    function patchCanvas(Zone) {
        Zone.__load_patch('canvas', function (global, Zone, api) {
            var HTMLCanvasElement = global['HTMLCanvasElement'];
            if (typeof HTMLCanvasElement !== 'undefined' &&
                HTMLCanvasElement.prototype &&
                HTMLCanvasElement.prototype.toBlob) {
                api.patchMacroTask(HTMLCanvasElement.prototype, 'toBlob', function (self, args) {
                    return { name: 'HTMLCanvasElement.toBlob', target: self, cbIdx: 0, args: args };
                });
            }
        });
    }
    patchCanvas(Zone);
}));
