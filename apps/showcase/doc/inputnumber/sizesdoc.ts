import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'sizes-doc',
    template: `
        <app-docsectiontext>
            <p>InputNumber provides <i>small</i> and <i>large</i> sizes as alternatives to the base.</p>
        </app-docsectiontext>
        <div class="card flex flex-col items-center gap-4">
            <p-inputnumber [(ngModel)]="value1" size="small" placeholder="Small" mode="currency" currency="USD" locale="en-US" />
            <p-inputnumber [(ngModel)]="value2" placeholder="Normal" mode="currency" currency="USD" locale="en-US" />
            <p-inputnumber [(ngModel)]="value3" size="large" placeholder="Large" mode="currency" currency="USD" locale="en-US" />
        </div>
        <app-code [code]="code" selector="input-number-sizes-demo"></app-code>
    `
})
export class SizesDoc {
    value1!: number;

    value2!: number;

    value3!: number;

    code: Code = {
        basic: `<p-inputnumber [(ngModel)]="value1" size="small" placeholder="Small" mode="currency" currency="USD" locale="en-US" />
<p-inputnumber [(ngModel)]="value2" placeholder="Normal" mode="currency" currency="USD" locale="en-US" />
<p-inputnumber [(ngModel)]="value3" size="large" placeholder="Large" mode="currency" currency="USD" locale="en-US" />`,

        html: `<div class="card flex flex-col items-center gap-4">
    <p-inputnumber [(ngModel)]="value1" size="small" placeholder="Small" mode="currency" currency="USD" locale="en-US" />
    <p-inputnumber [(ngModel)]="value2" placeholder="Normal" mode="currency" currency="USD" locale="en-US" />
    <p-inputnumber [(ngModel)]="value3" size="large" placeholder="Large" mode="currency" currency="USD" locale="en-US" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { InputNumber } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-number-sizes-demo',
    templateUrl: './input-number-sizes-demo.html',
    standalone: true,
    imports: [FormsModule, InputNumber]
})
export class InputNumberSizesDemo {
    value1!: number;

    value2!: number;

    value3!: number;
}`
    };
}
