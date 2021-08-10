(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/animations'), require('primeng/dom')) :
    typeof define === 'function' && define.amd ? define('primeng/scrolltop', ['exports', '@angular/core', '@angular/common', '@angular/animations', 'primeng/dom'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.scrolltop = {}), global.ng.core, global.ng.common, global.ng.animations, global.primeng.dom));
}(this, (function (exports, core, common, animations, dom) { 'use strict';

    var ScrollTop = /** @class */ (function () {
        function ScrollTop(el, cd) {
            this.el = el;
            this.cd = cd;
            this.target = "window";
            this.threshold = 400;
            this.icon = "pi pi-chevron-up";
            this.behavior = "smooth";
            this.showTransitionOptions = '.15s';
            this.hideTransitionOptions = '.15s';
            this.visible = false;
        }
        ScrollTop.prototype.ngOnInit = function () {
            if (this.target === 'window')
                this.bindDocumentScrollListener();
            else if (this.target === 'parent')
                this.bindParentScrollListener();
        };
        ScrollTop.prototype.onClick = function () {
            var scrollElement = this.target === 'window' ? window : this.el.nativeElement.parentElement;
            scrollElement.scroll({
                top: 0,
                behavior: this.behavior
            });
        };
        ScrollTop.prototype.onEnter = function () {
            this.el.nativeElement.children[0].style.zIndex = dom.DomHandler.generateZIndex();
        };
        ScrollTop.prototype.checkVisibility = function (scrollY) {
            if (scrollY > this.threshold)
                this.visible = true;
            else
                this.visible = false;
            this.cd.markForCheck();
        };
        ScrollTop.prototype.bindParentScrollListener = function () {
            var _this = this;
            this.scrollListener = function () {
                _this.checkVisibility(_this.el.nativeElement.parentElement.scrollTop);
            };
            this.el.nativeElement.parentElement.addEventListener('scroll', this.scrollListener);
        };
        ScrollTop.prototype.bindDocumentScrollListener = function () {
            var _this = this;
            this.scrollListener = function () {
                _this.checkVisibility(dom.DomHandler.getWindowScrollTop());
            };
            window.addEventListener('scroll', this.scrollListener);
        };
        ScrollTop.prototype.unbindParentScrollListener = function () {
            if (this.scrollListener) {
                this.el.nativeElement.parentElement.removeEventListener('scroll', this.scrollListener);
                this.scrollListener = null;
            }
        };
        ScrollTop.prototype.unbindDocumentScrollListener = function () {
            if (this.scrollListener) {
                window.removeEventListener('scroll', this.scrollListener);
                this.scrollListener = null;
            }
        };
        ScrollTop.prototype.containerClass = function () {
            return {
                'p-scrolltop p-link p-component': true,
                'p-scrolltop-sticky': this.target !== 'window'
            };
        };
        ScrollTop.prototype.ngOnDestroy = function () {
            if (this.target === 'window')
                this.unbindDocumentScrollListener();
            else if (this.target === 'parent')
                this.unbindParentScrollListener();
        };
        return ScrollTop;
    }());
    ScrollTop.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-scrollTop',
                    template: "\n        <button  *ngIf=\"visible\" [@animation]=\"{value: 'open', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}\" (@animation.start)=\"onEnter()\"\n            [ngClass]=\"containerClass()\" (click)=\"onClick()\" [class]=\"styleClass\" [ngStyle]=\"style\" type=\"button\">\n            <span [class]=\"icon\" [ngClass]=\"'p-scrolltop-icon'\"></span>\n        </button>\n    ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    animations: [
                        animations.trigger('animation', [
                            animations.state('void', animations.style({
                                opacity: 0
                            })),
                            animations.state('open', animations.style({
                                opacity: 1
                            })),
                            animations.transition('void => open', animations.animate('{{showTransitionParams}}')),
                            animations.transition('open => void', animations.animate('{{hideTransitionParams}}')),
                        ])
                    ],
                    styles: [".p-scrolltop{align-items:center;bottom:20px;display:flex;justify-content:center;position:fixed;right:20px}.p-scrolltop-sticky{position:sticky}.p-scrolltop-sticky.p-link{margin-left:auto}"]
                },] }
    ];
    ScrollTop.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.ChangeDetectorRef }
    ]; };
    ScrollTop.propDecorators = {
        styleClass: [{ type: core.Input }],
        style: [{ type: core.Input }],
        target: [{ type: core.Input }],
        threshold: [{ type: core.Input }],
        icon: [{ type: core.Input }],
        behavior: [{ type: core.Input }],
        showTransitionOptions: [{ type: core.Input }],
        hideTransitionOptions: [{ type: core.Input }]
    };
    var ScrollTopModule = /** @class */ (function () {
        function ScrollTopModule() {
        }
        return ScrollTopModule;
    }());
    ScrollTopModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule],
                    exports: [ScrollTop],
                    declarations: [ScrollTop]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.ScrollTop = ScrollTop;
    exports.ScrollTopModule = ScrollTopModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-scrolltop.umd.js.map
