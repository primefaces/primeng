import { CommonModule } from '@angular/common';
import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    computed,
    contentChild,
    ContentChild,
    contentChildren,
    effect,
    forwardRef,
    inject,
    input,
    InputSignal,
    InputSignalWithTransform,
    model,
    ModelSignal,
    NgModule,
    signal,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';

import { animate, state, style, transition, trigger } from '@angular/animations';
import { find, findIndexInList, uuid } from '@primeuix/utils';
import { SharedModule } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { transformToBoolean } from 'primeng/utils';
import { StepperStyle } from './style/stepperstyle';

/**
 * Context interface for the StepPanel content template.
 * @property {() => void} activateCallback - Callback function to activate a step.
 * @property {number} value - The value associated with the step.
 * @property {boolean} active - A flag indicating whether the step is active.
 * @group Interface
 */
export interface StepContentTemplateContext {
    activateCallback: () => void;
    value: number;
    active: boolean;
}

/**
 * Context interface for the StepPanel content template.
 * @property {(index: number) => void} activateCallback - Callback function to activate a step.
 * @property {number} value - The value associated with the step.
 * @property {boolean} active - A flag indicating whether the step is active.
 * @group Interface
 */
export interface StepPanelContentTemplateContext {
    activateCallback: (index: number) => void;
    value: number;
    active: boolean;
}

@Component({
    selector: 'p-step-list',
    standalone: true,
    imports: [CommonModule],
    template: ` <ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class.p-steplist]': 'true',
        '[class.p-component]': 'true'
    }
})
export class StepList extends BaseComponent {}

@Component({
    selector: 'p-stepper-separator',
    standalone: true,
    imports: [CommonModule],
    template: ` <ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class.p-stepper-separator]': 'true',
        '[class.p-component]': 'true'
    }
})
export class StepperSeparator extends BaseComponent {}

/**
 * StepItem is a helper component for Stepper component used in vertical orientation.
 * @group Components
 */
@Component({
    selector: 'p-step-item',
    standalone: true,
    imports: [CommonModule],
    template: ` <ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class.p-stepitem]': 'true',
        '[class.p-component]': 'true',
        '[attr.data-p-active]': 'isActive()'
    }
})
export class StepItem extends BaseComponent {
    pcStepper = inject(forwardRef(() => Stepper));
    /**
     * Value of step.
     * @type {<number | undefined>}
     * @defaultValue undefined
     * @group Props
     */
    value: ModelSignal<number | undefined> = model<number | undefined>();

    isActive = computed(() => this.pcStepper.value() === this.value());

    step = contentChild(Step);

    stepPanel = contentChild(StepPanel);

    constructor() {
        super();
        effect(
            () => {
                this.step().value.set(this.value());
            },
            { allowSignalWrites: true }
        );

        effect(
            () => {
                this.stepPanel().value.set(this.value());
            },
            { allowSignalWrites: true }
        );
    }
}

/**
 * Step is a helper component for Stepper component.
 * @group Components
 */
@Component({
    selector: 'p-step',
    standalone: true,
    imports: [CommonModule, StepperSeparator, SharedModule],
    template: `
        @if (!content) {
            <button [attr.id]="id()" class="p-step-header" [attr.role]="'tab'" [tabindex]="isStepDisabled() ? -1 : undefined" [attr.aria-controls]="ariaControls()" [disabled]="isStepDisabled()" (click)="onStepClick()">
                <span class="p-step-number">{{ value() }}</span>
                <span class="p-step-title">
                    <ng-content></ng-content>
                </span>
            </button>
            @if (isSeparatorVisible()) {
                <p-stepper-separator />
            }
        } @else {
            <ng-container *ngTemplateOutlet="content; context: { activateCallback: onStepClick.bind(this), value: value(), active: active() }"></ng-container>
            @if (isSeparatorVisible()) {
                <p-stepper-separator />
            }
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class.p-step]': 'true',
        '[class.p-step-active]': 'active()',
        '[class.p-disabled]': 'isStepDisabled()',
        '[class.p-component]': 'true',
        '[attr.aria-current]': 'active() ? "step" : undefined',
        '[attr.role]': '"presentation"',
        '[attr.data-p-active]': 'active()',
        '[attr.data-p-disabled]': 'isStepDisabled()',
        '[attr.data-pc-name]': '"step"'
    }
})
export class Step extends BaseComponent implements AfterContentInit {
    pcStepper = inject(forwardRef(() => Stepper));
    /**
     * Active value of stepper.
     * @type {number}
     * @defaultValue undefined
     * @group Props
     */
    value: ModelSignal<number> = model<number | undefined>();
    /**
     * Whether the step is disabled.
     * @type {boolean}
     * @defaultValue false
     * @group Props
     */
    disabled: InputSignalWithTransform<any, boolean> = input(false, {
        transform: (v: any | boolean) => transformToBoolean(v)
    });

    active = computed(() => this.pcStepper.isStepActive(this.value()));

    isStepDisabled = computed(() => !this.active() && (this.pcStepper.linear() || this.disabled()));

    id = computed(() => `${this.pcStepper.id()}_step_${this.value()}`);

