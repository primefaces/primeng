"use strict";
/**
 * @license Angular v<unknown>
 * (c) 2010-2024 Google LLC. https://angular.io/
 * License: MIT
 */!function(e){"function"==typeof define&&define.amd?define(e):e()}((function(){!function e(t){t.__load_patch("RTCPeerConnection",(function(e,t,n){var o=e.RTCPeerConnection;if(o){var r=n.symbol("addEventListener"),p=n.symbol("removeEventListener");o.prototype.addEventListener=o.prototype[r],o.prototype.removeEventListener=o.prototype[p],o.prototype[r]=null,o.prototype[p]=null,n.patchEventTarget(e,n,[o.prototype],{useG:!1})}}))}(Zone)}));