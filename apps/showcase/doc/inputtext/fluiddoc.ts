import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'fluid-doc',
    standalone: true,
    imports: [FormsModule, InputTextModule, AppCodeModule, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>The fluid prop makes the component take up the full width of its container when set to true.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <input type="text" pInputText [(ngModel)]="value" fluid />
        </div>
        <app-code [code]="code" selector="input-text-fluid-demo"></app-code>
    `
})
export class FluidDoc {
    value: string;

    code: Code = {
        basic: `<input type="text" pInputText [(ngModel)]="value" fluid />`,

        html: `<div class="card flex justify-center">
    <input type="text" pInputText [(ngModel)]="value" fluid />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-text-fluid-demo',
    templateUrl: './input-text-fluid-demo.html',
    standalone: true,
    imports: [FormsModule, InputTextModule]
})
export class InputTextFluidDemo {
    value: string;
}`
    };
}
