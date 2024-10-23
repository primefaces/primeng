import { ChangeDetectionStrategy, Component, inject, input, NgModule, ViewEncapsulation } from '@angular/core';
import { AvatarGroupStyle } from './style/avatargroupstyle';
import { BaseComponent } from 'primeng/basecomponent';

/**
 * AvatarGroup is a helper component for Avatar.
 * @group Components
 */
@Component({
    selector: 'p-avatarGroup, p-avatar-group, p-avatargroup',
    standalone: true,
    template: ` <ng-content></ng-content> `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [AvatarGroupStyle],
    host: {
        '[class.p-avatar-group]': 'true',
        '[class.p-component]': 'true',
        '[class]': 'styleClass()',
        '[style]': 'style()',
    },
})
export class AvatarGroup extends BaseComponent {
    /**
     * Style class of the component
     * @group Props
     */
    styleClass = input<string>();
    /**
     * Inline style of the component.
     * @group Props
     */
    style = input<{ [klass: string]: any } | null>();

    _componentStyle = inject(AvatarGroupStyle);
}

@NgModule({
    imports: [AvatarGroup],
    exports: [AvatarGroup],
})
export class AvatarGroupModule {}
