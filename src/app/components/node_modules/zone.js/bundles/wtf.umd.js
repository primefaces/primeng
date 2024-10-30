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
    /**
     * @fileoverview
     * @suppress {missingRequire}
     */
    var _global = (typeof window === 'object' && window) || (typeof self === 'object' && self) || global;
    function patchWtf(Zone) {
        var _a;
        // Detect and setup WTF.
        var wtfTrace = null;
        var wtfEvents = null;
        var wtfEnabled = (function () {
            var wtf = _global['wtf'];
            if (wtf) {
                wtfTrace = wtf.trace;
                if (wtfTrace) {
                    wtfEvents = wtfTrace.events;
                    return true;
                }
            }
            return false;
        })();
        var WtfZoneSpec = /** @class */ (function () {
            function WtfZoneSpec() {
                this.name = 'WTF';
            }
            WtfZoneSpec.prototype.onFork = function (parentZoneDelegate, currentZone, targetZone, zoneSpec) {
                var retValue = parentZoneDelegate.fork(targetZone, zoneSpec);
                _a.forkInstance(zonePathName(targetZone), retValue.name);
                return retValue;
            };
            WtfZoneSpec.prototype.onInvoke = function (parentZoneDelegate, currentZone, targetZone, delegate, applyThis, applyArgs, source) {
                var src = source || 'unknown';
                var scope = _a.invokeScope[src];
                if (!scope) {
                    scope = _a.invokeScope[src] = wtfEvents.createScope("Zone:invoke:".concat(source, "(ascii zone)"));
                }
                return wtfTrace.leaveScope(scope(zonePathName(targetZone)), parentZoneDelegate.invoke(targetZone, delegate, applyThis, applyArgs, source));
            };
            WtfZoneSpec.prototype.onHandleError = function (parentZoneDelegate, currentZone, targetZone, error) {
                return parentZoneDelegate.handleError(targetZone, error);
            };
            WtfZoneSpec.prototype.onScheduleTask = function (parentZoneDelegate, currentZone, targetZone, task) {
                var key = task.type + ':' + task.source;
                var instance = _a.scheduleInstance[key];
                if (!instance) {
                    instance = _a.scheduleInstance[key] = wtfEvents.createInstance("Zone:schedule:".concat(key, "(ascii zone, any data)"));
                }
                var retValue = parentZoneDelegate.scheduleTask(targetZone, task);
                instance(zonePathName(targetZone), shallowObj(task.data, 2));
                return retValue;
            };
            WtfZoneSpec.prototype.onInvokeTask = function (parentZoneDelegate, currentZone, targetZone, task, applyThis, applyArgs) {
                var source = task.source;
                var scope = _a.invokeTaskScope[source];
                if (!scope) {
                    scope = _a.invokeTaskScope[source] = wtfEvents.createScope("Zone:invokeTask:".concat(source, "(ascii zone)"));
                }
                return wtfTrace.leaveScope(scope(zonePathName(targetZone)), parentZoneDelegate.invokeTask(targetZone, task, applyThis, applyArgs));
            };
            WtfZoneSpec.prototype.onCancelTask = function (parentZoneDelegate, currentZone, targetZone, task) {
                var key = task.source;
                var instance = _a.cancelInstance[key];
                if (!instance) {
                    instance = _a.cancelInstance[key] = wtfEvents.createInstance("Zone:cancel:".concat(key, "(ascii zone, any options)"));
                }
                var retValue = parentZoneDelegate.cancelTask(targetZone, task);
                instance(zonePathName(targetZone), shallowObj(task.data, 2));
                return retValue;
            };
            return WtfZoneSpec;
        }());
        _a = WtfZoneSpec;
        (function () {
            _a.forkInstance = wtfEnabled
                ? wtfEvents.createInstance('Zone:fork(ascii zone, ascii newZone)')
                : null;
        })();
        (function () {
            _a.scheduleInstance = {};
        })();
        (function () {
            _a.cancelInstance = {};
        })();
        (function () {
            _a.invokeScope = {};
        })();
        (function () {
            _a.invokeTaskScope = {};
        })();
        function shallowObj(obj, depth) {
            if (!obj || !depth)
                return null;
            var out = {};
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    // explicit : any due to https://github.com/microsoft/TypeScript/issues/33191
                    var value = obj[key];
                    switch (typeof value) {
                        case 'object':
                            var name_1 = value && value.constructor && value.constructor.name;
                            value = name_1 == Object.name ? shallowObj(value, depth - 1) : name_1;
                            break;
                        case 'function':
                            value = value.name || undefined;
                            break;
                    }
                    out[key] = value;
                }
            }
            return out;
        }
        function zonePathName(zone) {
            var name = zone.name;
            var localZone = zone.parent;
            while (localZone != null) {
                name = localZone.name + '::' + name;
                localZone = localZone.parent;
            }
            return name;
        }
        Zone['wtfZoneSpec'] = !wtfEnabled ? null : new WtfZoneSpec();
    }
    patchWtf(Zone);
}));
