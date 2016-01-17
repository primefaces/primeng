(function(b){if(typeof define==="function"&&define.amd&&define.amd.jQuery){define(["jquery"],b)
}else{b(jQuery)
}}(function(ae){var G="1.6.9",U="left",V="right",af="up",H="down",ah="in",T="out",X="none",O="auto",Y="swipe",M="pinch",S="tap",aa="doubletap",ai="longtap",F="hold",L="horizontal",K="vertical",ab="all",Q=10,ad="start",Z="move",ac="end",R="cancel",aj="ontouchstart" in window,J=window.navigator.msPointerEnabled&&!window.navigator.pointerEnabled,ag=window.navigator.pointerEnabled||window.navigator.msPointerEnabled,P="TouchSwipe";
var W={fingers:1,threshold:75,cancelThreshold:null,pinchThreshold:20,maxTimeThreshold:null,fingerReleaseThreshold:250,longTapThreshold:500,doubleTapThreshold:200,swipe:null,swipeLeft:null,swipeRight:null,swipeUp:null,swipeDown:null,swipeStatus:null,pinchIn:null,pinchOut:null,pinchStatus:null,click:null,tap:null,doubleTap:null,longTap:null,hold:null,triggerOnTouchEnd:true,triggerOnTouchLeave:false,allowPageScroll:"auto",fallbackToMouseEvents:true,excludedElements:"label, button, input, select, textarea, a, .noSwipe",preventDefaultEvents:true};
ae.fn.swipe=function(a){var b=ae(this),c=b.data(P);
if(c&&typeof a==="string"){if(c[a]){return c[a].apply(this,Array.prototype.slice.call(arguments,1))
}else{ae.error("Method "+a+" does not exist on jQuery.swipe")
}}else{if(!c&&(typeof a==="object"||!a)){return I.apply(this,arguments)
}}return b
};
ae.fn.swipe.version=G;
ae.fn.swipe.defaults=W;
ae.fn.swipe.phases={PHASE_START:ad,PHASE_MOVE:Z,PHASE_END:ac,PHASE_CANCEL:R};
ae.fn.swipe.directions={LEFT:U,RIGHT:V,UP:af,DOWN:H,IN:ah,OUT:T};
ae.fn.swipe.pageScroll={NONE:X,HORIZONTAL:L,VERTICAL:K,AUTO:O};
ae.fn.swipe.fingers={ONE:1,TWO:2,THREE:3,ALL:ab};
function I(a){if(a&&(a.allowPageScroll===undefined&&(a.swipe!==undefined||a.swipeStatus!==undefined))){a.allowPageScroll=X
}if(a.click!==undefined&&a.tap===undefined){a.tap=a.click
}if(!a){a={}
}a=ae.extend({},ae.fn.swipe.defaults,a);
return this.each(function(){var b=ae(this);
var c=b.data(P);
if(!c){c=new N(this,a);
b.data(P,c)
}})
}function N(bO,B){var bJ=(aj||ag||!B.fallbackToMouseEvents),s=bJ?(ag?(J?"MSPointerDown":"pointerdown"):"touchstart"):"mousedown",v=bJ?(ag?(J?"MSPointerMove":"pointermove"):"touchmove"):"mousemove",f=bJ?(ag?(J?"MSPointerUp":"pointerup"):"touchend"):"mouseup",h=bJ?null:"mouseleave",bF=(ag?(J?"MSPointerCancel":"pointercancel"):"touchcancel");
var bc=0,bt=null,bh=0,bR=0,a=0,w=1,at=0,bz=0,p=null;
var br=ae(bO);
var bj="start";
var d=0;
var bs=null;
var g=0,bQ=0,bN=0,bf=0,o=0;
var bm=null,bd=null;
try{br.bind(s,bv);
br.bind(bF,n)
}catch(az){ae.error("events not supported "+s+","+bF+" on jQuery.swipe")
}this.enable=function(){br.bind(s,bv);
br.bind(bF,n);
return br
};
this.disable=function(){by();
return br
};
this.destroy=function(){by();
br.data(P,null);
br=null
};
this.option=function(ak,al){if(B[ak]!==undefined){if(al===undefined){return B[ak]
}else{B[ak]=al
}}else{ae.error("Option "+ak+" does not exist on jQuery.swipe.options")
}return null
};
function bv(am){if(bH()){return
}if(ae(am.target).closest(B.excludedElements,br).length>0){return
}var al=am.originalEvent?am.originalEvent:am;
var an,ak=al.touches,ao=ak?ak[0]:al;
bj=ad;
if(ak){d=ak.length
}else{am.preventDefault()
}bc=0;
bt=null;
bz=null;
bh=0;
bR=0;
a=0;
w=1;
at=0;
bs=a0();
p=bi();
i();
if(!ak||(d===B.fingers||B.fingers===ab)||bl()){ba(0,ao);
g=D();
if(d==2){ba(1,ak[1]);
bR=a=C(bs[0].start,bs[1].start)
}if(B.swipeStatus||B.pinchStatus){an=m(al,bj)
}}else{an=false
}if(an===false){bj=R;
m(al,bj);
return an
}else{if(B.hold){bd=setTimeout(ae.proxy(function(){br.trigger("hold",[al.target]);
if(B.hold){an=B.hold.call(br,al,al.target)
}},this),B.longTapThreshold)
}av(true)
}return null
}function bP(ao){var al=ao.originalEvent?ao.originalEvent:ao;
if(bj===ac||bj===R||ax()){return
}var ap,ak=al.touches,aq=ak?ak[0]:al;
var an=bB(aq);
bQ=D();
if(ak){d=ak.length
}if(B.hold){clearTimeout(bd)
}bj=Z;
if(d==2){if(bR==0){ba(1,ak[1]);
bR=a=C(bs[0].start,bs[1].start)
}else{bB(ak[1]);
a=C(bs[0].end,bs[1].end);
bz=E(bs[0].end,bs[1].end)
}w=bL(bR,a);
at=Math.abs(bR-a)
}if((d===B.fingers||B.fingers===ab)||!ak||bl()){bt=bx(an.start,an.end);
ay(ao,bt);
bc=bq(an.start,an.end);
bh=bw();
bA(bt,bc);
if(B.swipeStatus||B.pinchStatus){ap=m(al,bj)
}if(!B.triggerOnTouchEnd||B.triggerOnTouchLeave){var ar=true;
if(B.triggerOnTouchLeave){var am=bk(this);
ar=A(an.end,am)
}if(!B.triggerOnTouchEnd&&ar){bj=bG(Z)
}else{if(B.triggerOnTouchLeave&&!ar){bj=bG(ac)
}}if(bj==R||bj==ac){m(al,bj)
}}}else{bj=R;
m(al,bj)
}if(ap===false){bj=R;
m(al,bj)
}}function q(am){var al=am.originalEvent?am.originalEvent:am,ak=al.touches;
if(ak){if(ak.length){z();
return true
}}if(ax()){d=bf
}bQ=D();
bh=bw();
if(l()||!aw()){bj=R;
m(al,bj)
}else{if(B.triggerOnTouchEnd||(B.triggerOnTouchEnd==false&&bj===Z)){am.preventDefault();
bj=ac;
m(al,bj)
}else{if(!B.triggerOnTouchEnd&&bM()){bj=ac;
bD(al,bj,S)
}else{if(bj===Z){bj=R;
m(al,bj)
}}}}av(false);
return null
}function n(){d=0;
bQ=0;
g=0;
bR=0;
a=0;
w=1;
i();
av(false)
}function r(al){var ak=al.originalEvent?al.originalEvent:al;
if(B.triggerOnTouchLeave){bj=bG(ac);
m(ak,bj)
}}function by(){br.unbind(s,bv);
br.unbind(bF,n);
br.unbind(v,bP);
br.unbind(f,q);
if(h){br.unbind(h,r)
}av(false)
}function bG(ak){var al=ak;
var am=bI();
var an=aw();
var ao=l();
if(!am||ao){al=R
}else{if(an&&ak==Z&&(!B.triggerOnTouchEnd||B.triggerOnTouchLeave)){al=ac
}else{if(!an&&ak==ac&&B.triggerOnTouchLeave){al=R
}}}return al
}function m(al,an){var am,ak=al.touches;
if((t()||e())||(k()||bl())){if(t()||e()){am=bD(al,an,Y)
}if((k()||bl())&&am!==false){am=bD(al,an,M)
}}else{if(bC()&&am!==false){am=bD(al,an,aa)
}else{if(au()&&am!==false){am=bD(al,an,ai)
}else{if(bb()&&am!==false){am=bD(al,an,S)
}}}}if(an===R){n(al)
}if(an===ac){if(ak){if(!ak.length){n(al)
}}else{n(al)
}}return am
}function bD(ak,an,al){var am;
if(al==Y){br.trigger("swipeStatus",[an,bt||null,bc||0,bh||0,d,bs]);
if(B.swipeStatus){am=B.swipeStatus.call(br,ak,an,bt||null,bc||0,bh||0,d,bs);
if(am===false){return false
}}if(an==ac&&bn()){br.trigger("swipe",[bt,bc,bh,d,bs]);
if(B.swipe){am=B.swipe.call(br,ak,bt,bc,bh,d,bs);
if(am===false){return false
}}switch(bt){case U:br.trigger("swipeLeft",[bt,bc,bh,d,bs]);
if(B.swipeLeft){am=B.swipeLeft.call(br,ak,bt,bc,bh,d,bs)
}break;
case V:br.trigger("swipeRight",[bt,bc,bh,d,bs]);
if(B.swipeRight){am=B.swipeRight.call(br,ak,bt,bc,bh,d,bs)
}break;
case af:br.trigger("swipeUp",[bt,bc,bh,d,bs]);
if(B.swipeUp){am=B.swipeUp.call(br,ak,bt,bc,bh,d,bs)
}break;
case H:br.trigger("swipeDown",[bt,bc,bh,d,bs]);
if(B.swipeDown){am=B.swipeDown.call(br,ak,bt,bc,bh,d,bs)
}break
}}}if(al==M){br.trigger("pinchStatus",[an,bz||null,at||0,bh||0,d,w,bs]);
if(B.pinchStatus){am=B.pinchStatus.call(br,ak,an,bz||null,at||0,bh||0,d,w,bs);
if(am===false){return false
}}if(an==ac&&bK()){switch(bz){case ah:br.trigger("pinchIn",[bz||null,at||0,bh||0,d,w,bs]);
if(B.pinchIn){am=B.pinchIn.call(br,ak,bz||null,at||0,bh||0,d,w,bs)
}break;
case T:br.trigger("pinchOut",[bz||null,at||0,bh||0,d,w,bs]);
if(B.pinchOut){am=B.pinchOut.call(br,ak,bz||null,at||0,bh||0,d,w,bs)
}break
}}}if(al==S){if(an===R||an===ac){clearTimeout(bm);
clearTimeout(bd);
if(b()&&!u()){o=D();
bm=setTimeout(ae.proxy(function(){o=null;
br.trigger("tap",[ak.target]);
if(B.tap){am=B.tap.call(br,ak,ak.target)
}},this),B.doubleTapThreshold)
}else{o=null;
br.trigger("tap",[ak.target]);
if(B.tap){am=B.tap.call(br,ak,ak.target)
}}}}else{if(al==aa){if(an===R||an===ac){clearTimeout(bm);
o=null;
br.trigger("doubletap",[ak.target]);
if(B.doubleTap){am=B.doubleTap.call(br,ak,ak.target)
}}}else{if(al==ai){if(an===R||an===ac){clearTimeout(bm);
o=null;
br.trigger("longtap",[ak.target]);
if(B.longTap){am=B.longTap.call(br,ak,ak.target)
}}}}}return am
}function aw(){var ak=true;
if(B.threshold!==null){ak=bc>=B.threshold
}return ak
}function l(){var ak=false;
if(B.cancelThreshold!==null&&bt!==null){ak=(bp(bt)-bc)>=B.cancelThreshold
}return ak
}function be(){if(B.pinchThreshold!==null){return at>=B.pinchThreshold
}return true
}function bI(){var ak;
if(B.maxTimeThreshold){if(bh>=B.maxTimeThreshold){ak=false
}else{ak=true
}}else{ak=true
}return ak
}function ay(am,al){if(B.preventDefaultEvents===false){return
}if(B.allowPageScroll===X){am.preventDefault()
}else{var ak=B.allowPageScroll===O;
switch(al){case U:if((B.swipeLeft&&ak)||(!ak&&B.allowPageScroll!=L)){am.preventDefault()
}break;
case V:if((B.swipeRight&&ak)||(!ak&&B.allowPageScroll!=L)){am.preventDefault()
}break;
case af:if((B.swipeUp&&ak)||(!ak&&B.allowPageScroll!=K)){am.preventDefault()
}break;
case H:if((B.swipeDown&&ak)||(!ak&&B.allowPageScroll!=K)){am.preventDefault()
}break
}}}function bK(){var al=bu();
var am=c();
var ak=be();
return al&&am&&ak
}function bl(){return !!(B.pinchStatus||B.pinchIn||B.pinchOut)
}function k(){return !!(bK()&&bl())
}function bn(){var am=bI();
var ak=aw();
var an=bu();
var ap=c();
var ao=l();
var al=!ao&&ap&&an&&ak&&am;
return al
}function e(){return !!(B.swipe||B.swipeStatus||B.swipeLeft||B.swipeRight||B.swipeUp||B.swipeDown)
}function t(){return !!(bn()&&e())
}function bu(){return((d===B.fingers||B.fingers===ab)||!aj)
}function c(){return bs[0].end.x!==0
}function bM(){return !!(B.tap)
}function b(){return !!(B.doubleTap)
}function bo(){return !!(B.longTap)
}function j(){if(o==null){return false
}var ak=D();
return(b()&&((ak-o)<=B.doubleTapThreshold))
}function u(){return j()
}function x(){return((d===1||!aj)&&(isNaN(bc)||bc<B.threshold))
}function bS(){return((bh>B.longTapThreshold)&&(bc<Q))
}function bb(){return !!(x()&&bM())
}function bC(){return !!(j()&&b())
}function au(){return !!(bS()&&bo())
}function z(){bN=D();
bf=event.touches.length+1
}function i(){bN=0;
bf=0
}function ax(){var al=false;
if(bN){var ak=D()-bN;
if(ak<=B.fingerReleaseThreshold){al=true
}}return al
}function bH(){return !!(br.data(P+"_intouch")===true)
}function av(ak){if(ak===true){br.bind(v,bP);
br.bind(f,q);
if(h){br.bind(h,r)
}}else{br.unbind(v,bP,false);
br.unbind(f,q,false);
if(h){br.unbind(h,r,false)
}}br.data(P+"_intouch",ak===true)
}function ba(al,am){var ak=am.identifier!==undefined?am.identifier:0;
bs[al].identifier=ak;
bs[al].start.x=bs[al].end.x=am.pageX||am.clientX;
bs[al].start.y=bs[al].end.y=am.pageY||am.clientY;
return bs[al]
}function bB(am){var ak=am.identifier!==undefined?am.identifier:0;
var al=bg(ak);
al.end.x=am.pageX||am.clientX;
al.end.y=am.pageY||am.clientY;
return al
}function bg(ak){for(var al=0;
al<bs.length;
al++){if(bs[al].identifier==ak){return bs[al]
}}}function a0(){var al=[];
for(var ak=0;
ak<=5;
ak++){al.push({start:{x:0,y:0},end:{x:0,y:0},identifier:0})
}return al
}function bA(al,ak){ak=Math.max(ak,bp(al));
p[al].distance=ak
}function bp(ak){if(p[ak]){return p[ak].distance
}return undefined
}function bi(){var ak={};
ak[U]=y(U);
ak[V]=y(V);
ak[af]=y(af);
ak[H]=y(H);
return ak
}function y(ak){return{direction:ak,distance:0}
}function bw(){return bQ-g
}function C(ak,al){var am=Math.abs(ak.x-al.x);
var an=Math.abs(ak.y-al.y);
return Math.round(Math.sqrt(am*am+an*an))
}function bL(am,al){var ak=(al/am)*1;
return ak.toFixed(2)
}function E(){if(w<1){return T
}else{return ah
}}function bq(ak,al){return Math.round(Math.sqrt(Math.pow(al.x-ak.x,2)+Math.pow(al.y-ak.y,2)))
}function bE(am,ao){var ap=am.x-ao.x;
var ak=ao.y-am.y;
var an=Math.atan2(ak,ap);
var al=Math.round(an*180/Math.PI);
if(al<0){al=360-Math.abs(al)
}return al
}function bx(al,am){var ak=bE(al,am);
if((ak<=45)&&(ak>=0)){return U
}else{if((ak<=360)&&(ak>=315)){return U
}else{if((ak>=135)&&(ak<=225)){return V
}else{if((ak>45)&&(ak<135)){return H
}else{return af
}}}}}function D(){var ak=new Date();
return ak.getTime()
}function bk(am){am=ae(am);
var ak=am.offset();
var al={left:ak.left,right:ak.left+am.outerWidth(),top:ak.top,bottom:ak.top+am.outerHeight()};
return al
}function A(al,ak){return(al.x>ak.left&&al.x<ak.right&&al.y>ak.top&&al.y<ak.bottom)
}}}));