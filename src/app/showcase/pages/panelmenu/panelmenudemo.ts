import { Component } from '@angular/core';
import { PanelMenuBasicDemo } from '../../doc/panelmenu/basicdoc';
import { ImportDoc } from '../../doc/panelmenu/importdoc';
import { MenuItemDoc } from '../../doc/panelmenu/menuitemdoc';
import { PropsDoc } from '../../doc/panelmenu/propsdoc';
import { StyleDoc } from '../../doc/panelmenu/styledoc';
import { PanelMenuMultipleDemo } from '../../doc/panelmenu/multipledoc';

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
            component: PanelMenuBasicDemo
        },
        {
            id: 'multiple',
            label: 'Multiple',
            component: PanelMenuMultipleDemo
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
            id: 'menuitem',
            label: 'MenuItem API',
            component: MenuItemDoc
        }
    ];
}
