(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/animations'), require('@angular/common'), require('primeng/dom'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('primeng/colorpicker', ['exports', '@angular/core', '@angular/animations', '@angular/common', 'primeng/dom', '@angular/forms'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.colorpicker = {}), global.ng.core, global.ng.animations, global.ng.common, global.primeng.dom, global.ng.forms));
}(this, (function (exports, core, animations, common, dom, forms) { 'use strict';

    var COLORPICKER_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return ColorPicker; }),
        multi: true
    };
    var ColorPicker = /** @class */ (function () {
        function ColorPicker(el, renderer, cd) {
            this.el = el;
            this.renderer = renderer;
            this.cd = cd;
            this.format = 'hex';
            this.autoZIndex = true;
            this.baseZIndex = 0;
            this.showTransitionOptions = '.12s cubic-bezier(0, 0, 0.2, 1)';
            this.hideTransitionOptions = '.1s linear';
            this.onChange = new core.EventEmitter();
            this.onShow = new core.EventEmitter();
            this.onHide = new core.EventEmitter();
            this.value = { h: 0, s: 100, b: 100 };
            this.defaultColor = 'ff0000';
            this.onModelChange = function () { };
            this.onModelTouched = function () { };
        }
        Object.defineProperty(ColorPicker.prototype, "colorSelector", {
            set: function (element) {
                this.colorSelectorViewChild = element;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ColorPicker.prototype, "colorHandle", {
            set: function (element) {
                this.colorHandleViewChild = element;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ColorPicker.prototype, "hue", {
            set: function (element) {
                this.hueViewChild = element;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ColorPicker.prototype, "hueHandle", {
            set: function (element) {
                this.hueHandleViewChild = element;
            },
            enumerable: false,
            configurable: true
        });
        ColorPicker.prototype.onHueMousedown = function (event) {
            if (this.disabled) {
                return;
            }
            this.bindDocumentMousemoveListener();
            this.bindDocumentMouseupListener();
            this.hueDragging = true;
            this.pickHue(event);
        };
        ColorPicker.prototype.onHueTouchStart = function (event) {
            if (this.disabled) {
                return;
            }
            this.hueDragging = true;
            this.pickHue(event);
        };
        ColorPicker.prototype.onColorTouchStart = function (event) {
            if (this.disabled) {
                return;
            }
            this.colorDragging = true;
            this.pickColor(event);
        };
        ColorPicker.prototype.pickHue = function (event) {
            var top = this.hueViewChild.nativeElement.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0);
            this.value = this.validateHSB({
                h: Math.floor(360 * (150 - Math.max(0, Math.min(150, ((event.pageY || event.changedTouches[0].pageY) - top)))) / 150),
                s: this.value.s,
                b: this.value.b
            });
            this.updateColorSelector();
            this.updateUI();
            this.updateModel();
            this.onChange.emit({ originalEvent: event, value: this.getValueToUpdate() });
        };
        ColorPicker.prototype.onColorMousedown = function (event) {
            if (this.disabled) {
                return;
            }
            this.bindDocumentMousemoveListener();
            this.bindDocumentMouseupListener();
            this.colorDragging = true;
            this.pickColor(event);
        };
        ColorPicker.prototype.onMove = function (event) {
            if (this.colorDragging) {
                this.pickColor(event);
                event.preventDefault();
            }
            if (this.hueDragging) {
                this.pickHue(event);
                event.preventDefault();
            }
        };
        ColorPicker.prototype.onDragEnd = function () {
            this.colorDragging = false;
            this.hueDragging = false;
            this.unbindDocumentMousemoveListener();
            this.unbindDocumentMouseupListener();
        };
        ColorPicker.prototype.pickColor = function (event) {
            var rect = this.colorSelectorViewChild.nativeElement.getBoundingClientRect();
            var top = rect.top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0);
            var left = rect.left + document.body.scrollLeft;
            var saturation = Math.floor(100 * (Math.max(0, Math.min(150, ((event.pageX || event.changedTouches[0].pageX) - left)))) / 150);
            var brightness = Math.floor(100 * (150 - Math.max(0, Math.min(150, ((event.pageY || event.changedTouches[0].pageY) - top)))) / 150);
            this.value = this.validateHSB({
                h: this.value.h,
                s: saturation,
                b: brightness
            });
            this.updateUI();
            this.updateModel();
            this.onChange.emit({ originalEvent: event, value: this.getValueToUpdate() });
        };
        ColorPicker.prototype.getValueToUpdate = function () {
            var val;
            switch (this.format) {
                case 'hex':
                    val = '#' + this.HSBtoHEX(this.value);
                    break;
                case 'rgb':
                    val = this.HSBtoRGB(this.value);
                    break;
                case 'hsb':
                    val = this.value;
                    break;
            }
            return val;
        };
        ColorPicker.prototype.updateModel = function () {
            this.onModelChange(this.getValueToUpdate());
        };
        ColorPicker.prototype.writeValue = function (value) {
            if (value) {
                switch (this.format) {
                    case 'hex':
                        this.value = this.HEXtoHSB(value);
                        break;
                    case 'rgb':
                        this.value = this.RGBtoHSB(value);
                        break;
                    case 'hsb':
                        this.value = value;
                        break;
                }
            }
            else {
                this.value = this.HEXtoHSB(this.defaultColor);
            }
            this.updateColorSelector();
            this.updateUI();
            this.cd.markForCheck();
        };
        ColorPicker.prototype.updateColorSelector = function () {
            if (this.colorSelectorViewChild) {
                var hsb = {};
                hsb.s = 100;
                hsb.b = 100;
                hsb.h = this.value.h;
                this.colorSelectorViewChild.nativeElement.style.backgroundColor = '#' + this.HSBtoHEX(hsb);
            }
        };
        ColorPicker.prototype.updateUI = function () {
            if (this.colorHandleViewChild && this.hueHandleViewChild.nativeElement) {
                this.colorHandleViewChild.nativeElement.style.left = Math.floor(150 * this.value.s / 100) + 'px';
                this.colorHandleViewChild.nativeElement.style.top = Math.floor(150 * (100 - this.value.b) / 100) + 'px';
                this.hueHandleViewChild.nativeElement.style.top = Math.floor(150 - (150 * this.value.h / 360)) + 'px';
            }
            this.inputBgColor = '#' + this.HSBtoHEX(this.value);
        };
        ColorPicker.prototype.onInputFocus = function () {
            this.onModelTouched();
        };
        ColorPicker.prototype.show = function () {
            this.overlayVisible = true;
        };
        ColorPicker.prototype.onOverlayAnimationStart = function (event) {
            switch (event.toState) {
                case 'visible':
                    if (!this.inline) {
                        this.overlay = event.element;
                        this.appendOverlay();
                        if (this.autoZIndex) {
                            this.overlay.style.zIndex = String(this.baseZIndex + (++dom.DomHandler.zindex));
                        }
                        this.alignOverlay();
                        this.bindDocumentClickListener();
                        this.bindDocumentResizeListener();
                        this.bindScrollListener();
                        this.updateColorSelector();
                        this.updateUI();
                    }
                    break;
                case 'void':
                    this.onOverlayHide();
                    break;
            }
        };
        ColorPicker.prototype.onOverlayAnimationEnd = function (event) {
            switch (event.toState) {
                case 'visible':
                    if (!this.inline) {
                        this.onShow.emit({});
                    }
                    break;
                case 'void':
                    this.onHide.emit({});
                    break;
            }
        };
        ColorPicker.prototype.appendOverlay = function () {
            if (this.appendTo) {
                if (this.appendTo === 'body')
                    document.body.appendChild(this.overlay);
                else
                    dom.DomHandler.appendChild(this.overlay, this.appendTo);
            }
        };
        ColorPicker.prototype.restoreOverlayAppend = function () {
            if (this.overlay && this.appendTo) {
                this.el.nativeElement.appendChild(this.overlay);
            }
        };
        ColorPicker.prototype.alignOverlay = function () {
            if (this.appendTo)
                dom.DomHandler.absolutePosition(this.overlay, this.inputViewChild.nativeElement);
            else
                dom.DomHandler.relativePosition(this.overlay, this.inputViewChild.nativeElement);
        };
        ColorPicker.prototype.hide = function () {
            this.overlayVisible = false;
            this.cd.markForCheck();
        };
        ColorPicker.prototype.onInputClick = function () {
            this.selfClick = true;
            this.togglePanel();
        };
        ColorPicker.prototype.togglePanel = function () {
            if (!this.overlayVisible)
                this.show();
            else
                this.hide();
        };
        ColorPicker.prototype.onInputKeydown = function (event) {
            switch (event.which) {
                //space
                case 32:
                    this.togglePanel();
                    event.preventDefault();
                    break;
                //escape and tab
                case 27:
                case 9:
                    this.hide();
                    break;
            }
        };
        ColorPicker.prototype.onPanelClick = function () {
            this.selfClick = true;
        };
        ColorPicker.prototype.registerOnChange = function (fn) {
            this.onModelChange = fn;
        };
        ColorPicker.prototype.registerOnTouched = function (fn) {
            this.onModelTouched = fn;
        };
        ColorPicker.prototype.setDisabledState = function (val) {
            this.disabled = val;
            this.cd.markForCheck();
        };
        ColorPicker.prototype.bindDocumentClickListener = function () {
            var _this = this;
            if (!this.documentClickListener) {
                var documentTarget = this.el ? this.el.nativeElement.ownerDocument : 'document';
                this.documentClickListener = this.renderer.listen(documentTarget, 'click', function () {
                    if (!_this.selfClick) {
                        _this.overlayVisible = false;
                        _this.unbindDocumentClickListener();
                    }
                    _this.selfClick = false;
                    _this.cd.markForCheck();
                });
            }
        };
        ColorPicker.prototype.unbindDocumentClickListener = function () {
            if (this.documentClickListener) {
                this.documentClickListener();
                this.documentClickListener = null;
            }
        };
        ColorPicker.prototype.bindDocumentMousemoveListener = function () {
            var _this = this;
            if (!this.documentMousemoveListener) {
                var documentTarget = this.el ? this.el.nativeElement.ownerDocument : 'document';
                this.documentMousemoveListener = this.renderer.listen(documentTarget, 'mousemove', function (event) {
                    if (_this.colorDragging) {
                        _this.pickColor(event);
                    }
                    if (_this.hueDragging) {
                        _this.pickHue(event);
                    }
                });
            }
        };
        ColorPicker.prototype.unbindDocumentMousemoveListener = function () {
            if (this.documentMousemoveListener) {
                this.documentMousemoveListener();
                this.documentMousemoveListener = null;
            }
        };
        ColorPicker.prototype.bindDocumentMouseupListener = function () {
            var _this = this;
            if (!this.documentMouseupListener) {
                var documentTarget = this.el ? this.el.nativeElement.ownerDocument : 'document';
                this.documentMouseupListener = this.renderer.listen(documentTarget, 'mouseup', function () {
                    _this.colorDragging = false;
                    _this.hueDragging = false;
                    _this.unbindDocumentMousemoveListener();
                    _this.unbindDocumentMouseupListener();
                });
            }
        };
        ColorPicker.prototype.unbindDocumentMouseupListener = function () {
            if (this.documentMouseupListener) {
                this.documentMouseupListener();
                this.documentMouseupListener = null;
            }
        };
        ColorPicker.prototype.bindDocumentResizeListener = function () {
            this.documentResizeListener = this.onWindowResize.bind(this);
            window.addEventListener('resize', this.documentResizeListener);
        };
        ColorPicker.prototype.unbindDocumentResizeListener = function () {
            if (this.documentResizeListener) {
                window.removeEventListener('resize', this.documentResizeListener);
                this.documentResizeListener = null;
            }
        };
        ColorPicker.prototype.onWindowResize = function () {
            this.hide();
        };
        ColorPicker.prototype.bindScrollListener = function () {
            var _this = this;
            if (!this.scrollHandler) {
                this.scrollHandler = new dom.ConnectedOverlayScrollHandler(this.containerViewChild.nativeElement, function () {
                    if (_this.overlayVisible) {
                        _this.hide();
                    }
                });
            }
            this.scrollHandler.bindScrollListener();
        };
        ColorPicker.prototype.unbindScrollListener = function () {
            if (this.scrollHandler) {
                this.scrollHandler.unbindScrollListener();
            }
        };
        ColorPicker.prototype.validateHSB = function (hsb) {
            return {
                h: Math.min(360, Math.max(0, hsb.h)),
                s: Math.min(100, Math.max(0, hsb.s)),
                b: Math.min(100, Math.max(0, hsb.b))
            };
        };
        ColorPicker.prototype.validateRGB = function (rgb) {
            return {
                r: Math.min(255, Math.max(0, rgb.r)),
                g: Math.min(255, Math.max(0, rgb.g)),
                b: Math.min(255, Math.max(0, rgb.b))
            };
        };
        ColorPicker.prototype.validateHEX = function (hex) {
            var len = 6 - hex.length;
            if (len > 0) {
                var o = [];
                for (var i = 0; i < len; i++) {
                    o.push('0');
                }
                o.push(hex);
                hex = o.join('');
            }
            return hex;
        };
        ColorPicker.prototype.HEXtoRGB = function (hex) {
            var hexValue = parseInt(((hex.indexOf('#') > -1) ? hex.substring(1) : hex), 16);
            return { r: hexValue >> 16, g: (hexValue & 0x00FF00) >> 8, b: (hexValue & 0x0000FF) };
        };
        ColorPicker.prototype.HEXtoHSB = function (hex) {
            return this.RGBtoHSB(this.HEXtoRGB(hex));
        };
        ColorPicker.prototype.RGBtoHSB = function (rgb) {
            var hsb = {
                h: 0,
                s: 0,
                b: 0
            };
            var min = Math.min(rgb.r, rgb.g, rgb.b);
            var max = Math.max(rgb.r, rgb.g, rgb.b);
            var delta = max - min;
            hsb.b = max;
            hsb.s = max != 0 ? 255 * delta / max : 0;
            if (hsb.s != 0) {
                if (rgb.r == max) {
                    hsb.h = (rgb.g - rgb.b) / delta;
                }
                else if (rgb.g == max) {
                    hsb.h = 2 + (rgb.b - rgb.r) / delta;
                }
                else {
                    hsb.h = 4 + (rgb.r - rgb.g) / delta;
                }
            }
            else {
                hsb.h = -1;
            }
            hsb.h *= 60;
            if (hsb.h < 0) {
                hsb.h += 360;
            }
            hsb.s *= 100 / 255;
            hsb.b *= 100 / 255;
            return hsb;
        };
        ColorPicker.prototype.HSBtoRGB = function (hsb) {
            var rgb = {
                r: null, g: null, b: null
            };
            var h = hsb.h;
            var s = hsb.s * 255 / 100;
            var v = hsb.b * 255 / 100;
            if (s == 0) {
                rgb = {
                    r: v,
                    g: v,
                    b: v
                };
            }
            else {
                var t1 = v;
                var t2 = (255 - s) * v / 255;
                var t3 = (t1 - t2) * (h % 60) / 60;
                if (h == 360)
                    h = 0;
                if (h < 60) {
                    rgb.r = t1;
                    rgb.b = t2;
                    rgb.g = t2 + t3;
                }
                else if (h < 120) {
                    rgb.g = t1;
                    rgb.b = t2;
                    rgb.r = t1 - t3;
                }
                else if (h < 180) {
                    rgb.g = t1;
                    rgb.r = t2;
                    rgb.b = t2 + t3;
                }
                else if (h < 240) {
                    rgb.b = t1;
                    rgb.r = t2;
                    rgb.g = t1 - t3;
                }
                else if (h < 300) {
                    rgb.b = t1;
                    rgb.g = t2;
                    rgb.r = t2 + t3;
                }
                else if (h < 360) {
                    rgb.r = t1;
                    rgb.g = t2;
                    rgb.b = t1 - t3;
                }
                else {
                    rgb.r = 0;
                    rgb.g = 0;
                    rgb.b = 0;
                }
            }
            return { r: Math.round(rgb.r), g: Math.round(rgb.g), b: Math.round(rgb.b) };
        };
        ColorPicker.prototype.RGBtoHEX = function (rgb) {
            var hex = [
                rgb.r.toString(16),
                rgb.g.toString(16),
                rgb.b.toString(16)
            ];
            for (var key in hex) {
                if (hex[key].length == 1) {
                    hex[key] = '0' + hex[key];
                }
            }
            return hex.join('');
        };
        ColorPicker.prototype.HSBtoHEX = function (hsb) {
            return this.RGBtoHEX(this.HSBtoRGB(hsb));
        };
        ColorPicker.prototype.onOverlayHide = function () {
            this.unbindScrollListener();
            this.unbindDocumentResizeListener();
            this.unbindDocumentClickListener();
            this.overlay = null;
        };
        ColorPicker.prototype.ngOnDestroy = function () {
            if (this.scrollHandler) {
                this.scrollHandler.destroy();
                this.scrollHandler = null;
            }
            this.restoreOverlayAppend();
            this.onOverlayHide();
        };
        return ColorPicker;
    }());
    ColorPicker.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-colorPicker',
                    template: "\n        <div #container [ngStyle]=\"style\" [class]=\"styleClass\" [ngClass]=\"{'p-colorpicker p-component':true,'p-colorpicker-overlay':!inline,'p-colorpicker-dragging':colorDragging||hueDragging}\">\n            <input #input type=\"text\" *ngIf=\"!inline\" class=\"p-colorpicker-preview p-inputtext\" readonly=\"readonly\" [ngClass]=\"{'p-disabled': disabled}\"\n                (focus)=\"onInputFocus()\" (click)=\"onInputClick()\" (keydown)=\"onInputKeydown($event)\" [attr.id]=\"inputId\" [attr.tabindex]=\"tabindex\" [disabled]=\"disabled\"\n                [style.backgroundColor]=\"inputBgColor\">\n            <div *ngIf=\"inline || overlayVisible\" [ngClass]=\"{'p-colorpicker-panel': true, 'p-colorpicker-overlay-panel':!inline, 'p-disabled': disabled}\" (click)=\"onPanelClick()\"\n                [@overlayAnimation]=\"{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}\" [@.disabled]=\"inline === true\" \n                    (@overlayAnimation.start)=\"onOverlayAnimationStart($event)\" (@overlayAnimation.done)=\"onOverlayAnimationEnd($event)\">\n                <div class=\"p-colorpicker-content\">\n                    <div #colorSelector class=\"p-colorpicker-color-selector\" (touchstart)=\"onColorTouchStart($event)\" (touchmove)=\"onMove($event)\" (touchend)=\"onDragEnd()\" (mousedown)=\"onColorMousedown($event)\">\n                        <div class=\"p-colorpicker-color\">\n                            <div #colorHandle class=\"p-colorpicker-color-handle\"></div>\n                        </div>\n                    </div>\n                    <div #hue class=\"p-colorpicker-hue\" (mousedown)=\"onHueMousedown($event)\" (touchstart)=\"onHueTouchStart($event)\" (touchmove)=\"onMove($event)\" (touchend)=\"onDragEnd()\">\n                        <div #hueHandle class=\"p-colorpicker-hue-handle\"></div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    ",
                    animations: [
                        animations.trigger('overlayAnimation', [
                            animations.transition(':enter', [
                                animations.style({ opacity: 0, transform: 'scaleY(0.8)' }),
                                animations.animate('{{showTransitionParams}}')
                            ]),
                            animations.transition(':leave', [
                                animations.animate('{{hideTransitionParams}}', animations.style({ opacity: 0 }))
                            ])
                        ])
                    ],
                    providers: [COLORPICKER_VALUE_ACCESSOR],
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".p-colorpicker{display:inline-block}.p-colorpicker-dragging{cursor:pointer}.p-colorpicker-overlay{position:relative}.p-colorpicker-panel{height:166px;position:relative;width:193px}.p-colorpicker-overlay-panel{position:absolute}.p-colorpicker-preview{cursor:pointer}.p-colorpicker-panel .p-colorpicker-content{position:relative}.p-colorpicker-panel .p-colorpicker-color-selector{height:150px;left:8px;position:absolute;top:8px;width:150px}.p-colorpicker-panel .p-colorpicker-color{height:150px;width:150px}.p-colorpicker-panel .p-colorpicker-color-handle{border-radius:100%;border-style:solid;border-width:1px;cursor:pointer;height:10px;left:150px;margin:-5px 0 0 -5px;opacity:.85;position:absolute;top:0;width:10px}.p-colorpicker-panel .p-colorpicker-hue{height:150px;left:167px;opacity:.85;position:absolute;top:8px;width:17px}.p-colorpicker-panel .p-colorpicker-hue-handle{border-style:solid;border-width:2px;cursor:pointer;height:10px;left:0;margin-left:-2px;margin-top:-5px;opacity:.85;position:absolute;top:150px;width:21px}"]
                },] }
    ];
    ColorPicker.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.Renderer2 },
        { type: core.ChangeDetectorRef }
    ]; };
    ColorPicker.propDecorators = {
        style: [{ type: core.Input }],
        styleClass: [{ type: core.Input }],
        inline: [{ type: core.Input }],
        format: [{ type: core.Input }],
        appendTo: [{ type: core.Input }],
        disabled: [{ type: core.Input }],
        tabindex: [{ type: core.Input }],
        inputId: [{ type: core.Input }],
        autoZIndex: [{ type: core.Input }],
        baseZIndex: [{ type: core.Input }],
        showTransitionOptions: [{ type: core.Input }],
        hideTransitionOptions: [{ type: core.Input }],
        onChange: [{ type: core.Output }],
        onShow: [{ type: core.Output }],
        onHide: [{ type: core.Output }],
        containerViewChild: [{ type: core.ViewChild, args: ['container',] }],
        inputViewChild: [{ type: core.ViewChild, args: ['input',] }],
        colorSelector: [{ type: core.ViewChild, args: ['colorSelector',] }],
        colorHandle: [{ type: core.ViewChild, args: ['colorHandle',] }],
        hue: [{ type: core.ViewChild, args: ['hue',] }],
        hueHandle: [{ type: core.ViewChild, args: ['hueHandle',] }]
    };
    var ColorPickerModule = /** @class */ (function () {
        function ColorPickerModule() {
        }
        return ColorPickerModule;
    }());
    ColorPickerModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule],
                    exports: [ColorPicker],
                    declarations: [ColorPicker]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.COLORPICKER_VALUE_ACCESSOR = COLORPICKER_VALUE_ACCESSOR;
    exports.ColorPicker = ColorPicker;
    exports.ColorPickerModule = ColorPickerModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-colorpicker.umd.js.map
