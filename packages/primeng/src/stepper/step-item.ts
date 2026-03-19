import { ChangeDetectionStrategy, Component, computed, contentChild, effect, inject, model, ViewEncapsulation } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { StepItemPassThrough } from 'primeng/types/stepper';
import { Step } from './step';
import { StepPanel } from './step-panel';
import type { Stepper } from './stepper';
import { STEPPER_INSTANCE, STEPITEM_INSTANCE } from './stepper-token';
import { StepItemStyle } from './style/stepitemstyle';

/**
 * StepItem is a helper component for Stepper component used in vertical orientation.
 * @group Components
 */
@Component({
    selector: 'p-step-item',
    standalone: true,
    imports: [BindModule],
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': 'cx("root")',
        '[attr.data-p-active]': 'isActive()'
    },
    providers: [StepItemStyle, { provide: STEPITEM_INSTANCE, useExisting: StepItem }, { provide: PARENT_INSTANCE, useExisting: StepItem }],
    hostDirectives: [Bind]
})
export class StepItem extends BaseComponent<StepItemPassThrough> {
    $pcStepItem: StepItem | undefined = inject(STEPITEM_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    componentName = 'StepItem';

    _componentStyle = inject(StepItemStyle);

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    pcStepper = inject<Stepper>(STEPPER_INSTANCE);
    /**
     * Value of step.
     * @defaultValue undefined
     * @group Props
     */
    value = model<number>();

    isActive = computed(() => this.pcStepper.value() === this.value());

    step = contentChild(Step, { descendants: false });

    stepPanel = contentChild(StepPanel, { descendants: false });

    constructor() {
        super();
        effect(() => {
            this.step()?.value.set(this.value());
        });

        effect(() => {
            this.stepPanel()?.value.set(this.value());
        });
    }
}
