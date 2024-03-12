import { CommonModule } from '@angular/common';
import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, Input, NgModule, OnInit, QueryList, TemplateRef, ViewEncapsulation } from '@angular/core';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { Nullable } from 'primeng/ts-helpers';
import { UniqueComponentId } from '../utils/uniquecomponentid';
import { StepperPanel, StepperPanelModule } from '../stepperpanel/stepperpanel';

@Component({
    selector: 'p-stepperHeader',
    template: `
        <ng-container *ngIf="template; else button">
            <ng-container *ngTemplateOutlet="template"></ng-container>
        </ng-container>
        <ng-template #button>
            <button [id]="id" class="p-stepper-action" role="tab" [tabindex]="disabled ? -1 : undefined" [aria-controls]="ariaControls" (click)="clickCallback($event, index)">
                <span class="p-stepper-number">{{ index + 1 }}</span>
                <span class="p-stepper-title">{{ getStepProp(stepperpanel, 'header') }}</span>
            </button>
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

    @Input() ariaControls: any;

    @Input() clickCallback: any;

    @Input() getStepPT: any;

    @Input() getStepProp: any;
}

@Component({
    selector: 'p-stepperSeparator',
    template: `
        <ng-container *ngIf="template; else span">
            <ng-container *ngTemplateOutlet="template"></ng-container>
        </ng-container>
        <ng-template #span>
            <span [class]="separatorClass" [attr.aria-hidden]="true"></span>
        </ng-template>
    `,
    host: {
        class: 'p-element'
    }
})
export class StepperSeparator {
    @Input() template: any;

    @Input() separatorClass: any;

    @Input() stepperpanel: any;

    @Input() index: any;

    @Input() active: any;

    @Input() highlighted: any;

    @Input() getStepPT: any;
}

@Component({
    selector: 'p-stepperContent',
    template: `
        <div
            [id]="id"
            class="p-stepper-content"
            [ngClass]="{ 'p-toggleable-content': orientation === 'vertical' }"
            role="tabpanel"
            [attr.aria-labelledby]="ariaLabelledby"
            data-pc-name="stepperpanel"
            [attr.data-pc-index]="index"
            [attr.data-p-active]="active"
        >
            <ng-container *ngIf="template; else stepperpanel">
                <ng-container *ngTemplateOutlet="template"></ng-container>
            </ng-container>
            <ng-template #stepperpanel>
                <ng-container ngTemplateOutlet="stepperpanel"></ng-container>
            </ng-template>
        </div>

        ------------------------------------
    `,
    host: {
        class: 'p-element'
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

    @Input() highlighted: any;

    @Input() clickCallback: any;

    @Input() prevCallback: any;

    @Input() nextCallback: any;
}

/**
 * stepper
 * @group Components
 */
@Component({
    selector: 'p-stepper',
    template: `
        <div role="tablist">
            <ng-container *ngIf="startTemplate">
                <ng-container *ngIf="orentation === 'horizontal'; else vertical">
                    <ul>
                        <li
                            *ngFor="let step of stepperpanels; let i = index"
                            [key]="getStepKey(step, index)"
                            class="p-stepper-nav"
                            [attr.aria-current]="isStepActive(index) ? 'step' : undefined"
                            role="presentation"
                            [data-pc-name]="stepperpanel"
                            [data-p-highlight]="isStepActive(index)"
                            [data-p-disabled]="isItemDisabled(index)"
                            [data-pc-index]="index"
                            [data-p-active]="isStepActive(index)"
                        >
                            <ng-container ngTemplateOutlet="headerTemplate">
                                <p-stepperHeader
                                    [id]="getStepHeaderActionId(index)"
                                    [template]="step.children?.header"
                                    [stepperpanel]="step"
                                    [index]="index"
                                    [disabled]="isItemDisabled(index)"
                                    [active]="isStepActive(index)"
                                    [highlighted]="index < d_activeStep"
                                    class="p-stepper-action"
                                    [aria-controls]="getStepContentId(index)"
                                    clickCallback="(event) => onItemClick(event, index)"
                                ></p-stepperHeader>
                                <ng-container *ngIf="index !== stepperpanels.length - 1">
                                    <p-stepperSeparator
                                        *ngIf="index !== stepperpanels.length - 1"
                                        [template]="step.children?.separator"
                                        separatorClass="p-stepper-separator"
                                        [stepperpanel]="step"
                                        [index]="index"
                                        [active]="isStepActive(index)"
                                        [highlighted]="index < d_activeStep"
                                    >
                                    </p-stepperSeparator>
                                </ng-container>
                            </ng-container>
                        </li>
                    </ul>

                    <div class="p-stepper-panels">
                        <ng-container *ngFor="step; of: stepperpanels; let index = index">
                            <StepperContent
                                *ngIf="isStepActive(index)"
                                [id]="getStepContentId(index)"
                                [template]="step?.children?.content"
                                [orientation]="orientation"
                                [stepperpanel]="step"
                                [index]="index"
                                [active]="isStepActive(index)"
                                [highlighted]="index < d_activeStep"
                                clickCallback="(event) => onItemClick(event, index)"
                                prevCallback="(event) => prevCallback(event, index)"
                                nextCallback="(event) => nextCallback(event, index)"
                                [attr.aria-labelledby]="getStepHeaderActionId(index)"
                            />
                        </ng-container>
                    </div>

                    <ng-template #vertical>
                        <div
                            *ngFor="step; of: stepperpanels; let index = index"
                            ref="nav"
                            [key]="getStepKey(step, index)"
                            class="p-stepper-panel"
                            [ngClass]="{ 'p-stepper-panel-active': orientation === 'vertical' && isStepActive(index) }"
                            [attr.aria-current]="isStepActive(index) ? 'step' : undefined"
                            data-pc-name="stepperpanel"
                            [data-p-highlight]="isStepActive(index)"
                            [data-p-disabled]="isItemDisabled(index)"
                            [data-pc-index]="index"
                            [data-p-active]="isStepActive(index)"
                        >
                            <div class="p-stepper-header" [ngClass]="{ 'p-highlight': isStepActive(index), 'p-disabled': isItemDisabled(index) }">
                                <ng-container *ngIf="headerTemplate">
                                    <StepperHeader
                                        :id="getStepHeaderActionId(index)"
                                        :template="step.children?.header"
                                        :stepperpanel="step"
                                        :index="index"
                                        :disabled="isItemDisabled(index)"
                                        :active="isStepActive(index)"
                                        :highlighted="index < d_activeStep"
                                        :class="cx('stepper.action')"
                                        :aria-controls="getStepContentId(index)"
                                        :clickCallback="(event) => onItemClick(event, index)"
                                        :getStepPT="getStepPT"
                                        :getStepProp="getStepProp"
                                    />
                                </ng-container>
                            </div>

                            <div [hidden]="isStepActive(index)" class="p-stepper-toggleable-content">
                                <ng-container *ngIf="index !== stepperpanels.length - 1">
                                    <ng-container *ngTemplateOutlet="separatorTemplate">
                                        <p-stepperSeparator
                                            *ngIf="index !== stepperpanels.length - 1"
                                            [template]="step.children?.separator"
                                            separatorClass="p-stepper-separator"
                                            [stepperpanel]="step"
                                            [index]="index"
                                            [active]="isStepActive(index)"
                                            [highlighted]="index < d_activeStep"
                                        />
                                    </ng-container>
                                </ng-container>

                                <ng-container ngTemplateOutlet="content">
                                    <p-stepperContent
                                        [id]="getStepContentId(index)"
                                        [template]="step?.children?.content"
                                        [stepperpanel]="step"
                                        [index]="index"
                                        [active]="isStepActive(index)"
                                        [highlighted]="index < d_activeStep"
                                        :clickCallback="(event) => onItemClick(event, index)"
                                        :prevCallback="(event) => prevCallback(event, index)"
                                        :nextCallback="(event) => nextCallback(event, index)"
                                        [attr.aria-labelledby]="getStepHeaderActionId(index)"
                                    />
                                </ng-container>
                            </div>
                        </div>
                    </ng-template>
                </ng-container>
            </ng-container>
            <ng-container *ngIf="endTemplate">
                <ng-container *ngTemplateOutlet="endTemplate"></ng-container>
            </ng-container>
        </div>
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'p-stepper p-component'
    }
})
export class Stepper implements OnInit, AfterContentInit {

