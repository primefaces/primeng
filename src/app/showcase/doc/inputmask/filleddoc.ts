import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'filled-doc',
    template: `
        <app-docsectiontext>
            <p>Specify the <i>variant</i> property as <i>filled</i> to display the component with a higher visual emphasis than the default <i>outlined</i> style.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-inputMask mask="99-999999" [(ngModel)]="value" variant="filled" placeholder="99-999999" />
        </div>
        <app-code [code]="code" selector="input-mask-filled-demo"></app-code>
    `
})
export class FilledDoc {
    value: string | undefined;

    code: Code = {
        basic: `<p-inputMask 
    mask="99-999999" 
    [(ngModel)]="value" 
    variant="filled"
    placeholder="99-999999"/>`,

        html: `<div class="card flex justify-content-center">
    <p-inputMask 
        mask="99-999999" 
        [(ngModel)]="value" 
        variant="filled"
        placeholder="99-999999"/>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { InputMaskModule } from 'primeng/inputmask';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-mask-filled-demo',
    templateUrl: './input-mask-filled-demo.html',
    standalone: true,
    imports: [FormsModule, InputMaskModule]
})
export class InputMaskFilledDemo {
    value: string | undefined;
}`
    };
}
