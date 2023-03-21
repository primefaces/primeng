import { Component } from '@angular/core';
import { BasicDoc } from '../../doc/overlaypanel/basicdoc';
import { ImportDoc } from '../../doc/overlaypanel/importdoc';
import { PropsDoc } from '../../doc/overlaypanel/propsdoc';
import { StyleDoc } from '../../doc/overlaypanel/styledoc';
import { TemplatesDoc } from '../../doc/overlaypanel/templatesdoc';
import { DataTableDoc } from '../../doc/overlaypanel/datatabledoc';
import { TemplateDoc } from '../../doc/overlaypanel/templatedoc';
import { TargetDoc } from '../../doc/overlaypanel/targetdoc';
import { EventsDoc } from '../../doc/overlaypanel/eventsdoc';
import { MethodsDoc } from '../../doc/overlaypanel/methodsdoc';
import { AccessibilityDoc } from '../../doc/overlaypanel/accessibilitydoc';

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
            component: BasicDoc
        },
        {
            id: 'target',
            label: 'Target',
            component: TargetDoc
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc
        },
        {
            id: 'datatable',
            label: 'DataTable',
            component: DataTableDoc
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
