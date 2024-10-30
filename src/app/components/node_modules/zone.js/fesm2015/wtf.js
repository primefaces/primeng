'use strict';
/**
 * @license Angular v<unknown>
 * (c) 2010-2024 Google LLC. https://angular.io/
 * License: MIT
 */
/**
 * @fileoverview
 * @suppress {missingRequire}
 */
const _global = (typeof window === 'object' && window) || (typeof self === 'object' && self) || global;
function patchWtf(Zone) {
    // Detect and setup WTF.
    let wtfTrace = null;
    let wtfEvents = null;
    const wtfEnabled = (function () {
        const wtf = _global['wtf'];
        if (wtf) {
            wtfTrace = wtf.trace;
            if (wtfTrace) {
                wtfEvents = wtfTrace.events;
                return true;
            }
        }
        return false;
    })();
    class WtfZoneSpec {
        constructor() {
            this.name = 'WTF';
        }
        static { this.forkInstance = wtfEnabled
            ? wtfEvents.createInstance('Zone:fork(ascii zone, ascii newZone)')
            : null; }
        static { this.scheduleInstance = {}; }
        static { this.cancelInstance = {}; }
        static { this.invokeScope = {}; }
        static { this.invokeTaskScope = {}; }
        onFork(parentZoneDelegate, currentZone, targetZone, zoneSpec) {
            const retValue = parentZoneDelegate.fork(targetZone, zoneSpec);
            WtfZoneSpec.forkInstance(zonePathName(targetZone), retValue.name);
            return retValue;
        }
        onInvoke(parentZoneDelegate, currentZone, targetZone, delegate, applyThis, applyArgs, source) {
            const src = source || 'unknown';
            let scope = WtfZoneSpec.invokeScope[src];
            if (!scope) {
                scope = WtfZoneSpec.invokeScope[src] = wtfEvents.createScope(`Zone:invoke:${source}(ascii zone)`);
            }
            return wtfTrace.leaveScope(scope(zonePathName(targetZone)), parentZoneDelegate.invoke(targetZone, delegate, applyThis, applyArgs, source));
        }
        onHandleError(parentZoneDelegate, currentZone, targetZone, error) {
            return parentZoneDelegate.handleError(targetZone, error);
        }
        onScheduleTask(parentZoneDelegate, currentZone, targetZone, task) {
            const key = task.type + ':' + task.source;
            let instance = WtfZoneSpec.scheduleInstance[key];
            if (!instance) {
                instance = WtfZoneSpec.scheduleInstance[key] = wtfEvents.createInstance(`Zone:schedule:${key}(ascii zone, any data)`);
            }
            const retValue = parentZoneDelegate.scheduleTask(targetZone, task);
            instance(zonePathName(targetZone), shallowObj(task.data, 2));
            return retValue;
        }
        onInvokeTask(parentZoneDelegate, currentZone, targetZone, task, applyThis, applyArgs) {
            const source = task.source;
            let scope = WtfZoneSpec.invokeTaskScope[source];
            if (!scope) {
                scope = WtfZoneSpec.invokeTaskScope[source] = wtfEvents.createScope(`Zone:invokeTask:${source}(ascii zone)`);
            }
            return wtfTrace.leaveScope(scope(zonePathName(targetZone)), parentZoneDelegate.invokeTask(targetZone, task, applyThis, applyArgs));
        }
        onCancelTask(parentZoneDelegate, currentZone, targetZone, task) {
            const key = task.source;
            let instance = WtfZoneSpec.cancelInstance[key];
            if (!instance) {
                instance = WtfZoneSpec.cancelInstance[key] = wtfEvents.createInstance(`Zone:cancel:${key}(ascii zone, any options)`);
            }
            const retValue = parentZoneDelegate.cancelTask(targetZone, task);
            instance(zonePathName(targetZone), shallowObj(task.data, 2));
            return retValue;
        }
    }
    function shallowObj(obj, depth) {
        if (!obj || !depth)
            return null;
        const out = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                // explicit : any due to https://github.com/microsoft/TypeScript/issues/33191
                let value = obj[key];
                switch (typeof value) {
                    case 'object':
                        const name = value && value.constructor && value.constructor.name;
                        value = name == Object.name ? shallowObj(value, depth - 1) : name;
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
        let name = zone.name;
        let localZone = zone.parent;
        while (localZone != null) {
            name = localZone.name + '::' + name;
            localZone = localZone.parent;
        }
        return name;
    }
    Zone['wtfZoneSpec'] = !wtfEnabled ? null : new WtfZoneSpec();
}

patchWtf(Zone);
