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
var TabViewNav = (function () {
    function TabViewNav() {
        this.orientation = 'top';
        this.onTabClick = new core_1.EventEmitter();
        this.onTabCloseClick = new core_1.EventEmitter();
    }
    TabViewNav.prototype.getDefaultHeaderClass = function (tab) {
        var styleClass = 'ui-state-default ui-corner-' + this.orientation;
        if (tab.headerStyleClass) {
            styleClass = styleClass + " " + tab.headerStyleClass;
        }
        return styleClass;
    };
    TabViewNav.prototype.clickTab = function (event, tab) {
        this.onTabClick.emit({
            originalEvent: event,
            tab: tab
        });
    };
    TabViewNav.prototype.clickClose = function (event, tab) {
        this.onTabCloseClick.emit({
            originalEvent: event,
            tab: tab
        });
    };
    return TabViewNav;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], TabViewNav.prototype, "tabs", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TabViewNav.prototype, "orientation", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], TabViewNav.prototype, "onTabClick", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], TabViewNav.prototype, "onTabCloseClick", void 0);
TabViewNav = __decorate([
    core_1.Component({
        selector: '[p-tabViewNav]',
        host: {
            '[class.ui-tabview-nav]': 'true',
            '[class.ui-helper-reset]': 'true',
            '[class.ui-helper-clearfix]': 'true',
            '[class.ui-widget-header]': 'true',
            '[class.ui-corner-all]': 'true'
        },
        template: "\n        <ng-template ngFor let-tab [ngForOf]=\"tabs\">\n            <li [class]=\"getDefaultHeaderClass(tab)\" [ngStyle]=\"tab.headerStyle\" role=\"tab\"\n                [ngClass]=\"{'ui-tabview-selected ui-state-active': tab.selected, 'ui-state-disabled': tab.disabled}\"\n                (click)=\"clickTab($event,tab)\" *ngIf=\"!tab.closed\"\n                [attr.aria-expanded]=\"tab.selected\" [attr.aria-selected]=\"tab.selected\">\n                <a href=\"#\">\n                    <span class=\"ui-tabview-left-icon fa\" [ngClass]=\"tab.leftIcon\" *ngIf=\"tab.leftIcon\"></span>\n                    <span class=\"ui-tabview-title\">{{tab.header}}</span>\n                    <span class=\"ui-tabview-right-icon fa\" [ngClass]=\"tab.rightIcon\" *ngIf=\"tab.rightIcon\"></span>\n                </a>\n                <span *ngIf=\"tab.closable\" class=\"ui-tabview-close fa fa-close\" (click)=\"clickClose($event,tab)\"></span>\n            </li>\n        </ng-template>\n    ",
    })
], TabViewNav);
exports.TabViewNav = TabViewNav;
var TabPanel = (function () {
    function TabPanel(viewContainer) {
        this.viewContainer = viewContainer;
        this.cache = true;
    }
    TabPanel.prototype.ngAfterContentInit = function () {
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
    Object.defineProperty(TabPanel.prototype, "selected", {
        get: function () {
            return this._selected;
        },
        set: function (val) {
            this._selected = val;
            this.loaded = true;
        },
        enumerable: true,
        configurable: true
    });
    TabPanel.prototype.ngOnDestroy = function () {
        this.view = null;
    };
    return TabPanel;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TabPanel.prototype, "header", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], TabPanel.prototype, "disabled", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], TabPanel.prototype, "closable", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], TabPanel.prototype, "headerStyle", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TabPanel.prototype, "headerStyleClass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TabPanel.prototype, "leftIcon", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TabPanel.prototype, "rightIcon", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], TabPanel.prototype, "cache", void 0);
