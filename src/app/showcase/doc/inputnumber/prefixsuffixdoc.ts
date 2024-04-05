import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'prefix-suffix-doc',
    template: `
        <app-docsectiontext>
            <p>Custom texts e.g. units can be placed before or after the input section with the <i>prefix</i> and <i>suffix</i> properties.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap gap-3 p-fluid">
            <div class="flex-auto">
                <label class="font-bold block mb-2" for="mile">Mile</label>
                <p-inputNumber [(ngModel)]="value1" inputId="mile" suffix=" mi" />
            </div>
            <div class="flex-auto">
                <label class="font-bold block mb-2" for="percent">Percent</label>
                <p-inputNumber [(ngModel)]="value2" inputId="percent" prefix="%" />
            </div>
            <div class="flex-auto">
                <label class="font-bold block mb-2" for="expiry">Expiry</label>
                <p-inputNumber [(ngModel)]="value3" inputId="expiry" prefix="Expires in " suffix=" days" />
            </div>
            <div class="flex-auto">
                <label class="font-bold block mb-2" for="temperature">Temperature</label>
                <p-inputNumber [(ngModel)]="value4" prefix="↑ " inputId="temperature" suffix="℃" [min]="0" [max]="40" />
            </div>
        </div>
        <app-code [code]="code" selector="input-number-prefix-suffix-demo"></app-code>
    `
})
export class PrefixSuffixDoc {
    value1: number = 20;

    value2: number = 50;

    value3: number = 10;

    value4: number = 20;

    code: Code = {
        basic: `<p-inputNumber 
    [(ngModel)]="value1" 
    inputId="mile" 
    suffix=" mi"/> 

<p-inputNumber 
    [(ngModel)]="value2" 
    inputId="percent" 
    prefix="%"/> 

<p-inputNumber 
    [(ngModel)]="value3"
    inputId="expiry" 
    prefix="Expires in "
    suffix=" days"/> 

<p-inputNumber 
    [(ngModel)]="value4" 
    prefix="↑ " 
    inputId="temperature" 
    suffix="℃" 
    [min]="0" 
    [max]="40"/> `,

        html: `<div class="card flex flex-wrap gap-3 p-fluid">
    <div class="flex-auto">
        <label class="font-bold block mb-2" for="mile">
            Mile
        </label>
        <p-inputNumber 
            [(ngModel)]="value1" 
            inputId="mile" 
            suffix=" mi"/> 
    </div>
    <div class="flex-auto">
        <label class="font-bold block mb-2" for="percent">
            Percent
        </label>
        <p-inputNumber 
            [(ngModel)]="value2"
            inputId="percent"
            prefix="%"/> 
    </div>
    <div class="flex-auto">
        <label class="font-bold block mb-2" for="expiry">
            Expiry
        </label>
        <p-inputNumber 
            [(ngModel)]="value3"
            inputId="expiry" 
            prefix="Expires in "
            suffix=" days"/> 
    </div>
    <div class="flex-auto">
        <label class="font-bold block mb-2" for="temperature">
            Temperature
        </label>
        <p-inputNumber 
            [(ngModel)]="value4"
            prefix="↑ "
            inputId="temperature"
            suffix="℃" 
            [min]="0" 
            [max]="40"/>
    </div>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-number-prefix-suffix-demo',
    templateUrl: './input-number-prefix-suffix-demo.html',
    standalone: true,
    imports: [FormsModule, InputNumberModule]
})
export class InputNumberPrefixSuffixDemo {
    value1: number = 20;

    value2: number = 50;

    value3: number = 10;

    value4: number = 20;
}`
    };
}
