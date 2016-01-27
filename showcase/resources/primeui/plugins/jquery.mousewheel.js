(function(g){var e=["DOMMouseScroll","mousewheel"];
if(g.event.fixHooks){for(var f=e.length;
f;
){g.event.fixHooks[e[--f]]=g.event.mouseHooks
}}g.event.special.mousewheel={setup:function(){if(this.addEventListener){for(var a=e.length;
a;
){this.addEventListener(e[--a],h,false)
}}else{this.onmousewheel=h
}},teardown:function(){if(this.removeEventListener){for(var a=e.length;
a;
){this.removeEventListener(e[--a],h,false)
}}else{this.onmousewheel=null
}}};
g.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")
},unmousewheel:function(a){return this.unbind("mousewheel",a)
}});
function h(b){var d=b||window.event,l=[].slice.call(arguments,1),a=0,c=true,m=0,n=0;
b=g.event.fix(d);
b.type="mousewheel";
if(d.wheelDelta){a=d.wheelDelta/120
}if(d.detail){a=-d.detail/3
}n=a;
if(d.axis!==undefined&&d.axis===d.HORIZONTAL_AXIS){n=0;
m=-1*a
}if(d.wheelDeltaY!==undefined){n=d.wheelDeltaY/120
}if(d.wheelDeltaX!==undefined){m=-1*d.wheelDeltaX/120
}l.unshift(b,a,m,n);
return(g.event.dispatch||g.event.handle).apply(this,l)
}})(jQuery);