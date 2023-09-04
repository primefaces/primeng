import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'invalid-doc',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Invalid state style is added using the <i>ng-invalid</i> and <i>ng-dirty</i> class to indicate a failed validation.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-inputMask mask="999-99-9999" [(ngModel)]="value" class="ng-invalid ng-dirty"></p-inputMask>
        </div>
        <app-code [code]="code" selector="input-mask-invalid-demo"></app-code>
    </section>`
})
export class InvalidDoc {
    @Input() id: string;

    @Input() title: string;

    value: string | undefined;

    code: Code = {
        basic: `
<p-inputMask mask="999-99-9999" [(ngModel)]="value" class="ng-invalid ng-dirty"></p-inputMask>`,

        html: `
<div class="card flex justify-content-center">
    <p-inputMask mask="999-99-9999" [(ngModel)]="value" class="ng-invalid ng-dirty"></p-inputMask>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'input-mask-invalid-demo',
    templateUrl: './input-mask-invalid-demo.html'
})
export class InputMaskInvalidDemo {
    value: string | undefined;
}`
    };
}
