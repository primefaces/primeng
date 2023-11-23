import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'autoresize-doc',
    template: `
        <app-docsectiontext>
            <p>When <i>autoResize</i> is enabled, textarea grows instead of displaying a scrollbar.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <textarea rows="5" cols="30" pInputTextarea [autoResize]="true"></textarea>
        </div>
        <app-code [code]="code" selector="input-textarea-auto-resize-demo"></app-code>
   `
})
export class AutoResizeDoc {

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
