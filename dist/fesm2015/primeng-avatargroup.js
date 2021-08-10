import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

class AvatarGroup {
}
AvatarGroup.decorators = [
    { type: Component, args: [{
                selector: 'p-avatarGroup',
                template: `
        <div [ngClass]="'p-avatar-group p-component'" [class]="styleClass" [ngStyle]="style">
            <ng-content></ng-content>
        </div>
    `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [".p-avatar-group p-avatar+p-avatar{margin-left:-1rem}.p-avatar-group{align-items:center;display:flex}"]
            },] }
];
AvatarGroup.propDecorators = {
    styleClass: [{ type: Input }],
    style: [{ type: Input }]
};
class AvatarGroupModule {
}
AvatarGroupModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [AvatarGroup],
                declarations: [AvatarGroup]
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { AvatarGroup, AvatarGroupModule };
//# sourceMappingURL=primeng-avatargroup.js.map
