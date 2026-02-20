import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { StepperSeparatorPassThrough } from 'primeng/types/stepper';
import { StepperStyle } from './style/stepperstyle';
import { STEPPERSEPARATOR_INSTANCE } from './stepper-token';

/**
 * StepperSeparator is a helper component for Stepper component used in vertical orientation.
 * @group Components
 */
@Component({
    selector: 'p-stepper-separator',
    standalone: true,
    imports: [BindModule],
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': 'cx("separator")'
    },
    providers: [StepperStyle, { provide: STEPPERSEPARATOR_INSTANCE, useExisting: StepperSeparator }, { provide: PARENT_INSTANCE, useExisting: StepperSeparator }],
    hostDirectives: [Bind]
})
export class StepperSeparator extends BaseComponent<StepperSeparatorPassThrough> {
    $pcStepperSeparator: StepperSeparator | undefined = inject(STEPPERSEPARATOR_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    componentName = 'StepperSeparator';

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    _componentStyle = inject(StepperStyle);
}
