import { Component } from '@angular/core';
import { AccessibilityDoc } from '@doc/editor/accessibilitydoc';
import { BasicDoc } from '@doc/editor/basicdoc';
import { CustomToolbarDoc } from '@doc/editor/customtoolbardoc';
import { ImportDoc } from '@doc/editor/importdoc';
import { QuillDoc } from '@doc/editor/quilldoc';
import { ReactiveFormsDoc } from '@doc/editor/reactiveformsdoc';
import { ReadOnlyDoc } from '@doc/editor/readonlydoc';
import { StyleDoc } from '@doc/editor/styledoc';

@Component({
    templateUrl: './editordemo.html'
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
            label: 'Read Only',
            component: ReadOnlyDoc
        },
        {
            id: 'reactive-forms',
            label: 'Reactive Forms',
            component: ReactiveFormsDoc
        },
        {
            id: 'template',
            label: 'Template',
            component: CustomToolbarDoc
        },
        {
            id: 'style',
            label: 'Style',
            component: StyleDoc
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
