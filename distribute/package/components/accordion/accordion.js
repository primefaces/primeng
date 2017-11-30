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
var animations_1 = require("@angular/animations");
var common_1 = require("@angular/common");
var shared_1 = require("../common/shared");
var Accordion = (function () {
    function Accordion(el) {
        this.el = el;
        this.onClose = new core_1.EventEmitter();
        this.onOpen = new core_1.EventEmitter();
        this.tabs = [];
    }
    Accordion.prototype.addTab = function (tab) {
        this.tabs.push(tab);
    };
    Accordion.prototype.getBlockableElement = function () {
        return this.el.nativeElement.children[0];
    };
    Object.defineProperty(Accordion.prototype, "activeIndex", {
        get: function () {
            return this._activeIndex;
        },
        set: function (val) {
            this._activeIndex = val;
            if (this.tabs && this.tabs.length && this._activeIndex != null) {
                for (var i = 0; i < this.tabs.length; i++) {
                    var selected = this.multiple ? this._activeIndex.includes(i) : (i === this._activeIndex);
                    var changed = selected !== this.tabs[i].selected;
                    if (changed) {
                        this.tabs[i].animating = true;
                    }
                    this.tabs[i].selected = selected;
                    this.tabs[i].selectedChange.emit(selected);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    return Accordion;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], Accordion.prototype, "multiple", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], Accordion.prototype, "onClose", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], Accordion.prototype, "onOpen", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], Accordion.prototype, "style", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], Accordion.prototype, "styleClass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], Accordion.prototype, "lazy", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], Accordion.prototype, "activeIndex", null);
Accordion = __decorate([
    core_1.Component({
        selector: 'p-accordion',
        template: "\n        <div [ngClass]=\"'ui-accordion ui-widget ui-helper-reset'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <ng-content></ng-content>\n        </div>\n    ",
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], Accordion);
exports.Accordion = Accordion;
var AccordionTab = (function () {
    function AccordionTab(accordion) {
        this.accordion = accordion;
        this.selectedChange = new core_1.EventEmitter();
        this.accordion.addTab(this);
    }
    AccordionTab.prototype.toggle = function (event) {
        if (this.disabled || this.animating) {
            return false;
        }
        this.animating = true;
        var index = this.findTabIndex();
        if (this.selected) {
            this.selected = false;
            this.accordion.onClose.emit({ originalEvent: event, index: index });
        }
        else {
            if (!this.accordion.multiple) {
                for (var i = 0; i < this.accordion.tabs.length; i++) {
                    this.accordion.tabs[i].selected = false;
                    this.accordion.tabs[i].selectedChange.emit(false);
                }
            }
            this.selected = true;
            this.accordion.onOpen.emit({ originalEvent: event, index: index });
        }
        this.selectedChange.emit(this.selected);
        event.preventDefault();
    };
    AccordionTab.prototype.findTabIndex = function () {
        var index = -1;
        for (var i = 0; i < this.accordion.tabs.length; i++) {
            if (this.accordion.tabs[i] == this) {
                index = i;
                break;
            }
        }
        return index;
    };
    Object.defineProperty(AccordionTab.prototype, "lazy", {
        get: function () {
            return this.accordion.lazy;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccordionTab.prototype, "hasHeaderFacet", {
        get: function () {
            return this.headerFacet && this.headerFacet.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    AccordionTab.prototype.onToggleDone = function (event) {
        this.animating = false;
    };
    AccordionTab.prototype.ngOnDestroy = function () {
        this.accordion.tabs.splice(this.findTabIndex(), 1);
    };
    return AccordionTab;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], AccordionTab.prototype, "header", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], AccordionTab.prototype, "selected", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], AccordionTab.prototype, "disabled", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], AccordionTab.prototype, "selectedChange", void 0);
__decorate([
    core_1.ContentChildren(shared_1.Header),
    __metadata("design:type", core_1.QueryList)
], AccordionTab.prototype, "headerFacet", void 0);
AccordionTab = __decorate([
    core_1.Component({
        selector: 'p-accordionTab',
        template: "\n        <div class=\"ui-accordion-header ui-state-default ui-corner-all\" [ngClass]=\"{'ui-state-active': selected,'ui-state-disabled':disabled}\"\n            (click)=\"toggle($event)\">\n            <span class=\"fa fa-fw\" [ngClass]=\"{'fa-caret-down': selected, 'fa-caret-right': !selected}\"></span>\n            <a href=\"#\" *ngIf=\"!hasHeaderFacet\" role=\"tab\" [attr.aria-expanded]=\"selected\" [attr.aria-selected]=\"selected\">{{header}}</a>\n            <a href=\"#\" *ngIf=\"hasHeaderFacet\" role=\"tab\" [attr.aria-expanded]=\"selected\" [attr.aria-selected]=\"selected\">\n                <ng-content select=\"p-header\"></ng-content>\n            </a>\n        </div>\n        <div class=\"ui-accordion-content-wrapper\" [@tabContent]=\"selected ? 'visible' : 'hidden'\" (@tabContent.done)=\"onToggleDone($event)\"\n            [ngClass]=\"{'ui-accordion-content-wrapper-overflown': !selected||animating}\" role=\"tabpanel\" [attr.aria-hidden]=\"!selected\">\n            <div class=\"ui-accordion-content ui-widget-content\" *ngIf=\"lazy ? selected : true\">\n                <ng-content></ng-content>\n            </div>\n        </div>\n    ",
        animations: [
            animations_1.trigger('tabContent', [
                animations_1.state('hidden', animations_1.style({
                    height: '0'
                })),
                animations_1.state('visible', animations_1.style({
                    height: '*'
                })),
                animations_1.transition('visible <=> hidden', animations_1.animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
            ])
        ]
    }),
    __metadata("design:paramtypes", [Accordion])
], AccordionTab);
exports.AccordionTab = AccordionTab;
var AccordionModule = (function () {
    function AccordionModule() {
    }
    return AccordionModule;
}());
AccordionModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        exports: [Accordion, AccordionTab],
        declarations: [Accordion, AccordionTab]
    })
], AccordionModule);
exports.AccordionModule = AccordionModule;
//# sourceMappingURL=accordion.js.map