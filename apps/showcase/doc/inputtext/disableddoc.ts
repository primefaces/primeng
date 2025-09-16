import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'disabled-doc',
    standalone: true,
    imports: [FormsModule, InputTextModule, AppCodeModule, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>When <i>disabled</i> is present, the element cannot be edited and focused.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <input pInputText [disabled]="true" [(ngModel)]="value" />
        </div>
        <app-code [code]="code" selector="input-text-disabled-demo"></app-code>
    `
})
export class DisabledDoc {
    value: string | undefined = 'Disabled';

    code: Code = {
        basic: `<input pInputText [disabled]="true" [(ngModel)]="value" />`,

        html: `<div class="card flex justify-center">
    <input pInputText [disabled]="true" [(ngModel)]="value" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-text-disabled-demo',
    templateUrl: './input-text-disabled-demo.html',
    standalone: true,
    imports: [FormsModule, InputTextModule]
})
export class InputTextDisabledDemo {
    value: string | undefined = "Disabled"
}`
    };
}
