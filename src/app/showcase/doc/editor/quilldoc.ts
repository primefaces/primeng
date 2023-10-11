import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'quill-doc',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Editor uses <a href="https://quilljs.com/">Quill</a> editor underneath so it needs to be installed as a dependency.</p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    </section>`
})
export class QuillDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `npm install quill`
    };
}
