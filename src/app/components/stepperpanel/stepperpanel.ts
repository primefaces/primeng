import { CommonModule } from '@angular/common';
import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, Input, NgModule, OnInit, QueryList, TemplateRef, ViewEncapsulation } from '@angular/core';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { Nullable } from 'primeng/ts-helpers';
import { UniqueComponentId } from '../utils/uniquecomponentid';

@Component({
    selector: 'p-stepperPanel',
    template: `
        <ng-content></ng-content>
    `,
    host: {
        class: 'p-element'
    }
})
export class StepperPanel {
    @Input() header 
}


@NgModule({
    imports: [CommonModule],
    exports: [StepperPanel, SharedModule],
    declarations: [StepperPanel]
})
export class StepperPanelModule {}
