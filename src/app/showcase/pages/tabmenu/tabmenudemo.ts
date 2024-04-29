import { Component } from '@angular/core';
import { ControlledDoc } from '@doc/tabmenu/controlleddoc';
import { BasicDoc } from '@doc/tabmenu/basicdoc';
import { ImportDoc } from '@doc/tabmenu/importdoc';
import { StyleDoc } from '@doc/tabmenu/styledoc';
import { TemplateDoc } from '@doc/tabmenu/templatedoc';
import { AccessibilityDoc } from '@doc/tabmenu/accessibilitydoc';
import { CommandDoc } from '@doc/tabmenu/commanddoc';
import { RouterDoc } from '@doc/tabmenu/routerdoc';

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
            id: 'controlled',
            label: 'Controlled',
            component: ControlledDoc
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc
        },
        {
            id: 'command',
            label: 'Command',
            component: CommandDoc
        },
        {
            id: 'router',
            label: 'Router',
            component: RouterDoc
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
