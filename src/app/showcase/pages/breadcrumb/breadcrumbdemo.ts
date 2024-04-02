import { Component } from '@angular/core';
import { StyleDoc } from '@doc/breadcrumb/styledoc';
import { BasicDoc } from '@doc/breadcrumb/basicdoc';
import { ImportDoc } from '@doc/breadcrumb/importdoc';
import { AccessibilityDoc } from '@doc/breadcrumb/accessibilitydoc';

@Component({
    templateUrl: './breadcrumbdemo.html'
})
export class BreadcrumbDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            basic: 'basic',
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
}
