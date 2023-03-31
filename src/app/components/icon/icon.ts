import { NgModule, Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef, AfterContentInit, TemplateRef, QueryList, ContentChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { PrimeTemplate, SharedModule } from 'primeng/api';

@Component({
    selector: 'p-icon',
    template: '<div></div>',
    host: {
        class: 'p-element'
    }
})
export class Icon {}

@NgModule({
    imports: [CommonModule, SharedModule],
    exports: [Icon, ButtonModule, SharedModule],
    declarations: [Icon]
})
export class IconModule {}
