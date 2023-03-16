import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'inputnumber-numerals-demo',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id">
            <p>InputNumber is used as a controlled input with <i>[(ngModel)]</i> properties.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap gap-3 p-fluid">
            <div class="flex-auto">
                <label class="mb-2 font-bold block" for="integeronly">Integer Only</label>
                <p-inputNumber inputId="integeronly" [(ngModel)]="value1"> </p-inputNumber>
            </div>
            <div class="flex-auto">
                <label class="mb-2 font-bold block" for="withoutgrouping">Without Grouping</label>
                <p-inputNumber [(ngModel)]="value2" mode="decimal" inputId="withoutgrouping" [useGrouping]="false"> </p-inputNumber>
            </div>
            <div class="flex-auto">
                <label class="mb-2 font-bold block" for="minmaxfraction">Min-Max Fraction Digits</label>
                <p-inputNumber [(ngModel)]="value3" inputId="minmaxfraction" mode="decimal" [minFractionDigits]="2" [maxFractionDigits]="5"> </p-inputNumber>
            </div>
            <div class="flex-auto">
                <label class="mb-2 font-bold block" for="minmax">Min-Max Boundaries</label>
                <p-inputNumber [(ngModel)]="value4" inputId="minmax" inputId="minmax" mode="decimal" [min]="0" [max]="100"> </p-inputNumber>
            </div>
        </div>
        <app-code [code]="code" selector="inputnumber-numerals-demo"></app-code>
    </div>`
})
export class NumeralsDoc {
    @Input() id: string;

    @Input() title: string;

    value1: number = 42723;

    value2: number = 58151;

    value3: number = 2351.35;

    value4: number = 50;

    code: Code = {
        basic: `
<p-inputNumber inputId="integeronly" [(ngModel)]="value1"> </p-inputNumber>
<p-inputNumber [(ngModel)]="value2" mode="decimal" inputId="withoutgrouping" [useGrouping]="false"> </p-inputNumber>
<p-inputNumber [(ngModel)]="value3" inputId="minmaxfraction" mode="decimal" [minFractionDigits]="2" [maxFractionDigits]="5"> </p-inputNumber>
<p-inputNumber [(ngModel)]="value4" inputId="minmax" inputId="minmax" mode="decimal" [min]="0" [max]="100"> </p-inputNumber>
`,

        html: `
<div class="card flex flex-wrap gap-3 p-fluid">
    <div class="flex-auto">
        <label for="integeronly">Integer Only</label>
        <p-inputNumber inputId="integeronly" [(ngModel)]="value1"> </p-inputNumber>
    </div>
    <div class="flex-auto">
        <label for="withoutgrouping">Without Grouping</label>
        <p-inputNumber [(ngModel)]="value2" mode="decimal" inputId="withoutgrouping" [useGrouping]="false"> </p-inputNumber>
    </div>
    <div class="flex-auto">
        <label for="minmaxfraction">Min-Max Fraction Digits</label>
        <p-inputNumber [(ngModel)]="value3" inputId="minmaxfraction" mode="decimal" [minFractionDigits]="2" [maxFractionDigits]="5"> </p-inputNumber>
    </div>
    <div class="flex-auto">
        <label for="minmax">Min-Max Boundaries</label>
        <p-inputNumber [(ngModel)]="value4" inputId="minmax" inputId="minmax" mode="decimal" [min]="0" [max]="100"> </p-inputNumber>
    </div>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'inputnumber-numerals-demo',
    templateUrl: './inputnumber-numerals-demo.html',
    styleUrls: ['./inputnumber-numerals-demo.scss']
})
export class InputnumberNumeralsDemo {
    value1: number = 42723;

    value2: number = 58151;

    value3: number = 2351.35;

    value4: number = 50;
}`
    };
}
