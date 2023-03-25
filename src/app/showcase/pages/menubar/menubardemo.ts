import { Component } from '@angular/core';
import { TemplateDoc } from '../../doc/menubar/templatedoc';
import { BasicDoc } from '../../doc/menubar/basicdoc';
import { ImportDoc } from '../../doc/menubar/importdoc';
import { MenuItemDoc } from '../../doc/menubar/menuitemdoc';
import { PropsDoc } from '../../doc/menubar/propsdoc';
import { StyleDoc } from '../../doc/menubar/styledoc';
import { TemplatesDoc } from '../../doc/menubar/templatesdoc';
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

    apiDocs = [
        {
            id: 'props',
            label: 'Properties',
            component: PropsDoc
        },
        {
            id: 'templates',
            label: 'Templates',
            component: TemplatesDoc
        },
        {
            id: 'menuitem',
            label: 'MenuItem API',
            component: MenuItemDoc
        }
    ];
}
