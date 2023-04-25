import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'currency-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>
                Currency formatting is specified by setting the <i>mode</i> option to currency and <i>currency</i> property. In addition <i>currencyDisplay</i> option allows how the currency is displayed, valid values are "symbol" (default) or
                "code".
            </p>
        </app-docsectiontext>
        <div class="card flex flex-wrap gap-3 p-fluid">
            <div class="flex-auto">
                <label class="block font-bold mb-2" for="currency-us">United States</label>
                <p-inputNumber [(ngModel)]="value1" inputId="currency-us" mode="currency" currency="USD" locale="en-US"> </p-inputNumber>
            </div>
            <div class="flex-auto">
                <label class="block font-bold mb-2" for="currency-germany">Germany</label>
                <p-inputNumber [(ngModel)]="value2" mode="currency" inputId="currency-germany" currency="EUR" locale="de-DE"> </p-inputNumber>
            </div>
            <div class="flex-auto">
                <label class="block font-bold mb-2" for="currency-india">India</label>
                <p-inputNumber [(ngModel)]="value3" mode="currency" inputId="currency-india" currency="INR" currencyDisplay="code" locale="en-IN"> </p-inputNumber>
            </div>
            <div class="flex-auto">
                <label class="block font-bold mb-2" for="currency-japan">Japan</label>
                <p-inputNumber [(ngModel)]="value4" mode="currency" inputId="currency-japan" currency="JPY" locale="jp-JP"> </p-inputNumber>
            </div>
        </div>
        <app-code [code]="code" selector="input-number-currency-demo"></app-code>
    </section>`
})
export class CurrencyDoc {
    @Input() id: string;

    @Input() title: string;

    value1: number = 1500;

    value2: number = 2500;

    value3: number = 4250;

    value4: number = 5002;

    code: Code = {
        basic: `
<p-inputNumber [(ngModel)]="value1" inputId="currency-us" mode="currency" currency="USD" locale="en-US"> </p-inputNumber>
<p-inputNumber [(ngModel)]="value2" mode="currency" inputId="currency-germany" currency="EUR" locale="de-DE"> </p-inputNumber>
<p-inputNumber [(ngModel)]="value3" mode="currency" inputId="currency-india" currency="INR" currencyDisplay="code" locale="en-IN"> </p-inputNumber>
<p-inputNumber [(ngModel)]="value4" mode="currency" inputId="currency-japan" currency="JPY" locale="jp-JP"> </p-inputNumber>`,

        html: `
<div class="card flex flex-wrap gap-3 p-fluid">
    <div class="flex-auto">
        <label class="block font-bold mb-2" for="currency-us">United States</label>
        <p-inputNumber [(ngModel)]="value1" inputId="currency-us" mode="currency" currency="USD" locale="en-US"> </p-inputNumber>
    </div>
    <div class="flex-auto">
        <label class="block font-bold mb-2" for="currency-germany">Germany</label>
        <p-inputNumber [(ngModel)]="value2" mode="currency" inputId="currency-germany" currency="EUR" locale="de-DE"> </p-inputNumber>
    </div>
    <div class="flex-auto">
        <label class="block font-bold mb-2" for="currency-india">India</label>
        <p-inputNumber [(ngModel)]="value3" mode="currency" inputId="currency-india" currency="INR" currencyDisplay="code" locale="en-IN"> </p-inputNumber>
    </div>
    <div class="flex-auto">
        <label class="block font-bold mb-2" for="currency-japan">Japan</label>
        <p-inputNumber [(ngModel)]="value4" mode="currency" inputId="currency-japan" currency="JPY" locale="jp-JP"> </p-inputNumber>
    </div>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'input-number-currency-demo',
    templateUrl: './input-number-currency-demo.html'
})
export class InputNumberCurrencyDemo {
    value1: number = 1500;

    value2: number = 2500;

    value3: number = 4250;

    value4: number = 5002;
}`
    };
}
