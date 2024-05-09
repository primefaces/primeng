import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'disabled-doc',
    template: `
        <app-docsectiontext>
            <p>When <i>disabled</i> is present, the element cannot be edited and focused.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-inputMask mask="999-99-9999" [(ngModel)]="value" [disabled]="true" />
        </div>
        <app-code [code]="code" selector="input-mask-disabled-demo"></app-code>
    `
})
export class DisabledDoc {
    value: string | undefined;

    code: Code = {
        basic: `<p-inputMask 
    mask="999-99-9999" 
    [(ngModel)]="value" 
    [disabled]="true" />`,

        html: `<div class="card flex justify-content-center">
    <p-inputMask 
        mask="999-99-9999" 
        [(ngModel)]="value" 
        [disabled]="true" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { InputMaskModule } from 'primeng/inputmask';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-mask-disabled-demo',
    templateUrl: './input-mask-disabled-demo.html',
    standalone: true,
    imports: [FormsModule, InputMaskModule]
})
export class InputMaskDisabledDemo {
    value: string | undefined;
}`
    };
}
