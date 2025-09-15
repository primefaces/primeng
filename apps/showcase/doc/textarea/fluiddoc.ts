import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { TextareaModule } from 'primeng/textarea';

@Component({
    selector: 'fluid-doc',
    standalone: true,
    imports: [FormsModule, AppCode, AppDocSectionText, TextareaModule],
    template: `
        <app-docsectiontext>
            <p>The fluid prop makes the component take up the full width of its container when set to true.</p>
        </app-docsectiontext>
        <div class="card">
            <textarea rows="5" cols="30" pTextarea [(ngModel)]="value" fluid></textarea>
        </div>
        <app-code [code]="code" selector="input-textarea-fluid-demo"></app-code>
    `
})
export class FluidDoc {
    value!: string;

    code: Code = {
        basic: `<textarea rows="5" cols="30" pTextarea [(ngModel)]="value" fluid></textarea>`,

        html: `<div class="card">
    <textarea rows="5" cols="30" pTextarea  [(ngModel)]="value" fluid></textarea>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { TextareaModule } from 'primeng/textarea';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-textarea-fluid-demo',
    templateUrl: './input-textarea-fluid-demo.html',
    standalone: true,
    imports: [FormsModule, TextareaModule]
})

export class InputTextareaFluidDemo {
    value!: string;
}`
    };
}
