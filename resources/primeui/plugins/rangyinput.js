(function(H){var y="undefined";
var G,D,t,E,I;
var w,B,x,u;
function A(c,a){var b=typeof c[a];
return b==="function"||(!!(b=="object"&&c[a]))||b=="unknown"
}function z(b,a){return typeof(b[a])!=y
}function F(b,a){return !!(typeof(b[a])=="object"&&b[a])
}function C(a){if(window.console&&window.console.log){window.console.log("TextInputs module for Rangy not supported in your browser. Reason: "+a)
}}function v(b,a,c){if(a<0){a+=b.value.length
}if(typeof c==y){c=a
}if(c<0){c+=b.value.length
}return{start:a,end:c}
}function J(b,a,c){return{start:a,end:c,length:c-a,text:b.value.slice(a,c)}
}function s(){return F(document,"body")?document.body:document.getElementsByTagName("body")[0]
}H(document).ready(function(){var b=document.createElement("textarea");
s().appendChild(b);
if(z(b,"selectionStart")&&z(b,"selectionEnd")){G=function(e){var d=e.selectionStart,f=e.selectionEnd;
return J(e,d,f)
};
D=function(d,f,e){var g=v(d,f,e);
d.selectionStart=g.start;
d.selectionEnd=g.end
};
u=function(d,e){if(e){d.selectionEnd=d.selectionStart
}else{d.selectionStart=d.selectionEnd
}}
}else{if(A(b,"createTextRange")&&F(document,"selection")&&A(document.selection,"createRange")){G=function(i){var h=0,e=0,k,f,g,d;
var j=document.selection.createRange();
if(j&&j.parentElement()==i){g=i.value.length;
k=i.value.replace(/\r\n/g,"\n");
f=i.createTextRange();
f.moveToBookmark(j.getBookmark());
d=i.createTextRange();
d.collapse(false);
if(f.compareEndPoints("StartToEnd",d)>-1){h=e=g
}else{h=-f.moveStart("character",-g);
h+=k.slice(0,h).split("\n").length-1;
if(f.compareEndPoints("EndToEnd",d)>-1){e=g
}else{e=-f.moveEnd("character",-g);
e+=k.slice(0,e).split("\n").length-1
}}}return J(i,h,e)
};
var a=function(e,d){return d-(e.value.slice(0,d).split("\r\n").length-1)
};
D=function(h,g,i){var e=v(h,g,i);
var d=h.createTextRange();
var f=a(h,e.start);
d.collapse(true);
if(e.start==e.end){d.move("character",f)
}else{d.moveEnd("character",a(h,e.end));
d.moveStart("character",f)
}d.select()
};
u=function(d,e){var f=document.selection.createRange();
f.collapse(e);
f.select()
}
}else{s().removeChild(b);
C("No means of finding text input caret position");
return
}}s().removeChild(b);
E=function(e,g,f,d){var h;
if(g!=f){h=e.value;
e.value=h.slice(0,g)+h.slice(f)
}if(d){D(e,g,g)
}};
t=function(e){var d=G(e);
E(e,d.start,d.end,true)
};
x=function(f){var e=G(f),d;
if(e.start!=e.end){d=f.value;
f.value=d.slice(0,e.start)+d.slice(e.end)
}D(f,e.start,e.start);
return e.text
};
I=function(f,h,g,e){var i=f.value,d;
f.value=i.slice(0,g)+h+i.slice(g);
if(e){d=g+h.length;
D(f,d,d)
}};
w=function(f,h){var e=G(f),d=f.value;
f.value=d.slice(0,e.start)+h+d.slice(e.end);
var g=e.start+h.length;
D(f,g,g)
};
B=function(g,j,i){var e=G(g),d=g.value;
g.value=d.slice(0,e.start)+j+e.text+i+d.slice(e.end);
var h=e.start+j.length;
var f=h+e.length;
D(g,h,f)
};
function c(e,d){return function(){var h=this.jquery?this[0]:this;
var g=h.nodeName.toLowerCase();
if(h.nodeType==1&&(g=="textarea"||(g=="input"&&h.type=="text"))){var i=[h].concat(Array.prototype.slice.call(arguments));
var f=e.apply(this,i);
if(!d){return f
}}if(d){return this
}}
}H.fn.extend({getSelection:c(G,false),setSelection:c(D,true),collapseSelection:c(u,true),deleteSelectedText:c(t,true),deleteText:c(E,true),extractSelectedText:c(x,false),insertText:c(I,true),replaceSelectedText:c(w,true),surroundSelectedText:c(B,true)})
})
})(jQuery);