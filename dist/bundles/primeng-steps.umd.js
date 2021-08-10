(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/router')) :
    typeof define === 'function' && define.amd ? define('primeng/steps', ['exports', '@angular/core', '@angular/common', '@angular/router'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.steps = {}), global.ng.core, global.ng.common, global.ng.router));
}(this, (function (exports, core, common, router) { 'use strict';

    var Steps = /** @class */ (function () {
        function Steps(router, route, cd) {
            this.router = router;
            this.route = route;
            this.cd = cd;
            this.activeIndex = 0;
            this.readonly = true;
            this.activeIndexChange = new core.EventEmitter();
        }
        Steps.prototype.ngOnInit = function () {
            var _this = this;
            this.subscription = this.router.events.subscribe(function () { return _this.cd.markForCheck(); });
        };
        Steps.prototype.itemClick = function (event, item, i) {
            if (this.readonly || item.disabled) {
                event.preventDefault();
                return;
            }
            this.activeIndexChange.emit(i);
            if (!item.url) {
                event.preventDefault();
            }
            if (item.command) {
                item.command({
                    originalEvent: event,
                    item: item,
                    index: i
                });
            }
        };
        Steps.prototype.isClickableRouterLink = function (item) {
            return item.routerLink && !this.readonly && !item.disabled;
        };
        Steps.prototype.isActive = function (item, index) {
            if (item.routerLink)
                return this.router.isActive(item.routerLink, false) || this.router.isActive(this.router.createUrlTree([item.routerLink], { relativeTo: this.route }).toString(), false);
            else
                return index === this.activeIndex;
        };
        Steps.prototype.ngOnDestroy = function () {
            this.subscription.unsubscribe();
        };
        return Steps;
    }());
    Steps.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-steps',
                    template: "\n        <div [ngClass]=\"{'p-steps p-component':true,'p-readonly':readonly}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <ul role=\"tablist\">\n                <li *ngFor=\"let item of model; let i = index\" class=\"p-steps-item\" #menuitem [ngStyle]=\"item.style\" [class]=\"item.styleClass\" role=\"tab\" [attr.aria-selected]=\"i === activeIndex\" [attr.aria-expanded]=\"i === activeIndex\"\n                    [ngClass]=\"{'p-highlight p-steps-current': isActive(item, i), 'p-disabled': item.disabled || (readonly && !isActive(item, i))}\">\n                    <a *ngIf=\"isClickableRouterLink(item); else elseBlock\" [routerLink]=\"item.routerLink\" [queryParams]=\"item.queryParams\" role=\"presentation\" [routerLinkActive]=\"'p-menuitem-link-active'\" [routerLinkActiveOptions]=\"item.routerLinkActiveOptions||{exact:false}\" class=\"p-menuitem-link\" \n                        (click)=\"itemClick($event, item, i)\" (keydown.enter)=\"itemClick($event, item, i)\" [attr.target]=\"item.target\" [attr.id]=\"item.id\" [attr.tabindex]=\"item.disabled || readonly ? null : (item.tabindex ? item.tabindex : '0')\"\n                        [fragment]=\"item.fragment\" [queryParamsHandling]=\"item.queryParamsHandling\" [preserveFragment]=\"item.preserveFragment\" [skipLocationChange]=\"item.skipLocationChange\" [replaceUrl]=\"item.replaceUrl\" [state]=\"item.state\">\n                        <span class=\"p-steps-number\">{{i + 1}}</span>\n                        <span class=\"p-steps-title\" *ngIf=\"item.escape !== false; else htmlLabel\">{{item.label}}</span>\n                        <ng-template #htmlLabel><span class=\"p-steps-title\" [innerHTML]=\"item.label\"></span></ng-template>\n                    </a>\n                    <ng-template #elseBlock>\n                        <a [attr.href]=\"item.url\" class=\"p-menuitem-link\" role=\"presentation\" (click)=\"itemClick($event, item, i)\" (keydown.enter)=\"itemClick($event, item, i)\" [attr.target]=\"item.target\" [attr.id]=\"item.id\" \n                            [attr.tabindex]=\"item.disabled||(i !== activeIndex && readonly) ? null : (item.tabindex ? item.tabindex : '0')\">\n                            <span class=\"p-steps-number\">{{i + 1}}</span>\n                            <span class=\"p-steps-title\" *ngIf=\"item.escape !== false; else htmlRouteLabel\">{{item.label}}</span>\n                            <ng-template #htmlRouteLabel><span class=\"p-steps-title\" [innerHTML]=\"item.label\"></span></ng-template>\n                        </a>\n                    </ng-template>\n                </li>\n            </ul>\n        </div>\n    ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".p-steps{position:relative}.p-steps ul{display:flex;list-style-type:none;margin:0;padding:0}.p-steps-item{display:flex;flex:1 1 auto;justify-content:center;position:relative}.p-steps-item .p-menuitem-link{align-items:center;display:inline-flex;flex-direction:column;overflow:hidden;text-decoration:none}.p-steps.p-steps-readonly .p-steps-item{cursor:auto}.p-steps-item.p-steps-current .p-menuitem-link{cursor:default}.p-steps-title{white-space:nowrap}.p-steps-number{align-items:center;display:flex;justify-content:center}.p-steps-title{display:block}"]
                },] }
    ];
    Steps.ctorParameters = function () { return [
        { type: router.Router },
        { type: router.ActivatedRoute },
        { type: core.ChangeDetectorRef }
    ]; };
    Steps.propDecorators = {
        activeIndex: [{ type: core.Input }],
        model: [{ type: core.Input }],
        readonly: [{ type: core.Input }],
        style: [{ type: core.Input }],
        styleClass: [{ type: core.Input }],
        activeIndexChange: [{ type: core.Output }]
    };
    var StepsModule = /** @class */ (function () {
        function StepsModule() {
        }
        return StepsModule;
    }());
    StepsModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule, router.RouterModule],
                    exports: [Steps, router.RouterModule],
                    declarations: [Steps]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Steps = Steps;
    exports.StepsModule = StepsModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-steps.umd.js.map
