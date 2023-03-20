import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'editor-basic-demo',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Two-way value binding is defined with ngModel.</p>
        </app-docsectiontext>
        <div class="card">
            <p-editor [(ngModel)]="text" [style]="{ height: '320px' }"></p-editor>
        </div>
        <app-code [code]="code" selector="editor-basic-demo"></app-code>
    </section>`
})
export class BasicDoc {
    @Input() id: string;

    @Input() title: string;

    text: string;

    code: Code = {
        basic: `
<p-editor [(ngModel)]="text" [style]="{ height: '320px' }"></p-editor>`,

        html: `
<div class="card">
    <p-editor [(ngModel)]="text" [style]="{ height: '320px' }"></p-editor>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'editor-basic-demo',
    templateUrl: './editor-basic-demo.html'
})
export class EditorBasicDemo {
    text: string;
}`
    };
}
