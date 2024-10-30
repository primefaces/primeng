"use strict";
/**
 * @license Angular v<unknown>
 * (c) 2010-2024 Google LLC. https://angular.io/
 * License: MIT
 */function patchNotifications(t){t.__load_patch("notification",((t,o,i)=>{const n=t.Notification;if(!n||!n.prototype)return;const r=Object.getOwnPropertyDescriptor(n.prototype,"onerror");r&&r.configurable&&i.patchOnProperties(n.prototype,null)}))}patchNotifications(Zone);