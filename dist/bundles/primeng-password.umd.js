(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/animations'), require('@angular/forms'), require('primeng/dom'), require('primeng/api'), require('primeng/inputtext')) :
    typeof define === 'function' && define.amd ? define('primeng/password', ['exports', '@angular/core', '@angular/common', '@angular/animations', '@angular/forms', 'primeng/dom', 'primeng/api', 'primeng/inputtext'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.password = {}), global.ng.core, global.ng.common, global.ng.animations, global.ng.forms, global.primeng.dom, global.primeng.api, global.primeng.inputtext));
}(this, (function (exports, core, common, animations, forms, dom, api, inputtext) { 'use strict';

    var PasswordDirective = /** @class */ (function () {
        function PasswordDirective(el, zone) {
            this.el = el;
            this.zone = zone;
            this.promptLabel = 'Enter a password';
            this.weakLabel = 'Weak';
            this.mediumLabel = 'Medium';
            this.strongLabel = 'Strong';
            this.feedback = true;
        }
        Object.defineProperty(PasswordDirective.prototype, "showPassword", {
            set: function (show) {
                this.el.nativeElement.type = show ? 'text' : 'password';
            },
            enumerable: false,
            configurable: true
        });
        PasswordDirective.prototype.ngDoCheck = function () {
            this.updateFilledState();
        };
        PasswordDirective.prototype.onInput = function (e) {
            this.updateFilledState();
        };
        PasswordDirective.prototype.updateFilledState = function () {
            this.filled = this.el.nativeElement.value && this.el.nativeElement.value.length;
        };
        PasswordDirective.prototype.createPanel = function () {
            this.panel = document.createElement('div');
            this.panel.className = 'p-password-panel p-component p-password-panel-overlay p-connected-overlay';
            this.meter = document.createElement('div');
            this.meter.className = 'p-password-meter';
            this.info = document.createElement('div');
            this.info.className = 'p-password-info';
            this.info.textContent = this.promptLabel;
            this.panel.appendChild(this.meter);
            this.panel.appendChild(this.info);
            this.panel.style.minWidth = dom.DomHandler.getOuterWidth(this.el.nativeElement) + 'px';
            document.body.appendChild(this.panel);
        };
        PasswordDirective.prototype.showOverlay = function () {
            var _this = this;
            if (this.feedback) {
                if (!this.panel) {
                    this.createPanel();
                }
                this.panel.style.zIndex = String(++dom.DomHandler.zindex);
                this.panel.style.display = 'block';
                this.zone.runOutsideAngular(function () {
                    setTimeout(function () {
                        dom.DomHandler.addClass(_this.panel, 'p-connected-overlay-visible');
                        _this.bindScrollListener();
                        _this.bindDocumentResizeListener();
                    }, 1);
                });
                dom.DomHandler.absolutePosition(this.panel, this.el.nativeElement);
            }
        };
        PasswordDirective.prototype.hideOverlay = function () {
            var _this = this;
            if (this.feedback && this.panel) {
                dom.DomHandler.addClass(this.panel, 'p-connected-overlay-hidden');
                dom.DomHandler.removeClass(this.panel, 'p-connected-overlay-visible');
                this.unbindScrollListener();
                this.unbindDocumentResizeListener();
                this.zone.runOutsideAngular(function () {
                    setTimeout(function () {
                        _this.ngOnDestroy();
                    }, 150);
                });
            }
        };
        PasswordDirective.prototype.onFocus = function () {
            this.showOverlay();
        };
        PasswordDirective.prototype.onBlur = function () {
            this.hideOverlay();
        };
        PasswordDirective.prototype.onKeyup = function (e) {
            if (this.feedback) {
                var value = e.target.value, label = null, meterPos = null;
                if (value.length === 0) {
                    label = this.promptLabel;
                    meterPos = '0px 0px';
                }
                else {
                    var score = this.testStrength(value);
                    if (score < 30) {
                        label = this.weakLabel;
                        meterPos = '0px -10px';
                    }
                    else if (score >= 30 && score < 80) {
                        label = this.mediumLabel;
                        meterPos = '0px -20px';
                    }
                    else if (score >= 80) {
                        label = this.strongLabel;
                        meterPos = '0px -30px';
                    }
                }
                if (!this.panel || !dom.DomHandler.hasClass(this.panel, 'p-connected-overlay-visible')) {
                    this.showOverlay();
                }
                this.meter.style.backgroundPosition = meterPos;
                this.info.textContent = label;
            }
        };
        PasswordDirective.prototype.testStrength = function (str) {
            var grade = 0;
            var val;
            val = str.match('[0-9]');
            grade += this.normalize(val ? val.length : 1 / 4, 1) * 25;
            val = str.match('[a-zA-Z]');
            grade += this.normalize(val ? val.length : 1 / 2, 3) * 10;
            val = str.match('[!@#$%^&*?_~.,;=]');
            grade += this.normalize(val ? val.length : 1 / 6, 1) * 35;
            val = str.match('[A-Z]');
            grade += this.normalize(val ? val.length : 1 / 6, 1) * 30;
            grade *= str.length / 8;
            return grade > 100 ? 100 : grade;
        };
        PasswordDirective.prototype.normalize = function (x, y) {
            var diff = x - y;
            if (diff <= 0)
                return x / y;
            else
                return 1 + 0.5 * (x / (x + y / 4));
        };
        Object.defineProperty(PasswordDirective.prototype, "disabled", {
            get: function () {
                return this.el.nativeElement.disabled;
            },
            enumerable: false,
            configurable: true
        });
        PasswordDirective.prototype.bindScrollListener = function () {
            var _this = this;
            if (!this.scrollHandler) {
                this.scrollHandler = new dom.ConnectedOverlayScrollHandler(this.el.nativeElement, function () {
                    if (dom.DomHandler.hasClass(_this.panel, 'p-connected-overlay-visible')) {
                        _this.hideOverlay();
                    }
                });
            }
            this.scrollHandler.bindScrollListener();
        };
        PasswordDirective.prototype.unbindScrollListener = function () {
            if (this.scrollHandler) {
                this.scrollHandler.unbindScrollListener();
            }
        };
        PasswordDirective.prototype.bindDocumentResizeListener = function () {
            this.documentResizeListener = this.onWindowResize.bind(this);
            window.addEventListener('resize', this.documentResizeListener);
        };
        PasswordDirective.prototype.unbindDocumentResizeListener = function () {
            if (this.documentResizeListener) {
                window.removeEventListener('resize', this.documentResizeListener);
                this.documentResizeListener = null;
            }
        };
        PasswordDirective.prototype.onWindowResize = function () {
            this.hideOverlay();
        };
        PasswordDirective.prototype.ngOnDestroy = function () {
            if (this.panel) {
                if (this.scrollHandler) {
                    this.scrollHandler.destroy();
                    this.scrollHandler = null;
                }
                this.unbindDocumentResizeListener();
                document.body.removeChild(this.panel);
                this.panel = null;
                this.meter = null;
                this.info = null;
            }
        };
        return PasswordDirective;
    }());
    PasswordDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[pPassword]',
                    host: {
                        '[class.p-inputtext]': 'true',
                        '[class.p-component]': 'true',
                        '[class.p-filled]': 'filled'
                    }
                },] }
    ];
    PasswordDirective.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.NgZone }
    ]; };
    PasswordDirective.propDecorators = {
        promptLabel: [{ type: core.Input }],
        weakLabel: [{ type: core.Input }],
        mediumLabel: [{ type: core.Input }],
        strongLabel: [{ type: core.Input }],
        feedback: [{ type: core.Input }],
        showPassword: [{ type: core.Input }],
        onInput: [{ type: core.HostListener, args: ['input', ['$event'],] }],
        onFocus: [{ type: core.HostListener, args: ['focus',] }],
        onBlur: [{ type: core.HostListener, args: ['blur',] }],
        onKeyup: [{ type: core.HostListener, args: ['keyup', ['$event'],] }]
    };
    var Password_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return Password; }),
        multi: true
    };
    var Password = /** @class */ (function () {
        function Password(cd, config) {
            this.cd = cd;
            this.config = config;
            this.mediumRegex = '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})';
            this.strongRegex = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})';
            this.feedback = true;
            this.showTransitionOptions = '.12s cubic-bezier(0, 0, 0.2, 1)';
            this.hideTransitionOptions = '.1s linear';
            this.overlayVisible = false;
            this.focused = false;
            this.unmasked = false;
            this.value = null;
            this.onModelChange = function () { };
            this.onModelTouched = function () { };
        }
        Password.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'content':
                        _this.contentTemplate = item.template;
                        break;
                    case 'header':
                        _this.headerTemplate = item.template;
                        break;
                    case 'footer':
                        _this.footerTemplate = item.template;
                        break;
                    default:
                        _this.contentTemplate = item.template;
                        break;
                }
            });
        };
        Password.prototype.ngOnInit = function () {
            this.infoText = this.promptText();
            this.mediumCheckRegExp = new RegExp(this.mediumRegex);
            this.strongCheckRegExp = new RegExp(this.strongRegex);
        };
        Password.prototype.onAnimationStart = function (event) {
            switch (event.toState) {
                case 'visible':
                    this.overlay = event.element;
                    this.overlay.style.zIndex = String(dom.DomHandler.generateZIndex());
                    this.appendContainer();
                    this.alignOverlay();
                    this.bindScrollListener();
                    this.bindResizeListener();
                    break;
                case 'void':
                    this.unbindScrollListener();
                    this.unbindResizeListener();
                    this.overlay = null;
                    break;
            }
        };
        Password.prototype.appendContainer = function () {
            if (this.appendTo) {
                if (this.appendTo === 'body')
                    document.body.appendChild(this.overlay);
                else
                    document.getElementById(this.appendTo).appendChild(this.overlay);
            }
        };
        Password.prototype.alignOverlay = function () {
            if (this.appendTo) {
                this.overlay.style.minWidth = dom.DomHandler.getOuterWidth(this.input.nativeElement) + 'px';
                dom.DomHandler.absolutePosition(this.overlay, this.input.nativeElement);
            }
            else {
                dom.DomHandler.relativePosition(this.overlay, this.input.nativeElement);
            }
        };
        Password.prototype.onInput = function (event) {
            this.value = event.target.value;
            this.onModelChange(this.value);
            this.onModelTouched();
        };
        Password.prototype.onFocus = function () {
            this.focused = true;
            if (this.feedback) {
                this.overlayVisible = true;
            }
        };
        Password.prototype.onBlur = function () {
            this.focused = false;
            if (this.feedback) {
                this.overlayVisible = false;
            }
        };
        Password.prototype.onKeyUp = function (event) {
            if (this.feedback) {
                var value = event.target.value;
                this.updateUI(value);
                if (!this.overlayVisible) {
                    this.overlayVisible = true;
                }
            }
        };
        Password.prototype.updateUI = function (value) {
            var label = null;
            var meter = null;
            switch (this.testStrength(value)) {
                case 1:
                    label = this.weakText();
                    meter = {
                        strength: 'weak',
                        width: '33.33%'
                    };
                    break;
                case 2:
                    label = this.mediumText();
                    meter = {
                        strength: 'medium',
                        width: '66.66%'
                    };
                    break;
                case 3:
                    label = this.strongText();
                    meter = {
                        strength: 'strong',
                        width: '100%'
                    };
                    break;
                default:
                    label = this.promptText();
                    meter = null;
                    break;
            }
            this.meter = meter;
            this.infoText = label;
        };
        Password.prototype.onMaskToggle = function () {
            this.unmasked = !this.unmasked;
        };
        Password.prototype.testStrength = function (str) {
            var level = 0;
            if (this.strongCheckRegExp.test(str))
                level = 3;
            else if (this.mediumCheckRegExp.test(str))
                level = 2;
            else if (str.length)
                level = 1;
            return level;
        };
        Password.prototype.writeValue = function (value) {
            if (value === undefined)
                this.value = null;
            else
                this.value = value;
            if (this.feedback)
                this.updateUI(this.value || "");
            this.cd.markForCheck();
        };
        Password.prototype.registerOnChange = function (fn) {
            this.onModelChange = fn;
        };
        Password.prototype.registerOnTouched = function (fn) {
            this.onModelTouched = fn;
        };
        Password.prototype.setDisabledState = function (val) {
            this.disabled = val;
        };
        Password.prototype.bindScrollListener = function () {
            var _this = this;
            if (!this.scrollHandler) {
                this.scrollHandler = new dom.ConnectedOverlayScrollHandler(this.input.nativeElement, function () {
                    if (_this.overlayVisible) {
                        _this.overlayVisible = false;
                    }
                });
            }
            this.scrollHandler.bindScrollListener();
        };
        Password.prototype.bindResizeListener = function () {
            var _this = this;
            if (!this.resizeListener) {
                this.resizeListener = function () {
                    if (_this.overlayVisible) {
                        _this.overlayVisible = false;
                    }
                };
                window.addEventListener('resize', this.resizeListener);
            }
        };
        Password.prototype.unbindScrollListener = function () {
            if (this.scrollHandler) {
                this.scrollHandler.unbindScrollListener();
            }
        };
        Password.prototype.unbindResizeListener = function () {
            if (this.resizeListener) {
                window.removeEventListener('resize', this.resizeListener);
                this.resizeListener = null;
            }
        };
        Password.prototype.unbindOutsideClickListener = function () {
            if (this.outsideClickListener) {
                document.removeEventListener('click', this.outsideClickListener);
                this.outsideClickListener = null;
            }
        };
        Password.prototype.containerClass = function () {
            return { 'p-password p-component p-inputwrapper': true,
                'p-input-icon-right': this.toggleMask
            };
        };
        Password.prototype.inputFieldClass = function () {
            return { 'p-password-input': true,
                'p-disabled': this.disabled
            };
        };
        Password.prototype.toggleIconClass = function () {
            return this.unmasked ? 'pi pi-eye-slash' : 'pi pi-eye';
        };
        Password.prototype.strengthClass = function () {
            return "p-password-strength " + (this.meter ? this.meter.strength : '');
        };
        Password.prototype.filled = function () {
            return (this.value != null && this.value.toString().length > 0);
        };
        Password.prototype.promptText = function () {
            return this.promptLabel || this.getTranslation(api.TranslationKeys.PASSWORD_PROMPT);
        };
        Password.prototype.weakText = function () {
            return this.weakLabel || this.getTranslation(api.TranslationKeys.WEAK);
        };
        Password.prototype.mediumText = function () {
            return this.mediumLabel || this.getTranslation(api.TranslationKeys.MEDIUM);
        };
        Password.prototype.strongText = function () {
            return this.strongLabel || this.getTranslation(api.TranslationKeys.STRONG);
        };
        Password.prototype.restoreAppend = function () {
            if (this.overlay && this.appendTo) {
                if (this.appendTo === 'body')
                    document.body.removeChild(this.overlay);
                else
                    document.getElementById(this.appendTo).removeChild(this.overlay);
            }
        };
        Password.prototype.inputType = function () {
            return this.unmasked ? 'text' : 'password';
        };
        Password.prototype.getTranslation = function (option) {
            return this.config.getTranslation(option);
        };
        Password.prototype.ngOnDestroy = function () {
            this.restoreAppend();
            this.unbindResizeListener();
            if (this.scrollHandler) {
                this.scrollHandler.destroy();
                this.scrollHandler = null;
            }
        };
        return Password;
    }());
    Password.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-password',
                    template: "\n        <div [ngClass]=\"containerClass()\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <input #input [attr.id]=\"inputId\" pInputText [ngClass]=\"inputFieldClass()\" [ngStyle]=\"inputStyle\" [class]=\"inputStyleClass\" [attr.type]=\"inputType()\" [attr.placeholder]=\"placeholder\" [value]=\"value\" (input)=\"onInput($event)\" (focus)=\"onFocus()\" \n                (blur)=\"onBlur()\" (keyup)=\"onKeyUp($event)\" />\n            <i *ngIf=\"toggleMask\" [ngClass]=\"toggleIconClass()\" (click)=\"onMaskToggle()\"></i>\n            <div #overlay *ngIf=\"overlayVisible\" [ngClass]=\"'p-password-panel p-component'\" \n                [@overlayAnimation]=\"{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}\" (@overlayAnimation.start)=\"onAnimationStart($event)\">\n                <ng-container *ngTemplateOutlet=\"headerTemplate\"></ng-container>\n                <ng-container *ngIf=\"contentTemplate; else content\">\n                    <ng-container *ngTemplateOutlet=\"contentTemplate\"></ng-container>\n                </ng-container>\n                <ng-template #content>\n                    <div class=\"p-password-meter\">\n                        <div [ngClass]=\"strengthClass()\" [ngStyle]=\"{'width': meter ? meter.width : ''}\"></div>\n                    </div>\n                    <div className=\"p-password-info\">{{infoText}}</div>\n                </ng-template>\n                <ng-container *ngTemplateOutlet=\"footerTemplate\"></ng-container>\n            </div>\n        </div>\n    ",
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
                    host: {
                        '[class.p-inputwrapper-filled]': 'filled()',
                        '[class.p-inputwrapper-focus]': 'focused'
                    },
                    providers: [Password_VALUE_ACCESSOR],
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".p-password{display:inline-flex;position:relative}.p-password-panel{position:absolute}.p-password .p-password-panel{min-width:100%}.p-password-meter{height:10px}.p-password-strength{height:100%;transition:width 1s ease-in-out;width:0}.p-fluid .p-password{display:flex}"]
                },] }
    ];
    Password.ctorParameters = function () { return [
        { type: core.ChangeDetectorRef },
        { type: api.PrimeNGConfig }
    ]; };
    Password.propDecorators = {
        disabled: [{ type: core.Input }],
        promptLabel: [{ type: core.Input }],
        mediumRegex: [{ type: core.Input }],
        strongRegex: [{ type: core.Input }],
        weakLabel: [{ type: core.Input }],
        mediumLabel: [{ type: core.Input }],
        strongLabel: [{ type: core.Input }],
        inputId: [{ type: core.Input }],
        feedback: [{ type: core.Input }],
        appendTo: [{ type: core.Input }],
        toggleMask: [{ type: core.Input }],
        inputStyleClass: [{ type: core.Input }],
        styleClass: [{ type: core.Input }],
        style: [{ type: core.Input }],
        inputStyle: [{ type: core.Input }],
        showTransitionOptions: [{ type: core.Input }],
        hideTransitionOptions: [{ type: core.Input }],
        placeholder: [{ type: core.Input }],
        input: [{ type: core.ViewChild, args: ['input',] }],
        templates: [{ type: core.ContentChildren, args: [api.PrimeTemplate,] }]
    };
    var PasswordModule = /** @class */ (function () {
        function PasswordModule() {
        }
        return PasswordModule;
    }());
    PasswordModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule, inputtext.InputTextModule],
                    exports: [PasswordDirective, Password],
                    declarations: [PasswordDirective, Password]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Password = Password;
    exports.PasswordDirective = PasswordDirective;
    exports.PasswordModule = PasswordModule;
    exports.Password_VALUE_ACCESSOR = Password_VALUE_ACCESSOR;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-password.umd.js.map
