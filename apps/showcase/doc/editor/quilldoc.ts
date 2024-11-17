import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'quill-doc',
    template: `
        <app-docsectiontext>
            <p>Editor uses <a href="https://quilljs.com/">Quill</a> editor underneath so it needs to be installed as a dependency.</p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    `
})
export class QuillDoc {
    code: Code = {
        basic: `npm install quill`
    };
}
