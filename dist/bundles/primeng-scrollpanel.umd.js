(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/dom'), require('primeng/api')) :
    typeof define === 'function' && define.amd ? define('primeng/scrollpanel', ['exports', '@angular/core', '@angular/common', 'primeng/dom', 'primeng/api'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.scrollpanel = {}), global.ng.core, global.ng.common, global.primeng.dom, global.primeng.api));
}(this, (function (exports, core, common, dom, api) { 'use strict';

    var ScrollPanel = /** @class */ (function () {
        function ScrollPanel(el, zone, cd) {
            this.el = el;
            this.zone = zone;
            this.cd = cd;
            this.timeoutFrame = function (fn) { return setTimeout(fn, 0); };
        }
        ScrollPanel.prototype.ngAfterViewInit = function () {
            var _this = this;
            this.zone.runOutsideAngular(function () {
                _this.moveBar();
                _this.moveBar = _this.moveBar.bind(_this);
                _this.onXBarMouseDown = _this.onXBarMouseDown.bind(_this);
                _this.onYBarMouseDown = _this.onYBarMouseDown.bind(_this);
                _this.onDocumentMouseMove = _this.onDocumentMouseMove.bind(_this);
                _this.onDocumentMouseUp = _this.onDocumentMouseUp.bind(_this);
                window.addEventListener('resize', _this.moveBar);
                _this.contentViewChild.nativeElement.addEventListener('scroll', _this.moveBar);
                _this.contentViewChild.nativeElement.addEventListener('mouseenter', _this.moveBar);
                _this.xBarViewChild.nativeElement.addEventListener('mousedown', _this.onXBarMouseDown);
                _this.yBarViewChild.nativeElement.addEventListener('mousedown', _this.onYBarMouseDown);
                _this.calculateContainerHeight();
                _this.initialized = true;
            });
        };
        ScrollPanel.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'content':
                        _this.contentTemplate = item.template;
                        break;
                    default:
                        _this.contentTemplate = item.template;
                        break;
                }
            });
        };
        ScrollPanel.prototype.calculateContainerHeight = function () {
            var container = this.containerViewChild.nativeElement;
            var content = this.contentViewChild.nativeElement;
            var xBar = this.xBarViewChild.nativeElement;
            var containerStyles = getComputedStyle(container), xBarStyles = getComputedStyle(xBar), pureContainerHeight = dom.DomHandler.getHeight(container) - parseInt(xBarStyles['height'], 10);
            if (containerStyles['max-height'] != "none" && pureContainerHeight == 0) {
                if (content.offsetHeight + parseInt(xBarStyles['height'], 10) > parseInt(containerStyles['max-height'], 10)) {
                    container.style.height = containerStyles['max-height'];
                }
                else {
                    container.style.height = content.offsetHeight + parseFloat(containerStyles.paddingTop) + parseFloat(containerStyles.paddingBottom) + parseFloat(containerStyles.borderTopWidth) + parseFloat(containerStyles.borderBottomWidth) + "px";
                }
            }
        };
        ScrollPanel.prototype.moveBar = function () {
            var _this = this;
            var container = this.containerViewChild.nativeElement;
            var content = this.contentViewChild.nativeElement;
            /* horizontal scroll */
            var xBar = this.xBarViewChild.nativeElement;
            var totalWidth = content.scrollWidth;
            var ownWidth = content.clientWidth;
            var bottom = (container.clientHeight - xBar.clientHeight) * -1;
            this.scrollXRatio = ownWidth / totalWidth;
            /* vertical scroll */
            var yBar = this.yBarViewChild.nativeElement;
            var totalHeight = content.scrollHeight;
            var ownHeight = content.clientHeight;
            var right = (container.clientWidth - yBar.clientWidth) * -1;
            this.scrollYRatio = ownHeight / totalHeight;
            this.requestAnimationFrame(function () {
                if (_this.scrollXRatio >= 1) {
                    dom.DomHandler.addClass(xBar, 'p-scrollpanel-hidden');
                }
                else {
                    dom.DomHandler.removeClass(xBar, 'p-scrollpanel-hidden');
                    var xBarWidth = Math.max(_this.scrollXRatio * 100, 10);
                    var xBarLeft = content.scrollLeft * (100 - xBarWidth) / (totalWidth - ownWidth);
                    xBar.style.cssText = 'width:' + xBarWidth + '%; left:' + xBarLeft + '%;bottom:' + bottom + 'px;';
                }
                if (_this.scrollYRatio >= 1) {
                    dom.DomHandler.addClass(yBar, 'p-scrollpanel-hidden');
                }
                else {
                    dom.DomHandler.removeClass(yBar, 'p-scrollpanel-hidden');
                    var yBarHeight = Math.max(_this.scrollYRatio * 100, 10);
                    var yBarTop = content.scrollTop * (100 - yBarHeight) / (totalHeight - ownHeight);
                    yBar.style.cssText = 'height:' + yBarHeight + '%; top: calc(' + yBarTop + '% - ' + xBar.clientHeight + 'px);right:' + right + 'px;';
                }
            });
            this.cd.markForCheck();
        };
        ScrollPanel.prototype.onYBarMouseDown = function (e) {
            this.isYBarClicked = true;
            this.lastPageY = e.pageY;
            dom.DomHandler.addClass(this.yBarViewChild.nativeElement, 'p-scrollpanel-grabbed');
            dom.DomHandler.addClass(document.body, 'p-scrollpanel-grabbed');
            document.addEventListener('mousemove', this.onDocumentMouseMove);
            document.addEventListener('mouseup', this.onDocumentMouseUp);
            e.preventDefault();
        };
        ScrollPanel.prototype.onXBarMouseDown = function (e) {
            this.isXBarClicked = true;
            this.lastPageX = e.pageX;
            dom.DomHandler.addClass(this.xBarViewChild.nativeElement, 'p-scrollpanel-grabbed');
            dom.DomHandler.addClass(document.body, 'p-scrollpanel-grabbed');
            document.addEventListener('mousemove', this.onDocumentMouseMove);
            document.addEventListener('mouseup', this.onDocumentMouseUp);
            e.preventDefault();
        };
        ScrollPanel.prototype.onDocumentMouseMove = function (e) {
            if (this.isXBarClicked) {
                this.onMouseMoveForXBar(e);
            }
            else if (this.isYBarClicked) {
                this.onMouseMoveForYBar(e);
            }
            else {
                this.onMouseMoveForXBar(e);
                this.onMouseMoveForYBar(e);
            }
        };
        ScrollPanel.prototype.onMouseMoveForXBar = function (e) {
            var _this = this;
            var deltaX = e.pageX - this.lastPageX;
            this.lastPageX = e.pageX;
            this.requestAnimationFrame(function () {
                _this.contentViewChild.nativeElement.scrollLeft += deltaX / _this.scrollXRatio;
            });
        };
        ScrollPanel.prototype.onMouseMoveForYBar = function (e) {
            var _this = this;
            var deltaY = e.pageY - this.lastPageY;
            this.lastPageY = e.pageY;
            this.requestAnimationFrame(function () {
                _this.contentViewChild.nativeElement.scrollTop += deltaY / _this.scrollYRatio;
            });
        };
        ScrollPanel.prototype.scrollTop = function (scrollTop) {
            var scrollableHeight = this.contentViewChild.nativeElement.scrollHeight - this.contentViewChild.nativeElement.clientHeight;
            scrollTop = scrollTop > scrollableHeight ? scrollableHeight : scrollTop > 0 ? scrollTop : 0;
            this.contentViewChild.nativeElement.scrollTop = scrollTop;
        };
        ScrollPanel.prototype.onDocumentMouseUp = function (e) {
            dom.DomHandler.removeClass(this.yBarViewChild.nativeElement, 'p-scrollpanel-grabbed');
            dom.DomHandler.removeClass(this.xBarViewChild.nativeElement, 'p-scrollpanel-grabbed');
            dom.DomHandler.removeClass(document.body, 'p-scrollpanel-grabbed');
            document.removeEventListener('mousemove', this.onDocumentMouseMove);
            document.removeEventListener('mouseup', this.onDocumentMouseUp);
            this.isXBarClicked = false;
            this.isYBarClicked = false;
        };
        ScrollPanel.prototype.requestAnimationFrame = function (f) {
            var frame = window.requestAnimationFrame || this.timeoutFrame;
            frame(f);
        };
        ScrollPanel.prototype.ngOnDestroy = function () {
            if (this.initialized) {
                window.removeEventListener('resize', this.moveBar);
                this.contentViewChild.nativeElement.removeEventListener('scroll', this.moveBar);
                this.contentViewChild.nativeElement.removeEventListener('mouseenter', this.moveBar);
                this.xBarViewChild.nativeElement.removeEventListener('mousedown', this.onXBarMouseDown);
                this.yBarViewChild.nativeElement.removeEventListener('mousedown', this.onYBarMouseDown);
            }
        };
        ScrollPanel.prototype.refresh = function () {
            this.moveBar();
        };
        return ScrollPanel;
    }());
    ScrollPanel.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-scrollPanel',
                    template: "\n        <div #container [ngClass]=\"'p-scrollpanel p-component'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"p-scrollpanel-wrapper\">\n                <div #content class=\"p-scrollpanel-content\">\n                    <ng-content></ng-content>\n                    <ng-container *ngTemplateOutlet=\"contentTemplate\"></ng-container>\n                </div>\n            </div>\n            <div #xBar class=\"p-scrollpanel-bar p-scrollpanel-bar-x\"></div>\n            <div #yBar class=\"p-scrollpanel-bar p-scrollpanel-bar-y\"></div>   \n        </div>\n    ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".p-scrollpanel-wrapper{float:left;height:100%;overflow:hidden;position:relative;width:100%;z-index:1}.p-scrollpanel-content{box-sizing:border-box;height:calc(100% + 18px);overflow:auto;padding:0 18px 18px 0;position:relative;width:calc(100% + 18px)}.p-scrollpanel-bar{background:#c1c1c1;border-radius:3px;cursor:pointer;opacity:0;position:relative;transition:opacity .25s linear;z-index:2}.p-scrollpanel-bar-y{top:0;width:9px}.p-scrollpanel-bar-x{bottom:0;height:9px}.p-scrollpanel-hidden{visibility:hidden}.p-scrollpanel:active .p-scrollpanel-bar,.p-scrollpanel:hover .p-scrollpanel-bar{opacity:1}.p-scrollpanel-grabbed{-ms-user-select:none;-webkit-user-select:none;user-select:none}"]
                },] }
    ];
    ScrollPanel.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.NgZone },
        { type: core.ChangeDetectorRef }
    ]; };
    ScrollPanel.propDecorators = {
        style: [{ type: core.Input }],
        styleClass: [{ type: core.Input }],
        containerViewChild: [{ type: core.ViewChild, args: ['container',] }],
        contentViewChild: [{ type: core.ViewChild, args: ['content',] }],
        xBarViewChild: [{ type: core.ViewChild, args: ['xBar',] }],
        yBarViewChild: [{ type: core.ViewChild, args: ['yBar',] }],
        templates: [{ type: core.ContentChildren, args: [api.PrimeTemplate,] }]
    };
    var ScrollPanelModule = /** @class */ (function () {
        function ScrollPanelModule() {
        }
        return ScrollPanelModule;
    }());
    ScrollPanelModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule],
                    exports: [ScrollPanel],
                    declarations: [ScrollPanel]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.ScrollPanel = ScrollPanel;
    exports.ScrollPanelModule = ScrollPanelModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-scrollpanel.umd.js.map
