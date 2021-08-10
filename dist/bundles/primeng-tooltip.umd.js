(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/dom')) :
    typeof define === 'function' && define.amd ? define('primeng/tooltip', ['exports', '@angular/core', '@angular/common', 'primeng/dom'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.tooltip = {}), global.ng.core, global.ng.common, global.primeng.dom));
}(this, (function (exports, core, common, dom) { 'use strict';

    var Tooltip = /** @class */ (function () {
        function Tooltip(el, zone) {
            this.el = el;
            this.zone = zone;
            this.tooltipPosition = 'right';
            this.tooltipEvent = 'hover';
            this.appendTo = 'body';
            this.tooltipZIndex = 'auto';
            this.escape = true;
        }
        Object.defineProperty(Tooltip.prototype, "disabled", {
            get: function () {
                return this._disabled;
            },
            set: function (val) {
                this._disabled = val;
                this.deactivate();
            },
            enumerable: false,
            configurable: true
        });
        Tooltip.prototype.ngAfterViewInit = function () {
            var _this = this;
            this.zone.runOutsideAngular(function () {
                if (_this.tooltipEvent === 'hover') {
                    _this.mouseEnterListener = _this.onMouseEnter.bind(_this);
                    _this.mouseLeaveListener = _this.onMouseLeave.bind(_this);
                    _this.clickListener = _this.onClick.bind(_this);
                    _this.el.nativeElement.addEventListener('mouseenter', _this.mouseEnterListener);
                    _this.el.nativeElement.addEventListener('mouseleave', _this.mouseLeaveListener);
                    _this.el.nativeElement.addEventListener('click', _this.clickListener);
                }
                else if (_this.tooltipEvent === 'focus') {
                    _this.focusListener = _this.onFocus.bind(_this);
                    _this.blurListener = _this.onBlur.bind(_this);
                    _this.el.nativeElement.addEventListener('focus', _this.focusListener);
                    _this.el.nativeElement.addEventListener('blur', _this.blurListener);
                }
            });
        };
        Tooltip.prototype.onMouseEnter = function (e) {
            if (!this.container && !this.showTimeout) {
                this.activate();
            }
        };
        Tooltip.prototype.onMouseLeave = function (e) {
            this.deactivate();
        };
        Tooltip.prototype.onFocus = function (e) {
            this.activate();
        };
        Tooltip.prototype.onBlur = function (e) {
            this.deactivate();
        };
        Tooltip.prototype.onClick = function (e) {
            this.deactivate();
        };
        Tooltip.prototype.activate = function () {
            var _this = this;
            this.active = true;
            this.clearHideTimeout();
            if (this.showDelay)
                this.showTimeout = setTimeout(function () { _this.show(); }, this.showDelay);
            else
                this.show();
            if (this.life) {
                var duration = this.showDelay ? this.life + this.showDelay : this.life;
                this.hideTimeout = setTimeout(function () { _this.hide(); }, duration);
            }
        };
        Tooltip.prototype.deactivate = function () {
            var _this = this;
            this.active = false;
            this.clearShowTimeout();
            if (this.hideDelay) {
                this.clearHideTimeout(); //life timeout
                this.hideTimeout = setTimeout(function () { _this.hide(); }, this.hideDelay);
            }
            else {
                this.hide();
            }
        };
        Object.defineProperty(Tooltip.prototype, "text", {
            get: function () {
                return this._text;
            },
            set: function (text) {
                this._text = text;
                if (this.active) {
                    if (this._text) {
                        if (this.container && this.container.offsetParent) {
                            this.updateText();
                            this.align();
                        }
                        else {
                            this.show();
                        }
                    }
                    else {
                        this.hide();
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        Tooltip.prototype.create = function () {
            if (this.container) {
                this.clearHideTimeout();
                this.remove();
            }
            this.container = document.createElement('div');
            var tooltipArrow = document.createElement('div');
            tooltipArrow.className = 'p-tooltip-arrow';
            this.container.appendChild(tooltipArrow);
            this.tooltipText = document.createElement('div');
            this.tooltipText.className = 'p-tooltip-text';
            this.updateText();
            if (this.positionStyle) {
                this.container.style.position = this.positionStyle;
            }
            this.container.appendChild(this.tooltipText);
            if (this.appendTo === 'body')
                document.body.appendChild(this.container);
            else if (this.appendTo === 'target')
                dom.DomHandler.appendChild(this.container, this.el.nativeElement);
            else
                dom.DomHandler.appendChild(this.container, this.appendTo);
            this.container.style.display = 'inline-block';
        };
        Tooltip.prototype.show = function () {
            if (!this.text || this.disabled) {
                return;
            }
            this.create();
            this.align();
            dom.DomHandler.fadeIn(this.container, 250);
            if (this.tooltipZIndex === 'auto')
                this.container.style.zIndex = ++dom.DomHandler.zindex;
            else
                this.container.style.zIndex = this.tooltipZIndex;
            this.bindDocumentResizeListener();
            this.bindScrollListener();
        };
        Tooltip.prototype.hide = function () {
            this.remove();
        };
        Tooltip.prototype.updateText = function () {
            if (this.escape) {
                this.tooltipText.innerHTML = '';
                this.tooltipText.appendChild(document.createTextNode(this._text));
            }
            else {
                this.tooltipText.innerHTML = this._text;
            }
        };
        Tooltip.prototype.align = function () {
            var position = this.tooltipPosition;
            switch (position) {
                case 'top':
                    this.alignTop();
                    if (this.isOutOfBounds()) {
                        this.alignBottom();
                        if (this.isOutOfBounds()) {
                            this.alignRight();
                            if (this.isOutOfBounds()) {
                                this.alignLeft();
                            }
                        }
                    }
                    break;
                case 'bottom':
                    this.alignBottom();
                    if (this.isOutOfBounds()) {
                        this.alignTop();
                        if (this.isOutOfBounds()) {
                            this.alignRight();
                            if (this.isOutOfBounds()) {
                                this.alignLeft();
                            }
                        }
                    }
                    break;
                case 'left':
                    this.alignLeft();
                    if (this.isOutOfBounds()) {
                        this.alignRight();
                        if (this.isOutOfBounds()) {
                            this.alignTop();
                            if (this.isOutOfBounds()) {
                                this.alignBottom();
                            }
                        }
                    }
                    break;
                case 'right':
                    this.alignRight();
                    if (this.isOutOfBounds()) {
                        this.alignLeft();
                        if (this.isOutOfBounds()) {
                            this.alignTop();
                            if (this.isOutOfBounds()) {
                                this.alignBottom();
                            }
                        }
                    }
                    break;
            }
        };
        Tooltip.prototype.getHostOffset = function () {
            if (this.appendTo === 'body' || this.appendTo === 'target') {
                var offset = this.el.nativeElement.getBoundingClientRect();
                var targetLeft = offset.left + dom.DomHandler.getWindowScrollLeft();
                var targetTop = offset.top + dom.DomHandler.getWindowScrollTop();
                return { left: targetLeft, top: targetTop };
            }
            else {
                return { left: 0, top: 0 };
            }
        };
        Tooltip.prototype.alignRight = function () {
            this.preAlign('right');
            var hostOffset = this.getHostOffset();
            var left = hostOffset.left + dom.DomHandler.getOuterWidth(this.el.nativeElement);
            var top = hostOffset.top + (dom.DomHandler.getOuterHeight(this.el.nativeElement) - dom.DomHandler.getOuterHeight(this.container)) / 2;
            this.container.style.left = left + 'px';
            this.container.style.top = top + 'px';
        };
        Tooltip.prototype.alignLeft = function () {
            this.preAlign('left');
            var hostOffset = this.getHostOffset();
            var left = hostOffset.left - dom.DomHandler.getOuterWidth(this.container);
            var top = hostOffset.top + (dom.DomHandler.getOuterHeight(this.el.nativeElement) - dom.DomHandler.getOuterHeight(this.container)) / 2;
            this.container.style.left = left + 'px';
            this.container.style.top = top + 'px';
        };
        Tooltip.prototype.alignTop = function () {
            this.preAlign('top');
            var hostOffset = this.getHostOffset();
            var left = hostOffset.left + (dom.DomHandler.getOuterWidth(this.el.nativeElement) - dom.DomHandler.getOuterWidth(this.container)) / 2;
            var top = hostOffset.top - dom.DomHandler.getOuterHeight(this.container);
            this.container.style.left = left + 'px';
            this.container.style.top = top + 'px';
        };
        Tooltip.prototype.alignBottom = function () {
            this.preAlign('bottom');
            var hostOffset = this.getHostOffset();
            var left = hostOffset.left + (dom.DomHandler.getOuterWidth(this.el.nativeElement) - dom.DomHandler.getOuterWidth(this.container)) / 2;
            var top = hostOffset.top + dom.DomHandler.getOuterHeight(this.el.nativeElement);
            this.container.style.left = left + 'px';
            this.container.style.top = top + 'px';
        };
        Tooltip.prototype.preAlign = function (position) {
            this.container.style.left = -999 + 'px';
            this.container.style.top = -999 + 'px';
            var defaultClassName = 'p-tooltip p-component p-tooltip-' + position;
            this.container.className = this.tooltipStyleClass ? defaultClassName + ' ' + this.tooltipStyleClass : defaultClassName;
        };
        Tooltip.prototype.isOutOfBounds = function () {
            var offset = this.container.getBoundingClientRect();
            var targetTop = offset.top;
            var targetLeft = offset.left;
            var width = dom.DomHandler.getOuterWidth(this.container);
            var height = dom.DomHandler.getOuterHeight(this.container);
            var viewport = dom.DomHandler.getViewport();
            return (targetLeft + width > viewport.width) || (targetLeft < 0) || (targetTop < 0) || (targetTop + height > viewport.height);
        };
        Tooltip.prototype.onWindowResize = function (e) {
            this.hide();
        };
        Tooltip.prototype.bindDocumentResizeListener = function () {
            var _this = this;
            this.zone.runOutsideAngular(function () {
                _this.resizeListener = _this.onWindowResize.bind(_this);
                window.addEventListener('resize', _this.resizeListener);
            });
        };
        Tooltip.prototype.unbindDocumentResizeListener = function () {
            if (this.resizeListener) {
                window.removeEventListener('resize', this.resizeListener);
                this.resizeListener = null;
            }
        };
        Tooltip.prototype.bindScrollListener = function () {
            var _this = this;
            if (!this.scrollHandler) {
                this.scrollHandler = new dom.ConnectedOverlayScrollHandler(this.el.nativeElement, function () {
                    if (_this.container) {
                        _this.hide();
                    }
                });
            }
            this.scrollHandler.bindScrollListener();
        };
        Tooltip.prototype.unbindScrollListener = function () {
            if (this.scrollHandler) {
                this.scrollHandler.unbindScrollListener();
            }
        };
        Tooltip.prototype.unbindEvents = function () {
            if (this.tooltipEvent === 'hover') {
                this.el.nativeElement.removeEventListener('mouseenter', this.mouseEnterListener);
                this.el.nativeElement.removeEventListener('mouseleave', this.mouseLeaveListener);
                this.el.nativeElement.removeEventListener('click', this.clickListener);
            }
            else if (this.tooltipEvent === 'focus') {
                this.el.nativeElement.removeEventListener('focus', this.focusListener);
                this.el.nativeElement.removeEventListener('blur', this.blurListener);
            }
            this.unbindDocumentResizeListener();
        };
        Tooltip.prototype.remove = function () {
            if (this.container && this.container.parentElement) {
                if (this.appendTo === 'body')
                    document.body.removeChild(this.container);
                else if (this.appendTo === 'target')
                    this.el.nativeElement.removeChild(this.container);
                else
                    dom.DomHandler.removeChild(this.container, this.appendTo);
            }
            this.unbindDocumentResizeListener();
            this.unbindScrollListener();
            this.clearTimeouts();
            this.container = null;
            this.scrollHandler = null;
        };
        Tooltip.prototype.clearShowTimeout = function () {
            if (this.showTimeout) {
                clearTimeout(this.showTimeout);
                this.showTimeout = null;
            }
        };
        Tooltip.prototype.clearHideTimeout = function () {
            if (this.hideTimeout) {
                clearTimeout(this.hideTimeout);
                this.hideTimeout = null;
            }
        };
        Tooltip.prototype.clearTimeouts = function () {
            this.clearShowTimeout();
            this.clearHideTimeout();
        };
        Tooltip.prototype.ngOnDestroy = function () {
            this.unbindEvents();
            this.remove();
            if (this.scrollHandler) {
                this.scrollHandler.destroy();
                this.scrollHandler = null;
            }
        };
        return Tooltip;
    }());
    Tooltip.decorators = [
        { type: core.Directive, args: [{
                    selector: '[pTooltip]'
                },] }
    ];
    Tooltip.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.NgZone }
    ]; };
    Tooltip.propDecorators = {
        tooltipPosition: [{ type: core.Input }],
        tooltipEvent: [{ type: core.Input }],
        appendTo: [{ type: core.Input }],
        positionStyle: [{ type: core.Input }],
        tooltipStyleClass: [{ type: core.Input }],
        tooltipZIndex: [{ type: core.Input }],
        escape: [{ type: core.Input }],
        showDelay: [{ type: core.Input }],
        hideDelay: [{ type: core.Input }],
        life: [{ type: core.Input }],
        disabled: [{ type: core.Input, args: ["tooltipDisabled",] }],
        text: [{ type: core.Input, args: ['pTooltip',] }]
    };
    var TooltipModule = /** @class */ (function () {
        function TooltipModule() {
        }
        return TooltipModule;
    }());
    TooltipModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule],
                    exports: [Tooltip],
                    declarations: [Tooltip]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Tooltip = Tooltip;
    exports.TooltipModule = TooltipModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-tooltip.umd.js.map
