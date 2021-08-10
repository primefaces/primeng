(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/animations'), require('@angular/common'), require('primeng/dom'), require('primeng/api'), require('primeng/button'), require('primeng/utils'), require('primeng/ripple')) :
    typeof define === 'function' && define.amd ? define('primeng/confirmdialog', ['exports', '@angular/core', '@angular/animations', '@angular/common', 'primeng/dom', 'primeng/api', 'primeng/button', 'primeng/utils', 'primeng/ripple'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.confirmdialog = {}), global.ng.core, global.ng.animations, global.ng.common, global.primeng.dom, global.primeng.api, global.primeng.button, global.primeng.utils, global.primeng.ripple));
}(this, (function (exports, core, animations, common, dom, api, button, utils, ripple) { 'use strict';

    var showAnimation = animations.animation([
        animations.style({ transform: '{{transform}}', opacity: 0 }),
        animations.animate('{{transition}}', animations.style({ transform: 'none', opacity: 1 }))
    ]);
    var hideAnimation = animations.animation([
        animations.animate('{{transition}}', animations.style({ transform: '{{transform}}', opacity: 0 }))
    ]);
    var ConfirmDialog = /** @class */ (function () {
        function ConfirmDialog(el, renderer, confirmationService, zone, cd, config) {
            var _this = this;
            this.el = el;
            this.renderer = renderer;
            this.confirmationService = confirmationService;
            this.zone = zone;
            this.cd = cd;
            this.config = config;
            this.acceptIcon = 'pi pi-check';
            this.acceptVisible = true;
            this.rejectIcon = 'pi pi-times';
            this.rejectVisible = true;
            this.closeOnEscape = true;
            this.blockScroll = true;
            this.closable = true;
            this.autoZIndex = true;
            this.baseZIndex = 0;
            this.transitionOptions = '150ms cubic-bezier(0, 0, 0.2, 1)';
            this.focusTrap = true;
            this.defaultFocus = 'accept';
            this.onHide = new core.EventEmitter();
            this._position = "center";
            this.transformOptions = "scale(0.7)";
            this.id = utils.UniqueComponentId();
            this.subscription = this.confirmationService.requireConfirmation$.subscribe(function (confirmation) {
                if (!confirmation) {
                    _this.hide();
                    return;
                }
                if (confirmation.key === _this.key) {
                    _this.confirmation = confirmation;
                    _this.confirmationOptions = {
                        message: _this.confirmation.message || _this.message,
                        icon: _this.confirmation.icon || _this.icon,
                        header: _this.confirmation.header || _this.header,
                        rejectVisible: _this.confirmation.rejectVisible == null ? _this.rejectVisible : _this.confirmation.rejectVisible,
                        acceptVisible: _this.confirmation.acceptVisible == null ? _this.acceptVisible : _this.confirmation.acceptVisible,
                        acceptLabel: _this.confirmation.acceptLabel || _this.acceptLabel,
                        rejectLabel: _this.confirmation.rejectLabel || _this.rejectLabel,
                        acceptIcon: _this.confirmation.acceptIcon || _this.acceptIcon,
                        rejectIcon: _this.confirmation.rejectIcon || _this.rejectIcon,
                        acceptButtonStyleClass: _this.confirmation.acceptButtonStyleClass || _this.acceptButtonStyleClass,
                        rejectButtonStyleClass: _this.confirmation.rejectButtonStyleClass || _this.rejectButtonStyleClass,
                        defaultFocus: _this.confirmation.defaultFocus || _this.defaultFocus,
                        blockScroll: (_this.confirmation.blockScroll === false || _this.confirmation.blockScroll === true) ? _this.confirmation.blockScroll : _this.blockScroll,
                        closeOnEscape: (_this.confirmation.closeOnEscape === false || _this.confirmation.closeOnEscape === true) ? _this.confirmation.closeOnEscape : _this.closeOnEscape,
                        dismissableMask: (_this.confirmation.dismissableMask === false || _this.confirmation.dismissableMask === true) ? _this.confirmation.dismissableMask : _this.dismissableMask
                    };
                    if (_this.confirmation.accept) {
                        _this.confirmation.acceptEvent = new core.EventEmitter();
                        _this.confirmation.acceptEvent.subscribe(_this.confirmation.accept);
                    }
                    if (_this.confirmation.reject) {
                        _this.confirmation.rejectEvent = new core.EventEmitter();
                        _this.confirmation.rejectEvent.subscribe(_this.confirmation.reject);
                    }
                    _this.visible = true;
                }
            });
        }
        Object.defineProperty(ConfirmDialog.prototype, "visible", {
            get: function () {
                return this._visible;
            },
            set: function (value) {
                this._visible = value;
                if (this._visible && !this.maskVisible) {
                    this.maskVisible = true;
                }
                this.cd.markForCheck();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ConfirmDialog.prototype, "position", {
            get: function () {
                return this._position;
            },
            set: function (value) {
                this._position = value;
                switch (value) {
                    case 'top-left':
                    case 'bottom-left':
                    case 'left':
                        this.transformOptions = "translate3d(-100%, 0px, 0px)";
                        break;
                    case 'top-right':
                    case 'bottom-right':
                    case 'right':
                        this.transformOptions = "translate3d(100%, 0px, 0px)";
                        break;
                    case 'bottom':
                        this.transformOptions = "translate3d(0px, 100%, 0px)";
                        break;
                    case 'top':
                        this.transformOptions = "translate3d(0px, -100%, 0px)";
                        break;
                    default:
                        this.transformOptions = "scale(0.7)";
                        break;
                }
            },
            enumerable: false,
            configurable: true
        });
        ;
        ConfirmDialog.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'header':
                        _this.headerTemplate = item.template;
                        break;
                    case 'footer':
                        _this.footerTemplate = item.template;
                        break;
                }
            });
        };
        ConfirmDialog.prototype.ngOnInit = function () {
            var _this = this;
            if (this.breakpoints) {
                this.createStyle();
            }
            this.translationSubscription = this.config.translationObserver.subscribe(function () {
                if (_this.visible) {
                    _this.cd.markForCheck();
                }
            });
        };
        ConfirmDialog.prototype.option = function (name) {
            var source = this.confirmationOptions || this;
            if (source.hasOwnProperty(name)) {
                return source[name];
            }
            return undefined;
        };
        ConfirmDialog.prototype.onAnimationStart = function (event) {
            switch (event.toState) {
                case 'visible':
                    this.container = event.element;
                    this.wrapper = this.container.parentElement;
                    this.contentContainer = dom.DomHandler.findSingle(this.container, '.p-dialog-content');
                    this.container.setAttribute(this.id, '');
                    var element = this.getElementToFocus();
                    if (element) {
                        element.focus();
                    }
                    this.appendContainer();
                    this.moveOnTop();
                    this.bindGlobalListeners();
                    this.enableModality();
                    break;
            }
        };
        ConfirmDialog.prototype.onAnimationEnd = function (event) {
            switch (event.toState) {
                case 'void':
                    this.onOverlayHide();
                    break;
            }
        };
        ConfirmDialog.prototype.getElementToFocus = function () {
            switch (this.option('defaultFocus')) {
                case 'accept':
                    return dom.DomHandler.findSingle(this.container, '.p-confirm-dialog-accept');
                case 'reject':
                    return dom.DomHandler.findSingle(this.container, '.p-confirm-dialog-reject');
                case 'close':
                    return dom.DomHandler.findSingle(this.container, '.p-dialog-header-close');
                case 'none':
                    return null;
                //backward compatibility
                default:
                    return dom.DomHandler.findSingle(this.container, '.p-confirm-dialog-accept');
            }
        };
        ConfirmDialog.prototype.appendContainer = function () {
            if (this.appendTo) {
                if (this.appendTo === 'body')
                    document.body.appendChild(this.wrapper);
                else
                    dom.DomHandler.appendChild(this.wrapper, this.appendTo);
            }
        };
        ConfirmDialog.prototype.restoreAppend = function () {
            if (this.wrapper && this.appendTo) {
                this.el.nativeElement.appendChild(this.wrapper);
            }
        };
        ConfirmDialog.prototype.enableModality = function () {
            var _this = this;
            if (this.option('blockScroll')) {
                dom.DomHandler.addClass(document.body, 'p-overflow-hidden');
            }
            if (this.option('dismissableMask')) {
                this.maskClickListener = this.renderer.listen(this.wrapper, 'mousedown', function (event) {
                    if (_this.wrapper && _this.wrapper.isSameNode(event.target)) {
                        _this.close(event);
                    }
                });
            }
        };
        ConfirmDialog.prototype.disableModality = function () {
            this.maskVisible = false;
            if (this.option('blockScroll')) {
                dom.DomHandler.removeClass(document.body, 'p-overflow-hidden');
            }
            if (this.dismissableMask) {
                this.unbindMaskClickListener();
            }
            if (this.container && !this.cd['destroyed']) {
                this.cd.detectChanges();
            }
        };
        ConfirmDialog.prototype.createStyle = function () {
            if (!this.styleElement) {
                this.styleElement = document.createElement('style');
                this.styleElement.type = 'text/css';
                document.head.appendChild(this.styleElement);
                var innerHTML = '';
                for (var breakpoint in this.breakpoints) {
                    innerHTML += "\n                    @media screen and (max-width: " + breakpoint + ") {\n                        .p-dialog[" + this.id + "] {\n                            width: " + this.breakpoints[breakpoint] + " !important;\n                        }\n                    }\n                ";
                }
                this.styleElement.innerHTML = innerHTML;
            }
        };
        ConfirmDialog.prototype.close = function (event) {
            if (this.confirmation.rejectEvent) {
                this.confirmation.rejectEvent.emit(api.ConfirmEventType.CANCEL);
            }
            this.hide(api.ConfirmEventType.CANCEL);
            event.preventDefault();
        };
        ConfirmDialog.prototype.hide = function (type) {
            this.onHide.emit(type);
            this.visible = false;
            this.confirmation = null;
            this.confirmationOptions = null;
        };
        ConfirmDialog.prototype.moveOnTop = function () {
            if (this.autoZIndex) {
                this.container.style.zIndex = String(this.baseZIndex + (++dom.DomHandler.zindex));
                this.wrapper.style.zIndex = String(this.baseZIndex + (dom.DomHandler.zindex - 1));
            }
        };
        ConfirmDialog.prototype.getMaskClass = function () {
            var maskClass = { 'p-dialog-mask p-component-overlay': true, 'p-dialog-mask-scrollblocker': this.blockScroll };
            maskClass[this.getPositionClass().toString()] = true;
            return maskClass;
        };
        ConfirmDialog.prototype.getPositionClass = function () {
            var _this = this;
            var positions = ['left', 'right', 'top', 'top-left', 'top-right', 'bottom', 'bottom-left', 'bottom-right'];
            var pos = positions.find(function (item) { return item === _this.position; });
            return pos ? "p-dialog-" + pos : '';
        };
        ConfirmDialog.prototype.bindGlobalListeners = function () {
            var _this = this;
            if ((this.option('closeOnEscape') && this.closable) || this.focusTrap && !this.documentEscapeListener) {
                var documentTarget = this.el ? this.el.nativeElement.ownerDocument : 'document';
                this.documentEscapeListener = this.renderer.listen(documentTarget, 'keydown', function (event) {
                    if (event.which == 27 && (_this.option('closeOnEscape') && _this.closable)) {
                        if (parseInt(_this.container.style.zIndex) === (dom.DomHandler.zindex + _this.baseZIndex) && _this.visible) {
                            _this.close(event);
                        }
                    }
                    if (event.which === 9 && _this.focusTrap) {
                        event.preventDefault();
                        var focusableElements = dom.DomHandler.getFocusableElements(_this.container);
                        if (focusableElements && focusableElements.length > 0) {
                            if (!focusableElements[0].ownerDocument.activeElement) {
                                focusableElements[0].focus();
                            }
                            else {
                                var focusedIndex = focusableElements.indexOf(focusableElements[0].ownerDocument.activeElement);
                                if (event.shiftKey) {
                                    if (focusedIndex == -1 || focusedIndex === 0)
                                        focusableElements[focusableElements.length - 1].focus();
                                    else
                                        focusableElements[focusedIndex - 1].focus();
                                }
                                else {
                                    if (focusedIndex == -1 || focusedIndex === (focusableElements.length - 1))
                                        focusableElements[0].focus();
                                    else
                                        focusableElements[focusedIndex + 1].focus();
                                }
                            }
                        }
                    }
                });
            }
        };
        ConfirmDialog.prototype.unbindGlobalListeners = function () {
            if (this.documentEscapeListener) {
                this.documentEscapeListener();
                this.documentEscapeListener = null;
            }
        };
        ConfirmDialog.prototype.unbindMaskClickListener = function () {
            if (this.maskClickListener) {
                this.maskClickListener();
                this.maskClickListener = null;
            }
        };
        ConfirmDialog.prototype.onOverlayHide = function () {
            this.disableModality();
            this.unbindGlobalListeners();
            this.container = null;
        };
        ConfirmDialog.prototype.destroyStyle = function () {
            if (this.styleElement) {
                document.head.removeChild(this.styleElement);
                this.styleElement = null;
            }
        };
        ConfirmDialog.prototype.ngOnDestroy = function () {
            this.restoreAppend();
            this.onOverlayHide();
            this.subscription.unsubscribe();
            if (this.translationSubscription) {
                this.translationSubscription.unsubscribe();
            }
            this.destroyStyle();
        };
        ConfirmDialog.prototype.accept = function () {
            if (this.confirmation && this.confirmation.acceptEvent) {
                this.confirmation.acceptEvent.emit();
            }
            this.hide(api.ConfirmEventType.ACCEPT);
        };
        ConfirmDialog.prototype.reject = function () {
            if (this.confirmation && this.confirmation.rejectEvent) {
                this.confirmation.rejectEvent.emit(api.ConfirmEventType.REJECT);
            }
            this.hide(api.ConfirmEventType.REJECT);
        };
        Object.defineProperty(ConfirmDialog.prototype, "acceptButtonLabel", {
            get: function () {
                return this.option('acceptLabel') || this.config.getTranslation(api.TranslationKeys.ACCEPT);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ConfirmDialog.prototype, "rejectButtonLabel", {
            get: function () {
                return this.option('rejectLabel') || this.config.getTranslation(api.TranslationKeys.REJECT);
            },
            enumerable: false,
            configurable: true
        });
        return ConfirmDialog;
    }());
    ConfirmDialog.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-confirmDialog',
                    template: "\n        <div [class]=\"maskStyleClass\" [ngClass]=\"getMaskClass()\" *ngIf=\"maskVisible\">\n            <div [ngClass]=\"{'p-dialog p-confirm-dialog p-component':true,'p-dialog-rtl':rtl}\" [ngStyle]=\"style\" [class]=\"styleClass\" (mousedown)=\"moveOnTop()\"\n                [@animation]=\"{value: 'visible', params: {transform: transformOptions, transition: transitionOptions}}\" (@animation.start)=\"onAnimationStart($event)\" (@animation.done)=\"onAnimationEnd($event)\" *ngIf=\"visible\">\n                <div class=\"p-dialog-header\" *ngIf=\"headerTemplate\">\n                    <ng-container *ngTemplateOutlet=\"headerTemplate\"></ng-container>\n                </div>\n                <div class=\"p-dialog-header\" *ngIf=\"!headerTemplate\">\n                    <span class=\"p-dialog-title\" *ngIf=\"option('header')\">{{option('header')}}</span>\n                    <div class=\"p-dialog-header-icons\">\n                        <button *ngIf=\"closable\" type=\"button\" [ngClass]=\"{'p-dialog-header-icon p-dialog-header-close p-link':true}\" (click)=\"close($event)\" (keydown.enter)=\"close($event)\">\n                            <span class=\"pi pi-times\"></span>\n                        </button>\n                    </div>\n                </div>\n                <div #content class=\"p-dialog-content\">\n                    <i [ngClass]=\"'p-confirm-dialog-icon'\" [class]=\"option('icon')\" *ngIf=\"option('icon')\"></i>\n                    <span class=\"p-confirm-dialog-message\" [innerHTML]=\"option('message')\"></span>\n                </div>\n                <div class=\"p-dialog-footer\" *ngIf=\"footer || footerTemplate\">\n                    <ng-content select=\"p-footer\"></ng-content>\n                    <ng-container *ngTemplateOutlet=\"footerTemplate\"></ng-container>\n                </div>\n                <div class=\"p-dialog-footer\" *ngIf=\"!footer && !footerTemplate\">\n                    <button type=\"button\" pRipple pButton [icon]=\"option('rejectIcon')\" [label]=\"rejectButtonLabel\" (click)=\"reject()\" [ngClass]=\"'p-confirm-dialog-reject'\" [class]=\"option('rejectButtonStyleClass')\" *ngIf=\"option('rejectVisible')\" [attr.aria-label]=\"rejectAriaLabel\"></button>\n                    <button type=\"button\" pRipple pButton [icon]=\"option('acceptIcon')\" [label]=\"acceptButtonLabel\" (click)=\"accept()\" [ngClass]=\"'p-confirm-dialog-accept'\" [class]=\"option('acceptButtonStyleClass')\" *ngIf=\"option('acceptVisible')\" [attr.aria-label]=\"acceptAriaLabel\"></button>\n                </div>\n            </div>\n        </div>\n    ",
                    animations: [
                        animations.trigger('animation', [
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
                    styles: [".p-dialog-mask{align-items:center;background-color:transparent;display:flex;height:100%;justify-content:center;left:0;pointer-events:none;position:fixed;top:0;transition-property:background-color;width:100%}.p-dialog,.p-dialog-mask.p-component-overlay{pointer-events:auto}.p-dialog{display:flex;flex-direction:column;max-height:90%;position:relative;transform:scale(1)}.p-dialog-content{overflow-y:auto}.p-dialog-header{align-items:center;display:flex;flex-shrink:0;justify-content:space-between}.p-dialog-footer{flex-shrink:0}.p-dialog .p-dialog-header-icons{align-items:center;display:flex}.p-dialog .p-dialog-header-icon{align-items:center;display:flex;justify-content:center;overflow:hidden;position:relative}.p-dialog-mask.p-dialog-mask-leave{background-color:transparent}.p-fluid .p-dialog-footer .p-button{width:auto}.p-dialog-bottom-left .p-dialog,.p-dialog-bottom-right .p-dialog,.p-dialog-bottom .p-dialog,.p-dialog-left .p-dialog,.p-dialog-right .p-dialog,.p-dialog-top-left .p-dialog,.p-dialog-top-right .p-dialog,.p-dialog-top .p-dialog{margin:.75rem;transform:translateZ(0)}.p-dialog-maximized{height:100%;left:0!important;max-height:100%;top:0!important;transform:none;transition:none;width:100vw!important}.p-dialog-maximized .p-dialog-content{flex-grow:1}.p-dialog-left{justify-content:flex-start}.p-dialog-right{justify-content:flex-end}.p-dialog-top,.p-dialog-top-left{align-items:flex-start}.p-dialog-top-left{justify-content:flex-start}.p-dialog-top-right{align-items:flex-start;justify-content:flex-end}.p-dialog-bottom{align-items:flex-end}.p-dialog-bottom-left{align-items:flex-end;justify-content:flex-start}.p-dialog-bottom-right{align-items:flex-end;justify-content:flex-end}.p-dialog .p-resizable-handle{bottom:1px;cursor:se-resize;display:block;font-size:.1px;height:12px;position:absolute;right:1px;width:12px}.p-confirm-dialog .p-dialog-content{align-items:center;display:flex}"]
                },] }
    ];
    ConfirmDialog.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.Renderer2 },
        { type: api.ConfirmationService },
        { type: core.NgZone },
        { type: core.ChangeDetectorRef },
        { type: api.PrimeNGConfig }
    ]; };
    ConfirmDialog.propDecorators = {
        header: [{ type: core.Input }],
        icon: [{ type: core.Input }],
        message: [{ type: core.Input }],
        style: [{ type: core.Input }],
        styleClass: [{ type: core.Input }],
        maskStyleClass: [{ type: core.Input }],
        acceptIcon: [{ type: core.Input }],
        acceptLabel: [{ type: core.Input }],
        acceptAriaLabel: [{ type: core.Input }],
        acceptVisible: [{ type: core.Input }],
        rejectIcon: [{ type: core.Input }],
        rejectLabel: [{ type: core.Input }],
        rejectAriaLabel: [{ type: core.Input }],
        rejectVisible: [{ type: core.Input }],
        acceptButtonStyleClass: [{ type: core.Input }],
        rejectButtonStyleClass: [{ type: core.Input }],
        closeOnEscape: [{ type: core.Input }],
        dismissableMask: [{ type: core.Input }],
        blockScroll: [{ type: core.Input }],
        rtl: [{ type: core.Input }],
        closable: [{ type: core.Input }],
        appendTo: [{ type: core.Input }],
        key: [{ type: core.Input }],
        autoZIndex: [{ type: core.Input }],
        baseZIndex: [{ type: core.Input }],
        transitionOptions: [{ type: core.Input }],
        focusTrap: [{ type: core.Input }],
        defaultFocus: [{ type: core.Input }],
        breakpoints: [{ type: core.Input }],
        visible: [{ type: core.Input }],
        position: [{ type: core.Input }],
        onHide: [{ type: core.Output }],
        footer: [{ type: core.ContentChild, args: [api.Footer,] }],
        contentViewChild: [{ type: core.ViewChild, args: ['content',] }],
        templates: [{ type: core.ContentChildren, args: [api.PrimeTemplate,] }]
    };
    var ConfirmDialogModule = /** @class */ (function () {
        function ConfirmDialogModule() {
        }
        return ConfirmDialogModule;
    }());
    ConfirmDialogModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule, button.ButtonModule, ripple.RippleModule],
                    exports: [ConfirmDialog, button.ButtonModule, api.SharedModule],
                    declarations: [ConfirmDialog]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.ConfirmDialog = ConfirmDialog;
    exports.ConfirmDialogModule = ConfirmDialogModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-confirmdialog.umd.js.map
