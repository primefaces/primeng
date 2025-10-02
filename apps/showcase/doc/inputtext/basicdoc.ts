import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'basic-doc',
    standalone: true,
    imports: [FormsModule, InputTextModule, AppCodeModule, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>InputText is used as a controlled input with <i>ngModel</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <input type="text" pInputText [(ngModel)]="value" />
        </div>
        <app-code [code]="code" selector="input-text-basic-demo"></app-code>
    `
})
export class BasicDoc {
    value: string;

    code: Code = {
        basic: `<input type="text" pInputText [(ngModel)]="value" />`,

        html: `<div class="card flex justify-center">
    <input type="text" pInputText [(ngModel)]="value" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-text-basic-demo',
    templateUrl: './input-text-basic-demo.html',
    standalone: true,
    imports: [FormsModule, InputTextModule]
})
export class InputTextBasicDemo {
    value: string;
}`
    };
}
