import { Component } from '@angular/core';
import { BasicDoc } from '../../doc/autocomplete/basicdoc';
import { EventsDoc } from '../../doc/autocomplete/eventsdoc';
import { GroupedDoc } from '../../doc/autocomplete/groupeddoc';
import { ImportDoc } from '../../doc/autocomplete/importdoc';
import { MultipleDoc } from '../../doc/autocomplete/multipledoc';
import { PropsDoc } from '../../doc/autocomplete/propsdoc';
import { StyleDoc } from '../../doc/autocomplete/styledoc';
import { TemplateDoc } from '../../doc/autocomplete/templatedoc';
import { VirtualScrollDoc } from '../../doc/autocomplete/virtualscrolldoc';
@Component({
    templateUrl: './autocompletedemo.html'
})
export class AutoCompleteDemo {
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
            id: 'template',
            label: 'Template',
            component: TemplateDoc
        },
        {
            id: 'grouped',
            label: 'Grouped',
            component: GroupedDoc
        },
        {
            id: 'virtualscroll',
            label: 'Virtual Scroll',
            component: VirtualScrollDoc
        },
        {
            id: 'multiple',
            label: 'Multiple',
            component: MultipleDoc
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
