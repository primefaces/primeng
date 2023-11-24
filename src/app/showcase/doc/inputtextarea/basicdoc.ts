import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>InputTextarea is applied to an input field with <i>pInputTextarea</i> directive.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <textarea rows="5" cols="30" pInputTextarea [(ngModel)]="value"></textarea>
        </div>
        <app-code [code]="code" selector="input-textarea-basic-demo"></app-code>
    `
})
export class BasicDoc {
    value!: string;

    code: Code = {
        basic: `
<textarea rows="5" cols="30" pInputTextarea [(ngModel)]="value"></textarea>`,

        html: `
<div class="card flex justify-content-center">
    <textarea rows="5" cols="30" pInputTextarea [(ngModel)]="value"></textarea>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'input-textarea-basic-demo',
    templateUrl: './input-textarea-basic-demo.html'
})
export class InputTextareaBasicDemo {
    value!: string;
}`
    };
}
