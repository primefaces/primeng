import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'locale-doc',
    template: `
        <app-docsectiontext>
            <p>Localization information such as grouping and decimal symbols are defined with the <i>locale</i> property which defaults to the user locale.</p>
        </app-docsectiontext>
        <p-fluid class="card flex flex-wrap gap-4">
            <div class="flex-auto">
                <label class="block font-bold mb-2" for="locale-user">User Locale</label>
                <p-inputnumber [(ngModel)]="value1" inputId="locale-user" [minFractionDigits]="2" />
            </div>
            <div class="flex-auto">
                <label class="block font-bold mb-2" for="locale-us">United States Locale</label>
                <p-inputnumber [(ngModel)]="value2" inputId="locale-us" mode="decimal" locale="en-US" [minFractionDigits]="2" />
            </div>
            <div class="flex-auto">
                <label class="block font-bold mb-2" for="locale-german">German Locale</label>
                <p-inputnumber [(ngModel)]="value3" inputId="locale-german" mode="decimal" locale="de-DE" [minFractionDigits]="2" />
            </div>
            <div class="flex-auto">
                <label class="block font-bold mb-2" for="locale-indian">Indian Locale</label>
                <p-inputnumber [(ngModel)]="value4" inputId="locale-indian" mode="decimal" locale="en-IN" [minFractionDigits]="2" />
            </div>
        </p-fluid>
        <app-code [code]="code" selector="input-number-locale-demo"></app-code>
    `
})
export class LocaleDoc {
    value1: number = 151351;

    value2: number = 115744;

    value3: number = 635524;

    value4: number = 732762;

    code: Code = {
        basic: `<p-inputnumber [(ngModel)]="value1" inputId="locale-user" [minFractionDigits]="2" />
<p-inputnumber [(ngModel)]="value2" inputId="locale-us" mode="decimal" locale="en-US" [minFractionDigits]="2" />
<p-inputnumber [(ngModel)]="value3" inputId="locale-german" mode="decimal" locale="de-DE" [minFractionDigits]="2" />
<p-inputnumber [(ngModel)]="value4" inputId="locale-indian" mode="decimal" locale="en-IN" [minFractionDigits]="2" />`,

        html: `<p-fluid class="card flex flex-wrap gap-4">
    <div class="flex-auto">
        <label class="block font-bold mb-2" for="locale-user">
            User Locale
        </label>
        <p-inputnumber [(ngModel)]="value1" inputId="locale-user" [minFractionDigits]="2" />
    </div>
    <div class="flex-auto">
        <label class="block font-bold mb-2" for="locale-us">
            United States Locale
        </label>
        <p-inputnumber [(ngModel)]="value2" inputId="locale-us" mode="decimal" locale="en-US" [minFractionDigits]="2" />
    </div>
    <div class="flex-auto">
        <label class="block font-bold mb-2" for="locale-german">
            German Locale
        </label>
        <p-inputnumber [(ngModel)]="value3" inputId="locale-german" mode="decimal" locale="de-DE" [minFractionDigits]="2" />
    </div>
    <div class="flex-auto">
        <label class="block font-bold mb-2" for="locale-indian">
            Indian Locale
        </label>
        <p-inputnumber [(ngModel)]="value4" inputId="locale-indian" mode="decimal" locale="en-IN" [minFractionDigits]="2" />
    </div>
</p-fluid>`,

        typescript: `import { Component } from '@angular/core';
import { InputNumber } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { Fluid } from 'primeng/fluid';

@Component({
    selector: 'input-number-locale-demo',
    templateUrl: './input-number-locale-demo.html',
    standalone: true,
    imports: [FormsModule, InputNumber, Fluid]
})
export class InputNumberLocaleDemo {
    value1: number = 151351;

    value2: number = 115744;

    value3: number = 635524;

    value4: number = 732762;
}`
    };
}
