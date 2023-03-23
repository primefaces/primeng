import { Component } from '@angular/core';
import { BasicDoc } from '../../doc/confirmdialog/basicdoc';
import { EventsDoc } from '../../doc/confirmdialog/eventsdoc';
import { ImportDoc } from '../../doc/confirmdialog/importdoc';
import { PropsDoc } from '../../doc/confirmdialog/propsdoc';
import { StyleDoc } from '../../doc/confirmdialog/styledoc';
import { PositionDoc } from '../../doc/confirmdialog/positiondoc';
import { TemplateDoc } from '../../doc/confirmdialog/templatedoc';
import { ServiceDoc } from '../../doc/confirmdialog/servicedoc';
import { TemplatesDoc } from '../../doc/confirmdialog/templatesdoc';
import { AccessibilityDoc } from '../../doc/confirmdialog/accessibilitydoc';

@Component({
    templateUrl: './confirmdialogdemo.html'
})
export class ConfirmDialogDemo {
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
            id: 'position',
            label: 'Position',
            component: PositionDoc
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
            id: 'templates',
            label: 'Templates',
            component: TemplatesDoc
        },
        {
            id: 'service',
            label: 'Confirmation Service',
            component: ServiceDoc
        }
    ];
}
