import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'step-doc',
    template: `
        <app-docsectiontext>
            <p>Size of each movement is defined with the <i>step</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-slider [(ngModel)]="value" [step]="20" styleClass="w-56" />
        </div>
        <app-code [code]="code" selector="slider-step-demo"></app-code>
    `
})
export class StepDoc {
    value: number = 20;

    code: Code = {
        basic: `<p-slider [(ngModel)]="value" [step]="20" styleClass="w-56" />`,

        html: `<div class="card flex justify-center">
    <p-slider [(ngModel)]="value" [step]="20" styleClass="w-56" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Slider } from 'primeng/slider';

@Component({
    selector: 'slider-step-demo',
    templateUrl: './slider-step-demo.html',
    standalone: true,
    imports: [FormsModule, Slider]
})
export class SliderStepDemo {
    value: number = 20;
}`
    };
}
