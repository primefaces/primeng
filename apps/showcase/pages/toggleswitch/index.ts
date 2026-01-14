import { AccessibilityDoc } from '@/doc/toggleswitch/accessibility-doc';
import { BasicDoc } from '@/doc/toggleswitch/basic-doc';
import { DisabledDoc } from '@/doc/toggleswitch/disabled-doc';
import { ImportDoc } from '@/doc/toggleswitch/import-doc';
import { InvalidDoc } from '@/doc/toggleswitch/invalid-doc';
import { PreselectionDoc } from '@/doc/toggleswitch/preselection-doc';
import { ReactiveFormsDoc } from '@/doc/toggleswitch/reactiveforms-doc';
import { TemplateDoc } from '@/doc/toggleswitch/template-doc';
import { TemplateDrivenFormsDoc } from '@/doc/toggleswitch/templatedrivenforms-doc';
import { PTComponent } from '@/doc/toggleswitch/pt/PTComponent';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    template: `<app-doc
        docTitle="Angular ToggleSwitch Component"
        header="ToggleSwitch"
        description="ToggleSwitch is used to select a boolean value."
        [docs]="docs"
        [apiDocs]="['ToggleSwitch']"
        [ptDocs]="ptComponent"
        themeDocs="toggleswitch"
    ></app-doc>`,
    standalone: true,
    imports: [AppDoc]
})
export class ToggleSwitchDemo {
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
            id: 'preselection',
            label: 'Preselection',
            component: PreselectionDoc
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc
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
