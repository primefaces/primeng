import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'input-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Slider is connected to an input field using two-way binding.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <div>
                <input type="text" pInputText [(ngModel)]="value" class="w-full" />
                <p-slider [(ngModel)]="value" class="w-full"></p-slider>
            </div>
        </div>
        <app-code [code]="code" selector="slider-input-demo"></app-code>
    </section>`
})
export class InputDoc {
    @Input() id: string;

    @Input() title: string;

    value: number = 50;

    code: Code = {
        basic: `
<div>
    <input type="text" pInputText [(ngModel)]="value" class="w-full"/>
    <p-slider [(ngModel)]="value" class="w-full"></p-slider>
</div>`,

        html: `
<div class="card flex justify-content-center">
    <div>
        <input type="text" pInputText [(ngModel)]="value" class="w-full"/>
        <p-slider [(ngModel)]="value" class="w-full"></p-slider>
    </div>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'slider-input-demo',
    templateUrl: './slider-input-demo.html'
})
export class SliderInputDemo {
    value: number = 50;
}`
    };
}
