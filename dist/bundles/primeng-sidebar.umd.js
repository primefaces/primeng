(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/animations'), require('@angular/common'), require('primeng/ripple'), require('primeng/dom'), require('primeng/api')) :
    typeof define === 'function' && define.amd ? define('primeng/sidebar', ['exports', '@angular/core', '@angular/animations', '@angular/common', 'primeng/ripple', 'primeng/dom', 'primeng/api'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.sidebar = {}), global.ng.core, global.ng.animations, global.ng.common, global.primeng.ripple, global.primeng.dom, global.primeng.api));
}(this, (function (exports, core, animations, common, ripple, dom, api) { 'use strict';

    var showAnimation = animations.animation([
        animations.style({ transform: '{{transform}}', opacity: 0 }),
        animations.animate('{{transition}}')
    ]);
    var hideAnimation = animations.animation([
        animations.animate('{{transition}}', animations.style({ transform: '{{transform}}', opacity: 0 }))
    ]);
    var Sidebar = /** @class */ (function () {
        function Sidebar(el, renderer, cd) {
            this.el = el;
            this.renderer = renderer;
            this.cd = cd;
            this.blockScroll = false;
            this.autoZIndex = true;
            this.baseZIndex = 0;
            this.modal = true;
            this.dismissible = true;
            this.showCloseIcon = true;
            this.closeOnEscape = true;
            this.transitionOptions = '150ms cubic-bezier(0, 0, 0.2, 1)';
            this.onShow = new core.EventEmitter();
            this.onHide = new core.EventEmitter();
            this.visibleChange = new core.EventEmitter();
            this._position = "left";
            this._fullScreen = false;
            this.transformOptions = "translate3d(-100%, 0px, 0px)";
        }
        Sidebar.prototype.ngAfterViewInit = function () {
            this.initialized = true;
        };
        Sidebar.prototype.ngAfterContentInit = function () {
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
        Object.defineProperty(Sidebar.prototype, "visible", {
            get: function () {
                return this._visible;
            },
            set: function (val) {
                this._visible = val;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Sidebar.prototype, "position", {
            get: function () {
                return this._position;
            },
            set: function (value) {
                this._position = value;
                switch (value) {
                    case 'left':
                        this.transformOptions = "translate3d(100%, 0px, 0px)";
                        break;
                    case 'right':
                        this.transformOptions = "translate3d(100%, 0px, 0px)";
                        break;
                    case 'bottom':
                        this.transformOptions = "translate3d(0px, 100%, 0px)";
                        break;
                    case 'top':
                        this.transformOptions = "translate3d(0px, -100%, 0px)";
                        break;
                }
            },
            enumerable: false,
            configurable: true
        });
        ;
        Object.defineProperty(Sidebar.prototype, "fullScreen", {
            get: function () {
                return this._fullScreen;
            },
            set: function (value) {
                this._fullScreen = value;
                if (value)
                    this.transformOptions = "none";
            },
            enumerable: false,
            configurable: true
        });
        Sidebar.prototype.show = function () {
            if (this.autoZIndex) {
                this.container.style.zIndex = String(this.baseZIndex + (++dom.DomHandler.zindex));
            }
            if (this.modal) {
                this.enableModality();
            }
            this.onShow.emit({});
        };
        Sidebar.prototype.hide = function () {
            this.onHide.emit({});
            if (this.modal) {
                this.disableModality();
            }
        };
        Sidebar.prototype.close = function (event) {
            this.hide();
            this.visibleChange.emit(false);
            event.preventDefault();
        };
        Sidebar.prototype.enableModality = function () {
            var _this = this;
            if (!this.mask) {
                this.mask = document.createElement('div');
                this.mask.style.zIndex = String(parseInt(this.container.style.zIndex) - 1);
                dom.DomHandler.addMultipleClasses(this.mask, 'p-component-overlay p-sidebar-mask');
                if (this.dismissible) {
                    this.maskClickListener = this.renderer.listen(this.mask, 'click', function (event) {
                        if (_this.dismissible) {
                            _this.close(event);
                        }
                    });
                }
                document.body.appendChild(this.mask);
                if (this.blockScroll) {
                    dom.DomHandler.addClass(document.body, 'p-overflow-hidden');
                }
            }
        };
        Sidebar.prototype.disableModality = function () {
            if (this.mask) {
                this.unbindMaskClickListener();
                document.body.removeChild(this.mask);
                if (this.blockScroll) {
                    dom.DomHandler.removeClass(document.body, 'p-overflow-hidden');
                }
                this.mask = null;
            }
        };
        Sidebar.prototype.onAnimationStart = function (event) {
            switch (event.toState) {
                case 'visible':
                    this.container = event.element;
                    this.appendContainer();
                    this.show();
                    if (this.closeOnEscape) {
                        this.bindDocumentEscapeListener();
                    }
                    break;
                case 'void':
                    this.hide();
                    this.unbindGlobalListeners();
                    break;
            }
        };
        Sidebar.prototype.appendContainer = function () {
            if (this.appendTo) {
                if (this.appendTo === 'body')
                    document.body.appendChild(this.container);
                else
                    dom.DomHandler.appendChild(this.container, this.appendTo);
            }
        };
        Sidebar.prototype.bindDocumentEscapeListener = function () {
            var _this = this;
            var documentTarget = this.el ? this.el.nativeElement.ownerDocument : 'document';
            this.documentEscapeListener = this.renderer.listen(documentTarget, 'keydown', function (event) {
                if (event.which == 27) {
                    if (parseInt(_this.container.style.zIndex) === (dom.DomHandler.zindex + _this.baseZIndex)) {
                        _this.close(event);
                    }
                }
            });
        };
        Sidebar.prototype.unbindDocumentEscapeListener = function () {
            if (this.documentEscapeListener) {
                this.documentEscapeListener();
                this.documentEscapeListener = null;
            }
        };
        Sidebar.prototype.unbindMaskClickListener = function () {
            if (this.maskClickListener) {
                this.maskClickListener();
                this.maskClickListener = null;
            }
        };
        Sidebar.prototype.unbindGlobalListeners = function () {
            this.unbindMaskClickListener();
            this.unbindDocumentEscapeListener();
        };
        Sidebar.prototype.ngOnDestroy = function () {
            this.initialized = false;
            if (this.visible) {
                this.hide();
            }
            if (this.appendTo && this.container) {
                this.el.nativeElement.appendChild(this.container);
            }
            this.unbindGlobalListeners();
        };
        return Sidebar;
    }());
    Sidebar.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-sidebar',
                    template: "\n        <div #container [ngClass]=\"{'p-sidebar':true, 'p-sidebar-active': visible,\n            'p-sidebar-left': (position === 'left' && !fullScreen), 'p-sidebar-right': (position === 'right' && !fullScreen),\n            'p-sidebar-top': (position === 'top' && !fullScreen), 'p-sidebar-bottom': (position === 'bottom' && !fullScreen),\n            'p-sidebar-full': fullScreen}\"  *ngIf=\"visible\" [@panelState]=\"{value: 'visible', params: {transform: transformOptions, transition: transitionOptions}}\" (@panelState.start)=\"onAnimationStart($event)\" [ngStyle]=\"style\" [class]=\"styleClass\"  role=\"complementary\" [attr.aria-modal]=\"modal\">\n            <div class=\"p-sidebar-header\">\n                <button type=\"button\" class=\"p-sidebar-close p-sidebar-icon p-link\" *ngIf=\"showCloseIcon\" (click)=\"close($event)\" (keydown.enter)=\"close($event)\" [attr.aria-label]=\"ariaCloseLabel\" pRipple>\n                    <span class=\"p-sidebar-close-icon pi pi-times\"></span>\n                </button>\n            </div>\n            <div class=\"p-sidebar-content\">\n                <ng-content></ng-content>\n                <ng-container *ngTemplateOutlet=\"contentTemplate\"></ng-container>\n            </div>\n        </div>\n    ",
                    animations: [
                        animations.trigger('panelState', [
                            animations.transition('void => visible', [
                                animations.useAnimation(showAnimation)
                            ]),
                            animations.transition('visible => void', [
                                animations.useAnimation(hideAnimation)
                            ])
                        ])
                    ],
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".p-sidebar{display:flex;flex-direction:column;position:fixed;transition:transform .3s}.p-sidebar-content{overflow-y:auto;position:relative}.p-sidebar-header{align-items:center;display:flex;justify-content:flex-end}.p-sidebar-icon{align-items:center;display:flex;justify-content:center}.p-sidebar-mask{transition-property:background-color}.p-sidebar-mask,.p-sidebar-mask.p-sidebar-mask-leave.p-component-overlay{background-color:transparent}.p-sidebar-left{height:100%;left:0;top:0;width:20rem}.p-sidebar-right{height:100%;right:0;top:0;width:20rem}.p-sidebar-top{height:10rem;left:0;top:0;width:100%}.p-sidebar-bottom{bottom:0;height:10rem;left:0;width:100%}.p-sidebar-full{height:100%;left:0;top:0;transition:none;width:100%}.p-sidebar-left.p-sidebar-sm,.p-sidebar-right.p-sidebar-sm{width:20rem}.p-sidebar-left.p-sidebar-md,.p-sidebar-right.p-sidebar-md{width:40rem}.p-sidebar-left.p-sidebar-lg,.p-sidebar-right.p-sidebar-lg{width:60rem}.p-sidebar-bottom.p-sidebar-sm,.p-sidebar-top.p-sidebar-sm{height:10rem}.p-sidebar-bottom.p-sidebar-md,.p-sidebar-top.p-sidebar-md{height:20rem}.p-sidebar-bottom.p-sidebar-lg,.p-sidebar-top.p-sidebar-lg{height:30rem}@media screen and (max-width:64em){.p-sidebar-left.p-sidebar-lg,.p-sidebar-left.p-sidebar-md,.p-sidebar-right.p-sidebar-lg,.p-sidebar-right.p-sidebar-md{width:20rem}}"]
                },] }
    ];
    Sidebar.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.Renderer2 },
        { type: core.ChangeDetectorRef }
    ]; };
    Sidebar.propDecorators = {
        appendTo: [{ type: core.Input }],
        blockScroll: [{ type: core.Input }],
        style: [{ type: core.Input }],
        styleClass: [{ type: core.Input }],
        ariaCloseLabel: [{ type: core.Input }],
        autoZIndex: [{ type: core.Input }],
        baseZIndex: [{ type: core.Input }],
        modal: [{ type: core.Input }],
        dismissible: [{ type: core.Input }],
        showCloseIcon: [{ type: core.Input }],
        closeOnEscape: [{ type: core.Input }],
        transitionOptions: [{ type: core.Input }],
        templates: [{ type: core.ContentChildren, args: [api.PrimeTemplate,] }],
        onShow: [{ type: core.Output }],
        onHide: [{ type: core.Output }],
        visibleChange: [{ type: core.Output }],
        visible: [{ type: core.Input }],
        position: [{ type: core.Input }],
        fullScreen: [{ type: core.Input }]
    };
    var SidebarModule = /** @class */ (function () {
        function SidebarModule() {
        }
        return SidebarModule;
    }());
    SidebarModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule, ripple.RippleModule],
                    exports: [Sidebar],
                    declarations: [Sidebar]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Sidebar = Sidebar;
    exports.SidebarModule = SidebarModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-sidebar.umd.js.map
