import { Component } from '@angular/core';
import { StyleDoc } from '@doc/breadcrumb/styledoc';
import { BasicDoc } from '@doc/breadcrumb/basicdoc';
import { ImportDoc } from '@doc/breadcrumb/importdoc';
import { AccessibilityDoc } from '@doc/breadcrumb/accessibilitydoc';
import { TemplateDoc } from '@doc/breadcrumb/templatedoc';
import { RouterDoc } from '@doc/breadcrumb/routerdoc';

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
            basic: 'template',
            label: 'Template',
            component: TemplateDoc
        },
        {
            basic: 'router',
            label: 'Router',
            component: RouterDoc
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
