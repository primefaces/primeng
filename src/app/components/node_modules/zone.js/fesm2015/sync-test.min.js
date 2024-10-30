"use strict";
/**
 * @license Angular v<unknown>
 * (c) 2010-2024 Google LLC. https://angular.io/
 * License: MIT
 */function patchSyncTest(e){e.SyncTestZoneSpec=class{constructor(s){this.runZone=e.current,this.name="syncTestZone for "+s}onScheduleTask(e,s,c,t){switch(t.type){case"microTask":case"macroTask":throw new Error(`Cannot call ${t.source} from within a sync test (${this.name}).`);case"eventTask":t=e.scheduleTask(c,t)}return t}}}patchSyncTest(Zone);