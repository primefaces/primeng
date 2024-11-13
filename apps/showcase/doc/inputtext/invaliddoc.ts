import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'invalid-doc',
    template: `
        <app-docsectiontext>
            <p>Invalid state style is added using the <i>ng-invalid</i> and <i>ng-dirty</i> class to indicate a failed validation.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <input pInputText [(ngModel)]="value" class="ng-invalid ng-dirty" />
        </div>
        <app-code [code]="code" selector="input-text-invalid-demo"></app-code>
    `
})
export class InvalidDoc {
    value: string | undefined;

    code: Code = {
        basic: `<input pInputText [(ngModel)]="value"  class="ng-invalid ng-dirty" />`,

        html: `<div class="card flex justify-center">
    <input pInputText [(ngModel)]="value" class="ng-invalid ng-dirty" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-text-invalid-demo',
    templateUrl: './input-text-invalid-demo.html',
    standalone: true,
    imports: [FormsModule, InputTextModule]
})
export class InputTextInvalidDemo {
    value: string | undefined;
}`
    };
}
