import { CommonModule } from '@angular/common';
import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Input, NgModule, Output, QueryList, TemplateRef, ViewEncapsulation } from '@angular/core';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { Nullable } from 'primeng/ts-helpers';
import { UniqueComponentId } from '../utils/uniquecomponentid';
import { animate, state, style, transition, trigger } from '@angular/animations';

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
    @Input() id: string | undefined;

    @Input() template: TemplateRef<any> | undefined;

    @Input() stepperPanel: StepperPanel;

    @Input() index: string | undefined;

    @Input() disabled: boolean | undefined;

    @Input() active: boolean | undefined;

    @Input() highlighted: boolean | undefined;

    @Input() getStepProp: string | undefined;

    @Input() ariaControls: string | undefined;

    @Output() onClick = new EventEmitter<void>();
    
}

@Component({
    selector: 'p-stepperSeparator',
    template: `
        <ng-container *ngIf="template; else span">
            <ng-container *ngTemplateOutlet="template; context: { index: index, active: active, highlighted: highlighted, class: separatorClass }"></ng-container>
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
    @Input() template: TemplateRef<any> | undefined;

    @Input() separatorClass: string | undefined;

    @Input() stepperPanel: StepperPanel;

    @Input() index: string | undefined;

    @Input() active: boolean | undefined;

    @Input() highlighted: boolean | undefined;

}

@Component({
    selector: 'p-stepperContent',
    template: ` <div [id]="id" role="tabpanel" data-pc-name="stepperpanel" [attr.data-pc-index]="index" [attr.data-p-active]="active" [attr.aria-labelledby]="ariaLabelledby">
        <ng-container *ngIf="template">
            <ng-container *ngTemplateOutlet="template; context: { index: index, active: active, highlighted: highlighted, onClick: onClick, onPrevClick: onPrevClick, onNextClick: onNextClick }"></ng-container>
        </ng-container>
        <ng-template *ngIf="!template">
            <ng-container *ngIf="stepperPanel">
                <ng-container *ngTemplateOutlet="stepperPanel"></ng-container>
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
    @Input() id: string | undefined;

    @Input() orientation: 'vertical' | 'horizontal';

    @Input() template: TemplateRef<any> | undefined;

    @Input() ariaLabelledby: string | undefined;

    @Input() stepperPanel: StepperPanel;

    @Input() index: string | undefined;

    @Input() active: boolean | undefined;

    @Input() highlighted: boolean | undefined;

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
                    <ng-template ngFor let-step [ngForOf]="panels" let-index="index" [ngForTrackBy]="trackByFn">
                        <li
                            [key]="getStepKey(step, index)"
                            class="p-stepper-header"
                            [ngClass]="{
                                'p-highlight': isStepActive(index),
                                'p-disabled': isItemDisabled(index)
                            }"
                            [attr.aria-current]="isStepActive(index) ? 'step' : undefined"
                            role="presentation"
                            [data-pc-name]="stepperPanel"
                            [data-p-highlight]="isStepActive(index)"
                            [data-p-disabled]="isItemDisabled(index)"
                            [data-pc-index]="index"
                            [data-p-active]="isStepActive(index)"
                        >
                            <p-stepperHeader
                                [id]="getStepHeaderActionId(index)"
                                [template]="step.headerTemplate"
                                [stepperPanel]="step"
                                [getStepProp]="getStepProp(step, 'header')"
                                [index]="index"
                                [disabled]="isItemDisabled(index)"
                                [active]="isStepActive(index)"
                                [highlighted]="index < activeStep"
                                [class]="'p-stepper-action'"
                                [aria-controls]="getStepContentId(index)"
                                (onClick)="onItemClick($event, index)"
                            ></p-stepperHeader>

                            <ng-container *ngIf="index !== stepperPanels.length - 1">
                                <p-stepperSeparator [template]="step.separatorTemplate" [separatorClass]="'p-stepper-separator'" [stepperPanel]="step" [index]="index" [active]="isStepActive(index)" [highlighted]="index < activeStep" />
                            </ng-container>
                        </li>
                    </ng-template>
                </ul>
                <div class="p-stepper-panels">
                    <ng-template ngFor let-step [ngForOf]="panels" let-index="index" [ngForTrackBy]="trackByFn">
                        <ng-container *ngIf="isStepActive(index)">
                            <p-stepperContent
                                [id]="getStepContentId(index)"
                                [template]="step.contentTemplate"
                                [orientation]="orientation"
                                [stepperPanel]="step"
                                [index]="index"
                                [active]="isStepActive(index)"
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
                <ng-template ngFor let-step [ngForOf]="panels" let-index="index" [ngForTrackBy]="trackByFn">
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
                                [stepperPanel]="step"
                                [getStepProp]="getStepProp(step, 'header')"
                                [index]="index"
                                [disabled]="isItemDisabled(index)"
                                [active]="isStepActive(index)"
                                [highlighted]="index < activeStep"
                                [class]="'p-stepper-action'"
                                [aria-controls]="getStepContentId(index)"
                                (onClick)="onItemClick($event, index)"
                            ></p-stepperHeader>
                        </div>

                        <div class="p-stepper-toggleable-content" [@tabContent]="isStepActive(index) ? { value: 'visible', params: { transitionParams: transitionOptions } } : { value: 'hidden', params: { transitionParams: transitionOptions } }">
                            <ng-container *ngIf="index !== stepperPanels.length - 1">
                                <p-stepperSeparator [template]="step.separatorTemplate" [separatorClass]="'p-stepper-separator'" [stepperPanel]="step" [index]="index" [active]="isStepActive(index)" [highlighted]="index < activeStep" />
                            </ng-container>
                            <p-stepperContent
                                [id]="getStepContentId(index)"
                                [template]="step.contentTemplate"
                                [orientation]="orientation"
                                [stepperPanel]="step"
                                [index]="index"
                                [active]="isStepActive(index)"
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
    styleUrls: ['./stepper.css'],
    host: {
        '[class.p-stepper]': 'true',
        '[class.p-component]': 'true',
        '[class.p-stepper-vertical]': "orientation === 'vertical'"
    },
    animations: [
        trigger('tabContent', [
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
    /**
     * Transition options of the animation.
     * @group Props
     */
    @Input() transitionOptions: string = '400ms cubic-bezier(0.86, 0, 0.07, 1)';

    @ContentChildren(StepperPanel) stepperPanels: QueryList<StepperPanel> | undefined;

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

    panels!: StepperPanel[];

    isStepActive(index:number) {
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
        if (index !== this.stepperPanels.length - 1) {
            this.updateActiveStep(event, index + 1);
        }
    }

    trackByFn(index: number): number {
        return index;
    }

    ngAfterContentInit() {
        this.panels = (this.stepperPanels as QueryList<StepperPanel>).toArray();
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
