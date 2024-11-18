import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'numerals-doc',
    template: `
        <app-docsectiontext>
            <p>InputNumber is used as a controlled input with <i>ngModel</i> property.</p>
        </app-docsectiontext>
        <p-fluid class="card flex flex-wrap gap-4">
            <div class="flex-auto">
                <label class="mb-2 font-bold block" for="integeronly">Integer Only</label>
                <p-inputnumber inputId="integeronly" [(ngModel)]="value1" />
            </div>
            <div class="flex-auto">
                <label class="mb-2 font-bold block" for="withoutgrouping">Without Grouping</label>
                <p-inputnumber [(ngModel)]="value2" mode="decimal" inputId="withoutgrouping" [useGrouping]="false" />
            </div>
            <div class="flex-auto">
                <label class="mb-2 font-bold block" for="minmaxfraction">Min-Max Fraction Digits</label>
                <p-inputnumber [(ngModel)]="value3" inputId="minmaxfraction" mode="decimal" [minFractionDigits]="2" [maxFractionDigits]="5" />
            </div>
            <div class="flex-auto">
                <label class="mb-2 font-bold block" for="minmax">Min-Max Boundaries</label>
                <p-inputnumber [(ngModel)]="value4" inputId="minmax" mode="decimal" [min]="0" [max]="100" />
            </div>
        </p-fluid>
        <app-code [code]="code" selector="input-number-numerals-demo"></app-code>
    `
})
export class NumeralsDoc {
    value1: number = 42723;

    value2: number = 58151;

    value3: number = 2351.35;

    value4: number = 50;

    code: Code = {
        basic: `<p-inputnumber inputId="integeronly" [(ngModel)]="value1" />
<p-inputnumber [(ngModel)]="value2" mode="decimal" inputId="withoutgrouping" [useGrouping]="false" />
<p-inputnumber [(ngModel)]="value3" inputId="minmaxfraction" mode="decimal" [minFractionDigits]="2" [maxFractionDigits]="5" />
<p-inputnumber [(ngModel)]="value4" inputId="minmax" mode="decimal" [min]="0" [max]="100" />`,

        html: `<p-fluid class="card flex flex-wrap gap-4">
    <div class="flex-auto">
        <label for="integeronly">Integer Only</label>
        <p-inputnumber inputId="integeronly" [(ngModel)]="value1" />
    </div>
    <div class="flex-auto">
        <label for="withoutgrouping">Without Grouping</label>
        <p-inputnumber [(ngModel)]="value2" mode="decimal" inputId="withoutgrouping" [useGrouping]="false" />
    </div>
    <div class="flex-auto">
        <label for="minmaxfraction">Min-Max Fraction Digits</label>
        <p-inputnumber [(ngModel)]="value3" inputId="minmaxfraction" mode="decimal" [minFractionDigits]="2" [maxFractionDigits]="5" />
    </div>
    <div class="flex-auto">
        <label for="minmax">Min-Max Boundaries</label>
        <p-inputnumber [(ngModel)]="value4" inputId="minmax" mode="decimal" [min]="0" [max]="100" />
    </div>
</p-fluid>`,

        typescript: `import { Component } from '@angular/core';
import { InputNumber } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { Fluid } from 'primeng/fluid';

@Component({
    selector: 'input-number-numerals-demo',
    templateUrl: './input-number-numerals-demo.html',
    standalone: true,
    imports: [FormsModule, InputNumber, Fluid]
})
export class InputNumberNumeralsDemo {
    value1: number = 42723;

    value2: number = 58151;

    value3: number = 2351.35;

    value4: number = 50;
}`
    };
}
