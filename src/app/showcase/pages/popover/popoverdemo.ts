import { Component } from '@angular/core';
import { BasicDoc } from '@doc/popover/basicdoc';
import { ImportDoc } from '@doc/popover/importdoc';
import { StyleDoc } from '@doc/popover/styledoc';
import { DataTableDoc } from '@doc/popover/datatabledoc';
import { TemplateDoc } from '@doc/popover/templatedoc';
import { TargetDoc } from '@doc/popover/targetdoc';
import { AccessibilityDoc } from '@doc/popover/accessibilitydoc';

@Component({
    templateUrl: './popoverdemo.html'
})
export class PopoverDemo {
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
