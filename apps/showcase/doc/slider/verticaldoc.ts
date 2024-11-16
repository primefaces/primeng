import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'vertical-doc',
    template: `
        <app-docsectiontext>
            <p>Default layout of slider is <i>horizontal</i>, use <i>orientation</i> property for the alternative <i>vertical</i> mode.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-slider [(ngModel)]="value" orientation="vertical" styleClass="h-56" />
        </div>
        <app-code [code]="code" selector="slider-vertical-demo"></app-code>
    `
})
export class VerticalDoc {
    value: number = 50;

    code: Code = {
        basic: `<p-slider [(ngModel)]="value" orientation="vertical" styleClass="h-56" />`,

        html: `<div class="card flex justify-center">
    <p-slider [(ngModel)]="value" orientation="vertical" styleClass="h-56" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Slider } from 'primeng/slider';

@Component({
    selector: 'slider-vertical-demo',
    templateUrl: './slider-vertical-demo.html',
    standalone: true,
    imports: [FormsModule, Slider]
})
export class SliderVerticalDemo {
    value: number = 50
}`
    };
}
