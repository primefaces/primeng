import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>Two-way binding is defined using the standard <i>ngModel</i> directive.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-slider [(ngModel)]="value" />
        </div>
        <app-code [code]="code" selector="slider-basic-demo"></app-code>
    `
})
export class BasicDoc {
    value!: number;

    code: Code = {
        basic: `<p-slider [(ngModel)]="value" />`,

        html: `<div class="card flex justify-content-center">
    <p-slider [(ngModel)]="value" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';

@Component({
    selector: 'slider-basic-demo',
    templateUrl: './slider-basic-demo.html',
    standalone: true,
    imports: [FormsModule, SliderModule]
})
export class SliderBasicDemo {
    value!: number;
}`
    };
}
