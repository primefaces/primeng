import { Component } from '@angular/core';
import { BasicDoc } from '../../doc/sidebar/basicdoc';
import { TemplateDoc } from '../../doc/sidebar/templatedoc';
import { EventsDoc } from '../../doc/sidebar/eventsdoc';
import { ImportDoc } from '../../doc/sidebar/importdoc';
import { PropsDoc } from '../../doc/sidebar/propsdoc';
import { StyleDoc } from '../../doc/sidebar/styledoc';
import { TemplatesDoc } from '../../doc/sidebar/templatesdoc';
import { PositionDoc } from '../../doc/sidebar/positiondoc';
import { FullScreenDoc } from '../../doc/sidebar/fullscreendoc';
import { SizeDoc } from '../../doc/sidebar/sizedoc';
import { AccessibilityDoc } from '../../doc/sidebar/accessibilitydoc';

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
            component: BasicDoc
        },
        {
            id: 'position',
            label: 'Position',
            component: PositionDoc
        },
        {
            id: 'fullscreen',
            label: 'Full Screen',
            component: FullScreenDoc
        },
        {
            id: 'size',
            label: 'Size',
            component: SizeDoc
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
