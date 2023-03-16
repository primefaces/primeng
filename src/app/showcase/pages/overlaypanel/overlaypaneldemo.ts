import { Component } from '@angular/core';
import { OverlayPanelBasicDemo } from '../../doc/overlaypanel/basicdoc';
import { ImportDoc } from '../../doc/overlaypanel/importdoc';
import { PropsDoc } from '../../doc/overlaypanel/propsdoc';
import { StyleDoc } from '../../doc/overlaypanel/styledoc';
import { TemplatesDoc } from '../../doc/overlaypanel/templatesdoc';
import { OverlayPanelDataTableDemo } from '../../doc/overlaypanel/datatabledoc';
import { OverlayPanelTemplateDemo } from '../../doc/overlaypanel/templatedoc';
import { OverlayPanelTargetDemo } from '../../doc/overlaypanel/targetdoc';
import { EventsDoc } from '../../doc/overlaypanel/eventsdoc';
import { MethodsDoc } from '../../doc/overlaypanel/methodsdoc';

@Component({
    templateUrl: './overlaypaneldemo.html'
})
export class OverlayPanelDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'basic',
            label: 'Basic',
            component: OverlayPanelBasicDemo
        },
        {
            id: 'target',
            label: 'Target',
            component: OverlayPanelTargetDemo
        },
        {
            id: 'template',
            label: 'Template',
            component: OverlayPanelTemplateDemo
        },
        {
            id: 'datatable',
            label: 'DataTable',
            component: OverlayPanelDataTableDemo
        },
        {
            id: 'style',
            label: 'Style',
            component: StyleDoc
        }
    ];

    apiDocs = [
        {
            id: 'props',
            label: 'Properties',
            component: PropsDoc
        },
        {
            id: 'events',
            label: 'Events',
            component: EventsDoc
        },
        {
            id: 'methods',
            label: 'Methods',
            component: MethodsDoc
        },
        {
            id: 'templates',
            label: 'Templates',
            component: TemplatesDoc
        }
    ];
}
