'use strict';
/**
 * @license Angular v<unknown>
 * (c) 2010-2024 Google LLC. https://angular.io/
 * License: MIT
 */
function patchMessagePort(Zone) {
    /**
     * Monkey patch `MessagePort.prototype.onmessage` and `MessagePort.prototype.onmessageerror`
     * properties to make the callback in the zone when the value are set.
     */
    Zone.__load_patch('MessagePort', (global, Zone, api) => {
        const MessagePort = global['MessagePort'];
        if (typeof MessagePort !== 'undefined' && MessagePort.prototype) {
            api.patchOnProperties(MessagePort.prototype, ['message', 'messageerror']);
        }
    });
}

patchMessagePort(Zone);
