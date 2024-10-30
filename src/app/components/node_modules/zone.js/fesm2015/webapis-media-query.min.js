"use strict";
/**
 * @license Angular v<unknown>
 * (c) 2010-2024 Google LLC. https://angular.io/
 * License: MIT
 */function patchMediaQuery(e){e.__load_patch("mediaQuery",((e,t,a)=>{function n(e){a.patchMethod(e,"addListener",(e=>(n,r)=>{const c=r.length>0?r[0]:null;if("function"==typeof c){const r=t.current.wrap(c,"MediaQuery");return c[a.symbol("mediaQueryCallback")]=r,e.call(n,r)}return e.apply(n,r)}))}function r(e){a.patchMethod(e,"removeListener",(e=>(t,n)=>{const r=n.length>0?n[0]:null;if("function"==typeof r){const c=r[a.symbol("mediaQueryCallback")];return c?e.call(t,c):e.apply(t,n)}return e.apply(t,n)}))}if(e.MediaQueryList){const t=e.MediaQueryList.prototype;n(t),r(t)}else e.matchMedia&&a.patchMethod(e,"matchMedia",(e=>(t,a)=>{const c=e.apply(t,a);if(c){const e=Object.getPrototypeOf(c);e&&e.addListener?(n(e),r(e),n(c),r(c)):c.addListener&&(n(c),r(c))}return c}))}))}patchMediaQuery(Zone);