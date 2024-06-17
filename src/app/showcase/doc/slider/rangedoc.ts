import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'range-doc',
    template: `
        <app-docsectiontext>
            <p>When <i>range</i> property is present, slider provides two handles to define two values. In range mode, value should be an array instead of a single value.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-slider [(ngModel)]="rangeValues" [range]="true" styleClass="w-14rem" />
        </div>
        <app-code [code]="code" selector="slider-range-demo"></app-code>
    `
})
export class RangeDoc {
    rangeValues: number[] = [20, 80];

    code: Code = {
        basic: `<p-slider [(ngModel)]="rangeValues" [range]="true" styleClass="w-14rem" />`,

        html: `<div class="card flex justify-content-center">
    <p-slider [(ngModel)]="rangeValues" [range]="true" styleClass="w-14rem" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';

@Component({
    selector: 'slider-range-demo',
    templateUrl: './slider-range-demo.html',
    standalone: true,
    imports: [FormsModule, SliderModule]
})
export class SliderRangeDemo {
    rangeValues: number[] = [20, 80];
}`
    };
}
