import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { AppCode } from '@/components/doc/app.code';

@Component({
    selector: 'step-doc',
    standalone: true,
    imports: [FormsModule, SliderModule, AppDocSectionText, AppCode],
    template: `
        <app-docsectiontext>
            <p>Size of each movement is defined with the <i>step</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-slider [(ngModel)]="value" [step]="20" class="w-56" />
        </div>
        <app-code selector="slider-step-demo"></app-code>
    `
})
export class StepDoc {
    value: number = 20;
}
