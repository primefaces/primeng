import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'disabled-doc',
    template: `
        <app-docsectiontext>
            <p>When <i>disabled</i> is present, the element cannot be edited and focused.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <textarea rows="5" cols="30" pInputTextarea [disabled]="true"></textarea>
        </div>
        <app-code [code]="code" selector="input-textarea-disabled-demo"></app-code>
    `
})
export class DisabledDoc {
    code: Code = {
        basic: `<textarea 
    rows="5"
    cols="30" 
    pInputTextarea 
    [disabled]="true">
</textarea>`,

        html: `<div class="card flex justify-center">
    <textarea 
        rows="5"
        cols="30"
        pInputTextarea 
        [disabled]="true">
    </textarea>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-textarea-disabled-demo',
    templateUrl: './input-textarea-disabled-demo.html',
    standalone: true,
    imports: [FormsModule, InputTextareaModule]
})
export class InputTextareaDisabledDemo {
}`
    };
}
