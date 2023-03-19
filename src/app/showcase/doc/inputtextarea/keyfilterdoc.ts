import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'inputtextarea-keyfilter-demo',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>InputText has built-in key filtering support to block certain keys, refer to <a href="/keyfilter">keyfilter</a> page for more information.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <textarea pKeyFilter="int" rows="5" cols="30" pInputTextarea></textarea>
        </div>
        <app-code [code]="code" selector="inputtextarea-keyfilter-demo"></app-code>
    </section>`
})
export class KeyfilterDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<textarea pKeyFilter="int" rows="5" cols="30" pInputTextarea></textarea>`,

        html: `
<div class="card flex justify-content-center">
    <textarea pKeyFilter="int" rows="5" cols="30" pInputTextarea></textarea>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'inputtextarea-keyfilter-demo',
    templateUrl: './inputtextarea-keyfilter-demo.html',
    styleUrls: ['./inputtextarea-keyfilter-demo.scss']
})
export class InputtextareaKeyfilterDemo {
}`
    };
}
