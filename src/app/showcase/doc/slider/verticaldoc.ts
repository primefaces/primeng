import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'vertical-doc',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Default layout of slider is <i>horizontal</i>, use <i>orientation</i> property for the alternative <i>vertical</i> mode.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-slider [(ngModel)]="value" orientation="vertical"></p-slider>
        </div>
        <app-code [code]="code" selector="slider-vertical-demo"></app-code>
    </section>`
})
export class VerticalDoc {
    @Input() id: string;

    @Input() title: string;

    value!: number;

    code: Code = {
        basic: `
<p-slider [(ngModel)]="value" orientation="vertical"></p-slider>`,

        html: `
<div class="card flex justify-content-center">
    <p-slider [(ngModel)]="value" orientation="vertical"></p-slider>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'slider-vertical-demo',
    templateUrl: './slider-vertical-demo.html'
})
export class SliderVerticalDemo {
    value!: number;
}`
    };
}
