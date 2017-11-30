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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var animations_1 = require("@angular/animations");
var common_1 = require("@angular/common");
var domhandler_1 = require("../dom/domhandler");
var shared_1 = require("../common/shared");
var shared_2 = require("../common/shared");
var OrganizationChartNodeTemplateLoader = (function () {
    function OrganizationChartNodeTemplateLoader(viewContainer) {
        this.viewContainer = viewContainer;
    }
    OrganizationChartNodeTemplateLoader.prototype.ngOnInit = function () {
        this.view = this.viewContainer.createEmbeddedView(this.template, {
            '\$implicit': this.node
        });
    };
    OrganizationChartNodeTemplateLoader.prototype.ngOnDestroy = function () {
        this.view.destroy();
    };
    return OrganizationChartNodeTemplateLoader;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], OrganizationChartNodeTemplateLoader.prototype, "node", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", core_1.TemplateRef)
], OrganizationChartNodeTemplateLoader.prototype, "template", void 0);
OrganizationChartNodeTemplateLoader = __decorate([
    core_1.Component({
        selector: 'p-organizationChartNodeTemplateLoader',
        template: ""
    }),
    __metadata("design:paramtypes", [core_1.ViewContainerRef])
], OrganizationChartNodeTemplateLoader);
exports.OrganizationChartNodeTemplateLoader = OrganizationChartNodeTemplateLoader;
var OrganizationChartNode = (function () {
    function OrganizationChartNode(chart) {
        this.chart = chart;
    }
    Object.defineProperty(OrganizationChartNode.prototype, "leaf", {
        get: function () {
            return this.node.leaf == false ? false : !(this.node.children && this.node.children.length);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrganizationChartNode.prototype, "colspan", {
        get: function () {
            return (this.node.children && this.node.children.length) ? this.node.children.length * 2 : null;
        },
        enumerable: true,
        configurable: true
    });
    OrganizationChartNode.prototype.onNodeClick = function (event, node) {
        this.chart.onNodeClick(event, node);
    };
    OrganizationChartNode.prototype.toggleNode = function (event, node) {
        node.expanded = !node.expanded;
        event.preventDefault();
    };
    OrganizationChartNode.prototype.isSelected = function () {
        return this.chart.isSelected(this.node);
    };
    return OrganizationChartNode;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], OrganizationChartNode.prototype, "node", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], OrganizationChartNode.prototype, "root", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], OrganizationChartNode.prototype, "first", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], OrganizationChartNode.prototype, "last", void 0);
