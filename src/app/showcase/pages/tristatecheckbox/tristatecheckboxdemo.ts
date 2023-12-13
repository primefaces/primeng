import { Component } from '@angular/core';
import { BasicDoc } from '../../doc/tristatecheckbox/basicdoc';
import { InvalidDoc } from '../../doc/tristatecheckbox/invaliddoc';
import { ImportDoc } from '../../doc/tristatecheckbox/importdoc';
import { DisabledDoc } from '../../doc/tristatecheckbox/disableddoc';
import { StyleDoc } from '../../doc/tristatecheckbox/styledoc';
import { AccessibilityDoc } from '../../doc/tristatecheckbox/accessibilitydoc';
import { ReactiveFormsDoc } from '../../doc/tristatecheckbox/reactiveformsdoc';

@Component({
    templateUrl: './tristatecheckboxdemo.html'
})
export class TriStateCheckboxDemo {
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
