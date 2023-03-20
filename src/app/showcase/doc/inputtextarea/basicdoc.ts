import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'inputtextarea-basic-demo',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>InputTextarea is applied to an input field with <i>pInputTextarea</i> directive.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <textarea rows="5" cols="30" pInputTextarea [(ngModel)]="value"></textarea>
        </div>
        <app-code [code]="code" selector="inputtextarea-basic-demo"></app-code>
    </section>`
})
export class BasicDoc {
    @Input() id: string;

    @Input() title: string;

    value: string;

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
    selector: 'inputtextarea-basic-demo',
    templateUrl: './inputtextarea-basic-demo.html',
    styleUrls: ['./inputtextarea-basic-demo.scss']
})

export class InputtextareaBasicDemo {
    value: string;
}`
    };
}
