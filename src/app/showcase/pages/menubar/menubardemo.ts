import { Component } from '@angular/core';
import { TemplateDoc } from '../../doc/menubar/templatedoc';
import { BasicDoc } from '../../doc/menubar/basicdoc';
import { ImportDoc } from '../../doc/menubar/importdoc';
import { StyleDoc } from '../../doc/menubar/styledoc';
import { AccessibilityDoc } from '../../doc/menubar/accessibilitydoc';

@Component({
    templateUrl: './menubardemo.html'
})
export class MenubarDemo {
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
            id: 'template',
            label: 'Template',
            component: TemplateDoc
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
