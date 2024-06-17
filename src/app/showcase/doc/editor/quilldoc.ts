import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'quill-doc',
    template: `
        <app-docsectiontext>
            <p>Editor uses <a href="https://quilljs.com/">Quill</a> editor underneath so it needs to be installed as a dependency.</p>
            <p>Also, core styles of the Quill should be imported in the project's root style file.</p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
        <div class="mt-3">
            <app-code [code]="code2" [hideToggleCode]="true"></app-code>
        </div>
    `
})
export class QuillDoc {
    code: Code = {
        basic: `npm install quill`
    };

    code2: Code = {
        basic: `// import Quill styles in styles.scss
@import "../node_modules/quill/dist/quill.core.css";
@import "../node_modules/quill/dist/quill.snow.css";`
    };
}
