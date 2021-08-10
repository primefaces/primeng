(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/dom'), require('primeng/api'), require('primeng/ripple'), require('@angular/animations')) :
    typeof define === 'function' && define.amd ? define('primeng/overlaypanel', ['exports', '@angular/core', '@angular/common', 'primeng/dom', 'primeng/api', 'primeng/ripple', '@angular/animations'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.overlaypanel = {}), global.ng.core, global.ng.common, global.primeng.dom, global.primeng.api, global.primeng.ripple, global.ng.animations));
}(this, (function (exports, core, common, dom, api, ripple, animations) { 'use strict';

    var OverlayPanel = /** @class */ (function () {
        function OverlayPanel(el, renderer, cd, zone) {
            this.el = el;
            this.renderer = renderer;
            this.cd = cd;
            this.zone = zone;
            this.dismissable = true;
            this.autoZIndex = true;
            this.baseZIndex = 0;
            this.focusOnShow = true;
            this.showTransitionOptions = '.12s cubic-bezier(0, 0, 0.2, 1)';
            this.hideTransitionOptions = '.1s linear';
            this.onShow = new core.EventEmitter();
            this.onHide = new core.EventEmitter();
            this.overlayVisible = false;
            this.render = false;
            this.isContainerClicked = true;
        }
        OverlayPanel.prototype.ngAfterContentInit = function () {
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
                _this.cd.markForCheck();
            });
        };
        OverlayPanel.prototype.onContainerClick = function () {
            this.isContainerClicked = true;
        };
        OverlayPanel.prototype.bindDocumentClickListener = function () {
            var _this = this;
            if (!this.documentClickListener && this.dismissable) {
                this.zone.runOutsideAngular(function () {
                    var documentEvent = dom.DomHandler.isIOS() ? 'touchstart' : 'click';
                    var documentTarget = _this.el ? _this.el.nativeElement.ownerDocument : 'document';
                    _this.documentClickListener = _this.renderer.listen(documentTarget, documentEvent, function (event) {
                        if (!_this.container.contains(event.target) && _this.target !== event.target && !_this.target.contains(event.target) && !_this.isContainerClicked) {
                            _this.zone.run(function () {
                                _this.hide();
                            });
                        }
                        _this.isContainerClicked = false;
                        _this.cd.markForCheck();
                    });
                });
            }
        };
        OverlayPanel.prototype.unbindDocumentClickListener = function () {
            if (this.documentClickListener) {
                this.documentClickListener();
                this.documentClickListener = null;
            }
        };
        OverlayPanel.prototype.toggle = function (event, target) {
            var _this = this;
            if (this.overlayVisible) {
                if (this.hasTargetChanged(event, target)) {
                    this.destroyCallback = function () {
                        _this.show(null, (target || event.currentTarget || event.target));
                    };
                }
                this.hide();
            }
            else {
                this.show(event, target);
            }
        };
        OverlayPanel.prototype.show = function (event, target) {
            this.target = target || event.currentTarget || event.target;
            this.overlayVisible = true;
            this.render = true;
            this.cd.markForCheck();
        };
        OverlayPanel.prototype.hasTargetChanged = function (event, target) {
            return this.target != null && this.target !== (target || event.currentTarget || event.target);
        };
        OverlayPanel.prototype.appendContainer = function () {
            if (this.appendTo) {
                if (this.appendTo === 'body')
                    document.body.appendChild(this.container);
                else
                    dom.DomHandler.appendChild(this.container, this.appendTo);
            }
        };
        OverlayPanel.prototype.restoreAppend = function () {
            if (this.container && this.appendTo) {
                this.el.nativeElement.appendChild(this.container);
            }
        };
        OverlayPanel.prototype.align = function () {
            if (this.autoZIndex) {
                this.container.style.zIndex = String(this.baseZIndex + (++dom.DomHandler.zindex));
            }
            dom.DomHandler.absolutePosition(this.container, this.target);
            var containerOffset = dom.DomHandler.getOffset(this.container);
            var targetOffset = dom.DomHandler.getOffset(this.target);
            var arrowLeft = 0;
            if (containerOffset.left < targetOffset.left) {
                arrowLeft = targetOffset.left - containerOffset.left;
            }
            this.container.style.setProperty('--overlayArrowLeft', arrowLeft + "px");
            if (containerOffset.top < targetOffset.top) {
                dom.DomHandler.addClass(this.container, 'p-overlaypanel-flipped');
            }
        };
        OverlayPanel.prototype.onAnimationStart = function (event) {
            if (event.toState === 'open') {
                this.container = event.element;
                this.onShow.emit(null);
                this.appendContainer();
                this.align();
                this.bindDocumentClickListener();
                this.bindDocumentResizeListener();
                this.bindScrollListener();
                if (this.focusOnShow) {
                    this.focus();
                }
            }
        };
        OverlayPanel.prototype.onAnimationEnd = function (event) {
            switch (event.toState) {
                case 'void':
                    if (this.destroyCallback) {
                        this.destroyCallback();
                        this.destroyCallback = null;
                    }
                    break;
                case 'close':
                    this.onContainerDestroy();
                    this.onHide.emit({});
                    this.render = false;
                    break;
            }
        };
        OverlayPanel.prototype.focus = function () {
            var focusable = dom.DomHandler.findSingle(this.container, '[autofocus]');
            if (focusable) {
                this.zone.runOutsideAngular(function () {
                    setTimeout(function () { return focusable.focus(); }, 5);
                });
            }
        };
        OverlayPanel.prototype.hide = function () {
            this.overlayVisible = false;
            this.cd.markForCheck();
        };
        OverlayPanel.prototype.onCloseClick = function (event) {
            this.hide();
            event.preventDefault();
        };
        OverlayPanel.prototype.onWindowResize = function (event) {
            this.hide();
        };
        OverlayPanel.prototype.bindDocumentResizeListener = function () {
            this.documentResizeListener = this.onWindowResize.bind(this);
            window.addEventListener('resize', this.documentResizeListener);
        };
        OverlayPanel.prototype.unbindDocumentResizeListener = function () {
            if (this.documentResizeListener) {
                window.removeEventListener('resize', this.documentResizeListener);
                this.documentResizeListener = null;
            }
        };
        OverlayPanel.prototype.bindScrollListener = function () {
            var _this = this;
            if (!this.scrollHandler) {
                this.scrollHandler = new dom.ConnectedOverlayScrollHandler(this.target, function () {
                    if (_this.overlayVisible) {
                        _this.hide();
                    }
                });
            }
            this.scrollHandler.bindScrollListener();
        };
        OverlayPanel.prototype.unbindScrollListener = function () {
            if (this.scrollHandler) {
                this.scrollHandler.unbindScrollListener();
            }
        };
        OverlayPanel.prototype.onContainerDestroy = function () {
            this.target = null;
            this.unbindDocumentClickListener();
            this.unbindDocumentResizeListener();
            this.unbindScrollListener();
        };
        OverlayPanel.prototype.ngOnDestroy = function () {
            if (this.scrollHandler) {
                this.scrollHandler.destroy();
                this.scrollHandler = null;
            }
            this.target = null;
            this.destroyCallback = null;
            if (this.container) {
                this.restoreAppend();
                this.onContainerDestroy();
            }
        };
        return OverlayPanel;
    }());
    OverlayPanel.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-overlayPanel',
                    template: "\n        <div *ngIf=\"render\" [ngClass]=\"'p-overlaypanel p-component'\" [ngStyle]=\"style\" [class]=\"styleClass\" (click)=\"onContainerClick()\"\n            [@animation]=\"{value: (overlayVisible ? 'open': 'close'), params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}\"\n                (@animation.start)=\"onAnimationStart($event)\" (@animation.done)=\"onAnimationEnd($event)\">\n            <div class=\"p-overlaypanel-content\">\n                <ng-content></ng-content>\n                <ng-container *ngTemplateOutlet=\"contentTemplate\"></ng-container>\n            </div>\n            <button *ngIf=\"showCloseIcon\" type=\"button\" class=\"p-overlaypanel-close p-link\" (click)=\"onCloseClick($event)\" (keydown.enter)=\"hide()\" [attr.aria-label]=\"ariaCloseLabel\" pRipple>\n                <span class=\"p-overlaypanel-close-icon pi pi-times\"></span>\n            </button>\n        </div>\n    ",
                    animations: [
                        animations.trigger('animation', [
                            animations.state('void', animations.style({
                                transform: 'scaleY(0.8)',
                                opacity: 0
                            })),
                            animations.state('close', animations.style({
                                opacity: 0
                            })),
                            animations.state('open', animations.style({
                                transform: 'translateY(0)',
                                opacity: 1
                            })),
                            animations.transition('void => open', animations.animate('{{showTransitionParams}}')),
                            animations.transition('open => close', animations.animate('{{hideTransitionParams}}')),
                        ])
                    ],
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".p-overlaypanel{margin-top:10px;position:absolute}.p-overlaypanel-flipped{margin-bottom:10px;margin-top:0}.p-overlaypanel-close{align-items:center;display:flex;justify-content:center;overflow:hidden;position:relative}.p-overlaypanel:after,.p-overlaypanel:before{bottom:100%;content:\" \";height:0;left:calc(var(--overlayArrowLeft, 0) + 1.25rem);pointer-events:none;position:absolute;width:0}.p-overlaypanel:after{border-width:8px;margin-left:-8px}.p-overlaypanel:before{border-width:10px;margin-left:-10px}.p-overlaypanel-shifted:after,.p-overlaypanel-shifted:before{left:auto;margin-left:auto;right:1.25em}.p-overlaypanel-flipped:after,.p-overlaypanel-flipped:before{bottom:auto;top:100%}.p-overlaypanel.p-overlaypanel-flipped:after,.p-overlaypanel.p-overlaypanel-flipped:before{border-bottom-color:transparent}"]
                },] }
    ];
    OverlayPanel.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.Renderer2 },
        { type: core.ChangeDetectorRef },
        { type: core.NgZone }
    ]; };
    OverlayPanel.propDecorators = {
        dismissable: [{ type: core.Input }],
        showCloseIcon: [{ type: core.Input }],
        style: [{ type: core.Input }],
        styleClass: [{ type: core.Input }],
        appendTo: [{ type: core.Input }],
        autoZIndex: [{ type: core.Input }],
        ariaCloseLabel: [{ type: core.Input }],
        baseZIndex: [{ type: core.Input }],
        focusOnShow: [{ type: core.Input }],
        showTransitionOptions: [{ type: core.Input }],
        hideTransitionOptions: [{ type: core.Input }],
        onShow: [{ type: core.Output }],
        onHide: [{ type: core.Output }],
        templates: [{ type: core.ContentChildren, args: [api.PrimeTemplate,] }]
    };
    var OverlayPanelModule = /** @class */ (function () {
        function OverlayPanelModule() {
        }
        return OverlayPanelModule;
    }());
    OverlayPanelModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule, ripple.RippleModule, api.SharedModule],
                    exports: [OverlayPanel, api.SharedModule],
                    declarations: [OverlayPanel]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.OverlayPanel = OverlayPanel;
    exports.OverlayPanelModule = OverlayPanelModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-overlaypanel.umd.js.map
