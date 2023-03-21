import { Component } from '@angular/core';
import { StyleDoc } from '../../doc/toolbar/styledoc';
import { ImportDoc } from '../../doc/toolbar/importdoc';
import { PropsDoc } from '../../doc/toolbar/propsdoc';
import { TemplatesDoc } from '../../doc/toolbar/templatesdoc';
import { BasicDoc } from '../../doc/toolbar/basicdoc';
import { AccessibilityDoc } from '../../doc/toolbar/accessibilitydoc';

@Component({
    templateUrl: './toolbardemo.html'
})
export class ToolbarDemo {
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
            id: 'properties',
            label: 'Properties',
            component: PropsDoc
        },
        {
            id: 'templates',
            label: 'Templates',
            component: TemplatesDoc
        }
    ];
}
