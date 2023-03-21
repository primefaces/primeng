import { Component } from '@angular/core';
import { ReactiveFormsDoc } from '../../doc/multiselect/reactiveformsdoc';
import { AccessibilityDoc } from '../../doc/multiselect/accessibilitydoc';
import { BasicDoc } from '../../doc/multiselect/basicdoc';
import { ChipsDoc } from '../../doc/multiselect/chipsdoc';
import { DisabledDoc } from '../../doc/multiselect/disableddoc';
import { EventsDoc } from '../../doc/multiselect/eventsdoc';
import { FilterDoc } from '../../doc/multiselect/filterdoc';
import { FloatLabelDoc } from '../../doc/multiselect/floatlabeldoc';
import { GroupDoc } from '../../doc/multiselect/groupdoc';
import { ImportDoc } from '../../doc/multiselect/importdoc';
import { InvalidDoc } from '../../doc/multiselect/invaliddoc';
import { PropsDoc } from '../../doc/multiselect/propsdoc';
import { StyleDoc } from '../../doc/multiselect/styledoc';
import { TemplateDoc } from '../../doc/multiselect/templatedoc';
import { TemplatesDoc } from '../../doc/multiselect/templatesdoc';
import { VirtualScrollDoc } from '../../doc/multiselect/virtualscrolldoc';

@Component({
    templateUrl: './multiselectdemo.html',
    styleUrls: ['./multiselectdemo.scss']
})
export class MultiSelectDemo {
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
            id: 'chips',
            label: 'Chips',
            component: ChipsDoc
        },
        {
            id: 'group',
            label: 'Group',
            component: GroupDoc
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc
        },
        {
            id: 'filter',
            label: 'Filter',
            component: FilterDoc
        },
        {
            id: 'virtualscroll',
            label: 'VirtualScroll',
            component: VirtualScrollDoc
        },
        {
            id: 'floatlabel',
            label: 'Float Label',
            component: FloatLabelDoc
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
