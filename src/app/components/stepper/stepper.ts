import { CommonModule, NgIf } from '@angular/common';
import { AfterContentInit, booleanAttribute, ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, inject, Input, NgModule, Output, QueryList, SimpleChanges, TemplateRef, ViewEncapsulation } from '@angular/core';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { Nullable } from 'primeng/ts-helpers';
import { UniqueComponentId } from 'primeng/utils';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { StepperStyle } from './style/stepperstyle';
import { BaseComponent } from 'primeng/basecomponent';

/**
 * The Stepper component displays a wizard-like workflow by guiding users through the multi-step progression.
 * @group Components
 */
@Component({
    selector: 'p-stepper',
    standalone: true,
    imports: [NgIf],
    template: `
        <div role="tablist" class="p-stepper">
            <ng-container *ngIf="startTemplate">
                <ng-container *ngTemplateOutlet="startTemplate"></ng-container>
            </ng-container>

            <ng-content></ng-content>

            <ng-container *ngIf="endTemplate">
                <ng-container *ngTemplateOutlet="endTemplate"></ng-container>
            </ng-container>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class.p-component]': 'true'
    },
    providers: [StepperStyle]
})
export class Stepper extends BaseComponent implements AfterContentInit {
    @Input() value: string | number;

    @Input({ transform: booleanAttribute }) linear: boolean = false;

    @Output() onValueUpdate: EventEmitter<Event> = new EventEmitter<Event>();

    id: string;

    d_value: any;

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    _componentStyle = inject(StepperStyle);

    startTemplate: Nullable<TemplateRef<any>>;

    endTemplate: Nullable<TemplateRef<any>>;

    ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);
        if (changes.value) {
            this.d_value = changes.value.currentValue;
        }
    }

    ngOnInit() {
        super.ngOnInit();
        this.id = UniqueComponentId();
    }

    ngAfterContentInit() {
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

    updateValue(newValue) {
        if (this.d_value !== newValue) {
            this.d_value = newValue;
            this.onValueUpdate.emit(newValue);
        }
    }

    isStepActive(value) {
        return this.d_value === value;
    }

    isStepDisabled() {
        return this.linear;
    }
}
