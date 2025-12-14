import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'disabled-doc',
    standalone: true,
    imports: [FormsModule, InputNumberModule, AppCodeModule, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>When <i>disabled</i> is present, the element cannot be edited and focused.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-inputnumber inputId="integeronly" [disabled]="true" prefix="%" [(ngModel)]="value1" />
        </div>
        <app-code [code]="code" selector="input-number-disabled-demo"></app-code>
    `
})
export class DisabledDoc {
    value1: number = 50;

    code: Code = {
        basic: `<p-inputnumber inputId="integeronly" [disabled]="true" prefix="%" [(ngModel)]="value1" />`,

        html: `<div class="card flex justify-center">
    <p-inputnumber inputId="integeronly" [disabled]="true" prefix="%" [(ngModel)]="value1" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { InputNumber } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-number-disabled-demo',
    templateUrl: './input-number-disabled-demo.html',
    standalone: true,
    imports: [FormsModule, InputNumber]
})
export class InputNumberDisabledDemo {
    value1: number = 50;
}`
    };
}
