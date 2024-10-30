"use strict";
/**
 * @license Angular v<unknown>
 * (c) 2010-2024 Google LLC. https://angular.io/
 * License: MIT
 */!function(e){"function"==typeof define&&define.amd?define(e):e()}((function(){!function e(r){r.__load_patch("electron",(function(e,r,t){function n(e,r,n){return t.patchMethod(e,r,(function(e){return function(r,c){return e&&e.apply(r,t.bindArguments(c,n))}}))}var c=require("electron"),o=c.desktopCapturer,i=c.shell,a=c.CallbacksRegistry,l=c.ipcRenderer;if(!a)try{a=require("@electron/remote/dist/src/renderer/callbacks-registry").CallbacksRegistry}catch(e){}o&&n(o,"getSources","electron.desktopCapturer.getSources"),i&&n(i,"openExternal","electron.shell.openExternal"),a?n(a.prototype,"add","CallbackRegistry.add"):l&&n(l,"on","ipcRenderer.on")}))}(Zone)}));