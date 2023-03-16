import { Component } from '@angular/core';
import { BasicDoc } from '../../doc/inputswitch/basicdoc';
import { ImportDoc } from '../../doc/inputswitch/importdoc';
import { DisabledDoc } from '../../doc/inputswitch/disableddoc';
import { PreselectionDoc } from '../../doc/inputswitch/preselectiondoc';
import { PropsDoc } from '../../doc/inputswitch/propsdoc';
import { EventsDoc } from '../../doc/inputswitch/eventsdoc';
import { StyleDoc } from '../../doc/inputswitch/styledoc';

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
