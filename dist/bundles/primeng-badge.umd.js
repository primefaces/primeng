(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/api'), require('primeng/dom'), require('primeng/utils')) :
    typeof define === 'function' && define.amd ? define('primeng/badge', ['exports', '@angular/core', '@angular/common', 'primeng/api', 'primeng/dom', 'primeng/utils'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.badge = {}), global.ng.core, global.ng.common, global.primeng.api, global.primeng.dom, global.primeng.utils));
}(this, (function (exports, core, common, api, dom, utils) { 'use strict';

    var BadgeDirective = /** @class */ (function () {
        function BadgeDirective(el) {
            this.el = el;
            this.iconPos = 'left';
        }
        BadgeDirective.prototype.ngAfterViewInit = function () {
            this.id = utils.UniqueComponentId() + '_badge';
            var el = this.el.nativeElement.nodeName.indexOf("-") != -1 ? this.el.nativeElement.firstChild : this.el.nativeElement;
            var badge = document.createElement('span');
            badge.id = this.id;
            badge.className = 'p-badge p-component';
            if (this.severity) {
                dom.DomHandler.addClass(badge, 'p-badge-' + this.severity);
            }
            if (this.value != null) {
                badge.appendChild(document.createTextNode(this.value));
                if (String(this.value).length === 1) {
                    dom.DomHandler.addClass(badge, 'p-badge-no-gutter');
                }
            }
            else {
                dom.DomHandler.addClass(badge, 'p-badge-dot');
            }
            dom.DomHandler.addClass(el, 'p-overlay-badge');
            el.appendChild(badge);
            this.initialized = true;
        };
        Object.defineProperty(BadgeDirective.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (val) {
                if (val !== this._value) {
                    this._value = val;
                    if (this.initialized) {
                        var badge = document.getElementById(this.id);
                        if (this._value) {
                            if (dom.DomHandler.hasClass(badge, 'p-badge-dot'))
                                dom.DomHandler.removeClass(badge, 'p-badge-dot');
                            if (String(this._value).length === 1) {
                                dom.DomHandler.addClass(badge, 'p-badge-no-gutter');
                            }
                            else {
                                dom.DomHandler.removeClass(badge, 'p-badge-no-gutter');
                            }
                        }
                        else if (!this._value && !dom.DomHandler.hasClass(badge, 'p-badge-dot')) {
                            dom.DomHandler.addClass(badge, 'p-badge-dot');
                        }
                        badge.innerHTML = '';
                        badge.appendChild(document.createTextNode(this._value));
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        BadgeDirective.prototype.ngOnDestroy = function () {
            this.initialized = false;
        };
        return BadgeDirective;
    }());
    BadgeDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[pBadge]'
                },] }
    ];
    BadgeDirective.ctorParameters = function () { return [
        { type: core.ElementRef }
    ]; };
    BadgeDirective.propDecorators = {
        iconPos: [{ type: core.Input }],
        value: [{ type: core.Input }],
        severity: [{ type: core.Input }]
    };
    var Badge = /** @class */ (function () {
        function Badge() {
        }
        Badge.prototype.containerClass = function () {
            return {
                'p-badge p-component': true,
                'p-badge-no-gutter': this.value && String(this.value).length === 1,
                'p-badge-lg': this.size === 'large',
                'p-badge-xl': this.size === 'xlarge',
                'p-badge-info': this.severity === 'info',
                'p-badge-success': this.severity === 'success',
                'p-badge-warning': this.severity === 'warning',
                'p-badge-danger': this.severity === 'danger'
            };
        };
        return Badge;
    }());
    Badge.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-badge',
                    template: "\n        <span [ngClass]=\"containerClass()\" [class]=\"styleClass\" [ngStyle]=\"style\">\n                {{value}}\n        </span>\n    ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".p-badge{border-radius:10px;display:inline-block;padding:0 .5rem;text-align:center}.p-overlay-badge{position:relative}.p-overlay-badge .p-badge{margin:0;position:absolute;right:0;top:0;transform:translate(50%,-50%);transform-origin:100% 0}.p-badge-dot{height:.5rem;min-width:.5rem;width:.5rem}.p-badge-dot,.p-badge-no-gutter{border-radius:50%;padding:0}"]
                },] }
    ];
    Badge.propDecorators = {
        styleClass: [{ type: core.Input }],
        style: [{ type: core.Input }],
        size: [{ type: core.Input }],
        severity: [{ type: core.Input }],
        value: [{ type: core.Input }]
    };
    var BadgeModule = /** @class */ (function () {
        function BadgeModule() {
        }
        return BadgeModule;
    }());
    BadgeModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule],
                    exports: [Badge, BadgeDirective, api.SharedModule],
                    declarations: [Badge, BadgeDirective]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Badge = Badge;
    exports.BadgeDirective = BadgeDirective;
    exports.BadgeModule = BadgeModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-badge.umd.js.map
