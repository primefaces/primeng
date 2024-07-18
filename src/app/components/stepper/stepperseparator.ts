import { CommonModule } from '@angular/common';
import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Input, NgModule, Output, QueryList, TemplateRef, ViewEncapsulation } from '@angular/core';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { Nullable } from 'primeng/ts-helpers';
import { UniqueComponentId } from 'primeng/utils';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'p-stepperSeparator',
    standalone: true,
    template: `
       <span class="p-stepper-separator"></span>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        
        '[class.p-component]': 'true'
    }
})
export class StepperSeparator {}
