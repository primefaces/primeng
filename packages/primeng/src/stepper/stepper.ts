import { ChangeDetectionStrategy, Component, computed, contentChild, contentChildren, inject, input, model, NgModule, signal, ViewEncapsulation } from '@angular/core';

import { MotionOptions } from '@primeuix/motion';
import { uuid } from '@primeuix/utils';
import { SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { StepperPassThrough } from 'primeng/types/stepper';
import { transformToBoolean } from 'primeng/utils';
import { Step } from './step';
import { StepItem } from './step-item';
import { StepList } from './step-list';
import { StepPanel } from './step-panel';
import { StepPanels } from './step-panels';
import { StepperSeparator } from './stepper-separator';
import { STEPPER_INSTANCE } from './stepper-token';
import { StepperStyle } from './style/stepperstyle';

/**
 * Stepper is a component that streamlines a wizard-like workflow, organizing content into coherent steps and visually guiding users through a numbered progression in a multistep process.
 * @group Components
 */
@Component({
    selector: 'p-stepper',
    standalone: true,
    imports: [SharedModule, BindModule],
    template: ` <ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [StepperStyle, { provide: STEPPER_INSTANCE, useExisting: Stepper }, { provide: PARENT_INSTANCE, useExisting: Stepper }],
    host: {
        '[class]': 'cx("root")',
        '[attr.role]': '"tablist"',
        '[attr.id]': 'id()'
    },
    hostDirectives: [Bind]
})
export class Stepper extends BaseComponent<StepperPassThrough> {
    componentName = 'Stepper';

    $pcStepper: Stepper | undefined = inject(STEPPER_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    _componentStyle = inject(StepperStyle);

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
    /**
     * A model that can hold a numeric value or be undefined.
     * @defaultValue undefined
     * @group Props
     */
    value = model<number>();
    /**
     * A boolean variable that captures user input.
     * @defaultValue false
     * @group Props
     */
    linear = input(false, { transform: (v: unknown) => transformToBoolean(v) });
    /**
     * The motion options.
     * @group Props
     */
    motionOptions = input<MotionOptions | undefined>(undefined);

    computedMotionOptions = computed<MotionOptions>(() => {
        return {
            ...this.ptm('motion'),
            ...this.motionOptions()
        };
    });

    id = signal<string>(uuid('pn_id_'));

    stepItems = contentChildren(StepItem);

    steps = contentChildren(Step);

    stepList = contentChild(StepList);

    updateValue(value: number) {
        this.value.set(value);
    }

    isStepActive(value: number) {
        return this.value() === value;
    }
}

@NgModule({
    imports: [Stepper, StepList, StepPanels, StepPanel, StepItem, Step, StepperSeparator, SharedModule, BindModule],
    exports: [Stepper, StepList, StepPanels, StepPanel, StepItem, Step, StepperSeparator, SharedModule, BindModule]
})
export class StepperModule {}
