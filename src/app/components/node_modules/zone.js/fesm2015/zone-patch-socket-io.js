'use strict';
/**
 * @license Angular v<unknown>
 * (c) 2010-2024 Google LLC. https://angular.io/
 * License: MIT
 */
function patchSocketIo(Zone) {
    Zone.__load_patch('socketio', (global, Zone, api) => {
        Zone[Zone.__symbol__('socketio')] = function patchSocketIO(io) {
            // patch io.Socket.prototype event listener related method
            api.patchEventTarget(global, api, [io.Socket.prototype], {
                useG: false,
                chkDup: false,
                rt: true,
                diff: (task, delegate) => {
                    return task.callback === delegate;
                },
            });
            // also patch io.Socket.prototype.on/off/removeListener/removeAllListeners
            io.Socket.prototype.on = io.Socket.prototype.addEventListener;
            io.Socket.prototype.off =
                io.Socket.prototype.removeListener =
                    io.Socket.prototype.removeAllListeners =
                        io.Socket.prototype.removeEventListener;
        };
    });
}

patchSocketIo(Zone);
