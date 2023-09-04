import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'floatlabel-doc',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>A floating label appears on top of the input field when focused.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <span class="p-float-label">
                <p-inputMask mask="999-99-9999" [(ngModel)]="value" id="ssn_input"></p-inputMask>
                <label htmlFor="ssn_input">SSN</label>
            </span>
        </div>
        <app-code [code]="code" selector="input-mask-floatlabel-demo"></app-code>
    </section>`
})
export class FloatlabelDoc {
    @Input() id: string;

    @Input() title: string;

    value: string | undefined;

    code: Code = {
        basic: `
<span class="p-float-label">
    <p-inputMask mask="999-99-9999" [(ngModel)]="value" id="ssn_input"></p-inputMask>
    <label htmlFor="ssn_input">SSN</label>
</span>`,

        html: `
<div class="card flex justify-content-center">
    <span class="p-float-label">
    <p-inputMask mask="999-99-9999" [(ngModel)]="value" id="ssn_input"></p-inputMask>
    <label htmlFor="ssn_input">SSN</label>
    </span>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'input-mask-floatlabel-demo',
    templateUrl: './input-mask-floatlabel-demo.html'
})
export class InputMaskFloatlabelDemo {
    value: string | undefined;
}`
    };
}
