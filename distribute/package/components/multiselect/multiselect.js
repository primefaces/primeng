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
var objectutils_1 = require("../utils/objectutils");
var shared_1 = require("../common/shared");
var forms_1 = require("@angular/forms");
exports.MULTISELECT_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return MultiSelect; }),
    multi: true
};
var MultiSelect = (function () {
    function MultiSelect(el, domHandler, renderer, differs, objectUtils, cd) {
        this.el = el;
        this.domHandler = domHandler;
        this.renderer = renderer;
        this.objectUtils = objectUtils;
        this.cd = cd;
        this.scrollHeight = '200px';
        this.defaultLabel = 'Choose';
        this.filter = true;
        this.displaySelectedLabel = true;
        this.maxSelectedLabels = 3;
        this.selectedItemsLabel = '{0} items selected';
        this.showToggleAll = true;
        this.resetFilterOnHide = false;
        this.onChange = new core_1.EventEmitter();
        this.onBlur = new core_1.EventEmitter();
        this.onPanelShow = new core_1.EventEmitter();
        this.onPanelHide = new core_1.EventEmitter();
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
        this.valueDiffer = differs.find([]).create(null);
        this.optionsDiffer = differs.find([]).create(null);
    }
    MultiSelect.prototype.ngOnInit = function () {
        this.updateLabel();
    };
    MultiSelect.prototype.ngAfterContentInit = function () {
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
    MultiSelect.prototype.ngAfterViewInit = function () {
        this.container = this.containerViewChild.nativeElement;
        this.panel = this.panelViewChild.nativeElement;
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.panel);
            else
                this.domHandler.appendChild(this.panel, this.appendTo);
        }
        if (this.overlayVisible) {
            this.show();
        }
    };
    MultiSelect.prototype.ngAfterViewChecked = function () {
        if (this.filtered) {
            if (this.appendTo)
                this.domHandler.absolutePosition(this.panel, this.container);
            else
                this.domHandler.relativePosition(this.panel, this.container);
            this.filtered = false;
        }
    };
    MultiSelect.prototype.ngDoCheck = function () {
        var valueChanges = this.valueDiffer.diff(this.value);
        var optionChanges = this.optionsDiffer.diff(this.options);
        if (valueChanges || optionChanges) {
            this.updateLabel();
        }
    };
    MultiSelect.prototype.writeValue = function (value) {
        this.value = value;
        this.updateLabel();
        this.cd.markForCheck();
    };
    MultiSelect.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    MultiSelect.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    MultiSelect.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    MultiSelect.prototype.onItemClick = function (event, value) {
        event.stopPropagation();
        var selectionIndex = this.findSelectionIndex(value);
        if (selectionIndex != -1)
            this.value = this.value.filter(function (val, i) { return i != selectionIndex; });
        else
            this.value = (this.value || []).concat([value]);
        this.onModelChange(this.value);
        this.onChange.emit({ originalEvent: event, value: this.value });
    };
    MultiSelect.prototype.isSelected = function (value) {
        return this.findSelectionIndex(value) != -1;
    };
    MultiSelect.prototype.findSelectionIndex = function (val) {
        var index = -1;
        if (this.value) {
            for (var i = 0; i < this.value.length; i++) {
                if (this.objectUtils.equals(this.value[i], val, this.dataKey)) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    };
    MultiSelect.prototype.toggleAll = function (event, checkbox) {
        if (checkbox.checked) {
            this.value = [];
        }
        else {
            var opts = this.getVisibleOptions();
            if (opts) {
                this.value = [];
                for (var i = 0; i < opts.length; i++) {
                    this.value.push(opts[i].value);
                }
            }
        }
        checkbox.checked = !checkbox.checked;
        this.onModelChange(this.value);
        this.onChange.emit({ originalEvent: event, value: this.value });
    };
    MultiSelect.prototype.isAllChecked = function () {
        if (this.filterValue && this.filterValue.trim().length)
            return this.value && this.visibleOptions && this.visibleOptions.length && (this.value.length == this.visibleOptions.length);
        else
            return this.value && this.options && (this.value.length == this.options.length);
    };
    MultiSelect.prototype.show = function () {
        this.overlayVisible = true;
        this.panel.style.zIndex = String(++domhandler_1.DomHandler.zindex);
        this.bindDocumentClickListener();
        if (this.appendTo)
            this.domHandler.absolutePosition(this.panel, this.container);
        else
            this.domHandler.relativePosition(this.panel, this.container);
        this.domHandler.fadeIn(this.panel, 250);
        this.onPanelShow.emit();
    };
    MultiSelect.prototype.hide = function () {
        this.overlayVisible = false;
        this.unbindDocumentClickListener();
        if (this.resetFilterOnHide) {
            this.filterValue = null;
            this.filterInputChild.nativeElement.value = null;
        }
        this.onPanelHide.emit();
    };
    MultiSelect.prototype.close = function (event) {
        this.hide();
        event.preventDefault();
        event.stopPropagation();
    };
    MultiSelect.prototype.onMouseclick = function (event, input) {
        if (this.disabled) {
            return;
        }
        if (!this.panelClick) {
            if (this.overlayVisible) {
                this.hide();
            }
            else {
                input.focus();
                this.show();
            }
        }
        this.selfClick = true;
    };
    MultiSelect.prototype.onFocus = function (event) {
        this.focus = true;
    };
    MultiSelect.prototype.onInputBlur = function (event) {
        this.focus = false;
        this.onBlur.emit({ originalEvent: event });
        this.onModelTouched();
    };
    MultiSelect.prototype.updateLabel = function () {
        if (this.value && this.options && this.value.length && this.displaySelectedLabel) {
            var label = '';
            for (var i = 0; i < this.value.length; i++) {
                var itemLabel = this.findLabelByValue(this.value[i]);
                if (itemLabel) {
                    if (label.length > 0) {
                        label = label + ', ';
                    }
                    label = label + itemLabel;
                }
            }
            if (this.value.length <= this.maxSelectedLabels) {
                this.valuesAsString = label;
            }
            else {
                var pattern = /{(.*?)}/, newSelectedItemsLabel = this.selectedItemsLabel.replace(this.selectedItemsLabel.match(pattern)[0], this.value.length + '');
                this.valuesAsString = newSelectedItemsLabel;
            }
        }
        else {
            this.valuesAsString = this.defaultLabel;
        }
    };
    MultiSelect.prototype.findLabelByValue = function (val) {
        var label = null;
        for (var i = 0; i < this.options.length; i++) {
            var option = this.options[i];
            if (val == null && option.value == null || this.objectUtils.equals(val, option.value, this.dataKey)) {
                label = option.label;
                break;
            }
        }
        return label;
    };
    MultiSelect.prototype.onFilter = function (event) {
        this.filterValue = event.target.value.trim().toLowerCase();
        this.visibleOptions = [];
        for (var i = 0; i < this.options.length; i++) {
            var option = this.options[i];
            if (option.label.toLowerCase().indexOf(this.filterValue.toLowerCase()) > -1) {
                this.visibleOptions.push(option);
            }
        }
        this.filtered = true;
    };
    MultiSelect.prototype.isItemVisible = function (option) {
        if (this.filterValue && this.filterValue.trim().length) {
            for (var i = 0; i < this.visibleOptions.length; i++) {
                if (this.visibleOptions[i].value == option.value) {
                    return true;
                }
            }
        }
        else {
            return true;
        }
    };
    MultiSelect.prototype.getVisibleOptions = function () {
        if (this.filterValue && this.filterValue.trim().length) {
            var items = [];
            for (var i = 0; i < this.options.length; i++) {
                var option = this.options[i];
                if (option.label.toLowerCase().includes(this.filterValue.toLowerCase())) {
                    items.push(option);
                }
            }
            return items;
        }
        else {
            return this.options;
        }
    };
    MultiSelect.prototype.bindDocumentClickListener = function () {
        var _this = this;
        if (!this.documentClickListener) {
            this.documentClickListener = this.renderer.listen('document', 'click', function () {
                if (!_this.selfClick && !_this.panelClick && _this.overlayVisible) {
                    _this.hide();
                }
                _this.selfClick = false;
                _this.panelClick = false;
                _this.cd.markForCheck();
            });
        }
    };
    MultiSelect.prototype.unbindDocumentClickListener = function () {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    };
    MultiSelect.prototype.ngOnDestroy = function () {
        this.unbindDocumentClickListener();
        if (this.appendTo) {
            this.container.appendChild(this.panel);
        }
    };
    return MultiSelect;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], MultiSelect.prototype, "options", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], MultiSelect.prototype, "scrollHeight", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], MultiSelect.prototype, "defaultLabel", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], MultiSelect.prototype, "style", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], MultiSelect.prototype, "styleClass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], MultiSelect.prototype, "panelStyle", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], MultiSelect.prototype, "panelStyleClass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], MultiSelect.prototype, "inputId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], MultiSelect.prototype, "disabled", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], MultiSelect.prototype, "filter", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], MultiSelect.prototype, "overlayVisible", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], MultiSelect.prototype, "tabindex", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], MultiSelect.prototype, "appendTo", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], MultiSelect.prototype, "dataKey", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], MultiSelect.prototype, "displaySelectedLabel", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], MultiSelect.prototype, "maxSelectedLabels", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], MultiSelect.prototype, "selectedItemsLabel", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], MultiSelect.prototype, "showToggleAll", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], MultiSelect.prototype, "resetFilterOnHide", void 0);
