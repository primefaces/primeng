import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'key-filter-doc',
    template: `
        <app-docsectiontext>
            <p>InputText has built-in key filtering support to block certain keys, refer to <a href="/keyfilter">keyfilter</a> page for more information.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <textarea pKeyFilter="int" rows="5" cols="30" pTextarea></textarea>
        </div>
        <app-code [code]="code" selector="input-textarea-key-filter-demo"></app-code>
    `
})
export class KeyfilterDoc {
    code: Code = {
        basic: `<textarea
    pKeyFilter="int"
    rows="5"
    cols="30"
    pTextarea>
</textarea>`,

        html: `<div class="card flex justify-center">
    <textarea
        pKeyFilter="int"
        rows="5"
        cols="30"
        pTextarea>
    </textarea>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { Textarea } from 'primeng/textearea';;
import { FormsModule } from '@angular/forms';

@Component({
    selector:'input-textarea-key-filter-demo',
    templateUrl: './input-textarea-key-filter-demo.html',
    standalone: true,
    imports: [FormsModule, Textarea]
})
export class InputTextareaKeyFilterDemo {
}`
    };
}
