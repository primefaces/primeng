(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('chart.js')) :
    typeof define === 'function' && define.amd ? define('primeng/chart', ['exports', '@angular/core', '@angular/common', 'chart.js'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.chart = {}), global.ng.core, global.ng.common, global.Chart));
}(this, (function (exports, core, common, Chart) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () {
                            return e[k];
                        }
                    });
                }
            });
        }
        n['default'] = e;
        return Object.freeze(n);
    }

    var Chart__namespace = /*#__PURE__*/_interopNamespace(Chart);

    var UIChart = /** @class */ (function () {
        function UIChart(el) {
            this.el = el;
            this.plugins = [];
            this.responsive = true;
            this.onDataSelect = new core.EventEmitter();
            this._options = {};
        }
        Object.defineProperty(UIChart.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (val) {
                this._data = val;
                this.reinit();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UIChart.prototype, "options", {
            get: function () {
                return this._options;
            },
            set: function (val) {
                this._options = val;
                this.reinit();
            },
            enumerable: false,
            configurable: true
        });
        UIChart.prototype.ngAfterViewInit = function () {
            this.initChart();
            this.initialized = true;
        };
        UIChart.prototype.onCanvasClick = function (event) {
            if (this.chart) {
                var element = this.chart.getElementAtEvent(event);
                var dataset = this.chart.getDatasetAtEvent(event);
                if (element && element[0] && dataset) {
                    this.onDataSelect.emit({ originalEvent: event, element: element[0], dataset: dataset });
                }
            }
        };
        UIChart.prototype.initChart = function () {
            var opts = this.options || {};
            opts.responsive = this.responsive;
            // allows chart to resize in responsive mode
            if (opts.responsive && (this.height || this.width)) {
                opts.maintainAspectRatio = false;
            }
            this.chart = new Chart__namespace(this.el.nativeElement.children[0].children[0], {
                type: this.type,
                data: this.data,
                options: this.options,
                plugins: this.plugins
            });
        };
        UIChart.prototype.getCanvas = function () {
            return this.el.nativeElement.children[0].children[0];
        };
        UIChart.prototype.getBase64Image = function () {
            return this.chart.toBase64Image();
        };
        UIChart.prototype.generateLegend = function () {
            if (this.chart) {
                return this.chart.generateLegend();
            }
        };
        UIChart.prototype.refresh = function () {
            if (this.chart) {
                this.chart.update();
            }
        };
        UIChart.prototype.reinit = function () {
            if (this.chart) {
                this.chart.destroy();
                this.initChart();
            }
        };
        UIChart.prototype.ngOnDestroy = function () {
            if (this.chart) {
                this.chart.destroy();
                this.initialized = false;
                this.chart = null;
            }
        };
        return UIChart;
    }());
    UIChart.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-chart',
                    template: "\n        <div style=\"position:relative\" [style.width]=\"responsive && !width ? null : width\" [style.height]=\"responsive && !height ? null : height\">\n            <canvas [attr.width]=\"responsive && !width ? null : width\" [attr.height]=\"responsive && !height ? null : height\" (click)=\"onCanvasClick($event)\"></canvas>\n        </div>\n    ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None
                },] }
    ];
    UIChart.ctorParameters = function () { return [
        { type: core.ElementRef }
    ]; };
    UIChart.propDecorators = {
        type: [{ type: core.Input }],
        plugins: [{ type: core.Input }],
        width: [{ type: core.Input }],
        height: [{ type: core.Input }],
        responsive: [{ type: core.Input }],
        onDataSelect: [{ type: core.Output }],
        data: [{ type: core.Input }],
        options: [{ type: core.Input }]
    };
    var ChartModule = /** @class */ (function () {
        function ChartModule() {
        }
        return ChartModule;
    }());
    ChartModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule],
                    exports: [UIChart],
                    declarations: [UIChart]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.ChartModule = ChartModule;
    exports.UIChart = UIChart;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-chart.umd.js.map
