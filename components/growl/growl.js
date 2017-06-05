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
var domhandler_1 = require("../dom/domhandler");
var Growl = (function () {
    function Growl(el, domHandler) {
        this.el = el;
        this.domHandler = domHandler;
        this.life = 3000;
        this.onClose = new core_1.EventEmitter();
        this.valueChange = new core_1.EventEmitter();
        this.zIndex = domhandler_1.DomHandler.zindex;
    }
    Growl.prototype.ngAfterViewInit = function () {
        this.container = this.containerViewChild.nativeElement;
    };
    Object.defineProperty(Growl.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (val) {
            this._value = val;
            if (this.container) {
                this.handleValueChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    Growl.prototype.handleValueChange = function () {
        var _this = this;
        if (this.preventRerender) {
            this.preventRerender = false;
            return;
        }
        this.zIndex = ++domhandler_1.DomHandler.zindex;
        this.domHandler.fadeIn(this.container, 250);
        if (!this.sticky) {
            if (this.timeout) {
                clearTimeout(this.timeout);
            }
            this.timeout = setTimeout(function () {
                _this.removeAll();
            }, this.life);
        }
    };
    Growl.prototype.remove = function (index, msgel) {
        var _this = this;
        this.domHandler.fadeOut(msgel, 250);
        setTimeout(function () {
            _this.preventRerender = true;
            _this.onClose.emit({ message: _this.value[index] });
            _this._value = _this.value.filter(function (val, i) { return i != index; });
            _this.valueChange.emit(_this._value);
        }, 250);
    };
    Growl.prototype.removeAll = function () {
        var _this = this;
        if (this.value && this.value.length) {
            this.domHandler.fadeOut(this.container, 250);
            setTimeout(function () {
                _this.value.forEach(function (msg, index) { return _this.onClose.emit({ message: _this.value[index] }); });
                _this.value = [];
                _this.valueChange.emit(_this.value);
            }, 250);
        }
    };
    Growl.prototype.ngOnDestroy = function () {
        if (!this.sticky) {
            clearTimeout(this.timeout);
        }
    };
    return Growl;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], Growl.prototype, "sticky", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], Growl.prototype, "life", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], Growl.prototype, "style", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], Growl.prototype, "styleClass", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], Growl.prototype, "onClose", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], Growl.prototype, "valueChange", void 0);
__decorate([
    core_1.ViewChild('container'),
    __metadata("design:type", core_1.ElementRef)
], Growl.prototype, "containerViewChild", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], Growl.prototype, "value", null);
Growl = __decorate([
    core_1.Component({
        selector: 'p-growl',
        template: "\n        <div #container [ngClass]=\"'ui-growl ui-widget'\" [style.zIndex]=\"zIndex\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div #msgel *ngFor=\"let msg of value;let i = index\" class=\"ui-growl-item-container ui-state-highlight ui-corner-all ui-shadow\" aria-live=\"polite\"\n                [ngClass]=\"{'ui-growl-message-info':msg.severity == 'info','ui-growl-message-warn':msg.severity == 'warn',\n                    'ui-growl-message-error':msg.severity == 'error','ui-growl-message-success':msg.severity == 'success'}\">\n                <div class=\"ui-growl-item\">\n                     <div class=\"ui-growl-icon-close fa fa-close\" (click)=\"remove(i,msgel)\"></div>\n                     <span class=\"ui-growl-image fa fa-2x\"\n                        [ngClass]=\"{'fa-info-circle':msg.severity == 'info','fa-exclamation-circle':msg.severity == 'warn',\n                                'fa-close':msg.severity == 'error','fa-check':msg.severity == 'success'}\"></span>\n                     <div class=\"ui-growl-message\">\n                        <span class=\"ui-growl-title\">{{msg.summary}}</span>\n                        <p [innerHTML]=\"msg.detail\"></p>\n                     </div>\n                     <div style=\"clear: both;\"></div>\n                </div>\n            </div>\n        </div>\n    ",
        providers: [domhandler_1.DomHandler]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, domhandler_1.DomHandler])
], Growl);
exports.Growl = Growl;
var GrowlModule = (function () {
    function GrowlModule() {
    }
    return GrowlModule;
}());
GrowlModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        exports: [Growl],
        declarations: [Growl]
    })
], GrowlModule);
exports.GrowlModule = GrowlModule;
