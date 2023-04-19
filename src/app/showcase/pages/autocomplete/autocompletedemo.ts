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
import { AccessibilityDoc } from '../../doc/autocomplete/accessibilitydoc';
import { DropdownDoc } from '../../doc/autocomplete/dropdowndoc';
import { ForceSelectionDoc } from '../../doc/autocomplete/forceselectiondoc';
import { ObjectsDoc } from '../../doc/autocomplete/objectsdoc';
import { ReactiveFormsDoc } from '../../doc/autocomplete/reactiveformsdoc';
import { TemplatesDoc } from '../../doc/autocomplete/templatesdoc';
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
            id: 'reactive-forms',
            label: 'Reactive Forms',
            component: ReactiveFormsDoc
        },
        {
            id: 'dropdown',
            label: 'Dropdown',
            component: DropdownDoc
        },
        {
            id: 'objects',
            label: 'Objects',
            component: ObjectsDoc
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
            id: 'forceselection',
            label: 'Force Selection',
            component: ForceSelectionDoc
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
