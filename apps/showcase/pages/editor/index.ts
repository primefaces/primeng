import { AccessibilityDoc } from '@/doc/editor/accessibilitydoc';
import { BasicDoc } from '@/doc/editor/basicdoc';
import { CustomToolbarDoc } from '@/doc/editor/customtoolbardoc';
import { EditorDocModule } from '@/doc/editor/editordoc.module';
import { ImportDoc } from '@/doc/editor/importdoc';
import { QuillDoc } from '@/doc/editor/quilldoc';
import { ReactiveFormsDoc } from '@/doc/editor/reactiveformsdoc';
import { ReadOnlyDoc } from '@/doc/editor/readonlydoc';
import { Component } from '@angular/core';

@Component({
    standalone: true,
    imports: [EditorDocModule],
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
            id: 'reactive-forms',
            label: 'Reactive Forms',
            component: ReactiveFormsDoc
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
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
