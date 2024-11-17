import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'filled-doc',
    template: `
        <app-docsectiontext>
            <p>Specify the <i>variant</i> property as <i>filled</i> to display the component with a higher visual emphasis than the default <i>outlined</i> style.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-inputnumber variant="filled" [(ngModel)]="value1" />
        </div>
        <app-code [code]="code" selector="input-number-filled-demo"></app-code>
    `
})
export class FilledDoc {
    value1!: number;

    code: Code = {
        basic: `<p-inputnumber variant="filled" [(ngModel)]="value1" />`,

        html: `<div class="card flex justify-center">
    <p-inputnumber variant="filled" [(ngModel)]="value1" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { InputNumber } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-number-filled-demo',
    templateUrl: './input-number-filled-demo.html',
    standalone: true,
    imports: [FormsModule, InputNumber]
})
export class InputNumberFilledDemo {
    value1!: number;
}`
    };
}
