import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'locale-doc',
    template: `
        <app-docsectiontext>
            <p>Localization information such as grouping and decimal symbols are defined with the <i>locale</i> property which defaults to the user locale.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap gap-3 p-fluid">
            <div class="flex-auto">
                <label class="block font-bold mb-2" for="locale-user">User Locale</label>
                <p-inputNumber [(ngModel)]="value1" inputId="locale-user" [minFractionDigits]="2"></p-inputNumber>
            </div>
            <div class="flex-auto">
                <label class="block font-bold mb-2" for="locale-us">United States Locale</label>
                <p-inputNumber [(ngModel)]="value2" inputId="locale-us" mode="decimal" locale="en-US" [minFractionDigits]="2"> </p-inputNumber>
            </div>
            <div class="flex-auto">
                <label class="block font-bold mb-2" for="locale-german">German Locale</label>
                <p-inputNumber [(ngModel)]="value3" inputId="locale-german" mode="decimal" locale="de-DE" [minFractionDigits]="2"> </p-inputNumber>
            </div>
            <div class="flex-auto">
                <label class="block font-bold mb-2" for="locale-indian">Indian Locale</label>
                <p-inputNumber [(ngModel)]="value4" inputId="locale-indian" mode="decimal" locale="en-IN" [minFractionDigits]="2"> </p-inputNumber>
            </div>
        </div>
        <app-code [code]="code" selector="input-number-locale-demo"></app-code>
    `
})
export class LocaleDoc {
    value1: number = 151351;

    value2: number = 115744;

    value3: number = 635524;

    value4: number = 732762;

    code: Code = {
        basic: `
<p-inputNumber [(ngModel)]="value1" inputId="locale-user" [minFractionDigits]="2"></p-inputNumber>
<p-inputNumber [(ngModel)]="value2" inputId="locale-us" mode="decimal" locale="en-US" [minFractionDigits]="2"> </p-inputNumber>
<p-inputNumber [(ngModel)]="value3" inputId="locale-german" mode="decimal" locale="de-DE" [minFractionDigits]="2"> </p-inputNumber>
<p-inputNumber [(ngModel)]="value4" inputId="locale-indian" mode="decimal" locale="en-IN" [minFractionDigits]="2"> </p-inputNumber>`,

        html: `
<div class="card flex flex-wrap gap-3 p-fluid">
    <div class="flex-auto">
        <label class="block font-bold mb-2" for="locale-user">User Locale</label>
        <p-inputNumber [(ngModel)]="value1" inputId="locale-user" [minFractionDigits]="2"></p-inputNumber>
    </div>
    <div class="flex-auto">
        <label class="block font-bold mb-2" for="locale-us">United States Locale</label>
        <p-inputNumber [(ngModel)]="value2" inputId="locale-us" mode="decimal" locale="en-US" [minFractionDigits]="2"> </p-inputNumber>
    </div>
    <div class="flex-auto">
        <label class="block font-bold mb-2" for="locale-german">German Locale</label>
        <p-inputNumber [(ngModel)]="value3" inputId="locale-german" mode="decimal" locale="de-DE" [minFractionDigits]="2"> </p-inputNumber>
    </div>
    <div class="flex-auto">
        <label class="block font-bold mb-2" for="locale-indian">Indian Locale</label>
        <p-inputNumber [(ngModel)]="value4" inputId="locale-indian" mode="decimal" locale="en-IN" [minFractionDigits]="2"> </p-inputNumber>
    </div>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'input-number-locale-demo',
    templateUrl: './input-number-locale-demo.html'
})
export class InputNumberLocaleDemo {
    value1: number = 151351;

    value2: number = 115744;

    value3: number = 635524;

    value4: number = 732762;
}`
    };
}
