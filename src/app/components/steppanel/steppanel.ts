import { CommonModule, NgIf } from '@angular/common';
import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, Input, NgModule, Output, QueryList, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { Nullable } from 'primeng/ts-helpers';
import { UniqueComponentId } from 'primeng/utils';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { StepperSeparator } from '../stepper/stepperseparator';
import { Stepper } from 'primeng/stepper';

@Component({
    selector: 'p-stepPanel',
    standalone: true,
    imports: [CommonModule, StepperSeparator],
    template: `
        <ng-template #content>
            <ng-content />
        </ng-template>

        <ng-container *ngIf="isVertical; else notVertical">
            <!-- add transition -->
            <div *ngIf="active" [id]="id" class="p-steppanel" role="tabpanel" [attr.aria-controls]="ariaControls">
                <p-stepperSeparator *ngIf="isSeparatorVisible" />
                <div class="p-steppanel-content">
                    <ng-container *ngTemplateOutlet="content" />
                </div>
            </div>
        </ng-container>

        <ng-template #notVertical>
            <div *ngIf="active" [id]="id" class="p-steppanel" role="tabpanel" [attr.aria-controls]="ariaControls">
                <ng-container *ngTemplateOutlet="content" />
            </div>
        </ng-template>
    `,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./steppanel.css'],
    host: {
        '[class.p-component]': 'true'
    }
})
export class StepPanel {
    @Input() value: string | undefined;

    isSeparatorVisible: boolean = false;

    constructor(public stepper: Stepper, private el: ElementRef) {}

    get isVertical() {
        // return !!this.$pcStepItem;

        return true;
    }

    get active() {
        // let activeValue = !!this.$pcStepItem ? this.$pcStepItem?.value : this.value;
        const activeValue = this.value;

        return activeValue === this.stepper?.d_value;
    }

    get activeValue() {
        // return this.isVertical ? this.$pcStepItem?.value : this.value;
        return this.value;
    }

    get id() {
        return `${this.stepper.id}_steppanel_${this.activeValue}`;
    }

    get ariaControls() {
        return `${this.stepper?.id}_step_${this.activeValue}`;
    }
}
