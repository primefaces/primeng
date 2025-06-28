import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'invalid-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>The invalid state is applied using the <i>⁠invalid</i> property to indicate failed validation, which can be integrated with Angular Forms.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap justify-center gap-4">
            <p-inputnumber [(ngModel)]="value1" [invalid]="value1 === undefined" mode="decimal" [minFractionDigits]="2" placeholder="Amount" />
            <p-inputnumber [(ngModel)]="value2" [invalid]="value2 === undefined" mode="decimal" [minFractionDigits]="2" variant="filled" placeholder="Amount" />
        </div>

        <app-code [code]="code" selector="input-number-invalid-demo"></app-code>
    `
})
export class InvalidDoc {
    value1!: number;

    value2!: number;

    code: Code = {
        basic: `<p-inputnumber [(ngModel)]="value1" [invalid]="value1 === undefined" mode="decimal" [minFractionDigits]="2" placeholder="Amount" />
<p-inputnumber [(ngModel)]="value2" [invalid]="value2 === undefined" mode="decimal" [minFractionDigits]="2" variant="filled" placeholder="Amount" />`,

        html: `<div class="card flex flex-wrap justify-center gap-4">
    <p-inputnumber [(ngModel)]="value1" [invalid]="value1 === undefined" mode="decimal" [minFractionDigits]="2" placeholder="Amount" />
    <p-inputnumber [(ngModel)]="value2" [invalid]="value2 === undefined" mode="decimal" [minFractionDigits]="2" variant="filled" placeholder="Amount" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { InputNumber } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-number-invalid-demo',
    templateUrl: './input-number-invalid-demo.html',
    standalone: true,
    imports: [FormsModule, InputNumber]
})
export class InputNumberInvalidDemo {
    value1!: number;

    value2!: number;
}`
    };
}
