import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'input-doc',
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
        <app-code [code]="code" selector="slider-input-demo"></app-code>
    `
})
export class InputDoc {
    value: number = 50;

    code: Code = {
        basic: `<input type="text" pInputText [(ngModel)]="value" class="w-full mb-4"/>
<p-slider [(ngModel)]="value" class="w-full" />`,

        html: `<div class="card flex justify-center">
    <div>
        <input type="text" pInputText [(ngModel)]="value" class="w-full mb-4"/>
        <p-slider [(ngModel)]="value" class="w-full" />
    </div>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Slider } from 'primeng/slider';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'slider-input-demo',
    templateUrl: './slider-input-demo.html',
    standalone: true,
    imports: [FormsModule, Slider, InputTextModule]
})
export class SliderInputDemo {
    value: number = 50;
}`
    };
}
