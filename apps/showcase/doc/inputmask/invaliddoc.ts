import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'invalid-doc',
    template: `
        <app-docsectiontext>
            <p>Invalid state style is added using the <i>ng-invalid</i> and <i>ng-dirty</i> class to indicate a failed validation.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-inputmask mask="999-99-9999" [(ngModel)]="value" class="ng-invalid ng-dirty" />
        </div>
        <app-code [code]="code" selector="input-mask-invalid-demo"></app-code>
    `
})
export class InvalidDoc {
    value: string | undefined;

    code: Code = {
        basic: `<p-inputmask mask="999-99-9999" [(ngModel)]="value" class="ng-invalid ng-dirty" />`,

        html: `<div class="card flex justify-center">
    <p-inputmask mask="999-99-9999" [(ngModel)]="value" class="ng-invalid ng-dirty" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { InputMask } from 'primeng/inputmask';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-mask-invalid-demo',
    templateUrl: './input-mask-invalid-demo.html',
    standalone: true,
    imports: [FormsModule, InputMask]
})
export class InputMaskInvalidDemo {
    value: string | undefined;
}`
    };
}
