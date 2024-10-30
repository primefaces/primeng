"use strict";
/**
 * @license Angular v<unknown>
 * (c) 2010-2024 Google LLC. https://angular.io/
 * License: MIT
 */function patchElectron(e){e.__load_patch("electron",((e,r,t)=>{function c(e,r,c){return t.patchMethod(e,r,(e=>(r,l)=>e&&e.apply(r,t.bindArguments(l,c))))}let{desktopCapturer:l,shell:n,CallbacksRegistry:o,ipcRenderer:a}=require("electron");if(!o)try{o=require("@electron/remote/dist/src/renderer/callbacks-registry").CallbacksRegistry}catch(e){}l&&c(l,"getSources","electron.desktopCapturer.getSources"),n&&c(n,"openExternal","electron.shell.openExternal"),o?c(o.prototype,"add","CallbackRegistry.add"):a&&c(a,"on","ipcRenderer.on")}))}patchElectron(Zone);