import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'editor-customtoolbar-demo',
    template: `
        <app-docsectiontext>
            <p>Editor provides a default toolbar with common options, to customize it define your elements inside the header element. Refer to <a href="http://quilljs.com/docs/modules/toolbar/">Quill documentation</a> for available controls.</p>
        </app-docsectiontext>
        <div class="card">
            <p-editor [(ngModel)]="text" [style]="{ height: '320px' }">
                <ng-template pTemplate="header">
                    <span class="ql-formats">
                        <button type="button" class="ql-bold" aria-label="Bold"></button>
                        <button type="button" class="ql-italic" aria-label="Italic"></button>
                        <button type="button" class="ql-underline" aria-label="Underline"></button>
                    </span>
                </ng-template>
            </p-editor>
        </div>
        <app-code [code]="code" selector="editor-customtoolbar-demo"></app-code>
    `
})
export class CustomToolbarDoc {
    text: string = 'Hello World!';

    code: Code = {
        basic: `<p-editor [(ngModel)]="text" [style]="{ height: '320px' }">
    <ng-template pTemplate="header">
        <span class="ql-formats">
            <button type="button" class="ql-bold" aria-label="Bold"></button>
            <button type="button" class="ql-italic" aria-label="Italic"></button>
            <button type="button" class="ql-underline" aria-label="Underline"></button>
        </span>
    </ng-template>
</p-editor>`,

        html: `
<div class="card">
    <p-editor [(ngModel)]="text" [style]="{ height: '320px' }">
        <ng-template pTemplate="header">
            <span class="ql-formats">
                <button type="button" class="ql-bold" aria-label="Bold"></button>
                <button type="button" class="ql-italic" aria-label="Italic"></button>
                <button type="button" class="ql-underline" aria-label="Underline"></button>
            </span>
        </ng-template>
    </p-editor>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'editor-customtoolbar-demo',
    templateUrl: './editor-customtoolbar-demo.html'
})
export class EditorCustomtoolbarDemo {
    text: string = 'Hello World!';
}`
    };
}
