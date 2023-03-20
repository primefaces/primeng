import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'editor-readonly-demo',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>When <i>readonly</i> is present, the value cannot be edited.</p>
        </app-docsectiontext>
        <div class="card">
            <p-editor [(ngModel)]="text" [readonly]="true" [style]="{ height: '320px' }"></p-editor>
        </div>
        <app-code [code]="code" selector="editor-readonly-demo"></app-code>
    </section>`
})
export class ReadOnlyDoc {
    @Input() id: string;

    @Input() title: string;

    text: string = 'Always bet on Prime!';

    code: Code = {
        basic: `
<p-editor [(ngModel)]="text" [readonly]="true" [style]="{ height: '320px' }"></p-editor>`,

        html: `
<div class="card">
    <p-editor [(ngModel)]="text" [readonly]="true" [style]="{ height: '320px' }"></p-editor>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'editor-readonly-demo',
    templateUrl: './editor-readonly-demo.html'
})
export class EditorReadonlyDemo {
    text: string = 'Always bet on Prime!';
}`
    };
}
