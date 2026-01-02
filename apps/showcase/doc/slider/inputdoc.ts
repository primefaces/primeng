import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { InputTextModule } from 'primeng/inputtext';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { AppCode } from '@/components/doc/app.code';

@Component({
    selector: 'input-doc',
    standalone: true,
    imports: [FormsModule, SliderModule, InputTextModule, AppDocSectionText, AppCode],
    template: `
        <app-docsectiontext>
            <p>Slider is connected to an input field using two-way binding.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <div>
                <input type="text" pInputText [(ngModel)]="value" class="w-full mb-4" />
                <p-slider [(ngModel)]="value" class="w-full" />
            </div>
        </div>
        <app-code selector="slider-input-demo"></app-code>
    `
})
export class InputDoc {
    value: number = 50;
}
