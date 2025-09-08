import { AccessibilityDoc } from '@/doc/toggleswitch/accessibilitydoc';
import { BasicDoc } from '@/doc/toggleswitch/basicdoc';
import { DisabledDoc } from '@/doc/toggleswitch/disableddoc';
import { ImportDoc } from '@/doc/toggleswitch/importdoc';
import { InvalidDoc } from '@/doc/toggleswitch/invaliddoc';
import { PreselectionDoc } from '@/doc/toggleswitch/preselectiondoc';
import { ReactiveFormsDoc } from '@/doc/toggleswitch/reactiveformsdoc';
import { TemplateDoc } from '@/doc/toggleswitch/templatedoc';
import { TemplateDrivenFormsDoc } from '@/doc/toggleswitch/templatedrivenformsdoc';
import { ToggleSwitchDocModule } from '@/doc/toggleswitch/toggleswitchdoc.module';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc docTitle="Angular ToggleSwitch Component" header="ToggleSwitch" description="ToggleSwitch is used to select a boolean value." [docs]="docs" [apiDocs]="['ToggleSwitch']" themeDocs="toggleswitch"></app-doc>`,
    standalone: true,
    imports: [ToggleSwitchDocModule]
})
export class ToggleSwitchDemo {
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
