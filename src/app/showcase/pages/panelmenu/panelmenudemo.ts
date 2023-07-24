import { Component } from '@angular/core';
import { BasicDoc } from '../../doc/panelmenu/basicdoc';
import { ImportDoc } from '../../doc/panelmenu/importdoc';
import { StyleDoc } from '../../doc/panelmenu/styledoc';
import { MultipleDoc } from '../../doc/panelmenu/multipledoc';
import { AccessibilityDoc } from '../../doc/panelmenu/accessibilitydoc';

@Component({
    templateUrl: './panelmenudemo.html'
})
export class PanelMenuDemo {
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
        // {
        //     id: 'multiple',
        //     label: 'Multiple',
        //     component: MultipleDoc
        // },
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
