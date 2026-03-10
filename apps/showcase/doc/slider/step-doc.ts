import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';

@Component({
    selector: 'step-doc',
    standalone: true,
    imports: [FormsModule, SliderModule, AppDocSectionText, AppCode, AppDemoWrapper],
    template: `
        <app-docsectiontext>
            <p>Size of each movement is defined with the <i>step</i> property.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center">
                <p-slider [(ngModel)]="value" [step]="20" class="w-56" />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class StepDoc {
    value: number = 20;
}
