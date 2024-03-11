import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, Inject, Input, NgModule, Output, PLATFORM_ID, QueryList, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { Nullable, VoidListener } from 'primeng/ts-helpers';

/**
 * The Stepper component displays a wizard-like workflow by guiding users through the multi-step progression.
 * @group Components
 */
@Component({
    selector: 'p-stepper',
    template: `
        <div>
            test
        </div>
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: '',
       
    }
})
export class Stepper {
    
}

@NgModule({
    imports: [CommonModule],
    exports: [Stepper, SharedModule],
    declarations: [Stepper]
})
export class StepperModule {}
