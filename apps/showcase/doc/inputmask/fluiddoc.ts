import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'fluid-doc',
    standalone: true,
    imports: [FormsModule, InputMaskModule, AppCodeModule, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>The fluid prop makes the component take up the full width of its container when set to true.</p>
        </app-docsectiontext>
        <div class="card">
            <p-inputmask mask="99-999999" [(ngModel)]="value" placeholder="99-999999" fluid />
        </div>
        <app-code [code]="code" selector="input-mask-fluid-demo"></app-code>
    `
})
export class FluidDoc {
    value: string | undefined;

    code: Code = {
        basic: `<p-inputmask mask="99-999999" [(ngModel)]="value" placeholder="99-999999" fluid />`,

        html: `<div class="card">
    <p-inputmask mask="99-999999" [(ngModel)]="value" placeholder="99-999999" fluid />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { InputMask } from 'primeng/inputmask';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-mask-fluid-demo',
    templateUrl: './input-mask-fluid-demo.html',
    standalone: true,
    imports: [FormsModule, InputMask]
})
export class InputMaskFluidDemo {
    value: string | undefined;
}`
    };
}
