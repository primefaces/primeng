import { Component } from '@angular/core';
import { ImportDoc } from '@doc/progressspinner/importdoc';
import { BasicDoc } from '@doc/progressspinner/basicdoc';
import { StyleDoc } from '@doc/progressspinner/styledoc';
import { CustomDoc } from '@doc/progressspinner/customdoc';
import { AccessibilityDoc } from '@doc/progressspinner/accessibilitydoc';

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
            id: 'custom',
            label: 'Custom',
            component: CustomDoc
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
}
