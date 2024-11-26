import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>Two-way binding is defined using the standard <i>ngModel</i> directive.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-slider [(ngModel)]="value" styleClass="w-56" />
        </div>
        <app-code [code]="code" selector="slider-basic-demo"></app-code>
    `
})
export class BasicDoc {
    value!: number;

    code: Code = {
        basic: `<p-slider [(ngModel)]="value" styleClass="w-56" />`,

        html: `<div class="card flex justify-center">
    <p-slider [(ngModel)]="value" styleClass="w-56" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Slider } from 'primeng/slider';

@Component({
    selector: 'slider-basic-demo',
    templateUrl: './slider-basic-demo.html',
    standalone: true,
    imports: [FormsModule, Slider]
})
export class SliderBasicDemo {
    value!: number;
}`
    };
}
