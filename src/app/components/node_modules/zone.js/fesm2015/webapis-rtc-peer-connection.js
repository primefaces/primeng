'use strict';
/**
 * @license Angular v<unknown>
 * (c) 2010-2024 Google LLC. https://angular.io/
 * License: MIT
 */
function patchRtcPeerConnection(Zone) {
    Zone.__load_patch('RTCPeerConnection', (global, Zone, api) => {
        const RTCPeerConnection = global['RTCPeerConnection'];
        if (!RTCPeerConnection) {
            return;
        }
        const addSymbol = api.symbol('addEventListener');
        const removeSymbol = api.symbol('removeEventListener');
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
