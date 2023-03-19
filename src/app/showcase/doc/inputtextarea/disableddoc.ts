import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'inputtextarea-disabled-demo',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>When <i>disabled</i> is present, the element cannot be edited and focused.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <textarea rows="5" cols="30" pInputTextarea [disabled]="true"></textarea>
        </div>
        <app-code [code]="code" selector="inputtextarea-disabled-demo"></app-code>
    </section>`
})
export class DisabledDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<textarea rows="5" cols="30" pInputTextarea [disabled]="true"></textarea>`,

        html: `
<div class="card flex justify-content-center">
    <textarea rows="5" cols="30" pInputTextarea [disabled]="true"></textarea>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'inputtextarea-disabled-demo',
    templateUrl: './inputtextarea-disabled-demo.html',
    styleUrls: ['./inputtextarea-disabled-demo.scss']
})
export class InputtextareaDisabledDemo {
}`
    };
}
