import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'range-doc',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>When <i>range</i> property is present, slider provides two handles to define two values. In range mode, value should be an array instead of a single value.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-slider [(ngModel)]="rangeValues" [range]="true"></p-slider>
        </div>
        <app-code [code]="code" selector="slider-range-demo"></app-code>
    </section>`
})
export class RangeDoc {
    @Input() id: string;

    @Input() title: string;

    rangeValues: number[] = [20, 80];

    code: Code = {
        basic: `
<p-slider [(ngModel)]="rangeValues" [range]="true"></p-slider>`,

        html: `
<div class="card flex justify-content-center">
    <p-slider [(ngModel)]="rangeValues" [range]="true"></p-slider>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'slider-range-demo',
    templateUrl: './slider-range-demo.html'
})
export class SliderRangeDemo {
    rangeValues: number[] = [20, 80];
}`
    };
}
