import { Component } from '@angular/core';
import { BasicDoc } from '../../doc/confirmpopup/basicdoc';
import { ImportDoc } from '../../doc/confirmpopup/importdoc';
import { PropsDoc } from '../../doc/confirmpopup/propsdoc';
import { StyleDoc } from '../../doc/confirmpopup/styledoc';
import { ServiceDoc } from '../../doc/confirmpopup/servicedoc';
import { ConfirmationApiDoc } from '../../doc/confirmpopup/confirmationapidoc';
import { AccessibilityDoc } from '../../doc/confirmpopup/accessibilitydoc';
import { TemplatesDoc } from '../../doc/confirmpopup/templatesdoc';

@Component({
    templateUrl: './confirmpopupdemo.html'
})
export class ConfirmPopupDemo {
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
            id: 'templates',
            label: 'Templates',
            component: TemplatesDoc
        },
        {
            id: 'service',
            label: 'Confirmation Service',
            component: ServiceDoc
        },
        {
            id: 'confirmationapi',
            label: 'Confirmation API',
            component: ConfirmationApiDoc
        }
    ];
}
