import { CommonModule } from '@angular/common';
import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Input, NgModule, Output, QueryList, TemplateRef, ViewEncapsulation } from '@angular/core';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { Nullable } from 'primeng/ts-helpers';
import { UniqueComponentId } from 'primeng/utils';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'p-stepPanels',
    standalone: true,
    template: ` <ng-content></ng-content> `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./steppanels.css'],
    host: {
        '[class.p-component]': 'true',
        '[class.p-steppanels]': 'true'
    }
})
export class StepPanels {
    @Input() value: string | undefined
}
