import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'vertical-doc',
    template: `
        <app-docsectiontext>
            <p>Default layout of slider is <i>horizontal</i>, use <i>orientation</i> property for the alternative <i>vertical</i> mode.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-slider [(ngModel)]="value" orientation="vertical" />
        </div>
        <app-code [code]="code" selector="slider-vertical-demo"></app-code>
    `
})
export class VerticalDoc {
    value!: number;

    code: Code = {
        basic: `<p-slider [(ngModel)]="value" orientation="vertical" />`,

        html: `<div class="card flex justify-content-center">
    <p-slider [(ngModel)]="value" orientation="vertical" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
        
@Component({
    selector: 'slider-vertical-demo',
    templateUrl: './slider-vertical-demo.html',
    standalone: true,
    imports: [FormsModule, SliderModule]
})
export class SliderVerticalDemo {
    value!: number;
}`
    };
}
