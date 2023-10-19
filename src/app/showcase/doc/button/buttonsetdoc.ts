import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'button-set-demo',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Multiple buttons are grouped when wrapped inside an element with <i>p-buttonset</i> class.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <span class="p-buttonset">
                <button pButton pRipple label="Save" icon="pi pi-check"></button>
                <button pButton pRipple label="Delete" icon="pi pi-trash"></button>
                <button pButton pRipple label="Cancel" icon="pi pi-times"></button>
            </span>
        </div>
        <app-code [code]="code" selector="button-set-demo"></app-code>
    </section>`
})
export class ButtonsetDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<span class="p-buttonset">
    <button pButton pRipple label="Save" icon="pi pi-check"></button>
    <button pButton pRipple label="Delete" icon="pi pi-trash"></button>
    <button pButton pRipple label="Cancel" icon="pi pi-times"></button>
</span>`,

        html: `
<div class="card flex justify-content-center">
    <span class="p-buttonset">
        <button pButton pRipple label="Save" icon="pi pi-check"></button>
        <button pButton pRipple label="Delete" icon="pi pi-trash"></button>
        <button pButton pRipple label="Cancel" icon="pi pi-times"></button>
    </span>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'button-set-demo',
    templateUrl: './button-set-demo.html'
})
export class ButtonSetDemo { }`
    };
}
