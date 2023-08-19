import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'basic-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>InputTextarea is applied to an input field with <i>pInputTextarea</i> directive.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <textarea rows="5" cols="30" pInputTextarea [(ngModel)]="value"></textarea>
        </div>
        <app-code [code]="code" selector="input-textarea-basic-demo"></app-code>
    </section>`
})
export class BasicDoc {
    @Input() id: string;

    @Input() title: string;

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
