import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>InputMask is used as a controlled input with <i>ngModel</i> properties.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-inputMask mask="99-999999" [(ngModel)]="value" placeholder="99-999999" />
        </div>
        <app-code [code]="code" selector="input-mask-basic-demo"></app-code>
    `
})
export class BasicDoc {
    value: string | undefined;

    code: Code = {
        basic: `<p-inputMask 
    mask="99-999999" 
    [(ngModel)]="value" 
    placeholder="99-999999" />`,

        html: `<div class="card flex justify-center">
    <p-inputMask 
        mask="99-999999" 
        [(ngModel)]="value" 
        placeholder="99-999999" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { InputMaskModule } from 'primeng/inputmask';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-mask-basic-demo',
    templateUrl: './input-mask-basic-demo.html',
    standalone: true,
    imports: [FormsModule, InputMaskModule]
})
export class InputMaskBasicDemo {
    value: string | undefined;
}`
    };
}
