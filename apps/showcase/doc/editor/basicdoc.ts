import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorModule } from 'primeng/editor';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'editor-basic-demo',
    standalone: true,
    imports: [FormsModule, EditorModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>A model can be bound using the standard <i>ngModel</i> directive.</p>
        </app-docsectiontext>
        <div class="card">
            <p-editor [(ngModel)]="text" [style]="{ height: '320px' }" />
        </div>
        <app-code [code]="code" selector="editor-basic-demo"></app-code>
    `
})
export class BasicDoc {
    text: string | undefined;

    code: Code = {
        basic: `<p-editor [(ngModel)]="text" [style]="{ height: '320px' }" />`,

        html: `<div class="card">
    <p-editor [(ngModel)]="text" [style]="{ height: '320px' }" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Editor } from 'primeng/editor';

@Component({
    selector: 'editor-basic-demo',
    templateUrl: './editor-basic-demo.html',
    standalone: true,
    imports: [FormsModule, Editor]
})
export class EditorBasicDemo {
    text: string | undefined;
}`
    };
}
