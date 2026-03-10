import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { InputTextModule } from 'primeng/inputtext';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';

@Component({
    selector: 'input-doc',
    standalone: true,
    imports: [FormsModule, SliderModule, InputTextModule, AppDocSectionText, AppCode, AppDemoWrapper],
    template: `
        <app-docsectiontext>
            <p>Slider is connected to an input field using two-way binding.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center">
                <div>
                    <input type="text" pInputText [(ngModel)]="value" class="w-full mb-4" />
                    <p-slider [(ngModel)]="value" class="w-full" />
                </div>
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class InputDoc {
    value: number = 50;
}
