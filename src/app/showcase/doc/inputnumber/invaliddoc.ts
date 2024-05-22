import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'invalid-doc',
    template: `
        <app-docsectiontext>
            <p>Invalid state style is added using the <i>ng-invalid</i> and <i>ng-dirty</i> class to indicate a failed validation.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-inputNumber inputId="integeronly" class="ng-invalid ng-dirty" [(ngModel)]="value1" />
        </div>
        <app-code [code]="code" selector="input-number-invalid-demo"></app-code>
    `
})
export class InvalidDoc {
    value1!: number;

    code: Code = {
        basic: `<p-inputNumber 
    inputId="integeronly" 
    class="ng-invalid ng-dirty" 
    [(ngModel)]="value1" />`,

        html: `<div class="card flex justify-content-center">
    <p-inputNumber 
        inputId="integeronly"
        class="ng-invalid ng-dirty" 
        [(ngModel)]="value1" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-number-invalid-demo',
    templateUrl: './input-number-invalid-demo.html',
    standalone: true,
    imports: [FormsModule, InputNumberModule]
})
export class InputNumberInvalidDemo {
    value1!: number;
}`
    };
}
