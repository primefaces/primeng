import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'autoresize-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>When <i>autoResize</i> is enabled, textarea grows instead of displaying a scrollbar.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <textarea rows="5" cols="30" pInputTextarea [autoResize]="true"></textarea>
        </div>
        <app-code [code]="code" selector="input-textarea-auto-resize-demo"></app-code>
    </section>`
})
export class AutoResizeDoc {
    @Input() id: string;

    @Input() title: string;

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
    selector: 'input-textarea-auto-resize-demo',
    templateUrl: './input-textarea-auto-resize-demo.html'
})
export class InputTextareaAutoResizeDemo {
}`
    };
}