    @Input() activeStep: number = 0;

    @Input() orientation: string = 'horizontal';

    @Input() linear: boolean = false;

    // id = this.$attrs.id
    id: any;

    d_activeStep = this.activeStep;

    @ContentChildren(PrimeTemplate) templates: Nullable<QueryList<PrimeTemplate>>;

    @ContentChildren(StepperPanel) stepperPanels!: QueryList<StepperPanel>;

    headerTemplate: Nullable<TemplateRef<any>>;

    startTemplate: Nullable<TemplateRef<any>>;

    separatorTemplate: Nullable<TemplateRef<any>>;

    endTemplate: Nullable<TemplateRef<any>>;

    ngOnInit() {
        this.id = this.id || UniqueComponentId();
    }

    isStep(child) {
        return child.type.name === 'StepperPanel';
    }

    isStepActive(index) {
        return this.d_activeStep === index;
    }

    getStepProp(step, name) {
        return step.props ? step.props[name] : undefined;
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
        this.d_activeStep = index;

        // this.$emit('update:activeStep', index);
        // this.$emit('step-change', {
        //     originalEvent: event,
        //     index
        // });
    }
    onItemClick(event, index) {
        if (this.linear) {
            event.preventDefault();

            return;
        }

        if (index !== this.d_activeStep) {
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
    // nextCallback(event, index) {
    //     if (index !== this.stepperpanels.length - 1) {
    //          this.updateActiveStep(event, index + 1);
    //     }
    // }

    ngAfterContentInit() {
        (this.templates as QueryList<PrimeTemplate>).forEach((item) => {
            switch (item.getType()) {
                case 'header':
                    this.headerTemplate = item.template;
                    break;

                case 'start':
                    this.startTemplate = item.template;
                    break;

                case 'separator':
                    this.separatorTemplate = item.template;
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
    imports: [CommonModule, StepperPanelModule],
    exports: [Stepper, SharedModule],
    declarations: [Stepper, StepperHeader, StepperContent]
})
export class StepperModule {}
