import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { TextareaModule } from 'primeng/textarea';

@Component({
    selector: 'basic-doc',
    standalone: true,
    imports: [FormsModule, AppCode, AppDocSectionText, TextareaModule],
    template: `
        <app-docsectiontext>
            <p>Textarea is applied to an input field with <i>pTextarea</i> directive.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <textarea rows="5" cols="30" pTextarea [(ngModel)]="value"></textarea>
        </div>
        <app-code [code]="code" selector="input-textarea-basic-demo"></app-code>
    `
})
export class BasicDoc {
    value!: string;

    code: Code = {
        basic: `<textarea rows="5" cols="30" pTextarea [(ngModel)]="value"></textarea>`,

        html: `<div class="card flex justify-center">
    <textarea rows="5" cols="30" pTextarea  [(ngModel)]="value"></textarea>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { TextareaModule } from 'primeng/textarea';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-textarea-basic-demo',
    templateUrl: './input-textarea-basic-demo.html',
    standalone: true,
    imports: [FormsModule, TextareaModule]
})

export class InputTextareaBasicDemo {
    value!: string;
}`
    };
}
