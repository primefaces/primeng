import { Component } from '@angular/core';
import { ReactiveFormsDoc } from '@doc/radiobutton/reactiveformsdoc';
import { AccessibilityDoc } from '@doc/radiobutton/accessibilitydoc';
import { DisabledDoc } from '@doc/radiobutton/disableddoc';
import { DynamicDoc } from '@doc/radiobutton/dynamicdoc';
import { GroupDoc } from '@doc/radiobutton/groupdoc';
import { ImportDoc } from '@doc/radiobutton/importdoc';
import { InvalidDoc } from '@doc/radiobutton/invaliddoc';
import { FilledDoc } from '@doc/radiobutton/filleddoc';
import { RadioButtonDocModule } from '@doc/radiobutton/radiobuttondoc.module';

@Component({
    template: `<app-doc
        docTitle="Angular RadioButton Component"
        header="RadioButton"
        description="RadioButton is an extension to standard radio button element with theming."
        [docs]="docs"
        [apiDocs]="['RadioButton']"
        themeDocs="radiobutton"
    ></app-doc>`,
    standalone: true,
    imports: [RadioButtonDocModule],
})
export class RadioButtonDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc,
        },
        {
            id: 'group',
            label: 'Group',
            component: GroupDoc,
        },
        {
            id: 'reactive-forms',
            label: 'Reactive Forms',
            component: ReactiveFormsDoc,
        },
        {
            id: 'dynamic',
            label: 'Dynamic',
            component: DynamicDoc,
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
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc,
        },
    ];
}
