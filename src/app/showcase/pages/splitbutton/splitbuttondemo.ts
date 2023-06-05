import { Component } from '@angular/core';
import { TextDoc } from '../../doc/splitbutton/textdoc';
import { BasicDoc } from '../../doc/splitbutton/basicdoc';
import { ImportDoc } from '../../doc/splitbutton/importdoc';
import { NestedDoc } from '../../doc/splitbutton/nesteddoc';
import { RaisedDoc } from '../../doc/splitbutton/raiseddoc';
import { RoundedDoc } from '../../doc/splitbutton/roundeddoc';
import { SeverityDoc } from '../../doc/splitbutton/severitydoc';
import { RaisedTextDoc } from '../../doc/splitbutton/raisedtextdoc';
import { OutlinedDoc } from '../../doc/splitbutton/outlineddoc';
import { SizesDoc } from '../../doc/splitbutton/sizesdoc';
import { DisabledDoc } from '../../doc/splitbutton/disableddoc';
import { StyleDoc } from '../../doc/splitbutton/styledoc';
import { PropsDoc } from '../../doc/splitbutton/propsdoc';
import { EventsDoc } from '../../doc/splitbutton/eventsdoc';
import { TemplatesDoc } from '../../doc/splitbutton/templatesdoc';
import { AccessibilityDoc } from '../../doc/splitbutton/accessibilitydoc';

@Component({
    templateUrl: './splitbuttondemo.html'
})
export class SplitButtonDemo {
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
            id: 'nested',
            label: 'Nested',
            component: NestedDoc
        },
        {
            id: 'severity',
            label: 'Severity',
            component: SeverityDoc
        },
        {
            id: 'raised',
            label: 'Raised',
            component: RaisedDoc
        },
        {
            id: 'rounded',
            label: 'Rounded',
            component: RoundedDoc
        },
        {
            id: 'text',
            label: 'Text',
            component: TextDoc
        },
        {
            id: 'raisedtext',
            label: 'Raised Text',
            component: RaisedTextDoc
        },
        {
            id: 'outlined',
            label: 'Outlined',
            component: OutlinedDoc
        },
        {
            id: 'sizes',
            label: 'Sizes',
            component: SizesDoc
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
