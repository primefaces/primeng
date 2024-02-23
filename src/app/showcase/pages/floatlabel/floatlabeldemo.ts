import { Component } from '@angular/core';
import { BasicDoc } from '../../doc/floatlabel/basicdoc';
import { ImportDoc } from '../../doc/floatlabel/importdoc';
import { AccessibilityDoc } from '../../doc/floatlabel/accessibilitydoc';
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
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
