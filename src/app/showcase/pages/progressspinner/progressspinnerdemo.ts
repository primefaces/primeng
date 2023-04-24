import { Component } from '@angular/core';
import { ImportDoc } from '../../doc/progressspinner/importdoc';
import { BasicDoc } from '../../doc/progressspinner/basicdoc';
import { StyleDoc } from '../../doc/progressspinner/styledoc';
import { TemplateDoc } from '../../doc/progressspinner/templatedoc';
import { PropsDoc } from '../../doc/progressspinner/propsdoc';
import { AccessibilityDoc } from '../../doc/progressspinner/accessibilitydoc';

@Component({
    templateUrl: './progressspinnerdemo.html',
    styleUrls: ['./progressspinnerdemo.css']
})
export class ProgressSpinnerDemo {
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
            id: 'templating',
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
        }
    ];
}
