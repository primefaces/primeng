import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'inputtextarea-autoresize-demo',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id">
            <p>When autoResize is enabled, textarea grows instead of displaying a scrollbar.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <textarea rows="5" cols="30" pInputTextarea [autoResize]="true"></textarea>
        </div>
        <app-code [code]="code" selector="inputtextarea-autoresize-demo"></app-code>
    </div>`
})
export class AutoResizeDoc {
    @Input() id: string;

    @Input() title: string;

    value: string;

    code: Code = {
        basic: `
<textarea rows="5" cols="30" pInputTextarea [autoResize]="true"></textarea>`,

        html: `
<div class="card flex justify-content-center">
    <textarea rows="5" cols="30" pInputTextarea [autoResize]="true"></textarea>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'inputtextarea-autoresize-demo',
    templateUrl: './inputtextarea-autoresize-demo.html',
    styleUrls: ['./inputtextarea-autoresize-demo.scss']
})

export class InputtextareaAutoresizeDemo {
}`
    };
}
