import { Component } from '@angular/core';
import { BasicDoc } from '../../doc/sidebar/basicdoc';
import { TemplateDoc } from '../../doc/sidebar/templatedoc';
import { ImportDoc } from '../../doc/sidebar/importdoc';
import { StyleDoc } from '../../doc/sidebar/styledoc';
import { PositionDoc } from '../../doc/sidebar/positiondoc';
import { FullScreenDoc } from '../../doc/sidebar/fullscreendoc';
import { SizeDoc } from '../../doc/sidebar/sizedoc';
import { HeadlessDoc } from '../../doc/sidebar/headlessdoc';
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
            id: 'headless',
            label: 'Headless',
            component: HeadlessDoc
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
