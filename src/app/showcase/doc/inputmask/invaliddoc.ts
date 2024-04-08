import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'invalid-doc',
    template: `
        <app-docsectiontext>
            <p>Invalid state style is added using the <i>ng-invalid</i> and <i>ng-dirty</i> class to indicate a failed validation.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-inputMask mask="999-99-9999" [(ngModel)]="value" class="ng-invalid ng-dirty"/>
        </div>
        <app-code [code]="code" selector="input-mask-invalid-demo"></app-code>
    `
})
export class InvalidDoc {
    value: string | undefined;

    code: Code = {
        basic: `<p-inputMask 
    mask="999-99-9999" 
    [(ngModel)]="value" 
    class="ng-invalid ng-dirty" />`,

        html: `<div class="card flex justify-content-center">
    <p-inputMask 
        mask="999-99-9999" 
        [(ngModel)]="value" 
        class="ng-invalid ng-dirty" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { InputMaskModule } from 'primeng/inputmask';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-mask-invalid-demo',
    templateUrl: './input-mask-invalid-demo.html',
    standalone: true,
    imports: [FormsModule, InputMaskModule]
})
export class InputMaskInvalidDemo {
    value: string | undefined;
}`
    };
}
