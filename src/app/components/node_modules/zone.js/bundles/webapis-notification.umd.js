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
    function patchNotifications(Zone) {
        Zone.__load_patch('notification', function (global, Zone, api) {
            var Notification = global['Notification'];
            if (!Notification || !Notification.prototype) {
                return;
            }
            var desc = Object.getOwnPropertyDescriptor(Notification.prototype, 'onerror');
            if (!desc || !desc.configurable) {
                return;
            }
            api.patchOnProperties(Notification.prototype, null);
        });
    }
    patchNotifications(Zone);
}));
