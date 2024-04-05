import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'filled-doc',
    template: `
        <app-docsectiontext>
            <p>Specify the <i>variant</i> property as <i>filled</i> to display the component with a higher visual emphasis than the default <i>outlined</i> style.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <textarea [variant]="'filled'" rows="5" cols="30" pInputTextarea [(ngModel)]="value"></textarea>
        </div>
        <app-code [code]="code" selector="input-textarea-filled-demo"></app-code>
    `
})
export class FilledDoc {
    value!: string;

    code: Code = {
        basic: `<textarea 
    variant="filled"
    rows="5"
    cols="30" 
    pInputTextarea 
    [(ngModel)]="value">
</textarea>`,

        html: `<div class="card flex justify-content-center">
    <textarea 
        variant="filled"
        rows="5"
        cols="30"
        pInputTextarea 
        [(ngModel)]="value">
    </textarea>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-textarea-filled-demo',
    templateUrl: './input-textarea-filled-demo.html',
    standalone: true,
    imports: [FormsModule, InputTextareaModule]
})

export class InputTextareaFilledDemo {
    value!: string;
}`
    };
}
