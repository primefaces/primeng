import { AccessibilityDoc } from '@/doc/editor/accessibilitydoc';
import { BasicDoc } from '@/doc/editor/basicdoc';
import { CustomToolbarDoc } from '@/doc/editor/customtoolbardoc';
import { ImportDoc } from '@/doc/editor/importdoc';
import { QuillDoc } from '@/doc/editor/quilldoc';
import { ReactiveFormsDoc } from '@/doc/editor/reactiveformsdoc';
import { ReadOnlyDoc } from '@/doc/editor/readonlydoc';
import { TemplateDrivenFormsDoc } from '@/doc/editor/templatedrivenformsdoc';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    standalone: true,
    imports: [AppDoc],
    template: ` <app-doc docTitle="Angular Editor Component" header="Editor" description="Editor is rich text editor component based on Quill." [docs]="docs" [apiDocs]="['Editor']" themeDocs="editor"></app-doc> `
})
export class EditorDemo {
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
