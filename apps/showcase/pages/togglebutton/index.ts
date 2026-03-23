import { AccessibilityDoc } from '@/doc/togglebutton/accessibility-doc';
import { BasicDoc } from '@/doc/togglebutton/basic-doc';
import { CustomizedDoc } from '@/doc/togglebutton/customized-doc';
import { DisabledDoc } from '@/doc/togglebutton/disabled-doc';
import { ImportDoc } from '@/doc/togglebutton/import-doc';
import { InvalidDoc } from '@/doc/togglebutton/invalid-doc';
import { ReactiveFormsDoc } from '@/doc/togglebutton/reactiveforms-doc';
import { SizesDoc } from '@/doc/togglebutton/sizes-doc';
import { TemplateDrivenFormsDoc } from '@/doc/togglebutton/templatedrivenforms-doc';
import { FluidDoc } from '@/doc/togglebutton/fluid-doc';
import { PTComponent } from '@/doc/togglebutton/pt/PTComponent';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    template: `<app-doc
        docTitle="Angular ToggleButton Component"
        header="ToggleButton"
        description="ToggleButton is used to select a boolean value using a button."
        [docs]="docs"
        [apiDocs]="['ToggleButton']"
        [ptDocs]="ptComponent"
        themeDocs="togglebutton"
    ></app-doc>`,
    standalone: true,
    imports: [AppDoc]
})
export class ToggleButtonDemo {
    ptComponent = PTComponent;
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'basic',
            label: 'Basic',
            component: BasicDoc
        },
        {
            id: 'customized',
            label: 'Customized',
            component: CustomizedDoc
        },
        {
            id: 'sizes',
            label: 'Sizes',
            component: SizesDoc
        },
        {
            id: 'fluid',
            label: 'Fluid',
            component: FluidDoc
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
