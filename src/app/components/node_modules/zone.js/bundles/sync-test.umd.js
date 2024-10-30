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
    function patchSyncTest(Zone) {
        var SyncTestZoneSpec = /** @class */ (function () {
            function SyncTestZoneSpec(namePrefix) {
                this.runZone = Zone.current;
                this.name = 'syncTestZone for ' + namePrefix;
            }
            SyncTestZoneSpec.prototype.onScheduleTask = function (delegate, current, target, task) {
                switch (task.type) {
                    case 'microTask':
                    case 'macroTask':
                        throw new Error("Cannot call ".concat(task.source, " from within a sync test (").concat(this.name, ")."));
                    case 'eventTask':
                        task = delegate.scheduleTask(target, task);
                        break;
                }
                return task;
            };
            return SyncTestZoneSpec;
        }());
        // Export the class so that new instances can be created with proper
        // constructor params.
        Zone['SyncTestZoneSpec'] = SyncTestZoneSpec;
    }
    patchSyncTest(Zone);
}));
