import { Component } from '@angular/core';
import { TemplateDoc } from '../../doc/panel/templatedoc';
import { BasicDoc } from '../../doc/panel/basicdoc';
import { ImportDoc } from '../../doc/panel/importdoc';
import { ToggleableDoc } from '../../doc/panel/toggleabledoc';
import { StyleDoc } from '../../doc/panel/styledoc';
import { PropsDoc } from '../../doc/panel/propsdoc';
import { EventsDoc } from '../../doc/panel/eventsdoc';
import { TemplatesDoc } from '../../doc/panel/templatesdoc';
import { AccessibilityDoc } from '../../doc/panel/accessibilitydoc';

@Component({
    templateUrl: './paneldemo.html'
})
export class PanelDemo {
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
            id: 'toggleable',
            label: 'Toggleable',
            component: ToggleableDoc
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc
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
