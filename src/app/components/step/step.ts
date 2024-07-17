import { CommonModule } from '@angular/common';
import { AfterContentInit, booleanAttribute, ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Input, NgModule, Output, QueryList, TemplateRef, ViewEncapsulation } from '@angular/core';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { Nullable } from 'primeng/ts-helpers';
import { UniqueComponentId } from 'primeng/utils';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { StepperSeparator } from '../stepper/stepperseparator';
import { Stepper } from 'primeng/stepper';

@Component({
    selector: 'p-step',
    standalone: true,
    template: `
        <div class="p-step">
            <button [id]="id" class="p-step-header" role="tab" type="button" [tabindex]="disabled ? -1 : undefined" [attr.aria-controls]="ariaControls" [disabled]="disabled" (click)="onStepClick()">
                <span class="p-step-number">{{ activeValue }}</span>
                <span class="p-step-title">
                    <ng-content></ng-content>
                </span>
            </button>
            <p-stepperSeparator></p-stepperSeparator>
        </div>
    `,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./step.css'],
    host: {
        '[class.p-component]': 'true'
    },
    imports: [StepperSeparator]
})
export class Step {
    @Input() value: string | number | undefined;

    @Input({ transform: booleanAttribute }) disabled: boolean = false;

    isSeparatorVisible = false

    constructor(private stepper: Stepper) {}

    get active() {
        return this.stepper.isStepActive(this.activeValue);
    }

    get ariaControls() {
        return `${this.stepper?.id}_steppanel_${this.activeValue}`;
    }
    
    get activeValue() {
        // return !!this.$pcStepItem ? this.$pcStepItem?.value : this.value;
        return this.value;
    }

    get id() {
        return `${this.stepper.id}_step_${this.activeValue}`;
    }

    isStepDisabled() {
        return this.stepper.isStepDisabled();
    }

    onStepClick() {
        this.stepper.updateValue(this.activeValue);
    }
}
