import { Component } from '@angular/core';
import { BasicDoc } from '../../doc/tristatecheckbox/basicdoc';
import { ImportDoc } from '../../doc/tristatecheckbox/importdoc';
import { DisabledDoc } from '../../doc/tristatecheckbox/disableddoc';
import { PropsDoc } from '../../doc/tristatecheckbox/propsdoc';
import { EventsDoc } from '../../doc/tristatecheckbox/eventsdoc';
import { StyleDoc } from '../../doc/tristatecheckbox/styledoc';

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
            id: 'disabled',
            label: 'Disabled',
            component: DisabledDoc
        },
        {
            id: 'style',
            label: 'Style',
            component: StyleDoc
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
        }
    ];
}
