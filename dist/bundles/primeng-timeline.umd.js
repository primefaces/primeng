(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/api')) :
    typeof define === 'function' && define.amd ? define('primeng/timeline', ['exports', '@angular/core', '@angular/common', 'primeng/api'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.timeline = {}), global.ng.core, global.ng.common, global.primeng.api));
}(this, (function (exports, core, common, api) { 'use strict';

    var Timeline = /** @class */ (function () {
        function Timeline(el) {
            this.el = el;
            this.align = 'left';
            this.layout = 'vertical';
        }
        Timeline.prototype.getBlockableElement = function () {
            return this.el.nativeElement.children[0];
        };
        Timeline.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'content':
                        _this.contentTemplate = item.template;
                        break;
                    case 'opposite':
                        _this.oppositeTemplate = item.template;
                        break;
                    case 'marker':
                        _this.markerTemplate = item.template;
                        break;
                }
            });
        };
        return Timeline;
    }());
    Timeline.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-timeline',
                    template: "\n        <div [class]=\"styleClass\" [ngStyle]=\"style\" [ngClass]=\"{'p-timeline p-component': true, \n                'p-timeline-left': align === 'left',\n                'p-timeline-right': align === 'right',\n                'p-timeline-top': align === 'top',\n                'p-timeline-bottom': align === 'bottom',\n                'p-timeline-alternate': align === 'alternate',\n                'p-timeline-vertical': layout === 'vertical',\n                'p-timeline-horizontal': layout === 'horizontal'}\">\n            <div *ngFor=\"let event of value; let last=last\" class=\"p-timeline-event\">\n                <div class=\"p-timeline-event-opposite\">\n                    <ng-container *ngTemplateOutlet=\"oppositeTemplate; context: {$implicit: event}\"></ng-container>\n                </div>\n                <div class=\"p-timeline-event-separator\">\n                    <ng-container *ngIf=\"markerTemplate; else marker\">\n                        <ng-container *ngTemplateOutlet=\"markerTemplate; context: {$implicit: event}\"></ng-container>\n                    </ng-container>\n                    <ng-template #marker>\n                        <div class=\"p-timeline-event-marker\"></div>\n                    </ng-template>\n                    <div *ngIf=\"!last\" class=\"p-timeline-event-connector\"></div>\n                </div>\n                <div class=\"p-timeline-event-content\">\n                    <ng-container *ngTemplateOutlet=\"contentTemplate; context: {$implicit: event}\"></ng-container>\n                </div>\n            </div>\n        </div>\n    ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".p-timeline{display:flex;flex-direction:column;flex-grow:1}.p-timeline-left .p-timeline-event-opposite{text-align:right}.p-timeline-left .p-timeline-event-content{text-align:left}.p-timeline-right .p-timeline-event{flex-direction:row-reverse}.p-timeline-right .p-timeline-event-opposite{text-align:left}.p-timeline-right .p-timeline-event-content{text-align:right}.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(2n){flex-direction:row-reverse}.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(odd) .p-timeline-event-opposite{text-align:right}.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(2n) .p-timeline-event-opposite,.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(odd) .p-timeline-event-content{text-align:left}.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(2n) .p-timeline-event-content{text-align:right}.p-timeline-event{display:flex;min-height:70px;position:relative}.p-timeline-event:last-child{min-height:0}.p-timeline-event-content,.p-timeline-event-opposite{flex:1;padding:0 1rem}.p-timeline-event-separator{align-items:center;display:flex;flex:0;flex-direction:column}.p-timeline-event-marker{align-self:baseline;display:flex}.p-timeline-event-connector{flex-grow:1}.p-timeline-horizontal{flex-direction:row}.p-timeline-horizontal .p-timeline-event{flex:1;flex-direction:column}.p-timeline-horizontal .p-timeline-event:last-child{flex:0}.p-timeline-horizontal .p-timeline-event-separator{flex-direction:row}.p-timeline-horizontal .p-timeline-event-connector{width:100%}.p-timeline-bottom .p-timeline-event,.p-timeline-horizontal.p-timeline-alternate .p-timeline-event:nth-child(2n){flex-direction:column-reverse}"]
                },] }
    ];
    Timeline.ctorParameters = function () { return [
        { type: core.ElementRef }
    ]; };
    Timeline.propDecorators = {
        value: [{ type: core.Input }],
        style: [{ type: core.Input }],
        styleClass: [{ type: core.Input }],
        align: [{ type: core.Input }],
        layout: [{ type: core.Input }],
        templates: [{ type: core.ContentChildren, args: [api.PrimeTemplate,] }]
    };
    var TimelineModule = /** @class */ (function () {
        function TimelineModule() {
        }
        return TimelineModule;
    }());
    TimelineModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule],
                    exports: [Timeline, api.SharedModule],
                    declarations: [Timeline]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Timeline = Timeline;
    exports.TimelineModule = TimelineModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-timeline.umd.js.map
