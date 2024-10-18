import { NgModule, Component, ChangeDetectionStrategy, ViewEncapsulation, Input, HostBinding, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarGroupStyle } from './style/avatargroupstyle';
import { BaseComponent } from 'primeng/basecomponent';
import { styleClassAttribute } from "primeng/base";
/**
 * AvatarGroup is a helper component for Avatar.
 * @group Components
 */
@Component({
    selector: 'p-avatarGroup, p-avatar-group, p-avatargroup',
    template: ` <ng-content></ng-content> `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [AvatarGroupStyle],
    host: {
        '[class.p-avatar-group]': 'true',
        '[class.p-component]': 'true',
    },
})
export class AvatarGroup extends BaseComponent {
    /**
     * Style class of the component
     * @group Props
     */
    @Input({ transform: styleClassAttribute }) styleClass: string | undefined;
    /**
     * Inline style of the component.
     * @group Props
     */
    @Input() style: { [klass: string]: any } | null | undefined;

    @HostBinding('class') get hostClass() {
        return this.styleClass;
    }

    @HostBinding('style') get hostStyle() {
        return this.style;
    }

    _componentStyle = inject(AvatarGroupStyle);
}

@NgModule({
    imports: [CommonModule],
    exports: [AvatarGroup],
    declarations: [AvatarGroup],
})
export class AvatarGroupModule {}
