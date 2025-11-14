import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    contentChild,
    ContentChild,
    ContentChildren,
    contentChildren,
    effect,
    forwardRef,
    inject,
    InjectionToken,
    input,
    InputSignal,
    InputSignalWithTransform,
    model,
    ModelSignal,
    NgModule,
    QueryList,
    signal,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';

import { find, findIndexInList, uuid } from '@primeuix/utils';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { MotionModule } from 'primeng/motion';
import { StepItemPassThrough, StepListPassThrough, StepPanelPassThrough, StepPanelsPassThrough, StepPassThrough, StepperPassThrough, StepperSeparatorPassThrough } from 'primeng/types/stepper';
import { transformToBoolean } from 'primeng/utils';
import { StepItemStyle } from './style/stepitemstyle';
import { StepListStyle } from './style/stepliststyle';
import { StepPanelsStyle } from './style/steppanelsstyle';
import { StepPanelStyle } from './style/steppanelstyle';
import { StepperStyle } from './style/stepperstyle';
import { StepStyle } from './style/stepstyle';

const STEPPER_INSTANCE = new InjectionToken<Stepper>('STEPPER_INSTANCE');
const STEPLIST_INSTANCE = new InjectionToken<StepList>('STEPLIST_INSTANCE');
const STEPITEM_INSTANCE = new InjectionToken<StepItem>('STEPITEM_INSTANCE');
const STEP_INSTANCE = new InjectionToken<Step>('STEP_INSTANCE');
const STEPPANEL_INSTANCE = new InjectionToken<StepPanel>('STEPPANEL_INSTANCE');
const STEPPANELS_INSTANCE = new InjectionToken<StepPanels>('STEPPANELS_INSTANCE');
const STEPPERSEPARATOR_INSTANCE = new InjectionToken<StepperSeparator>('STEPPERSEPARATOR_INSTANCE');

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
    imports: [CommonModule, BindModule],
    template: ` <ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': 'cx("root")'
    },
    providers: [StepListStyle, { provide: STEPLIST_INSTANCE, useExisting: StepList }, { provide: PARENT_INSTANCE, useExisting: StepList }],
    hostDirectives: [Bind]
})
export class StepList extends BaseComponent<StepListPassThrough> {
    $pcStepList: StepList | undefined = inject(STEPLIST_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    steps = contentChildren(forwardRef(() => Step));

    _componentStyle = inject(StepListStyle);

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
}
/**
 * StepperSeparator is a helper component for Stepper component used in vertical orientation.
 * @group Components
 */
@Component({
    selector: 'p-stepper-separator',
    standalone: true,
    imports: [CommonModule, BindModule],
    template: ` <ng-content></ng-content>`,
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

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    _componentStyle = inject(StepperStyle);
}

/**
 * StepItem is a helper component for Stepper component used in vertical orientation.
 * @group Components
 */
@Component({
    selector: 'p-step-item',
    standalone: true,
    imports: [CommonModule, BindModule],
    template: ` <ng-content></ng-content>`,
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

    _componentStyle = inject(StepItemStyle);

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    pcStepper = inject(forwardRef(() => Stepper));
    /**
     * Value of step.
     * @type {<number | undefined>}
     * @defaultValue undefined
     * @group Props
     */
    value: ModelSignal<number | undefined> = model<number | undefined>();

    isActive = computed(() => this.pcStepper.value() === this.value());

    step = contentChild(forwardRef(() => Step));

    stepPanel = contentChild(forwardRef(() => StepPanel));

    constructor() {
        super();
        effect(() => {
            this.step().value.set(this.value());
        });

        effect(() => {
            this.stepPanel().value.set(this.value());
        });
    }
}

/**
 * Step is a helper component for Stepper component.
 * @group Components
 */
@Component({
    selector: 'p-step',
    standalone: true,
    imports: [CommonModule, StepperSeparator, SharedModule, BindModule],
    template: `
        @if (!content && !_contentTemplate) {
            <button
                [attr.id]="id()"
                [class]="cx('header')"
                [pBind]="ptm('header')"
                [attr.role]="'tab'"
                [tabindex]="isStepDisabled() ? -1 : undefined"
                [attr.aria-controls]="ariaControls()"
                [disabled]="isStepDisabled()"
                (click)="onStepClick()"
                type="button"
            >
                <span [class]="cx('number')" [pBind]="ptm('number')">{{ value() }}</span>
                <span [class]="cx('title')" [pBind]="ptm('title')">
                    <ng-content></ng-content>
                </span>
            </button>
            @if (isSeparatorVisible()) {
                <p-stepper-separator />
            }
        } @else {
            <ng-container *ngTemplateOutlet="content || _contentTemplate; context: { activateCallback: onStepClick.bind(this), value: value(), active: active() }"></ng-container>
            @if (isSeparatorVisible()) {
                <p-stepper-separator />
            }
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': 'cx("root")',
        '[attr.aria-current]': 'active() ? "step" : undefined',
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

    pcStepper = inject(forwardRef(() => Stepper));

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    /**
     * Active value of stepper.
     * @type {number}
     * @defaultValue undefined
     * @group Props
     */
    value: ModelSignal<number | undefined> = model<number | undefined>();
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
            const steps = this.pcStepper.stepList().steps();
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
    @ContentChild('content', { descendants: false }) content: TemplateRef<StepContentTemplateContext>;

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    _contentTemplate: TemplateRef<any> | undefined;

    _componentStyle = inject(StepStyle);

    onAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'content':
                    this._contentTemplate = item.template;
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
    imports: [CommonModule, StepperSeparator, SharedModule, BindModule, MotionModule],
    template: `
        @if (isSeparatorVisible()) {
            <p-stepper-separator />
        }
        <p-motion [visible]="active()" name="p-toggleable-content2" [options]="ptm('motion')" [class]="cx('content')">
            <ng-container *ngTemplateOutlet="contentTemplate || _contentTemplate; context: { activateCallback: updateValue.bind(this), value: value(), active: active() }"></ng-container>
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

    pcStepper = inject(forwardRef(() => Stepper));

    transitionOptions = computed(() => this.pcStepper.transitionOptions());

    enterAnimation = computed(() => (this.isVertical() ? this.pcStepper.enterAnimation() : undefined));

    leaveAnimation = computed(() => (this.isVertical() ? this.pcStepper.leaveAnimation() : undefined));
    /**
     * Active value of stepper.
     * @type {number}
     * @defaultValue undefined
     * @group Props
     */
    value: ModelSignal<number | undefined> = model<number | undefined>(undefined);

    active = computed(() => this.pcStepper.value() === this.value());

    visible = signal<boolean>(this.active());

    isVisible = computed(() => this.active() || (this.isVertical() && this.visible()));

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

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    _contentTemplate: TemplateRef<any> | undefined;

    _componentStyle = inject(StepPanelStyle);

    onAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'content':
                    this._contentTemplate = item.template;
                    break;
            }
        });
    }

    onAnimationStart() {
        if (this.active()) {
            this.visible.set(true);
        }
    }

    onAnimationEnd() {
        if (!this.active()) {
            this.visible.set(true);
        }
    }

    updateValue(value: number) {
        this.pcStepper.updateValue(value);
    }

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
}

@Component({
    selector: 'p-step-panels',
    standalone: true,
    imports: [CommonModule, SharedModule, BindModule],
    template: ` <ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': 'cx("root")'
    },
    providers: [StepPanelsStyle, { provide: STEPPANELS_INSTANCE, useExisting: StepPanels }, { provide: PARENT_INSTANCE, useExisting: StepPanels }],
    hostDirectives: [Bind]
})
export class StepPanels extends BaseComponent<StepPanelsPassThrough> {
    $pcStepPanels: StepPanels | undefined = inject(STEPPANELS_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });
    _componentStyle = inject(StepPanelsStyle);

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
}

/**
 * Stepper is a component that streamlines a wizard-like workflow, organizing content into coherent steps and visually guiding users through a numbered progression in a multistep process.
 * @group Components
 */
@Component({
    selector: 'p-stepper',
    standalone: true,
    imports: [CommonModule, SharedModule, BindModule],
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
    $pcStepper: Stepper | undefined = inject(STEPPER_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    _componentStyle = inject(StepperStyle);

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
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
    /**
     * Enter animation class name.
     * @defaultValue 'p-collapsible-enter'
     * @group Props
     */
    enterAnimation = input<string | null | undefined>('p-collapsible-enter');
    /**
     * Leave animation class name.
     * @defaultValue 'p-collapsible-leave'
     * @group Props
     */
    leaveAnimation = input<string | null | undefined>('p-collapsible-leave');

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
