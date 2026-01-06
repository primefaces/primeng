import { AccessibilityDoc } from '@/doc/editor/accessibility-doc';
import { BasicDoc } from '@/doc/editor/basic-doc';
import { CustomToolbarDoc } from '@/doc/editor/customtoolbar-doc';
import { ImportDoc } from '@/doc/editor/import-doc';
import { PTComponent } from '@/doc/editor/pt/PTComponent';
import { QuillDoc } from '@/doc/editor/quill-doc';
import { ReactiveFormsDoc } from '@/doc/editor/reactiveforms-doc';
import { ReadOnlyDoc } from '@/doc/editor/readonly-doc';
import { TemplateDrivenFormsDoc } from '@/doc/editor/templatedrivenforms-doc';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    standalone: true,
    imports: [AppDoc],
    template: ` <app-doc docTitle="Angular Editor Component" header="Editor" description="Editor is rich text editor component based on Quill." [docs]="docs" [apiDocs]="['Editor']" [ptDocs]="ptComponent" themeDocs="editor"></app-doc> `
})
export class EditorDemo {
    ptComponent = PTComponent;
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'quill',
            label: 'Quill',
            component: QuillDoc
        },
        {
            id: 'basic',
            label: 'Basic',
            component: BasicDoc
        },
        {
            id: 'readonly',
            label: 'ReadOnly',
            component: ReadOnlyDoc
        },
        {
            id: 'template',
            label: 'Template',
            component: CustomToolbarDoc
        },
        {
            id: 'forms',
            label: 'Forms',
            children: [
                { id: 'templatedriven', label: 'Template Driven', component: TemplateDrivenFormsDoc },
                { id: 'reactive', label: 'Reactive Forms', component: ReactiveFormsDoc }
            ]
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