OrganizationChartNode = __decorate([
    core_1.Component({
        selector: '[pOrganizationChartNode]',
        template: "\n        <tr *ngIf=\"node\">\n            <td [attr.colspan]=\"colspan\">\n                <div class=\"ui-organizationchart-node-content ui-widget-content ui-corner-all {{node.styleClass}}\" \n                    [ngClass]=\"{'ui-organizationchart-selectable-node': chart.selectionMode && node.selectable !== false,'ui-state-highlight':isSelected()}\"\n                    (click)=\"onNodeClick($event,node)\">\n                    <div *ngIf=\"!chart.getTemplateForNode(node)\">{{node.label}}</div>\n                    <div *ngIf=\"chart.getTemplateForNode(node)\">\n                        <p-organizationChartNodeTemplateLoader [node]=\"node\" [template]=\"chart.getTemplateForNode(node)\"></p-organizationChartNodeTemplateLoader>\n                    </div>\n                    <a *ngIf=\"!leaf\" href=\"#\" class=\"ui-node-toggler\" (click)=\"toggleNode($event, node)\">\n                        <i class=\"fa ui-node-toggler-icon\" [ngClass]=\"{'fa-chevron-down': node.expanded, 'fa-chevron-up': !node.expanded}\"></i>\n                    </a>\n                </div>\n            </td>\n        </tr>\n        <tr [style.visibility]=\"!leaf&&node.expanded ? 'inherit' : 'hidden'\" class=\"ui-organizationchart-lines\" [@childState]=\"'in'\">\n            <td [attr.colspan]=\"colspan\">\n                <div class=\"ui-organizationchart-line-down\"></div>\n            </td>\n        </tr>\n        <tr [style.visibility]=\"!leaf&&node.expanded ? 'inherit' : 'hidden'\" class=\"ui-organizationchart-lines\" [@childState]=\"'in'\">\n            <ng-template ngFor let-child [ngForOf]=\"node.children\" let-first=\"first\" let-last=\"last\">\n                <td class=\"ui-organizationchart-line-left\" [ngClass]=\"{'ui-organizationchart-line-top':!first}\">&nbsp;</td>\n                <td class=\"ui-organizationchart-line-right\" [ngClass]=\"{'ui-organizationchart-line-top':!last}\">&nbsp;</td>\n            </ng-template>\n        </tr>\n        <tr [style.visibility]=\"!leaf&&node.expanded ? 'inherit' : 'hidden'\" class=\"ui-organizationchart-nodes\" [@childState]=\"'in'\">\n            <td *ngFor=\"let child of node.children\" colspan=\"2\">\n                <table class=\"ui-organizationchart-table\" pOrganizationChartNode [node]=\"child\"></table>\n            </td>\n        </tr>\n    ",
        animations: [
            animations_1.trigger('childState', [
                animations_1.state('in', animations_1.style({ opacity: 1 })),
                animations_1.transition('void => *', [
                    animations_1.style({ opacity: 0 }),
                    animations_1.animate(150)
                ]),
                animations_1.transition('* => void', [
                    animations_1.animate(150, animations_1.style({ opacity: 0 }))
                ])
            ])
        ],
    }),
    __param(0, core_1.Inject(core_1.forwardRef(function () { return OrganizationChart; }))),
    __metadata("design:paramtypes", [OrganizationChart])
], OrganizationChartNode);
exports.OrganizationChartNode = OrganizationChartNode;
var OrganizationChart = (function () {
    function OrganizationChart(el, domHandler) {
        this.el = el;
        this.domHandler = domHandler;
        this.selectionChange = new core_1.EventEmitter();
        this.onNodeSelect = new core_1.EventEmitter();
        this.onNodeUnselect = new core_1.EventEmitter();
    }
    Object.defineProperty(OrganizationChart.prototype, "root", {
        get: function () {
            return this.value && this.value.length ? this.value[0] : null;
        },
        enumerable: true,
        configurable: true
    });
    OrganizationChart.prototype.ngAfterContentInit = function () {
        var _this = this;
        if (this.templates.length) {
            this.templateMap = {};
        }
        this.templates.forEach(function (item) {
            _this.templateMap[item.getType()] = item.template;
        });
    };
    OrganizationChart.prototype.getTemplateForNode = function (node) {
        if (this.templateMap)
            return node.type ? this.templateMap[node.type] : this.templateMap['default'];
        else
            return null;
    };
    OrganizationChart.prototype.onNodeClick = function (event, node) {
        var eventTarget = event.target;
        if (eventTarget.className && (eventTarget.className.indexOf('ui-node-toggler') !== -1 || eventTarget.className.indexOf('ui-node-toggler-icon') !== -1)) {
            return;
        }
        else if (this.selectionMode) {
            if (node.selectable === false) {
                return;
            }
            var index_1 = this.findIndexInSelection(node);
            var selected = (index_1 >= 0);
            if (this.selectionMode === 'single') {
                if (selected) {
                    this.selection = null;
                    this.onNodeUnselect.emit({ originalEvent: event, node: node });
                }
                else {
                    this.selection = node;
                    this.onNodeSelect.emit({ originalEvent: event, node: node });
                }
            }
            else if (this.selectionMode === 'multiple') {
                if (selected) {
                    this.selection = this.selection.filter(function (val, i) { return i != index_1; });
                    this.onNodeUnselect.emit({ originalEvent: event, node: node });
                }
                else {
                    this.selection = (this.selection || []).concat([node]);
                    this.onNodeSelect.emit({ originalEvent: event, node: node });
                }
            }
            this.selectionChange.emit(this.selection);
        }
    };
    OrganizationChart.prototype.findIndexInSelection = function (node) {
        var index = -1;
        if (this.selectionMode && this.selection) {
            if (this.selectionMode === 'single') {
                index = (this.selection == node) ? 0 : -1;
            }
            else if (this.selectionMode === 'multiple') {
                for (var i = 0; i < this.selection.length; i++) {
                    if (this.selection[i] == node) {
                        index = i;
                        break;
                    }
                }
            }
        }
        return index;
    };
    OrganizationChart.prototype.isSelected = function (node) {
        return this.findIndexInSelection(node) != -1;
    };
    return OrganizationChart;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], OrganizationChart.prototype, "value", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], OrganizationChart.prototype, "style", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], OrganizationChart.prototype, "styleClass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], OrganizationChart.prototype, "selectionMode", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], OrganizationChart.prototype, "selection", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], OrganizationChart.prototype, "selectionChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], OrganizationChart.prototype, "onNodeSelect", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], OrganizationChart.prototype, "onNodeUnselect", void 0);
__decorate([
    core_1.ContentChildren(shared_2.PrimeTemplate),
    __metadata("design:type", core_1.QueryList)
], OrganizationChart.prototype, "templates", void 0);
OrganizationChart = __decorate([
    core_1.Component({
        selector: 'p-organizationChart',
        template: "\n        <div [ngStyle]=\"style\" [class]=\"styleClass\" [ngClass]=\"'ui-organizationchart ui-widget'\">\n            <table class=\"ui-organizationchart-table\" pOrganizationChartNode [node]=\"root\" *ngIf=\"root\"></table>\n        </div>\n    ",
        providers: [domhandler_1.DomHandler]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, domhandler_1.DomHandler])
], OrganizationChart);
exports.OrganizationChart = OrganizationChart;
var OrganizationChartModule = (function () {
    function OrganizationChartModule() {
    }
    return OrganizationChartModule;
}());
OrganizationChartModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        exports: [OrganizationChart, shared_1.SharedModule],
        declarations: [OrganizationChart, OrganizationChartNode, OrganizationChartNodeTemplateLoader]
    })
], OrganizationChartModule);
exports.OrganizationChartModule = OrganizationChartModule;
//# sourceMappingURL=organizationchart.js.map