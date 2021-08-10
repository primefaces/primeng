import { Directive, ElementRef, Input, Component, ChangeDetectionStrategy, ViewEncapsulation, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { UniqueComponentId } from 'primeng/utils';

class BadgeDirective {
    constructor(el) {
        this.el = el;
        this.iconPos = 'left';
    }
    ngAfterViewInit() {
        this.id = UniqueComponentId() + '_badge';
        let el = this.el.nativeElement.nodeName.indexOf("-") != -1 ? this.el.nativeElement.firstChild : this.el.nativeElement;
        let badge = document.createElement('span');
        badge.id = this.id;
        badge.className = 'p-badge p-component';
        if (this.severity) {
            DomHandler.addClass(badge, 'p-badge-' + this.severity);
        }
        if (this.value != null) {
            badge.appendChild(document.createTextNode(this.value));
            if (String(this.value).length === 1) {
                DomHandler.addClass(badge, 'p-badge-no-gutter');
            }
        }
        else {
            DomHandler.addClass(badge, 'p-badge-dot');
        }
        DomHandler.addClass(el, 'p-overlay-badge');
        el.appendChild(badge);
        this.initialized = true;
    }
    get value() {
        return this._value;
    }
    set value(val) {
        if (val !== this._value) {
            this._value = val;
            if (this.initialized) {
                let badge = document.getElementById(this.id);
                if (this._value) {
                    if (DomHandler.hasClass(badge, 'p-badge-dot'))
                        DomHandler.removeClass(badge, 'p-badge-dot');
                    if (String(this._value).length === 1) {
                        DomHandler.addClass(badge, 'p-badge-no-gutter');
                    }
                    else {
                        DomHandler.removeClass(badge, 'p-badge-no-gutter');
                    }
                }
                else if (!this._value && !DomHandler.hasClass(badge, 'p-badge-dot')) {
                    DomHandler.addClass(badge, 'p-badge-dot');
                }
                badge.innerHTML = '';
                badge.appendChild(document.createTextNode(this._value));
            }
        }
    }
    ngOnDestroy() {
        this.initialized = false;
    }
}
BadgeDirective.decorators = [
    { type: Directive, args: [{
                selector: '[pBadge]'
            },] }
];
BadgeDirective.ctorParameters = () => [
    { type: ElementRef }
];
BadgeDirective.propDecorators = {
    iconPos: [{ type: Input }],
    value: [{ type: Input }],
    severity: [{ type: Input }]
};
class Badge {
    containerClass() {
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
    }
}
Badge.decorators = [
    { type: Component, args: [{
                selector: 'p-badge',
                template: `
        <span [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style">
                {{value}}
        </span>
    `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [".p-badge{border-radius:10px;display:inline-block;padding:0 .5rem;text-align:center}.p-overlay-badge{position:relative}.p-overlay-badge .p-badge{margin:0;position:absolute;right:0;top:0;transform:translate(50%,-50%);transform-origin:100% 0}.p-badge-dot{height:.5rem;min-width:.5rem;width:.5rem}.p-badge-dot,.p-badge-no-gutter{border-radius:50%;padding:0}"]
            },] }
];
Badge.propDecorators = {
    styleClass: [{ type: Input }],
    style: [{ type: Input }],
    size: [{ type: Input }],
    severity: [{ type: Input }],
    value: [{ type: Input }]
};
class BadgeModule {
}
BadgeModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [Badge, BadgeDirective, SharedModule],
                declarations: [Badge, BadgeDirective]
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { Badge, BadgeDirective, BadgeModule };
//# sourceMappingURL=primeng-badge.js.map
