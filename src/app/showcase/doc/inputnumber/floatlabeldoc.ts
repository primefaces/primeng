import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'float-label-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>A floating label appears on top of the input field when focused.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <span class="p-float-label">
                <p-inputNumber inputId="integeronly" [(ngModel)]="value1"> </p-inputNumber>
                <label htmlFor="number-input">Number</label>
            </span>
        </div>
        <app-code [code]="code" selector="input-number-float-label-demo"></app-code>
    </section>`
})
export class FloatlabelDoc {
    @Input() id: string;

    @Input() title: string;

    value1: number;

    code: Code = {
        basic: `
<span class="p-float-label">
    <p-inputNumber inputId="integeronly" [(ngModel)]="value1"> </p-inputNumber>
    <label htmlFor="number-input">Number</label>
</span>`,

        html: `
<div class="card flex justify-content-center">
    <span class="p-float-label">
        <p-inputNumber inputId="integeronly" [(ngModel)]="value1"> </p-inputNumber>
        <label htmlFor="number-input">Number</label>
    </span>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'input-number-float-label-demo',
    templateUrl: './input-number-float-label-demo.html'
})
export class InputNumberFloatLabelDemo {
    value1: number;
}`
    };
}
