import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'autoresize-doc',
    template: `
        <app-docsectiontext>
            <p>When <i>autoResize</i> is enabled, textarea grows instead of displaying a scrollbar.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <textarea rows="5" cols="30" pTextarea [autoResize]="true"></textarea>
        </div>
        <app-code [code]="code" selector="input-textarea-auto-resize-demo"></app-code>
    `
})
export class AutoResizeDoc {
    code: Code = {
        basic: `<textarea rows="5"cols="30" pTextarea [autoResize]="true"></textarea>`,

        html: `<div class="card flex justify-center">
    <textarea rows="5" cols="30" pTextarea [autoResize]="true"></textarea>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { Textarea } from 'primeng/textearea';;
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-textarea-auto-resize-demo',
    templateUrl: './input-textarea-auto-resize-demo.html',
    standalone: true,
    imports: [FormsModule, Textarea]
})
export class InputTextareaAutoResizeDemo {
}`
    };
}
