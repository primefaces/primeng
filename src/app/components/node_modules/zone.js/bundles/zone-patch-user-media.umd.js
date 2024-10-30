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
    function patchUserMedia(Zone) {
        Zone.__load_patch('getUserMedia', function (global, Zone, api) {
            function wrapFunctionArgs(func, source) {
                return function () {
                    var args = Array.prototype.slice.call(arguments);
                    var wrappedArgs = api.bindArguments(args, source ? source : func.name);
                    return func.apply(this, wrappedArgs);
                };
            }
            var navigator = global['navigator'];
            if (navigator && navigator.getUserMedia) {
                navigator.getUserMedia = wrapFunctionArgs(navigator.getUserMedia);
            }
        });
    }
    patchUserMedia(Zone);
}));
