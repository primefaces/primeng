import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'disabled-doc',
    template: `
        <app-docsectiontext>
            <p>When <i>disabled</i> is present, the element cannot be edited and focused.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-inputmask mask="999-99-9999" [(ngModel)]="value" [disabled]="true" />
        </div>
        <app-code [code]="code" selector="input-mask-disabled-demo"></app-code>
    `
})
export class DisabledDoc {
    value: string | undefined;

    code: Code = {
        basic: `<p-inputmask mask="999-99-9999" [(ngModel)]="value" [disabled]="true" />`,

        html: `<div class="card flex justify-center">
    <p-inputmask mask="999-99-9999" [(ngModel)]="value" [disabled]="true" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { InputMask } from 'primeng/inputmask';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-mask-disabled-demo',
    templateUrl: './input-mask-disabled-demo.html',
    standalone: true,
    imports: [FormsModule, InputMask]
})
export class InputMaskDisabledDemo {
    value: string | undefined;
}`
    };
}
