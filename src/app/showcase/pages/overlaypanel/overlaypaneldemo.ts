import { Component } from '@angular/core';
import { BasicDoc } from '@doc/overlaypanel/basicdoc';
import { ImportDoc } from '@doc/overlaypanel/importdoc';
import { StyleDoc } from '@doc/overlaypanel/styledoc';
import { DataTableDoc } from '@doc/overlaypanel/datatabledoc';
import { TemplateDoc } from '@doc/overlaypanel/templatedoc';
import { TargetDoc } from '@doc/overlaypanel/targetdoc';
import { AccessibilityDoc } from '@doc/overlaypanel/accessibilitydoc';

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
}