__decorate([
    core_1.ContentChildren(shared_1.PrimeTemplate),
    __metadata("design:type", core_1.QueryList)
], TabPanel.prototype, "templates", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], TabPanel.prototype, "selected", null);
TabPanel = __decorate([
    core_1.Component({
        selector: 'p-tabPanel',
        template: "\n        <div class=\"ui-tabview-panel ui-widget-content\" [style.display]=\"selected ? 'block' : 'none'\" \n            role=\"tabpanel\" [attr.aria-hidden]=\"!selected\" *ngIf=\"!closed\">\n            <ng-content></ng-content>\n            <p-templateLoader [template]=\"contentTemplate\" *ngIf=\"contentTemplate&&(cache ? loaded : selected)\"></p-templateLoader>\n        </div>\n    "
    }),
    __metadata("design:paramtypes", [core_1.ViewContainerRef])
], TabPanel);
exports.TabPanel = TabPanel;
var TabView = (function () {
    function TabView(el) {
        this.el = el;
        this.orientation = 'top';
        this.onChange = new core_1.EventEmitter();
        this.onClose = new core_1.EventEmitter();
    }
    Object.defineProperty(TabView.prototype, "lazy", {
        get: function () {
            return this._lazy;
        },
        set: function (val) {
            this._lazy = val;
            console.log('Lazy property of TabView is deprecated, use an ngTemplate inside a TabPanel instead for Lazy Loading');
        },
        enumerable: true,
        configurable: true
    });
    TabView.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.initTabs();
        this.tabPanels.changes.subscribe(function (_) {
            _this.initTabs();
        });
    };
    TabView.prototype.initTabs = function () {
        this.tabs = this.tabPanels.toArray();
        var selectedTab = this.findSelectedTab();
        if (!selectedTab && this.tabs.length) {
            if (this.activeIndex != null && this.tabs.length > this.activeIndex)
                this.tabs[this.activeIndex].selected = true;
            else
                this.tabs[0].selected = true;
        }
    };
    TabView.prototype.open = function (event, tab) {
        if (tab.disabled) {
            if (event) {
                event.preventDefault();
            }
            return;
        }
        if (!tab.selected) {
            var selectedTab = this.findSelectedTab();
            if (selectedTab) {
                selectedTab.selected = false;
            }
            tab.selected = true;
            this.onChange.emit({ originalEvent: event, index: this.findTabIndex(tab) });
        }
        if (event) {
            event.preventDefault();
        }
    };
    TabView.prototype.close = function (event, tab) {
        var _this = this;
        if (this.controlClose) {
            this.onClose.emit({
                originalEvent: event,
                index: this.findTabIndex(tab),
                close: function () {
                    _this.closeTab(tab);
                }
            });
        }
        else {
            this.closeTab(tab);
            this.onClose.emit({
                originalEvent: event,
                index: this.findTabIndex(tab)
            });
        }
        event.stopPropagation();
    };
    TabView.prototype.closeTab = function (tab) {
        if (tab.selected) {
            tab.selected = false;
            for (var i = 0; i < this.tabs.length; i++) {
                var tabPanel = this.tabs[i];
                if (!tabPanel.closed && !tab.disabled) {
                    tabPanel.selected = true;
                    break;
                }
            }
        }
        tab.closed = true;
    };
    TabView.prototype.findSelectedTab = function () {
        for (var i = 0; i < this.tabs.length; i++) {
            if (this.tabs[i].selected) {
                return this.tabs[i];
            }
        }
        return null;
    };
    TabView.prototype.findTabIndex = function (tab) {
        var index = -1;
        for (var i = 0; i < this.tabs.length; i++) {
            if (this.tabs[i] == tab) {
                index = i;
                break;
            }
        }
        return index;
    };
    TabView.prototype.getBlockableElement = function () {
        return this.el.nativeElement.children[0];
    };
    Object.defineProperty(TabView.prototype, "activeIndex", {
        get: function () {
            return this._activeIndex;
        },
        set: function (val) {
            this._activeIndex = val;
            if (this.tabs && this.tabs.length && this._activeIndex != null && this.tabs.length > this._activeIndex) {
                this.findSelectedTab().selected = false;
                this.tabs[this._activeIndex].selected = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    return TabView;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TabView.prototype, "orientation", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], TabView.prototype, "style", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TabView.prototype, "styleClass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], TabView.prototype, "controlClose", void 0);
__decorate([
    core_1.ContentChildren(TabPanel),
    __metadata("design:type", core_1.QueryList)
], TabView.prototype, "tabPanels", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], TabView.prototype, "onChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], TabView.prototype, "onClose", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], TabView.prototype, "lazy", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], TabView.prototype, "activeIndex", null);
TabView = __decorate([
    core_1.Component({
        selector: 'p-tabView',
        template: "\n        <div [ngClass]=\"'ui-tabview ui-widget ui-widget-content ui-corner-all ui-tabview-' + orientation\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <ul p-tabViewNav role=\"tablist\" *ngIf=\"orientation!='bottom'\" [tabs]=\"tabs\" [orientation]=\"orientation\" \n                (onTabClick)=\"open($event.originalEvent, $event.tab)\" (onTabCloseClick)=\"close($event.originalEvent, $event.tab)\"></ul>\n            <div class=\"ui-tabview-panels\">\n                <ng-content></ng-content>\n            </div>\n            <ul p-tabViewNav role=\"tablist\" *ngIf=\"orientation=='bottom'\" [tabs]=\"tabs\" [orientation]=\"orientation\"\n                (onTabClick)=\"open($event.originalEvent, $event.tab)\" (onTabCloseClick)=\"close($event.originalEvent, $event.tab)\"></ul>\n        </div>\n    ",
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], TabView);
exports.TabView = TabView;
var TabViewModule = (function () {
    function TabViewModule() {
    }
    return TabViewModule;
}());
TabViewModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, shared_1.SharedModule],
        exports: [TabView, TabPanel, TabViewNav, shared_1.SharedModule],
        declarations: [TabView, TabPanel, TabViewNav]
    })
], TabViewModule);
exports.TabViewModule = TabViewModule;
//# sourceMappingURL=tabview.js.map