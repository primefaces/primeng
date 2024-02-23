import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'button-group-demo',
    template: `
        <app-docsectiontext>
            <p>Multiple buttons are grouped when wrapped inside an element with <i>ButtonGroup</i> component.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-buttonGroup>
                <button pButton pRipple label="Save" icon="pi pi-check"></button>
                <button pButton pRipple label="Delete" icon="pi pi-trash"></button>
                <button pButton pRipple label="Cancel" icon="pi pi-times"></button>
            </p-buttonGroup>
        </div>
        <app-code [code]="code" selector="button-group-demo"></app-code>
    `
})
export class ButtonGroupDoc {
    code: Code = {
        basic: `<p-buttonGroup>
    <button pButton pRipple label="Save" icon="pi pi-check"></button>
    <button pButton pRipple label="Delete" icon="pi pi-trash"></button>
    <button pButton pRipple label="Cancel" icon="pi pi-times"></button>
</p-buttonGroup>`,

        html: `
<div class="card flex justify-content-center">
    <button pButton pRipple label="Save" icon="pi pi-check"></button>
    <button pButton pRipple label="Delete" icon="pi pi-trash"></button>
    <button pButton pRipple label="Cancel" icon="pi pi-times"></button>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'button-group-demo',
    templateUrl: './button-group-demo.html'
})
export class ButtonGroupDemo { }`
    };
}
