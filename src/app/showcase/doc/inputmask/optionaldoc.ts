import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'optional-doc',
    template: `
        <app-docsectiontext>
            <p>When the input does not complete the mask definition, it is cleared by default. Use <i>autoClear</i> property to control this behavior. In addition, <i>?</i> is used to mark anything after the question mark optional.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-inputMask mask="(999) 999-9999? x99999" [(ngModel)]="value" placeholder="(999) 999-9999? x99999" />
        </div>
        <app-code [code]="code" selector="input-mask-optional-demo"></app-code>
    `
})
export class OptionalDoc {
    value: string | undefined;

    code: Code = {
        basic: `<p-inputMask 
    mask="(999) 999-9999? x99999" 
    [(ngModel)]="value" 
    placeholder="(999) 999-9999? x99999" />`,

        html: `<div class="card flex justify-center">
    <p-inputMask 
        mask="(999) 999-9999? x99999" 
        [(ngModel)]="value" 
        placeholder="(999) 999-9999? x99999" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { InputMaskModule } from 'primeng/inputmask';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-mask-optional-demo',
    templateUrl: './input-mask-optional-demo.html',
    standalone: true,
    imports: [FormsModule, InputMaskModule]
})
export class InputMaskOptionalDemo {
    value: string | undefined;
}`
    };
}
