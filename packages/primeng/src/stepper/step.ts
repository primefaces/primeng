import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, contentChild, inject, input, model, TemplateRef, ViewEncapsulation } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { StepContentTemplateContext, StepPassThrough } from 'primeng/types/stepper';
import { transformToBoolean } from 'primeng/utils';
import type { Stepper } from './stepper';
import { StepperSeparator } from './stepper-separator';
import { STEPPER_INSTANCE, STEP_INSTANCE } from './stepper-token';
import { StepStyle } from './style/stepstyle';

/**
 * Step is a helper component for Stepper component.
 * @group Components
 */
@Component({
    selector: 'p-step',
    standalone: true,
    imports: [NgTemplateOutlet, StepperSeparator, SharedModule, BindModule],
    template: `
        @if (!content()) {
            <button [attr.id]="id()" [class]="cx('header')" [pBind]="ptm('header')" [attr.role]="'tab'" [tabindex]="stepTabindex()" [attr.aria-controls]="ariaControls()" [disabled]="isStepDisabled()" (click)="onStepClick()" type="button">
                <span [class]="cx('number')" [pBind]="ptm('number')">{{ value() }}</span>
                <span [class]="cx('title')" [pBind]="ptm('title')">
                    <ng-content></ng-content>
                </span>
            </button>
            @if (isSeparatorVisible()) {
                <p-stepper-separator />
            }
        } @else {
            <ng-container *ngTemplateOutlet="content(); context: contentContext()"></ng-container>
            @if (isSeparatorVisible()) {
                <p-stepper-separator />
            }
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': 'cx("root")',
        '[attr.aria-current]': 'ariaCurrent()',
        '[attr.role]': '"presentation"',
        '[attr.data-p-active]': 'active()',
        '[attr.data-p-disabled]': 'isStepDisabled()'
    },
    providers: [StepStyle, { provide: STEP_INSTANCE, useExisting: Step }, { provide: PARENT_INSTANCE, useExisting: Step }],
    hostDirectives: [Bind]
})
export class Step extends BaseComponent<StepPassThrough> {
    $pcStep: Step | undefined = inject(STEP_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    componentName = 'Step';

    pcStepper = inject<Stepper>(STEPPER_INSTANCE);

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    /**
     * Active value of stepper.
     * @defaultValue undefined
     * @group Props
     */
    value = model<number>();
    /**
     * Whether the step is disabled.
     * @defaultValue false
     * @group Props
     */
    disabled = input(false, { transform: (v: unknown) => transformToBoolean(v) });

    active = computed(() => this.pcStepper.isStepActive(this.value()!));

    isStepDisabled = computed(() => !this.active() && (this.pcStepper.linear() || this.disabled()));

    stepTabindex = computed(() => (this.isStepDisabled() ? -1 : undefined));

    ariaCurrent = computed(() => (this.active() ? 'step' : undefined));

    id = computed(() => `${this.pcStepper.id()}_step_${this.value()}`);

    ariaControls = computed(() => `${this.pcStepper.id()}_steppanel_${this.value()}`);

    isSeparatorVisible = computed(() => {
        const stepList = this.pcStepper.stepList();
        if (stepList) {
            const steps = stepList.steps();
            const index = steps.indexOf(this);
            const stepLen = steps.length;
            return index !== stepLen - 1;
        } else {
            return false;
        }
    });
    /**
     * Content template.
     * @type {TemplateRef<StepContentTemplateContext>}
     * @group Templates
     */
    content = contentChild<TemplateRef<StepContentTemplateContext>>('content');

    _componentStyle = inject(StepStyle);

    private onStepClickCallback = this.onStepClick.bind(this);

    contentContext = computed<StepContentTemplateContext>(() => ({
        activateCallback: this.onStepClickCallback,
        value: this.value(),
        active: this.active()
    }));

    onStepClick() {
        this.pcStepper.updateValue(this.value()!);
    }
}
