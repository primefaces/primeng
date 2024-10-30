"use strict";
/**
 * @license Angular v<unknown>
 * (c) 2010-2024 Google LLC. https://angular.io/
 * License: MIT
 */!function(n){"function"==typeof define&&define.amd?define(n):n()}((function(){!function n(e){var t=function(){function n(n){this.runZone=e.current,this.name="syncTestZone for "+n}return n.prototype.onScheduleTask=function(n,e,t,c){switch(c.type){case"microTask":case"macroTask":throw new Error("Cannot call ".concat(c.source," from within a sync test (").concat(this.name,")."));case"eventTask":c=n.scheduleTask(t,c)}return c},n}();e.SyncTestZoneSpec=t}(Zone)}));