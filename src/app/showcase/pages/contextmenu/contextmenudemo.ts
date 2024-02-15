import { Component } from '@angular/core';
import { AccessibilityDoc } from '../../doc/contextmenu/accessibilitydoc';
import { BasicDoc } from '../../doc/contextmenu/basicdoc';
import { DocumentDoc } from '../../doc/contextmenu/documentdoc';
import { ImportDoc } from '../../doc/contextmenu/importdoc';
import { StyleDoc } from '../../doc/contextmenu/styledoc';

@Component({
    templateUrl: './contextmenudemo.html'
})
export class ContextMenuDemo {
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
            id: 'document',
            label: 'Document',
            component: DocumentDoc
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
