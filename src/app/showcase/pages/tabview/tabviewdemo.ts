import { Component } from '@angular/core';
import { TabViewDisabledDemo } from '../../doc/tabview/disableddoc';
import { TabViewBasicDemo } from '../../doc/tabview/basicdoc';
import { TabViewControlledDemo } from '../../doc/tabview/controlleddoc';
import { ImportDoc } from '../../doc/tabview/importdoc';
import { TabViewTemplateDemo } from '../../doc/tabview/customtemplatedoc';
import { TabViewClosableDemo } from '../../doc/tabview/closabledoc';
import { ScrollableDoc } from '../../doc/tabview/scrollabledoc';
import { StyleDoc } from '../../doc/tabview/styledoc';
import { PropsDoc } from '../../doc/tabview/propsdoc';
import { EventsDoc } from '../../doc/tabview/eventsdoc';
import { TemplatesDoc } from '../../doc/tabview/templatesdoc';

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
            component: TabViewBasicDemo
        },
        {
            id: 'controlled',
            label: 'Controlled',
            component: TabViewControlledDemo
        },
        {
            id: 'disabled',
            label: 'Disabled',
            component: TabViewDisabledDemo
        },
        {
            id: 'template',
            label: 'Template',
            component: TabViewTemplateDemo
        },
        {
            id: 'closable',
            label: 'Closable',
            component: TabViewClosableDemo
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
        }
    ];

    apiDocs = [
        {
            id: 'properties',
            label: 'Properties',
            component: PropsDoc
        },
        {
            id: 'events',
            label: 'Events',
            component: EventsDoc
        },
        {
            id: 'templates',
            label: 'Templates',
            component: TemplatesDoc
        }
    ];
}
