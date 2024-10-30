"use strict";
/**
 * @license Angular v<unknown>
 * (c) 2010-2024 Google LLC. https://angular.io/
 * License: MIT
 */!function(e){"function"==typeof define&&define.amd?define(e):e()}((function(){!function e(t){t.__load_patch("socketio",(function(e,t,o){t[t.__symbol__("socketio")]=function t(n){o.patchEventTarget(e,o,[n.Socket.prototype],{useG:!1,chkDup:!1,rt:!0,diff:function(e,t){return e.callback===t}}),n.Socket.prototype.on=n.Socket.prototype.addEventListener,n.Socket.prototype.off=n.Socket.prototype.removeListener=n.Socket.prototype.removeAllListeners=n.Socket.prototype.removeEventListener}}))}(Zone)}));