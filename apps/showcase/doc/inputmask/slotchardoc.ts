import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'slot-char-doc',
    template: `
        <app-docsectiontext>
            <p>Default placeholder for a mask is underscore that can be customized using <i>slotChar</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-inputmask [(ngModel)]="value" mask="99/99/9999" placeholder="99/99/9999" slotChar="mm/dd/yyyy" />
        </div>
        <app-code [code]="code" selector="input-mask-slot-char-demo"></app-code>
    `
})
export class SlotCharDoc {
    value: string | undefined;

    code: Code = {
        basic: `<p-inputmask [(ngModel)]="value" mask="99/99/9999" placeholder="99/99/9999" slotChar="mm/dd/yyyy" />`,

        html: `<div class="card flex justify-center">
    <p-inputmask [(ngModel)]="value" mask="99/99/9999" placeholder="99/99/9999" slotChar="mm/dd/yyyy" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { InputMask } from 'primeng/inputmask';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-mask-slot-char-demo',
    templateUrl: './input-mask-slot-char-demo.html',
    standalone: true,
    imports: [FormsModule, InputMask]
})
export class InputMaskSlotCharDemo {
    value: string | undefined;
}`
    };
}
