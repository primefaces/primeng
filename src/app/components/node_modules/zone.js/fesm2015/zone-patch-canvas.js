'use strict';
/**
 * @license Angular v<unknown>
 * (c) 2010-2024 Google LLC. https://angular.io/
 * License: MIT
 */
function patchCanvas(Zone) {
    Zone.__load_patch('canvas', (global, Zone, api) => {
        const HTMLCanvasElement = global['HTMLCanvasElement'];
        if (typeof HTMLCanvasElement !== 'undefined' &&
            HTMLCanvasElement.prototype &&
            HTMLCanvasElement.prototype.toBlob) {
            api.patchMacroTask(HTMLCanvasElement.prototype, 'toBlob', (self, args) => {
                return { name: 'HTMLCanvasElement.toBlob', target: self, cbIdx: 0, args: args };
            });
        }
    });
}

patchCanvas(Zone);
