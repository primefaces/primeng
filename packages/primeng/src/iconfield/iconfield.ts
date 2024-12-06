import { ChangeDetectionStrategy, Component, inject, input, NgModule, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'primeng/basecomponent';
import { IconFieldStyle } from './style/iconfieldstyle';

/**
 * IconField wraps an input and an icon.
 * @group Components
 */
@Component({
    selector: 'p-iconfield, p-iconField, p-icon-field',
    standalone: true,
    template: ` <ng-content></ng-content>`,
    providers: [IconFieldStyle],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class]': 'styleClass()',
        '[class.p-iconfield]': 'true',
        '[class.p-iconfield-left]': 'iconPosition() === "left"',
        '[class.p-iconfield-right]': 'iconPosition() === "right"'
    }
})
export class IconField extends BaseComponent {
    /**
     * Position of the icon.
     * @group Props
     */
    iconPosition = input<'right' | 'left'>('left');
    /**
     * Style class of the component.
     * @group Props
     */
    styleClass = input<string>();

    _componentStyle = inject(IconFieldStyle);
}

@NgModule({
    imports: [IconField],
    exports: [IconField]
})
export class IconFieldModule {}
