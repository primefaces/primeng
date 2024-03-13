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
        forwardRef
    } from '@angular/core';
    import { PrimeTemplate, SharedModule } from 'primeng/api';
    import { Nullable } from 'primeng/ts-helpers';
    import { UniqueComponentId } from '../utils/uniquecomponentid';
    @Component({
        selector: 'p-stepperHeader',
        template: `
            <ng-container *ngIf="template; else button">
            <!-- contextle dişarı aç -->
                <ng-container *ngTemplateOutlet="template"></ng-container>
            </ng-container>
            <ng-template #button>
                <p-button [id]="id" class="p-stepper-action" role="tab" [tabindex]="disabled ? -1 : undefined" [aria-controls]="ariaControls" (click)="clickCallback.emit()">
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

        @Input() ariaControls: any;

        @Output() clickCallback = new EventEmitter<void>();
    }

    @Component({
        selector: 'p-stepperSeparator',
        template: ``,
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
        template: ` <div
            [id]="id"
            class="p-stepper-content"
            [ngClass]="{ 'p-toggleable-content': orientation === 'vertical' }"
            role="tabpanel"
            [attr.aria-labelledby]="ariaLabelledby"
            data-pc-name="stepperpanel"
            [attr.data-pc-index]="index"
            [attr.data-p-active]="active"
        >
            <ng-container *ngIf="template; else stepperPanelRef">
                <ng-container *ngTemplateOutlet="template"></ng-container>
            </ng-container>
            <ng-template #stepperPanelRef>
                <ng-container *ngIf="stepperpanel">
                    <ng-container *ngTemplateOutlet="stepperpanel"></ng-container>
                </ng-container>
            </ng-template>
        </div>`,
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
    @Component({
        selector: 'p-stepperPanel',
        template: ` <ng-content></ng-content> `,
        host: {
            class: 'p-element'
        }
    })
    export class StepperPanel {
        @Input() header;

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
                    case 'seperator':
                        this.separatorTemplate = item.template;
                        break;
                }
            });
        }
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
                    <ng-container *ngTemplateOutlet="startTemplate"></ng-container>
                </ng-container>
                <ng-container *ngIf="orientation === 'horizontal'">
                    <ul>
                        <ng-template ngFor let-step [ngForOf]="panels" let-index="index">
                            <li
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
                                <p-stepperHeader
                                    [id]="getStepHeaderActionId(index)"
                                    [template]="step.headerTemplate"
                                    [stepperpanel]="step"
                                    [getStepProp]="getStepProp(step, 'header')"
                                    [index]="index"
                                    [disabled]="isItemDisabled(index)"
                                    [active]="isStepActive(index)"
                                    [highlighted]="index < d_activeStep"
                                    [class]="'p-stepper-action'"
                                    [aria-controls]="getStepContentId(index)"
                                    (clickCallback)="onItemClick($event, index)"
                                ></p-stepperHeader>
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
                                    [highlighted]="index < d_activeStep"
                                    (clickCallback)="onItemClick.emit($event, index)"
                                    [prevCallback]="prevCallback(event, index)"
                                    [nextCallback]="nextCallback(event, index)"
                                    [attr.aria-labelledby]="getStepHeaderActionId(index)"
                                />
                            </ng-container>
                        </ng-template>
                    </div>
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
    export class Stepper implements AfterContentInit {
        // @ContentChildren(PrimeTemplate) templates: Nullable<QueryList<PrimeTemplate>>;

        @Input() activeStep: number = 0;

        @Input() orientation: string = 'horizontal';

        @Input() linear: boolean = false;

        // id = this.$attrs.id
        id: any;

        @ContentChildren(StepperPanel) stepperpanels: QueryList<StepperPanel> | undefined;

        @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

        @Output() clickCallback: EventEmitter<any> = new EventEmitter<any>();

        headerTemplate: Nullable<TemplateRef<any>>;

        startTemplate: Nullable<TemplateRef<any>>;

        separatorTemplate: Nullable<TemplateRef<any>>;

        endTemplate: Nullable<TemplateRef<any>>;

        panels!: any[];

        ngOnInit() {
            this.id = this.id || UniqueComponentId();
        }

        isStep(child) {
            return child.type.name === 'StepperPanel';
        }

        isStepActive(index) {
            return this.activeStep === index;
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
            this.activeStep = index;

            // this.$emit('update:activeStep', index);
            // this.$emit('step-change', {
            //     originalEvent: event,
            //     index
            // });
        }
        onItemClick(event, index) {
            console.log('123123123213123');

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
            console.log(this.panels);
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
