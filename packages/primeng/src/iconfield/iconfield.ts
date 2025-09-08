import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, inject, Input, NgModule, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'primeng/basecomponent';
import { IconFieldStyle } from './style/iconfieldstyle';

/**
 * IconField wraps an input and an icon.
 * @group Components
 */
@Component({
    selector: 'p-iconfield, p-iconField, p-icon-field',
    standalone: true,
    imports: [CommonModule],
    template: ` <ng-content></ng-content>`,
    providers: [IconFieldStyle],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class]': "cn(cx('root'), styleClass)"
    }
})
export class IconField extends BaseComponent {
    /**
     * Position of the icon.
     * @group Props
     */
    @Input() iconPosition: 'right' | 'left' = 'left';
    /**
     * Style class of the component.
     * @deprecated since v20.0.0, use `class` instead.
     * @group Props
     */
    @Input() styleClass: string;

    _componentStyle = inject(IconFieldStyle);
}

@NgModule({
    imports: [IconField],
    exports: [IconField]
})
export class IconFieldModule {}
