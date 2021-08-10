(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/dom'), require('primeng/api')) :
    typeof define === 'function' && define.amd ? define('primeng/ripple', ['exports', '@angular/core', '@angular/common', 'primeng/dom', 'primeng/api'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.ripple = {}), global.ng.core, global.ng.common, global.primeng.dom, global.primeng.api));
}(this, (function (exports, core, common, dom, api) { 'use strict';

    var Ripple = /** @class */ (function () {
        function Ripple(el, zone, config) {
            this.el = el;
            this.zone = zone;
            this.config = config;
        }
        Ripple.prototype.ngAfterViewInit = function () {
            var _this = this;
            if (this.config && this.config.ripple) {
                this.zone.runOutsideAngular(function () {
                    _this.create();
                    _this.mouseDownListener = _this.onMouseDown.bind(_this);
                    _this.el.nativeElement.addEventListener('mousedown', _this.mouseDownListener);
                });
            }
        };
        Ripple.prototype.onMouseDown = function (event) {
            var ink = this.getInk();
            if (!ink || getComputedStyle(ink, null).display === 'none') {
                return;
            }
            dom.DomHandler.removeClass(ink, 'p-ink-active');
            if (!dom.DomHandler.getHeight(ink) && !dom.DomHandler.getWidth(ink)) {
                var d = Math.max(dom.DomHandler.getOuterWidth(this.el.nativeElement), dom.DomHandler.getOuterHeight(this.el.nativeElement));
                ink.style.height = d + 'px';
                ink.style.width = d + 'px';
            }
            var offset = dom.DomHandler.getOffset(this.el.nativeElement);
            var x = event.pageX - offset.left + document.body.scrollTop - dom.DomHandler.getWidth(ink) / 2;
            var y = event.pageY - offset.top + document.body.scrollLeft - dom.DomHandler.getHeight(ink) / 2;
            ink.style.top = y + 'px';
            ink.style.left = x + 'px';
            dom.DomHandler.addClass(ink, 'p-ink-active');
        };
        Ripple.prototype.getInk = function () {
            for (var i = 0; i < this.el.nativeElement.children.length; i++) {
                if (this.el.nativeElement.children[i].className.indexOf('p-ink') !== -1) {
                    return this.el.nativeElement.children[i];
                }
            }
            return null;
        };
        Ripple.prototype.resetInk = function () {
            var ink = this.getInk();
            if (ink) {
                dom.DomHandler.removeClass(ink, 'p-ink-active');
            }
        };
        Ripple.prototype.onAnimationEnd = function (event) {
            dom.DomHandler.removeClass(event.currentTarget, 'p-ink-active');
        };
        Ripple.prototype.create = function () {
            var ink = document.createElement('span');
            ink.className = 'p-ink';
            this.el.nativeElement.appendChild(ink);
            this.animationListener = this.onAnimationEnd.bind(this);
            ink.addEventListener('animationend', this.animationListener);
        };
        Ripple.prototype.remove = function () {
            var ink = this.getInk();
            if (ink) {
                this.el.nativeElement.removeEventListener('mousedown', this.mouseDownListener);
                ink.removeEventListener('animationend', this.animationListener);
                dom.DomHandler.removeElement(ink);
            }
        };
        Ripple.prototype.ngOnDestroy = function () {
            if (this.config && this.config.ripple) {
                this.remove();
            }
        };
        return Ripple;
    }());
    Ripple.decorators = [
        { type: core.Directive, args: [{
                    selector: '[pRipple]',
                    host: {
                        '[class.p-ripple]': 'true'
                    }
                },] }
    ];
    Ripple.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.NgZone },
        { type: api.PrimeNGConfig, decorators: [{ type: core.Optional }] }
    ]; };
    var RippleModule = /** @class */ (function () {
        function RippleModule() {
        }
        return RippleModule;
    }());
    RippleModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule],
                    exports: [Ripple],
                    declarations: [Ripple]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Ripple = Ripple;
    exports.RippleModule = RippleModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-ripple.umd.js.map
