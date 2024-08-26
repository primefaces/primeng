import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'floatlabel-doc',
    template: `
        <app-docsectiontext>
            <p>A floating label appears on top of the input field when focused. Visit <a routerLink="/floatlabel">FloatLabel</a> documentation for more information.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-floatLabel>
                <p-inputMask mask="999-99-9999" [(ngModel)]="value" id="ssn_input" />
                <label for="ssn_input">SSN</label>
            </p-floatLabel>
        </div>
        <app-code [code]="code" selector="input-mask-floatlabel-demo"></app-code>
    `
})
export class FloatlabelDoc {
    value: string | undefined;

    code: Code = {
        basic: `<p-floatLabel>
    <p-inputMask 
        mask="999-99-9999" 
        [(ngModel)]="value" 
        id="ssn_input" />
    <label for="ssn_input">SSN</label>
</p-floatLabel>`,

        html: `<div class="card flex justify-center">
    <p-floatLabel>
        <p-inputMask 
            mask="999-99-9999" 
            [(ngModel)]="value" 
            id="ssn_input" />
        <label for="ssn_input">SSN</label>
    </p-floatLabel>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { InputMaskModule } from 'primeng/inputmask';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from "primeng/floatlabel"

@Component({
    selector: 'input-mask-floatlabel-demo',
    templateUrl: './input-mask-floatlabel-demo.html',
    standalone: true,
    imports: [FormsModule, InputMaskModule, FloatLabelModule]
})
export class InputMaskFloatlabelDemo {
    value: string | undefined;
}`
    };
}
