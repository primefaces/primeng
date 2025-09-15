import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { TextareaModule } from 'primeng/textarea';

@Component({
    selector: 'key-filter-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, KeyFilterModule, TextareaModule],
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
import { TextareaModule } from 'primeng/textarea';
import { FormsModule } from '@angular/forms';

@Component({
    selector:'input-textarea-key-filter-demo',
    templateUrl: './input-textarea-key-filter-demo.html',
    standalone: true,
    imports: [FormsModule, TextareaModule]
})
export class InputTextareaKeyFilterDemo {
}`
    };
}
