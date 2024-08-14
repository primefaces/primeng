import { Component } from '@angular/core';
import { BasicDoc } from '@doc/drawer/basicdoc';
import { TemplateDoc } from '@doc/drawer/templatedoc';
import { ImportDoc } from '@doc/drawer/importdoc';
import { StyleDoc } from '@doc/drawer/styledoc';
import { PositionDoc } from '@doc/drawer/positiondoc';
import { FullScreenDoc } from '@doc/drawer/fullscreendoc';
import { SizeDoc } from '@doc/drawer/sizedoc';
import { HeadlessDoc } from '@doc/drawer/headlessdoc';
import { AccessibilityDoc } from '@doc/drawer/accessibilitydoc';

@Component({
    templateUrl: './drawerdemo.html'
})
export class DrawerDemo {
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
            id: 'size',
            label: 'Size',
            component: SizeDoc
        },
        {
            id: 'fullscreen',
            label: 'Full Screen',
            component: FullScreenDoc
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
