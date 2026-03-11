import { AccessibilityDoc } from '@/doc/radiobutton/accessibility-doc';
import { DisabledDoc } from '@/doc/radiobutton/disabled-doc';
import { DynamicDoc } from '@/doc/radiobutton/dynamic-doc';
import { FilledDoc } from '@/doc/radiobutton/filled-doc';
import { GroupDoc } from '@/doc/radiobutton/group-doc';
import { ImportDoc } from '@/doc/radiobutton/import-doc';
import { InvalidDoc } from '@/doc/radiobutton/invalid-doc';
import { ReactiveFormsDoc } from '@/doc/radiobutton/reactiveforms-doc';
import { SizesDoc } from '@/doc/radiobutton/sizes-doc';
import { TemplateDrivenFormsDoc } from '@/doc/radiobutton/templatedrivenforms-doc';
import { PTComponent } from '@/doc/radiobutton/pt/PTComponent';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';
import { AppDocService } from '@/components/doc/app.doc.service';
@Component({
    template: `<app-doc
        docTitle="Angular RadioButton Component"
        header="RadioButton"
        description="RadioButton is an extension to standard radio button element with theming."
        [docs]="docs"
        [apiDocs]="['RadioButton']"
        [ptDocs]="ptComponent"
        themeDocs="radiobutton"
    ></app-doc>`,
    standalone: true,
    imports: [AppDoc]
})
export class RadioButtonDemo {
    ptComponent = PTComponent;
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'group',
            label: 'Group',
            component: GroupDoc
        },
        {
            id: 'dynamic',
            label: 'Dynamic',
            component: DynamicDoc
        },
        {
            id: 'filled',
            label: 'Filled',
            component: FilledDoc
        },
        {
            id: 'sizes',
            label: 'Sizes',
            component: SizesDoc
        },
        {
            id: 'disabled',
            label: 'Disabled',
            component: DisabledDoc
        },
        {
            id: 'invalid',
            label: 'Invalid',
            component: InvalidDoc
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
