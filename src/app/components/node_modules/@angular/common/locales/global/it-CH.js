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

if (i === 1 && v === 0)
    return 1;
if (e === 0 && (!(i === 0) && (i % 1000000 === 0 && v === 0)) || !(e >= 0 && e <= 5))
    return 4;
return 5;
}
    global.ng.common.locales['it-ch'] = ["it-CH",[["m.","p."],["AM","PM"],u],u,[["D","L","M","M","G","V","S"],["dom","lun","mar","mer","gio","ven","sab"],["domenica","lunedì","martedì","mercoledì","giovedì","venerdì","sabato"],["dom","lun","mar","mer","gio","ven","sab"]],u,[["G","F","M","A","M","G","L","A","S","O","N","D"],["gen","feb","mar","apr","mag","giu","lug","ago","set","ott","nov","dic"],["gennaio","febbraio","marzo","aprile","maggio","giugno","luglio","agosto","settembre","ottobre","novembre","dicembre"]],u,[["aC","dC"],["a.C.","d.C."],["avanti Cristo","dopo Cristo"]],1,[6,0],["dd.MM.yy","d MMM y","d MMMM y","EEEE, d MMMM y"],["HH:mm","HH:mm:ss","HH:mm:ss z","HH:mm:ss zzzz"],["{1}, {0}",u,"{1} {0}",u],[".","’",";","%","+","-","E","×","‰","∞","NaN",":"],["#,##0.###","#,##0%","¤ #,##0.00;¤-#,##0.00","#E0"],"CHF","CHF","franco svizzero",{"BRL":[u,"R$"],"BYN":[u,"Br"],"EGP":[u,"£E"],"HKD":[u,"$"],"INR":[u,"₹"],"JPY":[u,"¥"],"KRW":[u,"₩"],"MXN":[u,"$"],"NOK":[u,"NKr"],"THB":["฿"],"TWD":[u,"NT$"],"USD":[u,"$"],"VND":[u,"₫"]},"ltr", plural, [[["mezzanotte","mezzogiorno","di mattina","di pomeriggio","di sera","di notte"],u,["mezzanotte","mezzogiorno","di mattina","del pomeriggio","di sera","di notte"]],[["mezzanotte","mezzogiorno","mattina","pomeriggio","sera","notte"],u,u],["00:00","12:00",["06:00","12:00"],["12:00","18:00"],["18:00","24:00"],["00:00","06:00"]]]];
  })(globalThis);
    