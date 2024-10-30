"use strict";
/**
 * @license Angular v<unknown>
 * (c) 2010-2024 Google LLC. https://angular.io/
 * License: MIT
 */function patchSocketIo(t){t.__load_patch("socketio",((t,e,o)=>{e[e.__symbol__("socketio")]=function e(c){o.patchEventTarget(t,o,[c.Socket.prototype],{useG:!1,chkDup:!1,rt:!0,diff:(t,e)=>t.callback===e}),c.Socket.prototype.on=c.Socket.prototype.addEventListener,c.Socket.prototype.off=c.Socket.prototype.removeListener=c.Socket.prototype.removeAllListeners=c.Socket.prototype.removeEventListener}}))}patchSocketIo(Zone);