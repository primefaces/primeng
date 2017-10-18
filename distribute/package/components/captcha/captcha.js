"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var Captcha = (function () {
    function Captcha(el, _zone) {
        this.el = el;
        this._zone = _zone;
        this.siteKey = null;
        this.theme = 'light';
        this.type = 'image';
        this.size = 'normal';
        this.tabindex = 0;
        this.language = null;
        this.initCallback = "initRecaptcha";
        this.onResponse = new core_1.EventEmitter();
        this.onExpire = new core_1.EventEmitter();
        this._instance = null;
    }
    Captcha.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (window.grecaptcha) {
            this.init();
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
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], Captcha.prototype, "siteKey", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], Captcha.prototype, "theme", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], Captcha.prototype, "type", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], Captcha.prototype, "size", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], Captcha.prototype, "tabindex", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], Captcha.prototype, "language", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], Captcha.prototype, "initCallback", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], Captcha.prototype, "onResponse", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], Captcha.prototype, "onExpire", void 0);
Captcha = __decorate([
    core_1.Component({
        selector: 'p-captcha',
        template: "<div></div>"
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.NgZone])
], Captcha);
exports.Captcha = Captcha;
var CaptchaModule = (function () {
    function CaptchaModule() {
    }
    return CaptchaModule;
}());
CaptchaModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        exports: [Captcha],
        declarations: [Captcha]
    })
], CaptchaModule);
exports.CaptchaModule = CaptchaModule;
//# sourceMappingURL=captcha.js.map