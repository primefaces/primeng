import { Component } from '@angular/core';
import { ConfirmDialogBasicDemo } from '../../doc/confirmdialog/basicdoc';
import { EventsDoc } from '../../doc/confirmdialog/eventsdoc';
import { ImportDoc } from '../../doc/confirmdialog/importdoc';
import { PropsDoc } from '../../doc/confirmdialog/propsdoc';
import { StyleDoc } from '../../doc/confirmdialog/styledoc';
import { ConfirmDialogPositionDemo } from '../../doc/confirmdialog/positiondoc';
import { ConfirmDialogTemplateDemo } from '../../doc/confirmdialog/customdoc';
import { ServiceDoc } from '../../doc/confirmdialog/servicedoc';
import { TemplatesDoc } from '../../doc/confirmdialog/templatesdoc';

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
            component: ConfirmDialogBasicDemo
        },
        {
            id: 'position',
            label: 'Position',
            component: ConfirmDialogPositionDemo
        },
        {
            id: 'template',
            label: 'Template',
            component: ConfirmDialogTemplateDemo
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
