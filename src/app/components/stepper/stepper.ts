import { CommonModule } from '@angular/common';
import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    NgModule,
    OnInit,
    Output,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation,
    contentChildren,
    effect,
    forwardRef,
    input,
    signal
} from '@angular/core';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { Nullable } from 'primeng/ts-helpers';
import { UniqueComponentId } from '../utils/uniquecomponentid';
import { ActiveStepChangeEvent } from './stepper.interface';

@Component({
    selector: 'p-stepperHeader',
    template: `
        <ng-container *ngIf="template; else buttonRef">
            <ng-container
                *ngTemplateOutlet="
                    template;
                    context: {
                        index: index,
                        active: active,
                        activeStep: activeStep,
                        highlighted: highlighted,
                        class: 'p-stepper-action',
                        headerClass: 'p-stepper-action',
                        numberClass: 'p-stepper-number',
                        titleClass: 'p-stepper-title',
                        onClick: onClick
                    }
                "
            ></ng-container>
        </ng-container>
        <ng-template #buttonRef>
            <p-button [id]="id" class="p-stepper-action" role="tab" [tabindex]="disabled ? -1 : undefined" [aria-controls]="ariaControls" (click)="onClick.emit($event, index)">
                <span class="p-stepper-number">{{ index + 1 }}</span>
                <span class="p-stepper-title">{{ getStepProp }}</span>
            </p-button>
        </ng-template>
    `,
    host: {
        class: 'p-element'
    }
})
export class StepperHeader {
    @Input() id: any;

    @Input() template: any;

    @Input() stepperpanel: any;

    @Input() index: any;

    @Input() disabled: any;

    @Input() active: any;

    @Input() highlighted: any;

    @Input() getStepProp: any;

    @Input() ariaControls: any;

    @Input() activeStep: any;

    @Output() onClick = new EventEmitter<void>();
}

@Component({
    selector: 'p-stepperSeparator',
    template: `
        <ng-container *ngIf="template; else span">
            <ng-container *ngTemplateOutlet="template; context: { index: index, active: active, activeStep: activeStep, highlighted: highlighted, class: separatorClass }"></ng-container>
        </ng-container>
        <ng-template #span>
            <span [class]="separatorClass" aria-hidden="true"></span>
        </ng-template>
    `,
    host: {
        class: 'p-stepper-separator'
    }
})
export class StepperSeparator {
    @Input() template: any;

    @Input() separatorClass: any;

    @Input() stepperpanel: any;

    @Input() index: any;

    @Input() active: any;

    @Input() activeStep: any;

    @Input() highlighted: any;

    @Input() getStepPT: any;
}

@Component({
    selector: 'p-stepperContent',
    template: ` <div [id]="id" role="tabpanel" data-pc-name="stepperpanel" [attr.data-pc-index]="index" [attr.data-p-active]="active" [attr.aria-labelledby]="ariaLabelledby">
        <ng-container *ngIf="template">
            <ng-container *ngTemplateOutlet="template; context: { index: index, active: active, activeStep: activeStep, highlighted: highlighted, onClick: onClick, onPrevClick: onPrevClick, onNextClick: onNextClick }"></ng-container>
        </ng-container>
        <ng-template *ngIf="!template">
            <ng-container *ngIf="stepperpanel">
                <ng-container *ngTemplateOutlet="stepperpanel"></ng-container>
            </ng-container>
        </ng-template>
    </div>`,

    host: {
        '[class.p-stepper-content]': 'true',
        '[class.p-element]': 'true',
        '[class.p-toggleable-content]': "orientation === 'vertical'"
    }
})
export class StepperContent {
    @Input() id: any;

    @Input() orientation: any;

    @Input() template: any;

    @Input() ariaLabelledby: any;

    @Input() stepperpanel: any;

    @Input() index: any;

    @Input() active: any;

    @Input() activeStep: any;

    @Input() highlighted: any;

    @Output() onClick = new EventEmitter<void>();

    @Output() onPrevClick = new EventEmitter<void>();

    @Output() onNextClick = new EventEmitter<void>();
}

/**
 * StepperPanel is a helper component for Stepper component.
 * @group Components
 */
@Component({
    selector: 'p-stepperPanel',
    template: ` <ng-content></ng-content> `,
    host: {
        class: 'p-element'
    }
})
export class StepperPanel {
    /**
     * Orientation of tab headers.
     * @group Props
     */
    @Input() header: string | undefined;

    @ContentChildren(PrimeTemplate) templates: Nullable<QueryList<PrimeTemplate>>;

    headerTemplate: Nullable<TemplateRef<any>>;

    startTemplate: Nullable<TemplateRef<any>>;

    contentTemplate: Nullable<TemplateRef<any>>;

