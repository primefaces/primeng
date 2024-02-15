import { Component } from '@angular/core';
import { BasicDoc } from '../../doc/inputswitch/basicdoc';
import { ImportDoc } from '../../doc/inputswitch/importdoc';
import { DisabledDoc } from '../../doc/inputswitch/disableddoc';
import { PreselectionDoc } from '../../doc/inputswitch/preselectiondoc';
import { StyleDoc } from '../../doc/inputswitch/styledoc';
import { AccessibilityDoc } from '../../doc/inputswitch/accessibilitydoc';
import { ReactiveFormsDoc } from '../../doc/inputswitch/reactiveformsdoc';
import { InvalidDoc } from '../../doc/inputswitch/invaliddoc';
@Component({
    templateUrl: './inputswitchdemo.html'
})
export class InputSwitchDemo {
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
