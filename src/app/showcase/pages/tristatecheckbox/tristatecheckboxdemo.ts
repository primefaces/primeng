import { Component } from '@angular/core';
import { BasicDoc } from '../../doc/tristatecheckbox/basicdoc';
import { ImportDoc } from '../../doc/tristatecheckbox/importdoc';
import { DisabledDoc } from '../../doc/tristatecheckbox/disableddoc';
import { PropsDoc } from '../../doc/tristatecheckbox/propsdoc';
import { EventsDoc } from '../../doc/tristatecheckbox/eventsdoc';
import { StyleDoc } from '../../doc/tristatecheckbox/styledoc';
import { AccessibilityDoc } from '../../doc/tristatecheckbox/accessibilitydoc';
import { ReactiveFormsDoc } from '../../doc/tristatecheckbox/reactiveformsdoc';
import { TemplatesDoc } from '../../doc/tristatecheckbox/templatesdoc';

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

    apiDocs = [
        {
            id: 'properties',
            label: 'Properties',
            component: PropsDoc
        },
        {
            id: 'events',
            label: 'Events',
            component: EventsDoc
        },
        {
            id: 'templates',
            label: 'Templates',
            component: TemplatesDoc
        }
    ];
}
