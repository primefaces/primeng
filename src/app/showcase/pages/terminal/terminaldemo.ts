import { Component } from '@angular/core';
import { BasicDoc } from '@doc/terminal/basicdoc';
import { StyleDoc } from '@doc/terminal/styledoc';
import { ImportDoc } from '@doc/terminal/importdoc';
import { AccessibilityDoc } from '@doc/terminal/accessibilitydoc';

@Component({
    templateUrl: './terminaldemo.html'
})
export class TerminalDemo {
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
}