    ariaControls = computed(() => `${this.pcStepper.id()}_steppanel_${this.value()}`);

    isSeparatorVisible = computed(() => {
        if (this.pcStepper.stepList()) {
            const index = findIndexInList(this.el.nativeElement, this.pcStepper.stepList().el.nativeElement.children);
            const stepLen = find(this.pcStepper.stepList().el.nativeElement, '[data-pc-name="step"]').length;
            return index !== stepLen - 1;
        }
    });
    /**
     * Content template.
     * @type {TemplateRef<StepContentTemplateContext>}
     * @group Templates
     */
    @ContentChild('content') content: TemplateRef<StepContentTemplateContext>;

    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'content':
                    this.content = item.template;
                    break;
            }
        });
    }

    onStepClick() {
        this.pcStepper.updateValue(this.value());
    }
}

/**
 * StepPanel is a helper component for Stepper component.
 * @group Components
 */
@Component({
    selector: 'p-step-panel',
    standalone: true,
    imports: [CommonModule, StepperSeparator, SharedModule],
    template: `
        @if (isSeparatorVisible()) {
            <p-stepper-separator />
        }
        <div class="p-steppanel-content" [@content]="isVertical() ? (active() ? { value: 'visible', params: { transitionParams: transitionOptions() } } : { value: 'hidden', params: { transitionParams: transitionOptions() } }) : undefined">
            @if (active()) {
                <ng-container *ngTemplateOutlet="contentTemplate; context: { activateCallback: updateValue.bind(this), value: value(), active: active() }"></ng-container>
            }
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class.p-steppanel]': 'true',
        '[class.p-component]': 'true',
        '[class.p-steppanel-active]': 'active()',
        '[attr.role]': '"tabpanel"',
        '[attr.aria-controls]': 'ariaControls()',
        '[attr.id]': 'id()',
        '[attr.data-p-active]': 'active()',
        '[attr.data-pc-name]': '"steppanel"'
    },
    animations: [
        trigger('content', [
            state(
                'hidden',
                style({
                    height: '0',
                    visibility: 'hidden'
                })
            ),
            state(
                'visible',
                style({
                    height: '*',
                    visibility: 'visible'
                })
            ),
            transition('visible <=> hidden', [animate('250ms cubic-bezier(0.86, 0, 0.07, 1)')]),
            transition('void => *', animate(0))
        ])
    ]
})
export class StepPanel extends BaseComponent implements AfterContentInit {
    pcStepper = inject(forwardRef(() => Stepper));

    transitionOptions = computed(() => this.pcStepper.transitionOptions());
    /**
     * Active value of stepper.
     * @type {number}
     * @defaultValue undefined
     * @group Props
     */
    value: ModelSignal<number> = model<number | undefined>(undefined);

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
    /**
     * Content template.
     * @param {StepPanelContentTemplateContext} context - Context of the template
     * @see {@link StepPanelContentTemplateContext}
     * @group Templates
     */
    @ContentChild('content') contentTemplate: TemplateRef<StepPanelContentTemplateContext>;

    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'content':
                    this.contentTemplate = item.template;
                    break;
            }
        });
    }

    updateValue(value: number) {
        this.pcStepper.updateValue(value);
    }
}

@Component({
    selector: 'p-step-panels',
    standalone: true,
    imports: [CommonModule, SharedModule],
    template: ` <ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class.p-steppanels]': 'true',
        '[class.p-component]': 'true'
    }
})
export class StepPanels extends BaseComponent {}

/**
 * Stepper is a component that streamlines a wizard-like workflow, organizing content into coherent steps and visually guiding users through a numbered progression in a multistep process.
 * @group Components
 */
@Component({
    selector: 'p-stepper',
    standalone: true,
    imports: [CommonModule, SharedModule],
    template: ` <ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [StepperStyle],
    host: {
        '[class.p-stepper]': 'true',
        '[class.p-component]': 'true',
        '[attr.role]': '"tablist"',
        '[attr.id]': 'id()'
    }
})
export class Stepper extends BaseComponent {
    /**
     * A model that can hold a numeric value or be undefined.
     * @defaultValue undefined
     * @type {ModelSignal<number | undefined>}
     * @group Props
     */
    value: ModelSignal<number | undefined> = model<number | undefined>(undefined);
    /**
     * A boolean variable that captures user input.
     * @defaultValue false
     * @type {InputSignalWithTransform<any, boolean >}
     * @group Props
     */
    linear: InputSignalWithTransform<any, boolean> = input(false, {
        transform: (v: any | boolean) => transformToBoolean(v)
    });
    /**
     * Transition options of the animation.
     * @defaultValue 400ms cubic-bezier(0.86, 0, 0.07, 1)
     * @type {InputSignal<string >}
     * @group Props
     */
    transitionOptions: InputSignal<string> = input<string>('400ms cubic-bezier(0.86, 0, 0.07, 1)');

    _componentStyle = inject(StepperStyle);

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
    imports: [Stepper, StepList, StepPanels, StepPanel, StepItem, Step, StepperSeparator, SharedModule],
    exports: [Stepper, StepList, StepPanels, StepPanel, StepItem, Step, StepperSeparator, SharedModule]
})
export class StepperModule {}
