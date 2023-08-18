import { Component } from '@angular/core';
import { PopupDoc } from '../../doc/slidemenu/popupdoc';
import { BasicDoc } from '../../doc/slidemenu/basicdoc';
import { ImportDoc } from '../../doc/slidemenu/importdoc';
import { StyleDoc } from '../../doc/slidemenu/styledoc';
import { AccessibilityDoc } from '../../doc/slidemenu/accessibilitydoc';

@Component({
    templateUrl: './slidemenudemo.html'
})
export class SlideMenuDemo {
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
            id: 'popup',
            label: 'Popup',
            component: PopupDoc
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
