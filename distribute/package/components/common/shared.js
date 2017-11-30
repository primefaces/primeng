"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var core_2 = require("@angular/core");
var Header = (function () {
    function Header() {
    }
    return Header;
}());
Header.decorators = [
    { type: core_2.Component, args: [{
                selector: 'p-header',
                template: '<ng-content></ng-content>'
            },] },
];
/** @nocollapse */
Header.ctorParameters = function () { return []; };
exports.Header = Header;
var Footer = (function () {
    function Footer() {
    }
    return Footer;
}());
Footer.decorators = [
    { type: core_2.Component, args: [{
                selector: 'p-footer',
                template: '<ng-content></ng-content>'
            },] },
];
/** @nocollapse */
Footer.ctorParameters = function () { return []; };
exports.Footer = Footer;
var PrimeTemplate = (function () {
    function PrimeTemplate(template) {
        this.template = template;
    }
    PrimeTemplate.prototype.getType = function () {
        return this.name;
    };
    return PrimeTemplate;
}());
PrimeTemplate.decorators = [
    { type: core_1.Directive, args: [{
                selector: '[pTemplate]',
                host: {}
            },] },
];
/** @nocollapse */
PrimeTemplate.ctorParameters = function () { return [
    { type: core_1.TemplateRef, },
]; };
PrimeTemplate.propDecorators = {
    'type': [{ type: core_1.Input },],
    'name': [{ type: core_1.Input, args: ['pTemplate',] },],
};
exports.PrimeTemplate = PrimeTemplate;
var TemplateWrapper = (function () {
    function TemplateWrapper(viewContainer) {
        this.viewContainer = viewContainer;
    }
    TemplateWrapper.prototype.ngOnInit = function () {
        this.view = this.viewContainer.createEmbeddedView(this.templateRef, {
            '\$implicit': this.item,
            'index': this.index
        });
    };
    TemplateWrapper.prototype.ngOnDestroy = function () {
        this.view.destroy();
    };
    return TemplateWrapper;
}());
TemplateWrapper.decorators = [
    { type: core_1.Directive, args: [{
                selector: '[pTemplateWrapper]'
            },] },
];
/** @nocollapse */
TemplateWrapper.ctorParameters = function () { return [
    { type: core_1.ViewContainerRef, },
]; };
TemplateWrapper.propDecorators = {
    'item': [{ type: core_1.Input },],
    'index': [{ type: core_1.Input },],
    'templateRef': [{ type: core_1.Input, args: ['pTemplateWrapper',] },],
};
exports.TemplateWrapper = TemplateWrapper;
var Column = (function () {
    function Column() {
        this.filterType = 'text';
        this.sortFunction = new core_1.EventEmitter();
    }
    Column.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'header':
                    _this.headerTemplate = item.template;
                    break;
                case 'body':
                    _this.bodyTemplate = item.template;
                    break;
                case 'footer':
                    _this.footerTemplate = item.template;
                    break;
                case 'filter':
                    _this.filterTemplate = item.template;
                    break;
                case 'editor':
                    _this.editorTemplate = item.template;
                    break;
                default:
                    _this.bodyTemplate = item.template;
                    break;
            }
        });
    };
    return Column;
}());
Column.decorators = [
    { type: core_2.Component, args: [{
                selector: 'p-column',
                template: ""
            },] },
];
/** @nocollapse */
Column.ctorParameters = function () { return []; };
Column.propDecorators = {
    'field': [{ type: core_1.Input },],
    'colId': [{ type: core_1.Input },],
    'sortField': [{ type: core_1.Input },],
    'filterField': [{ type: core_1.Input },],
    'header': [{ type: core_1.Input },],
    'footer': [{ type: core_1.Input },],
    'sortable': [{ type: core_1.Input },],
    'disabled': [{ type: core_1.Input },],
    'editable': [{ type: core_1.Input },],
    'filter': [{ type: core_1.Input },],
    'filterMatchMode': [{ type: core_1.Input },],
    'filterType': [{ type: core_1.Input },],
    'rowspan': [{ type: core_1.Input },],
    'colspan': [{ type: core_1.Input },],
    'style': [{ type: core_1.Input },],
    'styleClass': [{ type: core_1.Input },],
    'hidden': [{ type: core_1.Input },],
    'expander': [{ type: core_1.Input },],
    'selectionMode': [{ type: core_1.Input },],
    'filterPlaceholder': [{ type: core_1.Input },],
    'filterMaxlength': [{ type: core_1.Input },],
    'frozen': [{ type: core_1.Input },],
    'sortFunction': [{ type: core_1.Output },],
    'templates': [{ type: core_1.ContentChildren, args: [PrimeTemplate,] },],
    'template': [{ type: core_1.ContentChild, args: [core_1.TemplateRef,] },],
};
exports.Column = Column;
var Row = (function () {
    function Row() {
    }
    return Row;
}());
Row.decorators = [
    { type: core_2.Component, args: [{
                selector: 'p-row',
                template: ""
            },] },
];
/** @nocollapse */
Row.ctorParameters = function () { return []; };
Row.propDecorators = {
    'columns': [{ type: core_1.ContentChildren, args: [Column,] },],
};
exports.Row = Row;
var HeaderColumnGroup = (function () {
    function HeaderColumnGroup() {
    }
    return HeaderColumnGroup;
}());
HeaderColumnGroup.decorators = [
    { type: core_2.Component, args: [{
                selector: 'p-headerColumnGroup',
                template: ""
            },] },
];
/** @nocollapse */
HeaderColumnGroup.ctorParameters = function () { return []; };
HeaderColumnGroup.propDecorators = {
    'frozen': [{ type: core_1.Input },],
    'rows': [{ type: core_1.ContentChildren, args: [Row,] },],
};
exports.HeaderColumnGroup = HeaderColumnGroup;
var FooterColumnGroup = (function () {
    function FooterColumnGroup() {
    }
    return FooterColumnGroup;
}());
FooterColumnGroup.decorators = [
    { type: core_2.Component, args: [{
                selector: 'p-footerColumnGroup',
                template: ""
            },] },
];
/** @nocollapse */
FooterColumnGroup.ctorParameters = function () { return []; };
FooterColumnGroup.propDecorators = {
    'frozen': [{ type: core_1.Input },],
    'rows': [{ type: core_1.ContentChildren, args: [Row,] },],
};
exports.FooterColumnGroup = FooterColumnGroup;
var ColumnBodyTemplateLoader = (function () {
    function ColumnBodyTemplateLoader(viewContainer) {
        this.viewContainer = viewContainer;
    }
    ColumnBodyTemplateLoader.prototype.ngOnInit = function () {
        this.view = this.viewContainer.createEmbeddedView(this.column.bodyTemplate, {
            '\$implicit': this.column,
            'rowData': this.rowData,
            'rowIndex': this.rowIndex
        });
    };
    ColumnBodyTemplateLoader.prototype.ngOnChanges = function (changes) {
        if (!this.view) {
            return;
        }
        if ('rowIndex' in changes) {
            this.view.context.rowIndex = changes['rowIndex'].currentValue;
        }
    };
    ColumnBodyTemplateLoader.prototype.ngOnDestroy = function () {
        this.view.destroy();
    };
    return ColumnBodyTemplateLoader;
}());
ColumnBodyTemplateLoader.decorators = [
    { type: core_2.Component, args: [{
                selector: 'p-columnBodyTemplateLoader',
                template: ""
            },] },
];
/** @nocollapse */
ColumnBodyTemplateLoader.ctorParameters = function () { return [
    { type: core_1.ViewContainerRef, },
]; };
ColumnBodyTemplateLoader.propDecorators = {
    'column': [{ type: core_1.Input },],
    'rowData': [{ type: core_1.Input },],
    'rowIndex': [{ type: core_1.Input },],
};
exports.ColumnBodyTemplateLoader = ColumnBodyTemplateLoader;
var ColumnHeaderTemplateLoader = (function () {
    function ColumnHeaderTemplateLoader(viewContainer) {
        this.viewContainer = viewContainer;
    }
    ColumnHeaderTemplateLoader.prototype.ngOnInit = function () {
        this.view = this.viewContainer.createEmbeddedView(this.column.headerTemplate, {
            '\$implicit': this.column
        });
    };
    ColumnHeaderTemplateLoader.prototype.ngOnDestroy = function () {
        this.view.destroy();
    };
    return ColumnHeaderTemplateLoader;
}());
ColumnHeaderTemplateLoader.decorators = [
    { type: core_2.Component, args: [{
                selector: 'p-columnHeaderTemplateLoader',
                template: ""
            },] },
];
/** @nocollapse */
ColumnHeaderTemplateLoader.ctorParameters = function () { return [
    { type: core_1.ViewContainerRef, },
]; };
ColumnHeaderTemplateLoader.propDecorators = {
    'column': [{ type: core_1.Input },],
};
exports.ColumnHeaderTemplateLoader = ColumnHeaderTemplateLoader;
var ColumnFooterTemplateLoader = (function () {
    function ColumnFooterTemplateLoader(viewContainer) {
        this.viewContainer = viewContainer;
    }
    ColumnFooterTemplateLoader.prototype.ngOnInit = function () {
        this.view = this.viewContainer.createEmbeddedView(this.column.footerTemplate, {
            '\$implicit': this.column
        });
    };
    ColumnFooterTemplateLoader.prototype.ngOnDestroy = function () {
        this.view.destroy();
    };
    return ColumnFooterTemplateLoader;
}());
ColumnFooterTemplateLoader.decorators = [
    { type: core_2.Component, args: [{
                selector: 'p-columnFooterTemplateLoader',
                template: ""
            },] },
];
/** @nocollapse */
ColumnFooterTemplateLoader.ctorParameters = function () { return [
    { type: core_1.ViewContainerRef, },
]; };
ColumnFooterTemplateLoader.propDecorators = {
    'column': [{ type: core_1.Input },],
};
exports.ColumnFooterTemplateLoader = ColumnFooterTemplateLoader;
var ColumnFilterTemplateLoader = (function () {
    function ColumnFilterTemplateLoader(viewContainer) {
        this.viewContainer = viewContainer;
    }
    ColumnFilterTemplateLoader.prototype.ngOnInit = function () {
        this.view = this.viewContainer.createEmbeddedView(this.column.filterTemplate, {
            '\$implicit': this.column
        });
    };
    ColumnFilterTemplateLoader.prototype.ngOnDestroy = function () {
        this.view.destroy();
    };
    return ColumnFilterTemplateLoader;
}());
ColumnFilterTemplateLoader.decorators = [
    { type: core_2.Component, args: [{
                selector: 'p-columnFilterTemplateLoader',
                template: ""
            },] },
];
/** @nocollapse */
ColumnFilterTemplateLoader.ctorParameters = function () { return [
    { type: core_1.ViewContainerRef, },
]; };
ColumnFilterTemplateLoader.propDecorators = {
    'column': [{ type: core_1.Input },],
};
exports.ColumnFilterTemplateLoader = ColumnFilterTemplateLoader;
var ColumnEditorTemplateLoader = (function () {
    function ColumnEditorTemplateLoader(viewContainer) {
        this.viewContainer = viewContainer;
    }
    ColumnEditorTemplateLoader.prototype.ngOnInit = function () {
        this.view = this.viewContainer.createEmbeddedView(this.column.editorTemplate, {
            '\$implicit': this.column,
            'rowData': this.rowData,
            'rowIndex': this.rowIndex
        });
    };
    ColumnEditorTemplateLoader.prototype.ngOnDestroy = function () {
        this.view.destroy();
    };
    return ColumnEditorTemplateLoader;
}());
ColumnEditorTemplateLoader.decorators = [
    { type: core_2.Component, args: [{
                selector: 'p-columnEditorTemplateLoader',
                template: ""
            },] },
];
/** @nocollapse */
ColumnEditorTemplateLoader.ctorParameters = function () { return [
    { type: core_1.ViewContainerRef, },
]; };
ColumnEditorTemplateLoader.propDecorators = {
    'column': [{ type: core_1.Input },],
    'rowData': [{ type: core_1.Input },],
    'rowIndex': [{ type: core_1.Input },],
};
exports.ColumnEditorTemplateLoader = ColumnEditorTemplateLoader;
var TemplateLoader = (function () {
    function TemplateLoader(viewContainer) {
        this.viewContainer = viewContainer;
    }
    TemplateLoader.prototype.ngOnInit = function () {
        if (this.template) {
            this.view = this.viewContainer.createEmbeddedView(this.template, {
                '\$implicit': this.data
            });
        }
    };
    TemplateLoader.prototype.ngOnDestroy = function () {
        if (this.view)
            this.view.destroy();
    };
    return TemplateLoader;
}());
TemplateLoader.decorators = [
    { type: core_2.Component, args: [{
                selector: 'p-templateLoader',
                template: ""
            },] },
];
/** @nocollapse */
TemplateLoader.ctorParameters = function () { return [
    { type: core_1.ViewContainerRef, },
]; };
TemplateLoader.propDecorators = {
    'template': [{ type: core_1.Input },],
    'data': [{ type: core_1.Input },],
};
exports.TemplateLoader = TemplateLoader;
var SharedModule = (function () {
    function SharedModule() {
    }
    return SharedModule;
}());
SharedModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule],
                exports: [Header, Footer, Column, TemplateWrapper, ColumnHeaderTemplateLoader, ColumnBodyTemplateLoader, ColumnFooterTemplateLoader, ColumnFilterTemplateLoader, PrimeTemplate, TemplateLoader, Row, HeaderColumnGroup, FooterColumnGroup, ColumnEditorTemplateLoader],
                declarations: [Header, Footer, Column, TemplateWrapper, ColumnHeaderTemplateLoader, ColumnBodyTemplateLoader, ColumnFooterTemplateLoader, ColumnFilterTemplateLoader, PrimeTemplate, TemplateLoader, Row, HeaderColumnGroup, FooterColumnGroup, ColumnEditorTemplateLoader]
            },] },
];
/** @nocollapse */
SharedModule.ctorParameters = function () { return []; };
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared.js.map