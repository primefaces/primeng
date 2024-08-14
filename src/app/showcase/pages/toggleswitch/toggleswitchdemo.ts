import { Component } from '@angular/core';
import { BasicDoc } from '@doc/toggleswitch/basicdoc';
import { ImportDoc } from '@doc/toggleswitch/importdoc';
import { DisabledDoc } from '@doc/toggleswitch/disableddoc';
import { PreselectionDoc } from '@doc/toggleswitch/preselectiondoc';
import { StyleDoc } from '@doc/toggleswitch/styledoc';
import { AccessibilityDoc } from '@doc/toggleswitch/accessibilitydoc';
import { ReactiveFormsDoc } from '@doc/toggleswitch/reactiveformsdoc';
import { InvalidDoc } from '@doc/toggleswitch/invaliddoc';
@Component({
    templateUrl: './toggleswitchdemo.html'
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
