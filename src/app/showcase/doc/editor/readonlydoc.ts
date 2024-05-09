import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'editor-readonly-demo',
    template: `
        <app-docsectiontext>
            <p>When <i>readonly</i> is present, the value cannot be edited.</p>
        </app-docsectiontext>
        <div class="card">
            <p-editor [(ngModel)]="text" [readonly]="true" [style]="{ height: '320px' }" />
        </div>
        <app-code [code]="code" selector="editor-readonly-demo"></app-code>
    `
})
export class ReadOnlyDoc {
    text: string = 'Always bet on Prime!';

    code: Code = {
        basic: `<p-editor [(ngModel)]="text" [readonly]="true" [style]="{ height: '320px' }" />`,

        html: `<div class="card">
    <p-editor [(ngModel)]="text" [readonly]="true" [style]="{ height: '320px' }" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorModule } from 'primeng/editor';

@Component({
    selector: 'editor-readonly-demo',
    templateUrl: './editor-readonly-demo.html',
    standalone: true,
    imports: [FormsModule, EditorModule]
})
export class EditorReadonlyDemo {
    text: string = 'Always bet on Prime!';
}`
    };
}
