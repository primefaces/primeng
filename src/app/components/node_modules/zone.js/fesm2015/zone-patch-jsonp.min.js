"use strict";
/**
 * @license Angular v<unknown>
 * (c) 2010-2024 Google LLC. https://angular.io/
 * License: MIT
 */function patchJsonp(n){n.__load_patch("jsonp",((n,o,s)=>{o[o.__symbol__("jsonp")]=function c(a){if(!a||!a.jsonp||!a.sendFuncName)return;const e=function(){};[a.successFuncName,a.failedFuncName].forEach((o=>{o&&(n[o]?s.patchMethod(n,o,(o=>(c,a)=>{const e=n[s.symbol("jsonTask")];return e?(e.callback=o,e.invoke.apply(c,a)):o.apply(c,a)})):Object.defineProperty(n,o,{configurable:!0,enumerable:!0,get:function(){return function(){const c=n[s.symbol("jsonpTask")],a=n[s.symbol(`jsonp${o}callback`)];return c?(a&&(c.callback=a),n[s.symbol("jsonpTask")]=void 0,c.invoke.apply(this,arguments)):a?a.apply(this,arguments):null}},set:function(n){this[s.symbol(`jsonp${o}callback`)]=n}}))})),s.patchMethod(a.jsonp,a.sendFuncName,(c=>(a,t)=>{n[s.symbol("jsonpTask")]=o.current.scheduleMacroTask("jsonp",e,{},(n=>c.apply(a,t)),e)}))}}))}patchJsonp(Zone);