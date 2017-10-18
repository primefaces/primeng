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
var shared_1 = require("../common/shared");
var domhandler_1 = require("../dom/domhandler");
var DataScroller = (function () {
    function DataScroller(el, renderer, domHandler) {
        this.el = el;
        this.renderer = renderer;
        this.domHandler = domHandler;
        this.onLazyLoad = new core_1.EventEmitter();
        this.buffer = 0.9;
        this.dataToRender = [];
        this.first = 0;
    }
    DataScroller.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.lazy) {
            this.load();
        }
        if (this.loader) {
            this.scrollFunction = this.renderer.listen(this.loader, 'click', function () {
                _this.load();
            });
        }
        else {
            this.bindScrollListener();
        }
    };
    DataScroller.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'item':
                    _this.itemTemplate = item.template;
                    break;
                default:
                    _this.itemTemplate = item.template;
                    break;
            }
        });
    };
    Object.defineProperty(DataScroller.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (val) {
            this._value = val;
            this.handleDataChange();
        },
        enumerable: true,
        configurable: true
    });
    DataScroller.prototype.handleDataChange = function () {
        if (this.lazy)
            this.dataToRender = this.value;
        else
            this.load();
    };
    DataScroller.prototype.load = function () {
        if (this.lazy) {
            this.onLazyLoad.emit({
                first: this.first,
                rows: this.rows
            });
            this.first = this.first + this.rows;
        }
        else {
            if (this.value) {
                for (var i = this.first; i < (this.first + this.rows); i++) {
                    if (i >= this.value.length) {
                        break;
                    }
                    this.dataToRender.push(this.value[i]);
                }
                this.first = this.first + this.rows;
            }
        }
    };
    DataScroller.prototype.reset = function () {
        this.first = 0;
        this.dataToRender = [];
        this.load();
    };
    DataScroller.prototype.isEmpty = function () {
        return !this.dataToRender || (this.dataToRender.length == 0);
    };
    DataScroller.prototype.createLazyLoadMetadata = function () {
        return {
            first: this.first,
            rows: this.rows
        };
    };
    DataScroller.prototype.bindScrollListener = function () {
        var _this = this;
        if (this.inline) {
            this.contentElement = this.contentViewChild.nativeElement;
            this.scrollFunction = this.renderer.listen(this.contentElement, 'scroll', function () {
                var scrollTop = _this.contentElement.scrollTop;
                var scrollHeight = _this.contentElement.scrollHeight;
                var viewportHeight = _this.contentElement.clientHeight;
                if ((scrollTop >= ((scrollHeight * _this.buffer) - (viewportHeight)))) {
                    _this.load();
                }
            });
        }
        else {
            this.scrollFunction = this.renderer.listen('window', 'scroll', function () {
                var docBody = document.body;
                var docElement = document.documentElement;
                var scrollTop = (window.pageYOffset || document.documentElement.scrollTop);
                var winHeight = docElement.clientHeight;
                var docHeight = Math.max(docBody.scrollHeight, docBody.offsetHeight, winHeight, docElement.scrollHeight, docElement.offsetHeight);
                if (scrollTop >= ((docHeight * _this.buffer) - winHeight)) {
                    _this.load();
                }
            });
        }
    };
    DataScroller.prototype.ngOnDestroy = function () {
        //unbind
        if (this.scrollFunction) {
            this.scrollFunction();
            this.contentElement = null;
        }
    };
    return DataScroller;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], DataScroller.prototype, "rows", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DataScroller.prototype, "lazy", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DataScroller.prototype, "onLazyLoad", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DataScroller.prototype, "style", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DataScroller.prototype, "styleClass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], DataScroller.prototype, "buffer", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DataScroller.prototype, "inline", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DataScroller.prototype, "scrollHeight", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DataScroller.prototype, "loader", void 0);
__decorate([
    core_1.ViewChild('content'),
    __metadata("design:type", core_1.ElementRef)
], DataScroller.prototype, "contentViewChild", void 0);
__decorate([
    core_1.ContentChild(shared_1.Header),
    __metadata("design:type", Object)
], DataScroller.prototype, "header", void 0);
__decorate([
    core_1.ContentChild(shared_1.Footer),
    __metadata("design:type", Object)
], DataScroller.prototype, "footer", void 0);
__decorate([
    core_1.ContentChildren(shared_1.PrimeTemplate),
    __metadata("design:type", core_1.QueryList)
], DataScroller.prototype, "templates", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], DataScroller.prototype, "value", null);
DataScroller = __decorate([
    core_1.Component({
        selector: 'p-dataScroller',
        template: "\n    <div [ngClass]=\"{'ui-datascroller ui-widget': true, 'ui-datascroller-inline': inline}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n        <div class=\"ui-datascroller-header ui-widget-header ui-corner-top\" *ngIf=\"header\">\n            <ng-content select=\"p-header\"></ng-content>\n        </div>\n        <div #content class=\"ui-datascroller-content ui-widget-content\" [ngStyle]=\"{'max-height': scrollHeight}\">\n            <ul class=\"ui-datascroller-list\">\n                <li *ngFor=\"let item of dataToRender\">\n                    <ng-template [pTemplateWrapper]=\"itemTemplate\" [item]=\"item\"></ng-template>\n                </li>\n            </ul>\n        </div>\n        <div class=\"ui-datascroller-footer ui-widget-header ui-corner-bottom\" *ngIf=\"footer\">\n            <ng-content select=\"p-footer\"></ng-content>\n        </div>\n    </div>\n    ",
        providers: [domhandler_1.DomHandler]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer2, domhandler_1.DomHandler])
], DataScroller);
exports.DataScroller = DataScroller;
var DataScrollerModule = (function () {
    function DataScrollerModule() {
    }
    return DataScrollerModule;
}());
DataScrollerModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, shared_1.SharedModule],
        exports: [DataScroller, shared_1.SharedModule],
        declarations: [DataScroller]
    })
], DataScrollerModule);
exports.DataScrollerModule = DataScrollerModule;
//# sourceMappingURL=datascroller.js.map