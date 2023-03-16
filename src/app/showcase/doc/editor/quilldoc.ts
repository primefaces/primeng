import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'quill-doc',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Editor uses <i>Quill</i> editor underneath so it needs to be installed as a dependency.</p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    </div>`
})
export class QuillDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        typescript: `
npm install quill`
    };
}
