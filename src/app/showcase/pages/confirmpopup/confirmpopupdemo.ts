import { Component } from '@angular/core';
import { BasicDoc } from '../../doc/confirmpopup/basicdoc';
import { ImportDoc } from '../../doc/confirmpopup/importdoc';
import { StyleDoc } from '../../doc/confirmpopup/styledoc';
import { AccessibilityDoc } from '../../doc/confirmpopup/accessibilitydoc';

@Component({
    templateUrl: './confirmpopupdemo.html'
})
export class ConfirmPopupDemo {
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
