import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'step-doc',
    template: `
        <app-docsectiontext>
            <p>Size of each movement is defined with the <i>step</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-slider [(ngModel)]="value" [step]="20" styleClass="w-14rem" />
        </div>
        <app-code [code]="code" selector="slider-step-demo"></app-code>
    `
})
export class StepDoc {
    value!: number;

    code: Code = {
        basic: `<p-slider [(ngModel)]="value" [step]="20" styleClass="w-14rem" />`,

        html: `<div class="card flex justify-content-center">
    <p-slider [(ngModel)]="value" [step]="20" styleClass="w-14rem" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';

@Component({
    selector: 'slider-step-demo',
    templateUrl: './slider-step-demo.html',
    standalone: true,
    imports: [FormsModule, SliderModule]
})
export class SliderStepDemo {
    value!: number;
}`
    };
}
