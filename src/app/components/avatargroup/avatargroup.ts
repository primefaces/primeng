import { NgModule, Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'p-avatarGroup',
    template: `
        <div [ngClass]="'p-avatar-group p-component'" [class]="styleClass" [ngStyle]="style">
            <ng-content></ng-content>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./avatargroup.css'],
    host: {
        class: 'p-element'
    }
})
export class AvatarGroup {
    /**
     * Style class of the component
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Inline style of the component.
     * @group Props
     */
    @Input() style: { [klass: string]: any } | null | undefined;
}

@NgModule({
    imports: [CommonModule],
    exports: [AvatarGroup],
    declarations: [AvatarGroup]
})
export class AvatarGroupModule {}
