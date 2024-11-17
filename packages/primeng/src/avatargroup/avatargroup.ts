import { ChangeDetectionStrategy, Component, inject, input, NgModule, ViewEncapsulation } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { AvatarGroupStyle } from './style/avatargroupstyle';

/**
 * AvatarGroup is a helper component for Avatar.
 * @group Components
 */
@Component({
    selector: 'p-avatarGroup, p-avatar-group, p-avatargroup',
    standalone: true,
    imports: [SharedModule],
    template: ` <ng-content></ng-content> `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [AvatarGroupStyle],
    host: {
        '[class.p-avatar-group]': 'true',
        '[class.p-component]': 'true',
        '[class]': 'styleClass()',
        '[style]': 'style()'
    }
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
    imports: [AvatarGroup, SharedModule],
    exports: [AvatarGroup, SharedModule]
})
export class AvatarGroupModule {}
