'use strict';
/**
 * @license Angular v<unknown>
 * (c) 2010-2024 Google LLC. https://angular.io/
 * License: MIT
 */
function patchElectron(Zone) {
    Zone.__load_patch('electron', (global, Zone, api) => {
        function patchArguments(target, name, source) {
            return api.patchMethod(target, name, (delegate) => (self, args) => {
                return delegate && delegate.apply(self, api.bindArguments(args, source));
            });
        }
        let { desktopCapturer, shell, CallbacksRegistry, ipcRenderer } = require('electron');
        if (!CallbacksRegistry) {
            try {
                // Try to load CallbacksRegistry class from @electron/remote src
                // since from electron 14+, the CallbacksRegistry is moved to @electron/remote
                // package and not exported to outside, so this is a hack to patch CallbacksRegistry.
                CallbacksRegistry =
                    require('@electron/remote/dist/src/renderer/callbacks-registry').CallbacksRegistry;
            }
            catch (err) { }
        }
        // patch api in renderer process directly
        // desktopCapturer
        if (desktopCapturer) {
            patchArguments(desktopCapturer, 'getSources', 'electron.desktopCapturer.getSources');
        }
        // shell
        if (shell) {
            patchArguments(shell, 'openExternal', 'electron.shell.openExternal');
        }
        // patch api in main process through CallbackRegistry
        if (!CallbacksRegistry) {
            if (ipcRenderer) {
                patchArguments(ipcRenderer, 'on', 'ipcRenderer.on');
            }
            return;
        }
        patchArguments(CallbacksRegistry.prototype, 'add', 'CallbackRegistry.add');
    });
}

patchElectron(Zone);
