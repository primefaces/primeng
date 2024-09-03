import { Component } from '@angular/core';
import { ReactiveFormsDoc } from '@doc/textarea/reactiveformsdoc';
import { AccessibilityDoc } from '@doc/textarea/accessibilitydoc';
import { AutoResizeDoc } from '@doc/textarea/autoresizedoc';
import { BasicDoc } from '@doc/textarea/basicdoc';
import { DisabledDoc } from '@doc/textarea/disableddoc';
import { FloatlabelDoc } from '@doc/textarea/floatlabeldoc';
import { InvalidDoc } from '@doc/textarea/invaliddoc';
import { ImportDoc } from '@doc/textarea/importdoc';
import { StyleDoc } from '@doc/textarea/styledoc';
import { FilledDoc } from '@doc/textarea/filleddoc';
import { TextareaDocModule } from '@doc/textarea/texteareadoc.module';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    imports: [CommonModule, TextareaDocModule],
    template: `<app-doc
        docTitle="Angular Textarea Component"
        header="Textarea"
        description="Textarea adds styling and autoResize functionality to standard textarea element."
        [docs]="docs"
        [apiDocs]="['Textarea']"
    ></app-doc>`,
})
export class TextareaDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc,
        },
        {
            id: 'basic',
            label: 'Basic',
            component: BasicDoc,
        },
        {
            id: 'reactive-forms',
            label: 'Reactive Forms',
            component: ReactiveFormsDoc,
        },
        {
            id: 'autoresize',
            label: 'AutoResize',
            component: AutoResizeDoc,
        },
        {
            id: 'floatlabel',
            label: 'Float Label',
            component: FloatlabelDoc,
        },
        {
            id: 'filled',
            label: 'Filled',
            component: FilledDoc,
        },
        {
            id: 'invalid',
            label: 'Invalid',
            component: InvalidDoc,
        },
        {
            id: 'disabled',
            label: 'Disabled',
            component: DisabledDoc,
        },
        {
            id: 'style',
            label: 'Style',
            component: StyleDoc,
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc,
        },
    ];
}
