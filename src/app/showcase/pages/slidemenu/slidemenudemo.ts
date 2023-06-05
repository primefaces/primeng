import { Component } from '@angular/core';
import { PopupDoc } from '../../doc/slidemenu/popupdoc';
import { BasicDoc } from '../../doc/slidemenu/basicdoc';
import { ImportDoc } from '../../doc/slidemenu/importdoc';
import { MenuItemDoc } from '../../doc/slidemenu/menuitemdoc';
import { MethodsDoc } from '../../doc/slidemenu/methodsdoc';
import { PropsDoc } from '../../doc/slidemenu/propsdoc';
import { StyleDoc } from '../../doc/slidemenu/styledoc';
import { AccessibilityDoc } from '../../doc/slidemenu/accessibilitydoc';
import { TemplatesDoc } from '../../doc/slidemenu/templatesdoc';

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
