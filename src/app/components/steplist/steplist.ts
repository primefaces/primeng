import { CommonModule } from '@angular/common';
import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Input, NgModule, Output, QueryList, TemplateRef, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'p-stepList',
    
    standalone: true,
    template: ` <ng-content></ng-content> `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./steplist.css'],
    host: {
        '[class.p-component]': 'true',
        '[class.p-steplist]': 'true'
    }
})
export class StepList {}
