import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'inputnumber-prefixsuffix-demo',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Custom texts e.g. units can be placed before or after the input section with the <i>prefix</i> and <i>suffix</i> properties.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap gap-3 p-fluid">
            <div class="flex-auto">
                <label class="font-bold block mb-2" for="mile">Mile</label>
                <p-inputNumber [(ngModel)]="value1" inputId="mile" suffix=" mi"> </p-inputNumber>
            </div>
            <div class="flex-auto">
                <label class="font-bold block mb-2" for="percent">Percent</label>
                <p-inputNumber [(ngModel)]="value2" inputId="percent" prefix="%"> </p-inputNumber>
            </div>
            <div class="flex-auto">
                <label class="font-bold block mb-2" for="expiry">Expiry</label>
                <p-inputNumber [(ngModel)]="value3" inputId="expiry" prefix="Expires in " suffix=" days"> </p-inputNumber>
            </div>
            <div class="flex-auto">
                <label class="font-bold block mb-2" for="temperature">Temperature</label>
                <p-inputNumber [(ngModel)]="value4" prefix="↑ " inputId="temperature" suffix="℃" [min]="0" [max]="40"> </p-inputNumber>
            </div>
        </div>
        <app-code [code]="code" selector="inputnumber-prefixsuffix-demo"></app-code>
    </section>`
})
export class PrefixSuffixDoc {
    @Input() id: string;

    @Input() title: string;

    value1: number = 20;

    value2: number = 50;

    value3: number = 10;

    value4: number = 20;

    code: Code = {
        basic: `
<p-inputNumber [(ngModel)]="value1" inputId="mile" suffix=" mi"> </p-inputNumber>
<p-inputNumber [(ngModel)]="value2" inputId="percent" prefix="%"> </p-inputNumber>
<p-inputNumber [(ngModel)]="value3" inputId="expiry" prefix="Expires in " suffix=" days"> </p-inputNumber>
<p-inputNumber [(ngModel)]="value4" prefix="↑ " inputId="temperature" suffix="℃" [min]="0" [max]="40"> </p-inputNumber>`,

        html: `
<div class="card flex flex-wrap gap-3 p-fluid">
    <div class="flex-auto">
        <label class="font-bold block mb-2" for="mile">Mile</label>
        <p-inputNumber [(ngModel)]="value1" inputId="mile" suffix=" mi"> </p-inputNumber>
    </div>
    <div class="flex-auto">
        <label class="font-bold block mb-2" for="percent">Percent</label>
        <p-inputNumber [(ngModel)]="value2" inputId="percent" prefix="%"> </p-inputNumber>
    </div>
    <div class="flex-auto">
        <label class="font-bold block mb-2" for="expiry">Expiry</label>
        <p-inputNumber [(ngModel)]="value3" inputId="expiry" prefix="Expires in " suffix=" days"> </p-inputNumber>
    </div>
    <div class="flex-auto">
        <label class="font-bold block mb-2" for="temperature">Temperature</label>
        <p-inputNumber [(ngModel)]="value4" prefix="↑ " inputId="temperature" suffix="℃" [min]="0" [max]="40"> </p-inputNumber>
    </div>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'inputnumber-prefixsuffix-demo',
    templateUrl: './inputnumber-prefixsuffix-demo.html',
    styleUrls: ['./inputnumber-prefixsuffix-demo.scss']
})

export class InputnumberPrefixsuffixDemo {
    value1: number = 20;

    value2: number = 50;

    value3: number = 10;

    value4: number = 20;
}`
    };
}
