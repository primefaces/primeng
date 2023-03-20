import { Component } from '@angular/core';
import { BasicDoc } from '../../doc/panelmenu/basicdoc';
import { ImportDoc } from '../../doc/panelmenu/importdoc';
import { MenuItemDoc } from '../../doc/panelmenu/menuitemdoc';
import { PropsDoc } from '../../doc/panelmenu/propsdoc';
import { StyleDoc } from '../../doc/panelmenu/styledoc';
import { MultipleDoc } from '../../doc/panelmenu/multipledoc';

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
        {
            id: 'multiple',
            label: 'Multiple',
            component: MultipleDoc
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
