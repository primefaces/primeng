$(function(){var b={primaryStyles:["fontFamily","fontSize","fontWeight","fontVariant","fontStyle","paddingLeft","paddingTop","paddingBottom","paddingRight","marginLeft","marginTop","marginBottom","marginRight","borderLeftColor","borderTopColor","borderBottomColor","borderRightColor","borderLeftStyle","borderTopStyle","borderBottomStyle","borderRightStyle","borderLeftWidth","borderTopWidth","borderBottomWidth","borderRightWidth","line-height","outline"],specificStyle:{"word-wrap":"break-word","overflow-x":"hidden","overflow-y":"auto"},simulator:$('<div id="textarea_simulator"/>').css({position:"absolute",top:0,left:0,visibility:"hidden"}).appendTo(document.body),toHtml:function(a){return a.replace(/\n/g,"<br>").split(" ").join('<span style="white-space:prev-wrap">&nbsp;</span>')
},getCaretPosition:function(){var A=b,p=this,w=p[0],z=p.offset();
if($.browser.msie){w.focus();
var v=document.selection.createRange();
$("#hskeywords").val(w.scrollTop);
return{left:v.boundingLeft-z.left,top:parseInt(v.boundingTop)-z.top+w.scrollTop+document.documentElement.scrollTop+parseInt(p.getComputedStyle("fontSize"))}
}A.simulator.empty();
$.each(A.primaryStyles,function(d,c){p.cloneStyle(A.simulator,c)
});
A.simulator.css($.extend({width:p.width(),height:p.height()},A.specificStyle));
var r=p.val(),y=p.getCursorPosition();
var x=r.substring(0,y),q=r.substring(y);
var t=$('<span class="before"/>').html(A.toHtml(x)),a=$('<span class="focus"/>'),B=$('<span class="after"/>').html(A.toHtml(q));
A.simulator.append(t).append(a).append(B);
var u=a.offset(),s=A.simulator.offset();
return{top:u.top-s.top-w.scrollTop+($.browser.mozilla?0:parseInt(p.getComputedStyle("fontSize"))),left:a[0].offsetLeft-A.simulator[0].offsetLeft-w.scrollLeft}
}};
$.fn.extend({getComputedStyle:function(f){if(this.length==0){return
}var e=this[0];
var a=this.css(f);
a=a||($.browser.msie?e.currentStyle[f]:document.defaultView.getComputedStyle(e,null)[f]);
return a
},cloneStyle:function(f,a){var e=this.getComputedStyle(a);
if(!!e){$(f).css(a,e)
}},cloneAllStyle:function(h,i){var j=this[0];
for(var a in j.style){var g=j.style[a];
typeof g=="string"||typeof g=="number"?this.cloneStyle(h,a):NaN
}},getCursorPosition:function(){var l=this[0],a=0;
if("selectionStart" in l){a=l.selectionStart
}else{if("selection" in document){var n=document.selection.createRange();
if(parseInt($.browser.version)>6){l.focus();
var j=document.selection.createRange().text.length;
n.moveStart("character",-l.value.length);
a=n.text.length-j
}else{var i=document.body.createTextRange();
i.moveToElementText(l);
for(;
i.compareEndPoints("StartToStart",n)<0;
a++){i.moveStart("character",1)
}for(var m=0;
m<=a;
m++){if(l.value.charAt(m)=="\n"){a++
}}var k=l.value.split("\n").length-1;
a-=k;
return a
}}}return a
},getCaretPosition:b.getCaretPosition})
});