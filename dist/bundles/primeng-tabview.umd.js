(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/tooltip'), require('primeng/ripple'), require('primeng/api'), require('primeng/dom')) :
    typeof define === 'function' && define.amd ? define('primeng/tabview', ['exports', '@angular/core', '@angular/common', 'primeng/tooltip', 'primeng/ripple', 'primeng/api', 'primeng/dom'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.tabview = {}), global.ng.core, global.ng.common, global.primeng.tooltip, global.primeng.ripple, global.primeng.api, global.primeng.dom));
}(this, (function (exports, core, common, tooltip, ripple, api, dom) { 'use strict';

    var idx = 0;
    var TabPanel = /** @class */ (function () {
        function TabPanel(tabView, viewContainer, cd) {
            this.viewContainer = viewContainer;
            this.cd = cd;
            this.cache = true;
            this.tooltipPosition = 'top';
            this.tooltipPositionStyle = 'absolute';
            this.id = "p-tabpanel-" + idx++;
            this.tabView = tabView;
        }
        TabPanel.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'header':
                        _this.headerTemplate = item.template;
                        break;
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
                if (!this.loaded) {
                    this.cd.detectChanges();
                }
                if (val)
                    this.loaded = true;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TabPanel.prototype, "disabled", {
            get: function () {
                return this._disabled;
            },
            set: function (disabled) {
                this._disabled = disabled;
                this.tabView.cd.markForCheck();
            },
            enumerable: false,
            configurable: true
        });
        ;
        Object.defineProperty(TabPanel.prototype, "header", {
            get: function () {
                return this._header;
            },
            set: function (header) {
                this._header = header;
                this.tabView.cd.markForCheck();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TabPanel.prototype, "leftIcon", {
            get: function () {
                return this._leftIcon;
            },
            set: function (leftIcon) {
                this._leftIcon = leftIcon;
                this.tabView.cd.markForCheck();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TabPanel.prototype, "rightIcon", {
            get: function () {
                return this._rightIcon;
            },
            set: function (rightIcon) {
                this._rightIcon = rightIcon;
                this.tabView.cd.markForCheck();
            },
            enumerable: false,
            configurable: true
        });
        TabPanel.prototype.ngOnDestroy = function () {
            this.view = null;
        };
        return TabPanel;
    }());
    TabPanel.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-tabPanel',
                    template: "\n        <div [attr.id]=\"id\" class=\"p-tabview-panel\" [hidden]=\"!selected\"\n            role=\"tabpanel\" [attr.aria-hidden]=\"!selected\" [attr.aria-labelledby]=\"id + '-label'\" *ngIf=\"!closed\">\n            <ng-content></ng-content>\n            <ng-container *ngIf=\"contentTemplate && (cache ? loaded : selected)\">\n                <ng-container *ngTemplateOutlet=\"contentTemplate\"></ng-container>\n            </ng-container>\n        </div>\n    "
                },] }
    ];
    TabPanel.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core.Inject, args: [core.forwardRef(function () { return TabView; }),] }] },
        { type: core.ViewContainerRef },
        { type: core.ChangeDetectorRef }
    ]; };
    TabPanel.propDecorators = {
        closable: [{ type: core.Input }],
        headerStyle: [{ type: core.Input }],
        headerStyleClass: [{ type: core.Input }],
        cache: [{ type: core.Input }],
        tooltip: [{ type: core.Input }],
        tooltipPosition: [{ type: core.Input }],
        tooltipPositionStyle: [{ type: core.Input }],
        tooltipStyleClass: [{ type: core.Input }],
        templates: [{ type: core.ContentChildren, args: [api.PrimeTemplate,] }],
        selected: [{ type: core.Input }],
        disabled: [{ type: core.Input }],
        header: [{ type: core.Input }],
        leftIcon: [{ type: core.Input }],
        rightIcon: [{ type: core.Input }]
    };
    var TabView = /** @class */ (function () {
        function TabView(el, cd) {
            this.el = el;
            this.cd = cd;
            this.orientation = 'top';
            this.onChange = new core.EventEmitter();
            this.onClose = new core.EventEmitter();
            this.activeIndexChange = new core.EventEmitter();
        }
        TabView.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.initTabs();
            this.tabPanels.changes.subscribe(function (_) {
                _this.initTabs();
            });
        };
        TabView.prototype.ngAfterViewChecked = function () {
            if (this.tabChanged) {
                this.updateInkBar();
                this.tabChanged = false;
            }
        };
        TabView.prototype.initTabs = function () {
            this.tabs = this.tabPanels.toArray();
            var selectedTab = this.findSelectedTab();
            if (!selectedTab && this.tabs.length) {
                if (this.activeIndex != null && this.tabs.length > this.activeIndex)
                    this.tabs[this.activeIndex].selected = true;
                else
                    this.tabs[0].selected = true;
                this.tabChanged = true;
            }
            this.cd.markForCheck();
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
                this.tabChanged = true;
                tab.selected = true;
                var selectedTabIndex = this.findTabIndex(tab);
                this.preventActiveIndexPropagation = true;
                this.activeIndexChange.emit(selectedTabIndex);
                this.onChange.emit({ originalEvent: event, index: selectedTabIndex });
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
            if (tab.disabled) {
                return;
            }
            if (tab.selected) {
                this.tabChanged = true;
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
                if (this.preventActiveIndexPropagation) {
                    this.preventActiveIndexPropagation = false;
                    return;
                }
                if (this.tabs && this.tabs.length && this._activeIndex != null && this.tabs.length > this._activeIndex) {
                    this.findSelectedTab().selected = false;
                    this.tabs[this._activeIndex].selected = true;
                    this.tabChanged = true;
                }
            },
            enumerable: false,
            configurable: true
        });
        TabView.prototype.updateInkBar = function () {
            var tabHeader = dom.DomHandler.findSingle(this.navbar.nativeElement, 'li.p-highlight');
            this.inkbar.nativeElement.style.width = dom.DomHandler.getWidth(tabHeader) + 'px';
            this.inkbar.nativeElement.style.left = dom.DomHandler.getOffset(tabHeader).left - dom.DomHandler.getOffset(this.navbar.nativeElement).left + 'px';
        };
        return TabView;
    }());
    TabView.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-tabView',
                    template: "\n        <div [ngClass]=\"'p-tabview p-component'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <ul #navbar class=\"p-tabview-nav\" role=\"tablist\">\n                <ng-template ngFor let-tab [ngForOf]=\"tabs\">\n                    <li role=\"presentation\" [ngClass]=\"{'p-highlight': tab.selected, 'p-disabled': tab.disabled}\" [ngStyle]=\"tab.headerStyle\" [class]=\"tab.headerStyleClass\" *ngIf=\"!tab.closed\">\n                        <a role=\"tab\" class=\"p-tabview-nav-link\" [attr.id]=\"tab.id + '-label'\" [attr.aria-selected]=\"tab.selected\" [attr.aria-controls]=\"tab.id\" [pTooltip]=\"tab.tooltip\" [tooltipPosition]=\"tab.tooltipPosition\"\n                            [attr.aria-selected]=\"tab.selected\" [positionStyle]=\"tab.tooltipPositionStyle\" [tooltipStyleClass]=\"tab.tooltipStyleClass\"\n                            (click)=\"open($event,tab)\" (keydown.enter)=\"open($event,tab)\" pRipple [attr.tabindex]=\"tab.disabled ? null : '0'\">\n                            <ng-container *ngIf=\"!tab.headerTemplate\">\n                                <span class=\"p-tabview-left-icon\" [ngClass]=\"tab.leftIcon\" *ngIf=\"tab.leftIcon\"></span>\n                                <span class=\"p-tabview-title\">{{tab.header}}</span>\n                                <span class=\"p-tabview-right-icon\" [ngClass]=\"tab.rightIcon\" *ngIf=\"tab.rightIcon\"></span>\n                            </ng-container>\n                            <ng-container *ngTemplateOutlet=\"tab.headerTemplate\"></ng-container>\n                            <span *ngIf=\"tab.closable\" class=\"p-tabview-close pi pi-times\" (click)=\"close($event,tab)\"></span>\n                        </a>\n                    </li>\n                </ng-template>\n                <li #inkbar class=\"p-tabview-ink-bar\"></li>\n            </ul>\n            <div class=\"p-tabview-panels\">\n                <ng-content></ng-content>\n            </div>\n        </div>\n    ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".p-tabview-nav{display:flex;flex-wrap:wrap;list-style-type:none;margin:0;padding:0}.p-tabview-nav-link{-ms-user-select:none;-webkit-user-select:none;align-items:center;cursor:pointer;display:flex;overflow:hidden;position:relative;text-decoration:none;user-select:none}.p-tabview-ink-bar{display:none;z-index:1}.p-tabview-nav-link:focus{z-index:1}.p-tabview-title{line-height:1}.p-tabview-close{z-index:1}"]
                },] }
    ];
    TabView.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.ChangeDetectorRef }
    ]; };
    TabView.propDecorators = {
        orientation: [{ type: core.Input }],
        style: [{ type: core.Input }],
        styleClass: [{ type: core.Input }],
        controlClose: [{ type: core.Input }],
        navbar: [{ type: core.ViewChild, args: ['navbar',] }],
        inkbar: [{ type: core.ViewChild, args: ['inkbar',] }],
        tabPanels: [{ type: core.ContentChildren, args: [TabPanel,] }],
        onChange: [{ type: core.Output }],
        onClose: [{ type: core.Output }],
        activeIndexChange: [{ type: core.Output }],
        activeIndex: [{ type: core.Input }]
    };
    var TabViewModule = /** @class */ (function () {
        function TabViewModule() {
        }
        return TabViewModule;
    }());
    TabViewModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule, api.SharedModule, tooltip.TooltipModule, ripple.RippleModule],
                    exports: [TabView, TabPanel, api.SharedModule],
                    declarations: [TabView, TabPanel]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.TabPanel = TabPanel;
    exports.TabView = TabView;
    exports.TabViewModule = TabViewModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-tabview.umd.js.map
