import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'basic-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Component is defined using p-inputMask element with a mask and two-way value binding is enabled with standard ngModel directive.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-inputMask mask="99-999999" [(ngModel)]="value" placeholder="99-999999"></p-inputMask>
        </div>
        <app-code [code]="code" selector="input-mask-basic-demo"></app-code>
    </section>`
})
export class BasicDoc {
    @Input() id: string;

    @Input() title: string;

    value: string;

    code: Code = {
        basic: `
<p-inputMask mask="99-999999" [(ngModel)]="value" placeholder="99-999999"></p-inputMask>`,

        html: `
<div class="card flex justify-content-center">
    <p-inputMask mask="99-999999" [(ngModel)]="value" placeholder="99-999999"></p-inputMask>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'input-mask-basic-demo',
    templateUrl: './input-mask-basic-demo.html'
})
export class InputMaskBasicDemo {
    value: string;
}`
    };
}
