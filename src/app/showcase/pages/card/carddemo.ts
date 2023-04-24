import { Component } from '@angular/core';
import { AccessibilityDoc } from '../../doc/card/accessibilitydoc';
import { AdvancedDoc } from '../../doc/card/advanceddoc';
import { BasicDoc } from '../../doc/card/basicdoc';
import { ImportDoc } from '../../doc/card/importdoc';
import { PropsDoc } from '../../doc/card/propsdoc';
import { StyleDoc } from '../../doc/card/styledoc';
import { TemplatesDoc } from '../../doc/card/templatesdoc';

@Component({
    templateUrl: './carddemo.html'
})
export class CardDemo {
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
            id: 'advanced',
            label: 'Advanced',
            component: AdvancedDoc
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
