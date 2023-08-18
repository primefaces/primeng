import { Component } from '@angular/core';
import { DisabledDoc } from '../../doc/tabview/disableddoc';
import { BasicDoc } from '../../doc/tabview/basicdoc';
import { ControlledDoc } from '../../doc/tabview/controlleddoc';
import { ImportDoc } from '../../doc/tabview/importdoc';
import { TemplateDoc } from '../../doc/tabview/customtemplatedoc';
import { ClosableDoc } from '../../doc/tabview/closabledoc';
import { ScrollableDoc } from '../../doc/tabview/scrollabledoc';
import { StyleDoc } from '../../doc/tabview/styledoc';
import { AccessibilityDoc } from '../../doc/tabview/accessibilitydoc';

@Component({
    templateUrl: './tabviewdemo.html',
    styleUrls: ['./tabviewdemo.scss']
})
export class TabViewDemo {
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
            id: 'disabled',
            label: 'Disabled',
            component: DisabledDoc
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc
        },
        {
            id: 'closable',
            label: 'Closable',
            component: ClosableDoc
        },
        {
            id: 'scrollable',
            label: 'Scrollable',
            component: ScrollableDoc
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
