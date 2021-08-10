(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('primeng/defer', ['exports', '@angular/core', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.defer = {}), global.ng.core, global.ng.common));
}(this, (function (exports, core, common) { 'use strict';

    var DeferredLoader = /** @class */ (function () {
        function DeferredLoader(el, renderer, viewContainer, cd) {
            this.el = el;
            this.renderer = renderer;
            this.viewContainer = viewContainer;
            this.cd = cd;
            this.onLoad = new core.EventEmitter();
        }
        DeferredLoader.prototype.ngAfterViewInit = function () {
            var _this = this;
            if (this.shouldLoad()) {
                this.load();
            }
            if (!this.isLoaded()) {
                this.documentScrollListener = this.renderer.listen('window', 'scroll', function () {
                    if (_this.shouldLoad()) {
                        _this.load();
                        _this.documentScrollListener();
                        _this.documentScrollListener = null;
                    }
                });
            }
        };
        DeferredLoader.prototype.shouldLoad = function () {
            if (this.isLoaded()) {
                return false;
            }
            else {
                var rect = this.el.nativeElement.getBoundingClientRect();
                var docElement = document.documentElement;
                var winHeight = docElement.clientHeight;
                return (winHeight >= rect.top);
            }
        };
        DeferredLoader.prototype.load = function () {
            this.view = this.viewContainer.createEmbeddedView(this.template);
            this.onLoad.emit();
            this.cd.detectChanges();
        };
        DeferredLoader.prototype.isLoaded = function () {
            return this.view != null;
        };
        DeferredLoader.prototype.ngOnDestroy = function () {
            this.view = null;
            if (this.documentScrollListener) {
                this.documentScrollListener();
            }
        };
        return DeferredLoader;
    }());
    DeferredLoader.decorators = [
        { type: core.Directive, args: [{
                    selector: '[pDefer]'
                },] }
    ];
    DeferredLoader.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.Renderer2 },
        { type: core.ViewContainerRef },
        { type: core.ChangeDetectorRef }
    ]; };
    DeferredLoader.propDecorators = {
        onLoad: [{ type: core.Output }],
        template: [{ type: core.ContentChild, args: [core.TemplateRef,] }]
    };
    var DeferModule = /** @class */ (function () {
        function DeferModule() {
        }
        return DeferModule;
    }());
    DeferModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule],
                    exports: [DeferredLoader],
                    declarations: [DeferredLoader]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.DeferModule = DeferModule;
    exports.DeferredLoader = DeferredLoader;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-defer.umd.js.map
