import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'numerals-doc',
    template: `
        <app-docsectiontext>
            <p>InputNumber is used as a controlled input with <i>ngModel</i> property.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap gap-3 p-fluid">
            <div class="flex-auto">
                <label class="mb-2 font-bold block" for="integeronly">Integer Only</label>
                <p-inputNumber inputId="integeronly" [(ngModel)]="value1" />
            </div>
            <div class="flex-auto">
                <label class="mb-2 font-bold block" for="withoutgrouping">Without Grouping</label>
                <p-inputNumber [(ngModel)]="value2" mode="decimal" inputId="withoutgrouping" [useGrouping]="false" />
            </div>
            <div class="flex-auto">
                <label class="mb-2 font-bold block" for="minmaxfraction">Min-Max Fraction Digits</label>
                <p-inputNumber [(ngModel)]="value3" inputId="minmaxfraction" mode="decimal" [minFractionDigits]="2" [maxFractionDigits]="5" />
            </div>
            <div class="flex-auto">
                <label class="mb-2 font-bold block" for="minmax">Min-Max Boundaries</label>
                <p-inputNumber [(ngModel)]="value4" inputId="minmax" mode="decimal" [min]="0" [max]="100" />
            </div>
        </div>
        <app-code [code]="code" selector="input-number-numerals-demo"></app-code>
    `
})
export class NumeralsDoc {
    value1: number = 42723;

    value2: number = 58151;

    value3: number = 2351.35;

    value4: number = 50;

    code: Code = {
        basic: `<p-inputNumber 
    inputId="integeronly" 
    [(ngModel)]="value1"/> 

<p-inputNumber 
    [(ngModel)]="value2" 
    mode="decimal" 
    inputId="withoutgrouping" 
    [useGrouping]="false"/> 

<p-inputNumber 
    [(ngModel)]="value3" 
    inputId="minmaxfraction" 
    mode="decimal" 
    [minFractionDigits]="2" 
    [maxFractionDigits]="5"/> 

<p-inputNumber 
    [(ngModel)]="value4" 
    inputId="minmax" 
    mode="decimal" 
    [min]="0" 
    [max]="100"/> `,

        html: `
<div class="card flex flex-wrap gap-3 p-fluid">
    <div class="flex-auto">
        <label for="integeronly">Integer Only</label>
        <p-inputNumber 
            inputId="integeronly" 
            [(ngModel)]="value1"/> 
    </div>
    <div class="flex-auto">
        <label for="withoutgrouping">Without Grouping</label>
        <p-inputNumber 
            [(ngModel)]="value2" 
            mode="decimal" 
            inputId="withoutgrouping" 
            [useGrouping]="false"/> 
    </div>
    <div class="flex-auto">
        <label for="minmaxfraction">Min-Max Fraction Digits</label>
        <p-inputNumber 
            [(ngModel)]="value3" 
            inputId="minmaxfraction" 
            mode="decimal" 
            [minFractionDigits]="2" 
            [maxFractionDigits]="5"/> 
    </div>
    <div class="flex-auto">
        <label for="minmax">Min-Max Boundaries</label>
        <p-inputNumber 
            [(ngModel)]="value4" 
            inputId="minmax" 
            mode="decimal" 
            [min]="0" 
            [max]="100"/> 
    </div>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-number-numerals-demo',
    templateUrl: './input-number-numerals-demo.html',
    standalone: true,
    imports: [FormsModule, InputNumberModule]
})
export class InputNumberNumeralsDemo {
    value1: number = 42723;

    value2: number = 58151;

    value3: number = 2351.35;

    value4: number = 50;
}`
    };
}
