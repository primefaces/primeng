import { Component } from '@angular/core';
import { StyleDoc } from '../../doc/dock/styledoc';
import { AdvancedDoc } from '../../doc/dock/advanceddoc';
import { BasicDoc } from '../../doc/dock/basicdoc';
import { ImportDoc } from '../../doc/dock/importdoc';
import { AccessibilityDoc } from '../../doc/dock/accessibilitydoc';

@Component({
    templateUrl: './dockdemo.html',
    styleUrls: ['./dockdemo.scss']
})
export class DockDemo {
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
            id: 'advanced',
            label: 'Advanced',
            component: AdvancedDoc
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
