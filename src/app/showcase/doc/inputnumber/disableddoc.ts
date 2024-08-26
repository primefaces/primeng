import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'disabled-doc',
    template: `
        <app-docsectiontext>
            <p>When <i>disabled</i> is present, the element cannot be edited and focused.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-inputNumber inputId="integeronly" [disabled]="true" prefix="%" [(ngModel)]="value1" />
        </div>
        <app-code [code]="code" selector="input-number-disabled-demo"></app-code>
    `
})
export class DisabledDoc {
    value1: number = 50;

    code: Code = {
        basic: `<p-inputNumber 
    inputId="integeronly" 
    [disabled]="true" 
    prefix="%" 
    [(ngModel)]="value1" />`,

        html: `<div class="card flex justify-center">
    <p-inputNumber 
        inputId="integeronly" 
        [disabled]="true" 
        prefix="%" 
        [(ngModel)]="value1" /> 
</div>`,

        typescript: `import { Component } from '@angular/core';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-number-disabled-demo',
    templateUrl: './input-number-disabled-demo.html',
    standalone: true,
    imports: [FormsModule, InputNumberModule]
})
export class InputNumberDisabledDemo {
    value1: number = 50;
}`
    };
}
