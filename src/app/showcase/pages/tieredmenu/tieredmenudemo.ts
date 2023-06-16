import { Component } from '@angular/core';
import { BasicDoc } from '../../doc/tieredmenu/basicdoc';
import { ImportDoc } from '../../doc/tieredmenu/importdoc';
import { PopupDoc } from '../../doc/tieredmenu/popupdoc';
import { StyleDoc } from '../../doc/tieredmenu/styledoc';
import { AccessibilityDoc } from '../../doc/tieredmenu/accessibilitydoc';

@Component({
    templateUrl: './tieredmenudemo.html'
})
export class TieredMenuDemo {
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
