import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'inputmask-disabled-demo',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>When <i>disabled</i> is present, the element cannot be edited and focused.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-inputMask mask="999-99-9999" [(ngModel)]="value" [disabled]="true"></p-inputMask>
        </div>
        <app-code [code]="code" selector="inputmask-disabled-demo"></app-code>
    </section>`
})
export class DisabledDoc {
    @Input() id: string;

    @Input() title: string;

    value: string;

    code: Code = {
        basic: `
<p-inputMask mask="999-99-9999" [(ngModel)]="value" [disabled]="true"></p-inputMask>`,

        html: `
<div class="card flex justify-content-center">
    <p-inputMask mask="999-99-9999" [(ngModel)]="value" [disabled]="true"></p-inputMask>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'inputmask-disabled-demo',
    templateUrl: './inputmask-disabled-demo.html',
    styleUrls: ['./inputmask-disabled-demo.scss']
})
export class InputmaskDisabledDemo {
    value: string;
}`
    };
}
