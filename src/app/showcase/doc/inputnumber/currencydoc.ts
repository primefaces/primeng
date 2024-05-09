import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'currency-doc',
    template: `
        <app-docsectiontext>
            <p>
                Currency formatting is specified by setting the <i>mode</i> option to currency and <i>currency</i> property. In addition <i>currencyDisplay</i> option allows how the currency is displayed, valid values are "symbol" (default) or
                "code".
            </p>
        </app-docsectiontext>
        <div class="card flex flex-wrap gap-3 p-fluid">
            <div class="flex-auto">
                <label class="block font-bold mb-2" for="currency-us">United States</label>
                <p-inputNumber [(ngModel)]="value1" inputId="currency-us" mode="currency" currency="USD" locale="en-US" />
            </div>
            <div class="flex-auto">
                <label class="block font-bold mb-2" for="currency-germany">Germany</label>
                <p-inputNumber [(ngModel)]="value2" mode="currency" inputId="currency-germany" currency="EUR" locale="de-DE" />
            </div>
            <div class="flex-auto">
                <label class="block font-bold mb-2" for="currency-india">India</label>
                <p-inputNumber [(ngModel)]="value3" mode="currency" inputId="currency-india" currency="INR" currencyDisplay="code" locale="en-IN" />
            </div>
            <div class="flex-auto">
                <label class="block font-bold mb-2" for="currency-japan">Japan</label>
                <p-inputNumber [(ngModel)]="value4" mode="currency" inputId="currency-japan" currency="JPY" locale="jp-JP" />
            </div>
        </div>
        <app-code [code]="code" selector="input-number-currency-demo"></app-code>
    `
})
export class CurrencyDoc {
    value1: number = 1500;

    value2: number = 2500;

    value3: number = 4250;

    value4: number = 5002;

    code: Code = {
        basic: `<p-inputNumber 
    [(ngModel)]="value1" 
    inputId="currency-us" 
    mode="currency" 
    currency="USD" 
    locale="en-US" /> 

<p-inputNumber 
    [(ngModel)]="value2" 
    mode="currency"
    inputId="currency-germany"
    currency="EUR" 
    locale="de-DE" /> 

<p-inputNumber 
    [(ngModel)]="value3"
    mode="currency" 
    inputId="currency-india" 
    currency="INR" 
    currencyDisplay="code" 
    locale="en-IN" /> 

<p-inputNumber 
    [(ngModel)]="value4"
    mode="currency"
    inputId="currency-japan" 
    currency="JPY" 
    locale="jp-JP" /> `,

        html: `
<div class="card flex flex-wrap gap-3 p-fluid">
    <div class="flex-auto">
        <label class="block font-bold mb-2" for="currency-us">
            United States
        </label>
        <p-inputNumber 
            [(ngModel)]="value1" 
            inputId="currency-us" 
            mode="currency" 
            currency="USD" 
            locale="en-US" /> 
    </div>
    <div class="flex-auto">
        <label class="block font-bold mb-2" for="currency-germany">
            Germany
        </label>
        <p-inputNumber 
            [(ngModel)]="value2" 
            mode="currency"
            inputId="currency-germany"
            currency="EUR" 
            locale="de-DE" /> 
    </div>
    <div class="flex-auto">
        <label class="block font-bold mb-2" for="currency-india">
            India
        </label>
        <p-inputNumber 
            [(ngModel)]="value3"
            mode="currency" 
            inputId="currency-india" 
            currency="INR" 
            currencyDisplay="code" 
            locale="en-IN" /> 
    </div>
    <div class="flex-auto">
        <label class="block font-bold mb-2" for="currency-japan">
            Japan
        </label>
        <p-inputNumber 
            [(ngModel)]="value4"
            mode="currency" 
            inputId="currency-japan" 
            currency="JPY" 
            locale="jp-JP" /> 
    </div>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-number-currency-demo',
    templateUrl: './input-number-currency-demo.html',
    standalone: true,
    imports: [FormsModule, InputNumberModule]
})
export class InputNumberCurrencyDemo {
    value1: number = 1500;

    value2: number = 2500;

    value3: number = 4250;

    value4: number = 5002;
}`
    };
}
