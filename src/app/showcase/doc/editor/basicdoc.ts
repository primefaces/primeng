import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'editor-basic-demo',
    template: `
        <app-docsectiontext>
            <p>Editor provides a default toolbar with common options, to customize it define your elements inside the header element. Refer to <a href="http://quilljs.com/docs/modules/toolbar/">Quill documentation</a> for available controls.</p>
        </app-docsectiontext>
        <div class="card">
            <p-editor [(ngModel)]="text" [style]="{ height: '320px' }"/>
        </div>
        <app-code [code]="code" selector="editor-basic-demo"></app-code>
    `
})
export class BasicDoc {
    text: string | undefined;

    code: Code = {
        basic: `<p-editor [(ngModel)]="text" [style]="{ height: '320px' }"/>`,

        html: `<div class="card">
    <p-editor [(ngModel)]="text" [style]="{ height: '320px' }"/>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorModule } from 'primeng/editor';

@Component({
    selector: 'editor-basic-demo',
    templateUrl: './editor-basic-demo.html',
    standalone: true,
    imports: [FormsModule, EditorModule]
})
export class EditorBasicDemo {
    text: string | undefined;
}`
    };
}
