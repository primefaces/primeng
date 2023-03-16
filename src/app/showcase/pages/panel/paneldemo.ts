import { Component } from '@angular/core';
import { PanelTemplateDemo } from '../../doc/panel/templatedoc';
import { PanelBasicDemo } from '../../doc/panel/basicdoc';
import { ImportDoc } from '../../doc/panel/importdoc';
import { PanelToggleableDemo } from '../../doc/panel/toggleabledoc';
import { StyleDoc } from '../../doc/panel/styledoc';
import { PropsDoc } from '../../doc/panel/propsdoc';
import { EventsDoc } from '../../doc/panel/eventsdoc';
import { TemplatesDoc } from '../../doc/panel/templatesdoc';

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
            component: PanelBasicDemo
        },
        {
            id: 'toggleable',
            label: 'Toggleable',
            component: PanelToggleableDemo
        },
        {
            id: 'template',
            label: 'Template',
            component: PanelTemplateDemo
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
        },
        {
            id: 'templates',
            label: 'Templates',
            component: TemplatesDoc
        }
    ];
}
