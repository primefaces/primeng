import { Component } from '@angular/core';
import { ImportDoc } from '@doc/floatlabel/importdoc';
import { BasicDoc } from '@doc/floatlabel/basicdoc';
import { StyleDoc } from '@doc/floatlabel/styledoc';
import { AccessibilityDoc } from '@doc/floatlabel/accessibilitydoc';
@Component({
    templateUrl: './floatlabeldemo.html'
})
export class FloatLabelDemo {
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
