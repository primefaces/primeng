/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

// THIS CODE IS GENERATED - DO NOT MODIFY.
  (function(global) {
    global.ng ??= {};
    global.ng.common ??= {};
    global.ng.common.locales ??= {};
    const u = undefined;
    function plural(val) {
const n = val, i = Math.floor(Math.abs(val)), v = val.toString().replace(/^[^.]*\.?/, '').length, e = parseInt(val.toString().replace(/^[^e]*(e([-+]?\d+))?/, '$2')) || 0;

if (n === 1)
    return 1;
if (e === 0 && (!(i === 0) && (i % 1000000 === 0 && v === 0)) || !(e >= 0 && e <= 5))
    return 4;
return 5;
}
    global.ng.common.locales['es-ic'] = ["es-IC",[["a. m.","p. m."],u,u],u,[["D","L","M","X","J","V","S"],["dom","lun","mar","mié","jue","vie","sáb"],["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],["DO","LU","MA","MI","JU","VI","SA"]],u,[["E","F","M","A","M","J","J","A","S","O","N","D"],["ene","feb","mar","abr","may","jun","jul","ago","sept","oct","nov","dic"],["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"]],u,[["a. C.","d. C."],u,["antes de Cristo","después de Cristo"]],1,[6,0],["d/M/yy","d MMM y","d 'de' MMMM 'de' y","EEEE, d 'de' MMMM 'de' y"],["H:mm","H:mm:ss","H:mm:ss z","H:mm:ss (zzzz)"],["{1}, {0}",u,u,u],[",",".",";","%","+","-","E","×","‰","∞","NaN",":"],["#,##0.###","#,##0 %","#,##0.00 ¤","#E0"],"EUR","€","euro",{"AUD":[u,"$"],"BRL":[u,"R$"],"BYN":[u,"р."],"CAD":[u,"$"],"CNY":[u,"¥"],"EGP":[],"ESP":["₧"],"GBP":[u,"£"],"HKD":[u,"$"],"ILS":[u,"₪"],"INR":[u,"₹"],"JPY":[u,"¥"],"KRW":[u,"₩"],"MXN":[u,"$"],"NZD":[u,"$"],"PHP":[u,"₱"],"RON":[u,"L"],"THB":["฿"],"TWD":[u,"NT$"],"USD":["US$","$"],"XAF":[],"XCD":[u,"$"],"XOF":[]},"ltr", plural, [[["del mediodía","de la madrugada","de la mañana","de la tarde","de la noche"],u,u],[["mediodía","madrugada","mañana","tarde","noche"],u,u],["12:00",["00:00","06:00"],["06:00","12:00"],["12:00","20:00"],["20:00","24:00"]]]];
  })(globalThis);
    