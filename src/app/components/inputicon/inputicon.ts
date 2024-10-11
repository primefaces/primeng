import { ChangeDetectionStrategy, Component, inject, input, NgModule, ViewEncapsulation } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { InputIconStyle } from './style/inputiconstyle';

/**
 * InputIcon displays an icon.
 * @group Components
 */
@Component({
    selector: 'p-inputicon, p-inputIcon',
    template: `<ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [InputIconStyle],
    host:{
        '[class]': 'styleClass()',
        '[class.p-inputicon]': 'true',
    }
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
    imports: [],
    exports: [InputIcon, SharedModule],
    declarations: [InputIcon],
})
export class InputIconModule {}
