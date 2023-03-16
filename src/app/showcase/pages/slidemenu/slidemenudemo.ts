import { Component } from '@angular/core';
import { SlideMenuPopupDemo } from '../../doc/slidemenu/popupdoc';
import { SlideMenuBasicDemo } from '../../doc/slidemenu/basicdoc';
import { ImportDoc } from '../../doc/slidemenu/importdoc';
import { MenuItemDoc } from '../../doc/slidemenu/menuitemdoc';
import { MethodsDoc } from '../../doc/slidemenu/methodsdoc';
import { PropsDoc } from '../../doc/slidemenu/propsdoc';
import { StyleDoc } from '../../doc/slidemenu/styledoc';

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
            component: SlideMenuBasicDemo
        },
        {
            id: 'popup',
            label: 'Popup',
            component: SlideMenuPopupDemo
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
            id: 'methods',
            label: 'Methods',
            component: MethodsDoc
        },
        {
            id: 'menuitem',
            label: 'MenuItem API',
            component: MenuItemDoc
        }
    ];
}
