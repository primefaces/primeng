import { Component } from '@angular/core';
import { SidebarBasicDemo } from '../../doc/sidebar/basicdoc';
import { SidebarTemplateDemo } from '../../doc/sidebar/templatedoc';
import { EventsDoc } from '../../doc/sidebar/eventsdoc';
import { ImportDoc } from '../../doc/sidebar/importdoc';
import { PropsDoc } from '../../doc/sidebar/propsdoc';
import { StyleDoc } from '../../doc/sidebar/styledoc';
import { TemplatesDoc } from '../../doc/sidebar/templatesdoc';
import { SidebarPositionDemo } from '../../doc/sidebar/positiondoc';
import { SidebarFullScreenDemo } from '../../doc/sidebar/fullscreendoc';
import { SidebarSizeDemo } from '../../doc/sidebar/sizedoc';

@Component({
    templateUrl: './sidebardemo.html'
})
export class SidebarDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'basic',
            label: 'Basic',
            component: SidebarBasicDemo
        },
        {
            id: 'position',
            label: 'Position',
            component: SidebarPositionDemo
        },
        {
            id: 'fullscreen',
            label: 'Full Screen',
            component: SidebarFullScreenDemo
        },
        {
            id: 'size',
            label: 'Size',
            component: SidebarSizeDemo
        },
        {
            id: 'template',
            label: 'Template',
            component: SidebarTemplateDemo
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
