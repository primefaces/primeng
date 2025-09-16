import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'sizes-doc',
    standalone: true,
    imports: [FormsModule, InputTextModule, AppCodeModule, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>InputText provides <i>small</i> and <i>large</i> sizes as alternatives to the standard.</p>
        </app-docsectiontext>
        <div class="card flex flex-col items-center gap-4 ">
            <input pInputText [(ngModel)]="value1" type="text" pSize="small" placeholder="Small" />
            <input pInputText [(ngModel)]="value2" type="text" placeholder="Normal" />
            <input pInputText [(ngModel)]="value3" type="text" pSize="large" placeholder="Large" />
        </div>
        <app-code [code]="code" selector="input-text-sizes-demo"></app-code>
    `
})
export class SizesDoc {
    value1: string | undefined;

    value2: string | undefined;

    value3: string | undefined;

    code: Code = {
        basic: `<input pInputText [(ngModel)]="value1" type="text" pSize="small" placeholder="Small" />
<input pInputText [(ngModel)]="value2" type="text" placeholder="Normal" />
<input pInputText [(ngModel)]="value3" type="text" pSize="large" placeholder="Large" />`,

        html: `<div class="card flex flex-col items-center gap-4 ">
    <input pInputText [(ngModel)]="value1" type="text" pSize="small" placeholder="Small" />
    <input pInputText [(ngModel)]="value2" type="text" placeholder="Normal" />
    <input pInputText [(ngModel)]="value3" type="text" pSize="large" placeholder="Large" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'input-text-sizes-demo',
    templateUrl: './input-text-sizes-demo.html',
    standalone: true,
    imports: [FormsModule, InputTextModule]
})
export class InputTextSizesDemo {
    value1: string | undefined;

    value2: string | undefined;

    value3: string | undefined;
}`
    };
}
