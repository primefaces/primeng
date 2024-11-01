import { ChangeDetectionStrategy, Component, inject, input, NgModule, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'primeng/basecomponent';
import { InputIconStyle } from './style/inputiconstyle';
import { SharedModule } from '../api/shared';

/**
 * InputIcon displays an icon.
 * @group Components
 */
@Component({
    selector: 'p-inputicon, p-inputIcon',
    standalone: true,
    imports: [SharedModule],
    template: `<ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [InputIconStyle],
    host: {
        '[class]': 'styleClass()',
        '[class.p-inputicon]': 'true',
    },
})
export class InputIcon extends BaseComponent {
    /**
     * Style class of the element.
     * @group Props
     */
    styleClass = input<string>();

    _componentStyle = inject(InputIconStyle);
}

@NgModule({
    imports: [InputIcon, SharedModule],
    exports: [InputIcon, SharedModule],
})
export class InputIconModule {}
