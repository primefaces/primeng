import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'basic-doc',
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
import { Textarea } from 'primeng/textearea';;
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-textarea-basic-demo',
    templateUrl: './input-textarea-basic-demo.html',
    standalone: true,
    imports: [FormsModule, Textarea]
})

export class InputTextareaBasicDemo {
    value!: string;
}`
    };
}
