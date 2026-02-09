import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KnobModule } from 'primeng/knob';
import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'step-doc',
    standalone: true,
    imports: [FormsModule, KnobModule, AppCodeModule, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Size of each movement is defined with the <i>step</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-knob [(ngModel)]="value" [step]="10" />
        </div>
        <app-code></app-code>
    `
})
export class StepDoc {
    value!: number;
}
