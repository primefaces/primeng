import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, contentChild, inject, model, TemplateRef, ViewEncapsulation } from '@angular/core';
import { MotionOptions } from '@primeuix/motion';
import { find, findIndexInList } from '@primeuix/utils';
import { SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { MotionModule } from 'primeng/motion';
import { StepPanelContentTemplateContext, StepPanelPassThrough } from 'primeng/types/stepper';
import type { Stepper } from './stepper';
import { StepperSeparator } from './stepper-separator';
import { STEPPER_INSTANCE, STEPPANEL_INSTANCE } from './stepper-token';
import { StepPanelStyle } from './style/steppanelstyle';

/**
 * StepPanel is a helper component for Stepper component.
 * @group Components
 */
@Component({
    selector: 'p-step-panel',
    standalone: true,
    imports: [NgTemplateOutlet, StepperSeparator, SharedModule, BindModule, MotionModule],
    template: `
        <p-motion [visible]="active()" name="p-collapsible" [disabled]="!isVertical()" [options]="computedMotionOptions()">
            <div [class]="cx('contentWrapper')" [pBind]="ptm('contentWrapper')">
                @if (isSeparatorVisible()) {
                    <p-stepper-separator />
                }
                <div [class]="cx('content')" [pBind]="ptm('content')">
                    <ng-container *ngTemplateOutlet="contentTemplate(); context: contentContext()"></ng-container>
                </div>
            </div>
        </p-motion>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': 'cx("root")',
        '[attr.role]': '"tabpanel"',
        '[attr.aria-controls]': 'ariaControls()',
        '[attr.id]': 'id()',
        '[attr.data-p-active]': 'active()',
        '[attr.data-pc-name]': '"steppanel"'
    },
    providers: [StepPanelStyle, { provide: STEPPANEL_INSTANCE, useExisting: StepPanel }, { provide: PARENT_INSTANCE, useExisting: StepPanel }],
    hostDirectives: [Bind]
})
export class StepPanel extends BaseComponent<StepPanelPassThrough> {
    $pcStepPanel: StepPanel | undefined = inject(STEPPANEL_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    componentName = 'StepPanel';

    pcStepper = inject<Stepper>(STEPPER_INSTANCE);

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    /**
     * Active value of stepper.
     * @defaultValue undefined
     * @group Props
     */
    value = model<number>();

    active = computed(() => this.pcStepper.value() === this.value());

    ariaControls = computed(() => `${this.pcStepper.id()}_step_${this.value()}`);

    id = computed(() => `${this.pcStepper.id()}_steppanel_${this.value()}`);

    isVertical = computed(() => this.pcStepper.stepItems().length > 0);

    isSeparatorVisible = computed(() => {
        if (this.pcStepper.stepItems()) {
            const stepLen = this.pcStepper.stepItems().length;
            const stepPanelElements = find(this.pcStepper.el.nativeElement, '[data-pc-name="steppanel"]');
            const index = findIndexInList(this.el.nativeElement, stepPanelElements);

            return index !== stepLen - 1;
        }
    });

    computedMotionOptions = computed<MotionOptions>(() => {
        return {
            ...this.ptm('motion'),
            ...this.pcStepper.computedMotionOptions()
        };
    });

    /**
     * Content template.
     * @param {StepPanelContentTemplateContext} context - Context of the template
     * @see {@link StepPanelContentTemplateContext}
     * @group Templates
     */
    contentTemplate = contentChild<TemplateRef<StepPanelContentTemplateContext>>('content', { descendants: false });

    _componentStyle = inject(StepPanelStyle);

    updateValueCallback = this.updateValue.bind(this);

    contentContext = computed<StepPanelContentTemplateContext>(() => ({
        activateCallback: this.updateValueCallback,
        value: this.value(),
        active: this.active()
    }));

    updateValue(value: number) {
        this.pcStepper.updateValue(value);
    }
}
