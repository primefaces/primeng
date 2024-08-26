import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'invalid-doc',
    template: `
        <app-docsectiontext>
            <p>Invalid state style is added using the <i>ng-invalid</i> and <i>ng-dirty</i> class to indicate a failed validation.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <textarea rows="5" cols="30" pInputTextarea [(ngModel)]="value" class="ng-invalid ng-dirty"></textarea>
        </div>
        <app-code [code]="code" selector="input-textarea-invalid-demo"></app-code>
    `
})
export class InvalidDoc {
    value!: string;

    code: Code = {
        basic: `<textarea 
    rows="5" 
    cols="30" 
    pInputTextarea 
    [(ngModel)]="value" 
    class="ng-invalid ng-dirty">
</textarea>`,

        html: `<div class="card flex justify-center">
    <textarea 
        rows="5" 
        cols="30" 
        pInputTextarea 
        [(ngModel)]="value"
        class="ng-invalid ng-dirty">
    </textarea>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-textarea-invalid-demo',
    templateUrl: './input-textarea-invalid-demo.html',
    standalone: true,
    imports: [FormsModule, InputTextareaModule]
})
export class InputTextareaInvalidDemo {
    value!: string;
}`
    };
}
