import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'slot-char-doc',
    template: `
        <app-docsectiontext>
            <p>Default placeholder for a mask is underscore that can be customized using <i>slotChar</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-inputMask [(ngModel)]="value" mask="99/99/9999" placeholder="99/99/9999" slotChar="mm/dd/yyyy"/>
        </div>
        <app-code [code]="code" selector="input-mask-slot-char-demo"></app-code>
    `
})
export class SlotCharDoc {
    value: string | undefined;

    code: Code = {
        basic: `<p-inputMask 
    [(ngModel)]="value" 
    mask="99/99/9999" 
    placeholder="99/99/9999" 
    slotChar="mm/dd/yyyy"/>`,

        html: `<div class="card flex justify-content-center">
    <p-inputMask 
        [(ngModel)]="value" 
        mask="99/99/9999" 
        placeholder="99/99/9999" 
        slotChar="mm/dd/yyyy"/>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { InputMaskModule } from 'primeng/inputmask';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-mask-slot-char-demo',
    templateUrl: './input-mask-slot-char-demo.html',
    standalone: true,
    imports: [FormsModule, InputMaskModule]
})
export class InputMaskSlotCharDemo {
    value: string | undefined;
}`
    };
}