__decorate([
    core_1.ViewChild('container'),
    __metadata("design:type", core_1.ElementRef)
], MultiSelect.prototype, "containerViewChild", void 0);
__decorate([
    core_1.ViewChild('panel'),
    __metadata("design:type", core_1.ElementRef)
], MultiSelect.prototype, "panelViewChild", void 0);
__decorate([
    core_1.ViewChild('filterInput'),
    __metadata("design:type", core_1.ElementRef)
], MultiSelect.prototype, "filterInputChild", void 0);
__decorate([
    core_1.ContentChildren(shared_1.PrimeTemplate),
    __metadata("design:type", core_1.QueryList)
], MultiSelect.prototype, "templates", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], MultiSelect.prototype, "onChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], MultiSelect.prototype, "onBlur", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], MultiSelect.prototype, "onPanelShow", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], MultiSelect.prototype, "onPanelHide", void 0);
MultiSelect = __decorate([
    core_1.Component({
        selector: 'p-multiSelect',
        template: "\n        <div #container [ngClass]=\"{'ui-multiselect ui-widget ui-state-default ui-corner-all':true,'ui-state-focus':focus,'ui-state-disabled': disabled}\" [ngStyle]=\"style\" [class]=\"styleClass\"\n            (click)=\"onMouseclick($event,in)\">\n            <div class=\"ui-helper-hidden-accessible\">\n                <input #in type=\"text\" readonly=\"readonly\" [attr.id]=\"inputId\" (focus)=\"onFocus($event)\" (blur)=\"onInputBlur($event)\" [disabled]=\"disabled\" [attr.tabindex]=\"tabindex\">\n            </div>\n            <div class=\"ui-multiselect-label-container\" [title]=\"valuesAsString\">\n                <label class=\"ui-multiselect-label ui-corner-all\">{{valuesAsString}}</label>\n            </div>\n            <div [ngClass]=\"{'ui-multiselect-trigger ui-state-default ui-corner-right':true}\">\n                <span class=\"fa fa-fw fa-caret-down ui-clickable\"></span>\n            </div>\n            <div #panel [ngClass]=\"['ui-multiselect-panel ui-widget ui-widget-content ui-corner-all ui-shadow', panelStyleClass||'']\" [ngStyle]=\"panelStyle\"\n                [style.display]=\"overlayVisible ? 'block' : 'none'\" (click)=\"panelClick=true\">\n                <div class=\"ui-widget-header ui-corner-all ui-multiselect-header ui-helper-clearfix\" [ngClass]=\"{'ui-multiselect-header-no-toggleall': !showToggleAll}\">\n                    <div class=\"ui-chkbox ui-widget\" *ngIf=\"showToggleAll\">\n                        <div class=\"ui-helper-hidden-accessible\">\n                            <input #cb type=\"checkbox\" readonly=\"readonly\" [checked]=\"isAllChecked()\">\n                        </div>\n                        <div class=\"ui-chkbox-box ui-widget ui-corner-all ui-state-default\" [ngClass]=\"{'ui-state-active':isAllChecked()}\" (click)=\"toggleAll($event,cb)\">\n                            <span class=\"ui-chkbox-icon ui-clickable\" [ngClass]=\"{'fa fa-check':isAllChecked()}\"></span>\n                        </div>\n                    </div>\n                    <div class=\"ui-multiselect-filter-container\" *ngIf=\"filter\">\n                        <input #filterInput type=\"text\" role=\"textbox\" (input)=\"onFilter($event)\"\n                                    class=\"ui-inputtext ui-widget ui-state-default ui-corner-all\">\n                        <span class=\"fa fa-fw fa-search\"></span>\n                    </div>\n                    <a class=\"ui-multiselect-close ui-corner-all\" href=\"#\" (click)=\"close($event)\">\n                        <span class=\"fa fa-close\"></span>\n                    </a>\n                </div>\n                <div class=\"ui-multiselect-items-wrapper\">\n                    <ul class=\"ui-multiselect-items ui-multiselect-list ui-widget-content ui-widget ui-corner-all ui-helper-reset\" [style.max-height]=\"scrollHeight||'auto'\">\n                        <li *ngFor=\"let option of options; let index = i\" class=\"ui-multiselect-item ui-corner-all\" (click)=\"onItemClick($event,option.value)\" \n                            [style.display]=\"isItemVisible(option) ? 'block' : 'none'\" [ngClass]=\"{'ui-state-highlight':isSelected(option.value)}\">\n                            <div class=\"ui-chkbox ui-widget\">\n                                <div class=\"ui-helper-hidden-accessible\">\n                                    <input type=\"checkbox\" readonly=\"readonly\" [checked]=\"isSelected(option.value)\">\n                                </div>\n                                <div class=\"ui-chkbox-box ui-widget ui-corner-all ui-state-default\" [ngClass]=\"{'ui-state-active':isSelected(option.value)}\">\n                                    <span class=\"ui-chkbox-icon ui-clickable\" [ngClass]=\"{'fa fa-check':isSelected(option.value)}\"></span>\n                                </div>\n                            </div>\n                            <label *ngIf=\"!itemTemplate\">{{option.label}}</label>\n                            <ng-template [pTemplateWrapper]=\"itemTemplate\" [item]=\"option\" [index]=\"i\" *ngIf=\"itemTemplate\"></ng-template>\n                        </li>\n                    </ul>\n                </div>\n            </div>\n        </div>\n    ",
        providers: [domhandler_1.DomHandler, objectutils_1.ObjectUtils, exports.MULTISELECT_VALUE_ACCESSOR]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, domhandler_1.DomHandler, core_1.Renderer2, core_1.IterableDiffers, objectutils_1.ObjectUtils, core_1.ChangeDetectorRef])
], MultiSelect);
exports.MultiSelect = MultiSelect;
var MultiSelectModule = (function () {
    function MultiSelectModule() {
    }
    return MultiSelectModule;
}());
MultiSelectModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, shared_1.SharedModule],
        exports: [MultiSelect, shared_1.SharedModule],
        declarations: [MultiSelect]
    })
], MultiSelectModule);
exports.MultiSelectModule = MultiSelectModule;
//# sourceMappingURL=multiselect.js.map