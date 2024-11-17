import { AccessibilityDoc } from '@/doc/toggleswitch/accessibilitydoc';
import { BasicDoc } from '@/doc/toggleswitch/basicdoc';
import { DisabledDoc } from '@/doc/toggleswitch/disableddoc';
import { ImportDoc } from '@/doc/toggleswitch/importdoc';
import { InputSwitchDocModule } from '@/doc/toggleswitch/inputswitchdoc.module';
import { InvalidDoc } from '@/doc/toggleswitch/invaliddoc';
import { PreselectionDoc } from '@/doc/toggleswitch/preselectiondoc';
import { ReactiveFormsDoc } from '@/doc/toggleswitch/reactiveformsdoc';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc docTitle="Angular ToggleSwitch Component" header="ToggleSwitch" description="ToggleSwitch is used to select a boolean value." [docs]="docs" [apiDocs]="['ToggleSwitch']" themeDocs="toggleswitch"></app-doc>`,
    standalone: true,
    imports: [InputSwitchDocModule]
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
            id: 'reactive-forms',
            label: 'Reactive Forms',
            component: ReactiveFormsDoc
        },
        {
            id: 'preselection',
            label: 'Preselection',
            component: PreselectionDoc
        },
        {
            id: 'invalid',
            label: 'Invalid',
            component: InvalidDoc
        },
        {
            id: 'disabled',
            label: 'Disabled',
            component: DisabledDoc
        },

        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
