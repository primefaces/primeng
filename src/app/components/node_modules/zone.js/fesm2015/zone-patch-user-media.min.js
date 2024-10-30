"use strict";
/**
 * @license Angular v<unknown>
 * (c) 2010-2024 Google LLC. https://angular.io/
 * License: MIT
 */function patchUserMedia(e){e.__load_patch("getUserMedia",((e,t,a)=>{let r=e.navigator;r&&r.getUserMedia&&(r.getUserMedia=function i(e,t){return function(){const r=Array.prototype.slice.call(arguments),i=a.bindArguments(r,t||e.name);return e.apply(this,i)}}(r.getUserMedia))}))}patchUserMedia(Zone);