(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('primeng/captcha', ['exports', '@angular/core', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.captcha = {}), global.ng.core, global.ng.common));
}(this, (function (exports, core, common) { 'use strict';

    var Captcha = /** @class */ (function () {
        function Captcha(el, _zone, cd) {
            this.el = el;
            this._zone = _zone;
            this.cd = cd;
            this.siteKey = null;
            this.theme = 'light';
            this.type = 'image';
            this.size = 'normal';
            this.tabindex = 0;
            this.initCallback = "initRecaptcha";
            this.onResponse = new core.EventEmitter();
            this.onExpire = new core.EventEmitter();
            this._instance = null;
            this._language = null;
        }
        Object.defineProperty(Captcha.prototype, "language", {
            get: function () {
                return this._language;
            },
            set: function (language) {
                this._language = language;
                this.init();
            },
            enumerable: false,
            configurable: true
        });
        Captcha.prototype.ngAfterViewInit = function () {
            var _this = this;
            if (window.grecaptcha) {
                if (!window.grecaptcha.render) {
                    setTimeout(function () {
                        _this.init();
                    }, 100);
                }
                else {
                    this.init();
                }
            }
            else {
                window[this.initCallback] = function () {
                    _this.init();
                };
            }
        };
        Captcha.prototype.init = function () {
            var _this = this;
            this._instance = window.grecaptcha.render(this.el.nativeElement.children[0], {
                'sitekey': this.siteKey,
                'theme': this.theme,
                'type': this.type,
                'size': this.size,
                'tabindex': this.tabindex,
                'hl': this.language,
                'callback': function (response) { _this._zone.run(function () { return _this.recaptchaCallback(response); }); },
                'expired-callback': function () { _this._zone.run(function () { return _this.recaptchaExpiredCallback(); }); }
            });
        };
        Captcha.prototype.reset = function () {
            if (this._instance === null)
                return;
            window.grecaptcha.reset(this._instance);
            this.cd.markForCheck();
        };
        Captcha.prototype.getResponse = function () {
            if (this._instance === null)
                return null;
            return window.grecaptcha.getResponse(this._instance);
        };
        Captcha.prototype.recaptchaCallback = function (response) {
            this.onResponse.emit({
                response: response
            });
        };
        Captcha.prototype.recaptchaExpiredCallback = function () {
            this.onExpire.emit();
        };
        Captcha.prototype.ngOnDestroy = function () {
            if (this._instance != null) {
                window.grecaptcha.reset(this._instance);
            }
        };
        return Captcha;
    }());
    Captcha.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-captcha',
                    template: "<div></div>",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None
                },] }
    ];
    Captcha.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.NgZone },
        { type: core.ChangeDetectorRef }
    ]; };
    Captcha.propDecorators = {
        siteKey: [{ type: core.Input }],
        theme: [{ type: core.Input }],
        type: [{ type: core.Input }],
        size: [{ type: core.Input }],
        tabindex: [{ type: core.Input }],
        initCallback: [{ type: core.Input }],
        onResponse: [{ type: core.Output }],
        onExpire: [{ type: core.Output }],
        language: [{ type: core.Input }]
    };
    var CaptchaModule = /** @class */ (function () {
        function CaptchaModule() {
        }
        return CaptchaModule;
    }());
    CaptchaModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule],
                    exports: [Captcha],
                    declarations: [Captcha]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Captcha = Captcha;
    exports.CaptchaModule = CaptchaModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-captcha.umd.js.map