    separatorTemplate: Nullable<TemplateRef<any>>;

    endTemplate: Nullable<TemplateRef<any>>;

    ngAfterContentInit() {
        (this.templates as QueryList<PrimeTemplate>).forEach((item) => {
            switch (item.getType()) {
                case 'header':
                    this.headerTemplate = item.template;
                    break;
                case 'content':
                    this.contentTemplate = item.template;
                    break;
                case 'separator':
                    this.separatorTemplate = item.template;
                    break;
            }
        });
    }
}

/**
 * The Stepper component displays a wizard-like workflow by guiding users through the multi-step progression.
 * @group Components
 */
@Component({
    selector: 'p-stepper',
    template: `
        <div role="tablist">
            <ng-container *ngIf="startTemplate">
                <ng-container *ngTemplateOutlet="startTemplate"></ng-container>
            </ng-container>
            <ng-container *ngIf="orientation === 'horizontal'; else vertical">
                <ul class="p-stepper-nav">
                    <ng-template ngFor let-step [ngForOf]="panels" let-index="index">
                        <li
                            [key]="getStepKey(step, index)"
                            class="p-stepper-header"
                            [ngClass]="{
                                'p-highlight': isStepActive(index),
                                'p-disabled': isItemDisabled(index)
                            }"
                            [attr.aria-current]="isStepActive(index) ? 'step' : undefined"
                            role="presentation"
                            [data-pc-name]="stepperpanel"
                            [data-p-highlight]="isStepActive(index)"
                            [data-p-disabled]="isItemDisabled(index)"
                            [data-pc-index]="index"
                            [data-p-active]="isStepActive(index)"
                        >
                            <p-stepperHeader
                                [id]="getStepHeaderActionId(index)"
                                [template]="step.headerTemplate"
                                [stepperpanel]="step"
                                [getStepProp]="getStepProp(step, 'header')"
                                [index]="index"
                                [disabled]="isItemDisabled(index)"
                                [active]="isStepActive(index)"
                                [activeStep]="activeStep"
                                [highlighted]="index < activeStep"
                                [class]="'p-stepper-action'"
                                [aria-controls]="getStepContentId(index)"
                                (onClick)="onItemClick($event, index)"
                            ></p-stepperHeader>

                            <ng-container *ngIf="index !== stepperpanels.length - 1">
                                <p-stepperSeparator [template]="step.separatorTemplate" [separatorClass]="'p-stepper-separator'" [stepperpanel]="step" [index]="index" [active]="isStepActive(index)" [highlighted]="index < activeStep" />
                            </ng-container>
                        </li>
                    </ng-template>
                </ul>
                <div class="p-stepper-panels">
                    <ng-template ngFor let-step [ngForOf]="panels" let-index="index">
                        <ng-container *ngIf="isStepActive(index)">
                            <p-stepperContent
                                [id]="getStepContentId(index)"
                                [template]="step.contentTemplate"
                                [orientation]="orientation"
                                [stepperpanel]="step"
                                [index]="index"
                                [active]="isStepActive(index)"
                                [activeStep]="activeStep"
                                [highlighted]="index < activeStep"
                                [ariaLabelledby]="getStepHeaderActionId(index)"
                                (onClick)="onItemClick($event, index)"
                                (onNextClick)="nextCallback($event, index)"
                                (onPrevClick)="prevCallback($event, index)"
                            />
                        </ng-container>
                    </ng-template>
                </div>
            </ng-container>
            <ng-template #vertical>
                <ng-template ngFor let-step [ngForOf]="panels" let-index="index">
                    <div
                        [key]="getStepKey(step, index)"
                        class="p-stepper-panel"
                        [ngClass]="{
                            'p-stepper-panel-active': orientation === 'vertical' && isStepActive(index)
                        }"
                        [attr.aria-current]="isStepActive(index) ? 'step' : undefined"
                        [data-pc-name]="'stepperpanel'"
                        [data-p-highlight]="isStepActive(index)"
                        [data-p-disabled]="isItemDisabled(index)"
                        [data-pc-index]="index"
                        [data-p-active]="isStepActive(index)"
                    >
                        <div
                            class="p-stepper-header "
                            [ngClass]="{
                                'p-highlight': isStepActive(index),
                                'p-disabled': isItemDisabled(index)
                            }"
                        >
                            <p-stepperHeader
                                [id]="getStepHeaderActionId(index)"
                                [template]="step.headerTemplate"
                                [stepperpanel]="step"
                                [getStepProp]="getStepProp(step, 'header')"
                                [index]="index"
                                [disabled]="isItemDisabled(index)"
                                [active]="isStepActive(index)"
                                [activeStep]="activeStep"
                                [highlighted]="index < activeStep"
                                [class]="'p-stepper-action'"
                                [aria-controls]="getStepContentId(index)"
                                (onClick)="onItemClick($event, index)"
                            ></p-stepperHeader>
                        </div>

                        <div class="p-stepper-toggleable-content" *ngIf="isStepActive(index)">
                            <ng-container *ngIf="index !== stepperpanels.length - 1">
                                <p-stepperSeparator [template]="step.separatorTemplate" [separatorClass]="'p-stepper-separator'" [stepperpanel]="step" [index]="index" [active]="isStepActive(index)" [highlighted]="index < activeStep" />
                            </ng-container>
                            <p-stepperContent
                                [id]="getStepContentId(index)"
                                [template]="step.contentTemplate"
                                [orientation]="orientation"
                                [stepperpanel]="step"
                                [index]="index"
                                [active]="isStepActive(index)"
                                [activeStep]="activeStep"
                                [highlighted]="index < activeStep"
                                [ariaLabelledby]="getStepHeaderActionId(index)"
                                (onClick)="onItemClick($event, index)"
                                (onNextClick)="nextCallback($event, index)"
                                (onPrevClick)="prevCallback($event, index)"
                            />
                        </div>
                    </div>
                </ng-template>
            </ng-template>
            <ng-container *ngIf="endTemplate">
                <ng-container *ngTemplateOutlet="endTemplate"></ng-container>
            </ng-container>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class.p-stepper]': 'true',
        '[class.p-component]': 'true',
        '[class.p-stepper-vertical]': "orientation === 'vertical'"
    }
})
export class Stepper implements AfterContentInit {
    /**
     * Active step index of stepper.
     * @group Props
     */

    @Input() activeStep: number | undefined | null = 0;

    /**
     * Orientation of the stepper.
     * @group Props
     */
    @Input() orientation: 'vertical' | 'horizontal' = 'horizontal';
    /**
     * Whether the steps are clickable or not.
     * @group Props
     */
    @Input() linear: boolean = false;

    @ContentChildren(StepperPanel) stepperpanels: QueryList<StepperPanel> | undefined;

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    @Output() onClick: EventEmitter<any> = new EventEmitter<any>();

    /**
     * Emitted when the value changes.
     * @param {ActiveStepChangeEvent} event - custom change event.
     * @group Emits
     */
    @Output() activeStepChange: EventEmitter<number> = new EventEmitter<number>();

    headerTemplate: Nullable<TemplateRef<any>>;

    startTemplate: Nullable<TemplateRef<any>>;

    separatorTemplate: Nullable<TemplateRef<any>>;

    endTemplate: Nullable<TemplateRef<any>>;

    id: string = UniqueComponentId();

    panels!: any[];

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    value: any;

    constructor(private cd: ChangeDetectorRef) {}

    isStepActive(index) {
        return this.activeStep === index;
    }

    getStepProp(step, name) {
        if (step.header) {
            return step.header;
        }

        if (step.content) {
            return step.content;
        }
        return undefined;
    }

    getStepKey(step, index) {
        return this.getStepProp(step, 'header') || index;
    }

    getStepHeaderActionId(index) {
        return `${this.id}_${index}_header_action`;
    }

    getStepContentId(index) {
        return `${this.id}_${index}_content`;
    }

    updateActiveStep(event, index) {
        this.activeStep = index;

        this.activeStepChange.emit(this.activeStep);
    }

    onItemClick(event, index) {
        if (this.linear) {
            event.preventDefault();

            return;
        }
        if (index !== this.activeStep) {
            this.updateActiveStep(event, index);
        }
    }

    isItemDisabled(index) {
        return this.linear && !this.isStepActive(index);
    }

    prevCallback(event, index) {
        if (index !== 0) {
            this.updateActiveStep(event, index - 1);
        }
    }

    nextCallback(event, index) {
        if (index !== this.stepperpanels.length - 1) {
            this.updateActiveStep(event, index + 1);
        }
    }

    ngAfterContentInit() {
        this.panels = (this.stepperpanels as QueryList<StepperPanel>).toArray();
        (this.templates as QueryList<PrimeTemplate>).forEach((item) => {
            switch (item.getType()) {
                case 'start':
                    this.startTemplate = item.template;
                    break;

                case 'end':
                    this.endTemplate = item.template;
                    break;

                default:
                    break;
            }
        });
    }
}

@NgModule({
    imports: [CommonModule, SharedModule],
    exports: [Stepper, StepperPanel, StepperContent, StepperHeader, StepperSeparator, SharedModule],
    declarations: [Stepper, StepperPanel, StepperPanel, StepperContent, StepperHeader, StepperSeparator]
})
export class StepperModule {}
