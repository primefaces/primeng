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
    function patchRtcPeerConnection(Zone) {
        Zone.__load_patch('RTCPeerConnection', function (global, Zone, api) {
            var RTCPeerConnection = global['RTCPeerConnection'];
            if (!RTCPeerConnection) {
                return;
            }
            var addSymbol = api.symbol('addEventListener');
            var removeSymbol = api.symbol('removeEventListener');
            RTCPeerConnection.prototype.addEventListener = RTCPeerConnection.prototype[addSymbol];
            RTCPeerConnection.prototype.removeEventListener = RTCPeerConnection.prototype[removeSymbol];
            // RTCPeerConnection extends EventTarget, so we must clear the symbol
            // to allow patch RTCPeerConnection.prototype.addEventListener again
            RTCPeerConnection.prototype[addSymbol] = null;
            RTCPeerConnection.prototype[removeSymbol] = null;
            api.patchEventTarget(global, api, [RTCPeerConnection.prototype], { useG: false });
        });
    }
    patchRtcPeerConnection(Zone);
}));
