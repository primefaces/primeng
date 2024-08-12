import { Component } from '@angular/core';
import { ImportDoc } from '@doc/fluid/importdoc';
import { BasicDoc } from '@doc/fluid/basicdoc';
import { AccessibilityDoc } from '@doc/fluid/accessibilitydoc';

@Component({
    templateUrl: './fluiddemo.html'
})
export class FluidDemo {
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
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        },
    ];
}
