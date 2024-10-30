'use strict';
/**
 * @license Angular v<unknown>
 * (c) 2010-2024 Google LLC. https://angular.io/
 * License: MIT
 */
function patchUserMedia(Zone) {
    Zone.__load_patch('getUserMedia', (global, Zone, api) => {
        function wrapFunctionArgs(func, source) {
            return function () {
                const args = Array.prototype.slice.call(arguments);
                const wrappedArgs = api.bindArguments(args, source ? source : func.name);
                return func.apply(this, wrappedArgs);
            };
        }
        let navigator = global['navigator'];
        if (navigator && navigator.getUserMedia) {
            navigator.getUserMedia = wrapFunctionArgs(navigator.getUserMedia);
        }
    });
}

patchUserMedia(Zone);
