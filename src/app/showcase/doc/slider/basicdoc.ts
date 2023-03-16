import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'slider-basic-demo',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Two-way binding is defined using the standard ngModel directive.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-slider [(ngModel)]="value"></p-slider>
        </div>
        <app-code [code]="code" selector="slider-basic-demo"></app-code>
    </div>`
})
export class BasicDoc {
    @Input() id: string;

    @Input() title: string;

    value: number;

    code: Code = {
        basic: `
<p-slider [(ngModel)]="value"></p-slider>`,

        html: `
<div class="card flex justify-content-center">
    <p-slider [(ngModel)]="value"></p-slider>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'slider-basic-demo',
    templateUrl: './slider-basic-demo.html',
    styleUrls: ['./slider-basic-demo.scss']
})
export class SliderBasicDemo {
    value: number;
}`
    };
}
