import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

class Tag {
    containerClass() {
        return {
            'p-tag p-component': true,
            'p-tag-info': this.severity === 'info',
            'p-tag-success': this.severity === 'success',
            'p-tag-warning': this.severity === 'warning',
            'p-tag-danger': this.severity === 'danger',
            'p-tag-rounded': this.rounded
        };
    }
}
Tag.decorators = [
    { type: Component, args: [{
                selector: 'p-tag',
                template: `
        <span [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style">
            <ng-content></ng-content>
            <span class="p-tag-icon" [ngClass]="icon" *ngIf="icon"></span>
            <span class="p-tag-value">{{value}}</span>
        </span>
    `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [".p-tag{align-items:center;display:inline-flex;justify-content:center}.p-tag-icon,.p-tag-icon.pi,.p-tag-value{line-height:1.5}.p-tag.p-tag-rounded{border-radius:10rem}"]
            },] }
];
Tag.propDecorators = {
    styleClass: [{ type: Input }],
    style: [{ type: Input }],
    severity: [{ type: Input }],
    value: [{ type: Input }],
    icon: [{ type: Input }],
    rounded: [{ type: Input }]
};
class TagModule {
}
TagModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [Tag],
                declarations: [Tag]
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { Tag, TagModule };
//# sourceMappingURL=primeng-tag.js.map
