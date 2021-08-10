(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/utils'), require('primeng/api'), require('primeng/paginator')) :
    typeof define === 'function' && define.amd ? define('primeng/dataview', ['exports', '@angular/core', '@angular/common', 'primeng/utils', 'primeng/api', 'primeng/paginator'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.dataview = {}), global.ng.core, global.ng.common, global.primeng.utils, global.primeng.api, global.primeng.paginator));
}(this, (function (exports, core, common, utils, api, paginator) { 'use strict';

    var DataView = /** @class */ (function () {
        function DataView(el, cd, filterService, config) {
            this.el = el;
            this.cd = cd;
            this.filterService = filterService;
            this.config = config;
            this.pageLinks = 5;
            this.paginatorPosition = 'bottom';
            this.alwaysShowPaginator = true;
            this.paginatorDropdownScrollHeight = '200px';
            this.currentPageReportTemplate = '{currentPage} of {totalPages}';
            this.showFirstLastIcon = true;
            this.showPageLinks = true;
            this.emptyMessage = '';
            this.onLazyLoad = new core.EventEmitter();
            this.trackBy = function (index, item) { return item; };
            this.loadingIcon = 'pi pi-spinner';
            this.first = 0;
            this.onPage = new core.EventEmitter();
            this.onSort = new core.EventEmitter();
            this.onChangeLayout = new core.EventEmitter();
            this._layout = 'list';
        }
        Object.defineProperty(DataView.prototype, "layout", {
            get: function () {
                return this._layout;
            },
            set: function (layout) {
                this._layout = layout;
                if (this.initialized) {
                    this.changeLayout(layout);
                }
            },
            enumerable: false,
            configurable: true
        });
        DataView.prototype.ngOnInit = function () {
            var _this = this;
            if (this.lazy) {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            }
            this.translationSubscription = this.config.translationObserver.subscribe(function () {
                _this.cd.markForCheck();
            });
            this.initialized = true;
        };
        DataView.prototype.ngOnChanges = function (simpleChanges) {
            if (simpleChanges.value) {
                this._value = simpleChanges.value.currentValue;
                this.updateTotalRecords();
                if (!this.lazy && this.hasFilter()) {
                    this.filter(this.filterValue);
                }
            }
            if (simpleChanges.sortField || simpleChanges.sortOrder) {
                //avoid triggering lazy load prior to lazy initialization at onInit
                if (!this.lazy || this.initialized) {
                    this.sort();
                }
            }
        };
        DataView.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'listItem':
                        _this.listItemTemplate = item.template;
                        break;
                    case 'gridItem':
                        _this.gridItemTemplate = item.template;
                        break;
                    case 'paginatorleft':
                        _this.paginatorLeftTemplate = item.template;
                        break;
                    case 'paginatorright':
                        _this.paginatorRightTemplate = item.template;
                        break;
                    case 'paginatordropdownitem':
                        _this.paginatorDropdownItemTemplate = item.template;
                        break;
                    case 'empty':
                        _this.emptyMessageTemplate = item.template;
                        break;
                    case 'header':
                        _this.headerTemplate = item.template;
                        break;
                    case 'footer':
                        _this.footerTemplate = item.template;
                        break;
                }
            });
            this.updateItemTemplate();
        };
        DataView.prototype.updateItemTemplate = function () {
            switch (this.layout) {
                case 'list':
                    this.itemTemplate = this.listItemTemplate;
                    break;
                case 'grid':
                    this.itemTemplate = this.gridItemTemplate;
                    break;
            }
        };
        DataView.prototype.changeLayout = function (layout) {
            this._layout = layout;
            this.onChangeLayout.emit({
                layout: this.layout
            });
            this.updateItemTemplate();
            this.cd.markForCheck();
        };
        DataView.prototype.updateTotalRecords = function () {
            this.totalRecords = this.lazy ? this.totalRecords : (this._value ? this._value.length : 0);
        };
        DataView.prototype.paginate = function (event) {
            this.first = event.first;
            this.rows = event.rows;
            if (this.lazy) {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            }
            this.onPage.emit({
                first: this.first,
                rows: this.rows
            });
        };
        DataView.prototype.sort = function () {
            var _this = this;
            this.first = 0;
            if (this.lazy) {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            }
            else if (this.value) {
                this.value.sort(function (data1, data2) {
                    var value1 = utils.ObjectUtils.resolveFieldData(data1, _this.sortField);
                    var value2 = utils.ObjectUtils.resolveFieldData(data2, _this.sortField);
                    var result = null;
                    if (value1 == null && value2 != null)
                        result = -1;
                    else if (value1 != null && value2 == null)
                        result = 1;
                    else if (value1 == null && value2 == null)
                        result = 0;
                    else if (typeof value1 === 'string' && typeof value2 === 'string')
                        result = value1.localeCompare(value2);
                    else
                        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
                    return (_this.sortOrder * result);
                });
                if (this.hasFilter()) {
                    this.filter(this.filterValue);
                }
            }
            this.onSort.emit({
                sortField: this.sortField,
                sortOrder: this.sortOrder
            });
        };
        DataView.prototype.isEmpty = function () {
            var data = this.filteredValue || this.value;
            return data == null || data.length == 0;
        };
        DataView.prototype.createLazyLoadMetadata = function () {
            return {
                first: this.first,
                rows: this.rows,
                sortField: this.sortField,
                sortOrder: this.sortOrder
            };
        };
        DataView.prototype.getBlockableElement = function () {
            return this.el.nativeElement.children[0];
        };
        Object.defineProperty(DataView.prototype, "emptyMessageLabel", {
            get: function () {
                return this.emptyMessage || this.config.getTranslation(api.TranslationKeys.EMPTY_MESSAGE);
            },
            enumerable: false,
            configurable: true
        });
        DataView.prototype.filter = function (filter, filterMatchMode) {
            if (filterMatchMode === void 0) { filterMatchMode = "contains"; }
            this.filterValue = filter;
            if (this.value && this.value.length) {
                var searchFields = this.filterBy.split(',');
                this.filteredValue = this.filterService.filter(this.value, searchFields, filter, filterMatchMode, this.filterLocale);
                if (this.filteredValue.length === this.value.length) {
                    this.filteredValue = null;
                }
                if (this.paginator) {
                    this.first = 0;
                    this.totalRecords = this.filteredValue ? this.filteredValue.length : this.value ? this.value.length : 0;
                }
                this.cd.markForCheck();
            }
        };
        DataView.prototype.hasFilter = function () {
            return this.filterValue && this.filterValue.trim().length > 0;
        };
        DataView.prototype.ngOnDestroy = function () {
            if (this.translationSubscription) {
                this.translationSubscription.unsubscribe();
            }
        };
        return DataView;
    }());
    DataView.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-dataView',
                    template: "\n        <div [ngClass]=\"{'p-dataview p-component': true, 'p-dataview-list': (layout === 'list'), 'p-dataview-grid': (layout === 'grid')}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"p-dataview-loading\" *ngIf=\"loading\">\n                <div class=\"p-dataview-loading-overlay p-component-overlay\">\n                    <i [class]=\"'p-dataview-loading-icon pi-spin ' + loadingIcon\"></i>\n                </div>\n            </div>\n            <div class=\"p-dataview-header\" *ngIf=\"header || headerTemplate\">\n                <ng-content select=\"p-header\"></ng-content>\n                <ng-container *ngTemplateOutlet=\"headerTemplate\"></ng-container>\n            </div>\n            <p-paginator [rows]=\"rows\" [first]=\"first\" [totalRecords]=\"totalRecords\" [pageLinkSize]=\"pageLinks\" [alwaysShow]=\"alwaysShowPaginator\"\n                (onPageChange)=\"paginate($event)\" styleClass=\"p-paginator-top\" [rowsPerPageOptions]=\"rowsPerPageOptions\" *ngIf=\"paginator && (paginatorPosition === 'top' || paginatorPosition =='both')\"\n                [dropdownAppendTo]=\"paginatorDropdownAppendTo\" [dropdownScrollHeight]=\"paginatorDropdownScrollHeight\" [templateLeft]=\"paginatorLeftTemplate\" [templateRight]=\"paginatorRightTemplate\"\n                [currentPageReportTemplate]=\"currentPageReportTemplate\" [showFirstLastIcon]=\"showFirstLastIcon\" [dropdownItemTemplate]=\"paginatorDropdownItemTemplate\" [showCurrentPageReport]=\"showCurrentPageReport\" [showJumpToPageDropdown]=\"showJumpToPageDropdown\" [showPageLinks]=\"showPageLinks\"></p-paginator>\n            <div class=\"p-dataview-content\">\n                <div class=\"p-grid p-nogutter\">\n                    <ng-template ngFor let-rowData let-rowIndex=\"index\" [ngForOf]=\"paginator ? ((filteredValue||value) | slice:(lazy ? 0 : first):((lazy ? 0 : first) + rows)) : (filteredValue||value)\" [ngForTrackBy]=\"trackBy\">\n                        <ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: rowData, rowIndex: rowIndex}\"></ng-container>\n                    </ng-template>\n                    <div *ngIf=\"isEmpty()\" class=\"p-col\">\n                            <div class=\"p-dataview-emptymessage\">\n                            <ng-container *ngIf=\"!emptyMessageTemplate; else emptyFilter\">\n                                    {{emptyMessageLabel}}\n                            </ng-container>\n                            <ng-container #emptyFilter *ngTemplateOutlet=\"emptyMessageTemplate\"></ng-container>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <p-paginator [rows]=\"rows\" [first]=\"first\" [totalRecords]=\"totalRecords\" [pageLinkSize]=\"pageLinks\" [alwaysShow]=\"alwaysShowPaginator\"\n                (onPageChange)=\"paginate($event)\" styleClass=\"p-paginator-bottom\" [rowsPerPageOptions]=\"rowsPerPageOptions\" *ngIf=\"paginator && (paginatorPosition === 'bottom' || paginatorPosition =='both')\"\n                [dropdownAppendTo]=\"paginatorDropdownAppendTo\" [dropdownScrollHeight]=\"paginatorDropdownScrollHeight\" [templateLeft]=\"paginatorLeftTemplate\" [templateRight]=\"paginatorRightTemplate\"\n                [currentPageReportTemplate]=\"currentPageReportTemplate\" [showFirstLastIcon]=\"showFirstLastIcon\" [dropdownItemTemplate]=\"paginatorDropdownItemTemplate\" [showCurrentPageReport]=\"showCurrentPageReport\" [showJumpToPageDropdown]=\"showJumpToPageDropdown\" [showPageLinks]=\"showPageLinks\"></p-paginator>\n            <div class=\"p-dataview-footer\" *ngIf=\"footer || footerTemplate\">\n                <ng-content select=\"p-footer\"></ng-content>\n                <ng-container *ngTemplateOutlet=\"footerTemplate\"></ng-container>\n            </div>\n        </div>\n    ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".p-dataview{position:relative}.p-dataview .p-dataview-loading-overlay{align-items:center;display:flex;justify-content:center;position:absolute;z-index:2}"]
                },] }
    ];
    DataView.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.ChangeDetectorRef },
        { type: api.FilterService },
        { type: api.PrimeNGConfig }
    ]; };
    DataView.propDecorators = {
        paginator: [{ type: core.Input }],
        rows: [{ type: core.Input }],
        totalRecords: [{ type: core.Input }],
        pageLinks: [{ type: core.Input }],
        rowsPerPageOptions: [{ type: core.Input }],
        paginatorPosition: [{ type: core.Input }],
        alwaysShowPaginator: [{ type: core.Input }],
        paginatorDropdownAppendTo: [{ type: core.Input }],
        paginatorDropdownScrollHeight: [{ type: core.Input }],
        currentPageReportTemplate: [{ type: core.Input }],
        showCurrentPageReport: [{ type: core.Input }],
        showJumpToPageDropdown: [{ type: core.Input }],
        showFirstLastIcon: [{ type: core.Input }],
        showPageLinks: [{ type: core.Input }],
        lazy: [{ type: core.Input }],
        emptyMessage: [{ type: core.Input }],
        onLazyLoad: [{ type: core.Output }],
        style: [{ type: core.Input }],
        styleClass: [{ type: core.Input }],
        trackBy: [{ type: core.Input }],
        filterBy: [{ type: core.Input }],
        filterLocale: [{ type: core.Input }],
        loading: [{ type: core.Input }],
        loadingIcon: [{ type: core.Input }],
        first: [{ type: core.Input }],
        sortField: [{ type: core.Input }],
        sortOrder: [{ type: core.Input }],
        value: [{ type: core.Input }],
        onPage: [{ type: core.Output }],
        onSort: [{ type: core.Output }],
        onChangeLayout: [{ type: core.Output }],
        header: [{ type: core.ContentChild, args: [api.Header,] }],
        footer: [{ type: core.ContentChild, args: [api.Footer,] }],
        templates: [{ type: core.ContentChildren, args: [api.PrimeTemplate,] }],
        layout: [{ type: core.Input }]
    };
    var DataViewLayoutOptions = /** @class */ (function () {
        function DataViewLayoutOptions(dv) {
            this.dv = dv;
        }
        DataViewLayoutOptions.prototype.changeLayout = function (event, layout) {
            this.dv.changeLayout(layout);
            event.preventDefault();
        };
        return DataViewLayoutOptions;
    }());
    DataViewLayoutOptions.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-dataViewLayoutOptions',
                    template: "\n        <div [ngClass]=\"'p-dataview-layout-options p-selectbutton p-buttonset'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <button type=\"button\" class=\"p-button p-button-icon-only\" [ngClass]=\"{'p-highlight': dv.layout === 'list'}\" (click)=\"changeLayout($event, 'list')\" (keydown.enter)=\"changeLayout($event, 'list')\">\n                <i class=\"pi pi-bars\"></i>\n            </button><button type=\"button\" class=\"p-button p-button-icon-only\" [ngClass]=\"{'p-highlight': dv.layout === 'grid'}\" (click)=\"changeLayout($event, 'grid')\" (keydown.enter)=\"changeLayout($event, 'grid')\">\n                <i class=\"pi pi-th-large\"></i>\n            </button>\n        </div>\n    ",
                    encapsulation: core.ViewEncapsulation.None
                },] }
    ];
    DataViewLayoutOptions.ctorParameters = function () { return [
        { type: DataView }
    ]; };
    DataViewLayoutOptions.propDecorators = {
        style: [{ type: core.Input }],
        styleClass: [{ type: core.Input }]
    };
    var DataViewModule = /** @class */ (function () {
        function DataViewModule() {
        }
        return DataViewModule;
    }());
    DataViewModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule, api.SharedModule, paginator.PaginatorModule],
                    exports: [DataView, api.SharedModule, DataViewLayoutOptions],
                    declarations: [DataView, DataViewLayoutOptions]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.DataView = DataView;
    exports.DataViewLayoutOptions = DataViewLayoutOptions;
    exports.DataViewModule = DataViewModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-dataview.umd.js.map
