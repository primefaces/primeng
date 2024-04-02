import { Component } from '@angular/core';
import { ControlledDoc } from '@doc/tabmenu/controlleddoc';
import { ActiveDoc } from '@doc/tabmenu/activedoc';
import { BasicDoc } from '@doc/tabmenu/basicdoc';
import { ImportDoc } from '@doc/tabmenu/importdoc';
import { StyleDoc } from '@doc/tabmenu/styledoc';
import { ScrollableDoc } from '@doc/tabmenu/scrollabledoc';
import { TemplateDoc } from '@doc/tabmenu/templatedoc';
import { AccessibilityDoc } from '@doc/tabmenu/accessibilitydoc';

@Component({
    templateUrl: './tabmenudemo.html'
})
export class TabMenuDemo {
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
            id: 'active',
            label: 'Active Item',
            component: ActiveDoc
        },
        {
            id: 'controlled',
            label: 'Controlled',
            component: ControlledDoc
        },
        {
            id: 'scrollable',
            label: 'Scrollable',
            component: ScrollableDoc
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
