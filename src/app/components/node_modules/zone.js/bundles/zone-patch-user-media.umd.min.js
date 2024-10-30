"use strict";
/**
 * @license Angular v<unknown>
 * (c) 2010-2024 Google LLC. https://angular.io/
 * License: MIT
 */!function(e){"function"==typeof define&&define.amd?define(e):e()}((function(){!function e(n){n.__load_patch("getUserMedia",(function(e,n,t){var i=e.navigator;i&&i.getUserMedia&&(i.getUserMedia=function r(e,n){return function(){var i=Array.prototype.slice.call(arguments),r=t.bindArguments(i,n||e.name);return e.apply(this,r)}}(i.getUserMedia))}))}(Zone)}));