import { Component } from '@angular/core';
import { MenubarTemplateDemo } from '../../doc/menubar/templatedoc';
import { MenubarBasicDemo } from '../../doc/menubar/basicdoc';
import { ImportDoc } from '../../doc/menubar/importdoc';
import { MenuItemDoc } from '../../doc/menubar/menuitemdoc';
import { PropsDoc } from '../../doc/menubar/propsdoc';
import { StyleDoc } from '../../doc/menubar/styledoc';
import { TemplatesDoc } from '../../doc/menubar/templatesdoc';

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
            component: MenubarBasicDemo
        },
        {
            id: 'template',
            label: 'Template',
            component: MenubarTemplateDemo
        },
        {
            id: 'style',
            label: 'Style',
            component: StyleDoc
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
